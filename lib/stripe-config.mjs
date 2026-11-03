// Server-only Stripe configuration and input validation. Do not import this into UI components.
// No keys, prices, inventory amounts or checkout URLs are embedded in the static site.
export const PRICE_ENV_FOR_VARIANT = Object.freeze({
  'carafe': 'STRIPE_PRICE_CARAFE',
  'filter-black': 'STRIPE_PRICE_FILTER_BLACK',
  'filter-white': 'STRIPE_PRICE_FILTER_WHITE',
  'carbon-2oz': 'STRIPE_PRICE_CHARCOAL_2OZ',
  'carbon-12oz': 'STRIPE_PRICE_CHARCOAL_12OZ',
  'kit-black': 'STRIPE_PRICE_KIT',
  'kit-white': 'STRIPE_PRICE_KIT',
});
const PRICE_NAMES = Object.values(PRICE_ENV_FOR_VARIANT);
const SHIPPABLE_COUNTRIES = new Set(['US', 'CA', 'GB', 'AU', 'NZ']);
const PRICE_RE = /^price_[a-zA-Z0-9]+$/;
const RATE_RE = /^shr_[a-zA-Z0-9]+$/;

export function getAllowedShippingCountries(env) {
  const raw = env.STRIPE_ALLOWED_SHIPPING_COUNTRIES || '';
  if (!raw.trim()) return null;
  const countries = raw.split(',').map(value => value.trim().toUpperCase());
  if (countries.length === 0 || countries.length > 5) return null;
  if (countries.some(c => !SHIPPABLE_COUNTRIES.has(c))) return null;
  return [...new Set(countries)];
}
export function isStripeCheckoutReady(env) {
  if (env.STRIPE_CHECKOUT_ENABLED !== 'true') return false;
  if (!/^sk_test_[a-zA-Z0-9]+$/.test(env.STRIPE_SECRET_KEY || '')) return false;
  if (!/^whsec_[a-zA-Z0-9]+$/.test(env.STRIPE_WEBHOOK_SECRET || '')) return false;
  if (!RATE_RE.test(env.STRIPE_SHIPPING_RATE_ID || '')) return false;
  if (!getAllowedShippingCountries(env)) return false;
  return PRICE_NAMES.every(key => PRICE_RE.test(env[key] || ''));
}
export function parseCheckoutSelection(input, env) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const {variantCode, quantity} = input;
  if (typeof variantCode !== 'string' ||
      !Object.prototype.hasOwnProperty.call(PRICE_ENV_FOR_VARIANT, variantCode)) return null;
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) return null;
  const priceId = env[PRICE_ENV_FOR_VARIANT[variantCode]];
  if (!PRICE_RE.test(priceId || '')) return null;
  return {variantCode, quantity, priceId};
}
