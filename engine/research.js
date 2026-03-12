// engine/research.js
// Handles research tree progression, node unlocking, and effect application.

import { canAfford, spend } from './resources.js';
import { addJournalEntry } from '../ui/notifications.js';

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Returns the speed multiplier for research based on prestige upgrades.
 * Each level of quickened_mind is 10% faster, so the duration multiplier is
 * 1 / (1 + level * 0.1).
 */
function getResearchSpeedMultiplier(state) {
  const upgrades = (state.prestige && state.prestige.upgrades) || {};
  const level = upgrades.quickened_mind ? upgrades.quickened_mind : 0;
  return 1 / (1 + level * 0.1);
}

/**
 * Finds a node by id from data.disciplines.nodes.
 * Returns undefined if not found.
 */
function findNode(data, nodeId) {
  const nodes = (data.disciplines && data.disciplines.nodes) || [];
  return nodes.find((n) => n.id === nodeId);
}

/**
 * Returns true if a discipline has at least one Tier-2 node in completed.
 */
function hasTier2InDiscipline(state, data, disciplineId) {
  const nodes = (data.disciplines && data.disciplines.nodes) || [];
  return nodes.some(
    (n) =>
      n.discipline === disciplineId &&
      n.tier === 2 &&
      state.research.completed.includes(n.id)
  );
}

/**
 * Returns true if the hidden-node synergy prerequisite is satisfied:
 * both disciplines named in synergy_pair each have at least one T2 node completed.
 */
function synergyPrereqMet(state, data, node) {
  if (!node.hidden || !Array.isArray(node.synergy_pair)) return true;
  return node.synergy_pair.every((disciplineId) =>
    hasTier2InDiscipline(state, data, disciplineId)
  );
}

// ---------------------------------------------------------------------------
// Exported functions
// ---------------------------------------------------------------------------

/**
 * Called once per game tick.
 * Checks whether the in-progress research node has completed.
 */
export function tick(state, data) {
  const inProgress = state.research.inProgress;
  if (!inProgress) return;

  const { nodeId, startTime, duration } = inProgress;
  const effectiveDuration = duration * getResearchSpeedMultiplier(state);

  if (Date.now() >= startTime + effectiveDuration * 1000) {
    // Mark as complete
    state.research.completed.push(nodeId);

    // Apply node effects
    const node = findNode(data, nodeId);
    if (node && Array.isArray(node.effects)) {
      applyEffects(state, data, node.effects);
    }

    // Clear in-progress slot
    state.research.inProgress = null;

    // Journal notification
    const nodeName = node ? node.name : nodeId;
    addJournalEntry(state, `Research complete: ${nodeName}`, 'info');
  }
}

/**
 * Applies an array of effect objects to the game state.
 *
 * Supported effect types:
 *   resource_multiplier  — multiplies state.multipliers[resource] by value
 *   unlock_spell         — no-op (spell system comes later)
 *   unlock_generator     — no-op (generators check research.completed directly)
 */
export function applyEffects(state, data, effects) {
  for (const effect of effects) {
    if (effect.type === 'resource_multiplier') {
      const current = state.multipliers[effect.resource] || 1;
      state.multipliers[effect.resource] = current * effect.value;
    }
    // unlock_spell and unlock_generator are intentional no-ops here
  }
}

/**
 * Returns true if the player can start researching the given node.
 * Checks: not completed, not in-progress, prerequisites met, synergy (if hidden),
 * and resource affordability.
 */
export function canResearch(state, data, nodeId) {
  const node = findNode(data, nodeId);
  if (!node) return false;

  // Not already completed
  if (state.research.completed.includes(nodeId)) return false;

  // Not currently in progress
  if (state.research.inProgress && state.research.inProgress.nodeId === nodeId) return false;

  // All prerequisite nodes must be completed
  const requires = node.requires || [];
  if (!requires.every((reqId) => state.research.completed.includes(reqId))) return false;

  // Hidden nodes: synergy prerequisites must be met
  if (node.hidden && !synergyPrereqMet(state, data, node)) return false;

  // Must be able to afford the cost
  if (!canAfford(state, node.cost || {})) return false;

  return true;
}

