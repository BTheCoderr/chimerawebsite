import Stripe from 'stripe';
import { getAllowedShippingCountries, isStripeCheckoutReady, parseCheckoutSelection } from '../../lib/stripe-config.mjs';

const SITE_URL = 'https://chimerawater.com';
const RESPONSE_HEADERS = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405, headers: { ...RESPONSE_HEADERS, Allow: 'POST' } });
  }
  // Refuse all payments until approved Stripe TEST configuration is present.
  if (!isStripeCheckoutReady(process.env)) {
    return Response.json({ error: 'Checkout is not available yet.' }, { status: 503, headers: RESPONSE_HEADERS });
  }
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: 'Forbidden origin.' }, { status: 403, headers: RESPONSE_HEADERS });
  }
  let input: unknown;
  try {
    const rawBody = await request.text();
    if (rawBody.length > 2048) return Response.json({ error: 'Request too large.' }, { status: 413, headers: RESPONSE_HEADERS });
    input = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400, headers: RESPONSE_HEADERS });
  }
  const item = parseCheckoutSelection(input, process.env);
  if (!item) return Response.json({ error: 'Invalid product selection.' }, { status: 400, headers: RESPONSE_HEADERS });

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { maxNetworkRetries: 1, timeout: 12000 });
    const countries = getAllowedShippingCountries(process.env) as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[];
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: item.priceId, quantity: item.quantity }],
      shipping_address_collection: { allowed_countries: countries },
      shipping_options: [{ shipping_rate: process.env.STRIPE_SHIPPING_RATE_ID as string }],
      automatic_tax: { enabled: process.env.STRIPE_ENABLE_AUTOMATIC_TAX === 'true' },
      success_url: SITE_URL + '/checkout/success/?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: SITE_URL + '/checkout/cancelled/',
      metadata: { variant_code: item.variantCode, quantity: String(item.quantity) },
    });
    if (!session.url || !session.url.startsWith('https://checkout.stripe.com/')) {
      return Response.json({ error: 'Checkout was not created.' }, { status: 502, headers: RESPONSE_HEADERS });
    }
    return Response.json({ url: session.url }, { headers: RESPONSE_HEADERS });
  } catch (error) {
    // Do not reveal payment API errors or secret configuration to visitors.
    console.error('Stripe Checkout session creation failed:', error instanceof Error ? error.name : 'unknown error');
    return Response.json({ error: 'Unable to start checkout. Please try again later.' }, { status: 502, headers: RESPONSE_HEADERS });
  }
}
