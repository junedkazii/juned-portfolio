import Link from 'next/link';
import Clock from './Clock';
import ThemeToggle from './ThemeToggle';
import { site, links } from '../data';

// The floating navbar, shared by every page.
export default function SiteHeader() {
  return (
    <>
      <div className="progress" aria-hidden="true" />
      <header className="header">
        <nav className="nav" aria-label="Main">
          <Link href="/" className="logo">
            {site.name}
            <span>.</span>
          </Link>
          <div className="nav-right">
            <Clock />
            <div className="nav-links">
              <Link href="/#work">Work</Link>
              <Link href="/services">Services</Link>
              <Link href="/tools">Free tools</Link>
              <Link href="/#contact">Contact</Link>
            </div>
            <ThemeToggle />
            <a href={links.booking} target="_blank" rel="noopener noreferrer" className="btn btn-dark" data-magnetic>
              Book a call
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
