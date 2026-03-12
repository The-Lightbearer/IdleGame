// ui/panels.js
// Panel rendering functions for the Research Tree and Generators views.

import { formatNumber, formatTime } from '../util/format.js';
import { canAfford } from '../engine/resources.js';

// ---------------------------------------------------------------------------
// Module-level state for tab selection (persists across renders)
// ---------------------------------------------------------------------------

// The currently selected discipline tab in the research panel.
// "synergies" is a special value for the Synergies tab.
export let activeDisciplineTab = 'temporal_arcana';

export function setActiveDisciplineTab(disciplineId) {
  activeDisciplineTab = disciplineId;
}

// ---------------------------------------------------------------------------
// Research Panel
// ---------------------------------------------------------------------------

/**
 * Renders the research panel for all disciplines plus a Synergies tab.
 *
 * @param {HTMLElement} container   - The view-panel element to render into.
 * @param {object}      state       - Live game state.
 * @param {object}      data        - Static game data.
 * @param {object}      engines     - Engine modules (must expose engines.research).
 */
export function renderResearchPanel(container, state, data, engines) {
  const disciplines = (data.disciplines && data.disciplines.disciplines) || [];

  // --- Discipline tab bar ---
  let html = '<div class="research-tabs">';
  for (const disc of disciplines) {
    const isActive = activeDisciplineTab === disc.id;
    html += `<button class="research-tab${isActive ? ' active' : ''}" data-discipline="${disc.id}">${disc.name}</button>`;
  }
  const synergiesActive = activeDisciplineTab === 'synergies';
  html += `<button class="research-tab research-tab--synergies${synergiesActive ? ' active' : ''}" data-discipline="synergies">Synergies</button>`;
  html += '</div>';

  // --- In-progress research banner (always shown if research is active) ---
  const progress = engines.research.getResearchProgress(state);
  if (progress) {
    const inProgressNode = _findNode(data, progress.nodeId);
    const inProgressName = inProgressNode ? inProgressNode.name : progress.nodeId;
    const pct = Math.floor(progress.progress * 100);
    const remaining = formatTime(Math.ceil(progress.remaining));
    html += `
      <div class="research-in-progress-banner">
        <span class="research-in-progress-label">Researching: <strong>${inProgressName}</strong></span>
        <div class="research-progress-track">
          <div class="research-progress-bar" style="width: ${pct}%"></div>
        </div>
        <span class="research-progress-text">${pct}% — ${remaining} remaining</span>
      </div>`;
  }

  // --- Tab content ---
  if (activeDisciplineTab === 'synergies') {
    html += _renderSynergiesTab(state, data, engines);
  } else {
    html += _renderDisciplineTab(state, data, engines, activeDisciplineTab, progress);
  }

  container.innerHTML = html;

  // Wire tab click events after innerHTML is set.
  const tabButtons = container.querySelectorAll('.research-tab[data-discipline]');
  for (const btn of tabButtons) {
    btn.addEventListener('click', () => {
      setActiveDisciplineTab(btn.dataset.discipline);
      renderResearchPanel(container, state, data, engines);
    });
  }

  // Wire research buttons.
  container.querySelectorAll('.research-btn[data-node-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nodeId = btn.dataset.nodeId;
      if (nodeId) {
        engines.research.startResearch(state, data, nodeId);
        renderResearchPanel(container, state, data, engines);
      }
    });
  });
}

// ---------------------------------------------------------------------------
// Private: discipline tab content
// ---------------------------------------------------------------------------

function _renderDisciplineTab(state, data, engines, disciplineId, progress) {
  const allNodes = (data.disciplines && data.disciplines.nodes) || [];

  // Gather all nodes for this discipline (exclude hidden/synergy nodes).
  const disciplineNodes = allNodes.filter(
    (n) => n.discipline === disciplineId && !n.hidden
  );

  if (disciplineNodes.length === 0) {
    return '<p class="research-empty">No research nodes found for this discipline.</p>';
  }

  // Determine status sets.
  const completed = new Set(state.research.completed);
  const inProgressId = state.research.inProgress ? state.research.inProgress.nodeId : null;
  const availableNodes = new Set(
    engines.research.getAvailableNodes(state, data, disciplineId).map((n) => n.id)
  );

  // Group by tier.
  const byTier = new Map();
  for (const node of disciplineNodes) {
    if (!byTier.has(node.tier)) byTier.set(node.tier, []);
    byTier.get(node.tier).push(node);
  }

  const TIER_LABELS = {
    1: 'Tier 1 — Fundamentals',
    2: 'Tier 2 — Applications',
    3: 'Tier 3 — Mastery',
    4: 'Tier 4 — Ascendancy',
  };

  let html = '<div class="research-node-list">';

  for (const [tier, nodes] of [...byTier.entries()].sort(([a], [b]) => a - b)) {
    const tierLabel = TIER_LABELS[tier] || `Tier ${tier}`;
    html += `<h3 class="research-tier-heading">${tierLabel}</h3>`;

    for (const node of nodes) {
      html += _renderNode(node, state, data, completed, inProgressId, availableNodes, progress);
    }
  }

  html += '</div>';
  return html;
}

