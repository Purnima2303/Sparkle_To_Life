'use client';

import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const MusicContext = createContext();

const ARTIST_HINTS = [
  'Alec Benjamin',
  'Anvita Dutt Guptan',
  'Dj Yogi',
  'Doja Cat',
  'Ekadesi',
  'Gurnam Bhullar',
  'Hanumankind',
  'Irshad Kamil',
  'Jay Sean',
  'Jennifer Lopez',
  'Justin Bieber',
  'Martin Garrix',
  'Paradox',
  'Parry Sidhu',
  'Sabrina Carpenter',
  'Serena',
  'Thalapathy Vijay',
];

const ENGLISH_ARTISTS = [
  'alec benjamin',
  'doja cat',
  'jay sean',
  'jennifer lopez',
  'justin bieber',
  'martin garrix',
  'sabrina carpenter',
  'serena',
];

const HINDI_ARTISTS = ['dj yogi', 'gurnam bhullar', 'irshad kamil', 'paradox', 'parry sidhu'];
const TAMIL_HINTS = ['adi alaye', 'aadukiraal', 'thalapathy', 'vijay', 'vaa maaro', 'vennila'];
const INSTRUMENTAL_HINTS = ['atmosphere', 'dark', 'drifting', 'guitar', 'instrumental', 'rain', 'theme', 'violin'];
const MALAYALAM_HINTS = [
  'bangalore days',
  'boothathe',
  'dhanumasa',
  'gods own country',
  'hima',
  'idiminnal',
  'inakkamulla',
  'kanmaniye',
  'kaalam',
  'kanna',
  'mosayile',
  'nadodi',
  'oru',
  'pakalini',
  'poonthinkale',
  'povukayanu',
  'swarnappattin',
  'thamarappoomakavanathil',
  'thane vidarum',
  'ulsaha',
  'uyirin',
  'vijanamoru',
];

function titleCase(value) {
  return value
    .split(' ')
    .filter(Boolean)
    .map((word) => {
      if (word.length <= 2 && word === word.toUpperCase()) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

function stripNoise(filename) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/\(\d+\)$/g, '')
    .replace(/\s*\([^)]*(?:DJJOhAL|PagalWorldi|\.com|\.co)[^)]*\)\s*/gi, ' ')
    .replace(/\s*\[[^\]]*(?:DJJOhAL|PagalWorldi|\.com|\.co)[^\]]*\]\s*/gi, ' ')
    .replace(/\b(?:mp3|mp4|audio|video)\s+song\b/gi, ' ')
    .replace(/\b(?:official|lyrics?|download|track)\b/gi, ' ')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function cleanSong(track) {
  const rawTitle = track.title || decodeURIComponent((track.src || '').split('/').pop() || '');
  let value = stripNoise(rawTitle);
  let title = value;
  let artist = '';

  const byMatch = value.match(/^(.*?)\s+by\s+(.+)$/i);
  if (byMatch) {
    title = byMatch[1].trim();
    artist = byMatch[2].trim();
  }

  if (!artist) {
    const lower = value.toLowerCase();
    const hintedArtist = ARTIST_HINTS.find((hint) => lower.endsWith(` ${hint.toLowerCase()}`));
    if (hintedArtist) {
      title = value.slice(0, -hintedArtist.length).trim();
      artist = hintedArtist;
    }
  }

  title = title.replace(/\s+\d{3,}$/g, '').replace(/\s+/g, ' ').trim();
  artist = artist.replace(/\s+\d{3,}$/g, '').replace(/\s+/g, ' ').trim();

  return {
    ...track,
    title: titleCase(title || rawTitle),
    artist: artist ? titleCase(artist) : 'Archive Recording',
  };
}

