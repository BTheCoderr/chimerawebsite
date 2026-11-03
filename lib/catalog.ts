export type CatalogVariant = {
  code: string;
  label: string;
  image?: string;
  imageAlt?: string;
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

// Product definitions only. Stripe Price IDs live in server-side Netlify Functions.
// Do not store keys, prices or live inventory in this client-accessible catalog.
export const EXTERNAL_SELLER_URL = 'https://shop.tiktok.com/us/pdp/1732555288933666944';

export const PRODUCTS: CatalogProduct[] = [
  {
    slug: 'chimera-kit',
    name: 'The Chimera kit',
    type: 'COMPLETE KIT',
    shortDescription: 'Glass carafe + ceramic filter + 2 oz activated charcoal.',
    description: 'The complete Chimera kit pairs a borosilicate glass carafe with your choice of black or white ceramic filter, a stopper and a 2 oz activated carbon pouch.',
    image: '/images/PastedGraphic-1.png',
    imageAlt: 'Chimera glass carafe with black ceramic filter installed and gray wool grip',
    imageContext: 'Black ceramic Chimera kit photographed assembled. The included 2 oz carbon pouch and stopper are not pictured.',
    includes: ['One borosilicate glass carafe with wool grip', 'One ceramic filter in the selected color', 'One ceramic stopper', 'One 2 oz bag of activated carbon'],
    excludes: ['12 oz charcoal refill'],
    additionalNotes: ['Select black or white for the ceramic housing. The black kit photo does not show the separately packed carbon.'],
    variants: [
      { code: 'kit-black', label: 'Black', image: '/images/PastedGraphic-1.png', imageAlt: 'Complete Chimera carafe with black ceramic filter installed' },
      { code: 'kit-white', label: 'White', image: '/images/Inventory Product3.jpeg', imageAlt: 'Complete Chimera carafe with white ceramic filter installed' },
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
    variants: [{ code: 'carbon-2oz', label: '2 oz bag' }],
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
    variants: [{ code: 'carbon-12oz', label: '12 oz bag' }],
  },
  {
    slug: 'glass-carafe',
    name: 'Glass carafe',
    type: 'CARAFE ONLY',
    shortDescription: 'The Chimera glass carafe, on its own.',
    description: 'The Chimera borosilicate glass carafe has a wool insulated grip and can also be used as a pour-over coffee carafe. This listing is for the carafe by itself; the ceramic filter and activated charcoal are separate.',
    image: '/images/IMG_6069.png',
    imageAlt: 'Clear Chimera borosilicate glass carafe with a gray wool insulated grip, photographed by itself',
    imageContext: 'Actual carafe-only product photo. Ceramic filter housing and activated carbon are not included.',
    includes: ['One glass carafe'],
    excludes: ['Ceramic filter', 'Activated charcoal'],
    additionalNotes: ['Check compatibility before pairing with another filter or coffee brewer.'],
    variants: [{ code: 'carafe', label: 'Glass carafe' }],
  },
  {
    slug: 'ceramic-filter',
    name: 'Ceramic filter',
    type: 'FILTER ONLY',
    shortDescription: 'Black or white ceramic housing, stopper and 2 oz activated carbon.',
    description: 'A reusable, high-fired, taste-neutral ceramic housing for activated carbon, available in black or white. Choose your ceramic color. The filter pack includes 2 oz of activated carbon but does not include the glass carafe.',
    image: '/images/Filter_Pack_Black.jpeg',
    imageAlt: 'Black ceramic Chimera filter housing, stopper and included 2 oz activated carbon pouch',
    imageContext: 'Actual black filter pack photo. The selected ceramic housing, stopper and 2 oz activated carbon are included; glass carafe is not.',
    includes: ['One ceramic filter housing in the selected color', 'One ceramic stopper', 'One 2 oz bag of activated carbon'],
    excludes: ['Glass carafe', '12 oz charcoal refill'],
    additionalNotes: ['Available in black or white.', 'Confirm compatibility if you plan to use an existing carafe.'],
    variants: [
      { code: 'filter-black', label: 'Black', image: '/images/Filter_Pack_Black.jpeg', imageAlt: 'Black ceramic filter housing and stopper beside a 2 oz carbon pouch' },
      { code: 'filter-white', label: 'White', image: '/images/Filter_Pack_White.jpeg', imageAlt: 'White ceramic filter housing and stopper beside a 2 oz carbon pouch' },
    ],
  },
];

export function getProduct(slug: string): CatalogProduct | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}
