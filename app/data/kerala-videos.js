import { buildVideoEntries } from '../lib/media';

const titles = [
  'Monsoon Backwaters',
  'Temple Evening Chant',
  'Tea Estate Mist',
  'Coastal Rain',
  'Backwater Boats',
];

const descriptions = [
  'Gentle rain falling on Kerala backwaters, creating ripples of memory and calm.',
  'Soft bells and lantern light in a temple courtyard as dusk settles.',
  'Fog lifting through tea gardens at dawn, workers moving in quiet rhythm.',
  'Palm trees and monsoon skies along a wet Kerala coast.',
  'Houseboats drifting through calm canals with dawn light on the water.',
];

const durations = ['2:34', '3:12', '3:45', '2:58', '4:02'];

export const keralaVideos = buildVideoEntries('kerala', {
  titles,
  descriptions,
  durations,
});
