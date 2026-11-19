// Scott's November 18, 2026 email supplied test-mode Stripe Payment Links.
// These URLs are publicly shareable test links, not API credentials.
// Never map live payment links into the client without separate merchant approval.
const TEST_PAYMENT_LINKS: Record<string, string> = {
  'kit-white': 'https://buy.stripe.com/test_7sY3cv7YG8W75SR6PM97G09',
  'kit-black': 'https://buy.stripe.com/test_7sY3cv7YG8W75SR6PM97G09',
  'filter-white': 'https://buy.stripe.com/test_3cI28r5Qy0pB953fmi97G07',
  'filter-black': 'https://buy.stripe.com/test_5kQ14na6O5JV1CBa1Y97G0a',
};

export function getStripeTestPaymentLink(variantCode: string): string | null {
  if (!Object.prototype.hasOwnProperty.call(TEST_PAYMENT_LINKS, variantCode)) return null;
  const url = TEST_PAYMENT_LINKS[variantCode];
  return url.startsWith('https://buy.stripe.com/test_') ? url : null;
}
