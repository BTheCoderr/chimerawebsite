import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const standard = readFileSync(new URL('../lib/stripe-payment-links.ts', import.meta.url), 'utf8');
const sale = readFileSync(new URL('../lib/stripe-black-friday.ts', import.meta.url), 'utf8');
const selector = readFileSync(new URL('../components/PurchaseSelector.tsx', import.meta.url), 'utf8');

const regularLinks = {
  'kit-black': 'https://buy.stripe.com/fZueVd4Eugbubm4aridjO0n',
  'kit-white': 'https://buy.stripe.com/5kQcN50oe3oIbm49nedjO0r',
  'filter-white': 'https://buy.stripe.com/aFa00j1si2kE4XGfLCdjO0q',
  'filter-black': 'https://buy.stripe.com/3cI14nc6W4sM4XG8jadjO0p',
  'carbon-2oz': 'https://buy.stripe.com/9B6bJ12wmf7q75ObvmdjO0m',
  'carbon-12oz': 'https://buy.stripe.com/9B69AT0oef7q3TC1UMdjO0o',
};
const holidayLinks = {
  'kit-black': 'https://buy.stripe.com/7sYbJ10oecZiai0dDudjO0s',
  'kit-white': 'https://buy.stripe.com/4gMdR90oe8J20HqbvmdjO0u',
  'filter-white': 'https://buy.stripe.com/14A7sL3Aqf7q2PygPGdjO0v',
  'filter-black': 'https://buy.stripe.com/fZucN5gnc0cwducfLCdjO0w',
};

test('all six regular payment links are preserved unchanged for restoring prices', () => {
  for (const [variant,url] of Object.entries(regularLinks)) {
    assert.ok(standard.includes("'" + variant + "': '" + url + "'"), variant);
  }
});

test('the four Friday links match the supplied document; no carbon URLs invented', () => {
  for(const [variant,url] of Object.entries(holidayLinks)) {
    assert.match(sale, new RegExp("'" + variant + "': \\{[\\s\\S]*?url: '" + url.replaceAll('.', '\\.') + "'"));
  }
  assert.doesNotMatch(sale,/['"]carbon-2oz['"]\s*:/);
  assert.doesNotMatch(sale,/['"]carbon-12oz['"]\s*:/);
});

test('no unverified Black Friday URL can replace the ordinary customer checkout', () => {
  const statuses=[...sale.matchAll(/verifiedByMerchant:\s*(true|false)/g)].map(m=>m[1]);
  assert.deepEqual(statuses,['false','false','false','false']);
  assert.match(sale,/if \(item\.verifiedByMerchant !== true\) return null/);
  assert.match(standard,/NEXT_PUBLIC_CHIMERA_BLACK_FRIDAY_ENABLED === 'true'/);
  assert.match(standard,/getVerifiedBlackFridayLink\(variantCode\)/);
  assert.match(standard,/const link = saleLink \?\? regularLink/);
  assert.match(selector,/getStripePaymentLink\(selectedCode\)/);
});

test('the complete-kit variants must be distinct from ceramic-only options', () => {
  assert.notEqual(holidayLinks['kit-black'],holidayLinks['filter-black']);
  assert.notEqual(holidayLinks['kit-white'],holidayLinks['filter-white']);
  assert.match(sale,/sourceLabel: 'Filter and Kit Black'/);
  assert.match(sale,/sourceLabel: 'Filter Kit White'/);
});
