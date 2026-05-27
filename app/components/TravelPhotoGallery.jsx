'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const CITY_COPY = {
  kerala: {
    name: 'Kerala',
    eyebrow: 'Monsoon Travel Journal',
    title: 'Photos from Kerala',
    subtitle: 'Visual memories gathered through places, people, and moments.',
    backHref: '/kerala',
    backLabel: 'Back to Kerala',
    searchPlaceholder: 'Search photos from Kerala...',
    titlePool: [
      ['Backwaters at Dawn', 'Nature', 'Alappuzha', ['backwater', 'dawn', 'water', 'landscape', 'monsoon']],
      ['Fort Cochin Streets', 'Streets', 'Fort Kochi', ['street', 'heritage', 'coastal', 'culture']],
      ['Munnar Tea Estates', 'Landscape', 'Munnar', ['tea', 'hills', 'mist', 'nature', 'landscape']],
      ['Monsoon Window Light', 'Monsoon', 'Kerala', ['rain', 'window', 'memory', 'monsoon']],
      ['Santa Cruz Basilica', 'Churches', 'Fort Kochi', ['church', 'basilica', 'architecture', 'heritage']],
      ['Coconut Grove Evening', 'Nature', 'Kerala Coast', ['palms', 'evening', 'nature', 'sunset']],
      ['St. Francis Church', 'Churches', 'Fort Kochi', ['church', 'history', 'prayer', 'architecture']],
      ['Village Path After Rain', 'Culture', 'Kerala', ['village', 'rain', 'people', 'memory']],
      ['Mist Across the Hills', 'Landscape', 'Western Ghats', ['mist', 'mountains', 'nature']],
      ['Coastal Market Morning', 'People', 'Kochi', ['market', 'people', 'culture', 'streets']],
      ['Riverboat Silence', 'Waterfront', 'Kumarakom', ['boat', 'river', 'waterfront']],
      ['Golden Palm Sunset', 'Sunset', 'Kerala Coast', ['sunset', 'palms', 'golden']],
    ],
  },
  mumbai: {
    name: 'Mumbai',
    eyebrow: 'Urban Travel Journal',
    title: 'Photos from Mumbai',
    subtitle: 'Stories hidden between sea breeze, streets, and skylines.',
    backHref: '/mumbai',
    backLabel: 'Back to Mumbai',
    searchPlaceholder: 'Search photos from Mumbai...',
    titlePool: [
      ['Marine Drive at Night', 'Waterfront', 'Marine Drive', ['sea', 'night', 'waterfront', 'skyline']],
      ['Bandra Street Rain', 'Streets', 'Bandra', ['street', 'rain', 'monsoon', 'urban']],
      ['Local Train Rhythm', 'People', 'Mumbai Local', ['train', 'people', 'movement']],
      ['Colaba Evening Walk', 'Culture', 'Colaba', ['evening', 'culture', 'streets']],
      ['Gateway Morning Haze', 'Heritage', 'Apollo Bunder', ['gateway', 'heritage', 'architecture']],
      ['Sea Link Glow', 'Architecture', 'Bandra Worli Sea Link', ['bridge', 'skyline', 'night']],
      ['Monsoon Taxi Window', 'Monsoon', 'South Mumbai', ['taxi', 'rain', 'monsoon']],
      ['Chowpatty Sunset', 'Sunset', 'Girgaum Chowpatty', ['sunset', 'beach', 'waterfront']],
      ['Kala Ghoda Corners', 'Architecture', 'Kala Ghoda', ['art', 'streets', 'architecture']],
      ['Sleepless City Lights', 'Nightlife', 'Mumbai', ['night', 'lights', 'city']],
      ['Harbour Lines', 'Waterfront', 'Mumbai Harbour', ['harbour', 'water', 'boats']],
      ['Market After Rain', 'Food', 'Mumbai', ['market', 'food', 'rain']],
    ],
  },
  lucknow: {
    name: 'Lucknow',
    eyebrow: 'Heritage Travel Journal',
    title: 'Photos from Lucknow',
    subtitle: 'Fragments of history preserved through architecture, culture, and time.',
    backHref: '/lucknow',
    backLabel: 'Back to Lucknow',
    searchPlaceholder: 'Search photos from Lucknow...',
    titlePool: [
      ['Rumi Darwaza Evening', 'Heritage', 'Old Lucknow', ['rumi darwaza', 'heritage', 'architecture', 'evening']],
      ['Imambara Courtyard Light', 'Architecture', 'Bara Imambara', ['imambara', 'courtyard', 'architecture']],
      ['Nawabi Street Portrait', 'People', 'Lucknow', ['portrait', 'people', 'culture']],
      ['Hazratganj After Dusk', 'Streets', 'Hazratganj', ['street', 'night', 'city']],
      ['Chikankari Market Morning', 'Culture', 'Aminabad', ['market', 'craft', 'culture']],
      ['Gomti River Glow', 'Waterfront', 'Gomti River', ['river', 'waterfront', 'sunset']],
      ['Kebab Lane Smoke', 'Food', 'Chowk', ['food', 'kebab', 'street']],
      ['Arched Windows', 'Architecture', 'Lucknow', ['windows', 'architecture', 'heritage']],
      ['Monsoon Over Old Walls', 'Monsoon', 'Old Lucknow', ['rain', 'walls', 'monsoon']],
      ['Courtyard of Stories', 'Heritage', 'Lucknow', ['courtyard', 'history', 'memory']],
      ['Evening Minarets', 'Architecture', 'Lucknow', ['minaret', 'evening', 'skyline']],
      ['Market Lanterns', 'Nightlife', 'Chowk', ['market', 'lantern', 'night']],
    ],
  },
  memories: {
    name: 'Memory Archive',
    eyebrow: 'Core Memories',
    title: 'Enter Memories',
    subtitle: 'Moments that stayed.',
    backHref: '/',
    backLabel: 'Back to Home',
    searchPlaceholder: 'Search memories...',
    titlePool: [
      ['Rain Memory', 'Travel Memory', 'Memory Archive', ['rain', 'memory', 'travel']],
      ['Quiet Portrait', 'Quiet Portrait', 'Personal Collection', ['portrait', 'personal', 'moment']],
      ['Heritage Memory', 'Archive Fragment', 'Memory Archive', ['heritage', 'architecture', 'time']],
      ['Music Room Memory', 'Personal Collection', 'Memory Archive', ['music', 'sound', 'room']],
      ['Cinema Frame', 'Cinema Frame', 'Memory Archive', ['cinema', 'film', 'light']],
      ['Literary Moment', 'Literary Moment', 'Personal Collection', ['literary', 'words', 'reflection']],
    ],
  },
};

