'use client';

import { useMemo, useState } from 'react';
import { waLink } from '../../content';

// ───── Fees, checked November 2026 from each gateway's own pricing page. ─────
// Update these numbers if a gateway changes its pricing.
const GST = 0.18; // GST on gateway fees for Indian businesses
const USD_INR = 88; // approximate, only used to show Dodo's fixed 40¢ fee in rupees

const SOURCES = [
  { name: 'Razorpay pricing explained (Razorpay blog)', url: 'https://razorpay.com/blog/razorpay-payment-gateway-pricing-explained/' },
  { name: 'Stripe India pricing', url: 'https://stripe.com/in/pricing' },
  { name: 'Dodo Payments pricing', url: 'https://dodopayments.com/pricing' },
];

function gateways({ location, currency, subscription }) {
  const india = location === 'india';
  return [
    {
      id: 'razorpay',
      name: 'Razorpay',
      bestFor: 'Customers in India (UPI, cards, netbanking)',
      pct: india ? 2 : 3,
      fixedUsd: 0,
      gst: true,
      notes: india
        ? ['2% on domestic cards, UPI, netbanking and wallets', 'No setup or yearly fee']
        : ['3% on international cards (+1% optional chargeback cover)', 'International cards must be enabled on your account'],
    },
    {
      id: 'stripe',
      name: 'Stripe India',
      bestFor: 'Indian businesses selling with cards',
      pct: india ? 2 : currency === 'usd' ? 4.3 : 3,
      fixedUsd: 0,
      gst: true,
      notes: india
        ? ['2% on Indian Visa and Mastercard', 'Check Stripe accepts your business type']
        : currency === 'usd'
          ? ['4.3% on international cards charged in USD', 'Currency conversion may add more']
          : ['3% on international cards charged in INR', 'Amex is 3.5%'],
    },
    {
      id: 'dodo',
      name: 'Dodo Payments',
      bestFor: 'Selling worldwide without handling foreign taxes',
      pct: 4 + (location === 'usa' ? 0 : 1.5) + (subscription ? 0.5 : 0),
      fixedUsd: 0.4,
      gst: false,
      notes: [
        location === 'usa' ? '4% + 40¢ for US customers' : '4% + 40¢, plus 1.5% for customers outside the US',
        subscription ? 'Includes +0.5% for subscription billing' : 'Subscriptions add +0.5%',
        'Merchant of record: it handles sales tax and VAT for you',
      ],
    },
  ];
}

export default function FeeCalculator() {
  const [amount, setAmount] = useState('999');
  const [currency, setCurrency] = useState('inr');
  const [location, setLocation] = useState('india');
  const [subscription, setSubscription] = useState(false);
  const [withGst, setWithGst] = useState(true);
  const [error, setError] = useState('');

  const value = Number(String(amount).replace(/[^0-9.]/g, ''));

  const rows = useMemo(() => {
    if (!value || value <= 0) return [];
    const list = gateways({ location, currency, subscription }).map((g) => {
      const fixed = currency === 'inr' ? g.fixedUsd * USD_INR : g.fixedUsd;
      let fee = (value * g.pct) / 100 + fixed;
      if (g.gst && withGst) fee *= 1 + GST;
      return { ...g, fee, receive: value - fee, effective: (fee / value) * 100 };
    });
    const min = Math.min(...list.map((r) => r.fee));
    return list.map((r) => ({ ...r, cheapest: r.fee === min }));
  }, [value, location, currency, subscription, withGst]);

  const money = (n) =>
    currency === 'inr'
      ? `₹${n.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`
      : `$${n.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;

  const where = { india: 'India', usa: 'the USA', other: 'other countries' }[location];
  const message = `Hi Juned, I used your payment fee calculator. I'm selling at ${money(value || 0)} to customers in ${where}${
    subscription ? ' (subscription)' : ''
  }. Can you help me choose and set up the right payment gateway?`;

  return (
    <div className="tool">
      <div className="tool-main">
        <div className="tool-block reveal">
          <label htmlFor="fee-amount" className="mono tool-k">
            Price of one sale
          </label>
          <div className="amount-row">
            <div className="cur-switch" role="group" aria-label="Currency">
              <button type="button" className={currency === 'inr' ? 'is-on' : ''} aria-pressed={currency === 'inr'} onClick={() => setCurrency('inr')}>
                ₹ INR
              </button>
              <button type="button" className={currency === 'usd' ? 'is-on' : ''} aria-pressed={currency === 'usd'} onClick={() => setCurrency('usd')}>
                $ USD
              </button>
            </div>
            <input
              id="fee-amount"
              className="field"
              inputMode="decimal"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                const v = Number(e.target.value.replace(/[^0-9.]/g, ''));
                setError(!v || v <= 0 ? 'Enter a price above zero.' : '');
              }}
              aria-describedby={error ? 'fee-error' : undefined}
            />
          </div>
          {error && (
            <p id="fee-error" className="field-error" role="alert">
              {error}
            </p>
          )}
        </div>

        <fieldset className="tool-block reveal">
          <legend className="mono tool-k">Where are your customers?</legend>
          <div className="seg seg-3">
            {[
              ['india', 'India'],
              ['usa', 'USA'],
              ['other', 'Other countries'],
            ].map(([id, label]) => (
              <button key={id} type="button" className={location === id ? 'seg-btn is-on' : 'seg-btn'} aria-pressed={location === id} onClick={() => setLocation(id)}>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="tool-block reveal toggles">
          <label className="switch">
            <input type="checkbox" checked={subscription} onChange={(e) => setSubscription(e.target.checked)} />
            <span className="switch-ui" aria-hidden="true" />
            Monthly subscription
          </label>
          <label className="switch">
            <input type="checkbox" checked={withGst} onChange={(e) => setWithGst(e.target.checked)} />
            <span className="switch-ui" aria-hidden="true" />
            Add 18% GST on Razorpay and Stripe fees
          </label>
        </div>
      </div>

      <div className="tool-side reveal" aria-live="polite">
        <div className="fee-cards">
          {rows.map((r) => (
            <div key={r.id} className={r.cheapest ? 'fee-card is-best' : 'fee-card'}>
              <div className="fee-head">
                <h3>{r.name}</h3>
                {r.cheapest && <span className="badge">Lowest fee</span>}
              </div>
              <p className="fee-best">{r.bestFor}</p>
              <div className="fee-nums">
                <div>
                  <small>Fee</small>
                  <strong>{money(r.fee)}</strong>
                  <em>{r.effective.toFixed(2)}%</em>
                </div>
                <div>
                  <small>You receive</small>
                  <strong>{money(r.receive)}</strong>
                </div>
              </div>
              <ul className="fee-notes">
                {r.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className="btn btn-accent result-cta" data-magnetic>
          Get help setting up payments →
        </a>
        <p className="result-note">
          Fees checked November 2026 from each gateway&apos;s pricing page and may change. Always confirm before you decide.
          Sources:{' '}
          {SOURCES.map((s, i) => (
            <span key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.name}
              </a>
              {i < SOURCES.length - 1 ? ', ' : '.'}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
