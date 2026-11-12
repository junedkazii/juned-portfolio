'use client';

import { useMemo, useState } from 'react';
import { waLink } from '../../content';

// ───── Prices used by the calculator. Change these numbers any time. ─────
const BASE = {
  inr: 75000,
  usd: 2500,
  weeks: 4,
  includes: ['Landing page', 'Sign-up and login', 'Dashboard', 'Database', 'Deployed live'],
};

const FEATURES = [
  { id: 'payments', name: 'Payments and subscriptions', note: 'Razorpay, Stripe or Dodo', inr: 15000, usd: 500, weeks: 1 },
  { id: 'ai', name: 'AI feature', note: 'Chatbot, writer or assistant', inr: 25000, usd: 800, weeks: 1 },
  { id: 'admin', name: 'Admin panel', note: 'Manage users and data', inr: 15000, usd: 500, weeks: 1 },
  { id: 'teams', name: 'Teams and roles', note: 'Invite members, permissions', inr: 20000, usd: 650, weeks: 1 },
  { id: 'emails', name: 'Email automation', note: 'Welcome, reminders, receipts', inr: 10000, usd: 300, weeks: 0.5 },
  { id: 'booking', name: 'Booking and calendar', note: 'Slots, confirmations', inr: 15000, usd: 500, weeks: 1 },
  { id: 'marketplace', name: 'Marketplace', note: 'Buyers and sellers, listings, orders', inr: 50000, usd: 1600, weeks: 2 },
  { id: 'uploads', name: 'File uploads', note: 'Images, PDFs, documents', inr: 8000, usd: 250, weeks: 0.5 },
  { id: 'languages', name: 'Multiple languages', note: 'Hindi, English and more', inr: 10000, usd: 300, weeks: 0.5 },
  { id: 'pwa', name: 'Installable phone app', note: 'Works like an app (PWA)', inr: 10000, usd: 300, weeks: 0.5 },
  { id: 'charts', name: 'Analytics and charts', note: 'Reports inside your app', inr: 12000, usd: 400, weeks: 0.5 },
  { id: 'integrations', name: 'Integrations', note: 'Slack, Zapier, Google Sheets…', inr: 10000, usd: 300, weeks: 0.5 },
];

const DESIGN = [
  { id: 'clean', name: 'Clean and simple', note: 'Professional, ready-made style', factor: 1 },
  { id: 'custom', name: 'Custom premium design', note: 'Unique look, made for your brand', factor: 1.2 },
];

const SPEED = [
  { id: 'normal', name: 'Normal pace', note: 'Recommended', factor: 1, time: 1 },
  { id: 'rush', name: 'Rush', note: 'About 25% faster', factor: 1.25, time: 0.75 },
];

const round = (n, step) => Math.round(n / step) * step;

