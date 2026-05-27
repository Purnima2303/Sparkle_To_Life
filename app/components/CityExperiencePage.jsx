import Link from 'next/link';
import HeroBackgroundVideo from './HeroBackgroundVideo';
import HQImage from './HQImage';
import VideoSection from './VideoSection';
import RainEffect from './RainEffect';
import MumbaiOverlay from './overlays/MumbaiOverlay';
import LucknowOverlay from './overlays/LucknowOverlay';

function MasonryGallery({ images, accentClass, galleryHref }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {images.map((img, index) => (
        <Link
          key={img.id ?? img.src}
          href={galleryHref}
          className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#0c1014] shadow-[0_24px_80px_rgba(0,0,0,0.32)] transition-transform duration-300 hover:-translate-y-1 hover:border-white/15"
        >
          <div className="overflow-hidden bg-[#0b1014]">
            <HQImage
              src={img.src}
              alt={img.caption || img.title || 'Gallery photo'}
              priority={index < 3}
              className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
              loading={index > 6 ? 'lazy' : 'eager'}
            />
          </div>

          <div className="space-y-3 px-5 py-5">
            <div className="flex items-center justify-between gap-3">
              <span className={`text-[11px] uppercase tracking-[0.35em] text-white/60 ${accentClass}`}>{String(index + 1).padStart(2, '0')}</span>
              {img.category && (
                <span className={`rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70 ${accentClass}`}>
                  {img.category}
                </span>
              )}
            </div>

            {img.title && <h3 className="text-xl font-light text-white">{img.title}</h3>}
            {img.caption && <p className="text-sm leading-6 text-gray-300 line-clamp-3">{img.caption}</p>}
          </div>
        </Link>
      ))}
    </div>
  );
}

/**
 * Shared city landing layout (matches Lucknow outer page structure).
 */
