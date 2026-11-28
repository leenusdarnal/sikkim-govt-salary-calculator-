import test from 'node:test';
import assert from 'node:assert/strict';
import { createManualEstimateStatement } from '../src/lib/estimate-statement.js';

test('creates labelled statement lines from normalized calculation amounts', () => {
  const statement = createManualEstimateStatement({
    basicPay: 56000,
    allowances: 12000,
    gross: 68000,
    deductions: 8500,
    net: 59500
  });

  assert.equal(statement.title, 'Monthly salary estimate');
  assert.deepEqual(statement.lines, [
    { id: 'basic-pay', label: 'Basic pay (user-entered)', amount: 56000 },
    { id: 'allowances', label: 'Allowances (user-entered)', amount: 12000 },
    { id: 'gross', label: 'Gross amount', amount: 68000, emphasis: true },
    { id: 'deductions', label: 'Deductions (user-entered)', amount: 8500, deduction: true },
    { id: 'net', label: 'Estimated net salary', amount: 59500, emphasis: true }
  ]);
});

test('explicitly identifies the document as a manual estimate, not an official salary statement', () => {
  const statement = createManualEstimateStatement({
    basicPay: 0,
    allowances: 0,
    gross: 0,
    deductions: 0,
    net: 0
  });

  assert.match(statement.disclaimer, /manual arithmetic estimate/i);
  assert.match(statement.disclaimer, /no verified.*allowance.*deduction/i);
  assert.match(statement.disclaimer, /not an official salary statement/i);
});
