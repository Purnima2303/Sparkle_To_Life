'use client';

import HQImage from './HQImage';

export default function PhotoGalleryGrid({ images = [], accentClass = 'bg-white/10' }) {
  if (images.length === 0) {
    return (
      <p className="py-16 text-center text-gray-500">
        No photos in this collection yet. Add images to the matching folder under{' '}
        <code className="text-gray-400">/public</code>.
      </p>
    );
  }

  return (
    <div className="gallery-grid">
      {images.map((img, index) => (
        <article
          key={img.id ?? img.src}
          className="gallery-card group overflow-hidden rounded-[28px] border border-white/10 bg-[#0d1015] shadow-[0_24px_80px_rgba(0,0,0,0.32)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
        >
          <div className="gallery-card-image overflow-hidden bg-[#090b0e]">
            <HQImage
              src={img.src}
              alt={img.caption || img.title || 'Gallery photo'}
              priority={index < 3}
              className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
              loading={index > 6 ? 'lazy' : 'eager'}
            />
          </div>

          <div className="gallery-card-text">
            <div className="gallery-card-meta">
              <span className={`text-[11px] uppercase tracking-[0.35em] text-white/60 ${accentClass}`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              {img.category && (
                <span className={`rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70 ${accentClass}`}>
                  {img.category}
                </span>
              )}
            </div>

            {img.title && <h3 className="text-xl font-light text-white">{img.title}</h3>}
            {img.caption && <p className="text-sm leading-6 text-gray-300 line-clamp-3">{img.caption}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}
