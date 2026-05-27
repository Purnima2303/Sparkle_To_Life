import { buildVideoEntries } from '../lib/media';

const titles = [
  'Nawabi Sunset',
  'Chai Stall Whispers',
  'Courtyard Lanterns',
  'Evening Azaan',
  'Rickshaw Rhythm',
];

const descriptions = [
  'Golden light falling across carved arches and old city lanes.',
  'Steam, chatter and the warmth of evening tea by a quiet street corner.',
  'A heritage courtyard lit by lanterns, shadows playing on ancient stone.',
  'The call to prayer flowing through narrow lanes as dusk settles.',
  'Bright rickshaws weaving through spice markets and faded city walls.',
];

const durations = ['3:21', '2:47', '4:15', '2:33', '3:58'];

export const lucknowVideos = buildVideoEntries('lucknow', {
  titles,
  descriptions,
  durations,
});
