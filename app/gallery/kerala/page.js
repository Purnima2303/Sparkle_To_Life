import TravelPhotoGallery from '../../components/TravelPhotoGallery';
import { keralaImages } from '../../data/kerala';

export default function KeralaGallery() {
  return <TravelPhotoGallery cityKey="kerala" images={keralaImages} />;
}
