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
        <p>Find out what's included, where to purchase, and how to get help with your Chimera.</p>
      </section>
      <section className="service-content page-shell">
        <div className="section-label"><span>01</span><span>BUYING HELP</span></div>
        <div className="service-questions">
          <details open><summary>How do I buy Chimera?</summary><p>Purchasing currently happens through an external seller. Visit <a href={shop} target="_blank" rel="noopener noreferrer">Chimera on TikTok Shop</a> for available options and pricing. This website does not process orders or payments.</p></details>
          <details><summary>What's included with the complete system?</summary><p>The complete setup is described as a glass carafe and reusable ceramic filtration component. Carbon inclusion, colors and other contents may vary by seller listing. Review the selected listing before purchasing.</p></details>
          <details><summary>Can I purchase just the ceramic insert?</summary><p>An insert-only option may be available. It is for a compatible cone-top carafe and does not include the glass vessel unless explicitly stated by the seller. Confirm carafe compatibility and availability with the seller first.</p></details>
          <details><summary>Where do I buy carbon refills?</summary><p>Chimera offers activated carbon in 2 oz and 12 oz bags, but individual checkout links have not been confirmed for this website. Ask the seller about refill options and current stock.</p></details>
          <details><summary>Who handles shipping, returns and refunds?</summary><p>The store where you place an order is responsible for its shipping, payment processing, return rules and order support. Review those terms at checkout and contact that seller through your order history.</p></details>
          <details><summary>How often should I replace the carbon?</summary><p>Follow the approved instructions included with your purchased product. Earlier promotional materials and printed instructions contain different replacement intervals; the website does not prescribe a universal interval.</p></details>
          <details><summary>Can Chimera make unsafe water safe to drink?</summary><p>Do not use Chimera alone to treat microbiologically unsafe water. The website makes no unverified claims about specific contaminants or third-party certification.</p></details>
        </div>
      </section>
      <section className="service-actions">
        <div className="page-shell service-actions-grid">
          <div><span className="eyeline">READY TO EXPLORE?</span><h2>Start with<br /><em>the product.</em></h2><a className="link-line" href={shop} target="_blank" rel="noopener noreferrer">Open TikTok Shop <span aria-hidden="true">↗</span></a></div>
          <div><span className="eyeline">ALREADY HAVE ONE?</span><h2>Keep it<br /><em>working well.</em></h2><Link className="link-line" href="/care/">Read Setup & Care <span aria-hidden="true">↗</span></Link></div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </div>;
}
