'use client';

import { useState } from 'react';
import type { CatalogProduct } from '@/lib/catalog';
import { EXTERNAL_SELLER_URL, getShopifyCheckoutLink } from '@/lib/catalog';

export function PurchaseSelector({ product }: { product: CatalogProduct }) {
  const [selectedCode, setSelectedCode] = useState(product.variants[0].code);
  const [quantity, setQuantity] = useState(1);
  const variant = product.variants.find((v) => v.code === selectedCode) ?? product.variants[0];
  const image = variant.image || product.image;
  const imageAlt = variant.imageAlt || product.imageAlt || product.name;
  const checkout = getShopifyCheckoutLink(variant.shopifyVariantId, quantity);

  return <>
    <div className={'product-main-photo' + (!image ? ' product-main-photo--carbon' : '')}>
      {image ?
        <img src={image} alt={imageAlt} /> :
        <div className="carbon-art carbon-art--large" role="img" aria-label={product.name + ', text-only placeholder until package photography is provided'}>
          <small>CHIMERA / ACTIVATED CHARCOAL</small>
          <b>{product.slug === 'charcoal-2oz' ? '02' : '12'}</b>
          <span>OZ / REFILL</span>
        </div>}
      {image && <p className="product-photo-caption">{product.imageContext}</p>}
      {!image && <p className="product-photo-caption">Actual refill packaging photography has not yet been provided.</p>}
    </div>
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
          <span className="product-variant-explain">Carafe and charcoal are not included with the standalone filter.</span>
        </fieldset>}
      <div className="product-quantity"><label htmlFor="quantity">Quantity</label><select id="quantity" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))}>{Array.from({length: 10}, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}</select></div>
      {checkout ?
        <div className="purchase-action">
          <a className="purchase-button" href={checkout} target="_blank" rel="noopener noreferrer">Continue to secure Shopify checkout <span aria-hidden="true">↗</span></a>
          <p>Price, shipping, tax and stock are confirmed in Scott’s connected Shopify checkout.</p>
        </div> :
        <div className="purchase-action">
          <div className="shop-unavailable"><strong>Direct checkout is being set up.</strong><p>Product pricing and dedicated Shopify checkout aren't active here yet. No payment will be collected on this page.</p></div>
          <a href={EXTERNAL_SELLER_URL} className="purchase-button purchase-button--outline" target="_blank" rel="noopener noreferrer">Browse current TikTok Shop listing <span aria-hidden="true">↗</span></a>
          <p>TikTok Shop may not list this exact product or color. Confirm availability with the seller before ordering.</p>
        </div>}
      <div className="product-honesty"><span>Product-specific photography and prices will be updated as Scott confirms them.</span></div>
    </div>
  </>;
}
