import { keralaImages } from './kerala';
import { lucknowImages } from './lucknow';
import { mumbaiImages } from './mumbai';

function cityFromSrc(src) {
  if (src.includes('/kerala/')) return 'Kerala';
  if (src.includes('/mumbai/')) return 'Mumbai';
  if (src.includes('/lucknow/')) return 'Lucknow';
  return 'India';
}

const catalogImages = [...keralaImages, ...lucknowImages, ...mumbaiImages];
const audioFileNames = [
  '100 Degree Celsius (DJJOhAL.Com).mp3',
  'Aa Nammalu kandeelonnum (DJJOhAL.Com).mp3',
  'Aadukiraal Kanna (DJJOhAL.Com).mp3',
  'Adi-Alaye-Mp3-Song-by-Ekadesi(PagalWorldi.com.co).mp3',
  'alinhwalker-dirt-drifting-clouds-182413.mp3',
  'Angels-For-Each-Other-Mp3-Song-by-Martin-Garrix(PagalWorldi.com.co).mp3',
  'Bangalore Days (DJJOhAL.Com).mp3',
  'Belly Dance (DJJOhAL.Com).mp3',
  'Birthday-Mp3-Song-by-Jennifer-Lopez(PagalWorldi.com.co).mp3',
  'Boothathe Kandittundo (DJJOhAL.Com).mp3',
  'chrispixer-sad-violin-5-456715.mp3',
  'Damnson-Mp3-Song-by-Hanumankind(PagalWorldi.com.co).mp3',
  'Dhanumasa Palazhi (DJJOhAL.Com).mp3',
  'Don't-Worry-I'll-Make-You-Worry-Mp3-Song-by-Sabrina-Carpenter(PagalWorldi.com.co).mp3',
  'Ek Sapna Swabhomi (DJJOhAL.Com).mp3',
  'Gehra-Hua-by-Irshad-Kamil(PagalWorldi.com.co).mp3',
  'Go-Baby-Mp3-Song-by-Justin-Bieber(PagalWorldi.com.co).mp3',
  'Gods Own Country (DJJOhAL.Com).mp3',
  'heibe-guitar-dance-with-violin-392753.mp3',
  'Hima Bindukkal (DJJOhAL.Com).mp3',
  'Idiminnal (DJJOhAL.Com).mp3',
  'Inakkamulla Penne (DJJOhAL.Com).mp3',
  'Ini Paadu Madhumozhi (DJJOhAL.Com).mp3',
  'Ishq-Jalakar-Mp3-Song-by-Irshad-Kamil(PagalWorldi.com.co)(1).mp3',
  'Ishq-Jalakar-Mp3-Song-by-Irshad-Kamil(PagalWorldi.com.co).mp3',
  'Ith Jeevitham (DJJOhAL.Com).mp3',
  'Jeevithamoru Nava Naadakam (DJJOhAL.Com).mp3',
  'Kaalam Parakkunu (DJJOhAL.Com).mp3',
  'Kankalal Oru (DJJOhAL.Com).mp3',
  'Kanmaniye Nee Chirichaal (DJJOhAL.Com).mp3',
  'Kanmaniye Nee Chirichaal (Male) (DJJOhAL.Com).mp3',
  'Kanna (DJJOhAL.Com).mp3',
  'Khairiyat-Mp3-Song-by-Gurnam-Bhullar(PagalWorldi.com.co).mp3',
  'Khuda Oh Khuda (DJJOhAL.Com).mp3',
  'leberch-love-516820.mp3',
  'Let-Me-Down-Slowly-Mp3-Song-by-Alec-Benjamin(PagalWorldi.com.co).mp3',
  'Mayamo Marimayamo (DJJOhAL.Com).mp3',
  'milagrosgomez-dark-atmosphere-with-rain-352570.mp3',
  'Mosayile Kuthira Meenukal (DJJOhAL.Com).mp3',
  'Mr Fraud (Theme) (DJJOhAL.Com).mp3',
  'Mulakat-Mp3-Song-by-Parry-Sidhu(PagalWorldi.com.co).mp3',
  'Nadodi Choolam Mooli (DJJOhAL.Com).mp3',
  'Oru Nokku Kaanuvan (DJJOhAL.Com).mp3',
  'Oru Thooval (DJJOhAL.Com).mp3',
  'Paint-The-Town-Red-Mp3-Song-by-Doja-Cat(PagalWorldi.com.co).mp3',
  'Pakalini Veyil (DJJOhAL.Com).mp3',
  'Pin Nilavil (DJJOhAL.Com).mp3',
  'Poonthinkale (DJJOhAL.Com).mp3',
  'Povukayanu Njan (DJJOhAL.Com).mp3',
  'Raga Sindhooram (DJJOhAL.Com).mp3',
  'Rihaayi-Mp3-Song-by-Paradox(PagalWorldi.com.co).mp3',
  'Sadaa Paalaya (DJJOhAL.Com).mp3',
  'Safari-Mp3-Song-by-Serena(PagalWorldi.com.co).mp3',
  'Sarasa Sarasaro (DJJOhAL.Com).mp3',
  'Swarnappattin (DJJOhAL.Com).mp3',
  'Taj Theerthoru (DJJOhAL.Com).mp3',
  'Tera-Ban-Jaunga-Mp3-Song-by-Dj-Yogi(PagalWorldi.com.co).mp3',
  'Thalapathy-Kacheri-Mp3-Song-by-Thalapathy-Vijay(PagalWorldi.com.co).mp3',
  'Thamarappoomakavanathil (DJJOhAL.Com).mp3',
  'Thane Vidarum (DJJOhAL.Com).mp3',
  'Time-Mp3-Song-by-Jay-Sean(PagalWorldi.com.co).mp3',
  'Tu-Meri-Main-Tera-Main-Tu-Meri-Mp3-Song-by-Anvita-Dutt-Guptan(PagalWorldi.com.co).mp3',
  'Ulsaha Committee (DJJOhAL.Com).mp3',
  'Uyirin Varamaai (DJJOhAL.Com).mp3',
  'Vaa Maaro Thammaaro (DJJOhAL.Com).mp3',
  'Veendum Thalir Podijuvo (DJJOhAL.Com).mp3',
  'Vennila Velayil (DJJOhAL.Com).mp3',
  'Vijanamoru Veedhiyil (DJJOhAL.Com).mp3',
];
const audioFiles = audioFileNames.map((name) => `/music-content/${encodeURIComponent(name)}`);

function normalizeAudioTitle(filename) {
  const decoded = decodeURIComponent(filename);
  return decoded
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const musicTracks = audioFiles.map((src, i) => {
  const cover = catalogImages[i % catalogImages.length]?.src;
  const title = normalizeAudioTitle(src.split('/').pop() ?? `Track ${i + 1}`);
  const artist = 'Music Content';
  const city = cityFromSrc(catalogImages[i % catalogImages.length]?.src ?? '');

  return {
    id: `track-${i}`,
    title,
    artist,
    city,
    cover,
    src,
  };
});
