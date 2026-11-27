// REPLACEMENT Black Friday links supplied in Scott Keeley's Nov 27, 2026 email
// "links" (1:05 PM ET), superseding the faulty 11:41 AM DOCX links.
// Scott then confirmed by text that he checked all four and they work.
// Original regular-price links remain in stripe-payment-links.ts for rollback.
// We cannot independently inspect Stripe's live product, price or shipping details.
// Source labels are retained exactly as Scott supplied them.
type BlackFridayLink = { sourceLabel: string; url: string; verifiedByMerchant: boolean };

export const BLACK_FRIDAY_PAYMENT_LINKS: Readonly<Record<string, BlackFridayLink>> = Object.freeze({
  'kit-black': {
    sourceLabel: 'Filter and Kit Black',
    url: 'https://buy.stripe.com/8x2dR9gnccZi89S1UMdjO0z',
    verifiedByMerchant: true,
  },
  'kit-white': {
    sourceLabel: 'Filter Kit White',
    url: 'https://buy.stripe.com/cNi28r2wm6AU89S0QIdjO0y',
    verifiedByMerchant: true,
  },
  'filter-white': {
    sourceLabel: 'Ceramic Filter White',
    url: 'https://buy.stripe.com/8x27sL8UK1gAduc42UdjO0A',
    verifiedByMerchant: true,
  },
  'filter-black': {
    sourceLabel: 'Ceramic Filter Black',
    url: 'https://buy.stripe.com/4gM9AT1sif7q1Lu2YQdjO0B',
    verifiedByMerchant: true,
  },
});

export function getVerifiedBlackFridayLink(variantCode: string): string | null {
  if (!Object.prototype.hasOwnProperty.call(BLACK_FRIDAY_PAYMENT_LINKS, variantCode)) return null;
  const item = BLACK_FRIDAY_PAYMENT_LINKS[variantCode];
  if (item.verifiedByMerchant !== true) return null;
  if (!item.url.startsWith('https://buy.stripe.com/') || item.url.includes('/test_')) return null;
  return item.url;
}
