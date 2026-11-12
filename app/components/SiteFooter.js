import Link from 'next/link';
import { site, links } from '../data';

const ext = { target: '_blank', rel: 'noopener noreferrer' };

// The footer, shared by every page.
export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <Link href="/" className="logo">
            {site.name}
            <span>.</span>
          </Link>
          <p className="footer-note">{site.title}. Based in India, working worldwide.</p>
        </div>
        <nav aria-label="Pages" className="footer-links">
          <Link href="/#work">Work</Link>
          <Link href="/work/dueblink">DueBlink case study</Link>
          <Link href="/work/offboardpro">OffboardPro case study</Link>
          <Link href="/services">Services</Link>
          <Link href="/tools">Free tools</Link>
        </nav>
        <nav aria-label="Contact" className="footer-links">
          <a href={links.booking} {...ext}>
            WhatsApp
          </a>
          <a href={links.email}>Email</a>
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
        </nav>
      </div>
      <div className="wrap footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>Designed and built by me, with Next.js</span>
      </div>
    </footer>
  );
}
