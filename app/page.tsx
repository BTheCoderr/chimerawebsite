import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ProductFilm } from '@/components/ProductFilm';
import { HomeKitChoice } from '@/components/HomeKitChoice';

const materials = [
  { number: '01', title: 'Activated carbon', detail: 'Replace the carbon inside the ceramic chamber as needed, without replacing the entire housing.' },
  { number: '02', title: 'High-fired ceramic', detail: 'A reusable, taste-neutral ceramic filter with a fitted lid that holds the activated carbon.' },
  { number: '03', title: 'Borosilicate glass', detail: 'A thermally shock-resistant glass carafe with a wool insulated grip, also suitable for pour-over coffee.' },
] as const;

const comparison = [
  { feature: 'Main vessel', chimera: 'Reusable glass carafe', conventional: 'Often a plastic pitcher' },
  { feature: 'Filter maintenance', chimera: 'Replace the activated carbon', conventional: 'Typically replace a cartridge' },
  { feature: 'Pour-over coffee', chimera: 'The carafe serves both uses', conventional: 'Not usually designed for brewing' },
  { feature: 'Finish options', chimera: 'Black or white ceramic', conventional: 'Depends on the model' },
] as const;

export default function Home() {
  return (
    <div className="chimera concept-b">
      <SiteHeader page="home" />
      <nav className="cb-product-nav" aria-label="Chimera product sections">
        <div className="cb-product-nav-inner">
          <Link href="/" className="cb-product-name">Chimera</Link>
          <div className="cb-product-nav-links">
            <Link href="/#overview">Overview</Link>
            <Link href="/#materials">Materials</Link>
            <Link href="/#story">Story</Link>
            <Link className="cb-mint-button cb-nav-cta" href="/shop/chimera-kit/">Explore kit</Link>
          </div>
        </div>
      </nav>
      <main id="main">
        <section id="overview" className="cb-hero" aria-labelledby="cb-main-heading">
          <div className="cb-hero-copy">
            <span className="cb-eyebrow cb-green">MEET THE CHIMERA KIT</span>
            <h1 id="cb-main-heading">Chimera.</h1>
            <p className="cb-hero-headline">Glass. Ceramic. Carbon. That&apos;s it.</p>
            <p className="cb-hero-description">Carbon Filtered Water, Plastic Free. A considered water-filtration system made to stay in your daily routine.</p>
            <div className="cb-actions">
              <Link href="/shop/chimera-kit/" className="cb-mint-button">Explore the kit</Link>
              <Link href="/#kit-contents" className="cb-secondary-link">Learn more <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <figure className="cb-hero-photo">
            <img src="/images/IMG_6116.jpeg" width={800} height={940} alt="Complete Chimera kit with white ceramic filter and lid assembled inside a clear glass carafe" />
            <figcaption>THE COMPLETE KIT / WHITE CERAMIC SHOWN</figcaption>
          </figure>
        </section>

        <section className="cb-black-panel" aria-labelledby="cb-black-title">
          <div className="cb-black-copy">
            <span className="cb-eyebrow">A SECOND FINISH</span>
            <h2 id="cb-black-title">Now in black.</h2>
            <p>The same reusable ceramic system in a darker finish. Choose the one that feels at home in your space.</p>
            <div className="cb-actions cb-actions-center">
              <Link href="/shop/chimera-kit/" className="cb-link-light">Explore the black kit <span aria-hidden="true">↗</span></Link>
              <Link href="/shop/ceramic-filter/" className="cb-link-bright">Ceramic filter details <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
          <figure className="cb-black-photo">
            <img src="/images/Water_Image-02.jpg" width={900} height={980} loading="lazy" alt="Chimera kit assembled with a black ceramic filter and a wool-grip glass carafe" />
            <figcaption>BLACK CERAMIC / GLASS CARAFE</figcaption>
          </figure>
        </section>

        <section className="cb-feature-grid" aria-label="Chimera's design and everyday uses">
          <article className="cb-feature-card" id="coffee">
            <div className="cb-feature-copy">
              <span className="cb-eyebrow">TWO DAILY RITUALS</span>
              <h2>Pour-over, built in.</h2>
              <p>Lift the ceramic filter. Add coffee grounds to your pour-over setup. Brew with the same glass carafe.</p>
              <Link href="/care/" className="cb-secondary-link">Explore care &amp; use <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="cb-feature-image">
              <img src="/images/Coffe_Poured_2.jpg" width={1000} height={900} loading="lazy" alt="Water being poured from a gooseneck kettle into a coffee filter above the Chimera glass carafe" />
            </div>
          </article>
          <article className="cb-feature-card">
            <div className="cb-feature-copy">
              <span className="cb-eyebrow">CONSIDERED MATERIALS</span>
              <h2>Made with intention.</h2>
              <p>High-fired ceramic, designed to hold activated carbon. Glass to serve the water. A wool grip for the pour.</p>
              <Link href="/#story" className="cb-secondary-link">Meet the designer <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="cb-feature-image cb-feature-image--carafe">
              <img src="/images/IMG_6069.png" width={1000} height={900} loading="lazy" alt="Individual Chimera borosilicate glass carafe with gray wool insulated grip" />
            </div>
          </article>
        </section>

        <section id="kit-contents" className="cb-materials-section">
          <div id="materials" className="cb-section-heading">
            <span className="cb-eyebrow">WHAT MAKES CHIMERA</span>
            <h2>Three materials.<br />One considered system.</h2>
            <p>High-fired, taste-neutral ceramic. Thermally shock-resistant borosilicate glass. Activated carbon that you replenish as needed.</p>
          </div>
          <div className="cb-materials-grid">
            {materials.map((item) => (
              <article className="cb-material-card" key={item.number}>
                <span className="cb-card-num">{item.number} / MATERIAL</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
          <div className="cb-materials-action">
            <Link href="/shop/chimera-kit/" className="cb-secondary-link">Everything in the complete kit <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="cb-comparison-section" aria-labelledby="cb-comparison-heading">
          <div className="cb-section-heading">
            <span className="cb-eyebrow">A DIFFERENT APPROACH</span>
            <h2 id="cb-comparison-heading">Keep the object.<br />Replace the carbon.</h2>
            <p>Unlike many replaceable-cartridge pitchers, Chimera separates the reusable housing from the carbon inside it.</p>
          </div>
          <div className="cb-comparison-scroll">
            <table className="cb-comparison">
              <thead><tr><th scope="col">What matters</th><th scope="col">Chimera</th><th scope="col">Typical cartridge pitcher*</th></tr></thead>
              <tbody>{comparison.map((item) => (
                <tr key={item.feature}>
                  <th scope="row">{item.feature}</th>
                  <td>{item.chimera}</td>
                  <td>{item.conventional}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
          <p className="cb-comparison-note">*Typical designs vary by manufacturer and model. This compares product configuration, not certified filtration performance.</p>
        </section>

        <section className="cb-statement" aria-labelledby="cb-statement-heading">
          <span className="cb-eyebrow">BUILT AROUND REUSE</span>
          <h2 id="cb-statement-heading">A lasting object.<br /><span>One part to refresh.</span></h2>
          <p>Change the carbon without discarding the glass and ceramic you already own.</p>
          <Link href="/shop/charcoal-2oz/" className="cb-secondary-link">Explore carbon refills <span aria-hidden="true">↗</span></Link>
        </section>

        <section id="story" className="cb-founder-section">
          <figure className="cb-founder-photo">
            <img src="/images/Filter_Pack_White.jpeg" width={840} height={890} loading="lazy" alt="White Chimera ceramic filter with its lid and included activated carbon pouch" />
            <figcaption>THE CERAMIC / WHITE FINISH</figcaption>
          </figure>
          <div className="cb-founder-copy">
            <span className="cb-eyebrow">THE STORY / SCOTT KEELEY</span>
            <h2>Six years.<br />32 prototypes.<br />One idea.</h2>
            <p>Designed by industrial designer Scott Keeley, Chimera began with a simple question: how could a familiar countertop filter use lasting materials and replaceable carbon?</p>
            <p>Good design starts with a <em>better question.</em> The result is a system of glass, ceramic, and carbon, made for water and everyday pour-over coffee.</p>
            <Link className="cb-secondary-link" href="/care/">Explore the design &amp; care <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section id="film" className="cb-film-section">
          <div className="cb-section-heading">
            <span className="cb-eyebrow">CHIMERA / IN MOTION</span>
            <h2>See how it works.</h2>
            <p>From the ceramic chamber to the final pour. The full product film includes sound.</p>
          </div>
          <div className="cb-film-wrap"><ProductFilm /></div>
          <p className="cb-film-footer"><span>CHIMERA / PRODUCT FILM WITH SOUND</span><a href="/media/01_Coming_Soon_15s.mp4">Watch the 15-second teaser <span aria-hidden="true">↗</span></a></p>
        </section>

        <section id="collection" className="cb-buy-section" aria-labelledby="cb-buy-title">
          <span className="cb-eyebrow cb-green">THE COMPLETE KIT / START HERE</span>
          <h2 id="cb-buy-title">Chimera.</h2>
          <p className="cb-buy-headline">One kit. Your choice of finish.</p>
          <HomeKitChoice />
        </section>

        <section className="cb-last-section">
          <h2>Need just a part?</h2>
          <p>Carbon refills, the glass carafe, and black or white ceramic filter packs are also available individually.</p>
          <Link href="/shop/" className="cb-secondary-link">See the full collection <span aria-hidden="true">↗</span></Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
