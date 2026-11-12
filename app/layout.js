import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { site } from './data';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import Reveal from './components/Reveal';

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

const themeScript = `(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var theme = null;
  try { theme = localStorage.getItem('theme'); } catch (e) {}
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  root.setAttribute('data-theme', theme);
})();`;

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: fullTitle, template: `%s · ${site.name}` },
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
        {/* Runs before the page paints:
            1. turns on the scroll animations only when JavaScript works, so content is never hidden
            2. picks light or dark mode (saved choice first, otherwise the device setting), so there's no white flash */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Reveal />
      </body>
    </html>
  );
}