const DESCRIPTION_BY_TITLE = {
  'Backwaters at Dawn': 'Where silence flows deeper than the waters.',
  'Fort Cochin Streets': 'History lingers quietly between weathered walls and sea-bound memories.',
  'Munnar Tea Estates': 'Rolling green horizons shaped by patience, rain, and time.',
  'Santa Cruz Basilica': 'Every arch carries echoes of devotion, artistry, and time.',
  'St. Francis Church': 'Sunlight settles softly across walls that have witnessed generations of prayer.',
  'Marine Drive at Night': 'The city glimmers where the sea meets sleepless dreams.',
  'Rumi Darwaza Evening': 'Evening light settles gently across centuries of stories.',
  'Imambara Courtyard Light': 'Quiet geometry holds the warmth of a city that remembers beautifully.',
  'Kebab Lane Smoke': 'Spice, smoke, and laughter rise together through the evening air.',
};

const MEMORY_METADATA = {
  'memory-001': ['Quiet Seat by the Window', 'Quiet Portrait', 'Memory Archive', ['portrait', 'window', 'travel'], 'A quiet pause held beside the window, soft with the feeling of return.'],
  'memory-002': ['Piano Room Silhouette', 'Music Memory', 'Personal Collection', ['piano', 'music', 'silhouette'], 'A figure leans into the keys where music turns the room inward.'],
  'memory-003': ['Cliffside Pause', 'Travel Memory', 'Memory Archive', ['cliff', 'valley', 'travel'], 'A traveller rests against the hills, letting the distance speak first.'],
  'memory-004': ['Camera Reflection', 'Portrait', 'Personal Collection', ['camera', 'portrait', 'reflection'], 'A close frame where the camera becomes part of the memory.'],
  'memory-005': ['Violin Under Draped Light', 'Music Memory', 'Personal Collection', ['violin', 'performance', 'stage'], 'The bow moves through a still room, carrying emotion without needing words.'],
  'memory-006': ['White Shirt Afternoon', 'Quiet Portrait', 'Memory Archive', ['portrait', 'afternoon', 'indoor'], 'A composed afternoon portrait, calm and thoughtful between conversations.'],
  'memory-007': ['Skyline Silhouette', 'Travel Memory', 'Personal Collection', ['sky', 'silhouette', 'evening'], 'A face turns toward the clouds as evening gathers around the horizon.'],
  'memory-008': ['Stage Violin Memory', 'Music Memory', 'Personal Collection', ['violin', 'stage', 'performance'], 'A performance frame where light and melody meet in monochrome.'],
  'memory-009': ['Eyes in Monochrome', 'Portrait', 'Memory Archive', ['portrait', 'monochrome', 'eyes'], 'A direct gaze preserved with the quiet intensity of an old photograph.'],
  'memory-010': ['Violin in Color', 'Music Memory', 'Personal Collection', ['violin', 'stage', 'color'], 'Bright stage light surrounds a song mid-flight.'],
  'memory-011': ['Profile in Shadow', 'Portrait', 'Memory Archive', ['portrait', 'shadow', 'profile'], 'A sideward glance caught in shadow, private and cinematic.'],
  'memory-012': ['Chapel Window Silhouette', 'Literary Moment', 'Memory Archive', ['window', 'silhouette', 'chapel'], 'A solitary figure stands where window light becomes almost sacred.'],
  'memory-013': ['Pink Stage Violin', 'Music Memory', 'Personal Collection', ['violin', 'stage', 'pink'], 'A violin performance glows beneath a wash of festival color.'],
  'memory-014': ['Rock Face Climb', 'Travel Memory', 'Memory Archive', ['rock', 'climb', 'adventure'], 'A body reaches through stone and shadow, held by effort and trust.'],
  'memory-015': ['Guitar Among Trees', 'Music Memory', 'Personal Collection', ['guitar', 'trees', 'song'], 'A song rises outdoors, intimate enough to belong to the trees.'],
  'memory-016': ['Backstage Halo', 'Cinema Frame', 'Memory Archive', ['backstage', 'light', 'performance'], 'Seen from behind, the performer becomes a silhouette inside the light.'],
  'memory-017': ['Violin After the Applause', 'Music Memory', 'Personal Collection', ['violin', 'stage', 'portrait'], 'A performer rests with the violin after the moment has landed.'],
  'memory-018': ['River Swim in Green Shade', 'Travel Memory', 'Memory Archive', ['river', 'water', 'green'], 'A quiet swim disappears into green water and late afternoon shade.'],
  'memory-019': ['Two Profiles in Reflection', 'Portrait', 'Personal Collection', ['portrait', 'reflection', 'profile'], 'Two angles of the same quiet mood face the passing air.'],
  'memory-020': ['Phone Light Portrait', 'Quiet Portrait', 'Memory Archive', ['phone', 'portrait', 'monochrome'], 'A face bends toward the small glow of a message or memory.'],
  'memory-021': ['Violin Close Study', 'Music Memory', 'Personal Collection', ['violin', 'closeup', 'music'], 'A close musical frame where concentration becomes almost visible.'],
  'memory-022': ['Hill View Balcony', 'Travel Memory', 'Memory Archive', ['hills', 'balcony', 'travel'], 'A mountain view opens behind a traveller pausing between journeys.'],
  'memory-023': ['By the Open Water', 'Travel Memory', 'Personal Collection', ['water', 'silhouette', 'horizon'], 'A figure watches the water as the horizon turns beautifully spare.'],
  'memory-024': ['Courtyard Night Memory', 'Archive Fragment', 'Memory Archive', ['courtyard', 'night', 'building'], 'Warm building lights turn the courtyard into a small preserved stage.'],
  'memory-025': ['Gentle Moment with a Pet', 'Personal Collection', 'Memory Archive', ['pet', 'portrait', 'tender'], 'A tender pause held close, full of warmth and simple affection.'],
  'memory-026': ['Old Social Collage', 'Archive Fragment', 'Memory Archive', ['collage', 'archive', 'social'], 'A collage of earlier selves, friendships, and digital traces from another year.'],
  'memory-027': ['Classroom Companions', 'Personal Collection', 'Memory Archive', ['classroom', 'friends', 'group'], 'Friends sit together in a classroom memory that still feels alive.'],
  'memory-028': ['Assembly Hall Rows', 'Archive Fragment', 'Memory Archive', ['classroom', 'students', 'hall'], 'Rows gather in a hall where youth feels loud even in stillness.'],
  'memory-029': ['Blue Light Violin', 'Music Memory', 'Personal Collection', ['violin', 'blue light', 'stage'], 'Blue stage light sharpens the violin into a vivid memory of sound.'],
  'memory-030': ['Edge of the Sky', 'Travel Memory', 'Memory Archive', ['sky', 'horizon', 'silhouette'], 'A lone figure sits near the sky, balanced between silence and distance.'],
  'memory-031': ['Balcony Over the Mist', 'Travel Memory', 'Personal Collection', ['balcony', 'mist', 'view'], 'A balcony moment looks out over mist, fields, and unfinished thoughts.'],
  'memory-032': ['Certificate of Song', 'Archive Fragment', 'Memory Archive', ['certificate', 'music', 'achievement'], 'A music certificate preserves the proof of practice, courage, and effort.'],
  'memory-033': ['Friends in the Dark', 'Personal Collection', 'Memory Archive', ['friends', 'group', 'night'], 'A group memory glows with the easy closeness of shared years.'],
  'memory-034': ['Window Light Profile', 'Quiet Portrait', 'Personal Collection', ['portrait', 'window', 'monochrome'], 'A profile turns toward the window, thoughtful in the soft interior light.'],
  'memory-035': ['Microphone Silhouette', 'Music Memory', 'Memory Archive', ['microphone', 'singing', 'silhouette'], 'A voice meets the microphone inside a room made of shadow.'],
  'memory-036': ['Violin on the Floor', 'Music Memory', 'Personal Collection', ['violin', 'practice', 'music'], 'A practice moment sits close to the ground, honest and unguarded.'],
};

