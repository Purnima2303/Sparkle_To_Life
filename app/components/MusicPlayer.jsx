'use client';

import { useState, useRef } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(null);

  const tracks = [
    { id: 1, title: 'Track 1', artist: 'Artist 1', src: '/music/track1.mp3' },
    { id: 2, title: 'Track 2', artist: 'Artist 2', src: '/music/track2.mp3' },
    { id: 3, title: 'Track 3', artist: 'Artist 3', src: '/music/track3.mp3' },
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  return (
    <div className="music-player">
      <div className="player-container">
        <div className="track-info">
          <h2>{tracks[currentTrack].title}</h2>
          <p>{tracks[currentTrack].artist}</p>
        </div>
        <div className="controls">
          <button onClick={prevTrack}>{'<- Previous'}</button>
          <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
          <button onClick={nextTrack}>{'Next ->'}</button>
        </div>
        <audio ref={audioRef} src={tracks[currentTrack].src} />
      </div>
    </div>
  );
}
