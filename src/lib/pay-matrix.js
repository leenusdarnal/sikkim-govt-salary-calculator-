/**
 * Sikkim Government Services (Revised Pay) Rules, 2018 — Gazette No. 333,
 * Schedule Part A (printed pages 12–14).
 *
 * Entry-pay and cell-count metadata are transcribed from the Gazette. Remaining
 * cells follow the schedule's annual 3% progression, with the increment rounded
 * to the nearest ₹100 before being added to the current cell.
 *
 * This dataset is a pay-matrix lookup only. It does not determine an employee's
 * applicable Level, post eligibility, allowance, deduction, or current pay.
 */
const SOURCE_LEVELS = [
  [1, 1400, 15200, 40],
  [2, 1800, 16200, 40],
  [3, 2300, 19300, 40],
  [4, 2200, 18000, 40],
  [5, 2300, 19400, 40],
  [6, 2400, 20300, 40],
  [7, 2600, 21700, 40],
  [8, 2700, 22800, 40],
  [9, 3000, 25400, 40],
  [10, 3400, 30200, 40],
  [11, 3800, 33700, 40],
  [12, 4200, 37100, 40],
  [13, 4400, 37600, 40],
  [14, 4600, 39100, 40],
  [15, 5000, 46300, 36],
  [16, 5400, 49700, 35],
  [17, 6200, 56000, 32],
  [18, 6700, 65000, 28],
  [19, 7200, 71100, 26],
  [20, 8700, 83700, 23],
  [21, 9000, 105400, 19],
  [22, 9500, 120500, 18],
  [23, 10000, 124700, 17]
];

/** @param {number} currentPay */
function nextCell(currentPay) {
  const increment = Math.floor((currentPay * 0.03) / 100 + 0.5) * 100;
  return currentPay + increment;
}

export const PAY_LEVELS = Object.freeze(
  SOURCE_LEVELS.map(([level, gradePay, entryPay, cellCount]) => {
    const cells = [entryPay];
    while (cells.length < cellCount) {
      cells.push(nextCell(cells[cells.length - 1]));
    }

    return Object.freeze({
      level,
      gradePay,
      entryPay,
      cells: Object.freeze(cells)
    });
  })
);

/** @param {number} level @returns {{level:number, gradePay:number, entryPay:number, cells: readonly number[]} | undefined} */
export function getPayLevel(level) {
  return PAY_LEVELS.find((item) => item.level === level);
}

/** @param {number} level @param {number} cell @returns {number | undefined} */
export function getPayCell(level, cell) {
  const payLevel = getPayLevel(level);
  if (!payLevel || !Number.isInteger(cell) || cell < 1) return undefined;
  return payLevel.cells[cell - 1];
}
