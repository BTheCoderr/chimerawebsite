import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { ProductFilm } from '@/components/ProductFilm';

const shop = 'https://shop.tiktok.com/us/pdp/1732555288933666944';
export default function Home() {
  return <div className="chimera">
    <SiteHeader page="home" />
    <main id="main">
      <section className="masthead" aria-labelledby="hero-title">
        <div className="masthead-photo"><img src="/images/KS Image-02-RS.jpg" alt="Chimera glass carafe being used to pour water into a drinking glass in a home kitchen" fetchPriority="high" /></div>
        <div className="masthead-copy">
          <span className="eyeline">A DIFFERENT KIND OF WATER FILTER <span> / </span> 001</span>
          <h1 id="hero-title">Water, without<br />the <i>throwaway.</i></h1>
          <p>A reusable ceramic filter. A glass carafe. A more considered way to make the everyday extraordinary.</p>
          <a href="#film" className="link-line">Discover the story <span aria-hidden="true">↘</span></a>
        </div>
        <div className="masthead-foot"><span>CHIMERA / OBJECTS FOR DAILY LIFE</span><span>SCROLL TO EXPLORE</span></div>
      </section>
      <section id="philosophy" className="manifesto page-shell">
        <div className="section-label"><span>01</span><span>THE IDEA</span></div>
        <div><p className="manifesto-heading">Good design starts with a <em>better question.</em></p><div className="manifesto-bottom"><p>Why replace the entire filter when it&apos;s the carbon inside that needs refreshing? Chimera takes a familiar household object and redesigns it around glass, ceramic, and reuse.</p><p>Developed by industrial designer Scott Keeley over six years and 32 prototypes, Chimera is an everyday object with a more thoughtful purpose.</p></div></div>
      </section>
      <section className="object-story" aria-labelledby="object-title"><div className="object-story-media"><img src="/images/Water_Image-02.jpg" alt="Black ceramic Chimera filter in a clear glass carafe beneath leafy branches" loading="lazy" /></div><div className="object-story-copy"><span className="eyeline">THE MATERIALS / BLACK CERAMIC</span><h2 id="object-title">Considered<br/><em>from every angle.</em></h2><p>Black ceramic. Clear glass. A removable filter chamber designed for repeated everyday use.</p><p className="object-photo-credit">AN ACTUAL CHIMERA PRODUCT PHOTOGRAPH</p></div></section>
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
          <div><span>03 /</span><div><h3>Glass</h3><p>A simple, transparent vessel designed to sit comfortably on the countertop.</p></div></div>
        </div></div>
      </section>
      <section className="coffee-story">
        <div className="coffee-story-photo"><img src="/images/Coffe_Poured_2.jpg" alt="Hot water poured from a copper kettle over coffee grounds into a glass pour-over carafe" loading="lazy" /></div>
        <div className="coffee-story-copy"><span className="eyeline">A SECOND RITUAL</span><h2>Water first.<br /><em>Coffee next.</em></h2><p>Remove the ceramic filter insert and use the compatible carafe for a slow pour-over coffee. A little more function, without another appliance on the counter.</p><Link className="link-line" href="/care">How to use Chimera <span>↗</span></Link></div>
      </section>
      <section id="collection" className="collection page-shell">
        <div className="section-label"><span>04</span><span>THE COLLECTION</span></div>
        <div className="collection-heading"><h2>The things that<br/><em>make it work.</em></h2><p>One reusable filter design, with buying options for the complete setup, insert, and replacement carbon. Check each listing before ordering.</p></div>
        <p className="collection-seller-note">Purchases and order questions are handled by the linked TikTok Shop seller. Prices, stock, shipping and returns are set by that seller.</p><div className="collection-editorial">
          <figure className="collection-primary-photo"><img src="/images/Inventory Product3.jpeg" alt="A real white ceramic Chimera filter installed in a clear glass carafe" loading="lazy" /><figcaption>CHIMERA / CERAMIC AND GLASS</figcaption></figure>
          <div className="collection-options">
            <article className="collection-option"><span className="collection-number">01 / COMPLETE SETUP</span><h3>Chimera system</h3><p>For a complete setup, including a glass carafe and reusable ceramic chamber. Confirm the exact components, color, and included carbon in the seller listing before ordering.</p><a href={shop} target="_blank" rel="noopener noreferrer">See available seller options <span aria-hidden="true">↗</span></a></article>
            <article className="collection-option"><span className="collection-number">02 / FILTER ONLY</span><h3>Ceramic insert</h3><p>The reusable ceramic chamber is intended for a compatible cone-top carafe; it is not itself a glass carafe. Confirm measurements, fit, and insert-only availability before purchasing.</p><a href={shop} target="_blank" rel="noopener noreferrer">Ask the seller about insert-only availability <span aria-hidden="true">↗</span></a></article>
            <article className="collection-option"><span className="collection-number">03 / REPLACEMENT CARBON</span><h3>Carbon refills</h3><p>Replacement activated carbon is offered in 2 oz and 12 oz bags. Package photographs, prices, and individual order links have not yet been confirmed.</p><a href={shop} target="_blank" rel="noopener noreferrer">Ask the seller about carbon refills <span aria-hidden="true">↗</span></a></article>
          </div>
        </div>
      </section>
      <section className="press-band"><div className="page-shell press-inner"><span>IN THE PRESS</span><p>“This Plastic-Free Water Filter Wants to Replace Your Brita for Good”</p><a href="https://www.yankodesign.com/2025/09/02/this-plastic-free-water-filter-wants-to-replace-your-brita-for-good/" target="_blank" rel="noopener noreferrer">Read the Yanko Design story ↗</a></div></section>
      <section className="last-word page-shell"><span className="eyeline">LOOKING AFTER THE OBJECT</span><h2>Made to be used.<br /><em>And used again.</em></h2><Link className="link-line" href="/care">Setup, carbon replacement & care <span>↗</span></Link><p>Always follow the instructions included with your product. Chimera is not presented as a way to make microbiologically unsafe water safe to drink.</p></section>
    </main>
    <SiteFooter />
  </div>
}