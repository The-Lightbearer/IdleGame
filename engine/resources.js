// engine/resources.js
// Handles passive resource generation, generator purchases/upgrades, and spending.

/**
 * Returns the current multiplier for a given resource.
 * Falls back to 1 if no multiplier is recorded.
 */
export function getMultiplier(state, resourceId) {
  return state.multipliers[resourceId] || 1;
}

/**
 * Ensures a resource slot exists in state.resources.
 */
function ensureResource(state, id) {
  if (!state.resources[id]) {
    state.resources[id] = { amount: 0, totalEarned: 0, totalSpent: 0 };
  }
}

/**
 * Ensures a generator slot exists in state.generators.
 */
function ensureGenerator(state, id) {
  if (!state.generators[id]) {
    state.generators[id] = { count: 0, level: 1 };
  }
}

/**
 * Called once per game tick (may be called multiple times per wall-clock second
 * during convergence burst).
 *
 * 1. Applies base_rate * multiplier for every resource definition.
 * 2. Applies generator output for every generator the player owns.
 * 3. Updates totalEarned for resources that increased.
 */
export function tick(state, data) {
  // data.resources is the parsed resources.json: { resources: [...], generators: [...] }
  const resourceDefs = (data.resources && data.resources.resources) || [];
  const generatorDefs = (data.resources && data.resources.generators) || [];

  // --- 1. Base passive income ---
  for (const def of resourceDefs) {
    const { id, base_rate } = def;
    if (!base_rate) continue; // skip zero-rate resources
    ensureResource(state, id);
    const gain = base_rate * getMultiplier(state, id);
    state.resources[id].amount += gain;
    state.resources[id].totalEarned += gain;
  }

  // --- 2. Generator output ---
  for (const def of generatorDefs) {
    const { id, base_output, output_resource } = def;
    const genState = state.generators[id];
    if (!genState || genState.count <= 0) continue;

    ensureResource(state, output_resource);

    const levelMultiplier = 1 + 0.5 * (genState.level - 1);
    const gain =
      base_output * levelMultiplier * genState.count * getMultiplier(state, output_resource);

    state.resources[output_resource].amount += gain;
    state.resources[output_resource].totalEarned += gain;
  }
}

/**
 * Returns the current per-second generation rate for a resource:
 * base_rate * multiplier  +  sum of all generator contributions.
 */
export function getGenerationRate(state, data, resourceId) {
  const resourceDefs = (data.resources && data.resources.resources) || [];
  const generatorDefs = (data.resources && data.resources.generators) || [];

  // Base rate
  const def = resourceDefs.find((r) => r.id === resourceId);
  const baseRate = def ? (def.base_rate || 0) * getMultiplier(state, resourceId) : 0;

  // Generator contributions
  const genRate = generatorDefs
    .filter((g) => g.output_resource === resourceId)
    .reduce((sum, g) => {
      const genState = state.generators[g.id];
      if (!genState || genState.count <= 0) return sum;
      const levelMultiplier = 1 + 0.5 * (genState.level - 1);
      return (
        sum + g.base_output * levelMultiplier * genState.count * getMultiplier(state, resourceId)
      );
    }, 0);

  return baseRate + genRate;
}

/**
 * Returns true if the player can afford all costs in the cost object.
 * cost: { resourceId: amount, ... }
 */
export function canAfford(state, cost) {
  for (const [resourceId, amount] of Object.entries(cost)) {
    const owned = state.resources[resourceId] ? state.resources[resourceId].amount : 0;
    if (owned < amount) return false;
  }
  return true;
}

/**
 * Deducts each resource in cost from state and updates totalSpent.
 * Caller must verify affordability before calling this.
 */
export function spend(state, cost) {
  for (const [resourceId, amount] of Object.entries(cost)) {
    ensureResource(state, resourceId);
    state.resources[resourceId].amount -= amount;
    state.resources[resourceId].totalSpent += amount;
  }
}

/**
 * Attempts to buy one unit of a generator.
 * Cost = each value in base_cost * 1.15^(currentCount).
 * Returns true on success, false if not affordable or definition missing.
 */
export function buyGenerator(state, data, generatorId) {
  const generatorDefs = (data.resources && data.resources.generators) || [];
  const def = generatorDefs.find((g) => g.id === generatorId);
  if (!def) return false;

  ensureGenerator(state, generatorId);
  const currentCount = state.generators[generatorId].count;

  // Scale each cost component by 1.15^count
  const scaleFactor = Math.pow(1.15, currentCount);
  const cost = {};
  for (const [resourceId, baseAmount] of Object.entries(def.base_cost)) {
    cost[resourceId] = baseAmount * scaleFactor;
  }

  if (!canAfford(state, cost)) return false;

  spend(state, cost);
  state.generators[generatorId].count += 1;
  return true;
}

/**
 * Attempts to upgrade a generator by one level.
 * Cost = each value in upgrade_cost * 2^(currentLevel - 1).
 * Returns true on success, false if max level reached, not affordable, or definition missing.
 */
export function upgradeGenerator(state, data, generatorId) {
  const generatorDefs = (data.resources && data.resources.generators) || [];
  const def = generatorDefs.find((g) => g.id === generatorId);
  if (!def) return false;

  ensureGenerator(state, generatorId);
  const genState = state.generators[generatorId];

  if (genState.level >= def.max_level) return false;

  // Scale each upgrade cost component by 2^(level - 1)
  const scaleFactor = Math.pow(2, genState.level - 1);
  const cost = {};
  for (const [resourceId, baseAmount] of Object.entries(def.upgrade_cost)) {
    cost[resourceId] = baseAmount * scaleFactor;
  }

  if (!canAfford(state, cost)) return false;

  spend(state, cost);
  genState.level += 1;
  return true;
}
