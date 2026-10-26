export type CatalogVariant = {
  code: string;
  label: string;
  image?: string;
  imageAlt?: string;
  shopifyVariantId: string | null;
};

export type CatalogProduct = {
  slug: string;
  name: string;
  type: string;
  shortDescription: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imageContext?: string;
  includes: string[];
  excludes: string[];
  additionalNotes?: string[];
  variants: CatalogVariant[];
};

// These identifiers are configuration fields, not proof that merchant SKUs exist.
// To enable secure checkout, Scott must create the products in his own Shopify store
// and supply a myshopify.com domain plus the exact numeric variant IDs.
// No prices, inventory, availability, or merchant SKUs are invented here.
const ENV_VARIANTS = {
  carafe: process.env.NEXT_PUBLIC_SHOPIFY_VARIANT_CARAFE || '',
  filterBlack: process.env.NEXT_PUBLIC_SHOPIFY_VARIANT_FILTER_BLACK || '',
  filterWhite: process.env.NEXT_PUBLIC_SHOPIFY_VARIANT_FILTER_WHITE || '',
  carbon2oz: process.env.NEXT_PUBLIC_SHOPIFY_VARIANT_CARBON_2OZ || '',
  carbon12oz: process.env.NEXT_PUBLIC_SHOPIFY_VARIANT_CARBON_12OZ || '',
  kit: process.env.NEXT_PUBLIC_SHOPIFY_VARIANT_KIT || '',
};
const variantId = (value: string): string | null => /^\\d{8,20}$/.test(value) ? value : null;

export const EXTERNAL_SELLER_URL = 'https://shop.tiktok.com/us/pdp/1732555288933666944';
export const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '';

export const PRODUCTS: CatalogProduct[] = [
  {
    slug: 'glass-carafe',
    name: 'Glass carafe',
    type: 'CARAFE ONLY',
    shortDescription: 'The Chimera glass carafe, on its own.',
    description: 'The Chimera glass carafe for water service and a compatible pour-over setup. This option is the carafe by itself.',
    image: '/images/KS Image-02-RS.jpg',
    imageAlt: 'Chimera glass carafe being used to pour water at the kitchen counter',
    imageContext: 'Lifestyle photo shows the carafe in use. Any filter pictured is not included with this standalone listing.',
    includes: ['One glass carafe'],
    excludes: ['Ceramic filter', 'Activated charcoal'],
    additionalNotes: ['Check compatibility before pairing with another filter or coffee brewer.'],
    variants: [{ code: 'carafe', label: 'Glass carafe', shopifyVariantId: variantId(ENV_VARIANTS.carafe) }],
  },
  {
    slug: 'ceramic-filter',
    name: 'Ceramic filter',
    type: 'FILTER ONLY',
    shortDescription: 'The reusable ceramic filter, in black or white.',
    description: 'A reusable ceramic filtration component for a compatible Chimera-style carafe. Choose your ceramic color. The filter is sold by itself.',
    image: '/images/Water_Image-02.jpg',
    imageAlt: 'Black ceramic Chimera filter fitted in a glass carafe',
    imageContext: 'Photography shows the filter fitted into a carafe. The carafe is not included with a filter-only purchase.',
    includes: ['One ceramic filter in the selected color'],
    excludes: ['Glass carafe', 'Activated charcoal'],
    additionalNotes: ['Available in black or white.', 'Confirm compatibility if you plan to use an existing carafe.'],
    variants: [
      { code: 'filter-black', label: 'Black', image: '/images/Water_Image-02.jpg', imageAlt: 'Black ceramic Chimera filter installed in a glass carafe for demonstration', shopifyVariantId: variantId(ENV_VARIANTS.filterBlack) },
      { code: 'filter-white', label: 'White', image: '/images/Inventory Product3.jpeg', imageAlt: 'White ceramic Chimera filter installed in a glass carafe for demonstration', shopifyVariantId: variantId(ENV_VARIANTS.filterWhite) },
    ],
  },
  {
    slug: 'charcoal-2oz',
    name: 'Activated charcoal — 2 oz',
    type: 'SMALL REFILL',
    shortDescription: 'A 2 oz bag of replacement activated charcoal.',
    description: 'The smaller charcoal refill for Chimera. Scott has confirmed this as a separate product in the online store.',
    includes: ['One 2 oz bag of activated charcoal'],
    excludes: ['Glass carafe', 'Ceramic filter'],
    additionalNotes: ['Original packaging photography is still to be supplied.', 'Use and replace charcoal according to approved product instructions.'],
    variants: [{ code: 'carbon-2oz', label: '2 oz bag', shopifyVariantId: variantId(ENV_VARIANTS.carbon2oz) }],
  },
  {
    slug: 'charcoal-12oz',
    name: 'Activated charcoal — 12 oz',
    type: 'LARGE REFILL',
    shortDescription: 'A 12 oz bag of replacement activated charcoal.',
    description: 'The larger charcoal refill for Chimera. Scott has confirmed this as a separate product in the online store.',
    includes: ['One 12 oz bag of activated charcoal'],
    excludes: ['Glass carafe', 'Ceramic filter'],
    additionalNotes: ['Original packaging photography is still to be supplied.', 'Use and replace charcoal according to approved product instructions.'],
    variants: [{ code: 'carbon-12oz', label: '12 oz bag', shopifyVariantId: variantId(ENV_VARIANTS.carbon12oz) }],
  },
  {
    slug: 'chimera-kit',
    name: 'The Chimera kit',
    type: 'COMPLETE KIT',
    shortDescription: 'Glass carafe + ceramic filter + 2 oz activated charcoal.',
    description: 'Scott’s complete kit pairs the glass carafe with the reusable ceramic filter and a 2 oz bag of activated charcoal.',
    image: '/images/Inventory Product3.jpeg',
    imageAlt: 'Chimera glass carafe with an installed white ceramic filter',
    imageContext: 'Photo shows a representative assembled setup, not all packaged kit contents. The 2 oz charcoal bag is not pictured.',
    includes: ['One glass carafe', 'One ceramic filter', 'One 2 oz bag of activated charcoal'],
    excludes: ['12 oz charcoal refill'],
    additionalNotes: ['Kit filter color has not yet been specified by Scott. Confirm the included color in the approved seller listing.'],
    variants: [{ code: 'kit', label: 'Chimera kit', shopifyVariantId: variantId(ENV_VARIANTS.kit) }],
  },
];

export function getProduct(slug: string): CatalogProduct | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getShopifyCheckoutLink(variantId: string | null, quantity = 1): string | null {
  const domain = SHOPIFY_STORE_DOMAIN.trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9-]*\\.myshopify\\.com$/.test(domain)) return null;
  if (!variantId || !/^\\d{8,20}$/.test(variantId)) return null;
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) return null;
  return 'https://' + domain + '/cart/' + variantId + ':' + quantity;
}
