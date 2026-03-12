// ui/renderer.js
// Main UI coordinator: event setup and per-tick rendering.

import { formatNumber, formatTime } from '../util/format.js';
import { renderJournal, showToast } from './notifications.js';
import { renderDashboardPanel, renderResearchPanel, renderGeneratorPanel, renderCombatPanel, renderSanctumPanel, renderEventPanel, renderDiscoveryPanel, renderChallengeDisplay, renderPrestigePanel, setActiveDisciplineTab } from './panels.js';
import { saveGame, exportSave, importSave, deleteSave, autoSave } from '../util/save.js';

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

// Tracks previous state snapshots for detecting changes between renders.
let _prevCombatActive = false;
let _prevResearchCompleted = null; // Set of completed research IDs
let _prevDiscoveries = null;       // Set of found discovery IDs

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
  _initVisibilityPause(state);
  _initSaveControls(state);
  _maybeShowIntroOverlay(state);
  window.addEventListener('beforeunload', () => saveGame(state));
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
  renderJournal(null, state);
  _renderEventOverlay(state, data, _engines);
  _renderChallengeIndicator(state);
  _checkAndFireToasts(state);
  _updateGrimoireVisibility(state, data);
  autoSave(state);
}

// ---------------------------------------------------------------------------
// Private helpers
// ---------------------------------------------------------------------------

// Maps grimoire nav data-panel values for discipline buttons to research discipline IDs.
const PANEL_TO_DISCIPLINE = {
  temporal: 'temporal_arcana',
  spatial:  'spatial_weaving',
  mind:     'mind_sculpting',
  vital:    'vital_alchemy',
  shadow:   'shadow_binding',
  chaos:    'chaos_channeling',
  order:    'order_forging',
};

/**
 * Wires up the Grimoire nav buttons to switch the active view panel.
 * For discipline buttons, also sets the active discipline tab in the research panel.
 */
