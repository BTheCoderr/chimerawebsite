import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ProductFilm } from '@/components/ProductFilm';

export default function Home() {
  return <div className="chimera">
    <SiteHeader page="home" />
    <main id="main">
      <section className="masthead" aria-labelledby="hero-title">
        <div className="masthead-photo"><img src="/images/KS Image-02-RS.jpg" alt="Chimera glass carafe being used to pour water into a drinking glass in a home kitchen" fetchPriority="high" /></div>
        <div className="masthead-copy">
          <span className="eyeline">A DIFFERENT KIND OF WATER FILTER <span> / </span> 001</span>
          <h1 id="hero-title" className="scott-headline">Carbon Filtered<br />Water, <i>Plastic Free</i></h1>
          <p>Chimera replaces the traditional plastic pitcher and disposable shell with a high-fired, taste-neutral ceramic housing paired with activated carbon. This core is set inside a durable, thermally shock-resistant borosilicate glass carafe.</p>
          <Link href="/shop/" className="link-line">Explore the Chimera shop <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="masthead-foot"><span>CHIMERA / OBJECTS FOR DAILY LIFE</span><span>SCROLL TO EXPLORE</span></div>
      </section>
      <section id="philosophy" className="manifesto page-shell">
        <div className="section-label"><span>01</span><span>THE IDEA</span></div>
        <div><p className="manifesto-heading">Good design starts with a <em>better question.</em></p><div className="manifesto-bottom"><p>Why replace the entire filter when it&apos;s the carbon inside that needs refreshing? Chimera takes a familiar household object and redesigns it around glass, ceramic, and reuse.</p><p>Developed by industrial designer Scott Keeley over six years and 32 prototypes, Chimera is an everyday object with a more thoughtful purpose.</p></div></div>
      </section>
      <section className="object-story" aria-labelledby="object-title"><div className="object-story-media"><img src="/images/Water_Image-02.jpg" alt="Black ceramic Chimera filter in a clear glass carafe beneath leafy branches" loading="lazy" /></div><div className="object-story-copy"><span className="eyeline">THE MATERIALS / BLACK OR WHITE CERAMIC FILTER</span><h2 id="object-title">Considered<br/><em>from every angle.</em></h2><p>Your choice of black or white ceramic filter paired with a clear borosilicate carafe with a wool insulated grip. The carafe is also a pour-over coffee carafe. Better tasting coffee comes from better tasting water.</p><p className="object-photo-credit">CHIMERA / BLACK CERAMIC SHOWN</p></div></section>
      <section id="film" className="film-block">
        <div className="page-shell film-head"><div className="section-label"><span>02</span><span>IN MOTION</span></div><div><h2>See the idea<br /><em>come to life.</em></h2><p>From the ceramic chamber to the final pour. See how Chimera works in the original product film.</p></div></div>
        <div className="page-shell"><ProductFilm /></div>
        <div className="page-shell film-credit"><span>CHIMERA / PRODUCT FILM</span><a href="https://www.youtube.com/watch?v=rAhQM2hbx14" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></div>
      </section>
      <section className="materials page-shell">
        <div className="section-label"><span>03</span><span>MATERIAL INTELLIGENCE</span></div>
        <div className="materials-body"><h2>Nothing extra.<br /><em>Nothing disposable.</em></h2><div className="materials-list">
          <div><span>01 /</span><div><h3>Ceramic</h3><p>A durable, reusable housing crafted in Ohio to hold the activated carbon.</p></div></div>
          <div><span>02 /</span><div><h3>Activated carbon</h3><p>Replace the carbon inside the chamber, rather than discarding the housing.</p></div></div>
          <div><span>03 /</span><div><h3>Glass</h3><p>A borosilicate carafe holds your filtered water and makes great coffee.</p></div></div>
        </div></div>
      </section>
      <section className="coffee-story">
        <div className="coffee-story-photo"><img src="/images/Coffe_Poured_2.jpg" alt="Hot water poured from a copper kettle over coffee grounds into a glass pour-over carafe" loading="lazy" /></div>
        <div className="coffee-story-copy"><span className="eyeline">A SECOND RITUAL</span><h2>Water first.<br /><em>Coffee next.</em></h2><p>Remove the ceramic filter insert and use the compatible carafe for a slow pour-over coffee. A little more function, without another appliance on the counter.</p><Link className="link-line" href="/care">How to use Chimera <span>↗</span></Link></div>
      </section>
      <section id="collection" className="collection page-shell">
        <div className="section-label"><span>04</span><span>THE COLLECTION</span></div>
        <div className="collection-heading"><h2>Choose what<br /><em>belongs to you.</em></h2><p>Five products. A glass carafe, a filter in black or white, two charcoal sizes, and one complete kit.</p></div>
        <div className="home-shop-index">
          {[
            ['01', 'Glass carafe', 'By itself', 'glass-carafe'],
            ['02', 'Ceramic filter', 'Black / White', 'ceramic-filter'],
            ['03', 'Activated charcoal', '2 oz', 'charcoal-2oz'],
            ['04', 'Activated charcoal', '12 oz', 'charcoal-12oz'],
            ['05', 'The Chimera kit', 'Carafe + filter + 2 oz charcoal', 'chimera-kit'],
          ].map(([number, name, option, slug]) =>
            <Link key={slug} href={'/shop/' + slug + '/'} className="home-shop-row">
              <span>{number}</span><strong>{name}</strong><small>{option}</small><span aria-hidden="true">↗</span>
            </Link>
          )}
        </div>
        <Link className="home-shop-all" href="/shop/">Explore the entire collection <span aria-hidden="true">↗</span></Link>
      </section>
      <section className="press-band"><div className="page-shell press-inner"><span>IN THE PRESS</span><p>“This Plastic-Free Water Filter Wants to Replace Your Brita for Good”</p><a href="https://www.yankodesign.com/2025/09/02/this-plastic-free-water-filter-wants-to-replace-your-brita-for-good/" target="_blank" rel="noopener noreferrer">Read the Yanko Design story ↗</a></div></section>
      <section className="last-word page-shell"><span className="eyeline">LOOKING AFTER THE OBJECT</span><h2>Made to be used.<br /><em>And used again.</em></h2><Link className="link-line" href="/care">Setup, carbon replacement & care <span>↗</span></Link><p>Always follow the instructions included with your product. Chimera is not presented as a way to make microbiologically unsafe water safe to drink.</p></section>
    </main>
    <SiteFooter />
  </div>
}