const MUMBAI_FOLDER_METADATA = {
  'mumbai-001': ['House of Gold Portrait', 'Office Memory', 'Mumbai', ['office', 'gold', 'portrait'], 'A formal pause beside the House of Gold sign, marking the Mumbai chapter at work.'],
  'mumbai-002': ['India Jewellery Team', 'People', 'Mumbai', ['team', 'office', 'colleagues'], 'Colleagues gather under the India Jewellery backdrop, bright with shared office energy.'],
  'mumbai-003': ['Kalyan ID Cards', 'Office Memory', 'Mumbai', ['id cards', 'desk', 'work'], 'ID cards rest on the desk like small proofs of responsibility and belonging.'],
  'mumbai-004': ['Kerala Blasters Match Night', 'People', 'Mumbai', ['football', 'crowd', 'stadium'], 'A stadium crowd glows with yellow scarves, noise, and match-night excitement.'],
  'mumbai-005': ['Office Gathering Under Warm Lights', 'Office Memory', 'Mumbai', ['office', 'meeting', 'gathering'], 'A busy room gathers under warm ceiling light, full of workday voices and motion.'],
  'mumbai-006': ['Temple Team Visit', 'Culture', 'Mumbai', ['team', 'temple', 'visit'], 'A team pauses together before ornate temple doors, holding the visit as a shared memory.'],
  'mumbai-007': ['Festive Office Group', 'People', 'Mumbai', ['office', 'group', 'festival'], 'A large team portrait turns the office day into a festive collective frame.'],
  'mumbai-008': ['Quiet Church Interior', 'Churches', 'Mumbai', ['church', 'interior', 'prayer'], 'Rows of pews sit in dim light, carrying the hush of prayer and evening stillness.'],
  'mumbai-009': ['Gateway Across the Water', 'Heritage', 'Mumbai', ['gateway', 'waterfront', 'architecture'], 'The Gateway of India rises across the water, framed by boats, stone, and sea air.'],
  'mumbai-010': ['Illuminated Church at Night', 'Churches', 'Mumbai', ['church', 'night', 'lights'], 'A church facade glows in the night, colored by devotion, streetlight, and quiet ceremony.'],
  'mumbai-011': ['Gulls Over the Harbour', 'Waterfront', 'Mumbai', ['gulls', 'harbour', 'sky'], 'White gulls cut across the blue sky above the harbour, restless and bright.'],
};

