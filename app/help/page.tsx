import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Buying & product help',
  description: 'Frequently asked questions about Chimera products, what is included, carbon refills, shipping, returns and setup.',
  alternates: { canonical: '/help/' },
};

export default function HelpPage() {
  return <div className="chimera">
    <SiteHeader page="help" />
    <main id="main">
      <section className="service-hero page-shell">
        <span className="eyeline">CHIMERA / CUSTOMER INFORMATION</span>
        <h1>Good to know<br /><em>before you order.</em></h1>
        <p>Explore the complete kit first, followed by 2 oz and 12 oz carbon refills and individual glass and ceramic parts.</p>
      </section>
      <section className="service-content page-shell">
        <div className="section-label"><span>01</span><span>BUYING HELP</span></div>
        <div className="service-questions">
          <details open><summary>What products are in the online collection?</summary><p>Visit <Link href="/shop/">our collection</Link> for five separate listings: the complete kit (black or white ceramic), separate 2 oz and 12 oz carbon refills, the glass carafe by itself, and a ceramic filter pack (black or white) with 2 oz carbon.</p></details>
          <details><summary>What's included with the Chimera kit?</summary><p>Each kit includes the borosilicate glass carafe, your selected black or white ceramic filter with lid to hold the carbon, and one 2 oz bag of activated carbon.</p></details>
          <details><summary>Can I purchase just the ceramic filter?</summary><p>Yes. Scott's filter pack comes in black or white and includes the ceramic housing with lid and 2 oz carbon. The glass carafe is sold separately; check existing-carafe compatibility.</p></details>
          <details><summary>Are charcoal refills separate products?</summary><p>Yes. Scott specified individual 2 oz and 12 oz activated charcoal bags. Each has its own <Link href="/shop/">product listing</Link>. Individual purchase links and approved prices are still being connected.</p></details>
          <details><summary>Can I check out on the Chimera website yet?</summary><p>All five product pages are ready, but direct checkout is disabled while Stripe test keys, six approved Price IDs, shipping and tax settings are being configured. Once tested, customers will pay on Stripe-hosted checkout without leaving Chimera's product design. A separate TikTok Shop listing may carry different availability.</p></details>
          <details><summary>Who handles shipping, returns and refunds?</summary><p>Scott will publish shipping and return terms before direct checkout is enabled. Purchases made through the existing external retailer follow that retailer's terms; contact the seller through the marketplace for an existing order.</p></details>
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
