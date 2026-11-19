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


## Scott's Stripe Payment Links (November 18, 2026)

The Concept B preview now displays **test-only Stripe checkout links** from Scott's email on the matching product pages:

- Complete Chimera kit: one test URL for both white and black ceramic selections
- White ceramic filter with carbon: separate white test URL
- Black ceramic filter with carbon: separate black test URL

The selection is correctly mapped on the site, but the kit's single Stripe link **does not automatically receive the chosen color**. Scott should configure a color-selection field or separate white/black kit links before a live launch. The selected quantity also is not passed by these static Payment Links; Stripe must allow quantity selection if required.

Scott's two carbon-refill links do **not** have the `test_` prefix and may accept real payments. They are intentionally **not copied into public client code or activated on the preview** until product pricing, shipping, policies, and merchant readiness are reviewed. The glass-carafe-only product has no supplied payment link.

For production, request real (non-test) Payment Links for the kit and both ceramic filter colors, confirm the live carbon links in Scott's Stripe Dashboard, request a glass-carafe link (if the carafe is for sale independently), and confirm stock, pricing, tax, shipping and returns. Do not enable `NEXT_PUBLIC_STRIPE_CHECKOUT_ENABLED` or set secret keys based on Payment Links alone.

The current production homepage and payments are unchanged.
