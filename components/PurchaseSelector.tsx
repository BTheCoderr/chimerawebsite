'use client';

import { useEffect, useState } from 'react';
import type { CatalogProduct } from '@/lib/catalog';
import { EXTERNAL_SELLER_URL } from '@/lib/catalog';

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
  const checkoutEnabled = process.env.NEXT_PUBLIC_CHIMERA_PAYMENT_LINKS_ENABLED === 'true';
  // The server separately requires explicit merchant, shipping, and launch
  // approvals before it resolves any of Scott's live Payment Links.
  const pendingLiveLink = ['kit-black', 'kit-white', 'filter-black', 'filter-white', 'carbon-2oz', 'carbon-12oz'].includes(selectedCode);
  useEffect(() => {
    const finish = new URLSearchParams(window.location.search).get('finish');
    if (product.slug === 'chimera-kit' && (finish === 'black' || finish === 'white')) {
      setSelectedCode(finish === 'black' ? 'kit-black' : 'kit-white');
    }
  }, [product.slug]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function beginCheckout() {
    if (!checkoutEnabled || !pendingLiveLink || busy) return;
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/.netlify/functions/product-payment-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variantCode: variant.code }),
      });
      const result: { url?: string; error?: string } = await response.json();
      if (!response.ok || !result.url ||
          !result.url.startsWith('https://buy.stripe.com/') ||
          result.url.includes('/test_')) {
        throw new Error(result.error || 'Checkout is not available right now.');
      }
      window.location.assign(result.url);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Checkout is unavailable.');
      setBusy(false);
    }
  }

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
      {checkoutEnabled && pendingLiveLink ?
        <div className="purchase-action">
          <button type="button" className="purchase-button" onClick={beginCheckout} disabled={busy}>
            {busy ? 'Connecting to Stripe…' : 'Continue to secure Stripe checkout'} <span aria-hidden="true">↗</span>
          </button>
          {error && <p role="alert" className="checkout-error">{error}</p>}
          <p>Review your item, final price, shipping charge, tax and payment details in Stripe before placing an order. Quantity options depend on the seller's Stripe settings.</p>
        </div> : pendingLiveLink ?
        <div className="purchase-action">
          <div className="shop-unavailable"><strong>Checkout links received — final setup in progress.</strong><p>Scott has provided an updated Stripe payment link for this selection. Checkout stays inactive until the delivery charges, taxes, and fulfillment arrangements are confirmed.</p></div>
          <p>The selected product is {product.name}{product.variants.length > 1 ? ' — ' + variant.label : ''}. The seller's updated payment link is recorded, but this preview cannot collect payments.</p>
        </div> :
        <div className="purchase-action">
          <div className="shop-unavailable"><strong>Direct checkout is being set up.</strong><p>Scott's approved prices and secure Stripe checkout are not active yet. No payment will be collected here.</p></div>
          <a href={EXTERNAL_SELLER_URL} className="purchase-button purchase-button--outline" target="_blank" rel="noopener noreferrer">Browse existing TikTok Shop listing <span aria-hidden="true">↗</span></a>
          <p>The existing retailer may not list this exact product or color. Confirm availability with the seller before ordering.</p>
        </div>}
    </div>
  </>;
}

