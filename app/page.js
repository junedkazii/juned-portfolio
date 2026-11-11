import Image from 'next/image';
import IdeaBox from './components/IdeaBox';
import Reveal from './components/Reveal';
import ProjectShots from './components/ProjectShots';
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

const ext = { target: '_blank', rel: 'noopener noreferrer' };

export default function Home() {
  return (
    <>
      <header className="header">
        <nav className="nav" aria-label="Main">
          <a href="#top" className="logo">
            {site.name}
            <span>.</span>
          </a>
          <div className="nav-right">
            <div className="nav-links">
              <a href="#work">Work</a>
              <a href="#services">Services</a>
              <a href="#process">Process</a>
              <a href="#idea">Free plan</a>
            </div>
            <a href={links.booking} {...ext} className="btn btn-dark">
              Book a call
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* 1. Hero */}
        <section id="top" className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow mono rise">
                <span className="dot-live" aria-hidden="true" />
                {site.title}
              </p>
              <h1 className="rise">
                I build SaaS apps that <em>go live</em> and take payments.
              </h1>
              <p className="hero-sub rise">
                Hi, I&apos;m Juned. I turn your idea into a working web app with login, dashboard, AI and
                payments, from first call to launch.
              </p>
              <div className="hero-actions rise">
                <a href={links.booking} {...ext} className="btn btn-dark">
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
                    {s.value}
                    {s.accent && <em>{s.accent}</em>}
                  </div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="stack mono reveal">Built with · {stack.join(' · ')}</p>
          </div>
        </section>

        {/* 3. Selected work */}
        <section id="work" className="section">
          <div className="wrap">
            <div className="section-head reveal">
              <h2 className="h2">
                Selected <em>work</em>
              </h2>
              <p>Not mockups. Both products are live, so open them and click around.</p>
            </div>

            {projects.map((p, i) => (
              <article key={p.name} className={i % 2 === 1 ? 'project alt reveal' : 'project reveal'}>
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
                    {p.caseStudy && (
                      <a href={p.caseStudy} {...ext} className="link-line">
                        Read the case study
                      </a>
                    )}
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
            <h2 className="h2 why-title reveal">
              You get a founder, <em>not just a coder</em>
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
              <h2 className="h2">
                What I can <em>build for you</em>
              </h2>
              <p>Fixed packages, fixed prices. Pick one, or book a call and we&apos;ll shape it together.</p>
            </div>
            <div className="services">
              <div className="featured reveal">
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
                <a href={links.booking} {...ext} className="btn btn-accent">
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
            <div className="rescue reveal">
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
          </div>
        </section>

        {/* 6. Process */}
        <section id="process" className="section">
          <div className="wrap">
            <h2 className="h2 reveal" style={{ marginBottom: 40 }}>
              From first call <em>to launch</em>
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

        {/* 7. Free plan (idea box) */}
        <IdeaBox bookingUrl={links.booking} />

        {/* 8. Ship log */}
        <section id="log" className="section">
          <div className="wrap split">
            <div className="split-intro reveal">
              <h2 className="h2">
                Ship <em>log</em>
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
            <h2 className="h2 reveal">
              Questions <em>founders ask</em>
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
          <div className="contact-card reveal">
            <p className="mono">Open slots · {status.slots}</p>
            <h2>
              Got an idea? <em>Let&apos;s ship it.</em>
            </h2>
            <p>Tell me what you&apos;re building. I reply {status.replies}.</p>
            <div className="contact-actions">
              <a href={links.booking} {...ext} className="btn btn-accent">
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
      <Reveal />

      <footer className="footer">
        <div className="wrap">
          <span>
            © {new Date().getFullYear()} {site.name} · {site.title}
          </span>
          <nav aria-label="Social">
            {links.linkedin && (
              <a href={links.linkedin} {...ext}>
                LinkedIn
              </a>
            )}
            {links.x && (
              <a href={links.x} {...ext}>
                X
              </a>
            )}
            {links.github && (
              <a href={links.github} {...ext}>
                GitHub
              </a>
            )}
            <a href={links.email}>Email</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
