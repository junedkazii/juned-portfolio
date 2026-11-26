import Link from 'next/link';
import { notFound } from 'next/navigation';
import SplitWords from '../../components/SplitWords';
import { guides, guideBySlug } from '../posts';
import { site, links } from '../../data';
import { pageMeta } from '../../seo';
import '../guides.css';

const ext = { target: '_blank', rel: 'noopener noreferrer' };

// Builds one page per guide, e.g. /guides/lovable-app-to-production
export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const g = guideBySlug[slug];
  if (!g) return {};
  const meta = pageMeta({ title: g.seoTitle, description: g.description, path: `/guides/${slug}` });
  // Article pages use the full search title without the "· Juned Kazi" ending
  return { ...meta, title: { absolute: g.seoTitle }, openGraph: { ...meta.openGraph, type: 'article' } };
}

const anchor = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);

const niceDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

function Block({ b }) {
  if (b.p) return <p>{b.p}</p>;
  if (b.ul)
    return (
      <ul>
        {b.ul.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    );
  if (b.ol)
    return (
      <ol>
        {b.ol.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ol>
    );
  if (b.table)
    return (
      <div className="gd-table">
        <table>
          <thead>
            <tr>
              {b.table.head.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {b.table.rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  if (b.note)
    return (
      <div className="gd-note">
        <b>Good to know: </b>
        {b.note}
      </div>
    );
  return null;
}

export default async function GuidePage({ params }) {
  const { slug } = await params;
  const g = guideBySlug[slug];
  if (!g) notFound();

  const url = `${site.url}/guides/${slug}`;
  const others = guides.filter((x) => x.slug !== slug);

  // Tells Google this page is an article, who wrote it and where it sits on the site
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: g.title,
        description: g.description,
        datePublished: g.updated,
        dateModified: g.updated,
        author: { '@type': 'Person', name: site.name, url: site.url },
        publisher: { '@type': 'Person', name: site.name, url: site.url },
        mainEntityOfPage: url,
        image: `${site.url}/opengraph-image`,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${site.url}/guides` },
          { '@type': 'ListItem', position: 3, name: g.title, item: url },
        ],
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <section className="page-hero">
        <div className="wrap">
          <p className="crumb mono rise">
            <Link href="/">Home</Link> <span aria-hidden="true">/</span> <Link href="/guides">Guides</Link>{' '}
            <span aria-hidden="true">/</span> {g.platform}
          </p>
          <h1 className="page-title gd-title words words-now">
            <SplitWords parts={[{ t: g.title }]} />
          </h1>
          <p className="page-lead rise">{g.intro}</p>
          <p className="gd-meta rise">
            <span>By {site.name}</span>
            <span>Updated {niceDate(g.updated)}</span>
            <span>{g.readMins} min read</span>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="gd-layout">
            <nav className="gd-toc" aria-label="On this page">
              <p>On this page</p>
              {g.sections.map((s) => (
                <a key={s.h} href={`#${anchor(s.h)}`}>
                  {s.h}
                </a>
              ))}
            </nav>

            <article className="gd-article">
              {g.sections.map((s) => (
                <div key={s.h}>
                  <h2 id={anchor(s.h)}>{s.h}</h2>
                  {s.blocks.map((b, i) => (
                    <Block key={i} b={b} />
                  ))}
                </div>
              ))}

              <div className="gd-sources">
                <h2>Sources</h2>
                <p className="mono" style={{ fontSize: 12, color: 'var(--faint)' }}>
                  Checked {niceDate(g.updated)}. These tools change often, so check the latest docs too.
                </p>
                <ul>
                  {g.sources.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} {...ext}>
                        {s.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>

          <div className="contact-card reveal" data-spotlight style={{ marginTop: 56 }}>
            <p className="mono">Built with {g.platform === 'All builders' ? 'AI' : g.platform}?</p>
            <h2 className="words">
              <SplitWords parts={[{ t: 'Get a free ' }, { t: 'app check.', em: true }]} />
            </h2>
            <p>Send me your app link. I&apos;ll tell you what needs fixing before launch, for free.</p>
            <div className="contact-actions">
              <a href={links.whatsapp} {...ext} className="btn btn-accent" data-magnetic>
                Get a free app check
              </a>
              <Link href="/tools/ai-app-rescue-check" className="btn btn-ghost-dark">
                Try the rescue check tool
              </Link>
              <a href={links.booking} {...ext} className="btn btn-ghost-dark">
                Book a 20-min call
              </a>
            </div>
          </div>

          <div className="gd-more">
            <h2>More guides</h2>
            <div className="tool-grid">
              {others.map((o) => (
                <Link key={o.slug} href={`/guides/${o.slug}`} className="tool-card reveal" data-spotlight>
                  <span className="mono tool-label">{o.platform}</span>
                  <span className="tool-name">{o.title}</span>
                  <span className="tool-go" aria-hidden="true">
                    Read · {o.readMins} min →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
