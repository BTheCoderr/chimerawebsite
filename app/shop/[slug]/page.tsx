import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PRODUCTS, getProduct } from '@/lib/catalog';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { PurchaseSelector } from '@/components/PurchaseSelector';

type Params = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: 'Product not found' };
  return {
    title: product.name,
    description: product.shortDescription + ' View exactly what comes in the product before ordering.',
    alternates: { canonical: '/shop/' + product.slug + '/' },
    openGraph: product.image ? { images: [{ url: product.image, alt: product.imageAlt || product.name }] } : undefined,
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = PRODUCTS.filter((candidate) => candidate.slug !== product.slug).slice(0, 3);
  return <div className="chimera">
    <SiteHeader page="shop" />
    <main id="main">
      <div className="page-shell product-crumbs"><Link href="/shop/">Collection</Link><span aria-hidden="true">/</span><span>{product.name}</span></div>
      <section className="product-layout page-shell">
        <PurchaseSelector product={product} />
      </section>
      <section className="product-spec page-shell">
        <div className="section-label"><span>01</span><span>THE DETAILS</span></div>
        <div>
          <h2>Exactly what<br /><em>you’re getting.</em></h2>
          <div className="product-spec-columns">
            <div><h3>Included</h3><ul>{product.includes.map((line) => <li key={line}>{line}</li>)}</ul></div>
            <div><h3>Not included</h3><ul>{product.excludes.map((line) => <li key={line}>{line}</li>)}</ul></div>
          </div>
          {product.additionalNotes?.map((note) => <p className="product-small-note" key={note}>{note}</p>)}
        </div>
      </section>
      <section className="product-related page-shell">
        <div className="section-label"><span>02</span><span>KEEP EXPLORING</span></div>
        <div className="product-related-links">{related.map((item) => <Link key={item.slug} href={'/shop/' + item.slug + '/'}><span>{item.type}</span><b>{item.name}</b><span aria-hidden="true">↗</span></Link>)}</div>
        <p>Looking for instructions? <Link href="/care/">Read Setup & Care</Link>.</p>
      </section>
    </main>
    <SiteFooter />
  </div>;
}
