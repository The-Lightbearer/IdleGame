// engine/prestige.js
// Handles Grand Convergence (prestige), Enlightenment Points, and prestige upgrades.

import { addJournalEntry } from '../ui/notifications.js';
import { recalculateMultipliers } from './research.js';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Looks up an upgrade definition by id from data.prestige (the array).
 * Returns undefined if not found.
 */
function findUpgrade(data, upgradeId) {
  const upgrades = Array.isArray(data.prestige) ? data.prestige : [];
  return upgrades.find((u) => u.id === upgradeId);
}

/**
 * Returns the number of completed research nodes that have the given tier.
 */
function countCompletedByTier(state, data, tier) {
  const nodes = (data.disciplines && data.disciplines.nodes) || [];
  return state.research.completed.filter((nodeId) => {
    const node = nodes.find((n) => n.id === nodeId);
    return node && node.tier === tier;
  }).length;
}

// ---------------------------------------------------------------------------
// Exported functions
// ---------------------------------------------------------------------------

/**
 * Returns true if the player is eligible for Grand Convergence:
 * at least one Tier-4 research node must be completed.
 *
 * @param {object} state
 * @param {object} data
 * @returns {boolean}
 */
export function canConverge(state, data) {
  const nodes = (data.disciplines && data.disciplines.nodes) || [];
  return state.research.completed.some((nodeId) => {
    const node = nodes.find((n) => n.id === nodeId);
    return node && node.tier === 4;
  });
}

/**
 * Calculates the Enlightenment Points earned for the current run.
 *
 * Formula:
 *   (completed nodes * 2) + (found discoveries * 5) + (challenges completed * 3)
 *   + (tier-4 completed nodes * 10)
 *
 * @param {object} state
 * @param {object} data
 * @returns {number}
 */
export function calculateEP(state, data) {
  const tier4Count = countCompletedByTier(state, data, 4);

  return (
    (state.research.completed.length * 2) +
    (state.discoveries.found.length * 5) +
    (state.challenges.completed * 3) +
    (tier4Count * 10)
  );
}

/**
 * Performs the Grand Convergence (prestige reset).
 *
 * Steps:
 *  1.  Add EP to state.prestige.enlightenmentPoints.
 *  2.  Copy discovery texts into state.prestige.wizardMemory (no duplicates).
 *  3.  Reset resources (amounts, totals).
 *  4.  Reset generators (counts; levels reset to 1, or 2 if resonant_generators purchased).
 *  5.  Reset research (completed list and in-progress slot).
 *  6.  Reset combat state.
 *  7.  Reset events (keep discoveredHidden).
 *  8.  Reset discoveries counters (keep found array).
 *  9.  Reset challenges.
 * 10.  Reset multipliers.
 * 11.  Increment convergenceCount.
 * 12.  If convergence_echo purchased, set convergenceTickCounter = 600.
 * 13.  If deep_memory purchased, set pendingDeepMemory flag.
 * 14.  Recalculate multipliers from prestige effects.
 * 15.  Add journal entry.
 *
 * @param {object} state
 * @param {object} data
 */
