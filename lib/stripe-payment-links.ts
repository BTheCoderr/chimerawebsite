import { getVerifiedBlackFridayLink } from './stripe-black-friday';

// Public Stripe Payment Links Scott Keeley supplied on November 18, 2026.
// These are customer-facing checkout URLs, not secret API keys.
// Each variant must resolve to its own exact seller-provided destination.
export const STRIPE_PAYMENT_LINKS: Readonly<Record<string, string>> = Object.freeze({
  'kit-black': 'https://buy.stripe.com/fZueVd4Eugbubm4aridjO0n',
  'kit-white': 'https://buy.stripe.com/5kQcN50oe3oIbm49nedjO0r',
  'filter-white': 'https://buy.stripe.com/aFa00j1si2kE4XGfLCdjO0q',
  'filter-black': 'https://buy.stripe.com/3cI14nc6W4sM4XG8jadjO0p',
  'carbon-2oz': 'https://buy.stripe.com/9B6bJ12wmf7q75ObvmdjO0m',
  'carbon-12oz': 'https://buy.stripe.com/9B69AT0oef7q3TC1UMdjO0o',
});

export function getStripePaymentLink(variantCode: string): string | null {
  if (!Object.prototype.hasOwnProperty.call(STRIPE_PAYMENT_LINKS, variantCode)) return null;
  const regularLink = STRIPE_PAYMENT_LINKS[variantCode];
  // Black Friday is OFF by default, and every staged URL requires a positive
  // merchant verification before the sale can override a regular checkout.
  // Unverified/missing sale links ALWAYS retain the original product link.
  const saleLink = process.env.NEXT_PUBLIC_CHIMERA_BLACK_FRIDAY_ENABLED === 'true'
    ? getVerifiedBlackFridayLink(variantCode)
    : null;
  const link = saleLink ?? regularLink;
  return link.startsWith('https://buy.stripe.com/') && !link.includes('/test_')
    ? link
    : null;
}
