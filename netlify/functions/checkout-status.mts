import { isStripeCheckoutReady } from '../../lib/stripe-config.mjs';

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'GET') {
    return Response.json({ error: 'Method not allowed' }, { status: 405, headers: { Allow: 'GET' } });
  }
  // Never return keys, Price IDs, shipping data, or other private configuration.
  const enabled = isStripeCheckoutReady(process.env);
  return Response.json({ enabled, mode: enabled ? 'test' : 'disabled' }, {
    headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
  });
}
