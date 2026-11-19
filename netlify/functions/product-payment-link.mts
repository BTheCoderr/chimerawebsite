import { getApprovedPaymentLink } from '../../lib/stripe-seller-links.server.mjs';

const HEADERS = {
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
};

// Stripe Payment Links are already created by Scott. This endpoint only
// resolves a vetted product variant to its link after explicit launch approvals.
// No Stripe secret key or customer information is processed here.
export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed.' }, {
      status: 405, headers: { ...HEADERS, Allow: 'POST' },
    });
  }

  // These must be set by an operator AFTER the seller signs off, never from
  // browser arguments, URL params, or other user-controllable content.
  const approvals = {
    merchantApproved: process.env.CHIMERA_MERCHANT_APPROVED === 'true',
    shippingConfirmed: process.env.CHIMERA_SHIPPING_CONFIRMED === 'true',
    goLiveApproved: process.env.CHIMERA_GO_LIVE_APPROVED === 'true',
  };
  if (!approvals.merchantApproved || !approvals.shippingConfirmed || !approvals.goLiveApproved) {
    return Response.json({ error: 'Purchasing is not available yet.' }, { status: 503, headers: HEADERS });
  }

  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ error: 'Forbidden origin.' }, { status: 403, headers: HEADERS });
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 1024) return Response.json({ error: 'Request too large.' }, { status: 413, headers: HEADERS });
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400, headers: HEADERS });
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return Response.json({ error: 'Invalid product.' }, { status: 400, headers: HEADERS });
  }
  const variantCode = (body as Record<string, unknown>).variantCode;
  if (typeof variantCode !== 'string' || variantCode.length > 64) {
    return Response.json({ error: 'Invalid product.' }, { status: 400, headers: HEADERS });
  }
  const url = getApprovedPaymentLink(variantCode, approvals);
  if (!url || !url.startsWith('https://buy.stripe.com/') || url.includes('/test_')) {
    return Response.json({ error: 'Product checkout is unavailable.' }, { status: 404, headers: HEADERS });
  }

  return Response.json({ url }, { headers: HEADERS });
}
