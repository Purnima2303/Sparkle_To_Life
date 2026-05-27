'use client';

import { useContext, useEffect, useState } from 'react';
import { MusicContext } from '../../contexts/MusicContext';

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function Icon({ name, className }) {
  const paths = {
    play: 'M8 5v14l11-7L8 5Z',
    pause: 'M6 5h4v14H6V5Zm8 0h4v14h-4V5Z',
    stop: 'M6 6h12v12H6V6Z',
    previous: 'M6 6h2v12H6V6Zm3 6 9-6v12l-9-6Z',
    next: 'M16 6h2v12h-2V6ZM6 18V6l9 6-9 6Z',
    volume: 'M4 9v6h4l5 4V5L8 9H4Zm12.5 3c0-1.45-.8-2.7-2-3.35v6.7c1.2-.65 2-1.9 2-3.35Z',
    mute: 'M4.3 3 3 4.3 7.7 9H4v6h4l5 4v-5.7l5.7 5.7 1.3-1.3L4.3 3ZM13 5l-2.1 1.7L13 8.8V5Z',
  };

  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d={paths[name]} />
    </svg>
  );
}

function Equalizer({ active }) {
  return (
    <div className={`music-equalizer ${active ? 'music-equalizer--active' : ''}`} aria-hidden>
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

export default function NowPlayingPanel() {
  const {
    audioRef,
    currentTrack,
    isPlaying,
    progress,
    duration,
    togglePlay,
    stopTrack,
    nextTrack,
    previousTrack,
    seekTo,
    setLiveMessage,
  } = useContext(MusicContext);

  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const progressPct = duration ? Math.min(100, (progress / duration) * 100) : 0;
  const shownVolume = isMuted ? 0 : volume;

  useEffect(() => {
    if (!audioRef?.current) return;
    audioRef.current.volume = isMuted ? 0 : volume / 100;
  }, [audioRef, isMuted, volume]);

  const handleSeek = (event) => {
    if (!duration) return;
    const nextValue = Number(event.target.value);
    seekTo((nextValue / 100) * duration);
  };

  const handleVolume = (event) => {
    const nextVolume = Number(event.target.value);
    setVolume(nextVolume);
    setIsMuted(nextVolume === 0);
    setLiveMessage(`Volume ${nextVolume} percent`);
  };

  const handleMute = () => {
    setIsMuted((muted) => {
      const nextMuted = !muted;
      setLiveMessage(nextMuted ? 'Volume muted' : `Volume ${volume} percent`);
      return nextMuted;
    });
  };

  return (
    <aside className={`now-playing-console ${currentTrack ? 'now-playing-console--loaded' : ''}`}>
      <div className="now-playing-console__shell">
        <div className="now-playing-console__status">
          <span>{isPlaying ? 'Playing' : currentTrack ? 'Paused' : 'Ready'}</span>
          <span>{currentTrack?.category || 'Archive'}</span>
        </div>

        <div className="now-playing-console__header">
          <p>Now Playing</p>
          <h2>{currentTrack ? 'Cinema Sound Console' : 'Listening Room'}</h2>
        </div>

        <div className="now-playing-art" aria-hidden>
          <div className={`now-playing-art__vinyl ${isPlaying ? 'now-playing-art__vinyl--spinning' : ''}`}>
            <span />
            <span />
            <span />
          </div>
          <div className="now-playing-art__label">
            <Equalizer active={isPlaying} />
          </div>
        </div>

        <div className="now-playing-console__track">
          <p>{currentTrack?.category || 'Music Archive'}</p>
          <h3>{currentTrack?.title || 'Select a track to begin listening.'}</h3>
          {currentTrack && <span>{currentTrack.artist}</span>}
        </div>

        <div className="now-playing-progress">
          <input
            type="range"
            min="0"
            max="100"
            value={progressPct}
            onChange={handleSeek}
            aria-label="Seek track"
            style={{ '--range-value': `${progressPct}%` }}
          />
          <div>
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="now-playing-controls" aria-label="Playback controls">
          <button type="button" onClick={previousTrack} aria-label="Previous track" disabled={!currentTrack}>
            <Icon name="previous" className="h-5 w-5" />
          </button>
          <button type="button" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'} disabled={!currentTrack}>
            <Icon name={isPlaying ? 'pause' : 'play'} className="h-6 w-6" />
          </button>
          <button type="button" onClick={stopTrack} aria-label="Stop playback" disabled={!currentTrack}>
            <Icon name="stop" className="h-5 w-5" />
          </button>
          <button type="button" onClick={nextTrack} aria-label="Next track" disabled={!currentTrack}>
            <Icon name="next" className="h-5 w-5" />
          </button>
        </div>

        <div className="now-playing-volume">
          <button type="button" onClick={handleMute} aria-label={isMuted ? 'Unmute' : 'Mute'} aria-pressed={isMuted}>
            <Icon name={isMuted ? 'mute' : 'volume'} className="h-5 w-5" />
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={shownVolume}
            onChange={handleVolume}
            aria-label="Volume"
            style={{ '--range-value': `${shownVolume}%` }}
          />
          <span>{shownVolume}%</span>
        </div>

        <div className="now-playing-console__detail">
          <span>{currentTrack ? 'Memory preserved through sound' : 'Choose a song from the archive'}</span>
        </div>
      </div>
    </aside>
  );
}
