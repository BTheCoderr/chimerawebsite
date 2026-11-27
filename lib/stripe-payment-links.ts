import { getVerifiedBlackFridayLink } from './stripe-black-friday';

// Black Friday 2026 release switch. Set false and redeploy to restore the
// untouched regular-price links. Netlify production env writes are unavailable.
export const BLACK_FRIDAY_ACTIVE = true;

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
  // Only Scott-confirmed sale links override a matching regular checkout.
  // The two carbon refills always retain their original links.
  const saleLink = BLACK_FRIDAY_ACTIVE ? getVerifiedBlackFridayLink(variantCode) : null;
  const link = saleLink ?? regularLink;
  return link.startsWith('https://buy.stripe.com/') && !link.includes('/test_')
    ? link
    : null;
}
