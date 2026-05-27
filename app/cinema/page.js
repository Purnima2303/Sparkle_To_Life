import CinemaJournalGallery from '../components/CinemaJournalGallery';
import { getCinemaVideos } from '../data/cinema-videos';

export default function CinemaPage() {
  const videos = getCinemaVideos();

  return <CinemaJournalGallery videos={videos} />;
}
