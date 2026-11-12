'use client';

import { useEffect, useState } from 'react';

// Small floating buttons: jump to the top or the bottom of the page.
export default function ScrollButtons() {
  const [pos, setPos] = useState({ top: true, bottom: false });

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setPos({ top: y < 400, bottom: y > max - 400 });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const go = (where) => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: where === 'top' ? 0 : document.documentElement.scrollHeight,
      behavior: calm ? 'auto' : 'smooth',
    });
  };

  return (
    <div className="scroll-btns">
      <button
        type="button"
        className={pos.top ? 'scroll-btn is-hidden' : 'scroll-btn'}
        onClick={() => go('top')}
        aria-label="Scroll to top"
        tabIndex={pos.top ? -1 : 0}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
      <button
        type="button"
        className={pos.bottom ? 'scroll-btn is-hidden' : 'scroll-btn'}
        onClick={() => go('bottom')}
        aria-label="Scroll to bottom"
        tabIndex={pos.bottom ? -1 : 0}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </button>
    </div>
  );
}
