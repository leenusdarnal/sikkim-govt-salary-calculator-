/**
 * Build a printable statement from the normalized manual salary calculation.
 * The values are arithmetic outputs only; this module does not apply pay rules.
 *
 * @param {{
 *   basicPay: number,
 *   allowances: number,
 *   gross: number,
 *   deductions: number,
 *   net: number
 * }} calculation
 * @returns {{
 *   title: string,
 *   disclaimer: string,
 *   lines: Array<{
 *     id: string,
 *     label: string,
 *     amount: number,
 *     emphasis?: boolean,
 *     deduction?: boolean
 *   }>
 * }}
 */
export function createManualEstimateStatement(calculation) {
  return {
    title: 'Monthly salary estimate',
    disclaimer:
      'This is a manual arithmetic estimate based only on amounts entered by the user. No verified Government of Sikkim allowance or deduction rules are applied. It is not an official salary statement.',
    lines: [
      {
        id: 'basic-pay',
        label: 'Basic pay (user-entered)',
        amount: calculation.basicPay
      },
      {
        id: 'allowances',
        label: 'Allowances (user-entered)',
        amount: calculation.allowances
      },
      {
        id: 'gross',
        label: 'Gross amount',
        amount: calculation.gross,
        emphasis: true
      },
      {
        id: 'deductions',
        label: 'Deductions (input, capped at gross pay)',
        amount: calculation.deductions,
        deduction: true
      },
      {
        id: 'net',
        label: 'Estimated net salary',
        amount: calculation.net,
        emphasis: true
      }
    ]
  };
}
