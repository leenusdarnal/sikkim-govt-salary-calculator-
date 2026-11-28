import test from 'node:test';
import assert from 'node:assert/strict';
import { getPayLevel, PAY_LEVELS } from '../src/lib/pay-matrix.js';
import { STATE_BANK_ANNEXURE } from './fixtures/state-bank-annexure-i.js';

const EXPECTED_SHARED_LEVELS = [4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 17, 19, 20, 21, 22];
const EXPECTED_CELL_COUNTS = {
  4: 40, 5: 40, 6: 40, 7: 40, 9: 40, 10: 40, 11: 40, 12: 40,
  14: 40, 15: 36, 16: 35, 17: 32, 19: 26, 20: 23, 21: 19, 22: 18
};

test('cross-checks every State Bank Annexure-I cell against the matching Gazette lookup Level', () => {
  let comparedCells = 0;

  for (const page of STATE_BANK_ANNEXURE.pages) {
    assert.equal(page.rows.length, 40, `PDF page ${page.pdfPage} should have 40 cell rows`);

    for (const [columnIndex, levelNumber] of page.levels.entries()) {
      const level = getPayLevel(levelNumber);
      assert.ok(level, `Gazette Level ${levelNumber} must exist`);
      assert.equal(level.cells.length, EXPECTED_CELL_COUNTS[levelNumber]);
      assert.equal(
        page.rows.filter((row) => columnIndex < row.length).length,
        EXPECTED_CELL_COUNTS[levelNumber],
        `State Bank fixture cell count for Level ${levelNumber}`
      );
    }

    page.rows.forEach((row, rowIndex) => {
      assert.ok(row.length > 0, `PDF page ${page.pdfPage}, row ${rowIndex + 1} must contain at least one value`);
      assert.ok(row.length <= page.levels.length, `PDF page ${page.pdfPage}, row ${rowIndex + 1} has too many values`);

      row.forEach((sourceValue, columnIndex) => {
        const levelNumber = page.levels[columnIndex];
        const generatedValue = getPayLevel(levelNumber).cells[rowIndex];
        assert.equal(
          generatedValue,
          sourceValue,
          `Level ${levelNumber}, cell ${rowIndex + 1} (State Bank PDF page ${page.pdfPage})`
        );
        comparedCells += 1;
      });
    });
  }

  assert.equal(comparedCells, 549, 'The fixture should cover all 549 published State Bank cells');
});

test('the State Bank comparison is a subset of the 23-Level Gazette matrix, not the whole matrix', () => {
  assert.equal(PAY_LEVELS.length, 23);
  assert.deepEqual(
    STATE_BANK_ANNEXURE.pages.flatMap(({ levels }) => levels),
    EXPECTED_SHARED_LEVELS
  );

  const gazetteOnlyLevels = PAY_LEVELS
    .map(({ level }) => level)
    .filter((level) => !EXPECTED_SHARED_LEVELS.includes(level));

  assert.deepEqual(gazetteOnlyLevels, [1, 2, 3, 8, 13, 18, 23]);
});
