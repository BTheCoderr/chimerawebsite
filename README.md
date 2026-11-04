# Chimera Water — website

Official Next.js website for the Chimera reusable ceramic and glass water-filter product.

**Product invented by Scott Keeley. Website developed by Baheem Ferrell.**

## Development

- Next.js App Router, React 19, TypeScript, and Tailwind CSS
- `npm install` to install dependencies
- `npm run dev` for local development
- `npm run typecheck` for TypeScript checks
- `npm run audit` for static asset, link, and page checks
- `npm run build` for static production export

## Deployment

GitHub repository: `BTheCoderr/chimerawebsite`.

Netlify project: `chimerawater`. GitHub pushes to `main` trigger automatic builds. Netlify settings:

- Build command: `npm run build`
- Publish directory: `out`
- Next.js static export with `trailingSlash: true` in `next.config.mjs`
- No server functions or private environment variables required for the present brochure/shop-link website

To conserve Netlify usage, work locally or on a branch and push one tested batch to `main`.

## Routes

- `/`: product story, genuine photographs, original YouTube film, product choices, seller link
- `/care/`: setup instructions, maintenance, compatibility, and buying FAQ

## Product and content approval

- Direct checkout is **not** enabled. Purchases link to an external TikTok Shop seller.
- Prices, individual SKU links, exact included parts, shipping/returns, filtration testing, and carbon replacement intervals must be approved by Scott before publication.
- Do not suggest Chimera makes unsafe water drinkable or holds a certification without documentation.
- Site photography is under `public/images/`. Keep only approved, optimized, public-facing images there.
- Private draft documents and editable design originals must **not** be placed in `public/` or a public repository. Older uploaded documents were historically committed and may remain accessible in Git history; seek private-storage/legal review if sensitive.

## Attribution

Preserve both project credits during redesigns and migrations.

## Shared navigation and customer information

The marketing site now uses `components/SiteHeader.tsx` and `SiteFooter.tsx`. Product film is click-to-load in `components/ProductFilm.tsx` so the YouTube frame is not requested until a visitor chooses to watch it.

Additional routes:
- `/help/`: product selection, compatibility, external-shop and order-support details
- `/privacy/`: current hosting, embedded video and external-shop data practices

Prices, retailer SKUs, replacement interval, verified performance claims, warranty, and shipping terms require Scott's approval before publication. Stripe checkout is prepared behind an explicit test-only configuration gate; direct payments are not enabled.

## Confirmed October 2026 product catalog

Scott's intended online store has five product listings and six explicit standalone options:
- Glass carafe alone
- Ceramic filter alone, with black and white selections
- 2 oz activated charcoal
- 12 oz activated charcoal
- Kit: carafe + ceramic filter + 2 oz activated charcoal

The kit's ceramic-filter color has not been confirmed. Do not invent color selections for the kit.

Source of truth: `lib/catalog.ts`. Shop routes: `/shop/` and `/shop/[slug]/`. All pages are statically exported.

### Shopify checkout setup (prepared, not yet connected)

