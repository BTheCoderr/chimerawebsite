'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { CatalogProduct } from '@/lib/catalog';
import { getStripePaymentLink } from '@/lib/stripe-payment-links';

export function PurchaseSelector({ product }: { product: CatalogProduct }) {
  const [selectedCode, setSelectedCode] = useState(product.variants[0].code);
  const variant = product.variants.find((v) => v.code === selectedCode) ?? product.variants[0];
  const image = variant.image || product.image;
  const imageAlt = variant.imageAlt || product.imageAlt || product.name;
  const photoCaption = product.slug === 'chimera-kit'
    ? (selectedCode === 'kit-white'
      ? 'White ceramic kit shown assembled. The included 2 oz carbon pouch is not pictured.'
      : 'Black ceramic kit shown assembled. The included 2 oz carbon pouch is not pictured.')
    : product.imageContext;
  const paymentLink = getStripePaymentLink(selectedCode);

  return <>
    {image && <div className="product-main-photo">
      <img src={image} alt={imageAlt} />
      {photoCaption && <p className="product-photo-caption">{photoCaption}</p>}
    </div>}
    <div className="product-information">
      <div className="eyeline">{product.type} / CHIMERA</div>
      <h1>{product.name}</h1>
      <p className="product-subtitle">{product.shortDescription}</p>
      <p className="product-description">{product.description}</p>
      {product.variants.length > 1 &&
        <fieldset className="product-variant-picker">
          <legend>Choose ceramic color</legend>
          <div className="variant-choices">{product.variants.map((option) =>
            <button
              type="button"
              key={option.code}
              className={'variant-option' + (selectedCode === option.code ? ' variant-option--selected' : '')}
              aria-pressed={selectedCode === option.code}
              onClick={() => setSelectedCode(option.code)}
            ><span aria-hidden="true" className={'variant-swatch variant-swatch--' + option.label.toLowerCase()} />{option.label}</button>
          )}</div>
          <span className="product-variant-explain">{product.slug === 'chimera-kit' ? 'Kit includes the glass carafe, selected ceramic filter with lid and 2 oz carbon.' : 'Filter pack includes the selected ceramic filter with lid and 2 oz carbon. Glass carafe sold separately.'}</span>
        </fieldset>}
      {paymentLink ? (
        <div className="purchase-action">
          <a
            href={paymentLink}
            className="purchase-button"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Checkout with Stripe for ${product.name}, ${variant.label}`}
          >Checkout with Stripe <span aria-hidden="true">↗</span></a>
          <p>Secure checkout opens on Stripe. Review the selected product, price, any shipping charges, taxes and final total before paying. Shipping options and quantity selection depend on Scott's Stripe settings.</p>
        </div>
      ) : (
        <div className="purchase-action">
          <div className="shop-unavailable"><strong>Glass carafe-only checkout is not yet available.</strong><p>Scott has not provided a standalone glass carafe payment link. You can explore the complete kit in the meantime.</p></div>
          <Link href="/shop/chimera-kit/" className="purchase-button purchase-button--outline">Explore the complete Chimera kit <span aria-hidden="true">↗</span></Link>
        </div>
      )}
    </div>
  </>;
}

