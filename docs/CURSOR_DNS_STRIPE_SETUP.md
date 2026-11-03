# Chimera custom domain + Stripe Checkout handoff

Updated: November 3, 2026. **Do not rebuild the frontend.** Keep the existing Netlify-hosted, static Next.js shop.

## Current state

- Production domain: https://chimerawater.com (GoDaddy DNS -> existing Netlify site)
- Five product pages, six selectable products/variants. Prices intentionally not displayed until Scott approves them.
- Canonical URLs, XML sitemap, and robots.txt use the production domain.
- Prepared Netlify Functions: `checkout-status`, `create-checkout`, `stripe-webhook`.
- Checkout is **OFF** until Scott supplies a Stripe test account, six approved Price IDs, webhook secret, shipping rate, approved destinations, and owner-approved tax/fulfillment configuration.
- No Stripe keys or orders are present in GitHub. Existing Netlify website design is unchanged.

## Pull into Cursor

If already cloned:
```sh
git status
git switch main
git pull --ff-only origin main
npm install
npm run test:checkout
npm run audit
npm run typecheck
npm run build
```
Save or stash uncommitted work before pulling; do not discard local changes.

## Stripe setup — once credentials arrive

1. In Scott's own Stripe account, use TEST mode to create six one-time products/Prices: glass carafe, black ceramic filter, white ceramic filter, 2 oz charcoal, 12 oz charcoal, and kit (one filter color must be specified).
2. Agree on shipping country/countries, set an actual Stripe Shipping Rate and review applicable taxes, seller policies and order handling. Neither amounts nor eligible countries are assumed by the code.
3. In Netlify **Project configuration > Environment variables** configure the following as private Functions/runtime values:

```sh
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_CARAFE=price_...
STRIPE_PRICE_FILTER_BLACK=price_...
STRIPE_PRICE_FILTER_WHITE=price_...
STRIPE_PRICE_CHARCOAL_2OZ=price_...
STRIPE_PRICE_CHARCOAL_12OZ=price_...
STRIPE_PRICE_KIT=price_...
STRIPE_SHIPPING_RATE_ID=shr_...
STRIPE_ALLOWED_SHIPPING_COUNTRIES=US
STRIPE_CHECKOUT_ENABLED=true
STRIPE_ENABLE_AUTOMATIC_TAX=false
```

`US` above is only a **sample configuration**; use the destination(s) Scott authorizes. The code currently supports US, CA, GB, AU, NZ; extend only after business review. Only set `STRIPE_ENABLE_AUTOMATIC_TAX=true` once Stripe Tax is configured. The API intentionally rejects `sk_live_` keys to prevent accidental live charging.

4. Also set the **public build-time** variable `NEXT_PUBLIC_STRIPE_CHECKOUT_ENABLED=true` to reveal the *test* checkout button. This is NOT a secret. It requires a new Netlify build to update the static frontend.
5. In Stripe Test mode register a webhook endpoint at:
   `https://chimerawater.com/.netlify/functions/stripe-webhook`
   Subscribe to `checkout.session.completed`, `checkout.session.async_payment_succeeded`, and `checkout.session.async_payment_failed`.
6. Redeploy after adding/updating environment variables. Netlify's functions read environment values from the deployment snapshot. Verify the status endpoint reports `{"enabled":true,"mode":"test"}`.
7. Complete several Stripe test purchases (white/black options, quantities, cancel and success), verify webhook signatures, prices, shipping, tax behavior, Stripe Dashboard entries, and any seller fulfillment workflow.
8. **Live payments remain blocked by code**. Production enablement requires a separate audited change for live Stripe keys, seller policies, durable order handling/deduplication, and business approval.

The webhook verifies signatures and logs IDs, but does **not** create fulfillment records or automatically ship products. Stripe records test payments in its dashboard.

## Local development

The Next.js development server alone will not emulate Netlify Functions. Use Netlify CLI and `netlify dev` to test function routes (after linking this Netlify site and configuring test credentials locally). Keep `.env.local` gitignored and never paste secret keys into chats, code or public `NEXT_PUBLIC_` values.

```sh
npm install
npm run test:checkout
npm run audit
npm run typecheck
npm run build
npx netlify dev
```

Without valid test environment values, `create-checkout` safely returns 503; the public storefront keeps its "Direct checkout is being set up" message.

## Google Search Console

Verify ownership of `https://chimerawater.com`, then submit `https://chimerawater.com/sitemap.xml`. This requires access to the business's Google account.

References:
- https://docs.netlify.com/build/functions/get-started/
- https://docs.netlify.com/build/functions/environment-variables/
- https://docs.stripe.com/api/checkout/sessions/create
- https://docs.stripe.com/events/manage-webhook-endpoints
