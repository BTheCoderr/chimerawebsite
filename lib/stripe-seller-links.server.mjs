// Seller-supplied Stripe Payment Links from Scott's latest November 18 "Updated Links" email.
// All six URLs lack /test_ and appear live; verify product, pricing, tax and shipping in Scott's Stripe Dashboard before enabling.
// NOTE: Stripe Payment Links are public merchant URLs, not Stripe API credentials.
// This module is server-side only. Do not import it into client components or expose
// live URLs in the Concept B preview before shipping and launch approval.
export const SELLER_PAYMENT_LINKS = Object.freeze({
  'kit-black': { mode: 'live', url: 'https://buy.stripe.com/fZueVd4Eugbubm4aridjO0n' },
  'kit-white': { mode: 'live', url: 'https://buy.stripe.com/5kQcN50oe3oIbm49nedjO0r' },
  'filter-white': { mode: 'live', url: 'https://buy.stripe.com/aFa00j1si2kE4XGfLCdjO0q' },
  'filter-black': { mode: 'live', url: 'https://buy.stripe.com/3cI14nc6W4sM4XG8jadjO0p' },
  'carbon-2oz': { mode: 'live', url: 'https://buy.stripe.com/9B6bJ12wmf7q75ObvmdjO0m' },
  'carbon-12oz': { mode: 'live', url: 'https://buy.stripe.com/9B69AT0oef7q3TC1UMdjO0o' },
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
  if (link.mode === 'live' && !(merchantApproved === true && shippingConfirmed === true && goLiveApproved === true)) return null;
  if (link.mode === 'test' && !link.url.startsWith('https://buy.stripe.com/test_')) return null;
  return link.url;
}
