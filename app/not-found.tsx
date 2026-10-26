import Link from 'next/link';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

export default function NotFound() {
  return <div className="chimera">
    <SiteHeader />
    <main id="main" className="page-shell missing-page">
      <span className="eyeline">CHIMERA / 404</span>
      <h1>Nothing here,<br /><em>for now.</em></h1>
      <p>That address doesn't lead to a page on the current Chimera website.</p>
      <div className="missing-actions"><Link className="link-line" href="/">Return home <span aria-hidden="true">↗</span></Link><Link className="link-line" href="/help/">Buying help <span aria-hidden="true">↗</span></Link></div>
    </main>
    <SiteFooter />
  </div>;
}
