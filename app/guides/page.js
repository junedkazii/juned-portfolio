import Link from 'next/link';
import SplitWords from '../components/SplitWords';
import { guides } from './posts';
import { pageMeta } from '../seo';
import './guides.css';

export const metadata = pageMeta({
  title: 'Guides: Take Your AI-Built App to Production',
  description:
    'Practical guides for founders who built with Lovable, Bolt, Emergent or Replit: export your code, secure your data, set up payments and launch on your own hosting.',
  path: '/guides',
});

export default function GuidesPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="crumb mono rise">
            <Link href="/">Home</Link> <span aria-hidden="true">/</span> Guides
          </p>
          <h1 className="page-title words words-now">
            <SplitWords parts={[{ t: 'Built it with AI? ' }, { t: 'Launch it properly.', em: true }]} />
          </h1>
          <p className="page-lead rise">
            Plain-English guides for founders who built their app with Lovable, Bolt, Emergent or Replit and now want
            real users, real payments and their own hosting.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="tool-grid tool-grid-big">
            {guides.map((g, i) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="tool-card reveal" data-spotlight>
                <span className="mono tool-label">
                  {String(i + 1).padStart(2, '0')} · {g.platform}
                </span>
                <span className="tool-name">{g.title}</span>
                <span className="tool-short">{g.description}</span>
                <span className="tool-go" aria-hidden="true">
                  Read guide · {g.readMins} min →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
