import TravelPhotoGallery from '../../components/TravelPhotoGallery';
import { lucknowImages } from '../../data/lucknow';

export default function LucknowGallery() {
  return <TravelPhotoGallery cityKey="lucknow" images={lucknowImages} />;
}
