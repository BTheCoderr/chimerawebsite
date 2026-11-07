import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ProductFilm } from '@/components/ProductFilm';

const kitParts = [
  ['01', 'The glass', 'A thermally shock-resistant borosilicate carafe, finished with a wool insulated grip.'],
  ['02', 'The ceramic', 'Your choice of a reusable black or white ceramic filter with a lid to hold the activated carbon.'],
  ['03', 'The carbon', 'One 2 oz bag of activated carbon, included with the kit.'],
] as const;

export default function Home() {
  return <div className="chimera">
    <SiteHeader page="home" />
    <main id="main">
      <section className="studio-hero" aria-labelledby="hero-title">
        <div className="studio-hero-copy">
          <div className="studio-kicker"><span className="studio-kicker-dot" /> CHIMERA / DESIGNED FOR THE EVERYDAY</div>
          <h1 id="hero-title">A better way<br />to <em>pour.</em></h1>
          <p className="studio-hero-lede">Carbon Filtered Water, Plastic Free.</p>
          <p className="studio-hero-text">A considered system of high-fired, taste-neutral ceramic, activated carbon, and a thermally shock-resistant borosilicate glass carafe. Everything starts with the complete Chimera kit.</p>
          <div className="studio-hero-actions">
            <Link href="/shop/chimera-kit/" className="studio-button studio-button--solid">Discover the complete kit <span aria-hidden="true">↗</span></Link>
            <Link href="/#kit-contents" className="studio-text-link">See what&apos;s included <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="studio-hero-signature"><span>GLASS</span><span>CERAMIC</span><span>ACTIVATED CARBON</span></div>
        </div>
        <div className="studio-hero-stage">
          <div className="studio-hero-topline"><span>THE CHIMERA KIT</span><span>WHITE CERAMIC SHOWN</span></div>
          <img className="kit-photo" src="/images/IMG_6116.jpeg" alt="Complete Chimera kit with white ceramic filter and lid assembled in the glass carafe" />
          <div className="studio-hero-bottomline"><span>001 / THE COMPLETE SYSTEM</span><span>START HERE ↗</span></div>
          <Link href="/shop/chimera-kit/" className="studio-stage-link" aria-label="Explore the complete Chimera kit" />
        </div>
      </section>

      <div className="studio-ticker" aria-label="Product materials">
        <span>REUSABLE CERAMIC</span><span className="studio-ticker-star" aria-hidden="true">/</span>
        <span>BOROSILICATE GLASS</span><span className="studio-ticker-star" aria-hidden="true">/</span>
        <span>REPLACEABLE CARBON</span><span className="studio-ticker-star" aria-hidden="true">/</span>
        <span>THOUGHTFUL BY DESIGN</span>
      </div>

      <section id="kit-contents" className="studio-kit-section">
        <div className="page-shell">
          <div className="studio-section-head">
            <span className="studio-section-index">01 / THE COMPLETE KIT</span>
            <div><h2>Everything you need.<br /><em>Nothing unnecessary.</em></h2>
              <p>Begin with the complete kit. Every part has a purpose, and the carbon can be replenished without replacing the glass and ceramic.</p></div>
          </div>
          <div className="studio-kit-layout">
            <figure className="studio-carafe-feature">
              <img src="/images/IMG_6116.jpeg" alt="Chimera glass carafe assembled with the white ceramic filter and lid, shown together" loading="lazy" />
              <figcaption><span>THE COMPLETE KIT / WHITE CERAMIC</span><span>GLASS + CERAMIC</span></figcaption>
            </figure>
            <div className="studio-parts">
              {kitParts.map(([number, title, description]) =>
                <div className="studio-part" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></div>
              )}
              <Link href="/shop/chimera-kit/" className="studio-button studio-button--dark">Explore the full set <span aria-hidden="true">↗</span></Link>
              <p className="studio-fine-print">White ceramic filter shown with the glass carafe. A black ceramic option is also available. The kit includes a 2 oz activated carbon pouch, not pictured.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="philosophy" className="manifesto page-shell">
        <div className="section-label"><span>02</span><span>THE IDEA</span></div>
        <div><p className="manifesto-heading">Good design starts with a <em>better question.</em></p>
          <div className="manifesto-bottom">
            <p>Why replace the entire filter when it&apos;s the carbon inside that needs refreshing? Chimera takes a familiar household object and redesigns it around glass, ceramic, and reuse.</p>
            <p>Developed by industrial designer Scott Keeley over six years and 32 prototypes, Chimera is an everyday object with a more thoughtful purpose.</p>
          </div>
        </div>
      </section>

      <section className="studio-colors" aria-labelledby="colors-title">
        <div className="page-shell studio-colors-heading">
          <div><span className="studio-section-index">03 / MAKE IT YOURS</span><h2 id="colors-title">Two finishes.<br /><em>One better ritual.</em></h2></div>
          <p>The reusable ceramic filter is available in black or white. Both filter packs include a ceramic lid to hold the activated carbon and a 2 oz carbon pouch. The complete kit adds the glass carafe.</p>
        </div>
        <div className="studio-color-grid page-shell">
          <Link href="/shop/ceramic-filter/" className="studio-color-item">
            <div className="studio-color-image"><img src="/images/Filter_Pack_Black.jpeg" alt="Black ceramic filter with its lid and included Chimera carbon pouch" loading="lazy" /></div>
            <div className="studio-color-caption"><span>01 / BLACK CERAMIC</span><strong>Considered in black.</strong><span aria-hidden="true">↗</span></div>
          </Link>
          <Link href="/shop/ceramic-filter/" className="studio-color-item">
            <div className="studio-color-image"><img src="/images/Filter_Pack_White.jpeg" alt="White ceramic filter with its lid and included Chimera carbon pouch" loading="lazy" /></div>
            <div className="studio-color-caption"><span>02 / WHITE CERAMIC</span><strong>Considered in white.</strong><span aria-hidden="true">↗</span></div>
          </Link>
        </div>
      </section>

      <section className="object-story" aria-labelledby="object-title">
        <div className="object-story-media"><img src="/images/Water_Image-02.jpg" alt="Black ceramic Chimera filter in a clear glass carafe beneath leafy branches" loading="lazy" /></div>
        <div className="object-story-copy"><span className="eyeline">THE MATERIALS / DESIGNED TO LAST</span><h2 id="object-title">The small details<br /><em>matter.</em></h2>
          <p>Your choice of black or white ceramic filter paired with a clear borosilicate carafe with a wool insulated grip. The carafe is also a pour-over coffee carafe. Better tasting coffee comes from better tasting water.</p>
          <p className="object-photo-credit">CHIMERA / BLACK CERAMIC SHOWN</p>
        </div>
      </section>

      <section className="materials page-shell">
        <div className="section-label"><span>04</span><span>MATERIAL INTELLIGENCE</span></div>
        <div className="materials-body"><h2>Keep the object.<br /><em>Refresh the carbon.</em></h2>
          <div className="materials-list">
            <div><span>01 /</span><div><h3>Ceramic</h3><p>A durable, reusable housing crafted in Ohio, with a lid to hold the activated carbon.</p></div></div>
            <div><span>02 /</span><div><h3>Activated carbon</h3><p>Replace the carbon inside the chamber, rather than discarding the housing.</p></div></div>
            <div><span>03 /</span><div><h3>Glass</h3><p>A borosilicate carafe holds your filtered water and makes great coffee.</p></div></div>
          </div>
        </div>
      </section>

      <section className="coffee-story">
        <div className="coffee-story-photo"><img src="/images/Coffe_Poured_2.jpg" alt="Hot water poured from a copper kettle over coffee grounds into a glass pour-over carafe" loading="lazy" /></div>
        <div className="coffee-story-copy"><span className="eyeline">A SECOND RITUAL</span><h2>Water first.<br /><em>Coffee next.</em></h2><p>Remove the ceramic filter insert and use the compatible carafe for a slow pour-over coffee. A little more function, without another appliance on the counter.</p><Link className="link-line" href="/care/">Explore care &amp; use <span aria-hidden="true">↗</span></Link></div>
      </section>

      <section id="film" className="film-block">
        <div className="page-shell film-head"><div className="section-label"><span>05</span><span>IN MOTION</span></div><div><h2>See the idea<br /><em>come to life.</em></h2><p>From the ceramic chamber to the final pour. See the glass, ceramic, and carbon in action in Chimera’s updated product film.</p></div></div>
        <div className="page-shell"><ProductFilm /></div>
        <div className="page-shell film-credit"><span>CHIMERA / 42-SECOND PRODUCT FILM</span><a href="/media/01_Coming_Soon_15s.mp4">Watch 15-second teaser ↗</a></div>
      </section>

      <section id="collection" className="collection page-shell studio-collection">
        <div className="section-label"><span>06</span><span>THE COLLECTION</span></div>
        <div className="collection-heading"><h2>Start with the kit.<br /><em>Stay for the details.</em></h2><p>Complete kit first, with carbon refills and individual parts available separately. Everything shown here is part of the Chimera collection.</p></div>
        <div className="home-collection-grid">
          <div className="studio-collection-quote">
            <span>ONE COMPLETE SYSTEM</span>
            <p>One kit to begin.<br />Parts to keep it <em>going.</em></p>
            <Link href="/shop/chimera-kit/" className="studio-button studio-button--solid">Discover the Chimera kit <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="home-shop-index">
            {[
              ['01', 'The Chimera kit', 'Carafe + black / white ceramic + 2 oz carbon', 'chimera-kit'],
              ['02', 'Activated charcoal', '2 oz refill', 'charcoal-2oz'],
              ['03', 'Activated charcoal', '12 oz refill', 'charcoal-12oz'],
              ['04', 'Glass carafe', 'Carafe only', 'glass-carafe'],
              ['05', 'Ceramic filter pack', 'Black / white + 2 oz carbon', 'ceramic-filter'],
            ].map(([number, name, option, slug]) =>
              <Link key={slug} href={'/shop/' + slug + '/'} className="home-shop-row">
                <span>{number}</span><strong>{name}</strong><small>{option}</small><span aria-hidden="true">↗</span>
              </Link>
            )}
          </div>
        </div>
        <Link className="home-shop-all" href="/shop/">Explore the complete collection <span aria-hidden="true">↗</span></Link>
      </section>

      <section className="press-band"><div className="page-shell press-inner"><span>IN THE PRESS</span><p>“This Plastic-Free Water Filter Wants to Replace Your Brita for Good”</p><a href="https://www.yankodesign.com/2025/09/02/this-plastic-free-water-filter-wants-to-replace-your-brita-for-good/" target="_blank" rel="noopener noreferrer">Read the Yanko Design story ↗</a></div></section>
      <section className="last-word page-shell"><span className="eyeline">LOOKING AFTER THE OBJECT</span><h2>Made to be used.<br /><em>And used again.</em></h2><Link className="link-line" href="/care/">Setup, carbon replacement &amp; care <span>↗</span></Link><p>Always follow the instructions included with your product. Chimera is not presented as a way to make microbiologically unsafe water safe to drink.</p></section>
    </main>
    <SiteFooter />
  </div>;
}
