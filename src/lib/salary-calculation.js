/**
 * Convert an input into a finite, non-negative amount.
 * @param {unknown} value
 * @returns {number}
 */
function nonNegativeAmount(value) {
  const amount = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(amount) ? Math.max(0, amount) : 0;
}

/**
 * Calculate a transparent arithmetic-only salary estimate.
 * @param {{basicPay?: unknown, allowances?: unknown, deductions?: unknown}} [values]
 * @returns {{basicPay: number, allowances: number, gross: number, deductions: number, net: number}}
 */
export function calculateSalary({ basicPay = 0, allowances = 0, deductions = 0 } = {}) {
  const normalizedBasicPay = nonNegativeAmount(basicPay);
  const normalizedAllowances = nonNegativeAmount(allowances);
  const gross = normalizedBasicPay + normalizedAllowances;
  const totalDeductions = Math.min(gross, nonNegativeAmount(deductions));

  return {
    basicPay: normalizedBasicPay,
    allowances: normalizedAllowances,
    gross,
    deductions: totalDeductions,
    net: gross - totalDeductions
  };
}
