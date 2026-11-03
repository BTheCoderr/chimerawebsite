# Chimera — Cursor handoff: DNS + Stripe

Last reviewed: November 2026.

**Keep the existing Next.js/React/Tailwind Chimera design.** Do not recreate the storefront. The current code is a statically exported Next.js site on Netlify and has five product listings with six configurations, with a Shopify cart-permalink path that is currently inactive.

## 1. Get the latest code into Cursor

If this is your first local copy, open a terminal in the folder where you keep projects:

```sh
git clone https://github.com/BTheCoderr/chimerawebsite.git
cd chimerawebsite
npm install
npm run dev
```

Open that folder with **Cursor > File > Open Folder**, or run `cursor .` if the Cursor command-line launcher is installed.

If you **already have the repo cloned**:

```sh
cd /path/to/chimerawebsite
git status
git switch main
git pull --ff-only origin main
npm install
npm run dev
```

If `git status` shows uncommitted work, save it in a commit or stash before switching branches or pulling. Don't use `git reset --hard` unless you intentionally want to discard local changes.

Local site: http://localhost:3000

## 2. DNS — configure the domain at Netlify and the registrar

Netlify project: https://app.netlify.com/projects/chimerawater
Current published URL: https://chimerawater.netlify.app

- At Netlify, go to **Domain management > Production domains**, add the domain Scott controls and set the desired primary domain.
- Use the exact provider-specific DNS instructions Netlify shows under **Pending DNS verification**.
- At the domain registrar, change the requested A/ALIAS/ANAME or CNAME records. Do **not** delete unrelated MX, SPF, DKIM or DMARC email records.
- Wait for the domain to resolve and for Netlify's SSL certificate to show active; test both the apex and the `www` hostname as appropriate.
- **Only after the real domain is working**, update `app/layout.tsx` (metadata base, canonical and social URLs), `public/sitemap.xml` and `public/robots.txt` to the final domain. The domain is a hosting/DNS setting, not a Stripe API key.

Official Netlify external DNS instructions: https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/

## 3. Stripe — pick how checkout should work, without rebuilding the frontend

The existing catalog is in `lib/catalog.ts`, with `app/shop/` pages and `components/PurchaseSelector.tsx`. Current code expects Shopify variant IDs, not Stripe IDs. **Do not paste a Stripe secret key into this existing client-side code.**

For the requested **Stripe Checkout API integration**, maintain the same product pages and:
1. Set up Scott's Stripe merchant account and create the matching six **Stripe Price IDs**: carafe, black filter, white filter, 2 oz charcoal, 12 oz charcoal, and kit. Confirm prices, taxes, shipping, and included kit color with Scott.
2. Create a Netlify **serverless function** at `netlify/functions/create-checkout.mts`. Add the Stripe server SDK and use `process.env.STRIPE_SECRET_KEY` **server-side only**. Do not trust a price or amount passed by the browser; map an allowed product/variant code to server-side environment Price IDs.
3. Validate quantity and product/variant codes, create a Stripe Checkout Session, and return its Checkout URL. Redirect from the existing purchase button on the Chimera site.
4. Add a **Stripe webhook** function for `checkout.session.completed` and any needed async-payment events. Verify the Stripe signature with `STRIPE_WEBHOOK_SECRET`. Do not fulfill orders based solely on the return page.
5. Configure Stripe shipping collection, shipping options, tax collection and delivery/fulfillment procedures according to Scott's business decisions.
6. Configure secrets in **Netlify > Project configuration > Environment variables**, scoped to Functions/runtime. Use Stripe **test** mode for end-to-end checkout tests, then switch to live keys and real Stripe Price IDs only after Scott's approval.
7. Test invalid quantities, invalid product codes, black/white filter selection, canceled payment, test success, webhook signature verification, and final mobile checkout.

Netlify currently uses Next.js `output: 'export'` and publishes `out`. Keep that static export for the frontend: standalone Netlify Functions can handle server-side Stripe integration separately. Confirm Netlify's functions directory and routing settings for this project. Netlify Functions may add usage costs; test locally before production deployment.

**Important:** `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` must NEVER use the `NEXT_PUBLIC_` prefix, be committed, posted in a chat, or sent to the browser. `.env.example` contains no real values. For local use, copy it to `.env.local`, then fill in only your private local file.

Alternative, if Scott prefers **no API keys at all**: create six Stripe **Payment Links** in the Stripe Dashboard and store only their public checkout URLs in the catalog. This is simpler but less flexible than an API-backed cart and cannot automatically synchronize product stock into the static frontend.

Official sources:
- https://docs.stripe.com/payments/checkout
- https://docs.stripe.com/payment-links
- https://docs.netlify.com/build/functions/environment-variables/

## 4. Before your Git push (avoid unnecessary Netlify credits)

```sh
npm run audit
npm run typecheck
npm run build
git status
```

Commit safe code only, then push a **feature branch** while you are still developing. Netlify can build previews for PRs, so avoid opening PRs unnecessarily. Only merge to `main` when checkout works in test mode, and publish a consolidated deployment.

```sh
git switch -c feature/stripe-checkout
# make and test your changes in Cursor
git add .
git status
git commit -m "Prepare secure Stripe checkout integration [skip ci]"
git push -u origin feature/stripe-checkout
```

**Before staging files**, confirm you have not accidentally added `.env.local`, Stripe keys, or customer data. The repository is public.