export function converge(state, data) {
  // 1. Calculate and award EP
  const ep = calculateEP(state, data);
  state.prestige.enlightenmentPoints += ep;

  // 2. Copy discovery texts to wizardMemory (no duplicates)
  const discoveries = (data.events && data.events.discoveries) || [];
  for (const foundId of state.discoveries.found) {
    const disc = discoveries.find((d) => d.id === foundId);
    if (disc && disc.discovery_text) {
      if (!state.prestige.wizardMemory.includes(disc.discovery_text)) {
        state.prestige.wizardMemory.push(disc.discovery_text);
      }
    }
  }

  // 3. Reset resources
  for (const key of Object.keys(state.resources)) {
    state.resources[key].amount = 0;
    state.resources[key].totalEarned = 0;
    state.resources[key].totalSpent = 0;
  }

  // 4. Reset generators
  const startLevel =
    (state.prestige.upgrades && state.prestige.upgrades.resonant_generators)
      ? 2
      : 1;
  for (const key of Object.keys(state.generators)) {
    state.generators[key].count = 0;
    state.generators[key].level = startLevel;
  }

  // 5. Reset research
  state.research.completed = [];
  state.research.inProgress = null;

  // 6. Reset combat
  state.combat.active = null;
  state.combat.health = 100;
  state.combat.cooldowns = {};
  state.combat.stance = 'balanced';
  state.combat.recovery = 0;
  state.combat.inventory = {};
  state.combat.log = [];

  // 7. Reset events (keep discoveredHidden)
  state.events.active = null;
  state.events.history = [];
  state.events.lastEventTick = 0;

  // 8. Reset discoveries counters (keep found array)
  state.discoveries.counters = {};

  // 9. Reset challenges
  state.challenges.active = null;
  state.challenges.completed = 0;
  state.challenges.lastChallengeTick = 0;

  // 10. Reset multipliers
  state.multipliers = {};

  // 11. Increment convergence count
  state.prestige.convergenceCount += 1;

  // 12. convergence_echo: start burst counter
  if (state.prestige.upgrades && state.prestige.upgrades.convergence_echo) {
    state.prestige.convergenceTickCounter = 600;
  }

  // 13. deep_memory: flag for UI to handle discipline selection
  if (state.prestige.upgrades && state.prestige.upgrades.deep_memory) {
    state.prestige.pendingDeepMemory = true;
  }

  // 14. Rebuild multipliers from prestige effects
  recalculateMultipliers(state, data);

  // 15. Journal entry
  addJournalEntry(
    state,
    `The Grand Convergence complete. ${ep} Enlightenment Points earned.`,
    'info'
  );
}

/**
 * Attempts to purchase one level of a prestige upgrade.
 * Deducts EP and increments the upgrade level on success.
 *
 * @param {object} state
 * @param {object} data
 * @param {string} upgradeId
 * @returns {boolean} true if purchase succeeded, false otherwise.
 */
export function buyUpgrade(state, data, upgradeId) {
  const upgrade = findUpgrade(data, upgradeId);
  if (!upgrade) return false;

  const currentLevel = state.prestige.upgrades[upgradeId] || 0;

  // Cannot exceed max level
  if (currentLevel >= upgrade.max_level) return false;

  const cost = getUpgradeCost(data, upgradeId, currentLevel);

  // Must have enough EP
  if (state.prestige.enlightenmentPoints < cost) return false;

  state.prestige.enlightenmentPoints -= cost;
  state.prestige.upgrades[upgradeId] = currentLevel + 1;

  return true;
}

/**
 * Returns the EP cost for the next level of an upgrade.
 *
 * Formula: cost_base * cost_scaling ^ currentLevel
 *
 * @param {object} data
 * @param {string} upgradeId
 * @param {number} currentLevel - The player's current level (0 = not yet purchased).
 * @returns {number}
 */
export function getUpgradeCost(data, upgradeId, currentLevel) {
  const upgrade = findUpgrade(data, upgradeId);
  if (!upgrade) return Infinity;
  return upgrade.cost_base * Math.pow(upgrade.cost_scaling, currentLevel);
}

/**
 * Returns an array of active prestige effect objects with computed values,
 * suitable for use in multiplier recalculation.
 *
 * Each returned object contains the full effect definition plus a
 * `computed_value` field representing the total bonus at the purchased level.
 *
 * @param {object} state
 * @param {object} data
 * @returns {Array<object>}
 */
export function getPrestigeEffects(state, data) {
  const upgradeDefs = Array.isArray(data.prestige) ? data.prestige : [];
  const purchased = (state.prestige && state.prestige.upgrades) || {};
  const effects = [];

  for (const def of upgradeDefs) {
    const level = purchased[def.id] || 0;
    if (level === 0) continue;

    const effect = { ...def.effect, upgrade_id: def.id, level };

    // Attach a computed_value for effects that scale per level
    if (def.effect.value_per_level !== undefined) {
      effect.computed_value = def.effect.value_per_level * level;
    } else if (def.effect.value !== undefined) {
      effect.computed_value = def.effect.value;
    } else if (def.effect.multiplier !== undefined) {
      effect.computed_value = def.effect.multiplier;
    }

    effects.push(effect);
  }

  return effects;
}