export default function CityExperiencePage({
  cityName,
  tagline,
  eyebrow,
  aboutTitle,
  aboutBody,
  storyCards,
  images,
  videos,
  backgroundVideo,
  gradientClass,
  accentTextClass,
  accentButtonClass,
  galleryHref,
  journey = [],
  testimonials = [],
  chapters = [],
  cinematicSrc = null,
  homeFooter = true,
  showVideoSection = true,
}) {
  const previewCount = Math.min(9, images.length);

  return (
    <div className="theatre-page relative min-h-screen overflow-x-hidden bg-[#1a120c] text-white">
      <div className="theatre-grain" aria-hidden />
      <div className="theatre-vignette" aria-hidden />
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <HeroBackgroundVideo src={backgroundVideo} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80" />
        <div className="relative z-10 max-w-5xl px-6 text-center">
          <p className={`mb-4 text-sm uppercase tracking-[0.4em] ${accentTextClass}`}>{eyebrow}</p>
          <h1 className="mb-6 text-7xl font-light md:text-8xl">{cityName}</h1>
          <p className={`mx-auto mb-6 max-w-2xl text-2xl ${accentTextClass} opacity-90`}>{tagline}</p>
          {images.length > 0 && (
            <p className="text-sm tracking-wide text-white/50">
              {images.length} photographs - {videos.length} films in this chapter
            </p>
          )}
        </div>
        {cityName === 'Kerala' && <RainEffect />}
        {cityName === 'Mumbai' && <MumbaiOverlay />}
        {cityName === 'Lucknow' && <LucknowOverlay />}
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28 md:px-16">
        <p className={`mb-4 text-sm uppercase tracking-[0.3em] ${accentTextClass}`}>
          About {cityName}
        </p>
        <h2 className="mb-8 max-w-3xl text-5xl font-light leading-tight">{aboutTitle}</h2>
        <p className="max-w-4xl text-lg leading-8 text-gray-300">{aboutBody}</p>
      </section>

      <section className="border-y border-[#c9a962]/10 bg-[#1a120c] py-24 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <h2 className="text-center font-serif text-4xl text-[#f5efe4] md:text-5xl">Artistic Journey</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[#f5efe4]/55">Three moments that shaped this chapter.</p>

          <div className="mt-16 hidden md:block">
            <div className="theatre-timeline__line mb-8" />
            <div className="grid grid-cols-3 gap-8 justify-items-center">
              {(journey.length ? journey : storyCards).map((stop) => (
                <Link key={stop.place || stop.title} href={stop.href || '#'} className="group text-center">
                  <div className="theatre-journey__dot mx-auto mb-4 transition-transform group-hover:scale-125" />
                  <p className="font-serif text-lg text-[#c9a962]">{stop.place || stop.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-[#f5efe4]/50">{stop.form || stop.eyebrow}</p>
                  <p className="mt-2 text-[11px] italic text-[#f5efe4]/40">{stop.emotion || stop.body}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12 space-y-6 md:hidden">
            {(journey.length ? journey : storyCards).map((stop) => (
              <Link
                key={stop.place || stop.title}
                href={stop.href || '#'}
                className="theatre-card flex items-center gap-6 rounded-xl p-6"
              >
                <div className="theatre-journey__dot shrink-0" />
                <div>
                  <p className="font-serif text-xl text-[#c9a962]">{stop.place || stop.title}</p>
                  <p className="text-sm text-[#f5efe4]/60">{stop.form || stop.eyebrow}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0d0907] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <h2 className="font-serif text-4xl text-[#f5efe4] md:text-5xl">Human Stories</h2>
          <p className="mt-3 max-w-xl text-[#f5efe4]/55">Voices from the city and the people who made this chapter.</p>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {(testimonials.length ? testimonials : []).map((t) => (
              <div key={t.name} className="theatre-card rounded-2xl p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border border-[#c9a962]/30">
                    <img src={t.image} alt="" className="h-full w-full object-cover sepia-[0.2]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#f5efe4]">{t.name}</p>
                    <p className="text-xs text-[#c9a962]/70">{t.role}</p>
                  </div>
                </div>
                <p className="theatre-quote">&ldquo;{t.quote}&rdquo;</p>
                <p className="theatre-handwritten mt-4 text-sm">- witnessed live</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-[70vh] min-h-[380px] overflow-hidden">
        <img src={cinematicSrc || (images[0] && images[0].src) || '/mumbai/mumbai-01.jpeg'} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0907] via-[#0d0907]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0907] via-transparent to-[#0d0907]/30" />
      </section>

      <section id="performances" className="bg-[#0d0907] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="mb-16 text-center">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#c9a962]/70">Season Programme</p>
            <h2 className="mt-3 font-serif text-4xl text-[#f5efe4] md:text-5xl">Upcoming Chapters</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {(chapters.length ? chapters : storyCards).map((show) => (
              <Link key={show.title} href={show.href || '#'} className="theatre-card group overflow-hidden rounded-2xl">
                <div className="relative h-64 overflow-hidden">
                  <img src={show.image || (images[0] && images[0].src)} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0907] via-[#0d0907]/20 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-[#c9a962]/30 bg-[#0d0907]/60 px-3 py-1 text-[10px] uppercase tracking-widest text-[#c9a962] backdrop-blur">
                    {show.city || cityName}
                  </span>
                </div>
                <div className="p-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#c47a3a]">{show.genre || show.eyebrow}</p>
                  <h3 className="mt-2 font-serif text-2xl text-[#f5efe4]">{show.title}</h3>
                  <p className="mt-1 text-sm text-[#c9a962]/60">{show.dates || ''}</p>
                  <p className="mt-4 text-sm leading-7 text-[#f5efe4]/55">{show.desc || show.body}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-sm uppercase tracking-[0.3em] text-gray-500">Gallery</p>
              <h2 className="text-5xl font-light">Captured Moments</h2>
            </div>
            {images.length > 0 && (
              <Link
                href={galleryHref}
                className={`inline-flex w-fit rounded-full px-8 py-3 text-sm font-medium transition-all duration-300 ${accentButtonClass}`}
              >
                View all {images.length} photos {'->'}
              </Link>
            )}
          </div>

          {images.length > 0 ? (
            <MasonryGallery images={images.slice(0, previewCount)} accentClass={accentTextClass} galleryHref={galleryHref} />
          ) : (
            <p className="rounded-3xl border border-dashed border-white/15 py-16 text-center text-gray-400">
              Add photos to <code className="text-gray-300">/public/{cityName.toLowerCase()}</code> to
              begin this gallery chapter.
            </p>
          )}
        </div>
      </section>

      {showVideoSection && <VideoSection videos={videos} />}

      {homeFooter && (
        <footer className="border-t border-white/10 px-6 py-16 text-center">
          <Link href="/" className="text-gray-400 transition-all hover:text-white">
            {'<- Back to Home'}
          </Link>
          <p className="mt-6 text-xs tracking-[0.18em] text-white/35">© 2026 - My Life</p>
        </footer>
      )}
    </div>
  );
}

