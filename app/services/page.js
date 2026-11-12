import Link from 'next/link';
import SplitWords from '../components/SplitWords';
import AiBuilders from '../components/AiBuilders';
import { featuredService, services, processSteps, links } from '../data';
import { serviceDetails, waLink } from '../content';

const ext = { target: '_blank', rel: 'noopener noreferrer' };

export const metadata = {
  title: 'Services and prices',
  description:
    'Fixed-price packages: SaaS MVPs, payments setup, AI features, landing pages, launch fixes, AI app rescue and monthly care.',
};

export default function ServicesPage() {
  const all = [{ ...featuredService, time: featuredService.time, featured: true }, ...services];

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="crumb mono rise">
            <Link href="/">Home</Link> <span aria-hidden="true">/</span> Services
          </p>
          <h1 className="page-title words words-now">
            <SplitWords parts={[{ t: 'Fixed packages, ' }, { t: 'fixed prices', em: true }]} />
          </h1>
          <p className="page-lead rise">
            You know the cost and the date before I start. Pick a package, or book a free call and we&apos;ll shape it
            together.
          </p>
          <nav className="svc-jump rise" aria-label="Jump to a package">
            {all.map((s) => (
              <a key={s.name} href={`#${s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="chip-static">
                {s.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="section">
        <div className="wrap svc-list">
          {all.map((s) => {
            const d = serviceDetails[s.name] || { included: [], notIncluded: [] };
            const id = s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            return (
              <article key={s.name} id={id} className={s.featured ? 'svc featured-svc reveal' : 'svc reveal'} data-spotlight>
                <div className="svc-head">
                  {s.featured && <p className="mono svc-badge">Most asked</p>}
                  <h2>{s.name}</h2>
                  <p className="svc-short">{s.featured ? s.promise : s.text}</p>
                  {d.bestFor && (
                    <p className="svc-best">
                      <strong>Best for:</strong> {d.bestFor}
                    </p>
                  )}
                  <div className="svc-price">
                    <span className="small">from </span>
                    <strong>{s.inr}</strong> / {s.usd}
                    {s.time && <span className="svc-time"> · {s.time}</span>}
                  </div>
                  <a
                    href={waLink(`Hi Juned, I'm interested in your "${s.name}" package. Can we talk?`)}
                    {...ext}
                    className={s.featured ? 'btn btn-accent' : 'btn btn-dark'}
                    data-magnetic
                  >
                    Ask about this →
                  </a>
                </div>
                <div className="svc-body">
                  <p className="mono svc-k">What you get</p>
                  <ul className="arrow-list">
                    {d.included.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  {d.notIncluded.length > 0 && (
                    <>
                      <p className="mono svc-k">Not included</p>
                      <ul className="dash-list">
                        {d.notIncluded.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <AiBuilders />

      <section className="section">
        <div className="wrap">
          <h2 className="h2 reveal words" style={{ marginBottom: 40 }}>
            <SplitWords parts={[{ t: 'How every project ' }, { t: 'works', em: true }]} />
          </h2>
          <ol className="steps">
            {processSteps.map((s) => (
              <li key={s.title} className="reveal">
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="note reveal">
            Not sure which package fits? Try the{' '}
            <Link href="/tools/mvp-cost-calculator" className="link-line">
              MVP cost calculator
            </Link>{' '}
            first.
          </p>
        </div>
      </section>

      <section className="contact">
        <div className="contact-card reveal" data-spotlight>
          <p className="mono">Free 20-minute call</p>
          <h2 className="words">
            <SplitWords parts={[{ t: 'Not sure where ' }, { t: 'to start?', em: true }]} />
          </h2>
          <p>Tell me your idea. I&apos;ll tell you honestly what it takes and what it costs.</p>
          <div className="contact-actions">
            <a href={links.booking} {...ext} className="btn btn-accent" data-magnetic>
              Book a free 20-min call
            </a>
            <a href={links.email} className="btn btn-ghost-dark">
              Email me
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
