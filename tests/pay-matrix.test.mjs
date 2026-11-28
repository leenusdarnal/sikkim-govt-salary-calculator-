import test from 'node:test';
import assert from 'node:assert/strict';
import { getPayCell, getPayLevel, PAY_LEVELS } from '../src/lib/pay-matrix.js';

test('includes all 23 Gazette Part A levels with their source metadata and actual cell counts', () => {
  assert.equal(PAY_LEVELS.length, 23);
  assert.deepEqual(PAY_LEVELS.map(({ level }) => level), Array.from({ length: 23 }, (_, i) => i + 1));
  assert.deepEqual(PAY_LEVELS.map(({ level, gradePay, entryPay }) => [level, gradePay, entryPay]), [
    [1, 1400, 15200], [2, 1800, 16200], [3, 2300, 19300], [4, 2200, 18000],
    [5, 2300, 19400], [6, 2400, 20300], [7, 2600, 21700], [8, 2700, 22800],
    [9, 3000, 25400], [10, 3400, 30200], [11, 3800, 33700], [12, 4200, 37100],
    [13, 4400, 37600], [14, 4600, 39100], [15, 5000, 46300], [16, 5400, 49700],
    [17, 6200, 56000], [18, 6700, 65000], [19, 7200, 71100], [20, 8700, 83700],
    [21, 9000, 105400], [22, 9500, 120500], [23, 10000, 124700]
  ]);
  assert.equal(getPayLevel(1)?.gradePay, 1400);
  assert.equal(getPayLevel(4)?.gradePay, 2200);
  assert.equal(getPayLevel(17)?.entryPay, 56000);
  assert.equal(getPayLevel(23)?.entryPay, 124700);
  assert.deepEqual(PAY_LEVELS.map(({ cells }) => cells.length), [
    40, 40, 40, 40, 40, 40, 40, 40,
    40, 40, 40, 40, 40, 40, 36, 35,
    32, 28, 26, 23, 19, 18, 17
  ]);
});

test('matches representative Gazette cells at lower, middle and upper levels', () => {
  assert.equal(getPayCell(1, 1), 15200);
  assert.equal(getPayCell(1, 2), 15700);
  assert.equal(getPayCell(1, 40), 48500);
  assert.equal(getPayCell(2, 40), 51500);
  assert.equal(getPayCell(3, 40), 61400);
  assert.equal(getPayCell(4, 40), 56900);
  assert.equal(getPayCell(5, 40), 61700);
  assert.equal(getPayCell(6, 40), 64100);
  assert.equal(getPayCell(7, 40), 69100);
  assert.equal(getPayCell(8, 40), 72100);
  assert.equal(getPayCell(9, 40), 81000);
  assert.equal(getPayCell(10, 40), 95700);
  assert.equal(getPayCell(11, 40), 106600);
  assert.equal(getPayCell(12, 40), 117400);
  assert.equal(getPayCell(13, 40), 119300);
  assert.equal(getPayCell(14, 40), 123700);
  assert.equal(getPayCell(15, 36), 130500);
  assert.equal(getPayCell(16, 35), 135500);
  assert.equal(getPayCell(17, 32), 139800);
  assert.equal(getPayCell(18, 28), 144300);
  assert.equal(getPayCell(19, 26), 148600);
  assert.equal(getPayCell(20, 23), 160500);
  assert.equal(getPayCell(21, 19), 179800);
  assert.equal(getPayCell(22, 18), 199100);
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

test('every generated cell is a whole-rupee amount and follows the documented progression', () => {
  for (const level of PAY_LEVELS) {
    assert.equal(level.cells[0], level.entryPay);
    for (let index = 1; index < level.cells.length; index += 1) {
      const current = level.cells[index - 1];
      const increment = Math.floor((current * 0.03) / 100 + 0.5) * 100;
      assert.equal(level.cells[index], current + increment, `Level ${level.level}, cell ${index + 1}`);
      assert.equal(Number.isInteger(level.cells[index]), true);
    }
  }
});
