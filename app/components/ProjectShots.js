'use client';

import { useState } from 'react';
import Image from 'next/image';

// Shows a project's screenshots inside a browser frame,
// with small tabs to switch between them (for example Dashboard / Landing page).
export default function ProjectShots({ name, domain, images = [] }) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div className="shots">
      {images.length > 1 && (
        <div className="shot-tabs" role="tablist" aria-label={`${name} screens`}>
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              className="shot-tab"
              onClick={() => setActive(i)}
            >
              {img.label}
            </button>
          ))}
        </div>
      )}
      <div className="browser">
        <div className="browser-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>
            {domain}
            {current?.path || ''}
          </span>
        </div>
        {current ? (
          <Image
            key={current.src}
            src={current.src}
            alt={`${name} ${current.label.toLowerCase()} screenshot`}
            width={1600}
            height={1000}
            className="screen"
            sizes="(min-width: 900px) 640px, 100vw"
          />
        ) : (
          <div className="screen placeholder">{name} screenshot goes here</div>
        )}
      </div>
    </div>
  );
}