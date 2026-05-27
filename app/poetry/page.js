'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import HeroBackgroundVideo from '../components/HeroBackgroundVideo';
import { poetryBackgroundVideo } from '../data/backgrounds';

const literaryWorks = [
  {
    id: 'rain-letters',
    title: 'Rain Letters',
    author: 'Ignatius',
    type: 'Shayari',
    language: 'Hindi',
    phase: 'Reflection',
    themes: ['Memories', 'Nature', 'Reflection'],
    excerpt: 'काँच पर लिखी बारिश की लकीरें, उन यादों का एक खुला पन्ना हैं जो अब भी खामोशी में गाते हैं।',
    body:
      'काँच पर लिखी बारिश की लकीरें,\nउन यादों का एक खुला पन्ना हैं।\nकुछ नाम धुंधले होकर भी चमकते हैं,\nकुछ रास्ते लौटकर भी वहीं रहते हैं।\n\nमैंने हर बूंद में एक शहर सुना,\nहर खिड़की में एक पुराना चेहरा।\nजो बात कभी कही नहीं गई,\nवही आज भी सबसे गहरी कविता है।',
  },
  {
    id: 'slow-return',
    title: 'The Slow Return',
    author: 'Ignatius',
    type: 'Short Story',
    language: 'English',
    phase: 'Purpose',
    themes: ['Memories', 'Growth', 'Reflection'],
    excerpt: 'A quiet admission that home is not a place but the feeling you carry when every city keeps calling back.',
    body:
      'He did not return to a house. He returned to a sound: rain on a balcony, a train passing somewhere far away, a phone ringing in another room. The city had changed its face, but the silence remembered him.\n\nIn Mumbai, he learned movement. In Kerala, he learned stillness. In Lucknow, he learned that language could hold grief without breaking. By the time he understood home, it had become less of a place and more of a rhythm inside his chest.',
  },
  {
    id: 'ink-in-water',
    title: 'Ink in Water',
    author: 'Ignatius',
    type: 'Short Story',
    language: 'English',
    phase: 'Dreams',
    themes: ['Dreams', 'Loss', 'Hope'],
    excerpt: 'The moment the ink dissolved, the story began to float, soft, uncertain, and impossible to put back together.',
    body:
      'The letter slipped from his hand into the brass bowl. Ink spread through the water like a night sky learning to become dawn. For a moment, every sentence resisted disappearance. Then the words loosened.\n\nHe watched his own confession become weather. Perhaps that was what memory did best: it refused to stay written, yet it never fully vanished.',
  },
  {
    id: 'khamoshi-ka-naam',
    title: 'Khamoshi Ka Naam',
    author: 'Ignatius',
    type: 'Shayari',
    language: 'Urdu',
    phase: 'Love',
    themes: ['Love', 'Loss', 'Reflection'],
    excerpt: 'ایک خاموشی جو دل کے شہر سے آتی ہے، اس لفظ کو ڈھونڈتی ہے جو پھر بھی بولنا چاہتا ہے۔',
    body:
      'ایک خاموشی جو دل کے شہر سے آتی ہے،\nاس لفظ کو ڈھونڈتی ہے جو پھر بھی بولنا چاہتا ہے۔\n\nتیری یاد کوئی شور نہیں،\nبس ایک نرم سا چراغ ہے۔\nرات جتنی بھی گہری ہو جائے،\nیہ روشنی اپنا راستہ نہیں بھولتی۔',
  },
  {
    id: 'memory-archive',
    title: 'Memory Archive',
    author: 'Ignatius',
    type: 'Poem',
    language: 'English',
    phase: 'Legacy',
    themes: ['Memories', 'Legacy', 'Reflection'],
    excerpt: 'Soft editorial fragments arranged like a museum of private moments, faded, deliberate, and tender.',
    body:
      'I keep my life in small rooms:\nA rain-wet road,\nA station platform,\nA mother calling from another decade,\nA city light refusing to sleep.\n\nMemory is not a shelf.\nIt is a living room at midnight,\nwhere every object knows your name\nand waits without accusation.',
  },
  {
    id: 'between-stations',
    title: 'Between Stations',
    author: 'Ignatius',
    type: 'Poem',
    language: 'English',
    phase: 'Growth',
    themes: ['Growth', 'Memories', 'Hope'],
    excerpt: 'A train window view of cities that live inside the same heart, each with its own shade of longing.',
    body:
      'Between stations, I became many people.\nOne learned to leave.\nOne learned to wait.\nOne learned that distance is a teacher\nwith patient hands.\n\nThe window kept changing its stories,\nbut my reflection stayed beside me,\nolder by one city,\nsofter by one goodbye.',
  },
  {
    id: 'childhood-rain',
    title: 'Childhood Rain',
    author: 'Ignatius',
    type: 'Poem',
    language: 'English',
    phase: 'Childhood',
    themes: ['Childhood', 'Nature', 'Memories'],
    excerpt: 'Childhood evenings where rain taught the heart to be still before it learned to be strong.',
    body:
      'Before ambition had a name,\nrain was the first language.\nIt spoke through coconut leaves,\nthrough wet roads,\nthrough the patient smell of earth.\n\nA child stood at the edge of the afternoon\nand believed the whole world\ncould be washed clean.',
  },
  {
    id: 'dosti-ki-raah',
    title: 'Dosti Ki Raah',
    author: 'Ignatius',
    type: 'Shayari',
    language: 'Hindi',
    phase: 'Friendship',
    themes: ['Friendship', 'Hope', 'Memories'],
    excerpt: 'दोस्ती कभी शोर नहीं करती, बस मुश्किल दिनों में चुपचाप साथ चलती रहती है।',
    body:
      'दोस्ती कभी शोर नहीं करती,\nबस मुश्किल दिनों में चुपचाप साथ चलती रहती है।\n\nजब रास्ते लंबे हो जाते हैं,\nजब शाम जल्दी उतर आती है,\nतब एक दोस्त की आवाज़\nघर की तरह लगती है।',
  },
  {
    id: 'purpose-room',
    title: 'The Room of Purpose',
    author: 'Ignatius',
    type: 'Short Story',
    language: 'English',
    phase: 'Purpose',
    themes: ['Purpose', 'Growth', 'Spirituality'],
    excerpt: 'A late-night room, one lamp, and the small realization that becoming is usually quiet.',
    body:
      'The room had one lamp and three notebooks. None of them knew what to become. He sat there after midnight, listening to the ceiling fan turn like a patient clock.\n\nPurpose did not arrive like thunder. It came as a small instruction: write one true sentence, then another. Live one honest day, then another. Let the future find you working.',
  },
];

