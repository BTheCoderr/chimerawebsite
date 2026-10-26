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

Prices, retailer SKUs, replacement interval, verified performance claims, warranty, and shipping terms require Scott's approval before publication. Current checkout remains external.
