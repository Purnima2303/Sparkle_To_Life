import { buildFolderImageEntries, buildImageEntries } from '../lib/media';

const keralaCategories = [
  'Monsoon Glow',
  'Backwater Calm',
  'Temple Haze',
  'Palm Reflections',
  'Evening Boats',
  'Leafy Lanes',
];

const keralaTitles = [
  'Rain Garden',
  'Dawn Canoe',
  'Evening Shore',
  'Silent Temple',
  'Mist on the Backwater',
  'Coconut Alley',
  'Tea Estate Twilight',
  'Mud Path Memories',
  'Palms & Lanterns',
  'Vespa by the River',
];

const keralaCaptions = [
  'A quiet monsoon frame where light and water meet.',
  'Rustling palms and still backwater mood in soft vibration.',
  'A temple silhouette caught in the hush before evening.',
  'Golden light pooling on a slow river under palms.',
  'A gentle scene of boats, mist and slow moving memory.',
  'Warm rain air and the calm rhythm of coastal lanes.',
];

const keralaPhotoFolderImages = buildFolderImageEntries('kerala-photos', {
  categories: keralaCategories,
  captions: keralaCaptions,
  location: 'Kerala',
  fallbackTitle: 'Kerala Memory',
});

const legacyKeralaImages = buildImageEntries('kerala', /^kerala-\d+\.jpe?g$/i, {
  categories: keralaCategories,
  titles: keralaTitles,
  captions: keralaCaptions,
});

export const keralaImages = keralaPhotoFolderImages.length > 0 ? keralaPhotoFolderImages : legacyKeralaImages;
export const keralaPhotoCount = keralaImages.length;
export const expectedKeralaPhotos = keralaPhotoCount;
