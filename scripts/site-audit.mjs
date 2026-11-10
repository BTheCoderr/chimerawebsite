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

// Concept B uses a gallery-led homepage with actual Scott product photography.
for (const fragment of [
  'className="cb-hero"', 'className="cb-black-panel"', 'className="cb-feature-grid"',
  'className="cb-materials-section"', 'className="cb-comparison-section"',
  'className="cb-founder-section"', 'className="cb-buy-section"',
  'HomeKitChoice', 'ProductFilm', 'href="/shop/chimera-kit/"',
]) {
  if (!home.includes(fragment)) errors.push('Missing Concept B homepage feature: ' + fragment);
}
if (!home.includes('src="/images/IMG_6116.jpeg"') || !home.includes('WHITE CERAMIC SHOWN')) {
  errors.push('Concept B white ceramic kit hero photograph missing');
}
if (!home.includes('src="/images/Water_Image-02.jpg"') || !home.includes('Now in black.')) {
  errors.push('Concept B black ceramic feature missing');
}
if (!home.includes('href="/shop/ceramic-filter/"')) {
  errors.push('Concept B ceramic filter link missing');
}
const homeKitSelector = read('components/HomeKitChoice.tsx');
if (!homeKitSelector.includes("useState<Finish>('white')") ||
    !homeKitSelector.includes('/images/IMG_6116.jpeg') ||
    !homeKitSelector.includes('/images/Water_Image-02.jpg') ||
    !homeKitSelector.includes('aria-pressed')) {
  errors.push('Accessible white/black kit finish gallery missing');
}
if (!home.includes('Typical cartridge pitcher*') || !home.includes('Typical designs vary')) {
  errors.push('Comparison must be qualified and not claim unverified statistics');
}
if (!home.includes('Direct checkout') && !homeKitSelector.includes('Direct checkout')) {
  errors.push('Unapproved purchase options may not be presented as live');
}
for (const claim of ['1,800', '40 gallons', '$3 refill', 'From [PRICE]']) {
  if (home.includes(claim)) errors.push('Unapproved Concept B placeholder or claim: ' + claim);
}
if (!fs.existsSync(path.join(root, 'app/concept-b.css')) ||
    !read('app/layout.tsx').includes("import './concept-b.css'")) {
  errors.push('Concept B design system stylesheet is missing');
}

for (const [name, source] of [['homepage', home], ['care', care]]) {
  const images = [...source.matchAll(/(?:src|href)="(\/images\/[^"]+)"/g)].map((m) => m[1]);
  for (const image of images) {
    if (!fs.existsSync(path.join(root, 'public', image.slice(1)))) errors.push(name + ': missing ' + image);
  }
  if (!source.includes('SiteHeader') || !source.includes('SiteFooter')) errors.push(name + ': shared navigation missing');
  if (!source.includes('id="main"')) errors.push(name + ': main landmark missing');
}

const photos = [...home.matchAll(/src="(\/images\/[^"]+\.(?:jpg|jpeg|webp|png))"/g)].map((m) => m[1]);
for (const src of photos) {
  if (!fs.existsSync(path.join(root, 'public', src.slice(1)))) {
    errors.push('Missing homepage photo: ' + src);
  }
}
if (photos.length !== new Set(photos).size) {
  errors.push('Concept B homepage repeats a product photo unnecessarily');
}

