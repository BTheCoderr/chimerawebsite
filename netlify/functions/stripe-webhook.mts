import Stripe from 'stripe';

const RESPONSE_HEADERS = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405, headers: { ...RESPONSE_HEADERS, Allow: 'POST' } });
  }
  const key = process.env.STRIPE_SECRET_KEY;
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  // Only signed test-mode Stripe events can be accepted during preparation.
  if (!key?.startsWith('sk_test_') || !secret?.startsWith('whsec_')) {
    return Response.json({ error: 'Webhook not configured.' }, { status: 503, headers: RESPONSE_HEADERS });
  }
  const signature = request.headers.get('stripe-signature');
  if (!signature) return Response.json({ error: 'Missing Stripe signature.' }, { status: 400, headers: RESPONSE_HEADERS });
  const payload = await request.text();
  if (payload.length > 1000000) {
    return Response.json({ error: 'Payload too large.' }, { status: 413, headers: RESPONSE_HEADERS });
  }
  const stripe = new Stripe(key);
  let event: Stripe.Event;
  try {
    // Use the untouched raw body. Stripe verifies the signed timestamp and payload.
    event = stripe.webhooks.constructEvent(payload, signature, secret);
  } catch {
    return Response.json({ error: 'Invalid Stripe signature.' }, { status: 400, headers: RESPONSE_HEADERS });
  }
  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded':
    case 'checkout.session.async_payment_failed': {
      const session = event.data.object as Stripe.Checkout.Session;
      // IDs only; do not log customer email, address, card details or full event payloads.
      console.info(JSON.stringify({
        source: 'chimera-stripe',
        type: event.type,
        eventId: event.id,
        sessionId: session.id,
        paymentStatus: session.payment_status,
      }));
      // Stripe Dashboard is the record of payment. This is NOT a fulfillment/order DB:
      // add durable, idempotent order handling before enabling fulfillment automation.
      break;
    }
    default: break;
  }
  return Response.json({ received: true }, { headers: RESPONSE_HEADERS });
}
