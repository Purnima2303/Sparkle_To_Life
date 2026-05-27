'use client';

import { useContext } from 'react';
import { MusicContext } from '../../contexts/MusicContext';

function Icon({ name, className }) {
  const paths = {
    play: 'M8 5v14l11-7L8 5Z',
    pause: 'M6 5h4v14H6V5Zm8 0h4v14h-4V5Z',
    stop: 'M6 6h12v12H6V6Z',
    previous: 'M6 6h2v12H6V6Zm3 6 9-6v12l-9-6Z',
    next: 'M16 6h2v12h-2V6ZM6 18V6l9 6-9 6Z',
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d={paths[name]} />
    </svg>
  );
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default function FloatingPlaybackBar() {
  const { currentTrack, isPlaying, progress, duration, togglePlay, stopTrack, nextTrack, previousTrack, seekTo } = useContext(MusicContext);
  const progressPct = duration ? Math.min(100, (progress / duration) * 100) : 0;

  const handleSeek = (event) => {
    if (!duration) return;
    seekTo((Number(event.target.value) / 100) * duration);
  };

  return (
    <div className={`floating-playback ${currentTrack ? 'floating-playback--active' : ''}`} role="region" aria-label="Floating playback controls">
      <div className="floating-playback__visual" aria-hidden>
        <span className={isPlaying ? 'floating-playback__disc floating-playback__disc--spinning' : 'floating-playback__disc'} />
      </div>

      <div className="floating-playback__track">
        <span>{currentTrack?.category || 'Music Archive'}</span>
        <strong>{currentTrack?.title || 'Select a track to begin listening.'}</strong>
        <em>{currentTrack?.artist || 'No song selected'}</em>
      </div>

      <div className="floating-playback__timeline">
        <input
          type="range"
          min="0"
          max="100"
          value={progressPct}
          onChange={handleSeek}
          disabled={!currentTrack}
          aria-label="Seek current song"
          style={{ '--range-value': `${progressPct}%` }}
        />
        <span>
          {formatTime(progress)} / {formatTime(duration)}
        </span>
      </div>

      <div className="floating-playback__controls">
        <button type="button" onClick={previousTrack} aria-label="Previous track" disabled={!currentTrack}>
          <Icon name="previous" className="h-4 w-4" />
        </button>
        <button type="button" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'} disabled={!currentTrack}>
          <Icon name={isPlaying ? 'pause' : 'play'} className="h-5 w-5" />
        </button>
        <button type="button" onClick={stopTrack} aria-label="Stop playback" disabled={!currentTrack}>
          <Icon name="stop" className="h-4 w-4" />
        </button>
        <button type="button" onClick={nextTrack} aria-label="Next track" disabled={!currentTrack}>
          <Icon name="next" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
