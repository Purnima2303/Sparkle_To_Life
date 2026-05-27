'use client';

import { useRef, useState, useEffect, useMemo } from 'react';
import HQVideo from './HQVideo';
import { mapWithSizes } from '../lib/masonry';

export default function VideoSection({
  id,
  videos = [],
  title = 'Legacy Pages',
  subtitle = 'Relive the Moments',
  description = 'Your journey, reimagined: Revisit the best moments of your trip down memory lane.',
}) {
  const [modalVideo, setModalVideo] = useState(null);
  const modalVideoRef = useRef(null);

  const openVideo = (video) => setModalVideo(video);

  const closeModal = () => {
    const video = modalVideoRef.current;
    if (video) {
      try {
        const fadeOut = setInterval(() => {
          if (!video) return clearInterval(fadeOut);
          video.volume = Math.max(0, video.volume - 0.08);
          if (video.volume <= 0.01) {
            video.pause();
            video.volume = 0;
            clearInterval(fadeOut);
          }
        }, 80);
      } catch (e) {
        if (!video.paused) video.pause();
      }
    }
    setModalVideo(null);
  };

  useEffect(() => {
    const video = modalVideoRef.current;
    if (!video) return;
    try {
      video.volume = 0;
      const target = 0.72;
      let current = 0;
      const step = 0.04;
      const fadeIn = setInterval(() => {
        current = Math.min(target, current + step);
        video.volume = current;
        if (current >= target) clearInterval(fadeIn);
      }, 120);
    } catch (e) {
      // ignore
    }
  }, [modalVideo]);

  const rotateClass = (src) => (src?.includes('kerala-3.mp4') ? '-rotate-90 scale-[1.35]' : '');
  
  // Apply masonry sizing only for multiple videos (3+), otherwise use 2-col grid
  const videosWithSizes = useMemo(() => {
    return videos.length >= 3 ? mapWithSizes(videos) : videos.map((v, i) => ({ ...v, sizeVariant: '' }));
  }, [videos]);

  if (videos.length === 0) return null;

  return (
    <section id={id} className="py-24 px-6 md:px-16 bg-[#14171d]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gray-400">{title}</p>
          <h2 className="text-5xl font-light">{subtitle}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-gray-300">{description}</p>
        </div>

        {videos.length >= 3 ? (
          <div className="masonry-grid">
            {videosWithSizes.map((video) => {
              const isDimmed = modalVideo !== null && modalVideo.id !== video.id;
              const cardRotateClass = rotateClass(video.src);

              return (
                <button
                  type="button"
                  key={video.id}
                  onClick={() => openVideo(video)}
                  className={`masonry-item ${video.sizeVariant} overflow-hidden rounded-[16px] border bg-[#10141a] text-left shadow-2xl transition-all duration-300 ${
                    isDimmed ? 'opacity-60 blur-sm' : 'border-white/10 hover:border-white/30 hover:scale-102'
                  }`}
                >
                  <div className="relative h-full w-full overflow-hidden bg-black">
                    <div
                      className="absolute inset-0 bg-center bg-cover scale-[1.06] blur-2xl opacity-40"
                      style={
                        video.poster
                          ? { backgroundImage: `url(${video.poster})` }
                          : { background: 'linear-gradient(180deg, rgba(10,10,12,0.6), rgba(0,0,0,0.9))' }
                      }
                      aria-hidden
                    />
                    <HQVideo
                      src={video.src}
                      className={`h-full w-full object-contain ${cardRotateClass}`}
                      playsInline
                      preload="metadata"
                      style={{ objectFit: 'contain' }}
                    />
                    <div className="absolute inset-0 bg-black/25" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white shadow-lg">
                        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                          <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="masonry-card-text p-4">
                    <h3 className="text-white mb-1">{video.title}</h3>
                    <p className="text-gray-200 text-sm line-clamp-2">{video.description}</p>
                    {video.duration && (
                      <span className="inline-flex items-center rounded-full bg-white/5 px-2 py-0.5 text-xs text-gray-300 mt-2">
                        {video.duration}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {videos.map((video) => {
              const isDimmed = modalVideo !== null && modalVideo.id !== video.id;
              const cardRotateClass = rotateClass(video.src);

              return (
                <button
                  type="button"
                  key={video.id}
                  onClick={() => openVideo(video)}
                  className={`mx-auto w-full max-w-[900px] overflow-hidden rounded-[40px] border bg-[#10141a] text-left shadow-2xl transition-all duration-300 ${
                    isDimmed ? 'opacity-60 blur-sm' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="relative h-[min(52vh,420px)] overflow-hidden bg-black">
                    <div
                      className="absolute inset-0 bg-center bg-cover scale-[1.06] blur-2xl opacity-40"
                      style={
                        video.poster
                          ? { backgroundImage: `url(${video.poster})` }
                          : { background: 'linear-gradient(180deg, rgba(10,10,12,0.6), rgba(0,0,0,0.9))' }
                      }
                      aria-hidden
                    />
                    <HQVideo
                      src={video.src}
                      className={`h-full w-full object-contain ${cardRotateClass}`}
                      playsInline
                      preload="metadata"
                      style={{ objectFit: 'contain' }}
                    />
                    <div className="absolute inset-0 bg-black/25" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white shadow-lg">
                        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                          <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 text-white">
                    <h3 className="mb-3 text-2xl font-light">{video.title}</h3>
                    <p className="mb-4 text-sm text-gray-300">{video.description}</p>
                    {video.duration && (
                      <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">
                        {video.duration}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {modalVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={modalVideo.title}
        >
          <div className="relative h-[min(85vh,900px)] w-[min(96vw,1400px)] overflow-hidden rounded-[32px] bg-black shadow-2xl">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-3 text-white transition hover:bg-black/80"
            >
              <span className="sr-only">Close video</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10 3.636 5.05a1 1 0 011.414-1.414L10 8.586z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <HQVideo
              ref={modalVideoRef}
              src={modalVideo.src}
              className={`h-full w-full object-contain ${rotateClass(modalVideo.src)}`}
              controls
              autoPlay
              playsInline
              preload="auto"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </section>
  );
}