// ---------------------------------------------------------------------------
// Private: synergies tab content
// ---------------------------------------------------------------------------

function _renderSynergiesTab(state, data, engines) {
  const synergyNodes = engines.research.getVisibleSynergyNodes(state, data);

  if (synergyNodes.length === 0) {
    return '<p class="research-empty">No synergy nodes are currently visible. Complete Tier 2 nodes in multiple disciplines to reveal synergies.</p>';
  }

  const completed = new Set(state.research.completed);
  const inProgressId = state.research.inProgress ? state.research.inProgress.nodeId : null;
  const availableNodes = new Set(
    synergyNodes
      .filter((n) => canAfford(state, n.cost || {}) && !completed.has(n.id) && inProgressId !== n.id)
      .map((n) => n.id)
  );
  const progress = null; // progress banner already shown above

  let html = '<div class="research-node-list research-node-list--synergies">';
  for (const node of synergyNodes) {
    html += _renderNode(node, state, data, completed, inProgressId, availableNodes, progress);
  }
  html += '</div>';
  return html;
}

// ---------------------------------------------------------------------------
// Private: individual node rendering
// ---------------------------------------------------------------------------

function _renderNode(node, state, data, completed, inProgressId, availableNodes, progress) {
  const isCompleted = completed.has(node.id);
  const isInProgress = inProgressId === node.id;
  const isAvailable = availableNodes.has(node.id);

  let statusClass;
  if (isCompleted) {
    statusClass = 'node-completed';
  } else if (isInProgress) {
    statusClass = 'node-in-progress';
  } else if (isAvailable) {
    statusClass = 'node-available';
  } else {
    statusClass = 'node-locked';
  }

  const costStr = _formatCost(node.cost || {});
  const durationStr = formatTime(node.duration || 0);

  let statusHtml = '';
  if (isCompleted) {
    statusHtml = '<span class="node-status-icon">&#10003;</span>';
  } else if (isInProgress && progress && progress.nodeId === node.id) {
    const pct = Math.floor(progress.progress * 100);
    const remaining = formatTime(Math.ceil(progress.remaining));
    statusHtml = `
      <div class="node-progress-track">
        <div class="node-progress-bar" style="width: ${pct}%"></div>
      </div>
      <span class="node-progress-text">${remaining} remaining</span>`;
  } else if (isAvailable) {
    const alreadyResearching = !!state.research.inProgress;
    statusHtml = `<button class="research-btn" data-node-id="${node.id}"${alreadyResearching ? ' disabled title="Research already in progress"' : ''}>Research</button>`;
  } else {
    // Locked: show requires list
    const requires = node.requires || [];
    if (requires.length > 0) {
      const reqNames = requires.map((reqId) => {
        const reqNode = _findNode(data, reqId);
        return reqNode ? reqNode.name : reqId;
      });
      statusHtml = `<span class="node-requires">Requires: ${reqNames.join(', ')}</span>`;
    } else {
      statusHtml = '<span class="node-requires">Prerequisites not met</span>';
    }
  }

  return `
    <div class="research-node ${statusClass}">
      <div class="node-header">
        <span class="node-name">${node.name}</span>
        <span class="node-duration">${durationStr}</span>
      </div>
      <p class="node-description">${node.description}</p>
      <div class="node-cost">${costStr}</div>
      <div class="node-status">${statusHtml}</div>
    </div>`;
}

// ---------------------------------------------------------------------------
// Generator Panel
// ---------------------------------------------------------------------------

/**
 * Renders the generators view into the given container element.
 *
 * @param {HTMLElement} container - The #view-generators element.
 * @param {object}      state     - Live game state.
 * @param {object}      data      - Static data from loadData().
 * @param {object}      engines   - Engine modules.
 */
