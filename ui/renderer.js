// ui/renderer.js
// Main UI coordinator: event setup and per-tick rendering.

import { formatNumber } from '../util/format.js';
import { getJournalEntries } from './notifications.js';
import { renderResearchPanel, renderGeneratorPanel, renderCombatPanel, renderSanctumPanel } from './panels.js';

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

// Module-level engines reference so render() can pass it to panel functions.
let _engines = null;

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
  _engines = engines;
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
  _autoSwitchToCombat(state);
  _renderActivePanel(state, data, _engines);
  _renderJournal(state);
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
 * If combat becomes active, automatically switches the visible panel to view-combat
 * and updates the grimoire nav highlighting accordingly.
 */
function _autoSwitchToCombat(state) {
  if (!state.combat || !state.combat.active) return;

  const combatPanel = document.getElementById('view-combat');
  if (!combatPanel) return;

  // Already showing combat — nothing to do.
  if (combatPanel.classList.contains('active')) return;

  // Deactivate all panels.
  const viewPanels = document.querySelectorAll('.view-panel');
  for (const panel of viewPanels) {
    panel.classList.remove('active');
  }
  combatPanel.classList.add('active');

  // Update nav button highlighting.
  const navButtons = document.querySelectorAll('.nav-btn[data-panel]');
  for (const btn of navButtons) {
    btn.classList.remove('active');
    if (btn.dataset.panel === 'combat') {
      btn.classList.add('active');
    }
  }
}

/**
 * Calls the appropriate render function for whichever view-panel is currently active.
 */
function _renderActivePanel(state, data, engines) {
  const activePanel = document.querySelector('.view-panel.active');
  if (!activePanel) return;

  // The seven discipline research views share the same renderResearchPanel logic.
  const DISCIPLINE_VIEW_TO_DATA = {
    'view-temporal': 'temporal_arcana',
    'view-spatial':  'spatial_weaving',
    'view-mind':     'mind_sculpting',
    'view-vital':    'vital_alchemy',
    'view-shadow':   'shadow_binding',
    'view-chaos':    'chaos_channeling',
    'view-order':    'order_forging',
  };

  const dataDisciplineId = DISCIPLINE_VIEW_TO_DATA[activePanel.id];
  if (dataDisciplineId && engines) {
    // renderResearchPanel manages its own discipline tab state internally.
    renderResearchPanel(activePanel, state, data, engines);
    return;
  }

  if (activePanel.id === 'view-generators') {
    renderGeneratorPanel(activePanel, state, data, engines);
    return;
  }

  if (activePanel.id === 'view-combat') {
    renderCombatPanel(activePanel, state, data, engines);
    return;
  }

  if (activePanel.id === 'view-sanctum') {
    renderSanctumPanel(activePanel, state, data, engines);
    return;
  }
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
