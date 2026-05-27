'use client';

/**
 * Serves originals from /public at full resolution (no Next.js image compression).
 */
export default function HQImage({
  src,
  alt = '',
  className = '',
  priority = false,
  fill = false,
  sizes,
  onClick,
  ...props
}) {
  const loading = priority ? 'eager' : 'lazy';
  const fetchPriority = priority ? 'high' : 'auto';

  const shared = {
    src,
    alt,
    decoding: 'async',
    loading,
    fetchPriority,
    draggable: false,
    className,
    onClick,
    ...props,
  };

  if (fill) {
    return (
      <img
        {...shared}
        sizes={sizes ?? '100vw'}
        className={`absolute inset-0 h-full w-full object-contain ${className}`}
        style={{ objectPosition: 'center' }}
      />
    );
  }

  return <img {...shared} sizes={sizes} />;
}
