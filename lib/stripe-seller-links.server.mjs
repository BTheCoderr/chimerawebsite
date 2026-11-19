// Seller-supplied Stripe Payment Links, verified against Scott's November 18 "update" email.
// NOTE: Stripe Payment Links are public merchant URLs, not Stripe API credentials.
// This module is server-side only. Do not import it into client components or expose
// live URLs in the Concept B preview before shipping and launch approval.
export const SELLER_PAYMENT_LINKS = Object.freeze({
  'kit-black': { mode: 'live', url: 'https://buy.stripe.com/fZubJ11si7EY1LudDudjO0d' },
  'kit-white': { mode: 'live', url: 'https://buy.stripe.com/cNi14n2wm1gAducdDudjO0e' },
  'filter-white': { mode: 'test', url: 'https://buy.stripe.com/test_3cI28r5Qy0pB953fmi97G07' },
  'filter-black': { mode: 'test', url: 'https://buy.stripe.com/test_5kQ14na6O5JV1CBa1Y97G0a' },
  'carbon-2oz': { mode: 'live', url: 'https://buy.stripe.com/dRmeVd4Eu0cw75OczqdjO0c' },
  'carbon-12oz': { mode: 'live', url: 'https://buy.stripe.com/dRm28r0oe0cw75O8jadjO0b' },
});

// Fail closed: configuring or possessing a link never activates real payments.
// A future server checkout integration must explicitly establish shipping and
// merchant approval; this registry alone does not make checkout available.
export function getApprovedPaymentLink(variantCode, {
  merchantApproved = false,
  shippingConfirmed = false,
  goLiveApproved = false,
} = {}) {
  if (!Object.prototype.hasOwnProperty.call(SELLER_PAYMENT_LINKS, variantCode)) return null;
  const link = SELLER_PAYMENT_LINKS[variantCode];
  if (link.mode === 'live' && !(merchantApproved && shippingConfirmed && goLiveApproved)) return null;
  if (link.mode === 'test' && !link.url.startsWith('https://buy.stripe.com/test_')) return null;
  return link.url;
}
