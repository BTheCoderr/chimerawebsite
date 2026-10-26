import Link from 'next/link';

type Page = 'home' | 'care' | 'help' | 'privacy';

const SHOP_URL = 'https://shop.tiktok.com/us/pdp/1732555288933666944';

export function SiteHeader({ page = 'home' }: { page?: Page }) {
  const links = [
    { href: '/#philosophy', label: 'The design' },
    { href: '/#film', label: 'The film' },
    { href: '/#collection', label: 'Collection' },
    { href: '/care/', label: 'Care' },
    { href: '/help/', label: 'Help' },
  ];
  return <>
    <a className="skip-to-content" href="#main">Skip to content</a>
    <header className="site-nav">
      <div className="nav-inner">
        <Link href="/" className="brand-lockup" aria-label="Chimera home">
          <img src="/images/Logo-Lines.svg" alt="" width={43} height={53} />
          <span className="brand-name">Chimera</span>
        </Link>
        <nav aria-label="Primary navigation">
          {links.map(({href,label}) => <Link
            key={href} href={href}
            aria-current={page === 'care' && label === 'Care' || page === 'help' && label === 'Help' ? 'page' : undefined}
          >{label}</Link>)}
        </nav>
        <details className="mobile-menu">
          <summary aria-label="Open navigation menu">Menu</summary>
          <div className="mobile-menu-links">
            {links.map(({href,label}) => <Link key={href} href={href}>{label}</Link>)}
          </div>
        </details>
        <a className="shop-link" href={SHOP_URL} target="_blank" rel="noopener noreferrer">
          TikTok Shop <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  </>;
}
