import { buildVideoEntries } from '../lib/media';

const titles = [
  'Monsoon Street Pulse',
  'Local Train Surge',
  'Marine Drive Glow',
  'Street Food Symphony',
  'Gateway to Dreams',
];

const descriptions = [
  'Heavy rain drumming on Mumbai streets while life moves through puddled lanes.',
  "The rush of a local train platform, commuters flowing with the city's heartbeat.",
  "The sea breeze and the glittering lights of Queen's Necklace at night.",
  'Vada pav vendors and chai wallahs creating the soundtrack of the city.',
  'The Gateway of India framed by arriving boats and evening light.',
];

const durations = ['3:42', '2:51', '4:18', '3:27', '3:55'];

export const mumbaiVideos = buildVideoEntries('mumbai', {
  titles,
  descriptions,
  durations,
});
