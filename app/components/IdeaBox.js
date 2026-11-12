'use client';

import { useEffect, useRef, useState } from 'react';
import SplitWords from './SplitWords';

const examples = [
  { label: 'Booking app', text: 'A booking app for yoga teachers with monthly payments' },
  { label: 'AI tool', text: 'An AI tool that writes product descriptions for online shops' },
  { label: 'Client portal', text: 'A client portal where agencies share files and invoices' },
  { label: 'Marketplace', text: 'A marketplace where home bakers sell to local buyers' },
];

// Reads keywords in the idea and builds a simple 3-step plan.
// Runs in the visitor's browser: free, instant, no API key needed.
function makePlan(idea) {
  const t = idea.toLowerCase();
  const has = (patterns) => patterns.some((p) => p.test(t));

  const pay = has([/pay/, /subscri/, /billing/, /checkout/, /\bsell/, /monthly/, /invoice/]);
  const ai = has([/\bai\b/, /gpt/, /chatbot/, /\bbot\b/, /generat/, /\bwrites?\b/, /assistant/]);
  const book = has([/book/, /appointment/, /schedul/, /calendar/, /\bslots?\b/, /class/]);
  const market = has([/marketplace/, /sellers?/, /buyers?/, /vendors?/]);
  const portal = has([/portal/, /\bclients?\b/, /dashboard/, /\bcrm\b/, /\bteams?\b/]);

  let core = 'Your core feature, built and tested end to end';
  if (market) core = 'Seller and buyer accounts, listings, search and orders';
  else if (book) core = 'Calendar, bookings and email confirmations';
  else if (ai) core = 'The AI feature, with usage limits so costs stay low';
  else if (portal) core = 'Shared dashboard, files, roles and notifications';
  if (ai && (market || book || portal)) core += ', plus an AI feature with usage limits';

  let weeks = 5;
  let inr = 75000;
  let usd = 2500;
  if (ai) {
    weeks += 1;
    inr += 25000;
    usd += 800;
  }
  if (market) {
    weeks += 2;
    inr += 50000;
    usd += 1600;
  }
  if (pay) {
    weeks += 1;
    inr += 15000;
    usd += 500;
  }

  return {
    steps: [
      { when: 'Week 1–2', title: 'Foundation', text: 'Landing page, sign-up and login, your dashboard' },
      { when: weeks - 2 > 3 ? `Week 3–${weeks - 2}` : 'Week 3', title: 'Core feature', text: core },
      {
        when: `Week ${weeks - 1}–${weeks}`,
        title: pay ? 'Money and launch' : 'Launch',
        text: pay
          ? 'Payments with Razorpay or Stripe, testing, go live'
          : 'Testing, analytics, your domain, go live',
      },
    ],
    estimate: `${weeks}–${weeks + 1} weeks · from ₹${inr.toLocaleString('en-IN')} / $${usd.toLocaleString('en-US')}`,
  };
}

export default function IdeaBox({ bookingUrl }) {
  const [idea, setIdea] = useState('');
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(false);

  // Animated placeholder: types out example ideas until the visitor starts typing.
  const [hint, setHint] = useState(examples[0].text);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || idea || focused || !visible) return;
    let item = 0;
    let pos = 0;
    let deleting = false;
    let timer;
    const tick = () => {
      const full = examples[item].text;
      if (!deleting) {
        pos += 1;
        setHint(full.slice(0, pos));
        if (pos === full.length) {
          deleting = true;
          timer = setTimeout(tick, 1800);
          return;
        }
        timer = setTimeout(tick, 38);
      } else {
        pos -= 1;
        setHint(full.slice(0, pos));
        if (pos === 0) {
          deleting = false;
          item = (item + 1) % examples.length;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 16);
      }
    };
    setHint('');
    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [idea, focused, visible]);

  function build(text) {
    if (!text.trim()) {
      setError(true);
      setPlan(null);
      return;
    }
    setError(false);
    setPlan(makePlan(text));
  }

  return (
    <section id="idea" className="idea" ref={sectionRef}>
      <div className="wrap reveal">
        <p className="mono">Free · takes 10 seconds</p>
        <h2 className="h2 words">
          <SplitWords parts={[{ t: 'Have an idea? See how ' }, { t: "I'd build it.", em: true }]} />
        </h2>
        <p className="idea-lead">
          Describe it in one line. You&apos;ll get a simple 3-step build plan and a rough estimate.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            build(idea);
          }}
          noValidate
        >
          <label htmlFor="idea-input">Your idea</label>
          <div className="idea-form">
            <input
              id="idea-input"
              type="text"
              value={idea}
              onChange={(e) => {
                setIdea(e.target.value);
                setError(false);
              }}
              placeholder={focused ? examples[0].text : `${hint}|`}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              autoComplete="off"
              maxLength={200}
              aria-describedby={error ? 'idea-error' : undefined}
            />
            <button type="submit" className="btn btn-accent">
              Show me the plan
            </button>
          </div>
          {error && (
            <p id="idea-error" className="idea-error" role="alert">
              Type your idea first. One line is enough.
            </p>
          )}
        </form>

        <div className="chips">
          <span>Try:</span>
          {examples.map((ex) => (
            <button
              key={ex.label}
              type="button"
              className="chip"
              onClick={() => {
                setIdea(ex.text);
                build(ex.text);
              }}
            >
              {ex.label}
            </button>
          ))}
        </div>

        {plan && (
          <div className="plan" aria-live="polite">
            <div className="plan-top">
              <p className="mono">Build plan · draft</p>
              <em>by Juned</em>
            </div>
            <ol>
              {plan.steps.map((s, i) => (
                <li key={s.title}>
                  <span className="plan-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div className="plan-step">
                    <div className="plan-step-head">
                      <strong>{s.title}</strong>
                      <span className="mono">{s.when}</span>
                    </div>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="plan-bottom">
              <div>
                <small>Rough estimate</small>
                <strong>{plan.estimate}</strong>
              </div>
              <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                Get the real plan on a call →
              </a>
            </div>
            <p className="plan-note">
              A quick estimate from keywords. On the call, I&apos;ll give you a real scope and a fixed price.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
