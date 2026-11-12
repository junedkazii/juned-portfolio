import Link from 'next/link';
import SplitWords from '../components/SplitWords';
import { tools } from '../content';

export const metadata = {
  title: 'Free tools for founders',
  description:
    'Free tools for SaaS founders: MVP cost calculator, payment gateway fee calculator, launch checklist and AI app rescue check.',
};

export default function ToolsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="crumb mono rise">
            <Link href="/">Home</Link> <span aria-hidden="true">/</span> Free tools
          </p>
          <h1 className="page-title words words-now">
            <SplitWords parts={[{ t: 'Free tools ' }, { t: 'for founders', em: true }]} />
          </h1>
          <p className="page-lead rise">
            Small, useful tools I built for people planning or launching a SaaS. Free, no sign-up, nothing saved on a
            server.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="tool-grid tool-grid-big">
            {tools.map((tool, i) => (
              <Link key={tool.slug} href={`/tools/${tool.slug}`} className="tool-card reveal" data-spotlight>
                <span className="mono tool-label">
                  {String(i + 1).padStart(2, '0')} · {tool.label}
                </span>
                <span className="tool-name">{tool.name}</span>
                <span className="tool-short">{tool.short}</span>
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
