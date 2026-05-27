import MusicCatalog from '../components/music/MusicCatalog';
import FloatingPlaybackBar from '../components/music/FloatingPlaybackBar';
import NowPlayingPanel from '../components/music/NowPlayingPanel';

const FLOATING_ELEMENTS = [
  { className: 'vinyl-a', label: 'record' },
  { className: 'clef-a', label: 'clef' },
  { className: 'notes-a', label: 'notes' },
  { className: 'wave-a', label: 'waveform' },
  { className: 'keys-a', label: 'keys' },
  { className: 'violin-a', label: 'violin' },
  { className: 'guitar-a', label: 'guitar' },
  { className: 'flute-a', label: 'flute' },
];

export default function MusicPage() {
  return (
    <main className="music-archive-page">
      <div className="music-ambient-gradient" aria-hidden />
      <div className="music-film-grain" aria-hidden />
      <div className="music-smoke-layer" aria-hidden />
      <div className="music-light-streaks" aria-hidden />

      <div className="music-symbol-field" aria-hidden>
        {FLOATING_ELEMENTS.map((item) => (
          <span key={item.className} className={`music-symbol music-symbol--${item.className}`}>
            <i>{item.label}</i>
          </span>
        ))}
      </div>

      <section className="music-archive-hero">
        <div className="music-archive-hero__inner">
          <h1>Music Archive</h1>
          <h2>Cinema Soundscapes</h2>
          <p>
            Stories carried through rhythm.
            <br />
            Moments remembered in sound.
          </p>
        </div>
      </section>

      <section className="music-archive-layout" aria-label="Music archive and player">
        <div className="music-archive-layout__library">
          <MusicCatalog />
        </div>
        <div className="music-archive-layout__player">
          <NowPlayingPanel />
        </div>
      </section>

      <FloatingPlaybackBar />
      <footer className="global-life-footer">© 2026 - My Life</footer>
    </main>
  );
}


