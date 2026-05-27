import fs from 'fs';
import path from 'path';

const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;
const VIDEO_EXT = /\.(mp4|webm|mov)$/i;
const AUDIO_EXT = /\.(mp3|wav|ogg|m4a|aac)$/i;

function naturalCompare(a, b) {
  const numA = parseInt(a.match(/\d+/)?.[0] ?? '0', 10);
  const numB = parseInt(b.match(/\d+/)?.[0] ?? '0', 10);
  if (numA !== numB) return numA - numB;
  return a.localeCompare(b);
}

function readDirFiles(publicSubdir) {
  const dir = path.join(process.cwd(), 'public', publicSubdir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => !file.startsWith('.'))
    .sort(naturalCompare);
}

/** List image paths under /public/{folder} matching an optional regex. */
export function listPublicImages(folder, pattern) {
  return readDirFiles(folder)
    .filter((file) => IMAGE_EXT.test(file) && (!pattern || pattern.test(file)))
    .map((file) => `/${folder}/${file}`);
}

/** List audio file paths under /public/{folder}. */
export function listPublicAudio(folder) {
  return readDirFiles(folder)
    .filter((file) => AUDIO_EXT.test(file))
    .map((file) => `/${folder}/${encodeURIComponent(file)}`);
}

/** List video paths under /public/{folder}, optionally filtered by regex. */
export function listPublicVideos(folder, pattern) {
  return readDirFiles(folder)
    .filter((file) => VIDEO_EXT.test(file) && (!pattern || pattern.test(file)))
    .map((file) => `/${folder}/${file}`);
}

/** Prefer full-quality background clips over *_medium variants when both exist. */
export function getBackgroundVideo(folder) {
  const files = readDirFiles(folder).filter((file) => VIDEO_EXT.test(file));
  if (files.length === 0) return null;

  const preferred =
    files.find((file) => !/medium|low|preview/i.test(file)) ?? files[0];

  return `/${folder}/${preferred}`;
}

/** All videos in /public/videos for a city prefix (e.g. kerala, mumbai, lucknow). */
export function listCityVideos(cityPrefix) {
  const prefix = cityPrefix.toLowerCase();
  return listPublicVideos('videos', new RegExp(`^${prefix}`, 'i'));
}

export function buildImageEntries(folder, pattern, { categories, titles, captions }) {
  const srcs = listPublicImages(folder, pattern);

  return srcs.map((src, i) => ({
    id: i,
    src,
    title: titles?.[i % titles.length] ?? src.split('/').pop(),
    category: categories?.[i % categories.length] ?? 'Gallery',
    caption: captions?.[i % captions.length] ?? '',
  }));
}

export function cleanMediaTitle(src, fallback = 'Memory Frame') {
  const raw = src.split('/').pop()?.replace(/\.[^.]+$/, '') || fallback;
  const cleaned = raw
    .replace(/^(IMG|DSC|PXL|VID|Screenshot|Screen Shot)[-_ ]*/i, '')
    .replace(/\b(?:WA|edited|copy|final|image|photo|picture|screenshot)\b/gi, ' ')
    .replace(/\b\d{4}[-_ ]?\d{2}[-_ ]?\d{2}\b/g, ' ')
    .replace(/\b\d{6,}\b/g, ' ')
    .replace(/[-_()[\]{}]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const title = cleaned || fallback;
  return title.replace(/\b\w/g, (char) => char.toUpperCase());
}

export function buildFolderImageEntries(folder, { categories, captions, location = 'Memory Archive', fallbackTitle = 'Memory Frame' } = {}) {
  const srcs = listPublicImages(folder);

  return srcs.map((src, i) => ({
    id: `${folder}-${i}`,
    src,
    title: cleanMediaTitle(src, `${fallbackTitle} ${String(i + 1).padStart(2, '0')}`),
    category: categories?.[i % categories.length] ?? 'Memory',
    location,
    caption:
      captions?.[i % captions.length] ??
      `${cleanMediaTitle(src, fallbackTitle)} holds a quiet ${location} moment in light, texture, and memory.`,
  }));
}

export function buildVideoEntries(cityPrefix, { titles, descriptions, durations }) {
  const srcs = listCityVideos(cityPrefix);

  return srcs.map((src, i) => ({
    id: i + 1,
    src,
    title: titles?.[i % titles.length] ?? src.split('/').pop().replace(/\.[^.]+$/, ''),
    description:
      descriptions?.[i % descriptions.length] ??
      'A cinematic moment from the collection.',
    duration: durations?.[i % durations.length] ?? '',
  }));
}
