// ui/panels.js
// Panel rendering functions for the Research Tree and Generators views.

import { formatNumber, formatTime } from '../util/format.js';
import { canAfford, getGenerationRate } from '../engine/resources.js';

// ---------------------------------------------------------------------------
// Dashboard Panel
// ---------------------------------------------------------------------------

/**
 * Discipline resource definitions for the dashboard.
 * Maps resource IDs to display metadata.
 */
const DASHBOARD_DISCIPLINE_RESOURCES = [
  { id: 'chronos_essence', name: 'Chronos',  icon: '⚗', color: '#4a7fb5', discipline: 'Temporal'  },
  { id: 'aether_threads',  name: 'Aether',   icon: '✦', color: '#7b4fb5', discipline: 'Spatial'   },
  { id: 'psyche_fragments',name: 'Psyche',   icon: 'ψ', color: '#4ab5a5', discipline: 'Mind'      },
  { id: 'vital_ichor',     name: 'Ichor',    icon: '♥', color: '#4fb55a', discipline: 'Vital'     },
  { id: 'umbral_dust',     name: 'Umbral',   icon: '◘', color: '#5a5a6a', discipline: 'Shadow'    },
  { id: 'flux_sparks',     name: 'Flux',     icon: '~', color: '#b54f4a', discipline: 'Chaos'     },
  { id: 'axiom_crystals',  name: 'Axiom',    icon: '□', color: '#6a8fa5', discipline: 'Order'     },
];

/**
 * Renders the dashboard overview panel.
 *
 * @param {HTMLElement} container - The #view-dashboard element.
 * @param {object}      state     - Live game state.
 * @param {object}      data      - Static game data.
 * @param {object}      engines   - Engine modules.
 */
/**
 * Returns a contextual hint string (may contain HTML) for brand-new players,
 * or null once the player is past the early-game stages.
 *
 * @param {object} state - Live game state.
 * @returns {string|null}
 */
function getDashboardHint(state) {
  if (state.research.completed.length === 0)
    return 'Your mana is gathering. Click <strong>Temporal Arcana</strong> in the grimoire to begin your first research.';
  if (!Object.values(state.generators).some((g) => g.count > 0))
    return "You've unlocked a generator! Click <strong>Generators</strong> to build your first apparatus.";
  const hasTier2 = state.research.completed.some((id) => id.includes('_t2_'));
  if (!hasTier2)
    return 'Your generator produces resources. Continue researching to unlock deeper knowledge.';
  if (!((state.discoveries.counters.combat_win || 0) > 0))
    return 'Your studies have attracted attention. Encounters may find you, or visit the <strong>Sanctum</strong> to seek them.';
  return null;
}

