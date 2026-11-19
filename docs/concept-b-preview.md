# Chimera — Concept B homepage preview

This branch implements the user-supplied `Chimera-Concept-B-Apple(2).png` as a responsive product-gallery homepage for Scott to review.

## What matches the concept
- Quiet white opening with a large centered Chimera headline and the approved white-ceramic kit image
- Black-background feature for the black-ceramic kit
- Two photo-led cards for coffee use and materials
- Three material cards and an accessible, qualified product-architecture comparison
- A spacious statement and Scott Keeley's six-years/32-prototypes story
- Existing sound-enabled, first-party film
- A finish-switching complete-kit gallery (white and black) that links into the existing kit product page

## What is intentionally different
- No copied Apple or Tesla branding, layout code, or external imagery
- No placeholder price, $3 refill claim, 40 gallons per fill, 1,800 bottles saved, unverified removal statistics, or invented certifications
- The green button leads to product details rather than initiating checkout because Stripe is not approved yet
- All existing shop, care, help, contact details, and product images remain intact

## Release plan
Scott may review the Netlify deploy preview on the pull request branch. Do not merge into `main` until the user approves this direction and photo presentation. The current live site remains unchanged.


## Stripe checkout links — November 18, 2026, 8:56 PM EST

Scott's latest **"Updated Links"** email supersedes both of his earlier link sets. He provided six fresh `buy.stripe.com` URLs, one for each stocked kit/ceramic finish and carbon refill.

| Product | New URL mode, inferred from prefix | Concept B preview behavior |
|---|---|---|
| Chimera Kit, black | Appears live | Mapped server-side; not clickable |
| Chimera Kit, white | Appears live | Mapped server-side; not clickable |
| Ceramic filter + carbon, white | Appears live | Mapped server-side; not clickable |
| Ceramic filter + carbon, black | Appears live | Mapped server-side; not clickable |
| Activated carbon, 2 oz | Appears live | Mapped server-side; not clickable |
| Activated carbon, 12 oz | Appears live | Mapped server-side; not clickable |
| Standalone carafe | No link supplied | No checkout |

The exact new links are in `lib/stripe-seller-links.server.mjs`. That file is not imported by React client components, and the earlier public test-link helper has been deleted. `getApprovedPaymentLink()` returns `null` for all six unless three explicit booleans — `merchantApproved`, `shippingConfirmed`, and `goLiveApproved` — are all `true`; no checkout redirect is currently wired to it. Automated tests verify exact link identity, finish separation, and fail-closed behavior.

Scott reports that each link asks for a shipping address and billing/payment information, but the hosted Stripe checkout pages could not be directly inspected from our tools. **Collecting an address alone does not confirm a shipping charge, allowed delivery region, tax treatment, label generation, or actual fulfillment.** There is no completed test charge and we should not simulate a live purchase.

**Before go-live:** Scott should verify the product and color, final price, shipping method/charge and eligible countries for one kit and one filter, confirm tax settings, define lead time, returns/refunds and who buys shipping labels, and review how paid orders appear in Stripe. The standalone glass carafe still has no checkout link. Obtain explicit approval for live checkout and the Concept B homepage before merging the draft PR.

The live production website remains unchanged.

## Ready-to-activate checkout wiring (Nov 19, 2026)

The Concept B product pages now support a six-item, color-specific Stripe Payment Link checkout flow, **without turning on live checkout**.

- Browser: the `PurchaseSelector` shows a checkout button only when `NEXT_PUBLIC_CHIMERA_PAYMENT_LINKS_ENABLED=true` was present when the website was built. Its default is disabled. The user-selected variant determines the request.
- Server: `/.netlify/functions/product-payment-link` accepts a POST with only `variantCode`, verifies the request, and uses the existing seller-approved URL registry.
- Authorization: the server rejects all requests unless **all three** Netlify runtime environment variables are explicitly set to `true`: `CHIMERA_MERCHANT_APPROVED`, `CHIMERA_SHIPPING_CONFIRMED`, and `CHIMERA_GO_LIVE_APPROVED`.
- Destination: after the approvals, the server returns the exact corresponding Stripe Payment Link; the browser then navigates to Stripe. No Stripe secret key is needed for Payment Links.
- Quantity: Chimera does not pass quantities through these hosted links. Scott must confirm the quantity rules in his Stripe Dashboard. Do not offer a local quantity selector that cannot affect the Stripe order.
- Missing product: the carafe-only listing remains unavailable for direct payment because Scott has not supplied a link.

**Activation steps, only after Scott explicitly approves real purchases:** confirm shipping prices and allowed destinations, tax collection and registration, product amounts and colors, inventory, fulfillment and return instructions; confirm live Stripe links can be opened and their checkout summaries inspected without submitting a purchase; obtain explicit authorization from the site owner; set all three server flags and the one public build flag; redeploy the approved branch; then verify one product of every variant, with totals and shipping visible before payment. A separate end-to-end purchased-order verification requires merchant coordination. Never activate any of these flags just to test an unapproved checkout.

The existing secret-key Checkout Session handler remains separate and disabled unless its own test-only guard is satisfied. Do not confuse `NEXT_PUBLIC_STRIPE_CHECKOUT_ENABLED` with the new Payment Links flag. The live website is unchanged while the draft PR is under review.
