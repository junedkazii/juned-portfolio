import { site } from './data';

// One helper for every page's search and share details:
// title, description, the page's own address (canonical) and the share preview.
export function pageMeta({ title, description, path }) {
  const shareTitle = `${title} · ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle,
      description,
      url: path,
      siteName: site.name,
      type: 'website',
      locale: 'en_IN',
      images: ['/opengraph-image'],
    },
    twitter: {
      card: 'summary_large_image',
      title: shareTitle,
      description,
      images: ['/opengraph-image'],
    },
  };
}
