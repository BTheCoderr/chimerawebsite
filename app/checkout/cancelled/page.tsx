import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Checkout not completed',
  description: 'Return to the Chimera shop after leaving Stripe Checkout.',
  robots: { index: false, follow: false },
};

export default function CheckoutCancelled() {
  return <div className="chimera">
    <SiteHeader page="shop" />
    <main id="main" className="page-shell info-page">
      <span className="eyeline">CHIMERA / CHECKOUT</span>
      <h1>Take another<br /><em>look.</em></h1>
      <p>You've returned to Chimera without completing the checkout flow. You can revisit the collection or contact the seller about your order status.</p>
      <Link className="link-line" href="/shop/">Return to the collection <span aria-hidden="true">↗</span></Link>
    </main>
    <SiteFooter />
  </div>;
}
