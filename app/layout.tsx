import type { Metadata } from 'next';
import './globals.css';

const siteUrl = 'https://chimerawater.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Chimera | Carbon Filtered Water, Plastic Free', template: '%s | Chimera' },
  description: 'Carbon filtered water, plastic free. Chimera pairs high-fired ceramic and activated carbon with a borosilicate glass carafe designed for water and pour-over coffee.',
  applicationName: 'Chimera',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Chimera',
    title: 'Chimera | Carbon Filtered Water, Plastic Free',
    description: 'A taste-neutral ceramic housing with activated carbon, paired with a borosilicate glass carafe.',
    images: [{ url: '/images/KS Image-02-RS.jpg', alt: 'Chimera ceramic water filter and glass carafe' }],
  },
  twitter: { card: 'summary_large_image', title: 'Chimera | Carbon Filtered Water, Plastic Free', images: ['/images/KS Image-02-RS.jpg'] },
  icons: { icon: [{ url: '/icon.svg', type: 'image/svg+xml' }] },
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
