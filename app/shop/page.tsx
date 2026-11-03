import Link from 'next/link';
import type { Metadata } from 'next';
import { PRODUCTS } from '@/lib/catalog';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { KitPhoto } from '@/components/KitPhoto';

export const metadata: Metadata = {
  title: 'Shop the Chimera collection',
  description: 'Start with the complete Chimera kit, featuring a glass carafe, your choice of ceramic filter, stopper and 2 oz carbon. Explore refills and individual parts.',
  alternates: { canonical: '/shop/' },
};

export default function ShopPage() {
  return <div className="chimera">
    <SiteHeader page="shop" />
    <main id="main">
      <section className="shop-intro page-shell">
        <div className="eyeline">CHIMERA / THE COMPLETE KIT FIRST</div>
        <div className="shop-intro-grid">
          <h1>One kit.<br /><em>All the essentials.</em></h1>
          <div className="shop-intro-action">
            <p>Start with the full Chimera system: a borosilicate glass carafe, your choice of black or white ceramic filter, a stopper and 2 oz of activated carbon. Everything in one thoughtful set.</p>
            <Link className="shop-kit-cta" href="/shop/chimera-kit/">Explore the complete kit <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <p className="shop-pricing-note">Refills and individual components are also listed below. Direct checkout is being configured; prices and shipping will be shown when approved by Scott.</p>
      </section>
      <section className="shop-collection page-shell" aria-label="Chimera product collection">
        {PRODUCTS.map((product, index) => (
          <article key={product.slug} className={'shop-item shop-item--' + product.slug + (!product.image ? ' shop-item--text-only' : '')}>
            {product.image && <Link href={'/shop/' + product.slug + '/'} className="shop-item-media" aria-label={'View details for ' + product.name}>
              {product.slug === 'chimera-kit' ?
                <KitPhoto label={product.imageAlt ?? product.name} /> :
                <img src={product.image} alt={product.imageAlt ?? product.name} loading={index < 2 ? 'eager' : 'lazy'} />}
              <span className="shop-tile-index" aria-hidden="true">{String(index + 1).padStart(2, '0')} / 05</span>
              <span className="shop-photo-label" aria-hidden="true">
                {product.slug === 'ceramic-filter' ? 'BLACK FILTER PACK SHOWN · WHITE AVAILABLE' :
                 product.slug === 'chimera-kit' ? 'THE COMPLETE KIT · BLACK CERAMIC SHOWN' :
                 'CARAFE ONLY · NO FILTER'}
              </span>
            </Link>}
            <div className="shop-item-details">
              <span className="eyeline">{String(index + 1).padStart(2, '0')} / {product.type}</span>
              {product.slug === 'chimera-kit' && <span className="shop-featured-note">START WITH THE COMPLETE KIT</span>}
              <h2><Link href={'/shop/' + product.slug + '/'}>{product.name}</Link></h2>
              <p>{product.shortDescription}</p>
              {product.slug === 'chimera-kit' && <p className="shop-kit-includes">Glass carafe · black or white ceramic filter · ceramic stopper · 2 oz activated carbon</p>}
              {product.variants.length > 1 && <span className="shop-variant-note">Choose black or white ceramic</span>}
              <Link className="shop-item-link" href={'/shop/' + product.slug + '/'}>{product.slug === 'chimera-kit' ? 'Explore the complete kit' : product.image ? 'View product details' : 'Explore this refill'} <span aria-hidden="true">↗</span></Link>
            </div>
          </article>
        ))}
      </section>
      <section className="shop-lower-note page-shell">
        <span className="eyeline">THE COMPLETE KIT. THEN WHAT YOU NEED.</span>
        <h2>Keep what lasts.<br /><em>Refill what doesn’t.</em></h2>
        <p>The complete kit is the easiest place to begin. Add carbon refills or individual parts whenever you need them.</p>
        <Link className="link-line" href="/help/">Read buying help <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
    <SiteFooter />
  </div>;
}
