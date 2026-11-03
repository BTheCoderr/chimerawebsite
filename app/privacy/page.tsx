import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Privacy & third-party services',
  description: 'How Chimera handles browsing, YouTube video, and future Stripe-hosted checkout.',
  alternates: { canonical: '/privacy/' },
};
export default function PrivacyPage() {
  return <div className="chimera">
    <SiteHeader page="privacy" />
    <main id="main" className="page-shell info-page">
      <span className="eyeline">CHIMERA / WEBSITE INFORMATION</span>
      <h1>Privacy &<br /><em>external services.</em></h1>
      <p>This page describes Chimera's current website and planned hosted checkout. Shipping, payment and refund policies will be finalized before direct payments are enabled.</p>
      <h2>Browsing the website</h2>
      <p>The current site offers product information without accounts or on-site card collection. Netlify hosts the site and may process technical request data needed for delivery and security.</p>
      <h2>Watching the product film</h2>
      <p>The product film is hosted by YouTube. We load the YouTube player only after you press play; watching the film may involve data processing under YouTube's own privacy practices. You may also choose the direct YouTube link.</p>
      <h2>Purchasing and order support</h2>
      <p>The Shop links lead to Chimera's own product pages. Direct Stripe checkout is disabled pending merchant setup. When enabled, the purchase button will redirect to Stripe-hosted checkout, where Stripe handles payment details and may collect the shipping address needed by the seller. Chimera does not collect card numbers through the website. The optional external TikTok Shop link follows that marketplace's separate policies.</p>
      <h2>Questions</h2>
      <p>For product selection and purchasing information, please see <Link href="/help/">Buying & Product Help</Link>. For an order already placed, contact the seller through the marketplace used for your purchase.</p>
      <p className="info-fine">Website information reviewed November 2026. Review and extend this notice before enabling payment collection, analytics, customer accounts, or an order database.</p>
    </main>
    <SiteFooter />
  </div>;
}
