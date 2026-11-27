# Chimera Water — Black Friday 2026 checkout review

Source: Scott Keeley's Nov 27, 2026 email, subject "black friday pricing", with the attachment **Black Friday Pricing.docx**. These four Payment Links are the URLs in that attached file; the file did **not** include sale prices, a sale end time, or links for either charcoal refill.

## The four new links

| Catalog variant | Exact label in Scott's document | Stripe Payment Link | Verification |
| --- | --- | --- | --- |
| `kit-black` | Filter and Kit Black | https://buy.stripe.com/7sYbJ10oecZiai0dDudjO0s | **NOT APPROVED**: Scott reports whole kit may display ceramic-only |
| `kit-white` | Filter Kit White | https://buy.stripe.com/4gMdR90oe8J20HqbvmdjO0u | **NOT APPROVED** |
| `filter-white` | Ceramic Filter White | https://buy.stripe.com/14A7sL3Aqf7q2PygPGdjO0v | **NOT APPROVED** |
| `filter-black` | Ceramic Filter Black | https://buy.stripe.com/fZucN5gnc0cwducfLCdjO0w | **NOT APPROVED** |

The checkout pages are not accessible from our web verification environment. **Do not claim** that any link correctly identifies its product or price just because its URL was provided or contains a live-mode prefix. The website cannot change the line item built into a Stripe Payment Link.

## What needs to happen before the sale goes live

1. In Scott's Stripe Dashboard, open each new Payment Link and inspect the *actual Product and Price attached to the link*, not merely the link's display name. The **complete kit** must represent the carafe, chosen black/white ceramic filter and 2 oz carbon; the ceramic-only item must not be sold as the full kit. If he accidentally selected the ceramic-filter Price for a kit link, create/correct the full-kit Price and Payment Link. Do not reuse the problematic link until corrected.
2. Confirm the actual currency amount for each sale option, regular price comparison (if displayed), shipping destinations/cost, tax, and customer-facing product name on Stripe. A checkout asking for a shipping address is not evidence of a shipping rate or that fulfillment is arranged.
3. Confirm promotion start and end in Eastern time, and whether carbon refills remain regular-price. There are no Black Friday charcoal links in the file.
4. For each of four sale links, mark `verifiedByMerchant: true` **only after** a screenshot, owner confirmation, or direct verified Stripe-account inspection establishes that the correct product and price are attached.
5. Turn on `NEXT_PUBLIC_CHIMERA_BLACK_FRIDAY_ENABLED=true` for the approved site only, build and deploy, and manually verify the four correct product/color destinations from the shop page before announcing. Do **not** set it merely to test whether a link works.
6. At the agreed end of the sale, remove the environment switch and redeploy. The old URLs in `lib/stripe-payment-links.ts` never change; the original six regular-price options return automatically. If an expiry is agreed, schedule the reversion with an appropriate approved mechanism, not an unsupported assumption.

## Current state of this branch

**Staged; no promotion active.** `lib/stripe-black-friday.ts` contains all four supplied URLs, each with `verifiedByMerchant: false`. `getStripePaymentLink` only chooses a merchant-verified sale URL when the new environment switch is explicitly `true`. It otherwise uses the original regular-price link, preserving customer checkout and all carbon refill links. No Netlify environment variables, live links, or other production settings have been changed.

**Important:** The main production homepage and existing Stripe checkout links remain unchanged by this draft until an explicit sale launch is approved.
