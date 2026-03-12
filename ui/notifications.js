// ui/notifications.js
// Journal entry management for the game's narrative log.

const MAX_JOURNAL_ENTRIES = 100;

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
