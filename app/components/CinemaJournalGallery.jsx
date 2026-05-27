'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

function formatTime(seconds = 0) {
  if (!Number.isFinite(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${minutes}:${rest}`;
}

function waitForMediaEvent(target, eventName, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      cleanup();
      reject(new Error(`Timed out waiting for ${eventName}`));
    }, timeout);

    const cleanup = () => {
      window.clearTimeout(timer);
      target.removeEventListener(eventName, resolveEvent);
      target.removeEventListener('error', rejectEvent);
    };

    const resolveEvent = () => {
      cleanup();
      resolve();
    };

    const rejectEvent = () => {
      cleanup();
      reject(new Error(`Video failed while waiting for ${eventName}`));
    };

    target.addEventListener(eventName, resolveEvent, { once: true });
    target.addEventListener('error', rejectEvent, { once: true });
  });
}

function scoreFrame(context, width, height) {
  const { data } = context.getImageData(0, 0, width, height);
  let brightness = 0;
  let contrast = 0;
  let saturation = 0;
  const samples = Math.max(1, Math.floor(data.length / 4));

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const light = (r + g + b) / 3;
    brightness += light;
    saturation += max - min;
  }

  brightness /= samples;
  saturation /= samples;

  for (let i = 0; i < data.length; i += 16) {
    const light = (data[i] + data[i + 1] + data[i + 2]) / 3;
    contrast += Math.abs(light - brightness);
  }

  contrast /= Math.max(1, samples / 4);

  if (brightness < 18 || brightness > 242) return -1;
  const balancedLight = 100 - Math.abs(125 - brightness);
  return balancedLight + contrast * 1.35 + saturation * 0.65;
}

async function captureBestVideoFrame(src) {
  const video = document.createElement('video');
  video.src = src;
  video.muted = true;
  video.playsInline = true;
  video.preload = 'metadata';
  video.load();

  await waitForMediaEvent(video, 'loadedmetadata');

  const width = 420;
  const ratio = video.videoWidth && video.videoHeight ? video.videoHeight / video.videoWidth : 9 / 16;
  const height = Math.max(236, Math.round(width * ratio));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) throw new Error('Canvas unavailable');

  const duration = Number.isFinite(video.duration) && video.duration > 1 ? video.duration : 4;
  const sampleTimes = [0.12, 0.24, 0.38, 0.56, 0.74, 0.88].map((point) =>
    Math.min(Math.max(0.1, duration * point), Math.max(0.1, duration - 0.2))
  );

  let bestFrame = '';
  let bestScore = -Infinity;

  for (const time of sampleTimes) {
    video.currentTime = time;
    await waitForMediaEvent(video, 'seeked');
    context.drawImage(video, 0, 0, width, height);
    const score = scoreFrame(context, width, height);
    if (score > bestScore) {
      bestScore = score;
      bestFrame = canvas.toDataURL('image/jpeg', 0.82);
    }
  }

  if (!bestFrame) {
    video.currentTime = Math.min(0.4, duration);
    await waitForMediaEvent(video, 'seeked');
    context.drawImage(video, 0, 0, width, height);
    bestFrame = canvas.toDataURL('image/jpeg', 0.82);
  }

  video.removeAttribute('src');
  video.load();
  return bestFrame;
}

export default function CinemaJournalGallery({ videos }) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(24);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [featuredVideoId, setFeaturedVideoId] = useState(videos[0]?.id || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoSize, setVideoSize] = useState({ width: 16, height: 9 });
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [thumbnails, setThumbnails] = useState({});
  const playerRef = useRef(null);
  const shouldAutoPlayRef = useRef(false);

  const categories = useMemo(() => ['All', ...Array.from(new Set(videos.map((video) => video.category)))], [videos]);

  const filteredVideos = useMemo(() => {
    const search = query.trim().toLowerCase();
    return videos.filter((video) => {
      const matchesCategory = activeCategory === 'All' || video.category === activeCategory;
      const haystack = [
        video.title,
        video.fileName,
        video.category,
        video.location,
        video.description,
        video.story,
        video.keywords.join(' '),
      ].join(' ').toLowerCase();
      return matchesCategory && (!search || haystack.includes(search));
    });
  }, [activeCategory, query, videos]);

  const visibleVideos = filteredVideos.slice(0, visibleCount);
  const activeVideo = activeVideoId === null ? null : videos.find((video) => video.id === activeVideoId);
  const featuredVideo = videos.find((video) => video.id === featuredVideoId) || videos[0];
  const reelVideos = videos.slice().reverse().slice(0, 10);
  const cardStyles = ['poster', 'contact', 'polaroid', 'strip', 'note', 'plaque'];
  const priorityVideos = useMemo(() => {
    const nextActiveIndex = activeVideo ? videos.findIndex((video) => video.id === activeVideo.id) + 1 : 1;
    return [featuredVideo, activeVideo, videos[nextActiveIndex % videos.length]]
      .filter(Boolean)
      .filter((video, index, list) => list.findIndex((item) => item.id === video.id) === index);
  }, [activeVideo, featuredVideo, videos]);

  const collectionSections = useMemo(() => {
    const sections = [
      {
        key: 'recent',
        title: 'Recently Preserved',
        note: 'Freshly restored moments from the private archive.',
        videos: visibleVideos.slice(0, 4),
        style: 'mixed',
      },
      {
        key: 'essays',
        title: 'Visual Essays',
        note: 'Frames that observe light, architecture, rhythm, and silence.',
        videos: visibleVideos.filter((video) => /visual|documentary|essay/i.test(video.category)),
        style: 'essay',
      },
      {
        key: 'travel',
        title: 'Travel Chapters',
        note: 'Journeys kept in motion, weather, roads, and city glow.',
        videos: visibleVideos.filter((video) => /travel|street|nature/i.test(video.category)),
        style: 'strip',
      },
      {
        key: 'life',
        title: 'Life Chapters',
        note: 'Small human pauses held gently inside the larger journey.',
        videos: visibleVideos.filter((video) => /life|memories|culture|short/i.test(video.category)),
        style: 'polaroid',
      },
      {
        key: 'archive',
        title: 'Archive Collection',
        note: 'A museum wall of films gathered across places and seasons.',
        videos: visibleVideos,
        style: 'plaque',
      },
    ];

    return sections.filter((section) => section.videos.length > 0);
  }, [visibleVideos]);

  useEffect(() => {
    setVisibleCount(24);
  }, [query, activeCategory]);

  useEffect(() => {
    let cancelled = false;
    const missingVideos = videos.filter((video) => !(video.id in thumbnails));
    if (missingVideos.length === 0) return undefined;

    (async () => {
      const priorityIds = new Set(videos.slice(0, 8).map((video) => video.id));
      const orderedVideos = missingVideos.sort((a, b) => Number(priorityIds.has(b.id)) - Number(priorityIds.has(a.id)));
      const workers = Array.from({ length: Math.min(3, orderedVideos.length) }, async (_, workerIndex) => {
        for (let index = workerIndex; index < orderedVideos.length; index += 3) {
          const video = orderedVideos[index];
          try {
            const thumbnail = await captureBestVideoFrame(video.src);
            if (!cancelled) {
              setThumbnails((current) => ({ ...current, [video.id]: thumbnail }));
            }
          } catch {
            if (!cancelled) {
              setThumbnails((current) => ({ ...current, [video.id]: null }));
            }
          }
        }
      });
      await Promise.all(workers);
    })();

    return () => {
      cancelled = true;
    };
  }, [thumbnails, videos]);

  useEffect(() => {
    const video = playerRef.current;
    if (!video || !activeVideo) return undefined;

    video.pause();
    video.load();
    video.volume = volume;
    video.muted = false;
    video.defaultMuted = false;
    video.playbackRate = speed;
    setCurrentTime(0);
    setDuration(0);
    setVideoReady(false);
    setVideoError(false);
    setVideoSize({ width: 16, height: 9 });
    setIsPlaying(false);

    const playWhenReady = async () => {
      if (!shouldAutoPlayRef.current) return;
      shouldAutoPlayRef.current = false;
      try {
        video.muted = false;
        video.defaultMuted = false;
        video.volume = volume;
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    video.addEventListener('loadedmetadata', playWhenReady, { once: true });
    video.addEventListener('canplay', playWhenReady, { once: true });

    return () => {
      video.removeEventListener('loadedmetadata', playWhenReady);
      video.removeEventListener('canplay', playWhenReady);
      video.pause();
      video.currentTime = 0;
    };
  }, [activeVideo]);

  useEffect(() => {
    if (!playerRef.current) return;
    playerRef.current.volume = volume;
    playerRef.current.muted = muted;
  }, [muted, volume]);

  useEffect(() => {
    if (!playerRef.current) return;
    playerRef.current.playbackRate = speed;
  }, [speed]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (!activeVideo) return;
      if (event.key === 'Escape') closePlayer();
      if (event.key === 'ArrowLeft') goToVideo(-1);
      if (event.key === 'ArrowRight') goToVideo(1);
      if (event.key === ' ') {
        event.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const closePlayer = () => {
    shouldAutoPlayRef.current = false;
    const video = playerRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setIsPlaying(false);
    setActiveVideoId(null);
  };

  const openVideo = (videoId, autoPlay = true) => {
    const video = playerRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    shouldAutoPlayRef.current = autoPlay;
    setFeaturedVideoId(videoId);
    setActiveVideoId(videoId);
  };

  const togglePlay = async () => {
    const video = playerRef.current;
    if (!video) return;
    if (video.paused) {
      await video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const goToVideo = (direction) => {
    setActiveVideoId((id) => {
      if (id === null) return id;
      const list = filteredVideos.some((video) => video.id === id) ? filteredVideos : videos;
      const currentIndex = list.findIndex((video) => video.id === id);
      if (currentIndex === -1 || list.length === 0) return id;
      const nextId = list[(currentIndex + direction + list.length) % list.length].id;
      shouldAutoPlayRef.current = true;
      setFeaturedVideoId(nextId);
      return nextId;
    });
  };

  const seekTo = (value) => {
    const video = playerRef.current;
    if (!video) return;
    video.currentTime = Number(value);
    setCurrentTime(video.currentTime);
  };

  const handlePlayerMetadata = (event) => {
    const video = event.currentTarget;
    setDuration(video.duration);
    if (video.videoWidth && video.videoHeight) {
      setVideoSize(
        activeVideo?.rotation === -90
          ? { width: video.videoHeight, height: video.videoWidth }
          : { width: video.videoWidth, height: video.videoHeight }
      );
    }
  };

  const changeVolume = (value) => {
    const nextVolume = Number(value);
    setVolume(nextVolume);
    setMuted(nextVolume === 0);
    if (playerRef.current) {
      playerRef.current.volume = nextVolume;
      playerRef.current.muted = nextVolume === 0;
    }
  };

  const toggleMute = () => {
    setMuted((value) => {
      if (playerRef.current) playerRef.current.muted = !value;
      return !value;
    });
  };

  const changeSpeed = (value) => {
    const nextSpeed = Number(value);
    setSpeed(nextSpeed);
    if (playerRef.current) playerRef.current.playbackRate = nextSpeed;
  };

  const enterFullscreen = () => {
    const video = playerRef.current;
    if (video?.requestFullscreen) video.requestFullscreen();
  };

  const renderVideoVisual = (video, className = '', includePreview = true) => (
    <span className={`cinema-video-card__media ${className}`.trim()}>
      {thumbnails[video.id] ? (
        <img className={video.rotation === -90 ? 'cinema-media-rotate-left' : ''} src={thumbnails[video.id]} alt={`${video.title} frame from the film`} loading="eager" decoding="async" />
      ) : (
        <video className={`cinema-video-card__fallback-frame ${video.rotation === -90 ? 'cinema-media-rotate-left' : ''}`} src={video.src} muted playsInline preload="auto" />
      )}
      {includePreview && <video className={`cinema-video-card__preview ${video.rotation === -90 ? 'cinema-media-rotate-left' : ''}`} src={video.src} muted loop playsInline preload="metadata" aria-hidden />}
      <span className="cinema-video-card__play" aria-hidden>Play</span>
    </span>
  );

  const detailLine = (video, index) => {
    const options = [
      `${video.duration || 'Film'} - ${video.location}`,
      `${video.category} - Chapter ${String(index + 1).padStart(2, '0')}`,
      `${video.location} - ${video.year || 'Archive'}`,
      `${video.location} Collection - ${video.category}`,
      `${video.duration || 'Film'} - Lumina Archive`,
    ];
    return options[index % options.length];
  };

  const renderCinemaCard = (video, index, preferredStyle) => {
    const style = preferredStyle === 'mixed' ? cardStyles[index % cardStyles.length] : preferredStyle;
    return (
      <button
        key={`${video.id}-${style}-${index}`}
        type="button"
        className={`cinema-video-card cinema-video-card--${video.shape} cinema-video-card--${style}`}
        onClick={() => openVideo(video.id)}
        onMouseEnter={playCardPreview}
        onMouseLeave={stopCardPreview}
        onFocus={playCardPreview}
        onBlur={stopCardPreview}
        aria-label={`Open ${video.title}`}
      >
        {renderVideoVisual(video)}
        {style === 'contact' && (
          <span className="cinema-video-card__contact-strip" aria-hidden>
            <i>{thumbnails[video.id] && <img src={thumbnails[video.id]} alt="" />}</i>
            <i>{thumbnails[video.id] && <img src={thumbnails[video.id]} alt="" />}</i>
            <i>{thumbnails[video.id] && <img src={thumbnails[video.id]} alt="" />}</i>
          </span>
        )}
        <span className="cinema-video-card__front">
          <strong>{video.title}</strong>
          <small>{detailLine(video, index)}</small>
        </span>
        <span className="cinema-video-card__details">
          <strong>{video.title}</strong>
          <small>{video.category} - {video.location}</small>
          <em>{style === 'note' ? video.description : detailLine(video, index + 2)}</em>
        </span>
      </button>
    );
  };

  const playCardPreview = (event) => {
    const preview = event.currentTarget.querySelector('.cinema-video-card__preview');
    if (!preview) return;
    preview.currentTime = Math.min(preview.duration || 0, 0.1);
    preview.play().catch(() => {});
  };

  const stopCardPreview = (event) => {
    const preview = event.currentTarget.querySelector('.cinema-video-card__preview');
    if (!preview) return;
    preview.pause();
    preview.currentTime = 0;
  };

  return (
    <main className="cinema-journal-page">
      <div className="cinema-priority-preloads" aria-hidden>
        {priorityVideos.map((video) => (
          <video key={video.id} src={video.src} muted playsInline preload="auto" />
        ))}
      </div>
      <div className="cinema-journal-grain" aria-hidden />
      <div className="cinema-page-atmosphere" aria-hidden>
        <span />
        <span />
        <span />
        <span />
      </div>
      <section className="cinema-journal-hero">
        <div className="cinema-journal-hero__glow" aria-hidden />
        <div className="cinema-floating-elements" aria-hidden>
          <span className="cinema-float cinema-float--strip" />
          <span className="cinema-float cinema-float--reel" />
          <span className="cinema-float cinema-float--slate" />
          <span className="cinema-float cinema-float--frame" />
          <span className="cinema-float cinema-float--count">8</span>
        </div>
        <div className="cinema-journal-hero__copy">
          <p>Private Film Archive</p>
          <h1>Cinema Journal</h1>
          <span>Frames collected through journeys, people, silence, and movement.</span>
          <em>A collection of moments that refused to disappear.</em>
        </div>
        {featuredVideo && (
          <button
            type="button"
            className="cinema-featured-film"
            onClick={() => openVideo(featuredVideo.id)}
            aria-label={`Play featured film ${featuredVideo.title}`}
          >
            <span className="cinema-featured-film__arch">
              <small>Featured Film</small>
              {renderVideoVisual(featuredVideo, 'cinema-featured-film__media', false)}
              <span className="cinema-featured-film__caption">
                <strong>{featuredVideo.title}</strong>
                <em>{featuredVideo.category} - {featuredVideo.duration || 'Film'}</em>
                <b>Watch</b>
              </span>
            </span>
          </button>
        )}
      </section>

      <section className="cinema-film-strip" aria-label="Latest cinema reels">
        <div>
          <p>Latest Films</p>
          <h2>Recently Preserved</h2>
          <span>A collection of visual memories gathered through time.</span>
        </div>
        <strong>{videos.length} Films</strong>
        <div className="cinema-film-strip__reel">
          {reelVideos.map((video) => (
            <button key={video.id} type="button" onClick={() => openVideo(video.id)} aria-label={`Open ${video.title}`}>
              {thumbnails[video.id] ? (
                <img className={video.rotation === -90 ? 'cinema-media-rotate-left' : ''} src={thumbnails[video.id]} alt={`${video.title} film frame`} loading="eager" decoding="async" />
              ) : (
                <video className={video.rotation === -90 ? 'cinema-media-rotate-left' : ''} src={video.src} muted playsInline preload="auto" />
              )}
              <span>{video.title}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="cinema-journal-controls" aria-label="Cinema journal search and filters">
        <label className="cinema-journal-search">
          <span>Search the archive...</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the archive..."
            aria-label="Search films, stories, moments"
          />
        </label>
        <div className="cinema-journal-filter-row">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={activeCategory === category ? 'is-active' : ''}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <p>{filteredVideos.length} Films Collected Across Journeys</p>
      </section>

      <div className="cinema-collections" aria-label="Cinema journal collections">
        {collectionSections.map((section) => (
          <section key={section.key} className={`cinema-collection-section cinema-collection-section--${section.style}`}>
            <header>
              <p>{section.title}</p>
              <h2>{section.note}</h2>
            </header>
            <div className="cinema-collection-grid">
              {section.videos.map((video, index) => renderCinemaCard(video, index, section.style))}
            </div>
          </section>
        ))}
      </div>

      {visibleCount < filteredVideos.length && (
        <div className="cinema-journal-load">
          <button type="button" onClick={() => setVisibleCount((count) => count + 24)}>
            Load More Films
          </button>
        </div>
      )}

      <footer className="cinema-journal-footer">
        <div className="cinema-footer-glow" aria-hidden />
        <section>
          <div>
            <h2>Cinema Journal</h2>
            <p>Visual Storytelling Archive</p>
            <span>Stories preserved through light, movement, and memory.</span>
          </div>
          <nav aria-label="Cinema footer navigation">
            <Link href="/cinema">Films</Link>
            <Link href="/kerala">Travel</Link>
            <Link href="/journal">Essays</Link>
            <Link href="/">Archive</Link>
          </nav>
          <blockquote>Every frame leaves something behind.</blockquote>
        </section>
        <p className="cinema-journal-footer__copyright">© 2026 - My Life</p>
      </footer>

      {activeVideo && (
        <div className="cinema-floating-viewer" role="dialog" aria-modal="true" aria-labelledby="cinema-player-title">
          <button type="button" className="cinema-floating-viewer__backdrop" onClick={closePlayer} aria-label="Close cinema viewer" />
          <article className="cinema-floating-viewer__window">
            <button type="button" className="cinema-floating-viewer__close" onClick={closePlayer} aria-label="Close cinema viewer">
              ×
            </button>
            <div className="cinema-player__screen">
              <div
                className={`cinema-player__viewport ${videoSize.height > videoSize.width ? 'is-portrait' : ''}`}
                style={{ '--video-aspect': `${videoSize.width} / ${videoSize.height}` }}
              >
                {thumbnails[activeVideo.id] && !videoReady && !videoError && (
                  <img className={`cinema-player__poster ${activeVideo.rotation === -90 ? 'cinema-media-rotate-left' : ''}`} src={thumbnails[activeVideo.id]} alt={`${activeVideo.title} loading frame`} />
                )}
                {videoError ? (
                  <div className="cinema-player__error">Film unavailable</div>
                ) : (
                  <video
                    className={activeVideo.rotation === -90 ? 'cinema-media-rotate-left' : ''}
                    ref={playerRef}
                    src={activeVideo.src}
                    playsInline
                    muted={false}
                    preload="auto"
                    onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                    onLoadedMetadata={handlePlayerMetadata}
                    onLoadedData={() => setVideoReady(true)}
                    onCanPlay={() => setVideoReady(true)}
                    onError={() => setVideoError(true)}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                  />
                )}
              </div>
              <div className="cinema-player__controls">
                <button type="button" className="cinema-player__primary" onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
                <span>{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  step="0.1"
                  value={Math.min(currentTime, duration || 0)}
                  onChange={(event) => seekTo(event.target.value)}
                  aria-label="Seek video"
                />
                <span>{formatTime(duration || 0)}</span>
                <button type="button" onClick={toggleMute} aria-label={muted ? 'Unmute video' : 'Mute video'}>{muted ? 'Muted' : 'Sound'}</button>
                <input
                  className="cinema-player__volume"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={muted ? 0 : volume}
                  onChange={(event) => changeVolume(event.target.value)}
                  aria-label="Volume"
                />
                <select value={speed} onChange={(event) => changeSpeed(event.target.value)} aria-label="Playback speed">
                  <option value="0.75">0.75x</option>
                  <option value="1">1x</option>
                  <option value="1.25">1.25x</option>
                  <option value="1.5">1.5x</option>
                </select>
                <button type="button" onClick={enterFullscreen}>Fullscreen</button>
              </div>
              <div className="cinema-player__minimal-info">
                <h2 id="cinema-player-title">{activeVideo.title}</h2>
                <p>{activeVideo.category}</p>
                <span>{activeVideo.location}</span>
              </div>
              <nav className="cinema-floating-viewer__arrows" aria-label="Film navigation">
                <button type="button" onClick={() => goToVideo(-1)}>Previous Film</button>
                <button type="button" onClick={() => goToVideo(1)}>Next Film</button>
              </nav>
            </div>
          </article>
        </div>
      )}

    </main>
  );
}


