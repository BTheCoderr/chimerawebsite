'use client';

import { useState } from 'react';
import Link from 'next/link';

const FINISHES = {
  white: {
    name: 'White ceramic',
    image: '/images/IMG_6116.jpeg',
    alt: 'Complete Chimera kit with white ceramic filter fitted in the glass carafe',
  },
  black: {
    name: 'Black ceramic',
    image: '/images/Water_Image-02.jpg',
    alt: 'Complete Chimera kit with black ceramic filter fitted in the glass carafe',
  },
} as const;

type Finish = keyof typeof FINISHES;

export function HomeKitChoice() {
  const [finish, setFinish] = useState<Finish>('white');
  const selected = FINISHES[finish];
  return (
    <div className="cb-kit-choice">
      <div className="cb-kit-choice-image">
        <img src={selected.image} alt={selected.alt} width={900} height={1080} loading="lazy" />
      </div>
      <div className="cb-finish-options" role="group" aria-label="Preview ceramic filter finish">
        {(Object.keys(FINISHES) as Finish[]).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={finish === option}
            className={'cb-finish-option' + (finish === option ? ' is-selected' : '')}
            onClick={() => setFinish(option)}
          >
            <span className={'cb-finish-dot cb-finish-dot--' + option} aria-hidden="true" />
            {FINISHES[option].name}
          </button>
        ))}
      </div>
      <p className="cb-choice-note">Preview shows the complete kit with your chosen ceramic finish. Both options include the glass carafe, ceramic filter with lid and 2 oz activated carbon.</p>
      <Link className="cb-mint-button cb-buy-link" href="/shop/chimera-kit/">Explore the complete kit <span aria-hidden="true">↗</span></Link>
      <Link className="cb-secondary-link" href="/shop/">View refills &amp; individual parts <span aria-hidden="true">↗</span></Link>
      <p className="cb-availability">Direct checkout and pricing are being finalized. No payment will be collected on this preview.</p>
    </div>
  );
}
