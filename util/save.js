// util/save.js
// Save system: localStorage persistence, Base64 export/import, and auto-save.

const SAVE_KEY = 'arcanist_save';

/**
 * Serializes state to JSON and stores it in localStorage.
 * Updates state.settings.lastSave to the current timestamp.
 * Returns true on success, false if an error occurs (e.g. storage quota exceeded).
 */
export function saveGame(state) {
  try {
    state.settings.lastSave = Date.now();
    const serialized = JSON.stringify(state);
    localStorage.setItem(SAVE_KEY, serialized);
    return true;
  } catch {
    return false;
  }
}

/**
 * Reads the save from localStorage and parses it.
 * Returns the state object on success, or null if no save exists or parsing fails.
 */
export function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw === null) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Serializes state to JSON, encodes as Base64, and copies to the clipboard.
 * Returns the encoded string (callers may display it as a fallback).
 */
export function exportSave(state) {
  const json = JSON.stringify(state);
  const encoded = btoa(json);
  navigator.clipboard.writeText(encoded);
  return encoded;
}

/**
 * Decodes a Base64 save string and parses the JSON.
 * Validates that the result contains a settings.version field.
 * Returns the parsed state object, or throws an Error with a descriptive message.
 */
export function importSave(encoded) {
  let json;
  try {
    json = atob(encoded);
  } catch {
    throw new Error('Invalid save data: Base64 decoding failed.');
  }

  let parsed;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error('Invalid save data: JSON parsing failed.');
  }

  if (!parsed || !parsed.settings || parsed.settings.version === undefined) {
    throw new Error('Invalid save data: missing settings.version field.');
  }

  return parsed;
}

/**
 * Removes the save entry from localStorage.
 */
export function deleteSave() {
  localStorage.removeItem(SAVE_KEY);
}

/**
 * Saves the game if at least 60 seconds have passed since the last save.
 * Returns true if a save was performed, false otherwise.
 */
export function autoSave(state) {
  if (Date.now() - state.settings.lastSave >= 60000) {
    return saveGame(state);
  }
  return false;
}
