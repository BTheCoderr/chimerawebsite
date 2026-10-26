import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://chimerawater.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Chimera | Ceramic Water Filtration, Reimagined', template: '%s | Chimera' },
  description: 'Meet Chimera: a reusable ceramic activated-carbon filter and glass carafe designed for a less disposable daily water ritual, with a pour-over coffee option.',
  applicationName: 'Chimera',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Chimera',
    title: 'Chimera | Water, without the throwaway.',
    description: 'Reusable ceramic. Activated carbon. Glass. Thoughtful water filtration designed for everyday life.',
    images: [{ url: '/images/KS Image-02-RS.jpg', alt: 'Chimera ceramic water filter and glass carafe' }],
  },
  twitter: { card: 'summary_large_image', title: 'Chimera | Water, without the throwaway.', images: ['/images/KS Image-02-RS.jpg'] },
  icons: { icon: [{ url: '/icon.svg', type: 'image/svg+xml' }] },
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
