// Four links supplied in Scott's "Black Friday Pricing.docx" on Nov 27, 2026.
// Preserve the regular product payment links in stripe-payment-links.ts.
// IMPORTANT: Scott reports that at least one supposed full-kit link displayed
// only the ceramic filter in Stripe. These links are NOT approved for customers.
//
// The source document calls the kits "Filter and Kit Black" and "Filter Kit White".
// The copy here preserves those labels; do not infer the Stripe checkout contents
// are correct until Scott checks each hosted checkout product, quantity and price.
type BlackFridayLink = { sourceLabel: string; url: string; verifiedByMerchant: boolean };

export const BLACK_FRIDAY_PAYMENT_LINKS: Readonly<Record<string, BlackFridayLink>> = Object.freeze({
  'kit-black': {
    sourceLabel: 'Filter and Kit Black',
    url: 'https://buy.stripe.com/7sYbJ10oecZiai0dDudjO0s',
    verifiedByMerchant: false,
  },
  'kit-white': {
    sourceLabel: 'Filter Kit White',
    url: 'https://buy.stripe.com/4gMdR90oe8J20HqbvmdjO0u',
    verifiedByMerchant: false,
  },
  'filter-white': {
    sourceLabel: 'Ceramic Filter White',
    url: 'https://buy.stripe.com/14A7sL3Aqf7q2PygPGdjO0v',
    verifiedByMerchant: false,
  },
  'filter-black': {
    sourceLabel: 'Ceramic Filter Black',
    url: 'https://buy.stripe.com/fZucN5gnc0cwducfLCdjO0w',
    verifiedByMerchant: false,
  },
});

export function getVerifiedBlackFridayLink(variantCode: string): string | null {
  if (!Object.prototype.hasOwnProperty.call(BLACK_FRIDAY_PAYMENT_LINKS, variantCode)) return null;
  const item = BLACK_FRIDAY_PAYMENT_LINKS[variantCode];
  if (item.verifiedByMerchant !== true) return null;
  if (!item.url.startsWith('https://buy.stripe.com/') || item.url.includes('/test_')) return null;
  return item.url;
}
