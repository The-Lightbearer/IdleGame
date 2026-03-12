// engine/events.js
// Events engine: random events, discoveries, challenges, and condition evaluation.

import { weightedRandom } from '../util/random.js';
import { addJournalEntry } from '../ui/notifications.js';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Returns true if the given discipline has at least one node in
 * state.research.completed.
 */
function isDisciplineUnlocked(state, data, disciplineId) {
  const nodes = (data.disciplines && data.disciplines.nodes) || [];
  return nodes.some(
    (n) => n.discipline === disciplineId && state.research.completed.includes(n.id)
  );
}

/**
 * Returns true if all `requires` conditions for an event definition are met.
 * Currently supports: { discipline_unlocked: "disciplineId" }.
 */
function requiresMet(state, data, requires) {
  if (!requires || Object.keys(requires).length === 0) return true;
  if (requires.discipline_unlocked) {
    return isDisciplineUnlocked(state, data, requires.discipline_unlocked);
  }
  return true;
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
 * Applies a single outcome object to state.
 * Supported outcome types: 'resource', 'narrative'.
 */
function applyOutcome(state, outcome) {
  if (outcome.type === 'resource') {
    ensureResource(state, outcome.resource);
    const delta = outcome.amount || 0;
    state.resources[outcome.resource].amount += delta;
    if (delta > 0) {
      state.resources[outcome.resource].totalEarned += delta;
    } else if (delta < 0) {
      state.resources[outcome.resource].totalSpent += Math.abs(delta);
    }
  } else if (outcome.type === 'narrative') {
    addJournalEntry(state, outcome.text || '', 'event');
  }
}

/**
 * Applies an array of outcomes to state.
 */
function applyOutcomes(state, outcomes) {
  if (!Array.isArray(outcomes)) return;
  for (const outcome of outcomes) {
    applyOutcome(state, outcome);
  }
}

/**
 * Applies a discovery reward object { arcane_knowledge: N, ... } to state.resources.
 */
function applyReward(state, reward) {
  if (!reward) return;
  for (const [resourceId, amount] of Object.entries(reward)) {
    ensureResource(state, resourceId);
    state.resources[resourceId].amount += amount;
    if (amount > 0) {
      state.resources[resourceId].totalEarned += amount;
    }
  }
}

/**
 * Returns a random integer in [min, max] (inclusive).
 */
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ---------------------------------------------------------------------------
// evaluateCondition
// ---------------------------------------------------------------------------

/**
 * Recursively evaluates a condition object against the current state.
 *
 * Supported condition types:
 *   threshold   — resource amount >= value. Optional constraint: never_spent.
 *   counter     — counter[event] >= count. Optional constraint: consecutive.
 *   combination — every node ID in condition.nodes exists in research.completed.
 *   all_of      — every sub-condition passes.
 *   any_of      — at least one sub-condition passes.
 *
 * @param {object} state
 * @param {object} condition
 * @returns {boolean}
 */
export function evaluateCondition(state, condition) {
  if (!condition) return false;

  switch (condition.type) {
    case 'threshold': {
      const res = state.resources[condition.resource];
      const amount = res ? res.amount : 0;
      if (amount < condition.value) return false;
      if (condition.constraint && condition.constraint.type === 'never_spent') {
        const totalSpent = res ? res.totalSpent : 0;
        if (totalSpent !== 0) return false;
      }
      return true;
    }

    case 'counter': {
      const counters = state.discoveries.counters || {};
      if (condition.constraint && condition.constraint.type === 'consecutive') {
        const consecutiveKey = condition.event + '_consecutive';
        const consecutiveCount = counters[consecutiveKey] || 0;
        return consecutiveCount >= condition.count;
      }
      const count = counters[condition.event] || 0;
      return count >= condition.count;
    }

    case 'combination': {
      const completed = state.research.completed || [];
      return condition.nodes.every((nodeId) => completed.includes(nodeId));
    }

    case 'all_of': {
      return condition.conditions.every((sub) => evaluateCondition(state, sub));
    }

    case 'any_of': {
      return condition.conditions.some((sub) => evaluateCondition(state, sub));
    }

    default:
      return false;
  }
}

// ---------------------------------------------------------------------------
// trackEvent / resetConsecutive
// ---------------------------------------------------------------------------

/**
 * Increments the counter for the given event type and its consecutive variant.
 * Called by other engines (e.g. combat engine on win/loss, research engine on complete).
 *
 * @param {object} state
 * @param {string} eventType
 */
export function trackEvent(state, eventType) {
  const counters = state.discoveries.counters;
  counters[eventType] = (counters[eventType] || 0) + 1;
  counters[eventType + '_consecutive'] = (counters[eventType + '_consecutive'] || 0) + 1;
}

/**
 * Resets the consecutive counter for the given event type to 0.
 * E.g. called on combat_win to reset combat_loss_consecutive.
 *
 * @param {object} state
 * @param {string} eventType
 */
export function resetConsecutive(state, eventType) {
  state.discoveries.counters[eventType + '_consecutive'] = 0;
}

// ---------------------------------------------------------------------------
// getChallengeProgress
// ---------------------------------------------------------------------------

/**
 * Returns the current challenge progress, or null if no challenge is active.
 *
 * @param {object} state
 * @returns {{ name: string, progress: number, remaining: number } | null}
 */
export function getChallengeProgress(state) {
  const active = state.challenges.active;
  if (!active) return null;

  const { challengeDef, remaining, progress } = active;
  const total = challengeDef.duration || 1;
  const progressFraction = Math.min(1, progress);

  return {
    name: challengeDef.name || challengeDef.id,
    progress: progressFraction,
    remaining,
  };
}

// ---------------------------------------------------------------------------
// makeChoice
// ---------------------------------------------------------------------------

/**
 * Resolves the player's choice for the currently active event.
 * Applies outcomes, records hidden choice discovery, clears active event,
 * and pushes the event to history.
 *
 * @param {object} state
 * @param {object} data
 * @param {number} choiceIndex
 */
export function makeChoice(state, data, choiceIndex) {
  const activeEvent = state.events.active;
  if (!activeEvent) return;

  const { eventDef } = activeEvent;
  const choices = eventDef.choices || [];
  const choice = choices[choiceIndex];
  if (!choice) return;

  // Apply outcomes: weighted outcome_sets or direct outcomes
  if (Array.isArray(choice.outcome_sets) && choice.outcome_sets.length > 0) {
    const selectedSet = weightedRandom(choice.outcome_sets);
    if (selectedSet) {
      applyOutcomes(state, selectedSet.outcomes);
    }
  } else if (Array.isArray(choice.outcomes)) {
    applyOutcomes(state, choice.outcomes);
  }

  // Record hidden choice discovery
  if (choice.hidden && !state.events.discoveredHidden.includes(choice.label)) {
    state.events.discoveredHidden.push(choice.label);
  }

  // Clear active event and push to history
  state.events.history.push(eventDef.id);
  state.events.active = null;
}

// ---------------------------------------------------------------------------
// tick
// ---------------------------------------------------------------------------

/**
 * Called once per game tick. Handles:
 *  1. Early-out if an event is awaiting player choice.
 *  2. Active challenge progress update and expiry/completion.
 *  3. Discovery condition checks.
 *  4. Event timer: fire a random eligible event.
 *  5. Challenge timer: start a new random challenge.
 *
 * @param {object} state
 * @param {object} data
 */
export function tick(state, data) {
  // -------------------------------------------------------------------------
  // 1. If an event is awaiting player choice, do nothing this tick.
  // -------------------------------------------------------------------------
  if (state.events.active) return;

  // -------------------------------------------------------------------------
  // 2. Active challenge: update progress, decrement timer, check expiry/completion.
  // -------------------------------------------------------------------------
  if (state.challenges.active) {
    const active = state.challenges.active;
    const objective = active.challengeDef.objective;

    // Update progress based on objective type
    if (objective.type === 'generate') {
      const resourceId = objective.resource;
      const currentAmount = state.resources[resourceId]
        ? state.resources[resourceId].amount
        : 0;
      const baseline = active.baseline[resourceId] !== undefined
        ? active.baseline[resourceId]
        : 0;
      const generated = Math.max(0, currentAmount - baseline);
      // progress is a 0-1 fraction
      active.progress = Math.min(1, generated / (objective.amount || 1));
    } else if (objective.type === 'counter') {
      const currentCount = state.discoveries.counters[objective.event] || 0;
      const baselineCount = active.baseline[objective.event] !== undefined
        ? active.baseline[objective.event]
        : 0;
      const achieved = Math.max(0, currentCount - baselineCount);
      active.progress = Math.min(1, achieved / (objective.count || 1));
    }

    // Decrement timer
    active.remaining -= 1;

    // Check objective met (before expiry check — reward on time is valid)
    if (active.progress >= 1) {
      // Apply reward
      const reward = active.challengeDef.reward || {};
      applyReward(state, reward);
      state.challenges.completed += 1;
      addJournalEntry(
        state,
        `Challenge complete: ${active.challengeDef.name || active.challengeDef.id}`,
        'info'
      );
      state.challenges.active = null;
    } else if (active.remaining <= 0) {
      // Challenge expired without completion
      addJournalEntry(
        state,
        `Challenge failed: ${active.challengeDef.name || active.challengeDef.id}`,
        'info'
      );
      state.challenges.active = null;
    }
  }

  // -------------------------------------------------------------------------
  // 3. Check discoveries: evaluate conditions for any not-yet-found discovery.
  // -------------------------------------------------------------------------
  const discoveries = (data.events && data.events.discoveries) || [];
  for (const discovery of discoveries) {
    if (state.discoveries.found.includes(discovery.id)) continue;
    if (evaluateCondition(state, discovery.condition)) {
      state.discoveries.found.push(discovery.id);
      applyReward(state, discovery.reward);
      addJournalEntry(
        state,
        `Discovery: ${discovery.name} — ${discovery.discovery_text || discovery.description}`,
        'discovery'
      );
    }
  }

  // -------------------------------------------------------------------------
  // 4. Event timer: fire a weighted random event at a random interval 300–900 ticks.
  // -------------------------------------------------------------------------
  state.events.lastEventTick = (state.events.lastEventTick || 0) + 1;

  // Initialise the per-run threshold if it hasn't been set yet
  if (!state.events._nextEventThreshold) {
    state.events._nextEventThreshold = randInt(300, 900);
  }

  if (state.events.lastEventTick >= state.events._nextEventThreshold) {
    const eventDefs = (data.events && data.events.events) || [];
    const eligible = eventDefs.filter((e) => requiresMet(state, data, e.requires));
    if (eligible.length > 0) {
      const chosen = weightedRandom(eligible);
      if (chosen) {
        state.events.active = { eventDef: chosen, timestamp: Date.now() };
      }
    }
    // Reset timer and pick a new random threshold
    state.events.lastEventTick = 0;
    state.events._nextEventThreshold = randInt(300, 900);
  }

  // -------------------------------------------------------------------------
  // 5. Challenge timer: start a new challenge at a random interval 1800–3600 ticks.
  // -------------------------------------------------------------------------
  if (!state.challenges.active) {
    state.challenges.lastChallengeTick = (state.challenges.lastChallengeTick || 0) + 1;

    if (!state.challenges._nextChallengeThreshold) {
      state.challenges._nextChallengeThreshold = randInt(1800, 3600);
    }

    if (state.challenges.lastChallengeTick >= state.challenges._nextChallengeThreshold) {
      const challengeDefs = (data.events && data.events.challenges) || [];
      if (challengeDefs.length > 0) {
        const chosen = weightedRandom(
          challengeDefs.map((c) => ({ ...c, weight: c.weight || 1 }))
        );
        if (chosen) {
          const baseline = {};

          // For 'generate' type: record current resource amount as baseline
          if (chosen.objective && chosen.objective.type === 'generate') {
            const resourceId = chosen.objective.resource;
            baseline[resourceId] = state.resources[resourceId]
              ? state.resources[resourceId].amount
              : 0;
          }

          // For 'counter' type: record current counter value as baseline
          if (chosen.objective && chosen.objective.type === 'counter') {
            const eventType = chosen.objective.event;
            baseline[eventType] = state.discoveries.counters[eventType] || 0;
          }

          state.challenges.active = {
            challengeDef: chosen,
            remaining: chosen.duration,
            baseline,
            progress: 0,
          };

          addJournalEntry(
            state,
            `New challenge: ${chosen.name} — ${chosen.description}`,
            'info'
          );
        }
      }
      // Reset timer and pick a new random threshold
      state.challenges.lastChallengeTick = 0;
      state.challenges._nextChallengeThreshold = randInt(1800, 3600);
    }
  }
}
