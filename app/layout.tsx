import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Chimera | Sustainable by Design', description: 'Chimera reusable ceramic carbon filtration, glass carafe, and pour-over coffee.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html> }