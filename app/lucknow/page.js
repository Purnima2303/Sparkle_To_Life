import { lucknowImages } from '../data/lucknow';
import { lucknowVideos } from '../data/lucknow-videos';
import { lucknowBackgroundVideo } from '../data/backgrounds';
import CityExperiencePage from '../components/CityExperiencePage';
import TheatreChapterStrip from '../components/theatre/TheatreChapterStrip';

export default function LucknowPage() {
  return (
    <>
      <TheatreChapterStrip
        chapter="Act III - Lucknow"
        subtitle="Poetry, gentle streets, and quiet afternoons."
      />
      <CityExperiencePage
        cityName="Lucknow"
        tagline="Where poetry found a home."
        eyebrow="Nawabi Memories"
        aboutTitle="Soft Streets That Speak in Verse"
        aboutBody="Lucknow taught the language of longing-arches and courtyards that remember slow conversations, small rituals, and sentences that unravel like a ghazal."
        storyCards={[
          {
            eyebrow: 'Verse',
            title: 'Shayari Evenings',
            body: 'Candlelit stalls and whispered couplets beneath historic arches.',
          },
          {
            eyebrow: 'Court',
            title: 'Nawabi Heritage',
            body: 'Palaces and balconies that still remember royal processions.',
          },
          {
            eyebrow: 'Spice',
            title: 'Market Glow',
            body: 'Saffron-lit alleyways where every corner tastes of tradition.',
          },
        ]}
        images={lucknowImages}
        videos={lucknowVideos}
        backgroundVideo={lucknowBackgroundVideo}
        gradientClass="gradient-lucknow min-h-screen text-white"
        accentTextClass="text-yellow-300"
        accentButtonClass="rounded-full bg-yellow-700 px-8 py-3 transition-all duration-300 hover:bg-yellow-600"
        galleryHref="/gallery/lucknow"
        journey={[
          { place: 'Bara Imambara', form: 'Heritage', emotion: 'Arches that remember old conversations.', href: '/lucknow' },
          { place: 'Chai Stall', form: 'Evenings', emotion: 'Where couplets were traded like currency.', href: '/lucknow' },
          { place: 'Old Library', form: 'Quiet Study', emotion: 'Books that held lives within margins.', href: '/lucknow' },
        ]}
        testimonials={[
          {
            quote: 'He witnessed every event closely, not just as a colleague, but as someone who stood beside the whole chapter.',
            name: 'Sarath',
            role: 'Closest Colleague',
            image: '/homepage/human-stories/empty-station-night-generic.jpeg',
          },
          {
            quote: 'At Kalyan Head Office, guidance often arrived quietly, through steady direction and the willingness to help.',
            name: 'Product Manager',
            role: 'Office Head',
            image: '/homepage/human-stories/teamwork-hands-generic.jpeg',
          },
          {
            quote: 'Lucknow became easier because help was never far away, and every difficult day found someone nearby.',
            name: 'Kalyan Head Office',
            role: 'Lucknow',
            image: '/homepage/human-stories/quiet-platform-generic.jpeg',
          },
        ]}
        chapters={[
          { title: 'Poetry Beneath Nawabi Skies', city: 'Lucknow', genre: 'Heritage - Poetry', dates: 'Chapter III', desc: 'Courtyards, ghazals, and the slow art of listening.', image: '/lucknow/lucknow-01.jpeg', href: '/lucknow' },
          { title: 'Conversations In Old Courtyards', city: 'Lucknow', genre: 'Evening Rituals', dates: 'Chapter III', desc: 'Lanterns, chai, and a language of small kindnesses.', image: '/lucknow/lucknow-02.jpeg', href: '/lucknow' },
        ]}
        cinematicSrc="/lucknow/lucknow-04.jpeg"
        showVideoSection={false}
      />
    </>
  );
}
