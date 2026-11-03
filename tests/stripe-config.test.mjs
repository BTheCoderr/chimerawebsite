import test from 'node:test';
import assert from 'node:assert/strict';
import { isStripeCheckoutReady, getAllowedShippingCountries, parseCheckoutSelection, PRICE_ENV_FOR_VARIANT } from '../lib/stripe-config.mjs';

const ready = {
  STRIPE_CHECKOUT_ENABLED: 'true',
  STRIPE_SECRET_KEY: 'sk_test_exampleonly123',
  STRIPE_WEBHOOK_SECRET: 'whsec_exampleonly123',
  STRIPE_SHIPPING_RATE_ID: 'shr_exampleonly123',
  STRIPE_ALLOWED_SHIPPING_COUNTRIES: 'US',
  STRIPE_PRICE_CARAFE: 'price_carafe123',
  STRIPE_PRICE_FILTER_BLACK: 'price_black123',
  STRIPE_PRICE_FILTER_WHITE: 'price_white123',
  STRIPE_PRICE_CHARCOAL_2OZ: 'price_carbon2oz123',
  STRIPE_PRICE_CHARCOAL_12OZ: 'price_carbon12oz123',
  STRIPE_PRICE_KIT: 'price_kit123',
};

test('does not enable checkout with missing keys', () => {
  assert.equal(isStripeCheckoutReady({}), false);
});
test('explicit switch is required before test checkout', () => {
  assert.equal(isStripeCheckoutReady({...ready, STRIPE_CHECKOUT_ENABLED:'false'}), false);
});
test('live secret key is never accepted', () => {
  assert.equal(isStripeCheckoutReady({...ready, STRIPE_SECRET_KEY:'sk_live_exampleonly123'}), false);
});
test('all six seller-confirmed Stripe Price IDs are required', () => {
  for (const key of Object.values(PRICE_ENV_FOR_VARIANT)) {
    assert.equal(isStripeCheckoutReady({...ready, [key]:''}), false);
  }
  assert.equal(isStripeCheckoutReady(ready), true);
});
test('shipping rate and approved countries required', () => {
  assert.equal(isStripeCheckoutReady({...ready,STRIPE_SHIPPING_RATE_ID:''}),false);
  assert.equal(isStripeCheckoutReady({...ready,STRIPE_ALLOWED_SHIPPING_COUNTRIES:''}),false);
  assert.deepEqual(getAllowedShippingCountries({...ready,STRIPE_ALLOWED_SHIPPING_COUNTRIES:'US,CA'}), ['US','CA']);
  assert.equal(getAllowedShippingCountries({...ready,STRIPE_ALLOWED_SHIPPING_COUNTRIES:'unknown'}),null);
});
test('allowlisted variant is mapped server-side, not arbitrary price', () => {
  assert.deepEqual(parseCheckoutSelection({variantCode:'filter-white',quantity:2,price:'price_attacker'},ready), {
    variantCode:'filter-white',quantity:2,priceId:'price_white123'
  });
});
test('invalid and dangerous quantities are rejected', () => {
  for (const quantity of [-1,0,1.5,11,1000,'2',null,NaN]) {
    assert.equal(parseCheckoutSelection({variantCode:'carafe',quantity},ready),null);
  }
});
test('arbitrary variant codes and missing payloads are rejected', () => {
  for (const input of [null,[],{}, {variantCode:'price_attacker',quantity:1}, {variantCode:'__proto__',quantity:1}]) {
    assert.equal(parseCheckoutSelection(input,ready),null);
  }
});
test('Stripe price IDs must have safe format', () => {
  assert.equal(parseCheckoutSelection({variantCode:'kit',quantity:1},{...ready, STRIPE_PRICE_KIT:'https://evil.example'}),null);
});
