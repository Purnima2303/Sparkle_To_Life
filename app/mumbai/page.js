import { mumbaiImages } from '../data/mumbai';
import { mumbaiVideos } from '../data/mumbai-videos';
import { mumbaiBackgroundVideo } from '../data/backgrounds';
import CityExperiencePage from '../components/CityExperiencePage';
import TheatreChapterStrip from '../components/theatre/TheatreChapterStrip';

export default function MumbaiPage() {
  const mumbaiCover = mumbaiImages[0]?.src || '/homepage/mumbai-marine-drive.jpeg';
  const mumbaiSecond = mumbaiImages[1]?.src || mumbaiCover;
  const mumbaiThird = mumbaiImages[2]?.src || mumbaiCover;

  return (
    <>
      <TheatreChapterStrip
        chapter="Act II - Mumbai"
        subtitle="Runways, restless nights, and moving streets."
      />
      <CityExperiencePage
        cityName="Mumbai"
        tagline="Where chaos became routine."
        eyebrow="Runways & Nights"
        aboutTitle="Motion That Teaches You How To Move"
        aboutBody="Mumbai taught speed and habit-airports, highways, and the city that compresses longing into commutes. Here ambition is a ritual and movement a way to survive."
        storyCards={[
          {
            eyebrow: 'Shore',
            title: 'Marine Drive Nights',
            body: 'Sea breeze and neon glimmer along the Queen&apos;s Necklace.',
          },
          {
            eyebrow: 'Rhythm',
            title: 'Train Line Energy',
            body: 'Platforms where the city&apos;s heartbeat never falters.',
          },
          {
            eyebrow: 'Dream',
            title: 'Bollywood Lights',
            body: 'Every street corner holds the drama of an unwritten scene.',
          },
        ]}
        images={mumbaiImages}
        videos={mumbaiVideos}
        backgroundVideo={mumbaiBackgroundVideo}
        gradientClass="gradient-mumbai min-h-screen text-white"
        accentTextClass="text-blue-300"
        accentButtonClass="rounded-full bg-blue-700 px-8 py-3 transition-all duration-300 hover:bg-blue-600"
        galleryHref="/gallery/mumbai"
        journey={[
          { place: 'Marine Drive', form: 'Night Coast', emotion: 'Where the city breathes between taxis.', href: '/mumbai' },
          { place: 'Airport', form: 'Runways', emotion: 'Departures that taught longing.', href: '/mumbai' },
          { place: 'Local Train', form: 'Rhythm', emotion: 'A thousand small routines.', href: '/mumbai' },
        ]}
        testimonials={[
          {
            quote: 'Some friendships survive the rush because they know how to stand beside you in silence.',
            name: 'Nikhil',
            role: '',
            image: '/homepage/human-stories/empty-station-night-generic.jpeg',
          },
          {
            quote: 'In the middle of long days, a familiar voice can make the city feel less heavy.',
            name: 'Abhidas',
            role: '',
            image: '/homepage/human-stories/teamwork-hands-generic.jpeg',
          },
          {
            quote: 'Every difficult chapter becomes lighter when someone chooses to walk through it with you.',
            name: 'Unnikrishnan',
            role: '',
            image: '/homepage/human-stories/quiet-platform-generic.jpeg',
          },
          {
            quote: 'Mumbai moved fast, but the best memories stayed in the pauses between everything.',
            name: 'Sanooj',
            role: '',
            image: '/homepage/human-stories/sarath-night-city-generic.jpeg',
          },
          {
            quote: 'Some people become part of the city itself, remembered with every road back.',
            name: 'Sijil',
            role: '',
            image: '/homepage/human-stories/mother-rain-window-generic.jpeg',
          },
        ]}
        chapters={[
          { title: 'Runways & Restless Dreams', city: 'Mumbai', genre: 'Ambition - Movement', dates: 'Chapter II', desc: 'Airports, highways, and the nights that taught endurance.', image: mumbaiCover, href: '/mumbai' },
          { title: 'Lights Beyond Exhaustion', city: 'Mumbai', genre: 'City Nights', dates: 'Chapter II', desc: 'Neon, taxi lights, and reflections on wet asphalt.', image: mumbaiSecond, href: '/mumbai' },
        ]}
        cinematicSrc={mumbaiThird}
        showVideoSection={false}
      />
    </>
  );
}