/**
 * Starts researching a node after validating via canResearch.
 * Spends resources and sets state.research.inProgress.
 * Returns true on success, false if not eligible.
 */
export function startResearch(state, data, nodeId) {
  if (!canResearch(state, data, nodeId)) return false;

  const node = findNode(data, nodeId);
  spend(state, node.cost || {});

  state.research.inProgress = {
    nodeId,
    startTime: Date.now(),
    duration: node.duration,
  };

  return true;
}

/**
 * Returns progress information for the current in-progress research, or null.
 * progress: 0–1 (clamped), remaining: seconds left.
 */
export function getResearchProgress(state) {
  const inProgress = state.research.inProgress;
  if (!inProgress) return null;

  const { nodeId, startTime, duration } = inProgress;
  // Note: speed multiplier isn't applied here because startTime already pins
  // the wall-clock start; the tick() handler uses the same formula to detect
  // completion.  We re-derive effective duration for display purposes.
  const speedMultiplier = getResearchSpeedMultiplier(state);
  const effectiveDuration = duration * speedMultiplier;
  const elapsed = (Date.now() - startTime) / 1000;
  const progress = Math.min(1, elapsed / effectiveDuration);
  const remaining = Math.max(0, effectiveDuration - elapsed);

  return { nodeId, progress, remaining };
}

/**
 * Returns all nodes that are visible and have their prerequisites met for a
 * given discipline (including synergy nodes whose synergy_pair includes it).
 * Excludes already-completed nodes.
 */
export function getAvailableNodes(state, data, disciplineId) {
  const nodes = (data.disciplines && data.disciplines.nodes) || [];

  return nodes.filter((node) => {
    // Must belong to the requested discipline, or be a synergy node that
    // lists disciplineId in its synergy_pair.
    const inDiscipline =
      node.discipline === disciplineId ||
      (Array.isArray(node.synergy_pair) && node.synergy_pair.includes(disciplineId));
    if (!inDiscipline) return false;

    // Exclude completed nodes
    if (state.research.completed.includes(node.id)) return false;

    // Hidden nodes must have their synergy prerequisites met to be visible
    if (node.hidden && !synergyPrereqMet(state, data, node)) return false;

    // All requires must be completed (prerequisites met)
    const requires = node.requires || [];
    if (!requires.every((reqId) => state.research.completed.includes(reqId))) return false;

    return true;
  });
}

/**
 * Returns all hidden synergy nodes whose requires prerequisites are all
 * completed (i.e. ready to research, regardless of resource cost).
 */
export function getVisibleSynergyNodes(state, data) {
  const nodes = (data.disciplines && data.disciplines.nodes) || [];

  return nodes.filter((node) => {
    if (!node.hidden) return false;

    // All required nodes must be in completed
    const requires = node.requires || [];
    return requires.every((reqId) => state.research.completed.includes(reqId));
  });
}

/**
 * Rebuilds state.multipliers from scratch based on completed research nodes
 * and active prestige upgrades.
 */
export function recalculateMultipliers(state, data) {
  const nodes = (data.disciplines && data.disciplines.nodes) || [];
  const accum = {};

  // Accumulate resource_multiplier effects from all completed nodes
  for (const nodeId of state.research.completed) {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node || !Array.isArray(node.effects)) continue;

    for (const effect of node.effects) {
      if (effect.type === 'resource_multiplier') {
        accum[effect.resource] = (accum[effect.resource] || 1) * effect.value;
      }
    }
  }

  // Apply prestige bonus: mana_attunement adds +25% per level to mana multiplier
  const upgrades = (state.prestige && state.prestige.upgrades) || {};
  const manaAttunement = upgrades.mana_attunement || 0;
  if (manaAttunement > 0) {
    accum['mana'] = (accum['mana'] || 1) * (1 + manaAttunement * 0.25);
  }

  state.multipliers = accum;
}
