'use client';

import { useState } from 'react';

const VIDEO_URL = 'https://www.youtube-nocookie.com/embed/rAhQM2hbx14?rel=0&autoplay=1';

export function ProductFilm() {
  const [activated, setActivated] = useState(false);
  return <div className="film-container">
    {activated ?
      <iframe
        src={VIDEO_URL}
        title="Chimera reusable water filter and coffee carafe product demonstration"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      /> :
      <button
        type="button"
        className="film-activate"
        onClick={() => setActivated(true)}
        aria-label="Play the original Chimera product film on YouTube"
      >
        <span className="film-activate-kicker">CHIMERA / THE PRODUCT FILM</span>
        <span className="film-activate-center">
          <span className="film-activate-play" aria-hidden="true"></span>
          <span>WATCH THE FILM</span>
        </span>
        <span className="film-activate-disclosure">YouTube loads when you press play.</span>
      </button>
    }
  </div>;
}
