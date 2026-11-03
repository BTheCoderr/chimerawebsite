'use client';

import { useState } from 'react';
import type { CatalogProduct } from '@/lib/catalog';
import { EXTERNAL_SELLER_URL } from '@/lib/catalog';
import { KitPhoto } from '@/components/KitPhoto';

export function PurchaseSelector({ product }: { product: CatalogProduct }) {
  const [selectedCode, setSelectedCode] = useState(product.variants[0].code);
  const [quantity, setQuantity] = useState(1);
  const variant = product.variants.find((v) => v.code === selectedCode) ?? product.variants[0];
  const image = variant.image || product.image;
  const imageAlt = variant.imageAlt || product.imageAlt || product.name;
  const checkoutEnabled = process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_ENABLED === 'true';
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function beginCheckout() {
    if (!checkoutEnabled || busy) return;
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variantCode: variant.code, quantity }),
      });
      const result: { url?: string; error?: string } = await response.json();
      if (!response.ok || !result.url || !result.url.startsWith('https://checkout.stripe.com/')) {
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
      {product.slug === 'chimera-kit' && selectedCode === 'kit-black' ?
        <KitPhoto label={imageAlt} /> :
        <img src={image} alt={imageAlt} />}
      {product.imageContext && <p className="product-photo-caption">{selectedCode === 'kit-white' ? 'White ceramic kit shown assembled. The included 2 oz carbon pouch and stopper are not pictured.' : product.imageContext}</p>}
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
          <span className="product-variant-explain">{product.slug === 'chimera-kit' ? 'Kit includes the glass carafe, selected ceramic filter, stopper and 2 oz carbon.' : 'Filter pack includes the selected ceramic housing, stopper and 2 oz carbon. Glass carafe sold separately.'}</span>
        </fieldset>}
      <div className="product-quantity"><label htmlFor="quantity">Quantity</label><select id="quantity" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))}>{Array.from({length: 10}, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}</option>)}</select></div>
      {checkoutEnabled ?
        <div className="purchase-action">
          <button type="button" className="purchase-button" onClick={beginCheckout} disabled={busy}>
            {busy ? 'Connecting to Stripe…' : 'Continue to Stripe test checkout'} <span aria-hidden="true">↗</span>
          </button>
          {error && <p role="alert" className="checkout-error">{error}</p>}
          <p>Test checkout only. No real payments are enabled. Stripe confirms prices, taxes, shipping and availability.</p>
        </div> :
        <div className="purchase-action">
          <div className="shop-unavailable"><strong>Direct checkout is being set up.</strong><p>Scott's approved prices and secure Stripe checkout are not active yet. No payment will be collected here.</p></div>
          <a href={EXTERNAL_SELLER_URL} className="purchase-button purchase-button--outline" target="_blank" rel="noopener noreferrer">Browse existing TikTok Shop listing <span aria-hidden="true">↗</span></a>
          <p>The existing retailer may not list this exact product or color. Confirm availability with the seller before ordering.</p>
        </div>}
    </div>
  </>;
}

