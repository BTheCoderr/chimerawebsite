import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const paymentLinks = readFileSync(new URL('../lib/stripe-payment-links.ts', import.meta.url), 'utf8');
const selector = readFileSync(new URL('../components/PurchaseSelector.tsx', import.meta.url), 'utf8');
const catalog = readFileSync(new URL('../lib/catalog.ts', import.meta.url), 'utf8');
const shop = readFileSync(new URL('../app/shop/page.tsx', import.meta.url), 'utf8');

const expected = {
  'kit-black': 'https://buy.stripe.com/fZueVd4Eugbubm4aridjO0n',
  'kit-white': 'https://buy.stripe.com/5kQcN50oe3oIbm49nedjO0r',
  'filter-white': 'https://buy.stripe.com/aFa00j1si2kE4XGfLCdjO0q',
  'filter-black': 'https://buy.stripe.com/3cI14nc6W4sM4XG8jadjO0p',
  'carbon-2oz': 'https://buy.stripe.com/9B6bJ12wmf7q75ObvmdjO0m',
  'carbon-12oz': 'https://buy.stripe.com/9B69AT0oef7q3TC1UMdjO0o',
};

test('all six seller-supplied live links are mapped exactly and distinctly', () => {
  const actual = Object.fromEntries(
    [...paymentLinks.matchAll(/^\s*'([\w-]+)': '(https:\/\/buy\.stripe\.com\/[^']+)',?$/gm)]
      .map(([, variant, url]) => [variant, url])
  );
  assert.deepEqual(actual, expected);
  assert.equal(new Set(Object.values(actual)).size, 6);
  for (const link of Object.values(actual)) assert.equal(link.includes('/test_'), false);
});

test('every catalog variant with a payment link is covered, except standalone carafe', () => {
  const variants = [...catalog.matchAll(/code: '([\w-]+)'/g)].map((m) => m[1]);
  assert.deepEqual(variants.filter((v) => !(v in expected)), ['carafe']);
});

test('selected finish resolves its own Stripe checkout; carafe is not misrouted', () => {
  assert.match(selector, /getStripePaymentLink\(selectedCode\)/);
  assert.match(selector, /href=\{paymentLink\}/);
  assert.match(selector, /Checkout with Stripe/);
  assert.match(selector, /Glass carafe-only checkout is not yet available\./);
  assert.doesNotMatch(selector, /Continue to Stripe test checkout/);
  assert.doesNotMatch(selector, /Direct checkout is being set up\./);
  assert.doesNotMatch(selector, /EXTERNAL_SELLER_URL/);
  assert.doesNotMatch(shop, /Direct checkout is being set up\./);
});

test('payment-link lookup is restricted to seller-provided URLs', () => {
  assert.match(paymentLinks, /Object\.prototype\.hasOwnProperty\.call\(STRIPE_PAYMENT_LINKS, variantCode\)/);
  assert.match(paymentLinks, /startsWith\('https:\/\/buy\.stripe\.com\/'\)/);
  assert.match(paymentLinks, /!link\.includes\('\/test_'\)/);
});
