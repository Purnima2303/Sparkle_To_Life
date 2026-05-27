import { readdir } from 'fs/promises';
import { writeFile, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

async function listPublicImages(subdir) {
  try {
    const dir = join(publicDir, subdir);
    const files = await readdir(dir);
    return files.filter((f) => IMAGE_EXT.test(f)).map((f) => `/${subdir}/${f}`);
  } catch {
    return [];
  }
}

function cityFromSrc(src) {
  if (!src) return 'Unknown';
  if (src.includes('/kerala/')) return 'Kerala';
  if (src.includes('/mumbai/')) return 'Mumbai';
  if (src.includes('/lucknow/')) return 'Lucknow';
  return 'India';
}

function normalizeAudioTitle(filename) {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function main() {
  const audioDir = join(publicDir, 'music-content');
  const files = await readdir(audioDir);
  const audioFiles = files.filter((f) => /\.(mp3|m4a|wav|ogg)$/i.test(f));

  const kerala = await listPublicImages('kerala');
  const lucknow = await listPublicImages('lucknow');
  const mumbai = await listPublicImages('mumbai');
  const catalogImages = [...kerala, ...lucknow, ...mumbai];

  const tracks = audioFiles.map((file, i) => {
    const src = `/music-content/${encodeURIComponent(file)}`;
    const title = normalizeAudioTitle(file);
    const cover = catalogImages.length
      ? catalogImages[i % catalogImages.length]
      : '/music-background/cover.jpg';
    const city = cityFromSrc(cover);
    return { id: `track-${i}`, title, artist: 'Music Content', city, cover, src };
  });

  const outputPath = join(publicDir, 'music-files.json');
  await writeFile(outputPath, JSON.stringify(tracks));
  console.log(`Generated ${tracks.length} tracks → public/music-files.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
