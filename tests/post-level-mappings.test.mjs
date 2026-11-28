import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getPostMapping,
  POST_LEVEL_MAPPINGS,
  POST_MAPPING_GROUPS,
  POST_MAPPING_SOURCE
} from '../src/lib/post-level-mappings.js';

test('transcribes all 24 specified-post entries in Gazette Schedule Part B', () => {
  assert.equal(POST_LEVEL_MAPPINGS.length, 24);
  assert.equal(POST_MAPPING_GROUPS.length, 11);
  assert.equal(
    POST_MAPPING_GROUPS.reduce((total, group) => total + group.posts.length, 0),
    24
  );
  assert.equal(new Set(POST_LEVEL_MAPPINGS.map(({ id }) => id)).size, 24);
});

test('every entry has valid grade-pay, Level and report-paragraph metadata', () => {
  for (const mapping of POST_LEVEL_MAPPINGS) {
    assert.ok(mapping.id.length > 0);
    assert.ok(mapping.department.length > 0);
    assert.ok(mapping.post.length > 0);
    assert.ok(Number.isInteger(mapping.existingGradePay));
    assert.ok(Number.isInteger(mapping.upgradedGradePay));
    assert.ok(Number.isInteger(mapping.revisedLevel));
    assert.match(mapping.reportParagraph, /^5\.\d{2}$/);
  }
});

test('retains distinct service-specific mappings for similar post titles', () => {
  const exciseAsi = getPostMapping('excise-assistant-sub-inspector');
  const policeAsi = getPostMapping('police-assistant-sub-inspector');
  const revenueAsi = getPostMapping('revenue-assistant-sub-inspector');

  assert.deepEqual(
    [exciseAsi?.existingGradePay, exciseAsi?.upgradedGradePay, exciseAsi?.revisedLevel, exciseAsi?.reportParagraph],
    [3000, 3800, 11, '5.33']
  );
  assert.deepEqual(
    [policeAsi?.existingGradePay, policeAsi?.upgradedGradePay, policeAsi?.revisedLevel, policeAsi?.reportParagraph],
    [3400, 3800, 11, '5.78']
  );
  assert.deepEqual(
    [revenueAsi?.existingGradePay, revenueAsi?.upgradedGradePay, revenueAsi?.revisedLevel, revenueAsi?.reportParagraph],
    [2700, 3000, 9, '5.85']
  );
});

test('keeps the source metadata separate from the Part A pay matrix', () => {
  assert.equal(POST_MAPPING_SOURCE.part, 'Schedule Part B');
  assert.equal(POST_MAPPING_SOURCE.printedPage, 15);
  assert.equal(POST_MAPPING_SOURCE.gazette, 'Sikkim Government Gazette Extraordinary No. 333');
  assert.match(POST_MAPPING_SOURCE.url, /^https:\/\//);
});

test('returns undefined for an unknown post mapping', () => {
  assert.equal(getPostMapping('not-a-real-post'), undefined);
});
