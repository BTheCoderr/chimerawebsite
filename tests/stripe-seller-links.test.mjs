import test from 'node:test';
import assert from 'node:assert/strict';
import { SELLER_PAYMENT_LINKS, getApprovedPaymentLink } from '../lib/stripe-seller-links.server.mjs';

test('Scott provided distinct live payment links for black and white complete kits', () => {
  assert.equal(SELLER_PAYMENT_LINKS['kit-black'].url, 'https://buy.stripe.com/fZubJ11si7EY1LudDudjO0d');
  assert.equal(SELLER_PAYMENT_LINKS['kit-white'].url, 'https://buy.stripe.com/cNi14n2wm1gAducdDudjO0e');
  assert.notEqual(SELLER_PAYMENT_LINKS['kit-black'].url, SELLER_PAYMENT_LINKS['kit-white'].url);
});
test('ceramic filter links remain in Stripe test mode, matched to selected color', () => {
  assert.deepEqual(SELLER_PAYMENT_LINKS['filter-white'], {mode:'test',url:'https://buy.stripe.com/test_3cI28r5Qy0pB953fmi97G07'});
  assert.deepEqual(SELLER_PAYMENT_LINKS['filter-black'], {mode:'test',url:'https://buy.stripe.com/test_5kQ14na6O5JV1CBa1Y97G0a'});
});
test('Scott provided individual carbon refill links, but no standalone carafe link', () => {
  assert.equal(SELLER_PAYMENT_LINKS['carbon-2oz'].url, 'https://buy.stripe.com/dRmeVd4Eu0cw75OczqdjO0c');
  assert.equal(SELLER_PAYMENT_LINKS['carbon-12oz'].url, 'https://buy.stripe.com/dRm28r0oe0cw75O8jadjO0b');
  assert.equal(getApprovedPaymentLink('carafe'),null);
});
test('live links stay disabled without explicit merchant, shipping and launch approvals', () => {
  for (const variant of ['kit-black','kit-white','carbon-2oz','carbon-12oz']) {
    assert.equal(getApprovedPaymentLink(variant),null);
    assert.equal(getApprovedPaymentLink(variant,{merchantApproved:true}),null);
    assert.equal(getApprovedPaymentLink(variant,{merchantApproved:true,shippingConfirmed:true}),null);
    assert.equal(getApprovedPaymentLink(variant,{merchantApproved:true,goLiveApproved:true}),null);
    assert.equal(getApprovedPaymentLink(variant,{merchantApproved:true,shippingConfirmed:true,goLiveApproved:true}),SELLER_PAYMENT_LINKS[variant].url);
  }
});
test('unknown and prototype-like variant values never resolve to a payment link', () => {
  for(const variant of ['__proto__','constructor','toString','price_fake','',null]){
    assert.equal(getApprovedPaymentLink(variant),null);
  }
});
test('all live links are valid-looking Stripe Payment Links and test links remain prefixed test_', () => {
  for(const [variant,data] of Object.entries(SELLER_PAYMENT_LINKS)){
    assert.equal(data.url.startsWith('https://buy.stripe.com/'),true,variant);
    assert.equal(data.url.includes('/test_'),data.mode==='test',variant);
  }
});
