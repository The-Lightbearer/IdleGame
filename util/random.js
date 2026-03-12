/**
 * Select a random item from an array based on weights
 * @param {Array<{weight: number, ...}>} items - Array of items with weight property
 * @returns {*} One item selected based on weight distribution
 */
export function weightedRandom(items) {
  if (!items || items.length === 0) return null;

  // Sum all weights
  const totalWeight = items.reduce((sum, item) => sum + (item.weight || 0), 0);

  if (totalWeight <= 0) return null;

  // Pick a random point in the weight range
  let randomPoint = Math.random() * totalWeight;

  // Iterate through items to find the selected one
  for (const item of items) {
    randomPoint -= item.weight;
    if (randomPoint <= 0) {
      return item;
    }
  }

  // Fallback (should not reach here with valid weights)
  return items[items.length - 1];
}

/**
 * Generate a random float within a range
 * @param {number} min - Minimum value (inclusive)
 * @param {number} max - Maximum value (exclusive)
 * @returns {number} Random float in range [min, max)
 */
export function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

/**
 * Evaluate a probability and return true/false
 * @param {number} probability - Probability between 0 and 1
 * @returns {boolean} True with probability%, false otherwise
 */
export function chance(probability) {
  return Math.random() < probability;
}
