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
if (!home.includes('home-collection-grid') || !home.includes('KitPhoto')) errors.push('Homepage collection photo layout missing');
const shopPage = read('app/shop/page.tsx');
const purchase = read('components/PurchaseSelector.tsx');
const productPage = read('app/shop/[slug]/page.tsx');
if (!shopPage.includes('shop-item--text-only') || !shopPage.includes('product.image && <Link')) errors.push('Refill listings must not render a photo/placeholder box');
if (shopPage.includes('carbon-art') || shopPage.includes('PACK PHOTO PENDING') || shopPage.includes('TYPE ARTWORK')) errors.push('Placeholder artwork or pending photo label remains in collection');
if (purchase.includes('carbon-art') || purchase.includes('photography has not yet been provided') || purchase.includes('photo-caption">Actual')) errors.push('Placeholder graphic or apology remains on product detail');
if (!purchase.includes('{image && <div className="product-main-photo">') || !productPage.includes('product-layout--no-image')) errors.push('Photo-less product detail must use a clean, text-only layout');
if (!shopPage.includes('START WITH THE COMPLETE KIT') || !shopPage.includes('Explore the complete kit')) errors.push('Kit-first shopping emphasis missing');
if (!shopPage.includes('shop-photo-label') || !shopPage.includes('shop-tile-index')) errors.push('Secondary product gallery labels missing');
if (!fs.existsSync(path.join(root, 'app/visual-refinements.css'))) errors.push('Visual refinement styles missing');
if (!fs.existsSync(path.join(root, 'app/studio-2026.css'))) errors.push('Editorial storefront styles missing');
if (!read('app/layout.tsx').includes("import './studio-2026.css'")) errors.push('Editorial storefront stylesheet not imported');
if (!home.includes('studio-hero') || !home.includes('studio-kit-layout') || !home.includes('studio-colors') || !home.includes('href="/shop/chimera-kit/"')) errors.push('Homepage must lead with the complete kit and use Scott photos');
if (!shopPage.includes('shop-kit-feature') || !shopPage.includes('<PurchaseSelector product={kit} />') || !shopPage.includes('studio-refill-list') || !shopPage.includes('studio-parts-grid')) errors.push('Shop must lead with a real kit product layout, then refills, then individual parts');
if (!shopPage.includes('refills = PRODUCTS.slice(1, 3)') || !shopPage.includes('parts = PRODUCTS.slice(3)')) errors.push('Shop ordering must follow Scott instructions');
for (const photo of ['PastedGraphic-1.png', 'IMG_6069.png', 'Filter_Pack_Black.jpeg', 'Filter_Pack_White.jpeg']) {
  if (!fs.existsSync(path.join(root, 'public/images', photo))) errors.push('Missing Scott-provided product photo: ' + photo);
}
const actualSequence = [...catalog.matchAll(/slug: '([^']+)'/g)].map(m => m[1]).slice(0,5);
if (actualSequence.join(',') !== 'chimera-kit,charcoal-2oz,charcoal-12oz,glass-carafe,ceramic-filter') errors.push('Scott catalog order changed');
if (!catalog.includes("code: 'kit-black'") || !catalog.includes("code: 'kit-white'")) errors.push('Kit ceramic color variants missing');
if (!catalog.includes('One 2 oz bag of activated carbon')) errors.push('Ceramic filter carbon bundle missing');
// Scott's November 3 notes: the lid belongs to the ceramic, not to a fourth standalone product component.
for (const [name, source] of [['homepage', home], ['shop', shopPage], ['catalog', catalog], ['product selector', purchase], ['help', read('app/help/page.tsx')]]) {
  if (/stopper/i.test(source)) errors.push(name + ': separate stopper terminology must be removed; describe ceramic with lid instead');
}
if (!home.includes("['03', 'The carbon'") || home.includes("['04', 'The carbon'")) errors.push('Kit contents must be three-part: glass, ceramic with lid, carbon');
if (!purchase.includes('Kit includes the glass carafe, selected ceramic filter with lid and 2 oz carbon.') || shopPage.includes('04 / 2 OZ CARBON')) errors.push('Kit details must describe the correct three components');
if (!catalog.includes('One ceramic filter with lid in the selected color')) errors.push('Catalog must describe ceramic with its lid');
if (!catalog.includes("image: '/images/Water_Image-02.jpg'") || !purchase.includes('<img src={image} alt={imageAlt} />')) errors.push('Kit detail must use Scott\'s assembled-kit photograph in the same layout as the carafe');
if (!shopPage.includes('shop-kit-feature') || !productPage.includes('product-layout page-shell')) errors.push('Kit must use the carafe-style two-column product layout');
const productDetailSource = read('app/shop/[slug]/page.tsx');
if (!productDetailSource.includes("['glass-carafe', 'ceramic-filter', 'charcoal-2oz', 'charcoal-12oz']") || productDetailSource.includes('slice(0, 3)')) {
  errors.push('Kit related products must show all four individual items in Scott cost order');
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Chimera static audit passed: pages, unique photos, credits and public assets.');
