export const FLOWER_OPTIONS = [
  { id: 'roses', name: 'Roses' },
  { id: 'lilies', name: 'Lilies' },
  { id: 'tulips', name: 'Tulips' },
  { id: 'peonies', name: 'Peonies' },
  { id: 'sunflowers', name: 'Sunflowers' },
  { id: 'daisies', name: 'Daisies' },
  { id: 'orchids', name: 'Orchids' },
  { id: 'carnations', name: 'Carnations' },
  { id: 'hydrangeas', name: 'Hydrangeas' },
  { id: 'eucalyptus', name: 'Eucalyptus (filler)' },
  { id: 'babys_breath', name: "Baby's Breath (filler)" },
  { id: 'ranunculus', name: 'Ranunculus' },
];

export const COLOR_PALETTES = [
  {
    id: 'pastel_dream',
    name: 'Pastel Dream',
    description: 'a soft, dreamy mix of pastel pinks, lavenders, and creamy whites',
    colors: ['#FADADD', '#E6E6FA', '#FFFACD'],
  },
  {
    id: 'vibrant_meadow',
    name: 'Vibrant Meadow',
    description: 'a bold and cheerful palette of bright yellows, oranges, and hot pinks',
    colors: ['#FFEA00', '#FF8C00', '#FF69B4'],
  },
  {
    id: 'classic_romance',
    name: 'Classic Romance',
    description: 'a timeless and elegant combination of deep reds, blush pinks, and whites',
    colors: ['#A52A2A', '#FBC4C4', '#FFFFFF'],
  },
  {
    id: 'monochromatic_white',
    name: 'Monochromatic White',
    description: 'a sophisticated and clean palette of whites, ivories, and creams',
    colors: ['#FFFFFF', '#FFFFF0', '#F5F5DC'],
  },
  {
    id: 'sunset_glow',
    name: 'Sunset Glow',
    description: 'a warm and radiant blend of peach, coral, and golden yellow tones',
    colors: ['#FFDAB9', '#FF7F50', '#FFC94E'],
  },
];

export const ARRANGEMENT_STYLES = [
  {
    id: 'wild_organic',
    name: 'Wild & Organic',
    description: 'a loose, natural, and asymmetrical arrangement',
  },
  {
    id: 'classic_round',
    name: 'Classic Round',
    description: 'a traditional, compact, and dome-shaped bouquet',
  },
  {
    id: 'modern_minimalist',
    name: 'Modern Minimalist',
    description: 'a simple, clean, and structured arrangement focusing on form and lines',
  },
  {
    id: 'cascading_waterfall',
    name: 'Cascading Waterfall',
    description: 'a dramatic, overflowing arrangement that drapes downwards',
  },
  {
    id: 'rustic_charm',
    name: 'Rustic Charm',
    description:
      'an arrangement with a natural, earthy, and slightly unrefined feel, often using textures like burlap or twine',
  },
  {
    id: 'whimsical_garden',
    name: 'Whimsical Garden',
    description:
      'a playful and enchanting style with a variety of flowers, colors, and textures, creating a magical look',
  },
];

export const SIZES = ['Small', 'Medium', 'Large', 'Extra Large'];

export const BOUQUET_SHAPES = ['Round', 'Asymmetrical', 'Cascading', 'Hand-tied', 'Posy'];

export const PRESET_BOUQUETS = [
  {
    name: 'Romantic Gesture',
    config: {
      flowers: ['roses', 'lilies', 'eucalyptus'],
      colorPalette: 'classic_romance',
      arrangementStyle: 'classic_round',
      size: 'Medium',
      shape: 'Round',
    },
  },
  {
    name: 'Sunshine in a Vase',
    config: {
      flowers: ['sunflowers', 'daisies', 'babys_breath'],
      colorPalette: 'vibrant_meadow',
      arrangementStyle: 'wild_organic',
      size: 'Large',
      shape: 'Hand-tied',
    },
  },
  {
    name: 'Elegant Simplicity',
    config: {
      flowers: ['orchids', 'tulips'],
      colorPalette: 'monochromatic_white',
      arrangementStyle: 'modern_minimalist',
      size: 'Small',
      shape: 'Posy',
    },
  },
];

export interface BouquetConfig {
  flowers: string[];
  customFlowers?: string;
  colorPalette: string;
  customColorPalette?: string;
  customColors?: string[];
  arrangementStyle: string;
  customArrangementStyle?: string;
  size: string;
  shape: string;
  customShape?: string;
  negativePrompt?: string;
  extras?: string;
}

export interface RecipeItem {
  name: string;
  quantity: number;
  pricePerStem: string;
}