const onlineCoverLibrary = {
  Love: {
    keywords: ['love', 'romantic', 'dosti', 'khamoshi'],
    query: 'romantic sunset emotional silhouette warm cinematic portrait',
    image: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47',
  },
  Heartbreak: {
    keywords: ['heartbreak', 'loss', 'goodbye', 'sadness', 'lonely'],
    query: 'rainy window lonely road solitary figure empty street cinematic sadness',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
  },
  Nature: {
    keywords: ['nature', 'rain', 'forest', 'river', 'mountain'],
    query: 'forest mist mountains rivers countryside sunrise landscape',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b',
  },
  Reflection: {
    keywords: ['reflection', 'memory', 'archive', 'silence', 'books', 'library'],
    query: 'reading desk library vintage books window light thoughtful portrait',
    image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc',
  },
  Dreams: {
    keywords: ['dream', 'ink', 'sky', 'stars', 'moon'],
    query: 'stars moonlight cosmic skies dreamscape surreal landscape',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564',
  },
  Childhood: {
    keywords: ['childhood', 'nostalgic', 'playful'],
    query: 'nostalgic street old bicycle childhood memories warm evening',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c',
  },
  Friendship: {
    keywords: ['friendship', 'friends', 'connection'],
    query: 'friends walking shared laughter travel moments human connection',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac',
  },
  Spirituality: {
    keywords: ['spirituality', 'spiritual', 'meditation', 'purpose'],
    query: 'temples meditation light rays peaceful landscape spiritual reflection',
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2',
  },
  Hope: {
    keywords: ['hope', 'growth', 'purpose', 'horizon', 'beginning'],
    query: 'sunrise horizon mountain peak golden light new beginnings',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
  },
  Legacy: {
    keywords: ['legacy', 'timeless', 'portrait'],
    query: 'timeless architecture old books manuscripts literary interiors',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da',
  },
};

