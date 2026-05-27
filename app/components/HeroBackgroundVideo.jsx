'use client';

import HQVideo from './HQVideo';

export default function HeroBackgroundVideo({ src, className = 'opacity-40' }) {
  if (!src) return null;

  return (
    <HQVideo
      src={src}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    />
  );
}
