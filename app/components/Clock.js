'use client';

import { useEffect, useState } from 'react';

// Small live clock in the navbar, so visitors abroad see your local time.
export default function Clock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    });
    const tick = () => setTime(format.format(new Date()).toUpperCase());
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="nav-clock mono" title="My local time in India">
      <span className="dot-live" aria-hidden="true" />
      India · <span className="nav-clock-time">{time || '--:--'}</span>
    </span>
  );
}
