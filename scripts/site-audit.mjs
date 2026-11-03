import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const home = read('app/page.tsx');
const care = read('app/care/page.tsx');
const metadata = read('app/layout.tsx');
const header = read('components/SiteHeader.tsx');
const footer = read('components/SiteFooter.tsx');
const film = read('components/ProductFilm.tsx');
const errors = [];

for (const [name, source] of [['homepage', home], ['care', care]]) {
  const images = [...source.matchAll(/(?:src|href)="(\/images\/[^"]+)"/g)].map((m) => m[1]);
  for (const image of images) {
    if (!fs.existsSync(path.join(root, 'public', image.slice(1)))) errors.push(name + ': missing ' + image);
  }
  if (!source.includes('SiteHeader') || !source.includes('SiteFooter')) errors.push(name + ': shared navigation missing');
  if (!source.includes('id="main"')) errors.push(name + ': main landmark missing');
}

const photos = [...home.matchAll(/src="(\/images\/[^"]+\.(?:jpg|jpeg|webp|png))"/g)].map((m) => m[1]);
if (photos.length !== new Set(photos).size) errors.push('Homepage repeats a product photo');
for (const fragment of ['id="film"', 'id="collection"', 'ProductFilm', 'home-shop-index', 'chimera-kit', 'charcoal-2oz']) {
  if (!home.includes(fragment)) errors.push('Missing key homepage section: ' + fragment);
}
for (const file of ['public/robots.txt', 'public/sitemap.xml', 'app/icon.svg', 'app/help/page.tsx', 'app/privacy/page.tsx', 'app/not-found.tsx', 'app/shop/page.tsx', 'app/shop/[slug]/page.tsx', 'components/PurchaseSelector.tsx', 'lib/catalog.ts']) {
  if (!fs.existsSync(path.join(root, file))) errors.push('Missing metadata asset: ' + file);
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(absolute);
    else if (/\.(docx?|pdf|eps|xlsx?|pptx?)$/i.test(entry.name)) {
      errors.push('Unapproved document in public assets: ' + path.relative(root, absolute));
    }
  }
}
walk(path.join(root, 'public/images'));
if (!footer.includes('BAHEEM FERRELL') || !footer.includes('SCOTT KEELEY')) errors.push('Official credits missing');
if (!header.includes('skip-to-content') || !header.includes('mobile-menu')) errors.push('Navigation accessibility incomplete');
if (!film.includes('youtube-nocookie.com') || !film.includes('setActivated(true)')) errors.push('Click-to-play YouTube embed missing');
const sitemap = read('public/sitemap.xml');
for (const route of ['/care/', '/help/', '/privacy/', '/shop/', '/shop/glass-carafe/', '/shop/ceramic-filter/', '/shop/charcoal-2oz/', '/shop/charcoal-12oz/', '/shop/chimera-kit/']) {
  if (!sitemap.includes(route)) errors.push('Missing sitemap route: ' + route);
}
const catalog = read('lib/catalog.ts');
for (const approvedLine of ['Carbon Filtered', 'Plastic Free', 'high-fired, taste-neutral ceramic', 'thermally shock-resistant borosilicate', 'wool insulated grip', 'Better tasting coffee comes from better tasting water.', 'A borosilicate carafe holds your filtered water and makes great coffee.']) {
  if (!home.includes(approvedLine)) errors.push('Missing Scott copy: ' + approvedLine);
}
if (!home.includes('Good design starts with a <em>better question.</em>')) errors.push('Original philosophy section changed');
if (!metadata.includes('Carbon Filtered Water, Plastic Free')) errors.push('Homepage metadata not updated');
const items = ['glass-carafe', 'ceramic-filter', 'charcoal-2oz', 'charcoal-12oz', 'chimera-kit'];
for (const item of items) {
  if (!catalog.includes("slug: '" + item + "'")) errors.push('Missing catalog product: ' + item);
}
for (const variant of ['filter-black', 'filter-white', 'carbon-2oz', 'carbon-12oz']) {
  if (!catalog.includes("code: '" + variant + "'")) errors.push('Missing catalog variant: ' + variant);
}
if (catalog.includes('shopifyVariantId') || catalog.includes('getShopifyCheckoutLink')) errors.push('Obsolete Shopify checkout is still referenced');
if (!read('components/PurchaseSelector.tsx').includes('Direct checkout is being set up.')) errors.push('Missing honest pre-checkout state');
if (!read('components/PurchaseSelector.tsx').includes('create-checkout')) errors.push('Stripe frontend checkout not wired');
for (const file of ['netlify/functions/create-checkout.mts', 'netlify/functions/stripe-webhook.mts', 'netlify/functions/checkout-status.mts', 'lib/stripe-config.mjs', 'tests/stripe-config.test.mjs', 'app/checkout/success/page.tsx', 'app/checkout/cancelled/page.tsx']) {
  if (!fs.existsSync(path.join(root, file))) errors.push('Missing payment-ready file: ' + file);
}
if (!read('netlify/functions/create-checkout.mts').includes('isStripeCheckoutReady')) errors.push('Missing server-side checkout gate');
if (!read('netlify/functions/stripe-webhook.mts').includes('webhooks.constructEvent')) errors.push('Missing webhook signature verification');
for (const file of ['app/layout.tsx', 'public/sitemap.xml', 'public/robots.txt']) {
  if (read(file).includes('chimerawater.netlify.app')) errors.push('Old canonical URL remains in ' + file);
}
for (const file of ['app/privacy/page.tsx', 'app/help/page.tsx']) {
  if (read(file).includes('Shopify')) errors.push('Old Shopify wording remains in ' + file);
}
if (!home.includes('home-collection-grid') || !home.includes('chimera-kit-black.webp')) errors.push('Homepage collection photo layout missing');
const shopPage = read('app/shop/page.tsx');
if (!shopPage.includes('shop-photo-label') || !shopPage.includes('shop-tile-index')) errors.push('Product gallery labels missing');
if (!fs.existsSync(path.join(root, 'app/visual-refinements.css'))) errors.push('Visual refinement styles missing');
for (const photo of ['chimera-kit-black.webp', 'chimera-carafe-only.webp', 'chimera-filter-black.webp', 'chimera-filter-white.webp']) {
  if (!fs.existsSync(path.join(root, 'public/images', photo))) errors.push('Missing Scott-provided product photo: ' + photo);
}
const actualSequence = [...catalog.matchAll(/slug: '([^']+)'/g)].map(m => m[1]).slice(0,5);
if (actualSequence.join(',') !== 'chimera-kit,charcoal-2oz,charcoal-12oz,glass-carafe,ceramic-filter') errors.push('Scott catalog order changed');
if (!catalog.includes("code: 'kit-black'") || !catalog.includes("code: 'kit-white'")) errors.push('Kit ceramic color variants missing');
if (!catalog.includes('One 2 oz bag of activated carbon')) errors.push('Ceramic filter carbon bundle missing');
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Chimera static audit passed: pages, unique photos, credits and public assets.');
