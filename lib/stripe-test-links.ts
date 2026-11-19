// Client-visible Stripe TEST links only, reconfirmed in Scott's latest update.
// The Kit and carbon-refill links now appear to be live and must not be
// included here or exposed for checkout before shipping and launch approval.
const TEST_PAYMENT_LINKS: Record<string, string> = {
  'filter-white': 'https://buy.stripe.com/test_3cI28r5Qy0pB953fmi97G07',
  'filter-black': 'https://buy.stripe.com/test_5kQ14na6O5JV1CBa1Y97G0a',
};

export function getStripeTestPaymentLink(variantCode: string): string | null {
  if (!Object.prototype.hasOwnProperty.call(TEST_PAYMENT_LINKS, variantCode)) return null;
  const url = TEST_PAYMENT_LINKS[variantCode];
  return url.startsWith('https://buy.stripe.com/test_') ? url : null;
}
