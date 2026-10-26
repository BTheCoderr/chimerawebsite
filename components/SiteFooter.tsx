import Link from 'next/link';

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="page-shell footer-upper">
      <strong>CHIMERA</strong>
      <nav aria-label="Footer navigation">
        <Link href="/#philosophy">The design</Link>
        <Link href="/#film">The film</Link>
        <Link href="/shop/">Shop all products</Link>
        <Link href="/care/">Setup & care</Link>
        <Link href="/help/">Buying help</Link>
        <Link href="/privacy/">Privacy</Link>
      </nav>
    </div>
    <div className="page-shell footer-lower">
      <span>© {new Date().getFullYear()} CHIMERA · PRODUCT INVENTED BY SCOTT KEELEY</span>
      <span>WEBSITE DEVELOPED BY BAHEEM FERRELL</span>
    </div>
  </footer>;
}
