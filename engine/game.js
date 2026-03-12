// engine/game.js
// Central coordinator: state factory, data loader, and game loop.

export function createInitialState() {
  return {
    resources: {},   // resourceId -> { amount, totalEarned, totalSpent }
    generators: {},  // generatorId -> { count, level }
    research: {
      completed: [],
      inProgress: null, // { nodeId, startTime, duration }
    },
    combat: {
      active: null,
      health: 100,
      cooldowns: {},
      stance: 'balanced',
      recovery: 0,
      inventory: {},
      log: [],
    },
    events: {
      active: null,
      history: [],
      discoveredHidden: [],
      lastEventTick: 0,
    },
    discoveries: {
      found: [],
      counters: {},
    },
    challenges: {
      active: null,
      completed: 0,
      lastChallengeTick: 0,
    },
    prestige: {
      enlightenmentPoints: 0,
      upgrades: {},
      convergenceCount: 0,
      wizardMemory: [],
      convergenceTickCounter: 0,
    },
    settings: {
      lastSave: 0,
      lastOnline: Date.now(),
      version: 1,
    },
    multipliers: {},
    journal: [],
    tick: 0,
  };
}

/**
 * Fetches all 6 data JSON files. Missing files resolve to {} or [].
 * Returns { resources, disciplines, spells, encounters, events, prestige }.
 */
export async function loadData() {
  const files = [
    { key: 'resources',    path: 'data/resources.json',    fallback: {} },
    { key: 'disciplines',  path: 'data/disciplines.json',  fallback: [] },
    { key: 'spells',       path: 'data/spells.json',       fallback: [] },
    { key: 'encounters',   path: 'data/encounters.json',   fallback: [] },
    { key: 'events',       path: 'data/events.json',       fallback: [] },
    { key: 'prestige',     path: 'data/prestige.json',     fallback: {} },
  ];

  const results = await Promise.all(
    files.map(async ({ key, path, fallback }) => {
      try {
        const res = await fetch(path);
        if (!res.ok) return { key, value: fallback };
        const json = await res.json();
        return { key, value: json };
      } catch {
        return { key, value: fallback };
      }
    })
  );

  return results.reduce((acc, { key, value }) => {
    acc[key] = value;
    return acc;
  }, {});
}

/**
 * Starts the 1 Hz game loop.
 *
 * @param {object} state   - Live game state (mutated in place each tick).
 * @param {object} data    - Static data loaded by loadData().
 * @param {object} engines - { resources, research, combat, events } — each exposes tick(state, data).
 * @param {Function} renderFn - Called after every tick with (state, data).
 * @returns {number} Interval ID (pass to clearInterval to stop the loop).
 */
export function startGameLoop(state, data, engines, renderFn) {
  const intervalId = setInterval(() => {
    state.tick += 1;

    // Determine speed multiplier (convergence burst mode).
    let speedMultiplier;
    if (state.prestige.convergenceTickCounter > 0) {
      speedMultiplier = 3;
      state.prestige.convergenceTickCounter -= 1;
    } else {
      speedMultiplier = 1;
    }

    // Run each engine speedMultiplier times per wall-clock tick.
    for (let i = 0; i < speedMultiplier; i++) {
      engines.resources.tick(state, data);
      engines.research.tick(state, data);
      engines.combat.tick(state, data);
      engines.events.tick(state, data);
    }

    renderFn(state, data);
  }, 1000);

  return intervalId;
}
