/**
 * Format a number for display with appropriate unit suffixes
 * @param {number} n - The number to format
 * @returns {string} Formatted number (e.g., "1.5K", "42.3", "999.9")
 */
export function formatNumber(n) {
  // Handle 0 and negative numbers
  if (n === 0) return "0";
  if (n < 0) return "-" + formatNumber(-n);

  // Under 1000: show with up to 1 decimal
  if (n < 1000) {
    // Remove trailing zeros and decimal point if not needed
    return parseFloat(n.toFixed(1)).toString();
  }

  // Define unit thresholds
  const units = [
    { threshold: 1e12, suffix: "T" },
    { threshold: 1e9, suffix: "B" },
    { threshold: 1e6, suffix: "M" },
    { threshold: 1e3, suffix: "K" },
  ];

  for (const unit of units) {
    if (n >= unit.threshold) {
      const scaled = n / unit.threshold;
      // Format to 1 decimal place, remove trailing zeros
      return parseFloat(scaled.toFixed(1)) + unit.suffix;
    }
  }

  return n.toString();
}

/**
 * Format seconds into a human-readable time string
 * @param {number} seconds - Number of seconds
 * @returns {string} Formatted time (e.g., "1h 1m 1s", "2m", "0s")
 */
export function formatTime(seconds) {
  if (seconds === 0) return "0s";

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [];
  if (hours > 0) parts.push(hours + "h");
  if (minutes > 0) parts.push(minutes + "m");
  if (secs > 0) parts.push(secs + "s");

  return parts.join(" ");
}
