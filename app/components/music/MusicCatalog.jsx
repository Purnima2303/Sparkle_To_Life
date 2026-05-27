'use client';

import { useContext, useMemo, useState } from 'react';
import { MusicContext } from '../../contexts/MusicContext';

const CATEGORY_ORDER = ['English', 'Hindi', 'Malayalam', 'Tamil', 'Instrumental'];
const CHAPTERS = [
  { name: 'Late Night Drives', hints: ['slow', 'time', 'down', 'dark', 'night'] },
  { name: 'Monsoon Memories', hints: ['rain', 'kaalam', 'povukayanu', 'poonthinkale', 'veendum'] },
  { name: 'Cinema & Rain', hints: ['khairiyat', 'ishq', 'tera', 'khuda', 'rihaayi'] },
  { name: 'Midnight Echoes', hints: ['echo', 'vijanamoru', 'hima', 'pin nilavil', 'sadaa'] },
  { name: 'Instrumental Escapes', hints: ['violin', 'guitar', 'atmosphere', 'love', 'drifting'] },
];

function PlayIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6 5h4v14H6V5Zm8 0h4v14h-4V5Z" />
    </svg>
  );
}

function Waveform({ active }) {
  return (
    <span className={`archive-waveform ${active ? 'archive-waveform--active' : ''}`} aria-hidden>
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function TrackRow({ track, isActive, isPlaying, onPlay, compact = false }) {
  return (
    <button
      type="button"
      onClick={() => onPlay(track)}
      className={`music-track-row ${isActive ? 'music-track-row--active' : ''} ${compact ? 'music-track-row--compact' : ''}`}
      aria-label={`${isActive && isPlaying ? 'Pause' : 'Play'} ${track.title} by ${track.artist}`}
    >
      <span className="music-track-row__icon">
        {isActive && isPlaying ? <PauseIcon className="h-3.5 w-3.5" /> : <PlayIcon className="h-3.5 w-3.5" />}
      </span>
      <span className="music-track-row__copy">
        <span className="music-track-row__title">{track.title}</span>
        <span className="music-track-row__artist">{track.artist}</span>
      </span>
      <Waveform active={isActive && isPlaying} />
    </button>
  );
}

function createChapters(tracks) {
  return CHAPTERS.map((chapter) => {
    const chapterTracks = tracks.filter((track) => {
      const haystack = `${track.title} ${track.artist} ${track.category}`.toLowerCase();
      return chapter.hints.some((hint) => haystack.includes(hint));
    });
    return { ...chapter, tracks: chapterTracks.slice(0, 5) };
  }).filter((chapter) => chapter.tracks.length);
}

function groupArtists(tracks) {
  const groups = tracks.reduce((acc, track) => {
    if (!acc[track.artist]) acc[track.artist] = [];
    acc[track.artist].push(track);
    return acc;
  }, {});

  return Object.entries(groups)
    .filter(([, artistTracks]) => artistTracks.length > 1 && artistTracks[0].artist !== 'Archive Recording')
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 4);
}

function pickFeatured(tracks) {
  return tracks
    .filter((track) => ['Khairiyat', 'Let Me Down Slowly', 'Time', 'Bangalore Days', 'Raga Sindhooram'].includes(track.title))
    .concat(tracks.slice(0, 5))
    .filter((track, index, all) => all.findIndex((item) => item.id === track.id) === index)
    .slice(0, 4);
}

export default function MusicCatalog() {
  const { tracks, currentTrack, isPlaying, playTrack } = useContext(MusicContext);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const present = new Set(tracks.map((track) => track.category));
    return CATEGORY_ORDER.filter((category) => present.has(category));
  }, [tracks]);

  const filteredTracks = useMemo(() => {
    if (activeCategory === 'All') return tracks;
    return tracks.filter((track) => track.category === activeCategory);
  }, [activeCategory, tracks]);

  const chapters = useMemo(() => createChapters(filteredTracks), [filteredTracks]);
  const artists = useMemo(() => groupArtists(filteredTracks), [filteredTracks]);
  const featured = useMemo(() => pickFeatured(filteredTracks), [filteredTracks]);
  const instrumentals = useMemo(() => filteredTracks.filter((track) => track.category === 'Instrumental'), [filteredTracks]);

  const handlePlay = (track) => {
    const index = tracks.findIndex((item) => item.id === track.id);
    if (index >= 0) playTrack(index);
  };

  const isActive = (track) => currentTrack?.id === track.id;

  if (!tracks.length) {
    return (
      <div className="music-archive-empty">
        <p>Music Archive</p>
        <h2>Select a track to begin listening.</h2>
      </div>
    );
  }

  return (
    <div className="music-archive">
      <nav className="music-category-bar" aria-label="Music categories">
        {['All', ...categories].map((category) => (
          <button
            type="button"
            key={category}
            className={`music-category-pill music-category-pill--${category.toLowerCase()} ${
              activeCategory === category ? 'music-category-pill--active' : ''
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>

      {featured.length > 0 && (
        <section className="music-section music-featured" aria-labelledby="featured-tracks-title">
          <div className="music-section__header">
            <p>Featured Tracks</p>
            <h2 id="featured-tracks-title">Preserved Moments</h2>
          </div>
          <div className="music-featured__grid">
            {featured.map((track, index) => (
              <button
                type="button"
                key={track.id}
                onClick={() => handlePlay(track)}
                className={`featured-vinyl-card ${isActive(track) ? 'featured-vinyl-card--active' : ''}`}
              >
                <span className="featured-vinyl-card__disc" aria-hidden />
                <span className="featured-vinyl-card__number">{String(index + 1).padStart(2, '0')}</span>
                <strong>{track.title}</strong>
                <em>{track.artist}</em>
              </button>
            ))}
          </div>
        </section>
      )}

      {chapters.length > 0 && (
        <section className="music-section" aria-labelledby="listening-chapters-title">
          <div className="music-section__header">
            <p>Listening Chapters</p>
            <h2 id="listening-chapters-title">Emotional Collections</h2>
          </div>
          <div className="music-chapters">
            {chapters.map((chapter) => (
              <article key={chapter.name} className="music-chapter-card">
                <span className="music-chapter-card__line" aria-hidden />
                <h3>{chapter.name}</h3>
                <div>
                  {chapter.tracks.map((track) => (
                    <TrackRow
                      key={track.id}
                      track={track}
                      isActive={isActive(track)}
                      isPlaying={isPlaying}
                      onPlay={handlePlay}
                      compact
                    />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {artists.length > 0 && (
        <section className="music-section" aria-labelledby="artist-spotlight-title">
          <div className="music-section__header">
            <p>Artist Spotlight</p>
            <h2 id="artist-spotlight-title">Recurring Voices</h2>
          </div>
          <div className="artist-spotlight-list">
            {artists.map(([artist, artistTracks]) => (
              <article key={artist} className="artist-spotlight-card">
                <div className="artist-spotlight-card__intro">
                  <span>{artistTracks.length} songs</span>
                  <h3>{artist}</h3>
                </div>
                <div className="artist-spotlight-card__tracks">
                  {artistTracks.map((track) => (
                    <TrackRow key={track.id} track={track} isActive={isActive(track)} isPlaying={isPlaying} onPlay={handlePlay} compact />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {instrumentals.length > 0 && (
        <section className="music-section instrumental-sanctuary" aria-labelledby="instrumental-sanctuary-title">
          <div className="instrumental-sanctuary__visual" aria-hidden>
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="music-section__header">
            <p>Instrumental Sanctuary</p>
            <h2 id="instrumental-sanctuary-title">Quiet Without Words</h2>
          </div>
          <div className="music-compact-list">
            {instrumentals.map((track) => (
              <TrackRow key={track.id} track={track} isActive={isActive(track)} isPlaying={isPlaying} onPlay={handlePlay} />
            ))}
          </div>
        </section>
      )}

      <section className="music-section" aria-labelledby="complete-archive-title">
        <div className="music-section__header music-section__header--inline">
          <div>
            <p>Compact Archive</p>
            <h2 id="complete-archive-title">{activeCategory === 'All' ? 'Complete Library' : `${activeCategory} Archive`}</h2>
          </div>
          <span>{filteredTracks.length} tracks</span>
        </div>
        <div className="music-compact-list">
          {filteredTracks.map((track) => (
            <TrackRow key={track.id} track={track} isActive={isActive(track)} isPlaying={isPlaying} onPlay={handlePlay} />
          ))}
        </div>
      </section>
    </div>
  );
}
