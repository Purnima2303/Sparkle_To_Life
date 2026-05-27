'use client';

import HQImage from './HQImage';

export default function ImageGrid({ images = [] }) {
  return (
    <section className="image-grid">
      <div className="grid-container">
        {images.map((image, index) => (
          <div key={image.src ?? index} className="grid-item">
            <HQImage
              src={image.src}
              alt={image.alt ?? ''}
              priority={index < 6}
              className="grid-image h-auto w-full max-w-full"
            />
            {image.title && <p className="image-title">{image.title}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
