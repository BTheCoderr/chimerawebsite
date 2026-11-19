import test from 'node:test';
import assert from 'node:assert/strict';
import { SELLER_PAYMENT_LINKS, getApprovedPaymentLink } from '../lib/stripe-seller-links.server.mjs';

const updatedLinks = {
  'kit-black': 'https://buy.stripe.com/fZueVd4Eugbubm4aridjO0n',
  'kit-white': 'https://buy.stripe.com/5kQcN50oe3oIbm49nedjO0r',
  'filter-white': 'https://buy.stripe.com/aFa00j1si2kE4XGfLCdjO0q',
  'filter-black': 'https://buy.stripe.com/3cI14nc6W4sM4XG8jadjO0p',
  'carbon-2oz': 'https://buy.stripe.com/9B6bJ12wmf7q75ObvmdjO0m',
  'carbon-12oz': 'https://buy.stripe.com/9B69AT0oef7q3TC1UMdjO0o',
};

test('the six newest Scott URLs map to the correct colors, kits and refills', () => {
  assert.deepEqual(Object.keys(SELLER_PAYMENT_LINKS).sort(), Object.keys(updatedLinks).sort());
  for(const [variant,url] of Object.entries(updatedLinks)) {
    assert.deepEqual(SELLER_PAYMENT_LINKS[variant],{mode:'live',url},variant);
    assert.equal(url.startsWith('https://buy.stripe.com/'),true);
    assert.equal(url.includes('/test_'),false);
  }
  assert.notEqual(SELLER_PAYMENT_LINKS['kit-black'].url, SELLER_PAYMENT_LINKS['kit-white'].url);
  assert.notEqual(SELLER_PAYMENT_LINKS['filter-black'].url, SELLER_PAYMENT_LINKS['filter-white'].url);
});

test('no direct checkout is available without all three explicit business approvals', () => {
  for (const variant of Object.keys(updatedLinks)) {
    for (const flags of [
      {}, {merchantApproved:true}, {shippingConfirmed:true}, {goLiveApproved:true},
      {merchantApproved:true,shippingConfirmed:true}, {merchantApproved:true,goLiveApproved:true},
      {shippingConfirmed:true,goLiveApproved:true},
      {merchantApproved:'true',shippingConfirmed:true,goLiveApproved:true},
    ]) assert.equal(getApprovedPaymentLink(variant,flags),null,variant);
    assert.equal(getApprovedPaymentLink(variant,{
      merchantApproved:true,shippingConfirmed:true,goLiveApproved:true,
    }),updatedLinks[variant]);
  }
});

test('unknown and prototype-like variants never resolve to payment links', () => {
  for(const variant of ['__proto__','constructor','toString','price_fake','carafe','',null]) {
    assert.equal(getApprovedPaymentLink(variant),null);
  }
});
