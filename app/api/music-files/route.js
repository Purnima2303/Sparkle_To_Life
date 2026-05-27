import fs from 'fs/promises';
import path from 'path';

const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

async function listPublicImages(subdir) {
  try {
    const dir = path.join(process.cwd(), 'public', subdir);
    const files = await fs.readdir(dir);
    return files.filter((f) => IMAGE_EXT.test(f)).map((f) => `/${subdir}/${f}`);
  } catch (e) {
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

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const audioDir = path.join(publicDir, 'music-content');
    const files = await fs.readdir(audioDir);
    const audioFiles = files.filter((f) => /\.(mp3|m4a|wav|ogg)$/i.test(f));

    const kerala = await listPublicImages('kerala');
    const lucknow = await listPublicImages('lucknow');
    const mumbai = await listPublicImages('mumbai');
    const catalogImages = [...kerala, ...lucknow, ...mumbai];

    const tracks = audioFiles.map((file, i) => {
      const src = `/music-content/${encodeURIComponent(file)}`;
      const title = normalizeAudioTitle(file);
      const cover = catalogImages.length ? catalogImages[i % catalogImages.length] : '/music-background/cover.jpg';
      const city = cityFromSrc(cover);

      return {
        id: `track-${i}`,
        title,
        artist: 'Music Content',
        city,
        cover,
        src,
      };
    });

    return new Response(JSON.stringify(tracks), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
