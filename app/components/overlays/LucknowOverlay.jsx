import React from 'react';

export default function LucknowOverlay() {
  return (
    <div className="lucknow-overlay pointer-events-none" aria-hidden>
      <div className="lucknow-dust">
        {[...Array(36)].map((_, i) => (
          <span key={i} className={`dust-particle dust-${i + 1}`} />
        ))}
      </div>
      <div className="lucknow-lanterns">
        <div className="lantern lantern-one" />
        <div className="lantern lantern-two" />
      </div>
      <div className="urdu-texture" />
    </div>
  );
}
