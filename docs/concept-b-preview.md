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


## Scott's updated Stripe Payment Links (November 18, 2026)

Scott's subsequent `update` email replaced the single shared kit test link with **two distinct kit payment links**, one for each ceramic finish.

| Product variant | Link mode (by URL) | What the preview does |
|---|---|---|
| Kit black | Appears live | Staged in server-only registry; checkout inactive |
| Kit white | Appears live | Staged in server-only registry; checkout inactive |
| Ceramic filter white + 2 oz carbon | Test | Exposes only the matching Stripe test link |
| Ceramic filter black + 2 oz carbon | Test | Exposes only the matching Stripe test link |
| 2 oz carbon refill | Appears live | Staged; checkout inactive |
| 12 oz carbon refill | Appears live | Staged; checkout inactive |
| Carafe only | No supplied link | No checkout link |

The exact email URLs are maintained in `lib/stripe-seller-links.server.mjs` and checked in `tests/stripe-seller-links.test.mjs`. They are seller-facing shareable payment links, **not API keys**. Their prefixes alone do not independently verify whether Stripe has configured shipping or tax collection correctly; Stripe checkout webpages could not be externally inspected.

For safety, the live URL registry is not imported into public React components. `getApprovedPaymentLink()` fails closed for live links unless `merchantApproved`, `shippingConfirmed`, and `goLiveApproved` are all explicitly true; no production function currently calls it to redirect shoppers. The earlier kit test button was removed from the preview because Scott replaced its link.

The Concept B homepage's white/black kit chooser now carries `?finish=white` or `?finish=black` into the product page, whose selected photo and finish update accordingly. In a later approved checkout release, the same code can select the corresponding live Payment Link.

**Before launch:** Scott must confirm delivery zones, shipping rate(s), fulfillment workflow, tax settings, actual products and prices on the live Stripe checkout pages, and policy/return terms. The ceramic links still need live replacements; the standalone carafe needs a link if it will be sold directly. Then wire the approved links through a server-side redirect and verify a real end-to-end order. Do not infer acceptance of real payments from the presence of these URLs.

The draft PR remains unmerged; the current production website and its payment settings are unchanged.