function _initGrimoireNav() {
  const navButtons = document.querySelectorAll('.nav-btn[data-panel]');
  const viewPanels = document.querySelectorAll('.view-panel');

  for (const btn of navButtons) {
    btn.addEventListener('click', () => {
      const targetPanel = btn.dataset.panel;

      // If this is a discipline button, set the active tab in the research panel.
      const disciplineId = PANEL_TO_DISCIPLINE[targetPanel];
      if (disciplineId) {
        setActiveDisciplineTab(disciplineId);
      }

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

  if (activePanel.id === 'view-dashboard') {
    renderDashboardPanel(activePanel, state, data, engines);
    return;
  }

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

  if (activePanel.id === 'view-discoveries') {
    renderDiscoveryPanel(activePanel, state, data, engines);
    return;
  }

  if (activePanel.id === 'view-prestige') {
    renderPrestigePanel(activePanel, state, data, engines);
    return;
  }
}

/**
 * Renders or removes the event overlay on top of the viewport.
 * The overlay shows regardless of which panel is active.
 */
function _renderEventOverlay(state, data, engines) {
  const viewport = document.getElementById('viewport');
  if (!viewport) return;

  const active = state.events && state.events.active;

  let overlay = viewport.querySelector('.event-overlay');

  if (!active) {
    // Remove overlay if it exists but there is no active event.
    if (overlay) overlay.remove();
    return;
  }

  // Create overlay if it doesn't exist yet.
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'event-overlay';
    viewport.appendChild(overlay);
  }

  // Render event content into the overlay.
  renderEventPanel(overlay, state, data, engines);
}

/**
 * Creates or updates the challenge indicator element in the top bar.
 */
function _renderChallengeIndicator(state) {
  const topBar = document.getElementById('top-bar');
  if (!topBar) return;

  const html = renderChallengeDisplay(state);

  let indicator = document.getElementById('challenge-indicator');

  if (!html) {
    // Hide or remove indicator if no active challenge.
    if (indicator) indicator.style.display = 'none';
    return;
  }

  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'challenge-indicator';
    topBar.appendChild(indicator);
  }

  indicator.style.display = '';
  indicator.innerHTML = html;
}

/**
 * Detects state changes between renders and fires appropriate toast notifications:
 * - Research completion
 * - Combat start / end
 * - New discovery found
 */
function _checkAndFireToasts(state) {
  // --- Research completions ---
  if (state.research && Array.isArray(state.research.completed)) {
    const currentCompleted = new Set(state.research.completed);

    if (_prevResearchCompleted !== null) {
      for (const id of currentCompleted) {
        if (!_prevResearchCompleted.has(id)) {
          showToast(`Research complete: ${_formatResearchId(id)}`, 'info');
        }
      }
    }
    _prevResearchCompleted = currentCompleted;
  }

  // --- Combat start / end ---
  const combatActive = !!(state.combat && state.combat.active);
  if (combatActive && !_prevCombatActive) {
    showToast('Combat engaged!', 'combat');
  } else if (!combatActive && _prevCombatActive) {
    showToast('Combat ended.', 'combat');
  }
  _prevCombatActive = combatActive;

  // --- New discoveries ---
  if (state.discoveries && Array.isArray(state.discoveries.found)) {
    const currentDiscoveries = new Set(state.discoveries.found);

    if (_prevDiscoveries !== null) {
      for (const id of currentDiscoveries) {
        if (!_prevDiscoveries.has(id)) {
          showToast(`Discovery: ${_formatResearchId(id)}`, 'discovery');
        }
      }
    }
    _prevDiscoveries = currentDiscoveries;
  }
}

/**
 * Converts a snake_case ID to Title Case for display in toasts.
 * e.g. "fire_mastery" -> "Fire Mastery"
 */
function _formatResearchId(id) {
  return id.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Appends save/import/export/delete controls to the grimoire nav, below the
 * existing nav sections.
 */
function _initSaveControls(state) {
  const grimoire = document.getElementById('grimoire');
  if (!grimoire) return;

  const section = document.createElement('div');
  section.className = 'grimoire-section grimoire-section--settings';
  section.innerHTML = `
    <h2 class="grimoire-heading">Settings</h2>
    <div class="settings-controls">
      <button class="settings-btn" id="save-game-btn">Save Game</button>
      <button class="settings-btn" id="export-save-btn">Export Save</button>
      <div class="import-save-wrap">
        <button class="settings-btn" id="import-save-btn">Import Save</button>
        <div class="import-save-input-wrap" id="import-save-input-wrap" style="display:none;">
          <textarea class="import-save-textarea" id="import-save-text" placeholder="Paste save data here..."></textarea>
          <button class="settings-btn settings-btn--confirm" id="import-save-confirm-btn">Confirm Import</button>
        </div>
      </div>
      <button class="settings-btn settings-btn--danger" id="delete-save-btn">Delete Save</button>
    </div>`;

  grimoire.appendChild(section);

  document.getElementById('save-game-btn').addEventListener('click', () => {
    saveGame(state);
    showToast('Game saved!');
  });

  document.getElementById('export-save-btn').addEventListener('click', () => {
    exportSave(state);
    showToast('Save copied to clipboard!');
  });

  document.getElementById('import-save-btn').addEventListener('click', () => {
    const wrap = document.getElementById('import-save-input-wrap');
    if (wrap) wrap.style.display = wrap.style.display === 'none' ? '' : 'none';
  });

  document.getElementById('import-save-confirm-btn').addEventListener('click', () => {
    const text = (document.getElementById('import-save-text') || {}).value || '';
    if (!text.trim()) return;
    try {
      // importSave validates and returns the parsed state object
      const parsed = importSave(text.trim());
      localStorage.setItem('arcanist_save', JSON.stringify(parsed));
      location.reload();
    } catch (err) {
      showToast(`Import failed: ${err.message}`);
    }
  });

  document.getElementById('delete-save-btn').addEventListener('click', () => {
    if (confirm('Delete your save? This cannot be undone.')) {
      deleteSave();
      location.reload();
    }
  });
}

/**
 * Shows a modal overlay reporting offline resource gains.
 * offlineResult is the object returned by calculateOfflineProgress.
 * data is the static game data (used to look up resource display names/icons).
 */
export function showOfflineModal(offlineResult, data) {
  if (!offlineResult) return;

  const { elapsed, gains } = offlineResult;
  const elapsedStr = formatTime(Math.round(elapsed));

  // Build the resource gains list
  const resourceDefs = (data.resources && data.resources.resources) || [];
  const gainEntries = Object.entries(gains);

  let gainsHtml = '';
  for (const [resId, amount] of gainEntries) {
    const def = resourceDefs.find((r) => r.id === resId);
    const name = def ? def.name : resId;
    const icon = def && def.icon ? def.icon : '';
    gainsHtml += `<li class="offline-gain-item">${icon ? `<span class="offline-gain-icon">${icon}</span>` : ''}<span class="offline-gain-label">${name}:</span> <span class="offline-gain-amount">+${formatNumber(amount)}</span></li>`;
  }

  if (!gainsHtml) {
    gainsHtml = '<li class="offline-gain-item">No resources generated.</li>';
  }

  const overlay = document.createElement('div');
  overlay.id = 'offline-modal-overlay';
  overlay.className = 'offline-modal-overlay';
  overlay.innerHTML = `
    <div class="offline-modal">
      <h2 class="offline-modal-title">Welcome back!</h2>
      <p class="offline-modal-subtitle">While you were away (${elapsedStr}):</p>
      <ul class="offline-gains-list">${gainsHtml}</ul>
      <button class="offline-modal-continue-btn" id="offline-modal-continue">Continue</button>
    </div>`;

  document.body.appendChild(overlay);

  document.getElementById('offline-modal-continue').addEventListener('click', () => {
    overlay.remove();
  });
}

/**
 * Registers a visibilitychange listener that sets state.challenges._paused
 * to true when the page is hidden, false when visible.
 */
function _initVisibilityPause(state) {
  document.addEventListener('visibilitychange', () => {
    if (!state.challenges) return;
    state.challenges._paused = document.hidden;
  });
}

/**
 * Shows the full-screen intro overlay for brand-new players (first-ever game,
 * no research done, fewer than 5 ticks elapsed, intro not yet dismissed).
 * Dismissing saves state.settings.introSeen = true.
 *
 * @param {object} state - Live game state.
 */
function _maybeShowIntroOverlay(state) {
  // Ensure settings sub-object exists.
  if (!state.settings) state.settings = {};

  // Only show for brand-new games where the player hasn't seen the intro yet.
  const isNewGame =
    !state.settings.introSeen &&
    (state.prestige.convergenceCount || 0) === 0 &&
    (state.research.completed || []).length === 0 &&
    (state.tick || 0) < 5;

  if (!isNewGame) return;

  const overlay = document.createElement('div');
  overlay.className = 'intro-overlay';
  overlay.id = 'intro-overlay';
  overlay.innerHTML = `
    <div class="intro-card">
      <div class="intro-title">THE ARCANIST'S STUDY</div>
      <div class="intro-text">
        <p>You have inherited a tower.</p>
        <p>Within its walls, seven paths of magic await your study. The air hums with dormant power.</p>
        <p>Your mana reserves begin to fill.<br>The first step is yours to choose.</p>
      </div>
      <button class="intro-btn" id="intro-begin-btn">Begin Your Studies</button>
    </div>`;

  document.body.appendChild(overlay);

  document.getElementById('intro-begin-btn').addEventListener('click', () => {
    state.settings.introSeen = true;
    overlay.remove();
  });
}

/**
 * Determines whether a grimoire nav item should be visible given the current
 * game state.
 *
 * @param {string} panel - The data-panel value of the nav button.
 * @param {object} state - Live game state.
 * @param {object} data  - Static game data.
 * @returns {boolean}
 */
function _isNavUnlocked(panel, state, data) {
  // Always visible
  if (panel === 'dashboard') return true;
  if (panel === 'temporal')  return true;

  // Other six disciplines: visible after the player completes their first research node
  if (['spatial', 'mind', 'vital', 'shadow', 'chaos', 'order'].includes(panel))
    return state.research.completed.length > 0;

  // Generators: visible once the player owns at least one generator
  if (panel === 'generators')
    return Object.values(state.generators).some((g) => g.count > 0);

  // Combat: visible after completing a Tier 2 node
  if (panel === 'combat')
    return state.research.completed.some((id) => id.includes('_t2_'));

  // Sanctum: visible after winning at least one combat
  if (panel === 'sanctum')
    return (state.discoveries.counters.combat_win || 0) > 0;

  // Discoveries: visible after finding at least one discovery
  if (panel === 'discoveries')
    return (state.discoveries.found || []).length > 0;

  // Prestige: visible after completing a Tier 3 node
  if (panel === 'prestige')
    return state.research.completed.some((id) => id.includes('_t3_'));

  // Anything else (e.g. future panels) defaults to visible
  return true;
}

/**
 * Called each render tick. Shows or hides grimoire nav buttons based on
 * progressive unlock conditions so new players aren't overwhelmed.
 * The Settings section is always visible (it is injected as a plain div, not
 * a nav-btn, so it is unaffected by this function).
 *
 * @param {object} state - Live game state.
 * @param {object} data  - Static game data.
 */
function _updateGrimoireVisibility(state, data) {
  const navButtons = document.querySelectorAll('.nav-btn[data-panel]');
  for (const btn of navButtons) {
    const panel = btn.dataset.panel;
    btn.style.display = _isNavUnlocked(panel, state, data) ? '' : 'none';
  }

  // Also hide the "Disciplines" section heading when all discipline buttons
  // other than Temporal are still locked, to avoid a lonely heading.
  const disciplinesHeading = document.querySelector('.grimoire-section:nth-of-type(2) .grimoire-heading');
  if (disciplinesHeading) {
    const otherDisciplinesVisible = state.research.completed.length > 0;
    disciplinesHeading.style.display = otherDisciplinesVisible ? '' : 'none';
  }
}

/** Sets the textContent of an element by ID; silently skips if not found. */
function _setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}
