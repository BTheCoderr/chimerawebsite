import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Contact Chimera Water',
  description: 'Contact Chimera Water by email or at 62 Baxter Street, Charlestown, RI 02813.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return <div className="chimera">
    <SiteHeader page="contact" />
    <main id="main">
      <section className="contact-page page-shell" aria-labelledby="contact-title">
        <span className="eyeline">CHIMERA WATER / CONTACT</span>
        <h1 id="contact-title">Get in <em>touch.</em></h1>
        <p className="contact-intro">Questions about a Chimera product or your order? Reach Chimera Water directly.</p>
        <div className="contact-information">
          <div className="contact-info-item">
            <span className="eyeline">EMAIL</span>
            <a href="mailto:scott@keeleydeangelo.com">scott@keeleydeangelo.com <span aria-hidden="true">↗</span></a>
          </div>
          <div className="contact-info-item">
            <span className="eyeline">MAILING ADDRESS</span>
            <address>Chimera Water<br />62 Baxter Street<br />Charlestown, RI 02813</address>
          </div>
        </div>
        <div className="contact-help-link">Need instructions or buying information? <Link href="/help/">Visit Help <span aria-hidden="true">↗</span></Link></div>
      </section>
    </main>
    <SiteFooter />
  </div>;
}
