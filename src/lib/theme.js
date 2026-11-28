const THEMES = new Set(['light', 'dark']);

/**
 * Resolve a stored preference, falling back to the current system preference.
 * @param {unknown} savedTheme
 * @param {unknown} systemTheme
 * @returns {'light' | 'dark'}
 */
export function resolveTheme(savedTheme, systemTheme) {
  if (THEMES.has(savedTheme)) return savedTheme;
  return systemTheme === 'dark' ? 'dark' : 'light';
}

/**
 * @param {unknown} currentTheme
 * @returns {'light' | 'dark'}
 */
export function nextTheme(currentTheme) {
  return currentTheme === 'dark' ? 'light' : 'dark';
}
