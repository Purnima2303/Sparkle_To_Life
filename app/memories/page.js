import TravelPhotoGallery from '../components/TravelPhotoGallery';
import { memoryImages } from '../data/memories';

export default function MemoriesPage() {
  return <TravelPhotoGallery cityKey="memories" images={memoryImages} />;
}
