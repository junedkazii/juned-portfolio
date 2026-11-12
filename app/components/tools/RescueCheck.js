'use client';

import { useMemo, useState } from 'react';
import { waLink } from '../../content';

// ───── Questions and what each answer means. Edit any time. ─────
// level: 'high' | 'medium' | 'low' | null (null = fine)
const QUESTIONS = [
  {
    id: 'tool',
    q: 'What did you build it with?',
    options: [
      { label: 'Lovable', level: null },
      { label: 'Bolt', level: null },
      { label: 'Emergent', level: null },
      { label: 'Replit', level: null },
      { label: 'Something else', level: null },
    ],
  },
  {
    id: 'login',
    q: 'Can users sign up and log in reliably?',
    options: [
      { label: 'Yes, always', level: null },
      { label: 'Sometimes breaks', level: 'medium', issue: 'Login is unreliable', fix: 'Fix the auth flow, sessions and redirects so users never get stuck.' },
      { label: 'No', level: 'high', issue: 'Users can’t sign up or log in', fix: 'Rebuild sign-up and login properly, including Google sign-in.' },
    ],
  },
  {
    id: 'payments',
    q: 'How are payments?',
    options: [
      { label: 'Working with real money', level: null },
      { label: 'Only in test mode', level: 'medium', issue: 'Payments only work in test mode', fix: 'Switch to live keys and confirm every payment on the server with webhooks.' },
      { label: 'Broken', level: 'high', issue: 'Payments are broken', fix: 'Rebuild checkout and webhooks so paid users always get access.' },
      { label: 'Not added yet', level: 'medium', issue: 'No payments yet', fix: 'Add Razorpay, Stripe or Dodo with subscriptions verified on the server.' },
    ],
  },
  {
    id: 'rules',
    q: 'Are database security rules set up?',
    options: [
      { label: 'Yes, tested', level: null },
      { label: 'Not sure', level: 'high', issue: 'Database security is unknown', fix: 'Check and lock down Supabase RLS or Firestore rules so users can only see their own data.' },
      { label: 'No', level: 'high', issue: 'Database is open', fix: 'Add security rules right away: anyone may be able to read or change your data.' },
    ],
  },
  {
    id: 'keys',
    q: 'Where are your API keys (OpenAI, payments)?',
    options: [
      { label: 'Only on the server', level: null },
      { label: 'Not sure', level: 'high', issue: 'API keys may be exposed', fix: 'Move secret keys to the server and rotate any that were visible.' },
      { label: 'In the frontend code', level: 'high', issue: 'API keys are exposed in the browser', fix: 'Move keys to the server and replace them. Exposed keys can run up big bills.' },
    ],
  },
  {
    id: 'domain',
    q: 'Is it on your own domain?',
    options: [
      { label: 'Yes', level: null },
      { label: 'Not yet', level: 'low', issue: 'No custom domain', fix: 'Connect your domain with HTTPS so users trust it.' },
    ],
  },
  {
    id: 'emails',
    q: 'Do emails (sign-up, receipts) work?',
    options: [
      { label: 'Yes, in the inbox', level: null },
      { label: 'They go to spam', level: 'medium', issue: 'Emails land in spam', fix: 'Send from your domain and add SPF, DKIM and DMARC records.' },
      { label: 'Not set up', level: 'medium', issue: 'No emails yet', fix: 'Set up sign-up, password reset and receipt emails from your own domain.' },
    ],
  },
  {
    id: 'loops',
    q: 'Do new prompts break old features?',
    options: [
      { label: 'Rarely', level: null },
      { label: 'Often', level: 'medium', issue: 'Changes keep breaking things', fix: 'Move the code to GitHub, clean up the structure and make changes by hand where it matters.' },
    ],
  },
];

const COST = { high: 5000, medium: 3000, low: 1500 };
const DAYS = { high: 1.5, medium: 1, low: 0.5 };

export default function RescueCheck() {
  const [answers, setAnswers] = useState({});
  const answered = Object.keys(answers).length;
  const complete = answered === QUESTIONS.length;

  const result = useMemo(() => {
    const issues = QUESTIONS.map((q) => {
      const opt = q.options[answers[q.id]];
      return opt && opt.level ? { ...opt, qid: q.id } : null;
    }).filter(Boolean);
    const order = { high: 0, medium: 1, low: 2 };
    issues.sort((a, b) => order[a.level] - order[b.level]);
    const count = (lvl) => issues.filter((i) => i.level === lvl).length;
    const base = 10000;
    const extra = issues.reduce((t, i) => t + COST[i.level], 0);
    const low = Math.max(base, Math.round((base + extra - 5000) / 1000) * 1000);
    const high = Math.round(((base + extra) * 1.4) / 1000) * 1000;
    const days = Math.max(2, Math.ceil(issues.reduce((t, i) => t + DAYS[i.level], 1)));
    return { issues, high: count('high'), medium: count('medium'), low: count('low'), priceLow: low, priceHigh: high, days };
  }, [answers]);

  const built = answers.tool !== undefined ? QUESTIONS[0].options[answers.tool].label : 'an AI builder';
  const message = [
    `Hi Juned, I used your AI app rescue check. My app is built with ${built}.`,
    result.issues.length ? `Likely issues: ${result.issues.map((i) => i.issue).join('; ')}.` : 'It looks mostly healthy.',
    'Can you take a look?',
  ].join('\n');

  const inr = (n) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <div className="tool">
      <div className="tool-main">
        {QUESTIONS.map((q, qi) => (
          <fieldset key={q.id} className="tool-block reveal">
            <legend className="q-legend">
              <span className="mono q-num">{String(qi + 1).padStart(2, '0')}</span> {q.q}
            </legend>
            <div className="pill-row">
              {q.options.map((o, oi) => {
                const on = answers[q.id] === oi;
                return (
                  <button
                    key={o.label}
                    type="button"
                    className={on ? 'pill is-on' : 'pill'}
                    aria-pressed={on}
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <aside className="tool-result reveal" aria-live="polite">
        <p className="mono">Your app check</p>
        {!complete ? (
          <>
            <div className="progress-line" aria-hidden="true">
              <span style={{ width: `${(answered / QUESTIONS.length) * 100}%` }} />
            </div>
            <p className="result-sub">
              {answered} of {QUESTIONS.length} answered. Answer all questions to see your results.
            </p>
          </>
        ) : result.issues.length === 0 ? (
          <>
            <p className="result-verdict">Looks healthy</p>
            <p className="result-sub">
              No major red flags from your answers. A quick review before launch is still worth it.
            </p>
          </>
        ) : (
          <>
            <div className="sev-row">
              {result.high > 0 && <span className="sev sev-high">{result.high} high</span>}
              {result.medium > 0 && <span className="sev sev-med">{result.medium} medium</span>}
              {result.low > 0 && <span className="sev sev-low">{result.low} low</span>}
            </div>
            <ul className="issue-list">
              {result.issues.map((i) => (
                <li key={i.qid} className={`issue issue-${i.level}`}>
                  <strong>{i.issue}</strong>
                  <span>{i.fix}</span>
                </li>
              ))}
            </ul>
            <div className="rescue-est">
              <small>Rough fix estimate</small>
              <strong>
                {inr(result.priceLow)}–{inr(result.priceHigh)}
              </strong>
              <span>
                about {result.days}–{result.days + 2} days
              </span>
            </div>
          </>
        )}
        <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-accent result-cta" data-magnetic>
          Get a free app check →
        </a>
        <p className="result-note">
          Based only on your answers. On a free call I&apos;ll look at the real code and give you a fixed price.
        </p>
      </aside>
    </div>
  );
}