for (const fragment of ['id="film"', 'id="collection"', 'ProductFilm', 'HomeKitChoice', 'chimera-kit', 'charcoal-2oz']) {
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
if (!film.includes('<video') || !film.includes('<source src={VIDEO_SRC} type="video/mp4"') || !film.includes('08_Chimera_Product_Film_With_Sound_58s.mp4')) errors.push('First-party Chimera product video missing');
if (film.includes('youtube-nocookie.com') || film.includes('<iframe')) errors.push('Old externally embedded product video remains');
for (const part of ['01', '02', '03']) {
  if (!fs.existsSync(path.join(root, 'media_src', 'film_with_audio.part' + part + '.b64'))) errors.push('Missing audio-enabled film source part: ' + part);
}
if (!read('scripts/assemble-promo-video.mjs').includes('soundtrackVideo') || !read('scripts/assemble-promo-video.mjs').includes('08_Chimera_Product_Film_With_Sound_58s.mp4')) {
  errors.push('Sound-enabled Chimera film not reconstructed for website build');
}
if (film.includes("const VIDEO_SRC = '/media/07_Clean_Widescreen_Footage_42s.mp4'")) errors.push('Silent film still used as website video');
if (!home.includes('href="/media/01_Coming_Soon_15s.mp4"')) errors.push('15-second coming-soon teaser missing');
const promoNames = [
  '01_Coming_Soon_15s.mp4', '02_Quick_Reveal_7s.mp4',
  '03_Product_Film_30s.mp4', '04_Filter_Ritual_12s.mp4',
  '05_Water_To_Coffee_12s.mp4', '06_Materials_11s.mp4',
];
const coverNames = promoNames.map((name) => name.replace('.mp4', '_cover.jpg'));
for (const file of promoNames) {
  const asset = path.join(root, 'public', 'media', file);
  if (!fs.existsSync(asset) || fs.statSync(asset).size < 10000) errors.push('Missing promotional video: ' + file);
}
for (const cover of coverNames) {
  if (!fs.existsSync(path.join(root, 'public', 'media', 'covers', cover))) errors.push('Missing promotional cover: ' + cover);
}
for (const part of ['01', '02', '03', '04']) {
  if (!fs.existsSync(path.join(root, 'media_src', 'clean_widescreen.part' + part + '.b64'))) errors.push('Missing widescreen film source part: ' + part);
}
if (!fs.existsSync(path.join(root, 'scripts', 'assemble-promo-video.mjs'))) errors.push('Missing widescreen video build step');
const pkg = JSON.parse(read('package.json'));
if (!pkg.scripts?.prebuild?.includes('assemble-promo-video.mjs')) errors.push('Widescreen video assembly is not wired to the production build');
if (read('app/privacy/page.tsx').includes('hosted by YouTube')) errors.push('Outdated video privacy notice');
const sitemap = read('public/sitemap.xml');
for (const route of ['/care/', '/help/', '/privacy/', '/shop/', '/shop/glass-carafe/', '/shop/ceramic-filter/', '/shop/charcoal-2oz/', '/shop/charcoal-12oz/', '/shop/chimera-kit/']) {
  if (!sitemap.includes(route)) errors.push('Missing sitemap route: ' + route);
}
const catalog = read('lib/catalog.ts');
for (const approvedLine of [
  'Carbon Filtered', 'Plastic Free', 'High-fired', 'Borosilicate glass',
  'wool insulated grip', 'activated carbon',
]) {
  if (!home.toLowerCase().includes(approvedLine.toLowerCase())) errors.push('Missing approved Chimera copy: ' + approvedLine);
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
if (!home.includes('cb-buy-section') || !home.includes('HomeKitChoice')) errors.push('Concept B kit-first product section missing');
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
if (!home.includes('cb-hero') || !home.includes('cb-materials-section') || !home.includes('cb-black-panel') || !home.includes('href="/shop/chimera-kit/"')) errors.push('Concept B homepage must lead with Scott kit photography');
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
if (!home.includes("title: 'Activated carbon'") || !home.includes("title: 'High-fired ceramic'") || !home.includes("title: 'Borosilicate glass'")) errors.push('Three material descriptions missing in Concept B');
if (!purchase.includes('Kit includes the glass carafe, selected ceramic filter with lid and 2 oz carbon.') || shopPage.includes('04 / 2 OZ CARBON')) errors.push('Kit details must describe the correct three components');
if (!catalog.includes('One ceramic filter with lid in the selected color')) errors.push('Catalog must describe ceramic with its lid');
if (!catalog.includes("image: '/images/IMG_6116.jpeg'") || !purchase.includes('<img src={image} alt={imageAlt} />')) errors.push('Kit detail must use the uploaded white-filter image in the same layout as the carafe');
if (!catalog.includes("{ code: 'kit-white', label: 'White', image: '/images/IMG_6116.jpeg'") || !catalog.includes("{ code: 'kit-black', label: 'Black', image: '/images/Water_Image-02.jpg'")) errors.push('Black and white kit variants must show accurate photos');
if (catalog.indexOf("code: 'kit-white'") > catalog.indexOf("code: 'kit-black'")) errors.push('Default kit photo must be the new white-filter image');
if (!shopPage.includes('shop-kit-feature') || !productPage.includes('product-layout page-shell')) errors.push('Kit must use the carafe-style two-column product layout');
const productDetailSource = read('app/shop/[slug]/page.tsx');
if (!productDetailSource.includes("['glass-carafe', 'ceramic-filter', 'charcoal-2oz', 'charcoal-12oz']") || productDetailSource.includes('slice(0, 3)')) {
  errors.push('Kit related products must show all four individual items in Scott cost order');
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Chimera Concept B static audit passed: product gallery, image assets, truthful copy and checkout safeguards.');
