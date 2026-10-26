import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Privacy & third-party services',
  description: 'How the Chimera informational website uses external video and shopping services.',
  alternates: { canonical: '/privacy/' },
};
export default function PrivacyPage() {
  return <div className="chimera">
    <SiteHeader page="privacy" />
    <main id="main" className="page-shell info-page">
      <span className="eyeline">CHIMERA / WEBSITE INFORMATION</span>
      <h1>Privacy &<br /><em>external services.</em></h1>
      <p>This page explains how the current Chimera informational website is set up. It does not replace the privacy and payment policies of the external shops where purchases occur.</p>
      <h2>Browsing the website</h2>
      <p>The current website has no customer accounts, registration forms or direct checkout. Its hosting provider, Netlify, may process technical request details as part of delivering the website and maintaining security.</p>
      <h2>Watching the product film</h2>
      <p>The product film is hosted by YouTube. We load the YouTube player only after you press play; watching the film may involve data processing under YouTube's own privacy practices. You may also choose the direct YouTube link.</p>
      <h2>Purchasing and order support</h2>
      <p>The Shop link opens TikTok Shop, a separate service. Pricing, checkout, payment processing, shipping, returns, account information, and order messages are handled by that seller and platform under their own terms.</p>
      <h2>Questions</h2>
      <p>For product selection and purchasing information, please see <Link href="/help/">Buying & Product Help</Link>. For an order already placed, contact the seller through the marketplace used for your purchase.</p>
      <p className="info-fine">Website information last updated October 2026. This page should be reviewed when direct checkout, analytics or additional data collection is introduced.</p>
    </main>
    <SiteFooter />
  </div>;
}