const PHOTO_METADATA = {
  kerala: {
    1: ['Garden Window', 'Nature', 'Kerala Homestead', ['window', 'garden', 'greenery'], 'A quiet window frames Kerala in layers of leaf, light, and stillness.'],
    2: ['Canopy Above the Palms', 'Nature', 'Kerala', ['trees', 'palms', 'canopy'], 'The sky disappears behind a green ceiling of old branches and palms.'],
    3: ['Village Church at Dusk', 'Churches', 'Kerala Hills', ['church', 'cross', 'dusk'], 'A small church rests beneath a dimming sky, carrying the hush of evening prayer.'],
    4: ['Lotus Pond Detail', 'Nature', 'Kerala', ['pond', 'lotus', 'water'], 'Still water gathers around lotus leaves like a quiet page of green.'],
    5: ['Monsoon Garden Bloom', 'Nature', 'Kerala', ['flowers', 'garden', 'rain'], 'Fresh color rises from the garden after rain, soft and unannounced.'],
    6: ['Dragonfly Over Lilies', 'Nature', 'Kerala', ['dragonfly', 'pond', 'lilies'], "A small winged pause hovers above the pond's patient green."],
    7: ['Rainforest Path', 'Nature', 'Kerala', ['forest', 'path', 'greenery'], 'The path narrows into wet leaves and the deep breath of the forest.'],
    8: ['Lily Pond in Shade', 'Nature', 'Kerala', ['pond', 'lilies', 'shade'], 'A shaded pond holds its lilies like memories kept close to water.'],
    9: ['Balcony Among Trees', 'People', 'Kerala', ['portrait', 'balcony', 'trees'], 'A quiet pause above the greenery, framed by railings and rain-washed air.'],
    10: ['Guitar Afternoon', 'People', 'Kerala', ['guitar', 'music', 'portrait'], 'A familiar song gathers warmth in the middle of an ordinary afternoon.'],
    11: ['Courtyard Portrait', 'People', 'Kerala', ['portrait', 'courtyard'], 'A still portrait held by patterned ground and the calm of home.'],
    12: ['White Shirt Portrait', 'People', 'Kerala', ['portrait', 'home'], 'A simple indoor frame, softened by the quiet confidence of return.'],
    13: ['Festival Light Walkway', 'Culture', 'Kerala', ['lights', 'festival', 'night'], 'Warm lights build a passage through the night like a small celebration.'],
    14: ['Evening Guitar Session', 'People', 'Kerala', ['guitar', 'music', 'evening'], 'Music settles into the room, intimate enough to feel remembered.'],
    15: ['Lit Garden Passage', 'Culture', 'Kerala', ['lights', 'night', 'festival'], 'A glowing walkway turns the garden into a brief, golden theatre.'],
    16: ['Guitar on the Bed', 'Culture', 'Kerala', ['guitar', 'music'], 'A quiet instrument waits with the intimacy of songs not yet played.'],
    17: ['Swing Beneath the Trees', 'People', 'Kerala', ['swing', 'trees', 'portrait'], 'A suspended moment under trees, where childhood and afternoon meet.'],
    18: ['Family Morning Selfie', 'People', 'Kerala', ['family', 'home'], 'Laughter gathers close, bright as a morning kept for later.'],
    19: ['Mirror Portrait', 'People', 'Kerala', ['portrait', 'mirror'], 'A quiet self-portrait inside the soft edges of a room.'],
    20: ['Camera Among Palm Leaves', 'Culture', 'Kerala', ['camera', 'palm', 'memory'], 'The lens catches greenery before the memory has time to fade.'],
    21: ['Forest Smile', 'People', 'Kerala', ['portrait', 'forest'], 'A candid smile breaks gently through the green hush of the hills.'],
    22: ['Looking Across the Hills', 'People', 'Kerala', ['portrait', 'hills'], 'A profile held by mist, distance, and the patience of looking outward.'],
    23: ['Reservoir Island View', 'Landscape', 'Kerala Hills', ['lake', 'island', 'hills'], 'Water curves around a green island beneath a slow, clouded sky.'],
    24: ['Grassland Ridge', 'Landscape', 'Kerala Hills', ['grassland', 'ridge'], 'Dry grass leans into the wind at the edge of open hill country.'],
    25: ['Waterfall in the Hills', 'Waterfront', 'Kerala Hills', ['waterfall', 'hills'], 'White water falls through green mountains with patient force.'],
    26: ['Valley After Rain', 'Landscape', 'Kerala Hills', ['valley', 'rain'], 'A low valley opens after rain, raw, green, and quietly breathing.'],
    27: ['Rubber Trees', 'Nature', 'Kerala', ['rubber', 'trees'], 'Tapping cups line the trunks like small rituals of work and waiting.'],
    28: ['Tea Estate Slopes', 'Landscape', 'Munnar', ['tea', 'hills'], 'Rolling tea fields rise under a sky rinsed clean by mountain light.'],
    29: ['Snake on the Path', 'Nature', 'Kerala', ['snake', 'wildlife'], 'Wildness flashes close to the ground, sudden and beautifully alert.'],
    30: ['Monkey on Dry Ground', 'Nature', 'Kerala', ['monkey', 'wildlife'], 'A lone monkey pauses where forest shade meets dusty earth.'],
    31: ['Pepper Vines', 'Nature', 'Kerala', ['pepper', 'vines'], 'Pepper vines climb densely, carrying the spice of the land in silence.'],
    32: ['Blue Mountain Layers', 'Landscape', 'Western Ghats', ['mountains', 'lake'], 'Blue ridges fold into the distance beyond a silver stretch of water.'],
    33: ['Frog on Stone', 'Nature', 'Kerala', ['frog', 'wildlife'], 'A small creature blends into stone, rain, and the patient earth.'],
    34: ['Cow at the Gate', 'People', 'Kerala', ['cow', 'village'], 'A curious face peers through the doorway of a rural afternoon.'],
    35: ['Bird on a Branch', 'Nature', 'Kerala', ['bird', 'branch'], 'A black-and-white bird holds the branch like a note in the trees.'],
    36: ['Night Rain Visitor', 'Nature', 'Kerala', ['frog', 'night', 'rain'], 'A tiny night visitor glistens in the palm of a rainy memory.'],
    37: ['Beach Silhouette Series', 'Sunset', 'Kerala Coast', ['beach', 'silhouette', 'sunset'], 'A figure becomes a quiet outline against the last light of the sea.'],
    38: ['Mountain Postcards', 'Landscape', 'Western Ghats', ['mountains', 'collage'], 'Layered hills and clouds gather like postcards from a mountain day.'],
    39: ['Hill Travel Frames', 'Landscape', 'Kerala Hills', ['travel', 'hills'], 'Open skies and high roads collect themselves into a journey.'],
    40: ['Hilltop Cross Views', 'Churches', 'Kerala Hills', ['cross', 'church', 'hill'], 'The cross stands over blue distance, quiet against the changing sky.'],
    41: ['Church Festival Gathering', 'Churches', 'Kerala', ['church', 'festival', 'people'], 'Blue balloons and gathered faces turn the churchyard into celebration.'],
    42: ['Blue Balloon Church', 'Churches', 'Kerala', ['church', 'balloons'], 'A white church rises behind blue balloons and a sky full of rain.'],
    43: ['Open Hymnal', 'Churches', 'Kerala', ['hymnal', 'church'], 'Music and prayer rest open on the page, waiting for voices.'],
    44: ['Chapel Statue Niche', 'Churches', 'Kerala', ['chapel', 'statue'], 'A small sacred corner glows with devotion and quiet flowers.'],
    45: ['Decorated Church Altar', 'Churches', 'Kerala', ['altar', 'church'], 'Color, flowers, and candlelight gather around a festive altar.'],
    46: ['Road Through the Hills', 'Landscape', 'Kerala Hills', ['road', 'hills'], 'The road bends through wet hills, carrying the journey into mist.'],
    47: ['Clouds Over Green Valleys', 'Landscape', 'Kerala Hills', ['clouds', 'valley'], 'Low clouds drag softly across the valley like a passing thought.'],
    48: ['Forest Road', 'Landscape', 'Kerala', ['road', 'forest'], 'Tall trees keep the road shaded, quiet, and beautifully uncertain.'],
    49: ['Rain Clouds on the Ridge', 'Monsoon', 'Kerala Hills', ['rain', 'clouds', 'ridge'], 'Dark monsoon clouds settle over the ridge before the rain arrives.'],
    50: ['Church Interior Altar', 'Churches', 'Kerala', ['church', 'altar', 'interior'], 'A red-carpeted altar holds the stillness of prayer and ceremony.'],
    51: ['White Ducks in the Yard', 'Nature', 'Kerala', ['ducks', 'yard'], 'White ducks crowd the yard with bright noise and village charm.'],
    52: ['Ducks by the Water', 'Nature', 'Kerala', ['ducks', 'water'], 'A small flock moves through wet ground with easy rural rhythm.'],
    53: ['Ducks in Green Water', 'Nature', 'Kerala', ['ducks', 'pond'], 'White ducks drift through green water like small moving lanterns.'],
    54: ['Ducks on the Mud Path', 'Nature', 'Kerala', ['ducks', 'path'], 'The flock follows the muddy path with comic certainty after rain.'],
    55: ['Ducks Near the Trees', 'Nature', 'Kerala', ['ducks', 'trees'], 'Black and white birds gather near the trees in the hush of the yard.'],
    56: ['Warm Kitchen Vessel', 'Food', 'Kerala', ['kitchen', 'food'], 'A brass vessel glows in kitchen light, carrying the comfort of home.'],
    57: ['Jackfruit on the Wall', 'Food', 'Kerala', ['jackfruit', 'fruit'], 'Heavy jackfruit rests against the wall, fragrant with summer memory.'],
    58: ['Sweets on Banana Leaf', 'Food', 'Kerala', ['sweets', 'banana leaf'], 'A small sweet waits on a banana leaf, simple and ceremonial.'],
    59: ['Jackfruit Tree', 'Food', 'Kerala', ['jackfruit', 'tree'], 'Fruit hangs from the tree with the abundance of a Kerala backyard.'],
    60: ['Festival Blue Lights', 'Culture', 'Kerala', ['lights', 'festival'], 'Blue lights and floral color close the night with a festive shimmer.'],
  },
  lucknow: {
    1: ['Lamp Against the Night', 'People', 'Lucknow', ['lamp', 'portrait', 'night'], 'A small flame lights the face like a private festival in the dark.'],
    2: ['Gate Portrait', 'People', 'Lucknow', ['portrait', 'gate'], "A quiet portrait pauses beside a gate and the city's old textures."],
    3: ['Corridor Portrait', 'People', 'Lucknow', ['portrait', 'corridor'], 'A narrow corridor turns into a simple frame of arrival.'],
    4: ['Rickshaw Rain Frame', 'Streets', 'Lucknow', ['rickshaw', 'street'], 'A rickshaw window catches the street in color, reflection, and movement.'],
    5: ['Bada Imambara Dome', 'Heritage', 'Lucknow', ['imambara', 'dome'], "The great dome rises behind the railings with old Lucknow's quiet gravity."],
    6: ['Tea Table Portrait', 'People', 'Lucknow', ['tea', 'portrait'], 'A cup of tea turns the table into a small pause from the city.'],
    7: ['Illuminated Imambara', 'Heritage', 'Lucknow', ['imambara', 'night'], 'At night, the monument glows like history remembering itself.'],
    9: ['Kulhad Tea Closeup', 'Food', 'Lucknow', ['tea', 'kulhad'], 'Steam and clay hold the warmth of a street-side pause.'],
    10: ['Puri Plate in Hand', 'Food', 'Lucknow', ['puri', 'street food'], 'A simple plate becomes the most honest kind of city memory.'],
    11: ['Residency Facade', 'Heritage', 'Lucknow', ['residency', 'architecture'], 'A long colonial facade sits beneath grey skies and remembered histories.'],
    12: ['La Martiniere Lawn', 'Heritage', 'Lucknow', ['la martiniere', 'lawn'], 'A grand white building opens across the lawn with measured elegance.'],
    13: ['Arched Passage', 'Architecture', 'Lucknow', ['arch', 'passage'], 'An arch frames another arch, leading the eye deeper into time.'],
    14: ['Red Heritage Turret', 'Architecture', 'Lucknow', ['turret', 'red building'], 'A red turret rises through leaves, ornate and quietly theatrical.'],
    15: ['Rumi Darwaza Evening', 'Heritage', 'Old Lucknow', ['rumi darwaza'], 'Evening light settles gently across centuries of stories.'],
    16: ['Gateway Arch Crowd', 'Heritage', 'Old Lucknow', ['arch', 'gateway'], 'People pass beneath the arch as history remains calmly overhead.'],
    17: ['Chota Imambara Dome', 'Architecture', 'Lucknow', ['imambara', 'dome'], 'A domed facade gathers ornament, age, and the softness of cloudy light.'],
    18: ['Weathered Nawabi Facade', 'Heritage', 'Lucknow', ['facade', 'architecture'], 'Time leans into the old walls without taking away their grace.'],
    19: ['Tomb at Sunset', 'Heritage', 'Lucknow', ['tomb', 'sunset'], 'The monument darkens gently as evening gathers behind it.'],
    20: ['Indoor Portrait Gesture', 'People', 'Lucknow', ['portrait', 'gesture'], 'A playful indoor frame catches movement before it becomes a posed memory.'],
    21: ['Garden Tomb View', 'Heritage', 'Lucknow', ['tomb', 'garden'], 'Green lawns lead the eye toward a monument held in afternoon quiet.'],
    22: ['Pearl Necklace Portrait', 'People', 'Lucknow', ['portrait', 'necklace'], 'A lighthearted portrait turns ornament and laughter into the whole story.'],
    23: ['Lit Heritage Balcony', 'Nightlife', 'Lucknow', ['balcony', 'night'], 'The balcony glows at night, ornate and alive with celebration.'],
    24: ['Stone Barracks Lawn', 'Heritage', 'Lucknow', ['stone building', 'lawn'], 'Old stone walls look across the lawn with disciplined stillness.'],
    25: ['Residency Ruins', 'Heritage', 'Lucknow', ['ruins', 'arches'], "Broken arches stand with dignity, keeping the city's difficult memories."],
    26: ['Pink Heritage House', 'Architecture', 'Lucknow', ['pink building'], 'A weathered pink facade holds its elegance against the trees.'],
    27: ['Stone Memorial Pillar', 'Heritage', 'Lucknow', ['memorial', 'pillar'], 'A slender memorial rises from the lawn, solemn beneath a grey sky.'],
    28: ['Stone Doorway Detail', 'Architecture', 'Lucknow', ['doorway', 'stone'], 'A weathered doorway frames silence in the language of old stone.'],
    29: ['Quiet Garden Graves', 'Heritage', 'Lucknow', ['garden', 'graves'], 'The garden holds its markers softly under wide, watchful trees.'],
    30: ['Fruit Market Glow', 'Food', 'Lucknow', ['fruit', 'market'], 'Mangoes and market light turn the stall into a golden still life.'],
    31: ['Red Brick Corner', 'Architecture', 'Lucknow', ['brick', 'building'], "A red brick corner catches the city's texture in warm, worn lines."],
    32: ['Gulmohar Bloom', 'Nature', 'Lucknow', ['flower', 'tree'], 'Red flowers flare through green leaves like a sudden summer note.'],
    33: ['Gate Walk Portrait', 'People', 'Lucknow', ['portrait', 'gate'], 'A casual pause beside the gate keeps the afternoon personal and unhurried.'],
    34: ['Vintage Car on Lawn', 'Heritage', 'Lucknow', ['car', 'lawn'], 'A vintage car rests on the lawn with the poise of another era.'],
    35: ['Hanging Chilli Market', 'Food', 'Lucknow', ['chilli', 'market'], 'Red chillies hang in rows, turning spice into a curtain of color.'],
    36: ['Bougainvillea Cart', 'Streets', 'Lucknow', ['flowers', 'street'], 'A flower-covered cart brightens the roadside with effortless charm.'],
    37: ['Memorial Stone Detail', 'Heritage', 'Lucknow', ['memorial', 'stone'], 'Engraved stone holds a solemn fragment of public memory.'],
    38: ['Night Gate Lights', 'Nightlife', 'Lucknow', ['gate', 'night'], 'Gold-lit gates open the night with ceremony and crowd noise.'],
    39: ['Garden Path Curve', 'Landscape', 'Lucknow', ['garden', 'path'], 'A curved garden path leads quietly through trimmed green calm.'],
    40: ['Flowered Garden Walk', 'Landscape', 'Lucknow', ['garden', 'flowers'], 'Rows of flowers guide the path like a soft, colorful procession.'],
    41: ['Cafe Table Laughter', 'People', 'Lucknow', ['cafe', 'portrait'], 'A cafe corner catches laughter with the easy warmth of friends at rest.'],
    42: ['Restaurant Portrait', 'People', 'Lucknow', ['restaurant', 'portrait'], 'Inside the bright room, the moment turns casual, loud, and alive.'],
    43: ['Market Snack Pause', 'People', 'Lucknow', ['market', 'snack'], 'A quick bite in the market keeps the evening moving with familiar ease.'],
    44: ['Cafe Ceiling Portrait', 'People', 'Lucknow', ['cafe', 'portrait'], 'The cafe light falls softly over a pause between city wanderings.'],
    45: ['Purple Night Tree', 'Nightlife', 'Lucknow', ['tree', 'night', 'lights'], 'A tree glows violet in the night, surreal against the dark garden.'],
    46: ['Station Platform Portrait', 'People', 'Lucknow', ['station', 'platform'], 'A platform frame catches travel in the middle of waiting and motion.'],
    47: ['Chaat Plate Closeup', 'Food', 'Lucknow', ['chaat', 'food'], 'A small plate carries the sharp, bright joy of Lucknow street food.'],
    48: ['Fairground Selfie', 'People', 'Lucknow', ['fair', 'selfie'], 'Crowds and lights gather behind a face bright with festival noise.'],
    49: ['City Rooftop Sunset', 'Sunset', 'Lucknow', ['rooftop', 'sunset'], 'The city lowers itself into evening beneath a sky scattered with birds.'],
    50: ['Tea by the Riverside', 'Food', 'Lucknow', ['tea', 'river'], 'Tea warms the hand while the river keeps its slow, evening distance.'],
    51: ['Green Fields Traveler', 'Landscape', 'Lucknow Outskirts', ['field', 'traveler'], 'A lone figure stands where green fields stretch into open air.'],
    52: ['Corridor Portrait Return', 'People', 'Lucknow', ['portrait', 'corridor'], 'A second corridor frame keeps the journey quiet, vertical, and still.'],
    53: ['Souvenir in Hand', 'Culture', 'Lucknow', ['souvenir', 'hand'], 'A small object in the palm becomes proof that the day happened.'],
    54: ['Museum Sculpture Portrait', 'Culture', 'Lucknow', ['museum', 'sculpture'], 'Stone and curiosity meet inside a gallery of older stories.'],
    55: ['Rangoli of Lamps', 'Culture', 'Lucknow', ['rangoli', 'lamps'], 'Color and flame gather on the floor like a celebration made by hand.'],
    56: ['Friends in the Crowd', 'People', 'Lucknow', ['friends', 'crowd'], 'A crowded evening becomes personal through the closeness of friends.'],
    57: ['Friends at Night', 'People', 'Lucknow', ['friends', 'night'], 'Faces lean into the night, bright with the ease of shared memory.'],
    58: ['Riverfront Lights', 'Waterfront', 'Lucknow', ['riverfront', 'night'], 'The riverfront glows in long bands of color across dark water.'],
    59: ['Ancient Brick Stupa', 'Heritage', 'Lucknow', ['stupa', 'ruins'], 'Old brick rises in the sun, carrying the weight of forgotten centuries.'],
    60: ['Cloud Break', 'Landscape', 'Lucknow', ['clouds', 'sky'], 'Clouds open around the sun like a brief blessing in the sky.'],
    61: ['Night River Gathering', 'Waterfront', 'Lucknow', ['river', 'night', 'people'], 'People gather by the water as night folds around the lights.'],
    62: ['Imambara Entrance Hall', 'Heritage', 'Lucknow', ['imambara', 'entrance'], 'A grand entrance holds visitors beneath its shadow and symmetry.'],
    63: ['Night Blossoms', 'Nature', 'Lucknow', ['flowers', 'night'], 'Flowers glow through the dark, delicate against the city night.'],
    64: ['Triangle of Sky', 'Architecture', 'Lucknow', ['sky', 'architecture'], 'A sharp opening frames blue sky like a cut of quiet light.'],
    65: ['Jali Window', 'Architecture', 'Lucknow', ['jali', 'window'], 'A barred window turns stonework into a patient pattern of light.'],
    66: ['Iron Gate Detail', 'Architecture', 'Lucknow', ['gate', 'ironwork'], 'Iron curves around the old facade like lace made from shadow.'],
    67: ['Rainy Garden Evening', 'Monsoon', 'Lucknow', ['rain', 'garden'], 'Rain pools under the trees, turning the garden into a silver dusk.'],
    68: ['La Martiniere in Rain', 'Heritage', 'Lucknow', ['la martiniere', 'rain'], 'The white facade stands calmly beneath a sky heavy with rain.'],
    69: ['Rumi Darwaza Traffic', 'Heritage', 'Old Lucknow', ['rumi darwaza', 'traffic'], 'Everyday traffic passes under an arch built for centuries.'],
    70: ['Balloon Cart at the Gate', 'Culture', 'Lucknow', ['balloons', 'gate'], 'Bright balloons drift beside the old gateway like color against history.'],
    71: ['Night Fruit Stall', 'Food', 'Lucknow', ['fruit', 'stall', 'night'], 'Fruit and blue light turn the night market into a glowing corner.'],
    72: ['Minarets in Mist', 'Architecture', 'Lucknow', ['minarets', 'mist'], 'Slender minarets rise through haze, quiet against a pale sky.'],
    73: ['Riverfront Pavilion', 'Waterfront', 'Lucknow', ['riverfront', 'pavilion'], 'A pavilion glows across the river, balanced between water and sky.'],
    74: ['Garden Monument Walk', 'Heritage', 'Lucknow', ['monument', 'garden'], 'Visitors move through green lawns where history waits in stone.'],
    75: ['Residency Arches', 'Heritage', 'Lucknow', ['residency', 'arches'], 'Old arches hold their ruin with grace, open to grass and sky.'],
    76: ['Lake Sunset', 'Sunset', 'Lucknow', ['lake', 'sunset'], 'The sun lowers across still water, leaving gold on the edges of reeds.'],
    77: ['White Garden Building', 'Heritage', 'Lucknow', ['white building', 'garden'], 'A pale facade watches the garden through trees and old shade.'],
    78: ['Golden Lake Evening', 'Sunset', 'Lucknow', ['lake', 'sunset'], 'Evening spreads across the water in quiet bands of gold.'],
    79: ['Reeds at Sunset', 'Sunset', 'Lucknow', ['reeds', 'sunset'], 'Tall reeds catch the last light as the water darkens behind them.'],
    80: ['Fishing Rod at Dusk', 'Waterfront', 'Lucknow', ['fishing', 'lake'], 'A fishing rod points toward the fading sun and a patient lake.'],
    81: ['Old Street Building', 'Streets', 'Lucknow', ['street', 'building'], 'An old street facade glows under lamps, worn and quietly alive.'],
    82: ['Illuminated Model', 'Culture', 'Lucknow', ['lights', 'model'], 'A miniature landmark glows under trees like a memory made of light.'],
    83: ['Purple Lit Garden Gate', 'Nightlife', 'Lucknow', ['gate', 'purple lights'], 'Purple light turns the garden gate into a small night spectacle.'],
    84: ['Book and Gift Shop', 'Culture', 'Lucknow', ['books', 'shop'], 'Shelves of books and gifts crowd together in a cheerful market glow.'],
    85: ['Old Facade at Night', 'Architecture', 'Lucknow', ['facade', 'night'], 'The old facade catches streetlight with the dignity of a tired city.'],
    86: ['Street Lamps at Night', 'Nightlife', 'Lucknow', ['lamps', 'night'], 'Twin lamps shine over the road like small sentinels of the night.'],
    87: ['Loaded Street Food Plate', 'Food', 'Lucknow', ['street food', 'plate'], 'A generous plate carries the crowded pleasure of Lucknow after dark.'],
    88: ['Lucknow Archive Frame', 'Travel Memory', 'Lucknow', ['archive', 'memory'], 'A reserved archive frame keeps its place in the journey until the image returns.'],
  },
};

