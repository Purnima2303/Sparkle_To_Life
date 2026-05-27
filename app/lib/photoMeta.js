import fs from 'fs';
import path from 'path';
import { listPublicImages } from './media';

function loadMetaFile(city) {
  const metaPath = path.join(process.cwd(), 'app', 'data', 'metadata', `${city}.json`);
  if (!fs.existsSync(metaPath)) return {};
  try {
    const list = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    return Object.fromEntries(list.map((item) => [item.file, item]));
  } catch {
    return {};
  }
}

export function buildCityImages(city, pattern, fallback = {}) {
  const folder = city;
  const srcs = listPublicImages(folder, pattern);
  const metaByFile = loadMetaFile(city);

  return srcs.map((src, i) => {
    const file = src.split('/').pop();
    const meta = metaByFile[file];
    const fbCat = fallback.categories?.[i % (fallback.categories?.length || 1)] ?? 'Gallery';
    const fbTitle = fallback.titles?.[i % (fallback.titles?.length || 1)] ?? file;
    const fbCaption =
      fallback.captions?.[i % (fallback.captions?.length || 1)] ?? 'A moment from the collection.';

    return {
      id: i,
      src,
      file,
      category: meta?.category ?? fbCat,
      title: meta?.title ?? fbTitle,
      caption: meta?.caption ?? fbCaption,
    };
  });
}
