'use client';

import { useEffect } from 'react';

// ─────────────────────────────────────────────────────────────
// Opening animation: "Idea → Built → Live." then "Juned Kazi."
// The overlay is in the page HTML from the start (see layout.js),
// but it only shows when the small script in <head> adds the
// "intro-on" class: first visit of the session, on the home page,
// and only if the visitor hasn't turned off motion.
// Any click, tap, scroll or key press skips it.
// ─────────────────────────────────────────────────────────────

const KEY = 'intro-seen';

export default function Intro() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('intro-on')) return;

    try {
      sessionStorage.setItem(KEY, '1');
    } catch {}

    const el = document.getElementById('intro');
    if (!el) {
      root.classList.remove('intro-on');
      return;
    }

    const $ = (id) => document.getElementById(id);
    const timers = [];
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      timers.forEach(clearTimeout);
      el.classList.add('intro-out');
      // Let the hero start its own entrance as the curtain lifts
      root.classList.remove('intro-on');
      setTimeout(() => el.remove(), 900);
      off();
    };

    const skip = () => finish();
    const events = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
    const off = () => events.forEach((e) => window.removeEventListener(e, skip));
    events.forEach((e) => window.addEventListener(e, skip, { passive: true }));

    // The timeline
    at(150, () => {
      $('intro-w1').classList.add('in');
      $('intro-s1').classList.add('on');
      $('intro-track').classList.add('go');
    });
    at(520, () => {
      $('intro-w1').classList.replace('in', 'gone');
      $('intro-w2').classList.add('in');
      $('intro-s2').classList.add('on');
    });
    at(890, () => {
      $('intro-w2').classList.replace('in', 'gone');
      $('intro-w3').classList.add('in');
      $('intro-s3').classList.add('on');
    });
    at(1300, () => $('intro-stack').classList.add('away'));
    at(1450, () => $('intro-name').classList.add('in'));
    at(2450, finish);

    return () => {
      timers.forEach(clearTimeout);
      off();
    };
  }, []);

  return null;
}

// The overlay markup. Rendered on the server so it covers the page
// from the very first paint (no flash of the site underneath).
const LETTERS = ['J', 'u', 'n', 'e', 'd', ' ', 'K', 'a', 'z', 'i'];

export function IntroOverlay({ name = 'Juned Kazi', tagline = 'SaaS developer for founders' }) {
  return (
    <div id="intro" className="intro" aria-hidden="true">
      <div className="intro-stack" id="intro-stack">
        <div className="intro-words">
          <div className="intro-w" id="intro-w1">
            Idea
          </div>
          <div className="intro-w" id="intro-w2">
            Built
          </div>
          <div className="intro-w intro-live" id="intro-w3">
            Live.
          </div>
        </div>
        <div className="intro-track" id="intro-track">
          <span />
        </div>
        <div className="intro-steps">
          <span id="intro-s1">Idea</span>
          <span id="intro-s2">Built</span>
          <span id="intro-s3">Live</span>
        </div>
      </div>

      <div className="intro-name" id="intro-name">
        <p className="intro-big">
          {(name === 'Juned Kazi' ? LETTERS : name.split('')).map((ch, i) =>
            ch === ' ' ? (
              <span key={i} className="intro-sp" />
            ) : (
              <span key={i} style={{ '--d': `${i * 35}ms` }}>
                {ch}
              </span>
            )
          )}
          <span className="intro-dot">.</span>
        </p>
        <p className="intro-sub">{tagline}</p>
      </div>
    </div>
  );
}
