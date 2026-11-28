import test from 'node:test';
import assert from 'node:assert/strict';
import {
  APPLICABILITY_GUIDANCE,
  getApplicabilityGuidance
} from '../src/lib/applicability-guidance.js';

test('includes the three reviewed DOP employee-applicability instruments', () => {
  assert.deepEqual(
    APPLICABILITY_GUIDANCE.map(({ id }) => id),
    [
      'regularisation-pay-progression-2026',
      'one-time-cadre-induction-2025',
      'eol-increment-clarification-2025'
    ]
  );
  assert.equal(new Set(APPLICABILITY_GUIDANCE.map(({ id }) => id)).size, 3);
});

test('regularisation OM preserves the three covered pathways and all three pay stages', () => {
  const guidance = getApplicabilityGuidance('regularisation-pay-progression-2026');
  assert.equal(guidance?.applicability.length, 3);
  assert.equal(guidance?.stages.length, 3);
  assert.match(guidance?.stages[0] ?? '', /first year/i);
  assert.match(guidance?.stages[1] ?? '', /Level 1, 2 or 3/i);
  assert.match(guidance?.stages[2] ?? '', /99\/GEN\/DOP/);
  assert.match(guidance?.caution ?? '', /must be obtained and reviewed/i);
  assert.match(guidance?.sourceUrl ?? '', /notificationdoc\/2026\.pdf$/);
});

test('one-time cadre induction is not described as a Part A pay-matrix amendment', () => {
  const guidance = getApplicabilityGuidance('one-time-cadre-induction-2025');
  assert.match(guidance?.applicability[0] ?? '', /six years of regular service as on 31 December 2025/i);
  assert.match(guidance?.stages.join(' ') ?? '', /at least one month/i);
  assert.match(guidance?.stages.join(' ') ?? '', /qualifications are not relaxed/i);
  assert.match(guidance?.status ?? '', /not a pay-matrix amendment/i);
});

test('EOL clarification is recorded without enabling automatic increment calculation', () => {
  const guidance = getApplicabilityGuidance('eol-increment-clarification-2025');
  assert.equal(guidance?.sourceDate, '27 October 2025');
  assert.match(guidance?.stages.join(' ') ?? '', /1 January or 1 July/i);
  assert.match(guidance?.caution ?? '', /Do not estimate an increment date/i);
  assert.match(guidance?.sourceUrl ?? '', /circular\/6780\.pdf$/);
});

test('all source notes are official URLs and immutable reference records', () => {
  for (const guidance of APPLICABILITY_GUIDANCE) {
    assert.match(guidance.sourceUrl, /^https:\/\/(dop|www\.dop)\.sikkim\.gov\.in\//);
    assert.equal(Object.isFrozen(guidance), true);
    assert.equal(Object.isFrozen(guidance.applicability), true);
    assert.equal(Object.isFrozen(guidance.stages), true);
    assert.equal(guidance.calculationEnabled, false);
  }
});

test('unknown applicability note IDs return undefined', () => {
  assert.equal(getApplicabilityGuidance('unknown'), undefined);
});
