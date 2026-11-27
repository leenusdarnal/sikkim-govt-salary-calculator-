import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateSalary } from '../src/lib/salary-calculation.js';

test('calculates gross and net amounts from user-entered values', () => {
  assert.deepEqual(
    calculateSalary({ basicPay: 56000, allowances: 12000, deductions: 8500 }),
    { basicPay: 56000, allowances: 12000, gross: 68000, deductions: 8500, net: 59500 }
  );
});

test('does not allow deductions to exceed gross pay', () => {
  assert.deepEqual(
    calculateSalary({ basicPay: 1000, allowances: 500, deductions: 5000 }),
    { basicPay: 1000, allowances: 500, gross: 1500, deductions: 1500, net: 0 }
  );
});

test('normalizes negative and non-finite inputs to zero', () => {
  assert.deepEqual(
    calculateSalary({ basicPay: -500, allowances: Number.NaN, deductions: Number.POSITIVE_INFINITY }),
    { basicPay: 0, allowances: 0, gross: 0, deductions: 0, net: 0 }
  );
});

test('defaults omitted inputs to zero', () => {
  assert.deepEqual(
    calculateSalary(),
    { basicPay: 0, allowances: 0, gross: 0, deductions: 0, net: 0 }
  );
});
