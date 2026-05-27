import TheatreHome from './components/theatre/TheatreHome';
import { keralaImages } from './data/kerala';
import { lucknowImages } from './data/lucknow';
import { mumbaiImages } from './data/mumbai';

export default function Home() {
  const cityImages = {
    kerala: keralaImages[0]?.src,
    lucknow: lucknowImages[0]?.src,
    mumbai: mumbaiImages[0]?.src ?? keralaImages[5]?.src,
  };

  return <TheatreHome cityImages={cityImages} />;
}
