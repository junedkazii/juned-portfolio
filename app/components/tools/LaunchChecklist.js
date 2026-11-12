'use client';

import { useEffect, useState } from 'react';
import { waLink } from '../../content';

// ───── The checklist. Edit, add or remove items any time. ─────
const GROUPS = [
  {
    name: 'Domain and hosting',
    items: [
      { id: 'domain', text: 'Your custom domain is connected', why: 'yourapp.com, not yourapp.vercel.app' },
      { id: 'https', text: 'HTTPS works (lock icon in the browser)' },
      { id: 'www', text: 'www and non-www both open the same site' },
      { id: 'env', text: 'Secret keys are set on the host, not in the code' },
    ],
  },
  {
    name: 'Emails',
    items: [
      { id: 'mailfrom', text: 'Emails come from your own domain', why: 'hello@yourapp.com' },
      { id: 'dns', text: 'SPF, DKIM and DMARC records are added', why: 'Without these, emails land in spam' },
      { id: 'mailtest', text: 'Sign-up, password reset and receipt emails are tested' },
      { id: 'spam', text: 'Test emails land in the inbox, not spam' },
    ],
  },
  {
    name: 'Payments',
    items: [
      { id: 'live', text: 'Live keys are on, not test keys' },
      { id: 'webhook', text: 'Payments are confirmed on the server with webhooks', why: 'Never trust the browser alone' },
      { id: 'fail', text: 'Failed and cancelled payments are handled' },
      { id: 'refund', text: 'You have tested a real refund' },
    ],
  },
  {
    name: 'Security',
    items: [
      { id: 'rules', text: 'Database rules stop users reading each other’s data', why: 'Firestore rules or Supabase RLS' },
      { id: 'keys', text: 'No API keys are visible in the browser code' },
      { id: 'admin', text: 'Admin pages are protected' },
      { id: 'limits', text: 'AI and API calls have usage limits' },
    ],
  },
  {
    name: 'Product',
    items: [
      { id: 'login', text: 'Sign-up and login work, including Google' },
      { id: 'reset', text: 'Password reset works' },
      { id: 'mobile', text: 'Every main page works on a phone' },
      { id: 'errors', text: 'Friendly error and 404 pages' },
    ],
  },
  {
    name: 'Growth and trust',
    items: [
      { id: 'analytics', text: 'Analytics is installed' },
      { id: 'seo', text: 'Page titles, descriptions and a share image are set' },
      { id: 'legal', text: 'Privacy policy and terms pages exist' },
      { id: 'support', text: 'Users can easily contact you' },
    ],
  },
];

const ALL = GROUPS.flatMap((g) => g.items);
const KEY = 'launch-checklist-v1';

export default function LaunchChecklist() {
  const [done, setDone] = useState([]);

  // Remember ticks in this browser only
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '[]');
      if (Array.isArray(saved)) setDone(saved.filter((id) => ALL.some((i) => i.id === id)));
    } catch {}
  }, []);

  const update = (next) => {
    setDone(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };

  const toggle = (id) => update(done.includes(id) ? done.filter((x) => x !== id) : [...done, id]);

  const score = Math.round((done.length / ALL.length) * 100);
  const missing = ALL.filter((i) => !done.includes(i.id));
  const verdict =
    score === 100
      ? { title: 'Launch-ready', text: 'Everything is ticked. Ship it.' }
      : score >= 75
        ? { title: 'Almost there', text: 'A few gaps left. Fix them before real users arrive.' }
        : score >= 40
          ? { title: 'Getting close', text: 'Good progress, but some important pieces are missing.' }
          : { title: 'Not ready yet', text: 'Launching now risks lost payments, spam emails or security holes.' };

  const message = [
    `Hi Juned, I used your launch checklist. My score is ${score}%.`,
    missing.length ? `Still missing: ${missing.slice(0, 8).map((m) => m.text).join('; ')}${missing.length > 8 ? '…' : ''}.` : '',
    'Can you help me get launch-ready?',
  ]
    .filter(Boolean)
    .join('\n');

  return (
    <div className="tool">
      <div className="tool-main">
        {GROUPS.map((g) => {
          const count = g.items.filter((i) => done.includes(i.id)).length;
          return (
            <fieldset key={g.name} className="tool-block check-group reveal">
              <legend className="check-legend">
                <span className="mono tool-k">{g.name}</span>
                <span className="mono check-count">
                  {count}/{g.items.length}
                </span>
              </legend>
              <ul className="check-list">
                {g.items.map((i) => (
                  <li key={i.id}>
                    <label className={done.includes(i.id) ? 'check is-on' : 'check'}>
                      <input type="checkbox" checked={done.includes(i.id)} onChange={() => toggle(i.id)} />
                      <span className="check-box" aria-hidden="true">
                        ✓
                      </span>
                      <span className="check-text">
                        {i.text}
                        {i.why && <small>{i.why}</small>}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
          );
        })}
      </div>

      <aside className="tool-result reveal" aria-live="polite">
        <p className="mono">Launch score</p>
        <div className="score-ring" style={{ '--score': score }}>
          <span>{score}%</span>
        </div>
        <p className="result-verdict">{verdict.title}</p>
        <p className="result-sub">{verdict.text}</p>
        <p className="result-sub">
          {done.length} of {ALL.length} checks done
        </p>
        <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-accent result-cta" data-magnetic>
          {score === 100 ? 'Tell me about your launch →' : 'Get help with the missing items →'}
        </a>
        <button type="button" className="text-btn" onClick={() => update([])}>
          Reset checklist
        </button>
        <p className="result-note">Your ticks are saved in this browser only. Nothing is sent anywhere.</p>
      </aside>
    </div>
  );
}
