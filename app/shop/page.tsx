import Link from 'next/link';
import type { Metadata } from 'next';
import { PRODUCTS } from '@/lib/catalog';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { KitPhoto } from '@/components/KitPhoto';

export const metadata: Metadata = {
  title: 'The Chimera kit & collection',
  description: 'Discover the complete Chimera kit with glass carafe, choice of black or white ceramic filter with lid and 2 oz carbon. Explore refill carbon and individual parts.',
  alternates: { canonical: '/shop/' },
};

const kit = PRODUCTS[0];
const refills = PRODUCTS.slice(1, 3);
const parts = PRODUCTS.slice(3);

export default function ShopPage() {
  return <div className="chimera">
    <SiteHeader page="shop" />
    <main id="main">
      <section className="studio-shop-hero" aria-labelledby="shop-heading">
        <div className="studio-shop-hero-media">
          <div className="studio-shop-media-caption"><span>THE CHIMERA KIT</span><span>01 / THE COLLECTION</span></div>
          <KitPhoto label="Complete Chimera system assembled with black ceramic filter and glass carafe" />
          <span className="studio-shop-media-footer">BLACK CERAMIC SHOWN / WHITE AVAILABLE</span>
        </div>
        <div className="studio-shop-hero-copy">
          <span className="studio-overline">THE COMPLETE SET / START HERE</span>
          <h1 id="shop-heading">The whole<br /><em>idea.</em></h1>
          <p className="studio-shop-lede">One kit, everything you need to begin.</p>
          <p>A borosilicate glass carafe with wool grip. Your choice of black or white reusable ceramic filter with a lid to hold the activated carbon. A 2 oz bag of activated carbon. All brought together in one considered system.</p>
          <Link href="/shop/chimera-kit/" className="studio-button studio-button--cream">Explore the complete kit <span aria-hidden="true">↗</span></Link>
          <div className="studio-shop-hero-specs">
            <span>01 / GLASS CARAFE</span>
            <span>02 / CERAMIC WITH LID</span>
            <span>03 / 2 OZ CARBON</span>
          </div>
        </div>
      </section>

      <section className="studio-shop-principles page-shell" aria-label="Why start with the Chimera kit">
        <div><span>01 / THE OBJECT</span><p>Glass and ceramic you keep.</p></div>
        <div><span>02 / THE CHOICE</span><p>Black or white ceramic.</p></div>
        <div><span>03 / THE REFILL</span><p>Replace the carbon as needed.</p></div>
      </section>

      <section className="studio-refills page-shell" aria-labelledby="refills-title">
        <div className="studio-section-head">
          <span className="studio-section-index">02 / KEEP IT GOING</span>
          <div><h2 id="refills-title">A new refill.<br /><em>Not a new filter.</em></h2><p>The ceramic and glass are made to be kept. Chimera also offers activated carbon on its own in two quantities.</p></div>
        </div>
        <div className="studio-refill-list">
          {refills.map((product, index) =>
            <article className="shop-item--text-only studio-refill-row" key={product.slug}>
              <span className="studio-refill-number">0{index + 2}</span>
              <div><span className="studio-overline">{product.type}</span><h3>{product.name}</h3><p>{product.shortDescription}</p></div>
              <Link href={'/shop/' + product.slug + '/'} aria-label={'Explore ' + product.name}>Explore refill <span aria-hidden="true">↗</span></Link>
            </article>
          )}
        </div>
      </section>

      <section className="studio-individual" aria-labelledby="individual-title">
        <div className="page-shell studio-section-head">
          <span className="studio-section-index">03 / INDIVIDUAL PARTS</span>
          <div><h2 id="individual-title">The pieces<br /><em>on their own.</em></h2><p>Already have part of the system? Explore the individual glass carafe or the ceramic filter pack in black or white, with 2 oz carbon included.</p></div>
        </div>
        <div className="studio-parts-grid page-shell">
          {parts.map((product, index) =>
            <article className={'shop-item shop-item--' + product.slug} key={product.slug}>
              {product.image && <Link className="shop-item-media studio-part-photo" href={'/shop/' + product.slug + '/'} aria-label={'View ' + product.name}>
                <img src={product.image} alt={product.imageAlt || product.name} loading="lazy" />
                <span className="shop-tile-index" aria-hidden="true">0{index + 4} / 05</span>
                <span className="shop-photo-label">{product.slug === 'glass-carafe' ? 'GLASS CARAFE ONLY' : 'BLACK FILTER PACK SHOWN'}</span>
              </Link>}
              <div className="studio-part-info">
                <span className="studio-overline">{product.type}</span>
                <h3><Link href={'/shop/' + product.slug + '/'}>{product.name}</Link></h3>
                <p>{product.shortDescription}</p>
                {product.variants.length > 1 && <p className="studio-variant-note">Black or white ceramic available</p>}
                <Link className="studio-text-link" href={'/shop/' + product.slug + '/'}>View product details <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
          )}
        </div>
      </section>

      <section className="studio-shop-end">
        <div className="page-shell studio-shop-end-inner">
          <span className="studio-section-index">START WITH THE COMPLETE KIT</span>
          <h2>One considered<br /><em>whole.</em></h2>
          <p>The glass, the ceramic with its lid, and the carbon. Begin with the complete system, and keep the individual parts and refills in mind for later.</p>
          <Link className="studio-button studio-button--solid" href="/shop/chimera-kit/">Explore the complete kit <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
      <div className="page-shell studio-payment-note">Direct checkout is being set up. Prices and shipping will appear here when approved by Scott. In the meantime, explore the products and their included components.</div>
    </main>
    <SiteFooter />
  </div>;
}