export default function MvpCalculator() {
  const [picked, setPicked] = useState(['payments']);
  const [design, setDesign] = useState('clean');
  const [speed, setSpeed] = useState('normal');
  const [cur, setCur] = useState('inr');

  const result = useMemo(() => {
    const chosen = FEATURES.filter((f) => picked.includes(f.id));
    const d = DESIGN.find((x) => x.id === design);
    const s = SPEED.find((x) => x.id === speed);
    const sum = (key) => BASE[key] + chosen.reduce((t, f) => t + f[key], 0);
    const low = sum(cur) * d.factor * s.factor;
    const weeks = Math.max(3, Math.round(sum('weeks') * s.time));
    return {
      chosen,
      low: round(low, cur === 'inr' ? 1000 : 50),
      high: round(low * 1.3, cur === 'inr' ? 1000 : 50),
      weeksLow: weeks,
      weeksHigh: weeks + 2,
      design: d,
      speed: s,
    };
  }, [picked, design, speed, cur]);

  const money = (n) =>
    cur === 'inr' ? `₹${n.toLocaleString('en-IN')}` : `$${n.toLocaleString('en-US')}`;

  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const message = [
    'Hi Juned, I used your MVP cost calculator.',
    `Features: ${['Basics', ...result.chosen.map((f) => f.name)].join(', ')}.`,
    `Design: ${result.design.name}. Pace: ${result.speed.name}.`,
    `Estimate: ${money(result.low)}–${money(result.high)}, ${result.weeksLow}–${result.weeksHigh} weeks.`,
    "Can we talk about my idea?",
  ].join('\n');

  return (
    <div className="tool">
      <div className="tool-main">
        <fieldset className="tool-block reveal">
          <legend className="mono tool-k">Always included</legend>
          <div className="pill-row">
            {BASE.includes.map((x) => (
              <span key={x} className="chip-static is-on">
                ✓ {x}
              </span>
            ))}
          </div>
        </fieldset>

        <fieldset className="tool-block reveal">
          <legend className="mono tool-k">Add features</legend>
          <div className="opt-grid">
            {FEATURES.map((f) => {
              const on = picked.includes(f.id);
              return (
                <button
                  key={f.id}
                  type="button"
                  className={on ? 'opt is-on' : 'opt'}
                  aria-pressed={on}
                  onClick={() => toggle(f.id)}
                >
                  <span className="opt-check" aria-hidden="true">
                    {on ? '✓' : '+'}
                  </span>
                  <span className="opt-text">
                    <span className="opt-name">{f.name}</span>
                    <span className="opt-note">{f.note}</span>
                  </span>
                  <span className="opt-price">+{money(f[cur])}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="tool-two reveal">
          <fieldset className="tool-block">
            <legend className="mono tool-k">Design</legend>
            <div className="seg">
              {DESIGN.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  className={design === d.id ? 'seg-btn is-on' : 'seg-btn'}
                  aria-pressed={design === d.id}
                  onClick={() => setDesign(d.id)}
                >
                  <span>{d.name}</span>
                  <small>{d.note}</small>
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="tool-block">
            <legend className="mono tool-k">Pace</legend>
            <div className="seg">
              {SPEED.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={speed === s.id ? 'seg-btn is-on' : 'seg-btn'}
                  aria-pressed={speed === s.id}
                  onClick={() => setSpeed(s.id)}
                >
                  <span>{s.name}</span>
                  <small>{s.note}</small>
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      <aside className="tool-result reveal" aria-live="polite">
        <div className="result-top">
          <p className="mono">Your estimate</p>
          <div className="cur-switch" role="group" aria-label="Currency">
            <button type="button" className={cur === 'inr' ? 'is-on' : ''} aria-pressed={cur === 'inr'} onClick={() => setCur('inr')}>
              ₹ INR
            </button>
            <button type="button" className={cur === 'usd' ? 'is-on' : ''} aria-pressed={cur === 'usd'} onClick={() => setCur('usd')}>
              $ USD
            </button>
          </div>
        </div>
        <p className="result-big">
          {money(result.low)}
          <span> to {money(result.high)}</span>
        </p>
        <p className="result-time">
          {result.weeksLow}–{result.weeksHigh} weeks
        </p>
        <ul className="result-lines">
          <li>
            <span>MVP basics</span>
            <span>{money(BASE[cur])}</span>
          </li>
          {result.chosen.map((f) => (
            <li key={f.id}>
              <span>{f.name}</span>
              <span>+{money(f[cur])}</span>
            </li>
          ))}
          {result.design.factor > 1 && (
            <li>
              <span>Custom design</span>
              <span>+20%</span>
            </li>
          )}
          {result.speed.factor > 1 && (
            <li>
              <span>Rush pace</span>
              <span>+25%</span>
            </li>
          )}
        </ul>
        <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-accent result-cta" data-magnetic>
          Send this estimate on WhatsApp →
        </a>
        <p className="result-note">
          A starting estimate, not a quote. On a free call I&apos;ll give you a fixed price and a written scope.
        </p>
      </aside>
    </div>
  );
}
