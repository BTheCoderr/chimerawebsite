# Chimera Water — Black Friday 2026 checkout release

## Source and replacement links

Scott's Nov 27 2026 **1:05 PM Eastern** email, subject "links", replaces all four URLs from his **11:41 AM** "Black Friday Pricing.docx" attachment. The earlier links were reported as buggy (a complete-kit checkout displayed a ceramic-only product). Scott subsequently confirmed by text: "The links above are the same as the most recent email and I checked them all and they work."

| Variant | Scott's label | Latest Black Friday Payment Link |
| --- | --- | --- |
| `kit-black` | Filter and Kit Black | https://buy.stripe.com/8x2dR9gnccZi89S1UMdjO0z |
| `kit-white` | Filter Kit White | https://buy.stripe.com/cNi28r2wm6AU89S0QIdjO0y |
| `filter-white` | Ceramic Filter White | https://buy.stripe.com/8x27sL8UK1gAduc42UdjO0A |
| `filter-black` | Ceramic Filter Black | https://buy.stripe.com/4gM9AT1sif7q1Lu2YQdjO0B |

Scott reports checking these links. They are marked `verifiedByMerchant: true` on that basis, **not** because we independently inspected Stripe. Automated browsing could not read the hosted Stripe checkout pages, so product names, actual amounts, shipping and tax remain outside our independent verification.

## Release behavior

- The normal six links in `lib/stripe-payment-links.ts` are unchanged and retained for restoration.
- The four corrected Black Friday links are in `lib/stripe-black-friday.ts`, mapped to their exact product/color codes.
- A Black Friday link replaces its normal checkout while the explicit source toggle `BLACK_FRIDAY_ACTIVE = true` is set in `lib/stripe-payment-links.ts`. Scott-confirmed links are still required for every promotional product. A link without an approved promotional mapping falls back to the regular link.
- Neither 2 oz nor 12 oz carbon refills has a provided sale link; they continue to use their standard Payment Links.
- Glass carafe alone still has no checkout link. No discounted prices are hardcoded or invented on the site; Stripe owns the final amount shown at checkout.
- The older faulty promotional URLs have been removed from the promotion mapping and barred by regression tests.

## Follow-through and rollback

Scott did not provide a sale end date/time. Confirm when the promotion should end. **To restore original prices:** change `BLACK_FRIDAY_ACTIVE` from `true` to `false` in `lib/stripe-payment-links.ts`, commit, merge, and confirm a new production deployment. Netlify rejected changes to this site's environment settings (403), so source-controlled rollback is the supported mechanism until account permissions are resolved. Verify the resulting deployment against all four original Stripe destinations.

Customer-impact caveat: Collecting a shipping address in Stripe does not establish a shipping price, fulfillment process or correctness of the Stripe Product/Price. Scott is responsible for verifying the live checkout product, final price, shipping, tax and order fulfillment details.

## Activation note

Scott's four corrected links were sourced from his latest email and he stated he checked them himself. The website's sale switch is set to `true` for this release. Our environment could not independently inspect the hosted Stripe product/price totals. The change becomes customer-facing only after the PR passes CI, is merged to `main`, and Netlify successfully publishes the new production build. **Do not assume the sale has ended on any calendar date until Scott confirms it.**
