import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { site } from './data';

const sans = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const fullTitle = `${site.name} · ${site.title}`;

export const metadata = {
  metadataBase: new URL(site.url),
  title: fullTitle,
  description: site.description,
  openGraph: {
    title: fullTitle,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: fullTitle,
    description: site.description,
  },
};

export const viewport = {
  themeColor: '#FBFAF7',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Turns on the scroll animations only when JavaScript works, so content is never hidden */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
