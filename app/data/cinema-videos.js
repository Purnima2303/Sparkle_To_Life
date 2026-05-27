import { listPublicVideos } from '../lib/media';

const CITY_NAMES = {
  kerala: 'Kerala',
  mumbai: 'Mumbai',
  lucknow: 'Lucknow',
};

const CINEMA_METADATA = {
  kerala: [
    ['Monsoon Backwaters', 'Travel Films', 'Kerala', '2:34', ['monsoon', 'backwaters', 'rain', 'travel'], 'Rain, water, and green silence move together like a memory returning home.'],
    ['Coastal Prayer Light', 'Visual Essays', 'Kerala', '3:12', ['coast', 'evening', 'culture', 'light'], 'Evening softens the coast into a quiet frame of devotion and passing light.'],
    ['Tea Estate Mist', 'Nature', 'Kerala', '3:45', ['tea', 'mist', 'hills', 'nature'], 'Mist drifts over the hills while the landscape breathes in slow green layers.'],
    ['Coastal Rain', 'Memories', 'Kerala', '2:58', ['rain', 'coast', 'monsoon', 'memory'], 'Palm shadows, wet roads, and monsoon air fold into one remembered journey.'],
    ['Backwater Boats', 'Documentary', 'Kerala', '4:02', ['boats', 'water', 'backwater', 'life'], 'Boats move through still water with the patience of everyday life.'],
  ],
  mumbai: [
    ['Monsoon Street Pulse', 'Street Stories', 'Mumbai', '3:42', ['monsoon', 'streets', 'rain', 'urban'], 'Rain strikes the street while the city keeps moving with restless grace.'],
    ['Local Train Surge', 'Documentary', 'Mumbai', '2:51', ['train', 'people', 'movement', 'city'], 'Crowds, rails, and motion carry the rhythm of a city that never pauses.'],
    ['Marine Drive Glow', 'Travel Films', 'Mumbai', '4:18', ['marine drive', 'sea', 'night', 'waterfront'], 'The shoreline glimmers where sea breeze and sleepless lights meet.'],
    ['Street Food Symphony', 'Culture', 'Mumbai', '3:27', ['food', 'street', 'market', 'culture'], 'Steam, spice, and conversation turn the street into a living soundtrack.'],
    ['Gateway to Dreams', 'Visual Essays', 'Mumbai', '3:55', ['gateway', 'boats', 'heritage', 'dreams'], 'Boats arrive beneath old stone, carrying the city between history and hope.'],
  ],
  lucknow: [
    ['Nawabi Sunset', 'Visual Essays', 'Lucknow', '3:21', ['sunset', 'heritage', 'architecture', 'nawabi'], 'Golden light rests on carved walls as the old city gathers its evening mood.'],
    ['Chai Stall Whispers', 'Culture', 'Lucknow', '2:47', ['chai', 'street', 'people', 'evening'], 'Tea, steam, and soft chatter hold the warmth of a familiar street corner.'],
    ['Courtyard Lanterns', 'Short Films', 'Lucknow', '4:15', ['courtyard', 'lanterns', 'heritage', 'night'], 'Lantern light turns stone and shadow into a quiet chapter of memory.'],
    ['Evening Call', 'Life Chapters', 'Lucknow', '2:33', ['evening', 'lanes', 'reflection', 'city'], 'Dusk moves through narrow lanes with a voice that feels older than the day.'],
    ['Rickshaw Rhythm', 'Street Stories', 'Lucknow', '3:58', ['rickshaw', 'market', 'movement', 'street'], 'Bright rickshaws weave through markets where color and motion share the frame.'],
  ],
};

function parseVideoPath(src) {
  const fileName = src.split('/').pop() || '';
  const [, cityKey = 'cinema', number = '1'] = fileName.match(/^([a-z]+)-(\d+)/i) || [];
  return { cityKey: cityKey.toLowerCase(), fileName, index: Number(number) - 1 };
}

function fallbackTitle(fileName) {
  return fileName
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getCinemaVideos() {
  return listPublicVideos('videos').map((src, index) => {
    const { cityKey, fileName, index: cityIndex } = parseVideoPath(src);
    const cityName = CITY_NAMES[cityKey] || 'Cinema';
    const metadata = CINEMA_METADATA[cityKey]?.[cityIndex];
    const [title, category, location, duration, keywords, description] =
      metadata || [fallbackTitle(fileName), 'Memories', cityName, '', [cityName.toLowerCase(), fileName], `A preserved film fragment from ${cityName}, kept close to its original frame.`];

    return {
      id: `${cityKey}-${cityIndex + 1}-${index}`,
      src,
      fileName,
      title,
      category,
      location,
      duration,
      year: '2024',
      keywords,
      description,
      story: `${description} This film belongs to the ${cityName} chapter of Lumina, where movement becomes a record of place, weather, and feeling.`,
      shape: ['portrait', 'landscape', 'square', 'portrait', 'landscape'][index % 5],
      rotation: title === 'Tea Estate Mist' ? -90 : 0,
    };
  });
}
