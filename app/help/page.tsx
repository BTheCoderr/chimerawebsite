import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Buying & product help',
  description: 'Frequently asked questions about Chimera products, what is included, carbon refills, shipping, returns and setup.',
  alternates: { canonical: '/help/' },
};
const shop = 'https://shop.tiktok.com/us/pdp/1732555288933666944';

export default function HelpPage() {
  return <div className="chimera">
    <SiteHeader page="help" />
    <main id="main">
      <section className="service-hero page-shell">
        <span className="eyeline">CHIMERA / CUSTOMER INFORMATION</span>
        <h1>Good to know<br /><em>before you order.</em></h1>
        <p>Scott has confirmed five products: the carafe, the ceramic filter in black or white, 2 oz charcoal, 12 oz charcoal, and the complete kit.</p>
      </section>
      <section className="service-content page-shell">
        <div className="section-label"><span>01</span><span>BUYING HELP</span></div>
        <div className="service-questions">
          <details open><summary>What products are in the online collection?</summary><p>Visit <Link href="/shop/">our collection</Link> for five separate listings: glass carafe only, ceramic filter only (black or white), 2 oz charcoal, 12 oz charcoal, and a kit containing the carafe, ceramic filter and 2 oz charcoal.</p></details>
          <details><summary>What's included with the Chimera kit?</summary><p>Scott specifies one glass carafe, one ceramic filter, and one 2 oz bag of activated charcoal. The filter color included in the kit has not yet been specified, so confirm that before ordering.</p></details>
          <details><summary>Can I purchase just the ceramic filter?</summary><p>Yes, the ceramic filter is a standalone catalog item with black and white color options. It does not include a glass carafe or charcoal. Check your existing carafe's compatibility.</p></details>
          <details><summary>Are charcoal refills separate products?</summary><p>Yes. Scott specified individual 2 oz and 12 oz activated charcoal bags. Each has its own <Link href="/shop/">product listing</Link>. Individual purchase links and approved prices are still being connected.</p></details>
          <details><summary>Can I check out on the Chimera website yet?</summary><p>Individual product pages are ready, but direct checkout is not active until Scott connects an authorized Shopify store, product variant IDs and approved inventory. TikTok Shop is an existing external sales channel, although that listing may not contain every new item.</p></details>
          <details><summary>Who handles shipping, returns and refunds?</summary><p>The store where you place an order is responsible for its shipping, payment processing, return rules and order support. Review those terms at checkout and contact that seller through your order history.</p></details>
          <details><summary>How often should I replace the carbon?</summary><p>Follow the approved instructions included with your purchased product. Earlier promotional materials and printed instructions contain different replacement intervals; the website does not prescribe a universal interval.</p></details>
          <details><summary>Can Chimera make unsafe water safe to drink?</summary><p>Do not use Chimera alone to treat microbiologically unsafe water. The website makes no unverified claims about specific contaminants or third-party certification.</p></details>
        </div>
      </section>
      <section className="service-actions">
        <div className="page-shell service-actions-grid">
          <div><span className="eyeline">READY TO EXPLORE?</span><h2>Start with<br /><em>the product.</em></h2><Link className="link-line" href="/shop/">Browse the Chimera collection <span aria-hidden="true">↗</span></Link></div>
          <div><span className="eyeline">ALREADY HAVE ONE?</span><h2>Keep it<br /><em>working well.</em></h2><Link className="link-line" href="/care/">Read Setup & Care <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>;
}
