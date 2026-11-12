import Link from 'next/link';
import SplitWords from './SplitWords';
import { aiBuilders, waLink } from '../content';

// "Built it with AI? Here's what usually breaks." Used on the home and services pages.
export default function AiBuilders() {
  const a = aiBuilders;
  return (
    <section id="ai-apps" className="section ai-section">
      <div className="wrap">
        <div className="ai-head">
          <div className="reveal">
            <p className="mono ai-label">{a.label}</p>
            <h2 className="h2 words">
              <SplitWords parts={a.title} />
            </h2>
          </div>
          <div className="ai-intro reveal">
            <p>{a.intro}</p>
            <p className="ai-fair">{a.fair}</p>
          </div>
        </div>

        <ol className="ai-grid">
          {a.problems.map((p, i) => (
            <li key={p.title} className="ai-card reveal" data-spotlight>
              <span className="ai-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <p className="ai-fix">
                <span aria-hidden="true">→ </span>
                {p.fix}
              </p>
            </li>
          ))}
        </ol>

        <div className="ai-cta reveal">
          <p>Not sure if your app has these problems? Answer 8 quick questions and find out.</p>
          <div className="ai-cta-btns">
            <Link href="/tools/ai-app-rescue-check" className="btn btn-accent" data-magnetic>
              Check my app free →
            </Link>
            <a
              href={waLink('Hi Juned, I built my app with an AI builder and need help making it ready for real users.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost-dark"
            >
              Talk to me on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
