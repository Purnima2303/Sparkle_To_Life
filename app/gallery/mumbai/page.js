import TravelPhotoGallery from '../../components/TravelPhotoGallery';
import { mumbaiImages } from '../../data/mumbai';

export default function MumbaiGallery() {
  return <TravelPhotoGallery cityKey="mumbai" images={mumbaiImages} />;
}