export function renderDashboardPanel(container, state, data, engines) {
  let html = '<div class="dashboard">';

  // ── 0. Contextual hint for new players ───────────────────────────────────
  const hint = getDashboardHint(state);
  if (hint) {
    html += `<div class="dashboard-hint">${hint}</div>`;
  }

  // ── 1. Mana Section ──────────────────────────────────────────────────────
  const mana = (state.resources.mana && state.resources.mana.amount) || 0;
  const manaRate = getGenerationRate(state, data, 'mana');
  const manaCap = Math.max(1000, mana * 1.5);
  const manaPct = Math.min(100, (mana / manaCap) * 100).toFixed(2);

  html += `
    <div class="dashboard-section">
      <h3>Mana</h3>
      <div class="mana-bar-container">
        <div class="mana-bar-fill" style="width: ${manaPct}%"></div>
        <span class="mana-bar-text">${formatNumber(mana)} &nbsp;(+${formatNumber(manaRate)}/s)</span>
      </div>
    </div>`;

  // ── 2. Discipline Resources Grid ─────────────────────────────────────────
  html += `<div class="dashboard-section"><h3>Discipline Resources</h3><div class="resource-bars-grid">`;

  for (const res of DASHBOARD_DISCIPLINE_RESOURCES) {
    const amount = (state.resources[res.id] && state.resources[res.id].amount) || 0;
    const rate = getGenerationRate(state, data, res.id);
    const unlocked = amount > 0 || rate > 0;

    if (unlocked) {
      const cap = Math.max(1000, amount * 1.5);
      const pct = Math.min(100, (amount / cap) * 100).toFixed(2);
      html += `
        <div class="resource-bar-item">
          <div class="resource-bar-header">
            <span>${res.icon} ${res.name}</span>
            <span>${formatNumber(amount)}</span>
          </div>
          <div class="resource-bar-container">
            <div class="resource-bar-fill" style="width: ${pct}%; background: ${res.color};"></div>
          </div>
          <div class="resource-bar-rate">+${formatNumber(rate)}/s</div>
        </div>`;
    } else {
      html += `
        <div class="resource-bar-item locked">
          <div class="resource-bar-header">
            <span>${res.icon} ???</span>
            <span>—</span>
          </div>
          <div class="resource-bar-container">
            <div class="resource-bar-fill" style="width: 0%;"></div>
          </div>
          <div class="resource-bar-rate">locked</div>
        </div>`;
    }
  }

  html += `</div></div>`; // close grid + section

  // ── 3 & 4. Active Research + Combat Status ───────────────────────────────
  html += `<div class="dashboard-section"><h3>Status</h3><div class="dashboard-status">`;

  // Research card
  const progress = engines.research.getResearchProgress(state);
  if (progress) {
    const allNodes = (data.disciplines && data.disciplines.nodes) || [];
    const node = allNodes.find((n) => n.id === progress.nodeId);
    const nodeName = node ? node.name : progress.nodeId;
    const pct = Math.floor(progress.progress * 100);
    const remaining = formatTime(Math.ceil(progress.remaining));
    html += `
      <div class="status-card">
        <h4>Active Research</h4>
        <div class="status-value">${_escapeHtml(nodeName)}</div>
        <div class="resource-bar-container" style="margin-top: 0.35rem;">
          <div class="resource-bar-fill" style="width: ${pct}%; background: #daa520;"></div>
        </div>
        <div class="resource-bar-rate">${pct}% — ${remaining} remaining</div>
      </div>`;
  } else {
    html += `
      <div class="status-card">
        <h4>Active Research</h4>
        <div class="status-value" style="color: #8b7355; font-style: italic;">None</div>
      </div>`;
  }

  // Combat card
  const combat = state.combat;
  let combatHtml = '';
  if (combat && combat.active) {
    const enc = combat.active.encounter;
    const enemyPct = Math.max(0, Math.min(100, Math.round((combat.active.enemyHealth / combat.active.enemyMaxHealth) * 100)));
    const playerPct = Math.max(0, Math.min(100, Math.round((combat.health / (combat.maxHealth || 100)) * 100)));
    combatHtml = `
      <div style="font-size: 0.8rem; margin-bottom: 0.2rem;">${_escapeHtml(enc.name)}</div>
      <div class="resource-bar-rate">Enemy</div>
      <div class="resource-bar-container">
        <div class="resource-bar-fill" style="width: ${enemyPct}%; background: #b54f4a;"></div>
      </div>
      <div class="resource-bar-rate">Player</div>
      <div class="resource-bar-container">
        <div class="resource-bar-fill" style="width: ${playerPct}%; background: #4fb55a;"></div>
      </div>`;
  } else if (combat && (combat.recovery || 0) > 0) {
    combatHtml = `<div class="status-value" style="color: #8b7355; font-style: italic;">Recovering... ${combat.recovery}s</div>`;
  } else {
    combatHtml = `<div class="status-value" style="color: #8b7355; font-style: italic;">No active threat</div>`;
  }
  html += `<div class="status-card"><h4>Combat</h4>${combatHtml}</div>`;

  html += `</div></div>`; // close dashboard-status + section

  // ── 5. Active Challenge ──────────────────────────────────────────────────
  const activeChallenge = state.challenges && state.challenges.active;
  if (activeChallenge) {
    const { challengeDef, remaining, progress: cProgress } = activeChallenge;
    const cName = _escapeHtml(challengeDef.name || challengeDef.id || 'Challenge');
    const cPct = Math.round(Math.min(1, cProgress || 0) * 100);
    const cTimeLeft = Math.max(0, remaining || 0);
    html += `
      <div class="dashboard-section">
        <h3>Active Challenge</h3>
        <div class="status-card" style="border-color: #daa520;">
          <div class="resource-bar-header">
            <span>${cName}</span>
            <span>${cTimeLeft}s remaining</span>
          </div>
          <div class="resource-bar-container">
            <div class="resource-bar-fill" style="width: ${cPct}%; background: #daa520;"></div>
          </div>
        </div>
      </div>`;
  }

  // ── 6. Arcane Knowledge + Convergence ────────────────────────────────────
  const ak = (state.resources.arcane_knowledge && state.resources.arcane_knowledge.amount) || 0;
  const convergenceCount = (state.prestige && state.prestige.convergenceCount) || 0;
  const canConverge = engines.prestige.canConverge(state, data);

  html += `
    <div class="dashboard-section">
      <h3>Arcane Knowledge</h3>
      <div class="dashboard-status">
        <div class="status-card">
          <h4>Knowledge</h4>
          <div class="status-value">${formatNumber(ak)} AK</div>
        </div>
        <div class="status-card">
          <h4>Convergence</h4>
          <div class="status-value">
            ${canConverge ? '<span class="convergence-available">✦ Convergence Available</span>' : `${convergenceCount} completed`}
          </div>
        </div>
      </div>
    </div>`;

  // ── 7. Quick Stats Row ───────────────────────────────────────────────────
  const allNodes = (data.disciplines && data.disciplines.nodes) || [];
  const totalNodes = allNodes.filter((n) => !n.hidden).length;
  const completedNodes = (state.research && state.research.completed) ? state.research.completed.length : 0;

  const allDiscoveries = (data.events && data.events.discoveries) || [];
  const foundDiscoveries = (state.discoveries && state.discoveries.found) ? state.discoveries.found.length : 0;
  const totalDiscoveries = allDiscoveries.length;

  const generatorDefs = (data.resources && data.resources.generators) || [];
  let totalGenerators = 0;
  for (const def of generatorDefs) {
    const gs = state.generators[def.id];
    if (gs) totalGenerators += gs.count;
  }

  html += `
    <div class="dashboard-section">
      <h3>Quick Stats</h3>
      <div class="quick-stats">
        <div class="quick-stat">
          <div class="quick-stat-value">${completedNodes} / ${totalNodes}</div>
          <div class="quick-stat-label">Research Nodes</div>
        </div>
        <div class="quick-stat">
          <div class="quick-stat-value">${foundDiscoveries} / ${totalDiscoveries}</div>
          <div class="quick-stat-label">Discoveries</div>
        </div>
        <div class="quick-stat">
          <div class="quick-stat-value">${totalGenerators}</div>
          <div class="quick-stat-label">Generators Owned</div>
        </div>
        <div class="quick-stat">
          <div class="quick-stat-value">${convergenceCount}</div>
          <div class="quick-stat-label">Convergences</div>
        </div>
      </div>
    </div>`;

  html += '</div>'; // close .dashboard
  container.innerHTML = html;
}

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

  // When no research has been done yet, highlight the very first available node
  // to guide the player toward clicking "Research".
  const noResearchDone = state.research.completed.length === 0;
  let firstAvailableHighlighted = false;

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
      // Apply pulsing highlight only to the very first available node when
      // the player has not yet completed any research.
      let highlight = false;
      if (noResearchDone && !firstAvailableHighlighted && availableNodes.has(node.id)) {
        highlight = true;
        firstAvailableHighlighted = true;
      }
      html += _renderNode(node, state, data, completed, inProgressId, availableNodes, progress, highlight);
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

