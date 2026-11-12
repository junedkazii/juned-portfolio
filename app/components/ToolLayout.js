import Link from 'next/link';
import SplitWords from './SplitWords';
import { tools } from '../content';

// Shared frame for every free tool page: heading, the tool, then links to the other tools.
export default function ToolLayout({ slug, title, lead, children }) {
  const others = tools.filter((t) => t.slug !== slug);
  return (
    <main>
      <section className="page-hero tool-hero">
        <div className="wrap">
          <p className="crumb mono rise">
            <Link href="/tools">Free tools</Link> <span aria-hidden="true">/</span>{' '}
            {tools.find((t) => t.slug === slug)?.label}
          </p>
          <h1 className="page-title words words-now">
            <SplitWords parts={title} />
          </h1>
          <p className="page-lead rise">{lead}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">{children}</div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="mono more-tools-k reveal">More free tools</p>
          <div className="tool-grid tool-grid-3">
            {others.map((t) => (
              <Link key={t.slug} href={`/tools/${t.slug}`} className="tool-card reveal" data-spotlight>
                <span className="mono tool-label">{t.label}</span>
                <span className="tool-name">{t.name}</span>
                <span className="tool-short">{t.short}</span>
                <span className="tool-go" aria-hidden="true">
                  Open tool →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
