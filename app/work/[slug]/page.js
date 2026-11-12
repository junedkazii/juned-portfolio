import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProjectShots from '../../components/ProjectShots';
import SplitWords from '../../components/SplitWords';
import { caseStudies } from '../../content';
import { links } from '../../data';

const ext = { target: '_blank', rel: 'noopener noreferrer' };

// Builds one page per case study: /work/dueblink and /work/offboardpro
export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cs = caseStudies[slug];
  if (!cs) return {};
  return {
    title: `${cs.name} case study`,
    description: cs.tagline,
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const cs = caseStudies[slug];
  if (!cs) notFound();

  const slugs = Object.keys(caseStudies);
  const nextSlug = slugs[(slugs.indexOf(slug) + 1) % slugs.length];
  const next = caseStudies[nextSlug];

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <p className="crumb mono rise">
            <Link href="/#work">Work</Link> <span aria-hidden="true">/</span> Case study
          </p>
          <h1 className="page-title words words-now">
            <SplitWords parts={[{ t: cs.name, em: false }]} />
          </h1>
          <p className="page-lead rise">{cs.tagline}</p>
          <div className="cs-meta rise">
            <a href={cs.url} {...ext} className="btn btn-dark" data-magnetic>
              Open {cs.domain} ↗
            </a>
            <span className="mono cs-role">
              <span className="dot-live" aria-hidden="true" /> Live · {cs.role}
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="cs-shot reveal" data-tilt data-spotlight>
            <ProjectShots name={cs.name} domain={cs.domain} images={cs.images} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap cs-grid">
          <div className="cs-side reveal">
            <p className="mono cs-k">The problem</p>
          </div>
          <p className="cs-big reveal">{cs.problem}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap cs-grid">
          <div className="cs-side reveal">
            <p className="mono cs-k">What I built</p>
          </div>
          <ul className="cs-list">
            {cs.built.map((item) => (
              <li key={item} className="reveal">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 className="h2 words reveal" style={{ marginBottom: 36 }}>
            <SplitWords parts={[{ t: 'The hard ' }, { t: 'parts', em: true }]} />
          </h2>
          <div className="cs-hard">
            {cs.hard.map((h, i) => (
              <div key={h.title} className="cs-hard-item reveal" data-spotlight>
                <span className="cs-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap cs-grid">
          <div className="cs-side reveal">
            <p className="mono cs-k">Built with</p>
          </div>
          <div className="cs-stack reveal">
            {cs.stack.map((t) => (
              <span key={t} className="chip-static">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap cs-grid">
          <div className="cs-side reveal">
            <p className="mono cs-k">Where it is now</p>
          </div>
          <p className="cs-big reveal">{cs.outcome}</p>
        </div>
      </section>

      <section className="contact">
        <div className="contact-card reveal" data-spotlight>
          <p className="mono">Your product next?</p>
          <h2 className="words">
            <SplitWords parts={[{ t: 'Want something ' }, { t: 'like this?', em: true }]} />
          </h2>
          <p>Tell me what you&apos;re building. I reply within 24 hours.</p>
          <div className="contact-actions">
            <a href={links.booking} {...ext} className="btn btn-accent" data-magnetic>
              Book a free 20-min call
            </a>
            <Link href={`/work/${nextSlug}`} className="btn btn-ghost-dark">
              Next: {next.name} →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
