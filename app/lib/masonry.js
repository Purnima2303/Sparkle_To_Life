/**
 * Masonry layout utility
 * Generates asymmetric size variants for gallery items
 */

export const SIZE_VARIANTS = {
  sm: 'item-sm',      // 1x1 grid - short
  md: 'item-md',      // 1x2 grid - medium vertical
  lg: 'item-lg',      // 2x2 or 1x3 grid - tall vertical
};

/**
 * Get size class for image based on asymmetric pattern
 * Creates varied layout without repetition
 */
export function getSizeVariant(index, totalItems = 9) {
  // Asymmetric pattern that avoids same-size repetition
  const patterns = [
    [SIZE_VARIANTS.lg, SIZE_VARIANTS.md, SIZE_VARIANTS.sm],  // tall, medium, short
    [SIZE_VARIANTS.md, SIZE_VARIANTS.sm, SIZE_VARIANTS.md],  // medium, short, medium
    [SIZE_VARIANTS.sm, SIZE_VARIANTS.lg, SIZE_VARIANTS.md],  // short, tall, medium
    [SIZE_VARIANTS.md, SIZE_VARIANTS.md, SIZE_VARIANTS.lg],  // medium, medium, tall
    [SIZE_VARIANTS.lg, SIZE_VARIANTS.sm, SIZE_VARIANTS.md],  // tall, short, medium
  ];

  const cycleIndex = Math.floor(index / 3) % patterns.length;
  const positionInCycle = index % 3;
  
  return patterns[cycleIndex][positionInCycle];
}

/**
 * Map items with size variants
 */
export function mapWithSizes(items) {
  return items.map((item, index) => ({
    ...item,
    sizeVariant: getSizeVariant(index, items.length),
  }));
}

/**
 * Grid row span configuration
 */
export const GRID_ROW_SPAN = {
  [SIZE_VARIANTS.sm]: 1,
  [SIZE_VARIANTS.md]: 2,
  [SIZE_VARIANTS.lg]: 3,
};
