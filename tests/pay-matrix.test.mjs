import test from 'node:test';
import assert from 'node:assert/strict';
import { getPayCell, getPayLevel, PAY_LEVELS } from '../src/lib/pay-matrix.js';

test('includes all 23 Gazette Part A levels with their source metadata and actual cell counts', () => {
  assert.equal(PAY_LEVELS.length, 23);
  assert.deepEqual(PAY_LEVELS.map(({ level }) => level), Array.from({ length: 23 }, (_, i) => i + 1));
  assert.equal(getPayLevel(1).gradePay, 1400);
  assert.equal(getPayLevel(4).gradePay, 2200);
  assert.equal(getPayLevel(17).entryPay, 56000);
  assert.equal(getPayLevel(23).entryPay, 124700);
  assert.deepEqual(PAY_LEVELS.map(({ cells }) => cells.length), [
    40, 40, 40, 40, 40, 40, 40, 40,
    40, 40, 40, 40, 40, 40, 37, 36,
    32, 29, 27, 24, 19, 18, 17
  ]);
});

test('matches representative Gazette cells at lower, middle and upper levels', () => {
  assert.equal(getPayCell(1, 1), 15200);
  assert.equal(getPayCell(1, 2), 15700);
  assert.equal(getPayCell(1, 40), 48500);
  assert.equal(getPayCell(9, 40), 81000);
  assert.equal(getPayCell(17, 32), 139800);
  assert.equal(getPayCell(23, 17), 200100);
});

test('does not return a value for invalid levels or blank cells', () => {
  assert.equal(getPayLevel(0), undefined);
  assert.equal(getPayLevel(24), undefined);
  assert.equal(getPayCell(23, 18), undefined);
  assert.equal(getPayCell(1, 0), undefined);
});

test('rounds the three-percent increment to the nearest hundred before adding it', () => {
  assert.equal(getPayCell(1, 8), 18700);
  assert.equal(getPayCell(17, 6), 64900);
});
