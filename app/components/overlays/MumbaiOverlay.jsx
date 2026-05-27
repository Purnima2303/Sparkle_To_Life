import React from 'react';

export default function MumbaiOverlay() {
  return (
    <div className="mumbai-overlay pointer-events-none" aria-hidden>
      <div className="mumbai-streaks">
        {[...Array(12)].map((_, i) => (
          <span key={i} className={`mumbai-streak mumbai-streak--${i + 1}`} />
        ))}
      </div>
      <div className="mumbai-orbs">
        <div className="mumbai-orb orb-one" />
        <div className="mumbai-orb orb-two" />
        <div className="mumbai-orb orb-three" />
      </div>
    </div>
  );
}