export function detectCategory(track) {
  const haystack = `${track.title || ''} ${track.artist || ''} ${track.src || ''}`.toLowerCase();

  if (INSTRUMENTAL_HINTS.some((hint) => haystack.includes(hint))) return 'Instrumental';
  if (ENGLISH_ARTISTS.some((artist) => haystack.includes(artist))) return 'English';
  if (HINDI_ARTISTS.some((artist) => haystack.includes(artist))) return 'Hindi';
  if (TAMIL_HINTS.some((hint) => haystack.includes(hint))) return 'Tamil';
  if (MALAYALAM_HINTS.some((hint) => haystack.includes(hint))) return 'Malayalam';

  return 'Malayalam';
}

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [tracks, setTracks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgressState] = useState(0);
  const [duration, setDuration] = useState(0);
  const [liveMessage, setLiveMessage] = useState('Select a track to begin listening.');

  const currentTrack = tracks[currentIndex] ?? null;

  useEffect(() => {
    let mounted = true;

    fetch('/music-files.json')
      .then((response) => response.json())
      .then((data) => {
        if (!mounted) return;
        const seen = new Set();
        const enriched = (Array.isArray(data) ? data : [])
          .map((track, index) => {
            const cleaned = cleanSong(track);
            return {
              id: track.id || `track-${index}`,
              ...cleaned,
              category: detectCategory(cleaned),
              src: track.src,
              cover: track.cover,
              city: track.city,
            };
          })
          .filter((track) => {
            const key = `${track.title}-${track.artist}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          });
        setTracks(enriched);
      })
      .catch(() => {
        if (mounted) setTracks([]);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgressState(audio.currentTime || 0);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      if (tracks.length > 1) {
        setCurrentIndex((index) => (index + 1) % tracks.length);
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [tracks.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    if (!audio.src || !audio.src.endsWith(currentTrack.src)) {
      audio.src = currentTrack.src;
      audio.load();
      setProgressState(0);
      setDuration(0);
    }

    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false);
        setLiveMessage('Playback could not start.');
      });
    } else {
      audio.pause();
    }
  }, [currentTrack, isPlaying]);

  const playTrack = useCallback(
    (index) => {
      if (index < 0 || index >= tracks.length) return;
      setCurrentIndex(index);
      setIsPlaying(true);
      setLiveMessage(`Now playing ${tracks[index].title}`);
    },
    [tracks]
  );

  const togglePlay = useCallback(() => {
    if (currentIndex < 0 && tracks.length > 0) {
      playTrack(0);
      return;
    }

    setIsPlaying((playing) => {
      const next = !playing;
      setLiveMessage(next ? `Now playing ${currentTrack?.title || 'selected track'}` : 'Playback paused');
      return next;
    });
  }, [currentIndex, currentTrack, playTrack, tracks.length]);

  const stopTrack = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlaying(false);
    setProgressState(0);
    setLiveMessage('Playback stopped');
  }, []);

  const nextTrack = useCallback(() => {
    if (!tracks.length) return;
    playTrack((currentIndex + 1 + tracks.length) % tracks.length);
  }, [currentIndex, playTrack, tracks.length]);

  const previousTrack = useCallback(() => {
    if (!tracks.length) return;
    playTrack((currentIndex - 1 + tracks.length) % tracks.length);
  }, [currentIndex, playTrack, tracks.length]);

  const seekTo = useCallback(
    (value) => {
      const audio = audioRef.current;
      if (!audio || !Number.isFinite(value)) return;
      audio.currentTime = Math.max(0, Math.min(value, duration || value));
      setProgressState(audio.currentTime);
    },
    [duration]
  );

  const value = useMemo(
    () => ({
      audioRef,
      tracks,
      currentTrack,
      currentIndex,
      isPlaying,
      progress,
      duration,
      liveMessage,
      setLiveMessage,
      playTrack,
      togglePlay,
      stopTrack,
      nextTrack,
      previousTrack,
      seekTo,
    }),
    [
      currentIndex,
      currentTrack,
      duration,
      isPlaying,
      liveMessage,
      nextTrack,
      playTrack,
      previousTrack,
      progress,
      seekTo,
      stopTrack,
      togglePlay,
      tracks,
    ]
  );

  return (
    <MusicContext.Provider value={value}>
      {children}
      <audio ref={audioRef} preload="metadata" hidden />
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </div>
    </MusicContext.Provider>
  );
}
