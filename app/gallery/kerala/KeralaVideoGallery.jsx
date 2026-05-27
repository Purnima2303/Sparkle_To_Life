'use client';

import { useRef, useState } from 'react';

export default function KeralaVideoGallery({ videos, posterImages }) {
  const [modalVideo, setModalVideo] = useState(null);
  const modalVideoRef = useRef(null);

  const openVideo = (video) => {
    setModalVideo(video);
  };

  const closeModal = () => {
    const video = modalVideoRef.current;
    if (video && !video.paused) {
      video.pause();
    }
    setModalVideo(null);
  };

  const rotateClass = (src) => (src.includes('kerala-3.mp4') ? '-rotate-90 scale-[1.35]' : '');

  return (
    <section id="video-gallery" className="py-28 px-6 md:px-16 bg-[#14171d]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.3em] text-sm text-gray-400 mb-4">Legacy Pages</p>
          <h2 className="text-5xl font-light">Relive the Moments</h2>
          <p className="mt-4 text-gray-300 max-w-3xl mx-auto">Your journey, reimagined: Revisit the best moments of your trip down memory lane.</p>
        </div>

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          {videos.map((video) => {
            const isDimmed = modalVideo !== null && modalVideo.id !== video.id;
            const cardRotateClass = rotateClass(video.src);

            return (
              <button
                type="button"
                key={video.id}
                onClick={() => openVideo(video)}
                className={`mx-auto w-full max-w-[720px] rounded-[40px] overflow-hidden border bg-[#10141a] shadow-2xl transition-all duration-300 text-left ${
                  isDimmed ? 'opacity-60 blur-sm' : 'border-white/10 hover:border-white/30'
                }`}
              >
                <div className="relative h-[320px] bg-black overflow-hidden">
                  <video
                    className={`w-full h-full object-cover ${cardRotateClass}`}
                    muted
                    playsInline
                    preload="metadata"
                    src={video.src}
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white shadow-lg">
                      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-light mb-3">{video.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{video.description}</p>
                  <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">{video.duration}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {modalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-[90vw] max-w-[75vw] h-[75vh] rounded-[32px] bg-[#0d1118] shadow-2xl overflow-hidden">
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-3 text-white transition hover:bg-black/80"
            >
              <span className="sr-only">Close video</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10 3.636 5.05a1 1 0 011.414-1.414L10 8.586z" clipRule="evenodd" />
              </svg>
            </button>
            <video
              ref={modalVideoRef}
              className={`h-full w-full bg-black object-contain ${rotateClass(modalVideo.src)}`}
              controls
              autoPlay
              playsInline
              preload="metadata"
              src={modalVideo.src}
            >
              <source src={modalVideo.src} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
