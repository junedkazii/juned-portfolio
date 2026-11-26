import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import './globals.css';
import './intro.css';
import { site } from './data';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import Reveal from './components/Reveal';
import Intro, { IntroOverlay } from './components/Intro';
import JsonLd from './components/JsonLd';

const sans = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const fullTitle = `${site.name} · SaaS Developer for Founders | Next.js MVPs with Payments`;
// What Google shows under your name in search results (keep it under about 155 characters)
const seoDescription =
  'I build SaaS apps that go live and take payments: MVPs, Razorpay and Stripe payments, AI features and AI app rescue. India-based, working worldwide.';

const themeScript = `(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var theme = null;
  try { theme = localStorage.getItem('theme'); } catch (e) {}
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  root.setAttribute('data-theme', theme);

  // Opening animation: home page, first visit this session, motion allowed
  try {
    var seen = sessionStorage.getItem('intro-seen');
    var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!seen && !calm && location.pathname === '/') root.classList.add('intro-on');
  } catch (e) {}
})();`;

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: fullTitle, template: `%s · ${site.name}` },
  description: seoDescription,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    'SaaS developer',
    'SaaS developer India',
    'hire SaaS developer',
    'MVP development',
    'Next.js developer',
    'Firebase developer',
    'Razorpay integration',
    'Stripe integration',
    'AI app rescue',
    'Lovable app fix',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  formatDetection: { telephone: false },
  openGraph: {
    title: fullTitle,
    description: seoDescription,
    url: site.url,
    siteName: site.name,
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: fullTitle,
    description: seoDescription,
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
            2. picks light or dark mode (saved choice first, otherwise the device setting), so there's no white flash
            3. decides whether to play the opening animation */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <JsonLd />
        <IntroOverlay name={site.name} tagline={site.title} />
        <Intro />
        <SiteHeader />
        {children}
        <SiteFooter />
        <Reveal />
      </body>
    </html>
  );
}