function poeticDescription(title, city, category, location) {
  if (DESCRIPTION_BY_TITLE[title]) return DESCRIPTION_BY_TITLE[title];
  if (/church|basilica|cathedral|chapel/i.test(title)) {
    return 'Soft light gathers around stone, devotion, and the hush of passing years.';
  }
  if (category === 'Monsoon') return `Rain softens ${location}, turning the moment into a memory you can almost hear.`;
  if (category === 'Waterfront') return `Water and light meet quietly, carrying ${city}'s restless tenderness to the horizon.`;
  if (category === 'Architecture' || category === 'Heritage') return `Time rests in the details, letting every wall hold its own quiet story.`;
  if (category === 'Food') return 'Flavour becomes memory here, carried through smoke, warmth, and street-side conversations.';
  if (category === 'People') return 'A human pause inside the city, intimate enough to feel remembered.';
  if (category === 'Sunset') return 'Gold gathers slowly, making the day feel handwritten and almost sacred.';
  if (category === 'Nightlife') return 'The night opens softly, full of glow, movement, and unfinished stories.';
  return `A preserved fragment from ${location}, held between atmosphere, distance, and feeling.`;
}

function photoNumberFromSrc(src) {
  return Number(src.match(/-(\d+)\./)?.[1] || 0);
}

