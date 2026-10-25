import Link from 'next/link';

const shop = 'https://shop.tiktok.com/us/pdp/1732555288933666944';
const film = 'https://www.youtube-nocookie.com/embed/rAhQM2hbx14?rel=0';
export default function Home() {
  return <div className="chimera">
    <header className="site-nav"><div className="nav-inner">
      <Link href="/" className="logotype" aria-label="Chimera home"><img src="/images/Logo-Lines.svg" alt="Chimera" /></Link>
      <nav aria-label="Main navigation"><a href="#philosophy">The idea</a><a href="#film">The film</a><a href="#collection">Collection</a><Link href="/care">Care</Link></nav>
      <a className="shop-link" href={shop} target="_blank" rel="noopener noreferrer">Explore shop <span aria-hidden="true">↗</span></a>
    </div></header>
    <main>
      <section className="masthead" aria-labelledby="hero-title">
        <div className="masthead-photo"><img src="/images/KS Image-02-RS.jpg" alt="Chimera reusable ceramic filter and glass carafe" fetchPriority="high" /></div>
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
      <section className="image-story" aria-label="Chimera water pouring"><div className="image-story-picture"><img src="/images/Water_Image-02.jpg" alt="Water pouring from a glass carafe" loading="lazy" /></div><div className="image-story-caption"><span>AN EVERYDAY RITUAL, RETHOUGHT.</span><span>IMAGE 01 / WATER</span></div></section>
      <section id="film" className="film-block">
        <div className="page-shell film-head"><div className="section-label"><span>02</span><span>IN MOTION</span></div><div><h2>See the idea<br /><em>come to life.</em></h2><p>From the ceramic chamber to the final pour. See how Chimera works in the original product film.</p></div></div>
        <div className="page-shell film-container"><iframe src={film} title="Chimera: The First Plastic-Free Water Filter & Coffee Maker — product film" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
        <div className="page-shell film-credit"><span>CHIMERA / PRODUCT FILM</span><a href="https://www.youtube.com/watch?v=rAhQM2hbx14" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></div>
      </section>
      <section className="detail-gallery page-shell" aria-label="Chimera product photography"><figure><img src="/images/Chimera-2.jpg" alt="Chimera water-filter system, product photograph" loading="lazy" /><figcaption>CHIMERA / THE COMPLETE SYSTEM</figcaption></figure><figure><img src="/images/Chimera-3.jpg" alt="Chimera reusable ceramic filter, product photograph" loading="lazy" /><figcaption>CHIMERA / REUSABLE CERAMIC</figcaption></figure></section><section className="materials page-shell">
        <div className="section-label"><span>03</span><span>MATERIAL INTELLIGENCE</span></div>
        <div className="materials-body"><h2>Nothing extra.<br /><em>Nothing disposable.</em></h2><div className="materials-list">
          <div><span>01 /</span><div><h3>Ceramic</h3><p>A durable, reusable housing crafted in Ohio to hold the activated carbon.</p></div></div>
          <div><span>02 /</span><div><h3>Activated carbon</h3><p>Replace the carbon inside the chamber, rather than discarding the housing.</p></div></div>
          <div><span>03 /</span><div><h3>Glass</h3><p>A simple, transparent vessel designed to sit comfortably on the countertop.</p></div></div>
        </div></div>
      </section>
      <section className="coffee-story">
        <div className="coffee-story-photo"><img src="/images/Coffe_Poured_2.jpg" alt="Pour-over coffee being prepared in the glass carafe" loading="lazy" /></div>
        <div className="coffee-story-copy"><span className="eyeline">A SECOND RITUAL</span><h2>Water first.<br /><em>Coffee next.</em></h2><p>Remove the ceramic filter insert and use the compatible carafe for a slow pour-over coffee. A little more function, without another appliance on the counter.</p><Link className="link-line" href="/care">How to use Chimera <span>↗</span></Link></div>
      </section>
      <section id="collection" className="collection page-shell"><div className="section-label"><span>04</span><span>THE COLLECTION</span></div><div className="collection-heading"><h2>Find your <em>Chimera.</em></h2><p>Thoughtful essentials, made for everyday use. Please confirm exact contents and pricing on the seller listing.</p></div>
        <div className="collection-list">
          <article className="collection-product"><div className="collection-picture"><img src="/images/Chimera-2.jpg" alt="Chimera ceramic filter and glass carafe" loading="lazy" /></div><div className="collection-detail"><span>01 / THE SYSTEM</span><h3>Chimera system</h3><p>The complete water ritual. Check your chosen seller listing for included carafe, filter, and color.</p><a href={shop} target="_blank" rel="noopener noreferrer">View seller options ↗</a></div></article>
          <article className="collection-product"><div className="collection-picture"><img src="/images/Chimera-3.jpg" alt="Chimera reusable ceramic filter component" loading="lazy" /></div><div className="collection-detail"><span>02 / THE CORE</span><h3>Ceramic filter</h3><p>The ceramic chamber for compatible cone-top carafes. Confirm fit and what is included before purchasing.</p><a href={shop} target="_blank" rel="noopener noreferrer">View seller options ↗</a></div></article>
          <article className="collection-product"><div className="collection-picture refill-photo"><img src="/images/Bottles.jpg" alt="Chimera water bottles and glassware lifestyle photograph" loading="lazy" /><span className="refill-photo-note">Refill package photographs pending</span></div><div className="collection-detail"><span>03 / KEEP IT GOING</span><h3>Carbon refills</h3><p>Activated carbon in 2 oz and 12 oz sizes. Individual photos and purchase links are being finalized.</p><span className="coming-soon">REFILL LINKS COMING SOON</span></div></article>
        </div>
      </section>
      <section className="press-band"><div className="page-shell press-inner"><span>IN THE PRESS</span><p>“This Plastic-Free Water Filter Wants to Replace Your Brita for Good”</p><a href="https://www.yankodesign.com/2025/09/02/this-plastic-free-water-filter-wants-to-replace-your-brita-for-good/" target="_blank" rel="noopener noreferrer">Read the Yanko Design story ↗</a></div></section>
      <section className="last-word page-shell"><span className="eyeline">LOOKING AFTER THE OBJECT</span><h2>Made to be used.<br /><em>And used again.</em></h2><Link className="link-line" href="/care">Setup, carbon replacement & care <span>↗</span></Link><p>Always follow the instructions included with your product. Chimera is not presented as a way to make microbiologically unsafe water safe to drink.</p></section>
    </main>
    <footer className="site-footer"><div className="page-shell footer-upper"><strong>CHIMERA</strong><div><a href="#philosophy">The idea</a><a href="#film">The film</a><a href="#collection">Collection</a><Link href="/care">Care guide</Link></div></div><div className="page-shell footer-lower"><span>© 2026 CHIMERA · PRODUCT INVENTED BY SCOTT KEELEY</span><span>WEBSITE DEVELOPED BY BAHEEM FERRELL</span></div></footer>
  </div>
}