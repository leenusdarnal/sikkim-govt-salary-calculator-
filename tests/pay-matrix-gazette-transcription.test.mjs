import test from 'node:test';
import assert from 'node:assert/strict';
import { getPayLevel } from '../src/lib/pay-matrix.js';
import { GAZETTE_ONLY_LEVEL_TRANSCRIPTION } from './fixtures/gazette-part-a-only-levels.js';

/** @type {Record<number, number>} */
const EXPECTED_CELL_COUNTS = {
  1: 40, 2: 40, 3: 40, 8: 40, 13: 40, 18: 28, 23: 17
};

test('matches every manually transcribed Gazette cell for Levels absent from the State Bank annexure', () => {
  let comparedCells = 0;

  assert.deepEqual(
    GAZETTE_ONLY_LEVEL_TRANSCRIPTION.map(({ level }) => level),
    [1, 2, 3, 8, 13, 18, 23]
  );

  for (const sourceLevel of GAZETTE_ONLY_LEVEL_TRANSCRIPTION) {
    const payLevel = getPayLevel(sourceLevel.level);
    assert.ok(payLevel, `Gazette Level ${sourceLevel.level} must exist`);
    assert.equal(sourceLevel.cells.length, EXPECTED_CELL_COUNTS[sourceLevel.level]);
    assert.equal(payLevel.cells.length, sourceLevel.cells.length);

    sourceLevel.cells.forEach((sourceValue, index) => {
      assert.equal(
        payLevel?.cells[index],
        sourceValue,
        `Gazette printed page ${sourceLevel.printedPage}, Level ${sourceLevel.level}, cell ${index + 1}`
      );
      comparedCells += 1;
    });
  }

  assert.equal(comparedCells, 245, 'The seven Gazette-only Levels contain 245 published cells');
});

test('the Gazette source transcription covers the full 794-cell matrix when combined with the 16 shared Levels', () => {
  const fullMatrixCellCount = GAZETTE_ONLY_LEVEL_TRANSCRIPTION.reduce(
    (total, level) => total + level.cells.length,
    549
  );

  assert.equal(fullMatrixCellCount, 794);
});