These public build-time Netlify environment variables must be supplied by the merchant, or from their Shopify Admin:
- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` — merchant's actual `your-shop.myshopify.com` domain
- `NEXT_PUBLIC_SHOPIFY_VARIANT_CARAFE`
- `NEXT_PUBLIC_SHOPIFY_VARIANT_FILTER_BLACK`
- `NEXT_PUBLIC_SHOPIFY_VARIANT_FILTER_WHITE`
- `NEXT_PUBLIC_SHOPIFY_VARIANT_CARBON_2OZ`
- `NEXT_PUBLIC_SHOPIFY_VARIANT_CARBON_12OZ`
- `NEXT_PUBLIC_SHOPIFY_VARIANT_KIT`

Only the Shopify domain and *numeric variant IDs* are accepted. The storefront uses native Shopify cart permalinks, so payment, taxes, shipping and order management occur on Shopify's authorized checkout, not the static website. Do not add Shopify Admin tokens or secret keys to NEXT_PUBLIC variables.

Each product page only displays the checkout link when both a valid merchant domain and that product variant ID are supplied. Until that happens it clearly displays the non-checkout state and offers a link to browse the existing TikTok listing, without implying every product is sold there. No product prices or stock numbers are guessed.

Reference: https://help.shopify.com/en/manual/checkout-settings/cart-permalink

Product page shopping cart/multiple-item checkout could be added with Shopify's Storefront Cart API after credentials are granted, but isn't necessary for the initial single-product checkout.

## Scott's requested wording (October 26, 2026)

Homepage language follows Scott's supplied product wording: “Carbon Filtered Water, Plastic Free,” a description of the high-fired ceramic and activated-carbon core in a thermally shock-resistant borosilicate glass carafe, black/white ceramic choice, wool insulated grip, pour-over coffee use, and the updated Glass materials line. The existing “Good design starts with a better question” section is intentionally unchanged.

These are inventor-provided product descriptions, not independently verified filtration tests. Keep contaminant-reduction and certification claims out of the website until supported by appropriate documentation.

## Cursor setup for DNS and Stripe

See [docs/CURSOR_DNS_STRIPE_SETUP.md](docs/CURSOR_DNS_STRIPE_SETUP.md). Stripe serverless checkout and signature-verifying webhook code are now prepared but remain **disabled until the test keys, Price IDs, and shipping approval are configured**. A sample [`.env.example`](.env.example) lists variable names only; never add real Stripe secrets to GitHub or `NEXT_PUBLIC_` variables. Updating DNS occurs in Netlify and the domain registrar, not through a normal code commit.

## Stripe checkout backend, staged in November 2026

The existing Next.js static website stays on Netlify. A server-side Netlify Function initiates Stripe-hosted checkout. No API secrets are bundled into the frontend. See `docs/CURSOR_DNS_STRIPE_SETUP.md` for the complete enablement and test plan.

- `/.netlify/functions/checkout-status` reports enabled/disabled (never reveals credentials).
- `/.netlify/functions/create-checkout` requires a POST with one of six allowlisted variant codes and quantity 1–10; maps to server-only Price IDs.
- `/.netlify/functions/stripe-webhook` validates Stripe signatures and emits only minimal test-event IDs to logs. **Not an order fulfillment database.**
- `/checkout/success/` and `/checkout/cancelled/` are informational redirects; they do not establish payment completion.
- While waiting for keys, both switches remain false: `NEXT_PUBLIC_STRIPE_CHECKOUT_ENABLED=false`, `STRIPE_CHECKOUT_ENABLED=false`. No direct payments are accepted.

Run `npm run test:checkout`, `npm run audit`, `npm run typecheck`, and `npm run build` before merging.

## November visual polish

This refinement keeps the editorial identity and Scott's approved copy. The homepage collection now anchors its five-product index with an authentic, unique photo of the carafe and white ceramic filter. Shop tiles show product image-context labels; the kit has a two-column desktop feature treatment. Responsive styles are in `app/visual-refinements.css`. Charcoal packages remain typographic placeholders until authentic photos are approved. No payments or prices were changed.

## Scott's November 3 product updates (product files on main)

Scott asked for the kit first, then carbon refills, then individual parts. The filter pack includes its selected black or white ceramic housing with lid and one 2 oz carbon pouch (carafe excluded). The complete kit includes the carafe, selected ceramic filter with lid, and 2 oz carbon. The ceramic lid is part of the ceramic filter, not a separate kit component. Both kit colors are mapped to one kit Stripe Price ID while keeping color in the checkout session metadata.

All four original photos are on main: `IMG_6069.png`, `Filter_Pack_Black.jpeg`, `Filter_Pack_White.jpeg`, and `PastedGraphic-1.png`. The `KitPhoto` component uses an SVG viewBox to display only the assembled kit photograph from Scott's screenshot, hiding the unrelated old webpage heading; no fifth upload is needed. Confirm the build checks before merging. No live prices or payments are enabled.
