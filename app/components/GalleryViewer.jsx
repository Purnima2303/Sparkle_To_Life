'use client';

import { useState } from 'react';
import HQImage from './HQImage';

export default function GalleryViewer({ city, images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) return <div>No images available</div>;

  const currentImage = images[currentIndex];

  return (
    <section className="gallery-viewer">
      <div className="gallery-container">
        <h1>{city} Gallery</h1>
        <div className="relative mx-auto max-h-[80vh] max-w-5xl">
          <HQImage
            src={currentImage.src}
            alt={currentImage.alt ?? ''}
            priority
            className="mx-auto h-auto max-h-[80vh] w-full object-contain"
          />
        </div>
        <div className="controls">
          <button type="button" onClick={prevImage}>
            {'<- Previous'}
          </button>
          <span>
            {currentIndex + 1} / {images.length}
          </span>
          <button type="button" onClick={nextImage}>
            {'Next ->'}
          </button>
        </div>
      </div>
    </section>
  );
}
