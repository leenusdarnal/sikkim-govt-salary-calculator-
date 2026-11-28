import test from 'node:test';
import assert from 'node:assert/strict';
import { nextTheme, resolveTheme } from '../src/lib/theme.js';

test('uses a saved valid preference before the system preference', () => {
  assert.equal(resolveTheme('dark', 'light'), 'dark');
  assert.equal(resolveTheme('light', 'dark'), 'light');
});

test('follows the system preference when no valid preference is saved', () => {
  assert.equal(resolveTheme(null, 'dark'), 'dark');
  assert.equal(resolveTheme(null, 'light'), 'light');
  assert.equal(resolveTheme('system', 'dark'), 'dark');
  assert.equal(resolveTheme('unexpected', 'light'), 'light');
});

test('toggles between explicit light and dark modes', () => {
  assert.equal(nextTheme('light'), 'dark');
  assert.equal(nextTheme('dark'), 'light');
});
