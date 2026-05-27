import { buildFolderImageEntries, buildImageEntries } from '../lib/media';

const lucknowCategories = [
  'Street Portraits',
  'Architectural Details',
  'Market Moments',
  'Courtyard Light',
  'Night Frames',
  'Everyday Elegance',
];

const lucknowCaptions = [
  'A quiet street portrait framed by carved walls and lantern glow.',
  'Close details of heritage architecture and lost textures.',
  'Market corners captured in soft light and rich color.',
  'Courtyard scenes where light and shadow tell a story.',
  'Twilight compositions in poetry-drenched city streets.',
  'Everyday elegance in the small gestures of city life.',
];

const lucknowPhotoFolderImages = buildFolderImageEntries('lucknow-photos', {
  categories: lucknowCategories,
  captions: lucknowCaptions,
  location: 'Lucknow',
  fallbackTitle: 'Lucknow Memory',
});

const legacyLucknowImages = buildImageEntries('lucknow', /^lucknow-\d+\.jpe?g$/i, {
  categories: lucknowCategories,
  captions: lucknowCaptions,
});

export const lucknowImages = lucknowPhotoFolderImages.length > 0 ? lucknowPhotoFolderImages : legacyLucknowImages;
export const lucknowPhotoCount = lucknowImages.length;