function _renderNode(node, state, data, completed, inProgressId, availableNodes, progress, highlight = false) {
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

  const highlightClass = highlight ? ' node-highlight' : '';

  return `
    <div class="research-node ${statusClass}${highlightClass}">
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
// Combat Panel
// ---------------------------------------------------------------------------

/**
 * Renders the combat panel.
 *
 * @param {HTMLElement} container - The view-panel element to render into.
 * @param {object}      state     - Live game state.
 * @param {object}      data      - Static game data.
 * @param {object}      engines   - Engine modules (must expose engines.combat).
 */
export function renderCombatPanel(container, state, data, engines) {
  const combat = state.combat;

  // --- Idle / recovery states ---
  if (!combat.active && (combat.recovery || 0) <= 0) {
    container.innerHTML = '<p class="combat-idle">No threats detected. Visit the Sanctum to seek challenges.</p>';
    return;
  }

  if (!combat.active && (combat.recovery || 0) > 0) {
    container.innerHTML = `<p class="combat-recovery">Recovering... ${combat.recovery}s remaining</p>`;
    return;
  }

  // --- Active combat ---
  const active = combat.active;
  const encounter = active.encounter;

  // Determine current enemy action text from pattern
  const pattern = encounter.pattern || [];
  let currentActionText = '';
  if (pattern.length > 0) {
    const actionRaw = pattern[active.patternIndex % pattern.length];
    if (actionRaw.startsWith('special:')) {
      const key = actionRaw.slice('special:'.length);
      const actionDef = encounter.actions && encounter.actions[key];
      currentActionText = actionDef ? actionDef.description || key : key;
    } else {
      currentActionText = actionRaw.replace(/_/g, ' ');
    }
  }

  // Enemy health bar
  const enemyPct = Math.max(0, Math.min(100, Math.round((active.enemyHealth / active.enemyMaxHealth) * 100)));

  // Player health bar
  const playerPct = Math.max(0, Math.min(100, Math.round((combat.health / combat.maxHealth) * 100)));

  // Active player buffs and debuffs
  const buffs = active.buffs || [];
  const debuffs = active.debuffs || [];

  // Combat log: last 5 entries
  const logEntries = (combat.log || []).slice(-5);

  // Spells available to the player
  const allSpells = (data.spells && data.spells.spells) || [];
  const allNodes = (data.disciplines && data.disciplines.nodes) || [];
  const availableSpells = allSpells.filter((spell) =>
    state.research.completed.some((nodeId) => {
      const node = allNodes.find((n) => n.id === nodeId);
      return node && node.discipline === spell.discipline;
    })
  );

  const cooldowns = combat.cooldowns || {};
  const mana = (state.resources.mana && state.resources.mana.amount) || 0;

  // Consumables in inventory with count > 0
  const allConsumables = (data.spells && data.spells.consumables) || [];
  const inventory = combat.inventory || {};
  const heldConsumables = allConsumables.filter((c) => (inventory[c.id] || 0) > 0);

  // Stance
  const stance = combat.stance || 'balanced';

  // --- Build HTML ---
  let html = '';

  // Enemy section
  html += `
    <div class="combat-enemy-section">
      <div class="combat-section-heading">Enemy</div>
      <div class="combat-enemy-name">${encounter.name}</div>
      <div class="combat-health-bar-wrap">
        <div class="combat-health-bar" style="width: ${enemyPct}%"></div>
      </div>
      <div class="combat-health-text">${active.enemyHealth} / ${active.enemyMaxHealth} HP</div>
      <p class="combat-enemy-description">${encounter.description || ''}</p>
      ${currentActionText ? `<div class="combat-enemy-action">Next action: ${currentActionText}</div>` : ''}
    </div>`;

  // Player section
  html += `
    <div class="combat-player-section">
      <div class="combat-section-heading">Player</div>
      <div class="combat-health-bar-wrap">
        <div class="combat-health-bar combat-health-bar--player" style="width: ${playerPct}%"></div>
      </div>
      <div class="combat-health-text">${combat.health} / ${combat.maxHealth} HP</div>`;

  if (buffs.length > 0 || debuffs.length > 0) {
    html += '<div class="combat-status-effects">';
    for (const buff of buffs) {
      const sign = buff.value >= 0 ? '+' : '';
      html += `<span class="combat-buff">${_toDisplayName(buff.stat)} ${sign}${buff.value} (${buff.duration}r)</span>`;
    }
    for (const debuff of debuffs) {
      html += `<span class="combat-debuff">${_toDisplayName(debuff.stat)} ${debuff.value} (${debuff.duration}r)</span>`;
    }
    html += '</div>';
  }

  html += '</div>'; // end player section

  // Combat log
  html += '<div class="combat-log">';
  html += '<div class="combat-section-heading">Combat Log</div>';
  for (const entry of logEntries) {
    html += `<div class="combat-log-entry">${_escapeHtml(entry)}</div>`;
  }
  html += '</div>';

  // Spell buttons
  if (availableSpells.length > 0) {
    html += '<div class="combat-spells">';
    html += '<div class="combat-section-heading">Spells</div>';
    for (const spell of availableSpells) {
      const cd = cooldowns[spell.id] || 0;
      const onCooldown = cd > 0;
      const canAffordMana = mana >= (spell.mana_cost || 0);
      const disabled = onCooldown || !canAffordMana;
      const cdText = onCooldown ? ` (${cd}r)` : '';
      html += `
        <button class="combat-spell-btn${disabled ? ' disabled' : ''}" data-spell-id="${spell.id}"${disabled ? ' disabled' : ''}>
          ${spell.name} — ${spell.mana_cost || 0} mana${cdText}
        </button>`;
    }
    html += '</div>';
  }

  // Consumable buttons
  if (heldConsumables.length > 0) {
    html += '<div class="combat-consumables">';
    html += '<div class="combat-section-heading">Consumables</div>';
    for (const cons of heldConsumables) {
      const count = inventory[cons.id] || 0;
      html += `
        <button class="combat-consumable-btn" data-consumable-id="${cons.id}">
          ${cons.name} (${count})
        </button>`;
    }
    html += '</div>';
  }

  // Stance selector
  html += `
    <div class="combat-stance">
      <div class="combat-section-heading">Stance</div>
      <button class="combat-stance-btn${stance === 'aggressive' ? ' active' : ''}" data-stance="aggressive">Aggressive</button>
      <button class="combat-stance-btn${stance === 'balanced' ? ' active' : ''}" data-stance="balanced">Balanced</button>
      <button class="combat-stance-btn${stance === 'defensive' ? ' active' : ''}" data-stance="defensive">Defensive</button>
    </div>`;

  // Retreat button
  html += '<div class="combat-actions"><button class="combat-retreat-btn">Retreat</button></div>';

  container.innerHTML = html;

  // Wire spell buttons
  container.querySelectorAll('.combat-spell-btn[data-spell-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const spellId = btn.dataset.spellId;
      if (spellId) engines.combat.castSpell(state, data, spellId);
    });
  });

  // Wire consumable buttons
  container.querySelectorAll('.combat-consumable-btn[data-consumable-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const consumableId = btn.dataset.consumableId;
      if (consumableId) engines.combat.useConsumable(state, data, consumableId);
    });
  });

  // Wire stance buttons
  container.querySelectorAll('.combat-stance-btn[data-stance]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const newStance = btn.dataset.stance;
      if (newStance) engines.combat.setStance(state, newStance);
    });
  });

  // Wire retreat button
  const retreatBtn = container.querySelector('.combat-retreat-btn');
  if (retreatBtn) {
    retreatBtn.addEventListener('click', () => {
      engines.combat.retreat(state);
    });
  }
}

// ---------------------------------------------------------------------------
// Sanctum Panel
// ---------------------------------------------------------------------------

/**
 * Renders the sanctum panel.
 *
 * @param {HTMLElement} container - The view-panel element to render into.
 * @param {object}      state     - Live game state.
 * @param {object}      data      - Static game data.
 * @param {object}      engines   - Engine modules (must expose engines.combat).
 */
export function renderSanctumPanel(container, state, data, engines) {
  const stats = engines.combat.calculateStats(state, data);

  // --- Stats summary ---
  let html = `
    <div class="sanctum-stats">
      <div class="sanctum-section-heading">Combat Stats</div>
      <div class="sanctum-stat-row"><span class="sanctum-stat-label">Arcane Power</span><span class="sanctum-stat-value">${stats.arcanePower}</span></div>
      <div class="sanctum-stat-row"><span class="sanctum-stat-label">Resilience</span><span class="sanctum-stat-value">${stats.resilience}</span></div>
      <div class="sanctum-stat-row"><span class="sanctum-stat-label">Speed</span><span class="sanctum-stat-value">${(stats.speed * 100).toFixed(0)}%</span></div>
      <div class="sanctum-stat-row"><span class="sanctum-stat-label">Instability</span><span class="sanctum-stat-value">${(stats.instability * 100).toFixed(0)}%</span></div>
    </div>`;

  // --- Challenge encounters ---
  const encounters = data.encounters || [];
  const highestTier = _getHighestCompletedTier(state, data);

  html += '<div class="sanctum-encounters">';
  html += '<div class="sanctum-section-heading">Challenge Encounters</div>';

  if (encounters.length === 0) {
    html += '<p class="sanctum-empty">No encounters available.</p>';
  } else {
    for (const enc of encounters) {
      const unlocked = highestTier >= enc.tier;
      html += `
        <div class="sanctum-encounter${unlocked ? '' : ' sanctum-encounter--locked'}">
          <div class="sanctum-encounter-header">
            <span class="sanctum-encounter-name">${enc.name}</span>
            <span class="sanctum-encounter-tier">Tier ${enc.tier}</span>
          </div>
          <p class="sanctum-encounter-description">${enc.description || ''}</p>
          <button class="sanctum-challenge-btn" data-encounter-id="${enc.id}"${unlocked ? '' : ' disabled'}>
            Challenge
          </button>
        </div>`;
    }
  }

  html += '</div>';

  // --- Crafting section ---
  const allConsumables = (data.spells && data.spells.consumables) || [];
  const inventory = state.combat.inventory || {};

  html += '<div class="sanctum-crafting">';
  html += '<div class="sanctum-section-heading">Consumable Crafting</div>';

  const unlockedConsumables = allConsumables.filter(
    (c) => !c.requires_research || state.research.completed.includes(c.requires_research)
  );

  if (unlockedConsumables.length === 0) {
    html += '<p class="sanctum-empty">No consumables unlocked yet. Research to unlock crafting recipes.</p>';
  } else {
    for (const cons of unlockedConsumables) {
      const currentStock = inventory[cons.id] || 0;
      const maxStack = cons.max_stack || 0;
      const craftCostStr = _formatCost(cons.craft_cost || {});
      const atMax = currentStock >= maxStack;
      const canAffordIt = _canAffordCost(state, cons.craft_cost || {});
      const craftDisabled = atMax || !canAffordIt;

      html += `
        <div class="sanctum-consumable">
          <div class="sanctum-consumable-header">
            <span class="sanctum-consumable-name">${cons.name}</span>
            <span class="sanctum-consumable-stock">${currentStock} / ${maxStack}</span>
          </div>
          <p class="sanctum-consumable-description">${cons.description || ''}</p>
          <div class="sanctum-consumable-cost">Cost: ${craftCostStr}</div>
          <button class="sanctum-craft-btn" data-consumable-id="${cons.id}"${craftDisabled ? ' disabled' : ''}>
            ${atMax ? 'At Max' : 'Craft'}
          </button>
        </div>`;
    }
  }

  html += '</div>';

  container.innerHTML = html;

  // Wire challenge buttons
  container.querySelectorAll('.sanctum-challenge-btn[data-encounter-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const encounterId = btn.dataset.encounterId;
      if (encounterId) engines.combat.startCombat(state, data, encounterId);
    });
  });

  // Wire craft buttons
  container.querySelectorAll('.sanctum-craft-btn[data-consumable-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const consumableId = btn.dataset.consumableId;
      if (consumableId) {
        engines.combat.craftConsumable(state, data, consumableId);
        renderSanctumPanel(container, state, data, engines);
      }
    });
  });
}

// ---------------------------------------------------------------------------
// Event Panel
// ---------------------------------------------------------------------------

/**
 * Renders the event panel — or an overlay card when an event is active.
 * This is called by renderer.js to populate the event-overlay card content.
 *
 * @param {HTMLElement} container - The element to render into.
 * @param {object}      state     - Live game state.
 * @param {object}      data      - Static game data.
 * @param {object}      engines   - Engine modules (must expose engines.events).
 */
export function renderEventPanel(container, state, data, engines) {
  const active = state.events && state.events.active;

  if (!active) {
    container.innerHTML = '<p class="event-idle">No events at this time.</p>';
    return;
  }

  const { eventDef, timestamp } = active;
  const choices = eventDef.choices || [];
  const discoveredHidden = (state.events && state.events.discoveredHidden) || [];

  let html = `<div class="event-card">`;
  html += `<h3 class="event-title">${_escapeHtml(eventDef.title || eventDef.name || 'Event')}</h3>`;
  html += `<p class="event-text">${_escapeHtml(eventDef.text || '')}</p>`;

  // Timeout countdown
  if (eventDef.timeout) {
    const elapsed = Math.floor((Date.now() - timestamp) / 1000);
    const remaining = Math.max(0, eventDef.timeout - elapsed);
    html += `<div class="event-countdown">Time remaining: ${remaining}s</div>`;
  }

  // Choice buttons
  html += `<div class="event-choices">`;
  for (let i = 0; i < choices.length; i++) {
    const choice = choices[i];
    const isHidden = choice.hidden === true;
    const isDiscovered = discoveredHidden.includes(choice.label);

    let label;
    let disabled = false;

    if (isHidden && !isDiscovered) {
      label = '???';
    } else {
      label = _escapeHtml(choice.label || `Choice ${i + 1}`);
    }

    // Check requires_choice condition (e.g. discipline_unlocked)
    if (choice.requires_choice) {
      const req = choice.requires_choice;
      if (req.discipline_unlocked) {
        const nodes = (data.disciplines && data.disciplines.nodes) || [];
        const met = nodes.some(
          (n) =>
            n.discipline === req.discipline_unlocked &&
            (state.research.completed || []).includes(n.id)
        );
        if (!met) disabled = true;
      }
    }

    html += `<button
      class="event-choice-btn${disabled ? ' disabled' : ''}"
      data-choice-index="${i}"
      ${disabled ? 'disabled' : ''}
    >${label}</button>`;
  }
  html += `</div>`; // .event-choices
  html += `</div>`; // .event-card

  container.innerHTML = html;

  // Wire choice buttons
  container.querySelectorAll('.event-choice-btn[data-choice-index]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.choiceIndex, 10);
      if (!isNaN(idx)) {
        engines.events.makeChoice(state, data, idx);
      }
    });
  });
}

// ---------------------------------------------------------------------------
// Discovery Panel
// ---------------------------------------------------------------------------

/**
 * Renders the discoveries panel.
 *
 * @param {HTMLElement} container - The view-panel element to render into.
 * @param {object}      state     - Live game state.
 * @param {object}      data      - Static game data.
 * @param {object}      engines   - Engine modules.
 */
export function renderDiscoveryPanel(container, state, data, engines) {
  const allDiscoveries = (data.events && data.events.discoveries) || [];
  const found = (state.discoveries && state.discoveries.found) || [];

  const foundCount = found.length;
  const totalCount = allDiscoveries.length;

  let html = `<div class="discovery-header">`;
  html += `<h2>Discoveries</h2>`;
  html += `<span class="discovery-count">${foundCount} / ${totalCount}</span>`;
  html += `</div>`;

  if (totalCount === 0) {
    html += '<p class="discovery-empty">No discoveries defined.</p>';
    container.innerHTML = html;
    return;
  }

  html += `<div class="discovery-grid">`;
  for (const disc of allDiscoveries) {
    const isFound = found.includes(disc.id);
    if (isFound) {
      html += `
        <div class="discovery-card found">
          <div class="discovery-name">${_escapeHtml(disc.name || disc.id)}</div>
          <p class="discovery-text">${_escapeHtml(disc.discovery_text || disc.description || '')}</p>
        </div>`;
    } else {
      html += `
        <div class="discovery-card unknown">
          <div class="discovery-name">???</div>
          <p class="discovery-text">???</p>
        </div>`;
    }
  }
  html += `</div>`; // .discovery-grid

  container.innerHTML = html;
}

// ---------------------------------------------------------------------------
// Challenge Display (indicator overlay — returns HTML string)
// ---------------------------------------------------------------------------

/**
 * Returns an HTML string for the challenge indicator in the top bar.
 * Returns an empty string if no challenge is active.
 *
 * @param {object} state - Live game state.
 * @returns {string}
 */
export function renderChallengeDisplay(state) {
  const active = state.challenges && state.challenges.active;
  if (!active) return '';

  const { challengeDef, remaining, progress } = active;
  const name = _escapeHtml(challengeDef.name || challengeDef.id || 'Challenge');
  const pct = Math.round(Math.min(1, progress || 0) * 100);
  const timeLeft = Math.max(0, remaining || 0);

  return `
    <div class="challenge-indicator">
      <span class="challenge-name">${name}</span>
      <div class="challenge-progress-track">
        <div class="challenge-progress-bar" style="width: ${pct}%"></div>
      </div>
      <span class="challenge-time">${timeLeft}s</span>
    </div>`;
}

// ---------------------------------------------------------------------------
// Prestige Panel
// ---------------------------------------------------------------------------

/**
 * Renders the prestige panel: EP total, convergence controls, upgrade list,
 * and (if applicable) the deep memory discipline selection UI.
 *
 * @param {HTMLElement} container - The #view-prestige element.
 * @param {object}      state     - Live game state.
 * @param {object}      data      - Static game data.
 * @param {object}      engines   - Engine modules (must expose engines.prestige).
 */
export function renderPrestigePanel(container, state, data, engines) {
  const prestige = state.prestige;
  const upgradeDefs = Array.isArray(data.prestige) ? data.prestige : [];

  const ep = prestige.enlightenmentPoints || 0;
  const convergenceCount = prestige.convergenceCount || 0;

  let html = `<div class="prestige-ep-total">Enlightenment Points: <strong>${formatNumber(ep)}</strong></div>`;

  // --- Convergence section ---
  const canConverge = engines.prestige.canConverge(state, data);
  const epPreview = engines.prestige.calculateEP(state, data);

  html += `<div class="prestige-convergence-section">`;
  html += `<h3 class="prestige-section-heading">Grand Convergence</h3>`;
  html += `<button class="prestige-converge-btn"${canConverge ? '' : ' disabled'}>Invoke Grand Convergence</button>`;
  html += `<p class="prestige-ep-preview">You will earn ~${formatNumber(epPreview)} Enlightenment Points</p>`;
  html += `<p class="prestige-convergence-count">Convergences completed: ${convergenceCount}</p>`;
  html += `</div>`;

  // --- Prestige upgrades list ---
  html += `<div class="prestige-upgrades-section">`;
  html += `<h3 class="prestige-section-heading">Prestige Upgrades</h3>`;

  for (const def of upgradeDefs) {
    const currentLevel = (prestige.upgrades && prestige.upgrades[def.id]) || 0;
    const atMax = currentLevel >= def.max_level;
    const nextCost = atMax ? null : engines.prestige.getUpgradeCost(data, def.id, currentLevel);
    const canAffordUpgrade = !atMax && ep >= nextCost;
    const costLabel = atMax ? 'MAX' : `${formatNumber(nextCost)} EP`;

    html += `
      <div class="prestige-upgrade">
        <div class="prestige-upgrade-header">
          <span class="prestige-upgrade-name">${def.name}</span>
          <span class="prestige-upgrade-level">${currentLevel} / ${def.max_level}</span>
        </div>
        <p class="prestige-upgrade-description">${def.description}</p>
        <div class="prestige-upgrade-footer">
          <span class="prestige-upgrade-cost">Cost: ${costLabel}</span>
          <button class="prestige-buy-btn" data-upgrade-id="${def.id}"${canAffordUpgrade ? '' : ' disabled'}>
            ${atMax ? 'Maxed' : 'Buy'}
          </button>
        </div>
      </div>`;
  }

  html += `</div>`;

  // --- Deep Memory discipline selection ---
  if (prestige.pendingDeepMemory) {
    const DISCIPLINES = [
      { id: 'temporal_arcana',  name: 'Temporal Arcana'  },
      { id: 'spatial_weaving',  name: 'Spatial Weaving'  },
      { id: 'mind_sculpting',   name: 'Mind Sculpting'   },
      { id: 'vital_alchemy',    name: 'Vital Alchemy'    },
      { id: 'shadow_binding',   name: 'Shadow Binding'   },
      { id: 'chaos_channeling', name: 'Chaos Channeling' },
      { id: 'order_forging',    name: 'Order Forging'    },
    ];

    html += `<div class="prestige-deep-memory">`;
    html += `<h3 class="prestige-section-heading">Deep Memory</h3>`;
    html += `<p class="prestige-deep-memory-prompt">Choose a discipline to pre-complete Tier 1:</p>`;
    html += `<div class="prestige-deep-memory-choices">`;
    for (const disc of DISCIPLINES) {
      html += `<button class="prestige-deep-memory-btn" data-discipline-id="${disc.id}">${disc.name}</button>`;
    }
    html += `</div></div>`;
  }

  container.innerHTML = html;

  // Wire converge button
  const convergeBtn = container.querySelector('.prestige-converge-btn');
  if (convergeBtn) {
    convergeBtn.addEventListener('click', () => {
      if (engines.prestige.canConverge(state, data)) {
        engines.prestige.converge(state, data);
        renderPrestigePanel(container, state, data, engines);
      }
    });
  }

  // Wire upgrade buy buttons
  container.querySelectorAll('.prestige-buy-btn[data-upgrade-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const upgradeId = btn.dataset.upgradeId;
      if (upgradeId) {
        engines.prestige.buyUpgrade(state, data, upgradeId);
        renderPrestigePanel(container, state, data, engines);
      }
    });
  });

  // Wire deep memory discipline selection buttons
  container.querySelectorAll('.prestige-deep-memory-btn[data-discipline-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const disciplineId = btn.dataset.disciplineId;
      if (!disciplineId) return;

      // Auto-complete all Tier 1 nodes for the chosen discipline
      const allNodes = (data.disciplines && data.disciplines.nodes) || [];
      const tier1Nodes = allNodes.filter(
        (n) => n.discipline === disciplineId && n.tier === 1
      );
      for (const node of tier1Nodes) {
        if (!state.research.completed.includes(node.id)) {
          state.research.completed.push(node.id);
        }
      }

      // Clear the pending flag
      state.prestige.pendingDeepMemory = false;

      renderPrestigePanel(container, state, data, engines);
    });
  });
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

/**
 * Escapes HTML special characters to prevent XSS in rendered strings.
 */
function _escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Returns the highest tier among all completed research nodes.
 */
function _getHighestCompletedTier(state, data) {
  const nodes = (data.disciplines && data.disciplines.nodes) || [];
  let highest = 0;
  for (const nodeId of (state.research.completed || [])) {
    const node = nodes.find((n) => n.id === nodeId);
    if (node && node.tier > highest) highest = node.tier;
  }
  return highest;
}

/**
 * Returns true if the player can afford the given cost object.
 */
function _canAffordCost(state, cost) {
  if (!cost || Object.keys(cost).length === 0) return true;
  for (const [resId, amount] of Object.entries(cost)) {
    const current = (state.resources[resId] && state.resources[resId].amount) || 0;
    if (current < amount) return false;
  }
  return true;
}