const onlineFallbackCovers = [
  {
    query: 'literary interiors warm reading room manuscript desk',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
  },
  {
    query: 'atmospheric library bookshelves editorial photography',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f',
  },
  {
    query: 'reading cafe warm light literary photography',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6',
  },
];

const portraitCover = {
  query: 'sophisticated writing desk manuscripts bookshelves warm reading environment',
  image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a',
};

const authorCover = {
  query: 'writer portrait notebook warm cinematic interior',
  image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
};

const englishTranslations = {
  'rain-letters':
    'Lines of rain written on glass are an open page of memories that still sing in silence.\n\nSome names keep shining even after becoming blurred. Some roads return and still remain where they always were.\n\nI heard a city inside every drop. I saw an old face in every window. The words that were never spoken remain the deepest poem even today.',
  'khamoshi-ka-naam':
    'A silence rises from the city of the heart, searching for the word that still wants to speak.\n\nYour memory is not noise. It is a soft lamp. However deep the night becomes, this light never forgets its path.',
  'dosti-ki-raah':
    'Friendship never makes much noise. It simply keeps walking beside you through difficult days.\n\nWhen roads become long, when evening falls too soon, the voice of a friend begins to feel like home.',
};

const sourceNote = 'Content is structured for Ignatius_Literary_Portrait and Life_Phases_Literary_Collection imports when those files are added.';

function buildOnlineImageUrl(baseUrl, work, variant = 'standard') {
  const dimensions = {
    featured: { w: 1400, h: 788 },
    chapter: { w: 1000, h: 750 },
    standard: { w: 900, h: 1200 },
    tall: { w: 900, h: 1200 },
    shayari: { w: 900, h: 900 },
    portrait: { w: 1100, h: 1400 },
    author: { w: 1000, h: 1000 },
    reading: { w: 1200, h: 1600 },
    phase: { w: 1000, h: 1000 },
  };
  const size = dimensions[variant] || dimensions.standard;
  return `${baseUrl}?auto=format&fit=crop&w=${size.w}&h=${size.h}&q=86&crop=entropy&ixlib=rb-4.0.3&fm=jpg`;
}

function getCoverData(work) {
  const haystack = `${work.title} ${work.phase} ${work.themes.join(' ')} ${work.excerpt}`.toLowerCase();
  const exactTheme = Object.entries(onlineCoverLibrary).find(([theme, rule]) => {
    return haystack.includes(theme.toLowerCase()) || rule.keywords.some((keyword) => haystack.includes(keyword));
  });
  const fallback = onlineFallbackCovers[Math.abs(work.id.length + work.title.length) % onlineFallbackCovers.length];
  const [theme, cover] = exactTheme || ['Literary', fallback];

  return {
    theme,
    query: `${work.title} ${cover.query} cinematic photography`,
    image: cover.image,
  };
}

function getCover(work, variant = 'standard') {
  return buildOnlineImageUrl(getCoverData(work).image, work, variant);
}

