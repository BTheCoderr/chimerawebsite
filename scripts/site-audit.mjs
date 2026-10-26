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
if (!catalog.includes('myshopify') || !catalog.includes('getShopifyCheckoutLink')) errors.push('Missing Shopify checkout guard');
if (!read('components/PurchaseSelector.tsx').includes('Direct checkout is being set up.')) errors.push('Missing honest pre-checkout state');
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Chimera static audit passed: pages, unique photos, credits and public assets.');
