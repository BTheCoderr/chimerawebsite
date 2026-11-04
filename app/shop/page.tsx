import Link from 'next/link';
import type { Metadata } from 'next';
import { PRODUCTS } from '@/lib/catalog';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { PurchaseSelector } from '@/components/PurchaseSelector';

export const metadata: Metadata = {
  title: 'The Chimera kit & collection',
  description: 'Discover the complete Chimera kit with glass carafe, choice of black or white ceramic filter with lid and 2 oz carbon. Explore refill carbon and individual parts.',
  alternates: { canonical: '/shop/' },
};

const kit = PRODUCTS[0];
const refills = PRODUCTS.slice(1, 3);
const parts = PRODUCTS.slice(3);

export default function ShopPage() {
  return <div className="chimera">
    <SiteHeader page="shop" />
    <main id="main">
      <div className="page-shell shop-kit-headline"><span>THE COMPLETE KIT / START HERE</span></div>
      <section className="product-layout page-shell shop-kit-feature" aria-label="The Chimera kit">
        <PurchaseSelector product={kit} />
      </section>
      <div className="page-shell shop-kit-followup">
        <span>START WITH THE COMPLETE KIT</span>
        <Link href="/shop/chimera-kit/" className="studio-text-link">Explore the complete kit <span aria-hidden="true">↗</span></Link>
      </div>