function readingTime(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 140))} min read`;
}

function detectLanguage(work) {
  if (work.language) return work.language;
  if (/[\u0900-\u097F]/.test(work.body)) return 'Hindi';
  if (/[\u0600-\u06FF]/.test(work.body)) return 'Urdu';
  return 'English';
}

function searchableText(work) {
  return [
    work.title,
    work.author,
    work.type,
    work.language,
    work.phase,
    work.themes.join(' '),
    work.excerpt,
    work.body,
    englishTranslations[work.id] || '',
  ]
    .join(' ')
    .toLowerCase();
}

function LiteraryIcon({ mode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      {mode === 'dark' ? (
        <path d="M20 15.4A8 8 0 0 1 8.6 4 8.6 8.6 0 1 0 20 15.4Z" />
      ) : (
        <>
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
        </>
      )}
    </svg>
  );
}

function WorkCard({ work, variant = 'standard', onOpen }) {
  const coverData = getCoverData(work);

  return (
    <button
      type="button"
      className={`literary-card literary-card--${variant}`}
      onClick={() => onOpen(work)}
      data-cover-query={coverData.query}
    >
      <span className="literary-card__image">
        <img
          src={getCover(work, variant)}
          alt={`${work.title} ${coverData.theme.toLowerCase()} cinematic cover`}
          loading="lazy"
          decoding="async"
          sizes={variant === 'featured' ? '(min-width: 1024px) 33vw, 100vw' : '(min-width: 1024px) 28vw, 100vw'}
        />
      </span>
      <span className="literary-card__body">
        <span className="literary-kicker">{work.type} - {work.language}</span>
        <strong>{work.title}</strong>
        <em>{work.author}</em>
        <span className="literary-card__excerpt">{work.excerpt}</span>
        <span className="literary-card__meta">
          <span>{work.phase}</span>
          <span>{readingTime(work.body)}</span>
        </span>
      </span>
    </button>
  );
}

export default function PoetryPage() {
  const [theme, setTheme] = useState('dark');
  const [typeFilter, setTypeFilter] = useState('All');
  const [languageFilter, setLanguageFilter] = useState('All');
  const [phaseFilter, setPhaseFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [selectedWork, setSelectedWork] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [liveMessage, setLiveMessage] = useState('Dark mode enabled');
  const readerContentRef = useRef(null);
  const searchInputRef = useRef(null);
  const controlsRef = useRef(null);
  const originalHeadingRef = useRef(null);
  const translationHeadingRef = useRef(null);
  const translationPanelRef = useRef(null);

  const types = useMemo(() => ['All', ...Array.from(new Set(literaryWorks.map((work) => work.type)))], []);
  const languages = useMemo(() => ['All', ...Array.from(new Set(literaryWorks.map((work) => work.language)))], []);
  const phases = useMemo(() => ['All', ...Array.from(new Set(literaryWorks.map((work) => work.phase)))], []);

  const filteredWorks = useMemo(() => {
    const search = query.trim().toLowerCase();
    return literaryWorks.filter((work) => {
      const matchesType = typeFilter === 'All' || work.type === typeFilter;
      const matchesLanguage = languageFilter === 'All' || work.language === languageFilter;
      const matchesPhase = phaseFilter === 'All' || work.phase === phaseFilter || work.themes.includes(phaseFilter);
      const haystack = searchableText(work);
      return matchesType && matchesLanguage && matchesPhase && (!search || haystack.includes(search));
    });
  }, [languageFilter, phaseFilter, query, typeFilter]);

  const featured = [
    literaryWorks.find((work) => work.type === 'Poem'),
    literaryWorks.find((work) => work.type === 'Shayari'),
    literaryWorks.find((work) => work.type === 'Short Story'),
  ].filter(Boolean);
  const portraitWorks = literaryWorks.filter((work) => ['Reflection', 'Legacy', 'Purpose'].includes(work.phase));
  const poems = filteredWorks.filter((work) => work.type === 'Poem');
  const shayaris = filteredWorks.filter((work) => work.type === 'Shayari');
  const stories = filteredWorks.filter((work) => work.type === 'Short Story');
  const suggestedThemes = ['Love', 'Hope', 'Nature', 'Memories', 'Reflection', 'Friendship', 'Growth', 'Spirituality'];
  const hasActiveDiscoveryFilter = query.trim() || typeFilter !== 'All' || languageFilter !== 'All' || phaseFilter !== 'All';
  const selectedIndex = selectedWork ? filteredWorks.findIndex((work) => work.id === selectedWork.id) : -1;
  const canTranslate = selectedWork ? ['Hindi', 'Urdu'].includes(detectLanguage(selectedWork)) : false;
  const selectedTranslation = selectedWork ? englishTranslations[selectedWork.id] : '';

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('poetry-theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
      setTheme(storedTheme);
      setLiveMessage(storedTheme === 'dark' ? 'Dark mode enabled' : 'Light manuscript mode enabled');
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('poetry-theme', theme);
  }, [theme]);

  useEffect(() => {
    setShowTranslation(false);
    setReadingProgress(0);
    if (readerContentRef.current) readerContentRef.current.scrollTop = 0;
  }, [selectedWork?.id]);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setLiveMessage(nextTheme === 'dark' ? 'Dark mode enabled' : 'Light manuscript mode enabled');
      return nextTheme;
    });
  };

  const openWork = (work) => {
    setSelectedWork(work);
    setLiveMessage(`Opened ${work.title}`);
  };

  const closeReader = () => {
    setSelectedWork(null);
    setLiveMessage('Back to collection');
  };

  const toggleTranslation = () => {
    setShowTranslation((current) => {
      const next = !current;
      setLiveMessage(next ? 'Translation displayed' : 'Translation hidden');
      return next;
    });
  };

  const scrollWithinReader = (targetRef, message) => {
    window.requestAnimationFrame(() => {
      targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      targetRef.current?.focus({ preventScroll: true });
      setLiveMessage(message);
    });
  };

  const readEnglishTranslation = () => {
    if (!showTranslation) setShowTranslation(true);
    window.setTimeout(() => {
      translationPanelRef.current?.classList.add('translation-panel--highlight');
      scrollWithinReader(translationHeadingRef, 'Navigated to English translation');
      window.setTimeout(() => translationPanelRef.current?.classList.remove('translation-panel--highlight'), 1400);
    }, 80);
  };

  const backToOriginal = () => {
    scrollWithinReader(originalHeadingRef, 'Returned to original text');
  };

  const goToAdjacentWork = (direction) => {
    if (!filteredWorks.length || selectedIndex < 0) return;
    const nextIndex = (selectedIndex + direction + filteredWorks.length) % filteredWorks.length;
    openWork(filteredWorks[nextIndex]);
  };

  const handleReaderScroll = () => {
    const node = readerContentRef.current;
    if (!node) return;
    const max = node.scrollHeight - node.clientHeight;
    setReadingProgress(max <= 0 ? 100 : Math.round((node.scrollTop / max) * 100));
  };

  const focusSearch = () => {
    closeReader();
    window.requestAnimationFrame(() => {
      controlsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      searchInputRef.current?.focus();
    });
  };

  return (
    <main className={`literary-page literary-page--${theme}`} data-source-note={sourceNote}>
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </div>
      <div className="literary-atmosphere" aria-hidden>
        <span className="literary-float literary-float--quote">"</span>
        <span className="literary-float literary-float--pen" />
        <span className="literary-float literary-float--page" />
        <span className="literary-float literary-float--hindi">याद</span>
        <span className="literary-float literary-float--urdu">یاد</span>
        <span className="literary-float literary-float--letters">A - क - ن</span>
      </div>

      <button
        type="button"
        className={`literary-theme-toggle literary-theme-toggle--${theme}`}
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light manuscript mode' : 'Switch to dark literary mode'}
        aria-pressed={theme === 'light'}
      >
        <span aria-hidden>{theme === 'dark' ? '☾' : '☀'}</span>
      </button>

      <section className="literary-hero">
        <HeroBackgroundVideo src={poetryBackgroundVideo} className="opacity-30" />
        <div className="literary-hero__shade" />
        <div className="literary-hero__content">
          <h1>Where Words Breathe</h1>
          <h2>Poems - Shayaris - Short Stories</h2>
          <p>
            Stories written in emotion.
            <br />
            Poetry preserved in silence.
            <br />
            Memories carried through words.
          </p>
        </div>
      </section>

      <section ref={controlsRef} className="literary-control-deck" aria-label="Literary filters and search">
        <div className="literary-filter-row">
          {types.map((type) => (
            <button key={type} type="button" className={typeFilter === type ? 'is-active' : ''} onClick={() => setTypeFilter(type)}>
              {type === 'Poem' ? 'Poems' : type === 'Shayari' ? 'Shayaris' : type === 'Short Story' ? 'Short Stories' : type}
            </button>
          ))}
        </div>
        <div className="literary-filter-row literary-filter-row--language">
          {languages.map((language) => (
            <button key={language} type="button" className={languageFilter === language ? 'is-active' : ''} onClick={() => setLanguageFilter(language)}>
              {language}
            </button>
          ))}
        </div>
        <div className="literary-filter-row literary-filter-row--phase" aria-label="Life phase filters">
          {phases.map((phase) => (
            <button key={phase} type="button" className={phaseFilter === phase ? 'is-active' : ''} onClick={() => setPhaseFilter(phase)}>
              {phase}
            </button>
          ))}
        </div>
        <label className="literary-search">
          <span>Search archive</span>
          <span className="literary-search__field">
            <input
              type="search"
              ref={searchInputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, author, content, translation, phase, language..."
              aria-label="Search title, author, content, translation, phase, and language"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
                Clear
              </button>
            )}
          </span>
        </label>
        <div className="literary-theme-tags">
          {suggestedThemes.map((themeName) => (
            <button key={themeName} type="button" onClick={() => setQuery(themeName)}>
              {themeName}
            </button>
          ))}
        </div>
        <p className="literary-result-count">{filteredWorks.length} works found</p>
      </section>

      {hasActiveDiscoveryFilter && (
        <section className="literary-section literary-search-results" aria-live="polite">
          <div className="literary-section__header">
            <p>Search Results</p>
            <h2>{filteredWorks.length ? 'Matching Literary Pieces' : 'No matching pieces found'}</h2>
          </div>
          {filteredWorks.length > 0 && (
            <div className="literary-results-grid">
              {filteredWorks.map((work) => (
                <WorkCard key={work.id} work={work} variant={work.type === 'Shayari' ? 'shayari' : work.type === 'Short Story' ? 'chapter' : 'standard'} onOpen={openWork} />
              ))}
            </div>
          )}
        </section>
      )}

      <section className="literary-section literary-featured-section">
        <div className="literary-section__header">
          <p>Featured Literary Moment</p>
          <h2>Selected From The Archive</h2>
        </div>
        <div className="literary-featured-grid">
          {featured.map((work) => (
            <WorkCard key={work.id} work={work} variant="featured" onOpen={openWork} />
          ))}
        </div>
      </section>

      <section className="literary-section">
        <div className="literary-section__header">
          <p>Life Phases</p>
          <h2>Stories and reflections from different chapters of life.</h2>
        </div>
        <div className="life-phase-grid">
          {phases.filter((phase) => phase !== 'All').map((phase) => {
            const phaseWork = literaryWorks.find((work) => work.phase === phase);
            return (
              <button key={phase} type="button" className="life-phase-card" onClick={() => phaseWork && openWork(phaseWork)}>
                <img
                  src={phaseWork ? getCover(phaseWork, 'phase') : buildOnlineImageUrl(onlineFallbackCovers[0].image, null, 'phase')}
                  alt={`${phase} cinematic life phase cover`}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 25vw, (min-width: 680px) 50vw, 100vw"
                />
                <span>{phase}</span>
                <strong>{phaseWork?.title}</strong>
                <em>{phaseWork?.excerpt}</em>
                <small>{phaseWork ? readingTime(phaseWork.body) : '1 min read'}</small>
              </button>
            );
          })}
        </div>
      </section>

      <section className="literary-section literary-portrait">
        <div className="literary-portrait__image">
          <img
            src={buildOnlineImageUrl(portraitCover.image, null, 'portrait')}
            alt="Sophisticated literary desk with manuscripts and warm reading light"
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 45vw, 100vw"
          />
        </div>
        <div className="literary-portrait__copy">
          <p>Literary Portrait</p>
          <h2>Reflections, observations, and stories preserved through words.</h2>
          <blockquote>
            Memory is not a shelf. It is a living room at midnight, where every object knows your name.
          </blockquote>
          <div className="literary-portrait__works">
            {portraitWorks.map((work) => (
              <button key={work.id} type="button" onClick={() => openWork(work)}>
                <span>{work.type}</span>
                <strong>{work.title}</strong>
              </button>
            ))}
          </div>
        </div>
      </section>

      {poems.length > 0 && (
        <section className="literary-section">
          <div className="literary-section__header">
            <p>Poetry Wall</p>
            <h2>Poems arranged like preserved fragments.</h2>
          </div>
          <div className="poetry-wall">
            {poems.map((work, index) => (
              <WorkCard key={work.id} work={work} variant={index % 2 ? 'tall' : 'standard'} onOpen={openWork} />
            ))}
          </div>
        </section>
      )}

      {shayaris.length > 0 && (
        <section className="literary-section shayari-gallery">
          <div className="literary-section__header">
            <p>Shayari Gallery</p>
            <h2>Framed lines for quiet rooms.</h2>
          </div>
          <div className="shayari-gallery__grid">
            {shayaris.map((work) => (
              <WorkCard key={work.id} work={work} variant="shayari" onOpen={openWork} />
            ))}
          </div>
        </section>
      )}

      {stories.length > 0 && (
        <section className="literary-section">
          <div className="literary-section__header">
            <p>Story Chapters</p>
            <h2>Cinematic stories from the notebook.</h2>
          </div>
          <div className="story-chapters">
            {stories.map((work) => (
              <WorkCard key={work.id} work={work} variant="chapter" onOpen={openWork} />
            ))}
          </div>
        </section>
      )}

      <section className="literary-section author-spotlight">
        <img
          src={buildOnlineImageUrl(authorCover.image, null, 'author')}
          alt="Writer notebook and warm cinematic author workspace"
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 40vw, 100vw"
        />
        <div>
          <p>Author Spotlight</p>
          <h2>Ignatius</h2>
          <blockquote>Stories endure. Words remain.</blockquote>
          <div>
            {literaryWorks.slice(0, 4).map((work) => (
              <button key={work.id} type="button" onClick={() => openWork(work)}>
                {work.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      <footer className="literary-footer">
        <p>Stories endure. Words remain.</p>
        <nav aria-label="Footer navigation">
          <Link href="/">Home</Link>
          <Link href="/music">Music Archive</Link>
          <Link href="/cinema">Visual Storytelling</Link>
        </nav>
        <span>© 2026 - My Life</span>
      </footer>

      {selectedWork && (
        <div className="reading-modal" role="dialog" aria-modal="true" aria-labelledby="reading-title">
          <button type="button" className="reading-modal__backdrop" onClick={closeReader} aria-label="Close reading view" />
          <article className="reading-journal">
            <div className="reading-toolbar" aria-label="Reading toolbar">
              <button type="button" onClick={closeReader} aria-label="Back to collection">
                Back
              </button>
              <button
                type="button"
                className={`reading-toolbar__icon reading-toolbar__icon--${theme}`}
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <span aria-hidden>{theme === 'dark' ? '☾' : '☀'}</span>
              </button>
              {canTranslate && (
                <button type="button" className={`reading-toolbar__icon reading-toolbar__translate ${showTranslation ? 'is-active' : ''}`} onClick={toggleTranslation} aria-pressed={showTranslation} aria-label={showTranslation ? 'Translation enabled' : 'Translation disabled'}>
                  <span aria-hidden>⌘</span>
                </button>
              )}
              {canTranslate && showTranslation && (
                <button type="button" className="translation-jump-button" onClick={readEnglishTranslation}>
                  English Version
                </button>
              )}
              <button type="button" onClick={focusSearch} aria-label="Search archive">
                Search
              </button>
              <span aria-label={`Reading progress ${readingProgress} percent`}>{readingProgress}%</span>
            </div>
            <div className="reading-progress" aria-hidden>
              <span style={{ width: `${readingProgress}%` }} />
            </div>
            <img
              src={getCover(selectedWork, 'reading')}
              alt={`${selectedWork.title} cinematic reading cover`}
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
            <div ref={readerContentRef} className="reading-journal__content" onScroll={handleReaderScroll} tabIndex={0}>
              <div className="reading-meta-grid">
                <span>Category: {selectedWork.type}</span>
                <span>Language: {detectLanguage(selectedWork)}</span>
                <span>Reading Time: {readingTime(selectedWork.body)}</span>
                <span>Theme: {selectedWork.themes.join(', ')}</span>
              </div>
              <p>{selectedWork.type} - {selectedWork.language} - {readingTime(selectedWork.body)}</p>
              <h2 id="reading-title">{selectedWork.title}</h2>
              <span>{selectedWork.author} - {selectedWork.phase}</span>
              <h3 ref={originalHeadingRef} tabIndex={-1} className="reading-section-title">Original Version</h3>
              <div>
                {selectedWork.body.split('\n').map((line, index) => (
                  <p key={`${selectedWork.id}-${index}`}>{line || '\u00A0'}</p>
                ))}
              </div>
              {canTranslate && showTranslation && (
                <section ref={translationPanelRef} className="translation-panel">
                  <span className="translation-panel__badge">Translated from {detectLanguage(selectedWork)}</span>
                  <h3 ref={translationHeadingRef} tabIndex={-1}>English Translation</h3>
                  {(selectedTranslation || 'Translation is being prepared for this piece.').split('\n').map((line, index) => (
                    <p key={`${selectedWork.id}-translation-${index}`}>{line || '\u00A0'}</p>
                  ))}
                  <button type="button" className="translation-panel__back" onClick={backToOriginal}>
                    Back to Original
                  </button>
                </section>
              )}
              <nav className="reading-navigation" aria-label="Reading navigation">
                <button type="button" onClick={() => goToAdjacentWork(-1)} disabled={filteredWorks.length <= 1}>
                  Previous
                </button>
                <button type="button" onClick={closeReader}>
                  Back to Collection
                </button>
                <button type="button" onClick={() => goToAdjacentWork(1)} disabled={filteredWorks.length <= 1}>
                  Next
                </button>
              </nav>
            </div>
            {canTranslate && (
              <>
                <button
                  type="button"
                  className={`floating-translate-button ${showTranslation ? 'is-active' : ''}`}
                  onClick={toggleTranslation}
                  aria-pressed={showTranslation}
                  aria-label={showTranslation ? 'Translation enabled' : 'Translation disabled'}
                >
                  <span aria-hidden>⌘</span>
                </button>
                {showTranslation && (
                  <button type="button" className="floating-translation-jump" onClick={readEnglishTranslation}>
                    English Version
                  </button>
                )}
              </>
            )}
          </article>
        </div>
      )}
    </main>
  );
}

