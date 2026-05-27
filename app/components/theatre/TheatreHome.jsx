'use client';

import Link from 'next/link';
import TheatreNav from './TheatreNav';
import HQImage from '../HQImage';
import RainEffect from '../RainEffect';

const SHOWS = [
  {
    title: 'Whispers Of The Kerala Rain',
    city: 'Kerala',
    genre: 'Childhood - Monsoon Memory',
    dates: 'Chapter I',
    desc: 'Childhood silence, coconut trees, rain-soaked roads, and the hush that taught me how to listen.',
    image: '/kerala/kerala-03.jpeg',
    href: '/kerala',
  },
  {
    title: 'Runways & Restless Dreams',
    city: 'Mumbai',
    genre: 'Ambition - Movement',
    dates: 'Chapter II',
    desc: 'Airports, sleepless nights and rain on the highway-where survival became a discipline of the heart.',
    image: '/homepage/mumbai-marine-drive.jpeg',
    href: '/mumbai',
  },
  {
    title: 'Poetry Beneath Nawabi Skies',
    city: 'Lucknow',
    genre: 'Heritage - Poetry',
    dates: 'Chapter III',
    desc: 'Old streets and marble arches taught me the language of loss and longing.',
    image: '/lucknow/lucknow-01.jpeg',
    href: '/lucknow',
  },
  {
    title: 'Songs From Another Room',
    city: 'Music',
    genre: 'Memory - Sound',
    dates: 'Chapter IV',
    desc: 'Cassette players, dim rooms and melodies that healed small, stubborn wounds.',
    image: '/homepage/music-vinyl.jpeg',
    href: '/music',
  },
];

const JOURNEY = [
  {
    place: 'Kerala',
    form: 'Monsoon Memory',
    emotion: 'Where rain taught silence.',
    href: '/kerala',
    image: '/kerala/kerala-04.jpeg',
  },
  {
    place: 'Mumbai',
    form: 'Urban Rhythm',
    emotion: 'Where chaos became routine.',
    href: '/mumbai',
    image: '/homepage/mumbai-marine-drive.jpeg',
  },
  {
    place: 'Lucknow',
    form: 'Poetic Court',
    emotion: 'Where poetry found a home.',
    href: '/lucknow',
    image: '/lucknow/lucknow-03.jpeg',
  },
];

const TESTIMONIALS = [
  {
    quote: 'He may have lived in different cities, but to me, he will always remain the same little Ignatius I watched running through the rain.',
    name: 'Mother',
    role: '',
    image: '/homepage/human-stories/mother-rain-window-generic.jpeg',
  },
  {
    quote: 'He still finds joy in remembering the mango trees we planted together, the fights we had, and the laughter hidden inside those old afternoons.',
    name: 'Kripa',
    role: '',
    image: '/homepage/human-stories/kripa-mango-tree-generic.jpeg',
  },
  {
    quote: 'The memories I spent with you in Lucknow are irreplaceable. Wherever life takes us, a part of that city will always belong to us.',
    name: 'Sarath',
    role: '',
    image: '/homepage/human-stories/sarath-night-city-generic.jpeg',
  },
];

const DEFAULT_GALLERY = [
  { src: '/kerala/kerala-01.jpeg', tall: true },
  { src: '/homepage/mumbai-marine-drive.jpeg', tall: false },
  { src: '/lucknow/lucknow-01.jpeg', tall: false },
  { src: '/kerala/kerala-04.jpeg', tall: true },
  { src: '/lucknow/lucknow-05.jpeg', tall: false },
  { src: '/homepage/cinema-projector.jpeg', tall: true },
];

const HOMEPAGE_FALLBACK_IMAGES = {
  hero: '/kerala/kerala-01.jpeg',
  opera: '/lucknow/lucknow-02.jpeg',
  kerala: '/kerala/kerala-04.jpeg',
  mumbai: '/homepage/mumbai-marine-drive.jpeg',
  lucknow: '/lucknow/lucknow-03.jpeg',
  music: '/homepage/music-vinyl.jpeg',
  cinema: '/homepage/cinema-projector.jpeg',
  author: '/kerala/kerala-09.jpeg',
};

function imageWithFallback(src, fallback) {
  return src || fallback;
}

