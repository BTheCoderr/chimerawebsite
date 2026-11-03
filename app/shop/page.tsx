import Link from 'next/link';
import type { Metadata } from 'next';
import { PRODUCTS } from '@/lib/catalog';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { KitPhoto } from '@/components/KitPhoto';

export const metadata: Metadata = {
  title: 'Shop the Chimera collection',
  description: 'Explore Chimera glass carafes, black and white ceramic filters, activated charcoal in 2 oz and 12 oz sizes, and the complete kit.',
  alternates: { canonical: '/shop/' },
};

export default function ShopPage() {
  return <div className="chimera">
    <SiteHeader page="shop" />
    <main id="main">
      <section className="shop-intro page-shell">
        <div className="eyeline">CHIMERA / FIVE THOUGHTFUL ESSENTIALS</div>
        <div className="shop-intro-grid">
          <h1>The things that<br /><em>make it yours.</em></h1>
          <p>Start with the complete Chimera kit, then explore carbon refills and individual parts. Choose black or white ceramic for the kit or filter pack, each with 2 oz carbon included.</p>
        </div>
        <p className="shop-pricing-note">Secure Stripe checkout is being prepared. Until Scott approves product prices, shipping and inventory, the website does not accept direct payments.</p>
      </section>
      <section className="shop-collection page-shell" aria-label="Chimera product collection">
        {PRODUCTS.map((product, index) => (
          <article key={product.slug} className={'shop-item shop-item--' + product.slug + (!product.image ? ' shop-item--text-only' : '')}>
            {product.image && <Link href={'/shop/' + product.slug + '/'} className="shop-item-media" aria-label={'View details for ' + product.name}>
              {product.slug === 'chimera-kit' ? <KitPhoto label={product.imageAlt ?? product.name} /> :
                <img src={product.image} alt={product.imageAlt ?? product.name} loading={index < 2 ? 'eager' : 'lazy'} />}
              <span className="shop-tile-index" aria-hidden="true">{String(index + 1).padStart(2, '0')} / 05</span>
              <span className="shop-photo-label" aria-hidden="true">
                {product.slug === 'ceramic-filter' ? 'BLACK FILTER PACK SHOWN · WHITE AVAILABLE' :
                 product.slug === 'chimera-kit' ? 'COMPLETE KIT · BLACK CERAMIC SHOWN' :
                 'CARAFE ONLY · NO FILTER'}
              </span>
            </Link>}
            <div className="shop-item-details">
              <span className="eyeline">{String(index + 1).padStart(2, '0')} / {product.type}</span>
              <h2><Link href={'/shop/' + product.slug + '/'}>{product.name}</Link></h2>
              <p>{product.shortDescription}</p>
              {product.variants.length > 1 && <span className="shop-variant-note">Choose black or white ceramic</span>}
              <Link className="shop-item-link" href={'/shop/' + product.slug + '/'}>View product details <span aria-hidden="true">↗</span></Link>
            </div>
          </article>
        ))}
      </section>
      <section className="shop-lower-note page-shell">
        <span className="eyeline">FIVE PRODUCTS. ONE WAY OF THINKING.</span>
        <h2>Keep what lasts.<br /><em>Refill what doesn’t.</em></h2>
        <p>Need help choosing between the carafe, filter, refills and complete kit?</p>
        <Link className="link-line" href="/help/">Read buying help <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
    <SiteFooter />
  </div>;
}
