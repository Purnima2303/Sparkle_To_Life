import { buildFolderImageEntries, buildImageEntries } from '../lib/media';

const mumbaiCategories = [
  'Urban Pulse',
  'Monsoon Hustle',
  'Coastal Nights',
  'Train Rhythms',
  'Neon Streets',
  'Harbor Glow',
];

const mumbaiCaptions = [
  'A formal pause beside the House of Gold sign, marking the Mumbai chapter at work.',
  'Colleagues gather under the India Jewellery backdrop, bright with shared office energy.',
  'ID cards rest on the desk like small proofs of responsibility and belonging.',
  'A stadium crowd glows with yellow scarves, noise, and match-night excitement.',
  'A busy room gathers under warm ceiling light, full of workday voices and motion.',
  'A team pauses together before ornate temple doors, holding the visit as a shared memory.',
  'A large team portrait turns the office day into a festive collective frame.',
  'Rows of pews sit in dim light, carrying the hush of prayer and evening stillness.',
  'The Gateway of India rises across the water, framed by boats, stone, and sea air.',
  'A church facade glows in the night, colored by devotion, streetlight, and quiet ceremony.',
  'White gulls cut across the blue sky above the harbour, restless and bright.',
];

const mumbaiTitles = [
  'House of Gold Portrait',
  'India Jewellery Team',
  'Kalyan ID Cards',
  'Kerala Blasters Match Night',
  'Office Gathering Under Warm Lights',
  'Temple Team Visit',
  'Festive Office Group',
  'Quiet Church Interior',
  'Gateway Across the Water',
  'Illuminated Church at Night',
  'Gulls Over the Harbour',
];

const mumbaiPhotoFolderImages = buildFolderImageEntries('mumbai-photos', {
  categories: mumbaiCategories,
  captions: mumbaiCaptions,
  location: 'Mumbai',
  fallbackTitle: 'Mumbai Memory',
}).map((image, index) => ({
  ...image,
  title: mumbaiTitles[index] ?? image.title,
}));

const legacyMumbaiImages = buildImageEntries('mumbai', /^mumbai-\d+\.jpe?g$/i, {
  categories: mumbaiCategories,
  captions: mumbaiCaptions,
});

export const mumbaiImages = mumbaiPhotoFolderImages.length > 0 ? mumbaiPhotoFolderImages : legacyMumbaiImages;
export const mumbaiPhotoCount = mumbaiImages.length;