export function renderGeneratorPanel(container, state, data, engines) {
  const generatorDefs = (data.resources && data.resources.generators) || [];

  // Human-readable names for discipline keys.
  const DISCIPLINE_LABELS = {
    temporal_arcana:  'Temporal Arcana',
    spatial_weaving:  'Spatial Weaving',
    mind_sculpting:   'Mind Sculpting',
    vital_alchemy:    'Vital Alchemy',
    shadow_binding:   'Shadow Binding',
    chaos_channeling: 'Chaos Channeling',
    order_forging:    'Order Forging',
  };

  // Group generators by discipline, preserving insertion order.
  const byDiscipline = new Map();
  for (const def of generatorDefs) {
    if (!byDiscipline.has(def.discipline)) {
      byDiscipline.set(def.discipline, []);
    }
    byDiscipline.get(def.discipline).push(def);
  }

  let html = '';

  for (const [discipline, gens] of byDiscipline) {
    // Only show generators whose unlock_requires node is in state.research.completed.
    const unlockedGens = gens.filter(
      (g) => state.research.completed.includes(g.unlock_requires)
    );
    if (unlockedGens.length === 0) continue;

    const disciplineLabel = DISCIPLINE_LABELS[discipline] || discipline;
    html += `<div class="gen-discipline-group">`;
    html += `<h3 class="gen-discipline-heading">${disciplineLabel}</h3>`;

    for (const def of unlockedGens) {
      const genState = state.generators[def.id] || { count: 0, level: 1 };
      const { count, level } = genState;

      // Output per second at current level and count.
      const levelMult = 1 + 0.5 * (level - 1);
      const outputPerSec = def.base_output * levelMult * count;

      // Buy cost: base_cost * 1.15^count
      const buyScaleFactor = Math.pow(1.15, count);
      const buyCost = {};
      for (const [resId, baseAmt] of Object.entries(def.base_cost)) {
        buyCost[resId] = baseAmt * buyScaleFactor;
      }
      const canBuy = canAfford(state, buyCost);
      const buyCostStr = _formatCost(buyCost);

      // Upgrade cost: upgrade_cost * 2^(level-1), disabled at max level.
      const atMaxLevel = level >= def.max_level;
      const upgradeScaleFactor = Math.pow(2, level - 1);
      const upgradeCost = {};
      for (const [resId, baseAmt] of Object.entries(def.upgrade_cost)) {
        upgradeCost[resId] = baseAmt * upgradeScaleFactor;
      }
      const canUpgrade = !atMaxLevel && canAfford(state, upgradeCost);
      const upgradeCostStr = atMaxLevel ? 'MAX' : _formatCost(upgradeCost);

      html += `
        <div class="gen-row" data-gen-id="${def.id}">
          <div class="gen-info">
            <span class="gen-name">${def.name}</span>
            <span class="gen-stats">x${count} &nbsp;|&nbsp; Lv.${level}</span>
            <span class="gen-output">${formatNumber(outputPerSec)}/sec</span>
          </div>
          <div class="gen-actions">
            <button
              class="gen-buy-btn"
              data-gen-id="${def.id}"
              ${canBuy ? '' : 'disabled'}
            >Buy (${buyCostStr})</button>
            <button
              class="gen-upgrade-btn"
              data-gen-id="${def.id}"
              ${canUpgrade ? '' : 'disabled'}
            >${atMaxLevel ? 'Upgrade (MAX)' : `Upgrade to Lv.${level + 1} (${upgradeCostStr})`}</button>
          </div>
        </div>`;
    }

    html += `</div>`;
  }

  if (html === '') {
    html = '<p class="gen-empty">No generators unlocked yet. Research disciplines to unlock generators.</p>';
  }

  container.innerHTML = html;
}

// ---------------------------------------------------------------------------
// Private helpers
// ---------------------------------------------------------------------------

/**
 * Formats a cost object into a human-readable string.
 * e.g. { mana: 500, chronos_essence: 120 } -> "Mana: 500, Chronos Essence: 120"
 */
function _formatCost(cost) {
  if (!cost || Object.keys(cost).length === 0) return 'Free';
  return Object.entries(cost)
    .map(([resId, amount]) => `${_toDisplayName(resId)}: ${formatNumber(amount)}`)
    .join(', ');
}

/**
 * Converts a snake_case resource ID to a Title Case display name.
 * e.g. "chronos_essence" -> "Chronos Essence"
 */
function _toDisplayName(id) {
  return id
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Finds a node definition by id.
 */
function _findNode(data, nodeId) {
  const nodes = (data.disciplines && data.disciplines.nodes) || [];
  return nodes.find((n) => n.id === nodeId);
}
