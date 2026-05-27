import { buildFolderImageEntries } from '../lib/media';

const memoryCategories = [
  'Personal Collection',
  'Travel Memory',
  'Literary Moment',
  'Cinema Frame',
  'Quiet Portrait',
  'Archive Fragment',
];

const memoryCaptions = [
  'A remembered frame held gently inside the personal archive.',
  'Light, place, and feeling gathered into one quiet memory.',
  'A small visual note from a chapter that still feels close.',
  'The kind of moment that stays even after the day moves on.',
  'A personal fragment preserved through atmosphere and time.',
  'A soft archive image, kept for the feeling it carries.',
];

export const memoryImages = buildFolderImageEntries('memories-content', {
  categories: memoryCategories,
  captions: memoryCaptions,
  location: 'Memory Archive',
  fallbackTitle: 'Memory Frame',
});
