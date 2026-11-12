'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// The site's motion engine. One small script, no animation libraries.
//  1. Sections fade up as you scroll to them ("reveal")
//  2. The eyebrow text decodes itself on load ("scramble")
//  3. Numbers count up when they come into view ("data-count")
//  4. A thin progress bar tracks how far you've scrolled
//  5. The hero photo and status card move at different speeds (parallax)
//  6. Laptop only: magnetic buttons, a soft spotlight that follows the cursor, 3D tilt on screenshots
// Visitors who turn off motion on their device get everything instantly, with no movement.
export default function Reveal() {
  // Runs again on every page change, so new pages animate too.
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const cleanups = [];
    const on = (el, type, fn, opts) => {
      el.addEventListener(type, fn, opts);
      cleanups.push(() => el.removeEventListener(type, fn, opts));
    };

    // 1. Reveal on scroll
    const items = document.querySelectorAll('.reveal');
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('in'));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
      );
      items.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    if (reduce) return () => cleanups.forEach((fn) => fn());

    // 2. Scramble: text decodes from random characters into the real words
    const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_';
    document.querySelectorAll('[data-scramble]').forEach((el) => {
      const final = el.textContent;
      el.setAttribute('aria-label', final);
      const start = performance.now();
      const duration = 1100;
      let raf;
      const frame = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        let out = '';
        for (let i = 0; i < final.length; i++) {
          const ch = final[i];
          if (ch === ' ' || progress >= (i + 1) / final.length) out += ch;
          else out += glyphs[Math.floor(Math.random() * glyphs.length)];
        }
        el.textContent = out;
        if (progress < 1) raf = requestAnimationFrame(frame);
        else el.textContent = final;
      };
      raf = requestAnimationFrame(frame);
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        el.textContent = final;
      });
    });

    // 3. Count-up numbers
    const counters = [...document.querySelectorAll('[data-count]')];
    if (counters.length && 'IntersectionObserver' in window) {
      const easeOut = (t) => 1 - Math.pow(1 - t, 3);
      const countIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            countIo.unobserve(el);
            const target = parseInt(el.dataset.count, 10);
            if (Number.isNaN(target)) return;
            const start = performance.now();
            const duration = 1400;
            const frame = (now) => {
              const t = Math.min(1, (now - start) / duration);
              el.textContent = String(Math.round(target * easeOut(t)));
              if (t < 1) requestAnimationFrame(frame);
            };
            requestAnimationFrame(frame);
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach((el) => {
        if (!Number.isNaN(parseInt(el.dataset.count, 10))) el.textContent = '0';
        countIo.observe(el);
      });
      cleanups.push(() => {
        countIo.disconnect();
        counters.forEach((el) => (el.textContent = el.dataset.count));
      });
    }

    // 4 + 5. Scroll progress bar and hero parallax
    const bar = document.querySelector('.progress');
    const heroVisual = document.querySelector('.hero-visual');
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const y = window.scrollY;
        if (bar) bar.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : '0');
        if (heroVisual && y < window.innerHeight * 1.5) heroVisual.style.setProperty('--py', String(y));
        ticking = false;
      });
    };
    onScroll();
    on(window, 'scroll', onScroll, { passive: true });
    on(window, 'resize', onScroll, { passive: true });

    // 6. Pointer effects (laptops and desktops only)
    if (fine) {
      // Magnetic buttons pull gently toward the cursor
      document.querySelectorAll('[data-magnetic]').forEach((el) => {
        on(el, 'pointermove', (e) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - (r.left + r.width / 2)) * 0.22;
          const y = (e.clientY - (r.top + r.height / 2)) * 0.3;
          el.style.setProperty('--tx', `${x.toFixed(1)}px`);
          el.style.setProperty('--ty', `${y.toFixed(1)}px`);
        });
        on(el, 'pointerleave', () => {
          el.style.setProperty('--tx', '0px');
          el.style.setProperty('--ty', '0px');
        });
      });

      // Soft spotlight that follows the cursor across cards
      document.querySelectorAll('[data-spotlight]').forEach((el) => {
        on(el, 'pointermove', (e) => {
          const r = el.getBoundingClientRect();
          el.style.setProperty('--sx', `${Math.round(e.clientX - r.left)}px`);
          el.style.setProperty('--sy', `${Math.round(e.clientY - r.top)}px`);
        });
        on(el, 'pointerleave', () => {
          el.style.setProperty('--sx', '-999px');
          el.style.setProperty('--sy', '-999px');
        });
      });

      // 3D tilt: the screenshot leans toward the cursor
      document.querySelectorAll('[data-tilt]').forEach((card) => {
        const target = card.querySelector('.browser');
        if (!target) return;
        on(card, 'pointermove', (e) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          target.style.setProperty('--ry', `${(px * 7).toFixed(2)}deg`);
          target.style.setProperty('--rx', `${(-py * 5).toFixed(2)}deg`);
          target.style.setProperty('--ly', '-6px');
        });
        on(card, 'pointerleave', () => {
          target.style.setProperty('--ry', '0deg');
          target.style.setProperty('--rx', '0deg');
          target.style.setProperty('--ly', '0px');
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
