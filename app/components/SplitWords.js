import { Fragment } from 'react';

// Splits a heading into words so each one can slide up from behind a mask.
// parts: [{ t: 'I build SaaS apps that ' }, { t: 'go live', em: true, underline: true }, { t: ' and take payments.' }]
// Screen readers get the plain sentence; the animated words are hidden from them.
export default function SplitWords({ parts }) {
  let i = 0;
  const plain = parts.map((p) => p.t).join('').replace(/\s+/g, ' ').trim();

  return (
    <>
      <span className="sr-only">{plain}</span>
      <span aria-hidden="true">
        {parts.map((p, pi) => {
          if (p.em) {
            const idx = i++;
            const unit = (
              <span className="w w-em">
                <span style={{ '--i': idx }}>
                  <em>{p.t}</em>
                </span>
              </span>
            );
            return (
              <Fragment key={pi}>
                {p.underline ? (
                  <span className="u-wrap">
                    {unit}
                    <svg className="squiggle" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
                      <path d="M3 14 C 50 4, 120 3, 197 9" pathLength="1" />
                    </svg>
                  </span>
                ) : (
                  unit
                )}{' '}
              </Fragment>
            );
          }
          return p.t
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .map((word, wi) => {
              const idx = i++;
              return (
                <Fragment key={`${pi}-${wi}`}>
                  <span className="w">
                    <span style={{ '--i': idx }}>{word}</span>
                  </span>{' '}
                </Fragment>
              );
            });
        })}
      </span>
    </>
  );
}
