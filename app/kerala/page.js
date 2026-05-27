import { keralaImages } from '../data/kerala';
import { keralaVideos } from '../data/kerala-videos';
import { keralaBackgroundVideo } from '../data/backgrounds';
import CityExperiencePage from '../components/CityExperiencePage';
import TheatreChapterStrip from '../components/theatre/TheatreChapterStrip';

export default function KeralaPage() {
  return (
    <>
      <TheatreChapterStrip
        chapter="Act I - Kerala"
        subtitle="Monsoon memory & coastal childhood."
      />
      <CityExperiencePage
        cityName="Kerala"
        tagline="Where rain taught silence."
        eyebrow="Monsoon Memories"
        aboutTitle="A Childhood Taught by Rain"
        aboutBody="Kerala softened the edges of childhood-coconut trees, wet roads, temple lamps humming in the distance. This chapter gathers those small afternoons and folds them into memory."
        storyCards={[
          {
            eyebrow: 'Ritual',
            title: 'Monsoon Evenings',
            body: 'Wet earth, temple lamps, and boats drifting through palm-fringed silence.',
          },
          {
            eyebrow: 'Water',
            title: 'Backwater Stories',
            body: 'Houseboats, fishing nets, and the calm between two rains.',
          },
          {
            eyebrow: 'Memory',
            title: 'Coastal Childhood',
            body: 'Coconut groves and rivers that welcome every return.',
          },
        ]}
        images={keralaImages}
        videos={keralaVideos}
        backgroundVideo={keralaBackgroundVideo}
        gradientClass="min-h-screen bg-[#06140f] text-white"
        accentTextClass="text-green-300"
        accentButtonClass="rounded-full border border-green-400/40 bg-green-900/40 px-8 py-3 text-green-100 transition-all hover:bg-green-800/50"
        galleryHref="/gallery/kerala"
        journey={[
          { place: 'Backwaters', form: 'Water & Silence', emotion: 'Where afternoons folded into boats.', href: '/kerala' },
          { place: 'Tea Stalls', form: 'Evening Rituals', emotion: 'The small rituals that taught patience.', href: '/kerala' },
          { place: 'Temple Lanes', form: 'Quiet Pray', emotion: 'Lantern light and slow footsteps.', href: '/kerala' },
        ]}
        testimonials={[
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
        ]}
        chapters={[
          { title: 'Rain That Raised Me', city: 'Kerala', genre: 'Monsoon Memory', dates: 'Chapter I', desc: 'Childhood evenings where rain taught how to be still.', image: '/kerala/kerala-03.jpeg', href: '/kerala' },
          { title: 'Evenings By The Backwaters', city: 'Kerala', genre: 'Water & Light', dates: 'Chapter I', desc: 'Boats, lamps and the long hush between storms.', image: '/kerala/kerala-05.jpeg', href: '/kerala' },
        ]}
        cinematicSrc="/kerala/kerala-04.jpeg"
        showVideoSection={false}
      />
    </>
  );
}
