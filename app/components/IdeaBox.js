'use client';

import { useState } from 'react';

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
    <section id="idea" className="idea">
      <div className="wrap reveal">
        <p className="mono">Free · takes 10 seconds</p>
        <h2 className="h2">
          Have an idea? See how <em>I&apos;d build it.</em>
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
              placeholder="A booking app for yoga teachers with monthly payments"
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