function handleImageFallback(event, fallback) {
  if (!fallback || event.currentTarget.dataset.fallbackApplied === 'true') return;
  event.currentTarget.dataset.fallbackApplied = 'true';
  event.currentTarget.src = fallback;
}

export default function TheatreHome({ cityImages = {} }) {
  const cityVisuals = {
    kerala: imageWithFallback(cityImages.kerala, HOMEPAGE_FALLBACK_IMAGES.kerala),
    lucknow: imageWithFallback(cityImages.lucknow, HOMEPAGE_FALLBACK_IMAGES.lucknow),
    mumbai: HOMEPAGE_FALLBACK_IMAGES.mumbai,
  };

  const collage = [
    cityVisuals.kerala,
    cityVisuals.lucknow,
    cityVisuals.mumbai,
    HOMEPAGE_FALLBACK_IMAGES.cinema,
  ];

  const heroSrc = imageWithFallback(collage[0], HOMEPAGE_FALLBACK_IMAGES.hero);
  const operaSrc = imageWithFallback(collage[1], HOMEPAGE_FALLBACK_IMAGES.opera);

  return (
    <div className="theatre-page relative min-h-screen overflow-x-hidden">
      <div className="theatre-grain" aria-hidden />
      <div className="theatre-vignette" aria-hidden />
      <TheatreNav />
      <RainEffect />

      {/* HERO */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroSrc}
            alt=""
            className="h-full w-full object-cover scale-105"
            onError={(event) => handleImageFallback(event, HOMEPAGE_FALLBACK_IMAGES.hero)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0d0907]/40 via-[#1a120c]/70 to-[#0d0907]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0d0907_85%)]" />
        </div>

        <div className="theatre-hero__candle absolute bottom-[18%] left-[12%] h-32 w-32 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="theatre-hero__candle absolute right-[15%] top-[25%] h-24 w-24 rounded-full bg-amber-500/15 blur-2xl animation-delay-2000" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-28 text-center md:px-10">
          <div className="theatre-glass mx-auto max-w-3xl rounded-2xl px-8 py-14 md:px-14 md:py-16">
            <p className="mb-4 text-[11px] uppercase tracking-[0.45em] text-[#c9a962]/90">
              Kerala - Mumbai - Lucknow
            </p>
            <h1 className="font-serif text-4xl font-light leading-[1.15] text-[#f5efe4] md:text-6xl lg:text-7xl">
              Where Every City
              <br />
              <span className="italic text-[#c9a962]">Became A Chapter</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#f5efe4]/70 md:text-lg">
              A forgotten world where Kerala rain, Mumbai chaos, and Lucknow poetry speak through light, music, cinema, and memory.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/gallery/kerala" className="theatre-btn">
                Explore Videos
              </Link>
              <Link href="/cinema" className="theatre-btn theatre-btn--outline">
                Watch A Story
              </Link>
              <Link href="/music" className="theatre-btn theatre-btn--ghost">
                Relax With Music
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-[#c9a962]/50">
          Scroll to enter
        </div>
      </section>

      {/* STORY */}
      <section id="cultures" className="relative border-y border-[#c9a962]/10 bg-[#1a120c] py-24 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 md:grid-cols-2 md:px-10 md:gap-20">
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-[#c9a962]/70">Life Journey</p>
            <h2 className="font-serif text-3xl leading-snug text-[#f5efe4] md:text-5xl md:leading-tight">
              We Bring <span className="theatre-highlight">Chapters</span> From Every Corner Of A <span className="theatre-highlight">Life</span>
            </h2>
            <p className="mt-8 text-base leading-8 text-[#f5efe4]/65">
              Kerala rain softened his edges and taught him the quiet language of reflection; the monsoon taught silence and how memory settles like water. Mumbai&apos;s speed-endless roads, sleepless nights, airports and neon-stained crowds-breathed a hard routine into his days. Lucknow offered the hush of nawabi poetry, gentle architecture, and a depth of feeling that made loneliness an intimate tutor.
            </p>
            <p className="mt-4 text-base leading-8 text-[#f5efe4]/50">
              This is a memory journal rather than a program: three cities, three chapters, one life stitched together by small, stubborn moments.
            </p>
          </div>

          <div className="relative grid grid-cols-2 gap-3">
            {collage.slice(0, 4).map((src, i) => (
              <div
                key={i}
                className={`theatre-gallery__item overflow-hidden rounded-lg border border-[#c9a962]/10 ${
                  i === 0 ? 'col-span-2 h-56' : 'h-44'
                }`}
              >
                <HQImage
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  priority={i === 0}
                  onError={(event) => handleImageFallback(event, collage[(i + 1) % collage.length])}
                />
              </div>
            ))}
            <div
              className="pointer-events-none absolute inset-0 rounded-lg opacity-30 mix-blend-overlay"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23c9a962\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              }}
            />
          </div>
        </div>
      </section>

      {/* OPERA HALL */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img
          src={operaSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={(event) => handleImageFallback(event, HOMEPAGE_FALLBACK_IMAGES.opera)}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0907] via-[#0d0907]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0907] via-transparent to-[#0d0907]/30" />

        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="theatre-particle"
            style={{
              left: `${10 + i * 7}%`,
              top: `${20 + (i % 4) * 18}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}

        <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-16">
          <p className="mb-2 text-[11px] uppercase tracking-[0.4em] text-[#c9a962]/80">The Hall</p>
          <h2 className="font-serif text-4xl text-[#f5efe4] md:text-6xl">An Unforgettable Experience</h2>
          <p className="mt-4 max-w-lg text-[#f5efe4]/60">
            Let me take you through the chapters I lived across three cities - through rain, roads, airports, poetry, loneliness, cinema, music, and memories that never truly left me.
          </p>
          <Link
            href="/gallery/lucknow"
            className="mt-8 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a962]/40 text-[#c9a962] transition-all hover:bg-[#c9a962]/10"
            aria-label="Explore gallery"
          >
            {'->'}
          </Link>
        </div>
      </section>

      {/* SHOWS */}
      <section id="performances" className="bg-[#0d0907] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="mb-16 text-center">
            <p className="text-[11px] uppercase tracking-[0.4em] text-[#c9a962]/70">Season Programme</p>
            <h2 className="mt-3 font-serif text-4xl text-[#f5efe4] md:text-5xl">Our Upcoming Chapters</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {SHOWS.map((show) => (
              <Link key={show.title} href={show.href} className="theatre-card group overflow-hidden rounded-2xl">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={show.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(event) => handleImageFallback(event, HOMEPAGE_FALLBACK_IMAGES[show.city.toLowerCase()] || HOMEPAGE_FALLBACK_IMAGES.music)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0907] via-[#0d0907]/20 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-[#c9a962]/30 bg-[#0d0907]/60 px-3 py-1 text-[10px] uppercase tracking-widest text-[#c9a962] backdrop-blur">
                    {show.city}
                  </span>
                </div>
                <div className="p-8">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#c47a3a]">{show.genre}</p>
                  <h3 className="mt-2 font-serif text-2xl text-[#f5efe4]">{show.title}</h3>
                  <p className="mt-1 text-sm text-[#c9a962]/60">{show.dates}</p>
                  <p className="mt-4 text-sm leading-7 text-[#f5efe4]/55">{show.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="border-y border-[#c9a962]/10 bg-[#1a120c] py-24 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <h2 className="text-center font-serif text-4xl text-[#f5efe4] md:text-5xl">Artistic Journey</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[#f5efe4]/55">
            Three cities, three forms-Kerala, Mumbai, Lucknow-each marking a chapter and a way of being.
          </p>

          <div className="mt-16 hidden md:block">
            <div className="theatre-timeline__line mb-8" />
            <div className="grid grid-cols-3 gap-8 justify-items-center">
              {JOURNEY.map((stop) => (
                <Link key={stop.place} href={stop.href} className="theatre-journey-card group text-center">
                  <img
                    src={stop.image}
                    alt=""
                    className="theatre-journey-card__image"
                    loading="lazy"
                    onError={(event) => handleImageFallback(event, HOMEPAGE_FALLBACK_IMAGES[stop.place.toLowerCase()])}
                  />
                  <div className="theatre-journey-card__shade" />
                  <div className="theatre-journey-card__content">
                    <div className="theatre-journey__dot mx-auto mb-4 transition-transform group-hover:scale-125" />
                    <p className="font-serif text-lg text-[#c9a962]">{stop.place}</p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-[#f5efe4]/70">{stop.form}</p>
                    <p className="mt-2 text-[11px] italic text-[#f5efe4]/55">{stop.emotion}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12 space-y-6 md:hidden">
            {JOURNEY.map((stop) => (
              <Link
                key={stop.place}
                href={stop.href}
                className="theatre-card relative flex items-center gap-6 overflow-hidden rounded-xl p-6"
              >
                <img
                  src={stop.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-25"
                  loading="lazy"
                  onError={(event) => handleImageFallback(event, HOMEPAGE_FALLBACK_IMAGES[stop.place.toLowerCase()])}
                />
                <span className="absolute inset-0 bg-[#0d0907]/70" />
                <div className="theatre-journey__dot relative z-10 shrink-0" />
                <div className="relative z-10">
                  <p className="font-serif text-xl text-[#c9a962]">{stop.place}</p>
                  <p className="text-sm text-[#f5efe4]/60">{stop.form}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="artists" className="bg-[#0d0907] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <h2 className="font-serif text-4xl text-[#f5efe4] md:text-5xl">Human Stories</h2>
          <p className="mt-3 max-w-xl text-[#f5efe4]/55">Voices from the audience, the aisle, the rain.</p>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="theatre-card rounded-2xl p-8">
                <div className="mb-6 flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full border border-[#c9a962]/30">
                    <img
                      src={t.image}
                      alt=""
                      className="h-full w-full object-cover sepia-[0.2]"
                      onError={(event) => handleImageFallback(event, HOMEPAGE_FALLBACK_IMAGES.author)}
                    />
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

      {/* GALLERY */}
      <section className="bg-[#1a120c] py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <h2 className="font-serif text-4xl text-[#f5efe4] md:text-5xl">Memory Archive</h2>
          <p className="mt-3 text-[#f5efe4]/55">Handheld frames, half-lit rooms, and the small objects that carry entire afternoons.</p>

          <div className="mt-12 columns-2 gap-4 md:columns-3">
            {DEFAULT_GALLERY.map((item, i) => (
              <div
                key={item.src || i}
                className={`theatre-gallery__item mb-4 break-inside-avoid overflow-hidden rounded-lg border border-[#c9a962]/10 ${
                  item.tall ? 'aspect-[3/4]' : 'aspect-square'
                } relative`}
              >
                <img
                  src={item.src}
                  alt={item.title || ''}
                  className="h-full w-full object-cover"
                  loading={i < 6 ? 'eager' : 'lazy'}
                  decoding="async"
                  onError={(event) => handleImageFallback(event, DEFAULT_GALLERY[(i + 1) % DEFAULT_GALLERY.length]?.src || HOMEPAGE_FALLBACK_IMAGES.hero)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="border-t border-[#c9a962]/15 bg-[#0d0907] py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <span className="theatre-emblem flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a962]/40 text-xl text-[#c9a962]">
                  *
                </span>
                <div>
                  <p className="font-serif text-xl text-[#f5efe4]">Sparkle to Life</p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a962]/60">A Life in Three Cities</p>
                </div>
              </div>
              <p className="theatre-handwritten mt-6 text-sm leading-relaxed">&ldquo;The Curtain Never Falls. It Only Changes Cities.&rdquo;</p>
            </div>

            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#c9a962]/70">Explore</p>
              <nav className="flex flex-col gap-2 text-sm text-[#f5efe4]/60">
                <Link href="/kerala" className="hover:text-[#c9a962]">Kerala</Link>
                <Link href="/mumbai" className="hover:text-[#c9a962]">Mumbai</Link>
                <Link href="/lucknow" className="hover:text-[#c9a962]">Lucknow</Link>
                <Link href="/music" className="hover:text-[#c9a962]">Music</Link>
                <Link href="/cinema" className="hover:text-[#c9a962]">Cinema</Link>
              </nav>
            </div>

            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#c9a962]/70">Connect</p>
              <p className="mb-4 text-sm text-[#f5efe4]/55">For press, requests, or to share a memory.</p>
              <p className="text-sm text-[#f5efe4]/55">Email: hello@sparkletolife.example</p>
            </div>
          </div>

          <p className="mt-16 border-t border-[#c9a962]/10 pt-8 text-center text-xs text-[#f5efe4]/35">
            © 2026 - My Life
          </p>
        </div>
      </footer>
    </div>
  );
}