function safeFallbackPhoto(cityKey, image, index) {
  const city = CITY_COPY[cityKey];
  const number = photoNumberFromSrc(image.src) || index + 1;
  const cleanTitle = image.title && !/\.(jpe?g|png|webp|avif)$/i.test(image.title) ? image.title : `${city.name} Memory Frame ${String(number).padStart(2, '0')}`;
  const location = image.location || city.name;
  return [
    cleanTitle,
    image.category || 'Travel Memory',
    location,
    [city.name.toLowerCase(), 'memory', 'travel', `photo-${number}`],
    image.caption || `A preserved ${location} frame, held between atmosphere, distance, and feeling.`,
  ];
}

function enrichImages(cityKey, images) {
  const city = CITY_COPY[cityKey];
  return images.map((image, index) => {
    const number = photoNumberFromSrc(image.src);
    const memoryKey = image.src.split('/').pop()?.replace(/\.[^.]+$/, '');
    const [title, category, location, keywords, exactDescription] =
      (cityKey === 'memories' && MEMORY_METADATA[memoryKey]) ||
      (cityKey === 'mumbai' && MUMBAI_FOLDER_METADATA[memoryKey]) ||
      PHOTO_METADATA[cityKey]?.[number] || safeFallbackPhoto(cityKey, image, index);
    return {
      ...image,
      id: `${cityKey}-${index}`,
      title,
      category,
      location,
      keywords,
      description: exactDescription || poeticDescription(title, city.name, category, location),
      shape: ['portrait', 'landscape', 'square', 'portrait', 'landscape'][index % 5],
    };
  });
}

