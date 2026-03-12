// ui/notifications.js
// Journal entry management and toast notifications for the game's narrative log.

const MAX_JOURNAL_ENTRIES = 100;
const MAX_VISIBLE_ENTRIES = 50;

/**
 * Pushes a new entry to state.journal.
 * Trims the oldest entry if the log exceeds MAX_JOURNAL_ENTRIES.
 *
 * @param {object} state - Live game state.
 * @param {string} text  - The message to log.
 * @param {string} type  - Entry type: 'info' | 'discovery' | 'combat' | 'event'
 */
export function addJournalEntry(state, text, type = 'info') {
  state.journal.push({ text, type, timestamp: Date.now() });
  if (state.journal.length > MAX_JOURNAL_ENTRIES) {
    state.journal.shift();
  }
}

/**
 * Returns the last `count` entries from state.journal, newest first.
 *
 * @param {object} state - Live game state.
 * @param {number} count - Number of entries to return.
 * @returns {Array} Slice of journal entries in reverse chronological order.
 */
export function getJournalEntries(state, count) {
  return state.journal.slice(-count).reverse();
}

/**
 * Formats a timestamp as a human-readable relative time string.
 *
 * @param {number} timestamp - Unix timestamp in ms.
 * @returns {string} e.g. "just now", "1m ago", "5m ago"
 */
function _relativeTime(timestamp) {
  const diffMs = Date.now() - timestamp;
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 30) return 'just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 1) return 'just now';
  return `${diffMin}m ago`;
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

/**
 * Renders journal entries into the #journal-entries element.
 * Shows entries newest first, up to MAX_VISIBLE_ENTRIES.
 * Each entry is styled by type and includes a relative timestamp.
 *
 * @param {Element} container - The container element (unused; always targets #journal-entries).
 * @param {object}  state     - Live game state with state.journal array.
 */
export function renderJournal(container, state) {
  const el = (container && container.id === 'journal-entries')
    ? container
    : document.getElementById('journal-entries');
  if (!el) return;

  const entries = getJournalEntries(state, MAX_VISIBLE_ENTRIES);
  if (entries.length === 0) return;

  let html = '';
  for (const entry of entries) {
    const typeClass = entry.type ? `journal-${entry.type}` : 'journal-info';
    const safeText  = _escapeHtml(entry.text);
    const timeStr   = entry.timestamp ? _relativeTime(entry.timestamp) : '';
    html += `<p class="journal-entry ${typeClass}">${safeText}<span class="journal-time">${timeStr}</span></p>`;
  }
  el.innerHTML = html;
}

/**
 * Shows a brief toast notification at the top-center of the viewport.
 * Multiple toasts stack vertically. Auto-removes after 3 seconds.
 *
 * @param {string} message - The message to display.
 * @param {string} type    - 'info' (default) | 'discovery' | 'combat' | 'event'
 */
export function showToast(message, type = 'info') {
  // Find or create the shared toast container.
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast' + (type !== 'info' ? ` toast-${type}` : '');
  toast.textContent = message;
  container.appendChild(toast);

  // Auto-remove after 3 seconds (matches the CSS toastFadeOut animation at 2.7s).
  setTimeout(() => {
    toast.remove();
    // Clean up container when empty.
    if (container.children.length === 0) {
      container.remove();
    }
  }, 3000);
}
