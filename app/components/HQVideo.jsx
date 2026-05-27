'use client';

import { forwardRef } from 'react';

/**
 * Native HTML5 video - full source file from /public, no transcoding.
 */
const HQVideo = forwardRef(function HQVideo(
  {
    src,
    className = '',
    poster,
    autoPlay = false,
    muted = false,
    loop = false,
    playsInline = true,
    controls = false,
    preload = 'metadata',
    style,
    onClick,
    rotateClass = '',
  },
  ref
) {
  if (!src) return null;

  return (
    <video
      ref={ref}
      className={`${className} ${rotateClass}`.trim()}
      style={style}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      controls={controls}
      preload={preload}
      poster={poster}
      onClick={onClick}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
});

export default HQVideo;