export default function TravelPhotoGallery({ cityKey, images }) {
  const city = CITY_COPY[cityKey];
  const isMemoryGallery = cityKey === 'memories';
  const photos = useMemo(() => enrichImages(cityKey, images), [cityKey, images]);
  const categories = useMemo(() => ['All', ...Array.from(new Set(photos.map((photo) => photo.category)))], [photos]);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(null);
  const [flippedPhotoId, setFlippedPhotoId] = useState(null);
  const [revealedPhotoIds, setRevealedPhotoIds] = useState(() => new Set());
  const [isTouchLike, setIsTouchLike] = useState(false);

  const filteredPhotos = useMemo(() => {
    if (isMemoryGallery) return photos;
    const search = query.trim().toLowerCase();
    return photos.filter((photo) => {
      const matchesCategory = activeCategory === 'All' || photo.category === activeCategory;
      const haystack = [photo.title, photo.location, photo.category, photo.description, photo.keywords.join(' ')].join(' ').toLowerCase();
      return matchesCategory && (!search || haystack.includes(search));
    });
  }, [activeCategory, isMemoryGallery, photos, query]);

  const visiblePhotos = filteredPhotos;
  const activePhoto = activeIndex === null ? null : filteredPhotos[activeIndex];

  useEffect(() => {
    setActiveIndex(null);
    setFlippedPhotoId(null);
  }, [query, activeCategory]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: none), (pointer: coarse)');
    const updateInputMode = () => setIsTouchLike(mediaQuery.matches);
    updateInputMode();
    mediaQuery.addEventListener('change', updateInputMode);
    return () => mediaQuery.removeEventListener('change', updateInputMode);
  }, []);

  useEffect(() => {
    if (!activePhoto) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveIndex(null);
      if (event.key === 'ArrowLeft') setActiveIndex((index) => (index === null ? index : (index - 1 + filteredPhotos.length) % filteredPhotos.length));
      if (event.key === 'ArrowRight') setActiveIndex((index) => (index === null ? index : (index + 1) % filteredPhotos.length));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activePhoto, filteredPhotos.length]);

  const handleGalleryBackgroundClick = (event) => {
    if (!isTouchLike) return;
    if (event.target instanceof Element && event.target.closest('.travel-photo-card')) return;
    setFlippedPhotoId(null);
  };

  const revealMemoryPhoto = (photoId) => {
    setRevealedPhotoIds((current) => {
      if (current.has(photoId)) return current;
      const next = new Set(current);
      next.add(photoId);
      return next;
    });
  };

  const handlePhotoClick = (photo, index) => {
    if (isMemoryGallery) {
      if (!revealedPhotoIds.has(photo.id)) {
        revealMemoryPhoto(photo.id);
        return;
      }
      setActiveIndex(index);
      return;
    }
    if (isTouchLike && flippedPhotoId !== photo.id) {
      setFlippedPhotoId(photo.id);
      return;
    }
    setActiveIndex(index);
  };

  const closePhotoViewer = () => {
    setActiveIndex(null);
    setFlippedPhotoId(null);
  };

  return (
    <main className={`travel-gallery-page travel-gallery-page--${cityKey}`} onClick={handleGalleryBackgroundClick}>
      <div className="travel-gallery-grain" aria-hidden />
      <section className="travel-gallery-hero">
        <div className="travel-gallery-hero__glow" aria-hidden />
        {isMemoryGallery && (
          <div className="memory-hero-objects" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, index) => (
              <i key={index} className={`memory-hero-object memory-hero-object--${index % 8}`} />
            ))}
          </div>
        )}
        <p>{city.eyebrow}</p>
        <h1>{city.title}</h1>
        <span>{city.subtitle}</span>
      </section>

      {isMemoryGallery ? (
        <div className="memory-reveal-note" role="status" aria-live="polite">
          <i className="memory-reveal-note__float memory-reveal-note__float--one" aria-hidden="true" />
          <i className="memory-reveal-note__float memory-reveal-note__float--two" aria-hidden="true" />
          <i className="memory-reveal-note__float memory-reveal-note__float--three" aria-hidden="true" />
          <span>Core Memory Vault</span>
          <strong>Hover or tap.</strong>
          <p>Reveal the moment.</p>
        </div>
      ) : (
        <section className="travel-gallery-controls" aria-label={`${city.name} photo search and filters`}>
          <label className="travel-gallery-search">
            <span>Search</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={city.searchPlaceholder}
              aria-label={city.searchPlaceholder}
            />
          </label>
          <div className="travel-gallery-filter-row">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? 'is-active' : ''}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <p>{filteredPhotos.length} photos in this view - {photos.length} total in the {city.name} archive</p>
        </section>
      )}

      <section className="travel-masonry" aria-label={`${city.name} photo gallery`}>
        {visiblePhotos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            className={`travel-photo-card travel-photo-card--${photo.shape}${isMemoryGallery ? ' travel-photo-card--memory' : ''}${flippedPhotoId === photo.id ? ' is-flipped' : ''}${revealedPhotoIds.has(photo.id) ? ' is-revealed' : ''}`}
            style={isMemoryGallery ? { '--reveal-delay': `${Math.min(index, 12) * 60}ms` } : undefined}
            onClick={() => handlePhotoClick(photo, index)}
            onMouseEnter={isMemoryGallery ? () => revealMemoryPhoto(photo.id) : undefined}
            aria-label={`Open ${photo.title}`}
            aria-pressed={isMemoryGallery ? revealedPhotoIds.has(photo.id) : flippedPhotoId === photo.id}
          >
            <span className="travel-photo-card__inner">
              <span className="travel-photo-card__front">
                <img src={photo.src} alt={photo.title} loading={index < 8 ? 'eager' : 'lazy'} decoding="async" />
                {isMemoryGallery && (
                  <span className="memory-film-cover" aria-hidden="true">
                    <span>Hover or click</span>
                    <strong>View Memory</strong>
                  </span>
                )}
                <span className="travel-photo-card__caption">
                  <strong>{photo.title}</strong>
                  <small>{photo.location}</small>
                </span>
              </span>
              <span className="travel-photo-card__back">
                <strong>{photo.title}</strong>
                <small>{photo.location} - {photo.category}</small>
                <em>{photo.description}</em>
              </span>
            </span>
          </button>
        ))}
      </section>

      <footer className="travel-gallery-footer">
        <Link href={city.backHref}>{city.backLabel}</Link>
        <span>© 2026 - My Life</span>
      </footer>

      {activePhoto && (
        <div className="travel-lightbox" role="dialog" aria-modal="true" aria-labelledby="travel-lightbox-title">
          <button type="button" className="travel-lightbox__backdrop" onClick={closePhotoViewer} aria-label="Close photo viewer" />
          <article className="travel-lightbox__panel">
            <button type="button" className="travel-lightbox__close" onClick={closePhotoViewer} aria-label="Close photo viewer">
              Close
            </button>
            <img src={activePhoto.src} alt={activePhoto.title} />
            <div>
              <p>{activePhoto.category} - {activePhoto.location}</p>
              <h2 id="travel-lightbox-title">{activePhoto.title}</h2>
              <span>{activePhoto.description}</span>
              <nav aria-label="Photo navigation">
                <button type="button" onClick={() => setActiveIndex((activeIndex - 1 + filteredPhotos.length) % filteredPhotos.length)}>
                  Previous
                </button>
                <button type="button" onClick={() => setActiveIndex((activeIndex + 1) % filteredPhotos.length)}>
                  Next
                </button>
              </nav>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}


