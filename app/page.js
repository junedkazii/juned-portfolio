import Image from 'next/image';
import Link from 'next/link';
import IdeaBox from './components/IdeaBox';
import ProjectShots from './components/ProjectShots';
import SplitWords from './components/SplitWords';
import {
  site,
  links,
  status,
  stats,
  stack,
  projects,
  reasons,
  featuredService,
  services,
  rescue,
  processSteps,
  shipLog,
  faqs,
} from './data';
import { tools } from './content';

const ext = { target: '_blank', rel: 'noopener noreferrer' };

export default function Home() {
  return (
    <>
      <main>
        {/* 1. Hero */}
        <section id="top" className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow mono rise">
                <span className="dot-live" aria-hidden="true" />
                <span data-scramble>{site.title}</span>
              </p>
              <h1 className="words words-now">
                <SplitWords
                  parts={[
                    { t: 'I build SaaS apps that ' },
                    { t: 'go live', em: true, underline: true },
                    { t: ' and take payments.' },
                  ]}
                />
              </h1>
              <p className="hero-sub rise">
                Hi, I&apos;m Juned. I turn your idea into a working web app with login, dashboard, AI and
                payments, from first call to launch.
              </p>
              <div className="hero-actions rise">
                <a href={links.booking} {...ext} className="btn btn-dark" data-magnetic>
                  Book a free 20-min call →
                </a>
                <a href="#work" className="link-line">
                  See my work
                </a>
              </div>
            </div>

            <div className="hero-visual rise">
              {site.photo ? (
                <Image
                  src={site.photo}
                  alt={`Photo of ${site.name}`}
                  width={880}
                  height={968}
                  className="photo"
                  priority
                />
              ) : (
                <div className="photo placeholder">Your photo goes here</div>
              )}
              <div className="status">
                <div className="status-top mono">
                  <span>Right now</span>
                  <span className="status-available">Available</span>
                </div>
                <dl>
                  <dt>Shipping</dt>
                  <dd>{status.shipping}</dd>
                  <dt>Open slots</dt>
                  <dd>{status.slots}</dd>
                  <dt>Replies</dt>
                  <dd>{status.replies}</dd>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Proof numbers */}
        <section className="section" aria-label="Proof">
          <div className="wrap">
            <div className="stats reveal">
              {stats.map((s) => (
                <div className="stat" key={s.label}>
                  <div className="stat-value">
                    <span data-count={s.value}>{s.value}</span>
                    {s.accent && <em>{s.accent}</em>}
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="stack-row reveal">
              <p className="mono stack-label">Built with</p>
              <div className="marquee">
                <p className="sr-only">{stack.join(', ')}</p>
                <div className="marquee-track" aria-hidden="true">
                  {[0, 1].map((half) => (
                    <div className={half ? 'marquee-half dup' : 'marquee-half'} key={half}>
                      {[...stack, ...stack].map((item, i) => (
                        <span key={`${half}-${i}`}>{item}</span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Selected work */}
        <section id="work" className="section">
          <div className="wrap">
            <div className="section-head reveal">
              <h2 className="h2 words">
                <SplitWords parts={[{ t: 'Selected ' }, { t: 'work', em: true }]} />
              </h2>
              <p>Not mockups. Both products are live, so open them and click around.</p>
            </div>

            {projects.map((p, i) => (
              <article
                key={p.name}
                className={i % 2 === 1 ? 'project alt reveal' : 'project reveal'}
                data-spotlight
                data-tilt
              >
                <div>
                  <p className="project-meta mono">
                    {p.number} · Live SaaS · <span className="live">● Live</span>
                  </p>
                  <h3>{p.name}</h3>
                  <p className="project-line">{p.line}</p>
                  <p className="proves">What it proves I can build</p>
                  <ul className="arrow-list">
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <div className="project-actions">
                    <a href={p.url} {...ext} className="btn btn-dark">
                      Open live ↗
                    </a>
                    <Link href={`/work/${p.name.toLowerCase()}`} className="link-line">
                      Read the case study
                    </Link>
                  </div>
                </div>
                <ProjectShots name={p.name} domain={p.domain} images={p.images} />
              </article>
            ))}
          </div>
        </section>

        {/* 4. Why me */}
        <section className="section">
          <div className="wrap">
            <h2 className="h2 why-title reveal words">
              <SplitWords parts={[{ t: 'You get a founder, ' }, { t: 'not just a coder', em: true }]} />
            </h2>
            <div className="reasons">
              {reasons.map((r, i) => (
                <div className="reason reveal" key={r.title}>
                  <p className="reason-num" aria-hidden="true">
                    {['i.', 'ii.', 'iii.'][i]}
                  </p>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </div>
              ))}
            </div>
            <p className="note reveal">I use AI tools to build faster, and I design, test and ship every part myself.</p>
          </div>
        </section>

        {/* 5. Services */}
        <section id="services" className="section">
          <div className="wrap">
            <div className="section-head reveal">
              <h2 className="h2 words">
                <SplitWords parts={[{ t: 'What I can ' }, { t: 'build for you', em: true }]} />
              </h2>
              <p>Fixed packages, fixed prices. Pick one, or book a call and we&apos;ll shape it together.</p>
            </div>
            <div className="services">
              <div className="featured reveal" data-spotlight>
                <p className="mono">Most asked</p>
                <h3>{featuredService.name}</h3>
                <p className="featured-promise">{featuredService.promise}</p>
                <p className="featured-text">{featuredService.text}</p>
                <div className="featured-price">
                  <span>
                    from <strong>{featuredService.inr}</strong> / {featuredService.usd}
                  </span>
                  <span>{featuredService.time}</span>
                </div>
                <a href={links.booking} {...ext} className="btn btn-accent" data-magnetic>
                  Ask about an MVP →
                </a>
              </div>
              <div className="menu reveal">
                {services.map((s) => (
                  <div className="menu-row" key={s.name}>
                    <div>
                      <h3>{s.name}</h3>
                      <p>{s.text}</p>
                    </div>
                    <div className="price">
                      <span className="small">from </span>
                      <strong>{s.inr}</strong> / {s.usd}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rescue reveal" data-spotlight>
              <div className="rescue-copy">
                <p className="mono">{rescue.label}</p>
                <h3>{rescue.title}</h3>
                <p>{rescue.text}</p>
              </div>
              <div className="rescue-side">
                <ul className="arrow-list">
                  {rescue.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <a href={links.booking} {...ext} className="btn btn-dark">
                  {rescue.cta}
                </a>
              </div>
            </div>
            <p className="more-link reveal">
              <Link href="/services" className="link-line">
                See every package in detail →
              </Link>
            </p>
          </div>
        </section>

        {/* 6. Process */}
        <section id="process" className="section">
          <div className="wrap">
            <h2 className="h2 reveal words" style={{ marginBottom: 40 }}>
              <SplitWords parts={[{ t: 'From first call ' }, { t: 'to launch', em: true }]} />
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
          </div>
        </section>

        {/* 6b. Free tools */}
        <section id="tools" className="section">
          <div className="wrap">
            <div className="section-head reveal">
              <h2 className="h2 words">
                <SplitWords parts={[{ t: 'Free tools ' }, { t: 'for founders', em: true }]} />
              </h2>
              <p>Small, useful tools I built. Use them free, no sign-up.</p>
            </div>
            <div className="tool-grid">
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

        {/* 7. Free plan (idea box) */}
        <IdeaBox bookingUrl={links.booking} />

        {/* 8. Ship log */}
        <section id="log" className="section">
          <div className="wrap split">
            <div className="split-intro reveal">
              <h2 className="h2 words">
                <SplitWords parts={[{ t: 'Ship ' }, { t: 'log', em: true }]} />
              </h2>
              <p>No skills list. Just what I actually shipped, newest first.</p>
            </div>
            <ol className="log">
              {shipLog.map((l) => (
                <li key={l.title} className="reveal">
                  <time>{l.date}</time>
                  <div>
                    <strong>{l.title}</strong>
                    <p>{l.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 9. FAQ */}
        <section id="faq" className="section">
          <div className="wrap split">
            <h2 className="h2 reveal words">
              <SplitWords parts={[{ t: 'Questions ' }, { t: 'founders ask', em: true }]} />
            </h2>
            <div className="faq reveal">
              {faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* 10. Contact */}
        <section id="contact" className="contact">
          <div className="contact-card reveal" data-spotlight>
            <p className="mono">Open slots · {status.slots}</p>
            <h2 className="words">
              <SplitWords parts={[{ t: 'Got an idea? ' }, { t: "Let's ship it.", em: true }]} />
            </h2>
            <p>Tell me what you&apos;re building. I reply {status.replies}.</p>
            <div className="contact-actions">
              <a href={links.booking} {...ext} className="btn btn-accent" data-magnetic>
                Book a free 20-min call
              </a>
              <a href={links.email} className="btn btn-ghost-dark">
                Email me
              </a>
              {links.whatsapp !== links.booking && (
                <a href={links.whatsapp} {...ext} className="btn btn-ghost-dark">
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
