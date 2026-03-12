// ui/renderer.js
// Main UI coordinator: event setup and per-tick rendering.

import { formatNumber } from '../util/format.js';
import { canAfford } from '../engine/resources.js';
import { getJournalEntries } from './notifications.js';

// Maps the seven discipline resource IDs to their bottom-bar value element IDs.
const DISCIPLINE_RESOURCE_IDS = [
  { resource: 'chronos_essence', elementId: 'chronos-value' },
  { resource: 'aether_threads',  elementId: 'aether-value'  },
  { resource: 'psyche_fragments',elementId: 'psyche-value'  },
  { resource: 'vital_ichor',     elementId: 'ichor-value'   },
  { resource: 'umbral_dust',     elementId: 'umbral-value'  },
  { resource: 'flux_sparks',     elementId: 'flux-value'    },
  { resource: 'axiom_crystals',  elementId: 'axiom-value'   },
];

// Human-readable names for generator discipline keys.
const DISCIPLINE_LABELS = {
  temporal_arcana:   'Temporal Arcana',
  spatial_weaving:   'Spatial Weaving',
  mind_sculpting:    'Mind Sculpting',
  vital_alchemy:     'Vital Alchemy',
  shadow_binding:    'Shadow Binding',
  chaos_channeling:  'Chaos Channeling',
  order_forging:     'Order Forging',
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Sets up all persistent UI event listeners.
 * Call once after the DOM is ready.
 *
 * @param {object} state   - Live game state.
 * @param {object} data    - Static data from loadData().
 * @param {object} engines - Engine modules (must expose engines.resources).
 */
export function initUI(state, data, engines) {
  _initGrimoireNav();
  _initGeneratorButtons(state, data, engines);
}

/**
 * Called every tick by the game loop. Updates all dynamic display elements.
 *
 * @param {object} state - Live game state.
 * @param {object} data  - Static data from loadData().
 */
export function render(state, data) {
  _renderTopBar(state);
  _renderBottomBar(state);
  _renderActivePanel(state, data);
  _renderJournal(state);
}

/**
 * Renders the full generators view into the given container element.
 *
 * @param {HTMLElement} container - The #view-generators element.
 * @param {object}      state     - Live game state.
 * @param {object}      data      - Static data from loadData().
 * @param {object}      engines   - Engine modules.
 */
export function renderGeneratorPanel(container, state, data, engines) {
  const generatorDefs = (data.resources && data.resources.generators) || [];

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
    // Only show disciplines that have at least one unlocked generator.
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
            <span class="gen-stats">Owned: ${count} &nbsp;|&nbsp; Level: ${level}/${def.max_level}</span>
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
            >Upgrade (${upgradeCostStr})</button>
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
 * Wires up the Grimoire nav buttons to switch the active view panel.
 */
function _initGrimoireNav() {
  const navButtons = document.querySelectorAll('.nav-btn[data-panel]');
  const viewPanels = document.querySelectorAll('.view-panel');

  for (const btn of navButtons) {
    btn.addEventListener('click', () => {
      const targetPanel = btn.dataset.panel;

      // Deactivate all panels.
      for (const panel of viewPanels) {
        panel.classList.remove('active');
      }

      // Activate the target panel.
      const targetEl = document.getElementById(`view-${targetPanel}`);
      if (targetEl) {
        targetEl.classList.add('active');
      }

      // Update active state on nav buttons.
      for (const b of navButtons) {
        b.classList.remove('active');
      }
      btn.classList.add('active');
    });
  }
}

/**
 * Attaches delegated click handlers on #view-generators for buy/upgrade buttons.
 */
function _initGeneratorButtons(state, data, engines) {
  const genView = document.getElementById('view-generators');
  if (!genView) return;

  genView.addEventListener('click', (e) => {
    const buyBtn = e.target.closest('.gen-buy-btn');
    if (buyBtn) {
      const genId = buyBtn.dataset.genId;
      if (genId) engines.resources.buyGenerator(state, data, genId);
      return;
    }

    const upgradeBtn = e.target.closest('.gen-upgrade-btn');
    if (upgradeBtn) {
      const genId = upgradeBtn.dataset.genId;
      if (genId) engines.resources.upgradeGenerator(state, data, genId);
    }
  });
}

/**
 * Updates the top-bar resource counters.
 */
function _renderTopBar(state) {
  _setText('mana-value',        formatNumber((state.resources.mana && state.resources.mana.amount) || 0));
  _setText('knowledge-value',   formatNumber((state.resources.arcane_knowledge && state.resources.arcane_knowledge.amount) || 0));
  _setText('convergence-value', String(state.prestige.convergenceCount || 0));
}

/**
 * Updates the bottom-bar discipline resource values.
 */
function _renderBottomBar(state) {
  for (const { resource, elementId } of DISCIPLINE_RESOURCE_IDS) {
    const amount = (state.resources[resource] && state.resources[resource].amount) || 0;
    _setText(elementId, formatNumber(amount));
  }
}

/**
 * Calls the appropriate render function for whichever view-panel is currently active.
 */
function _renderActivePanel(state, data) {
  const activePanel = document.querySelector('.view-panel.active');
  if (!activePanel) return;

  if (activePanel.id === 'view-generators') {
    renderGeneratorPanel(activePanel, state, data, null);
  }
  // Additional panel renderers can be dispatched here as they are implemented.
}

/**
 * Rebuilds the journal entries display with the 20 most recent entries.
 */
function _renderJournal(state) {
  const container = document.getElementById('journal-entries');
  if (!container) return;

  const entries = getJournalEntries(state, 20);
  if (entries.length === 0) return;

  let html = '';
  for (const entry of entries) {
    const typeClass = entry.type ? `journal-entry--${entry.type}` : 'journal-entry--info';
    // Escape any HTML in the text to prevent injection.
    const safeText = _escapeHtml(entry.text);
    html += `<p class="journal-entry ${typeClass}">${safeText}</p>`;
  }
  container.innerHTML = html;
}

/**
 * Formats a cost object into a compact human-readable string.
 * e.g. { mana: 150, chronos_essence: 23 } -> "150 mana, 23 chronos_essence"
 */
function _formatCost(cost) {
  return Object.entries(cost)
    .map(([resId, amount]) => `${formatNumber(amount)} ${resId}`)
    .join(', ');
}

/** Sets the textContent of an element by ID; silently skips if not found. */
function _setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

/** Escapes HTML special characters to prevent XSS in journal entries. */
function _escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
