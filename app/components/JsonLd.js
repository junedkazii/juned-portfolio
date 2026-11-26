import { site, links, featuredService, services } from '../data';

// Structured data: tells Google in its own language who you are,
// what you sell and for how much. It's invisible on the page.
const toNumber = (s) => Number(String(s || '').replace(/[^0-9]/g, '')) || undefined;

export default function JsonLd() {
  const sameAs = [links.linkedin, links.x, links.github].filter(Boolean);
  const all = [featuredService, ...services];

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${site.url}/#person`,
        name: site.name,
        jobTitle: 'SaaS Developer',
        description: site.description,
        url: site.url,
        ...(site.photo ? { image: `${site.url}${site.photo}` } : {}),
        address: { '@type': 'PostalAddress', addressCountry: 'IN' },
        knowsAbout: ['SaaS development', 'MVP development', 'Next.js', 'Firebase', 'Razorpay', 'Stripe', 'AI features', 'AI app rescue'],
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${site.url}/#service`,
        name: `${site.name} · ${site.title}`,
        description: site.description,
        url: site.url,
        ...(site.photo ? { image: `${site.url}${site.photo}` } : {}),
        provider: { '@id': `${site.url}/#person` },
        address: { '@type': 'PostalAddress', addressCountry: 'IN' },
        areaServed: 'Worldwide',
        priceRange: '₹5,000–₹75,000',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'SaaS development services',
          itemListElement: all.map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.name, description: s.text || s.promise },
            price: toNumber(s.inr),
            priceCurrency: 'INR',
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { '@id': `${site.url}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
