// engine/offline.js
// Calculates resource gains accumulated while the player was offline.

import { getGenerationRate } from './resources.js';

const MAX_OFFLINE_SECONDS = 28800; // 8 hours
const MIN_OFFLINE_SECONDS = 60;    // 1 minute — below this we skip the calculation

/**
 * Grants resources for time spent offline and returns a summary of the gains.
 *
 * @param {object} state - Live game state (mutated in place).
 * @param {object} data  - Static game data (data.resources.resources / generators).
 * @returns {object|null} Summary { elapsed, efficiency, gains } or null if elapsed < 60 s.
 */
export function calculateOfflineProgress(state, data) {
  // 1. Calculate elapsed seconds since last online timestamp.
  let elapsed = (Date.now() - state.settings.lastOnline) / 1000;

  // 2. Cap at 8 hours.
  elapsed = Math.min(elapsed, MAX_OFFLINE_SECONDS);

  // 3. Skip if less than a minute has passed.
  if (elapsed < MIN_OFFLINE_SECONDS) {
    return null;
  }

  // 4. Determine offline efficiency from prestige upgrade offline_mastery.
  const offlineMasteryLevel =
    (state.prestige.upgrades && state.prestige.upgrades['offline_mastery']) || 0;
  const efficiency = Math.min(0.5 + offlineMasteryLevel * 0.1, 0.9);

  // 5. Calculate gains for every resource and apply them to state.
  const resourceDefs = (data.resources && data.resources.resources) || [];
  const gains = {};

  for (const def of resourceDefs) {
    const { id } = def;

    // Use getGenerationRate which already incorporates base_rate, generator counts,
    // levels, and current multipliers — mirroring the tick logic without a full tick.
    const rate = getGenerationRate(state, data, id);
    if (rate <= 0) continue;

    const gain = rate * elapsed * efficiency;

    // Ensure the resource slot exists before adding to it.
    if (!state.resources[id]) {
      state.resources[id] = { amount: 0, totalEarned: 0, totalSpent: 0 };
    }

    state.resources[id].amount += gain;
    state.resources[id].totalEarned += gain;

    gains[id] = gain;
  }

  // 6. Mark when the player came back online.
  state.settings.lastOnline = Date.now();

  // 7. Return the summary (only resources that actually gained something).
  return { elapsed, efficiency, gains };
}
