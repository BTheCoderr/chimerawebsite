import Link from 'next/link';
import type { Metadata } from 'next';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'After checkout',
  description: 'Information on your Chimera checkout and how to get order support.',
  robots: { index: false, follow: false },
};

export default function CheckoutSuccess() {
  return <div className="chimera">
    <SiteHeader page="shop" />
    <main id="main" className="page-shell info-page">
      <span className="eyeline">CHIMERA / CHECKOUT</span>
      <h1>Thank you<br /><em>for visiting.</em></h1>
      <p>You've returned from Stripe Checkout. This page alone does not verify payment; refer to the Stripe receipt and the seller's confirmed order details.</p>
      <p>For any questions, please <Link href="/help/">review buying and order support</Link>.</p>
      <Link className="link-line" href="/shop/">Return to the collection <span aria-hidden="true">↗</span></Link>
    </main>
    <SiteFooter />
  </div>;
}
