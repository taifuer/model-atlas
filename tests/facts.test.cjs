const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const facts = require('../src/facts.js');
const context = { window: {} };
for (const name of ['data.js', 'data-specs.js', 'data-prices.js', 'data-scores.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'src', name), 'utf8'), context);
}
const { MODEL_ATLAS: models, MODEL_ATLAS_SPECS: specs, MODEL_ATLAS_PRICES: prices, MODEL_ATLAS_SCORES: scores } = context.window;

test('single-model chips identify a family member or later API snapshot explicitly', () => {
  for (const [id, expected] of [
    ['gpt-5-6', 'gpt-5.6-sol'], ['gpt-4o', 'gpt-4o-2024-08-06'],
    ['gpt-4-turbo', 'gpt-4-turbo-2024-04-09'], ['gpt-4', 'gpt-4-0613'],
    ['o1', 'o1-2024-12-17'], ['gpt-5-1', 'gpt-5.1-2025-11-13'],
  ]) {
    assert.equal(facts.scopeLabel(specs.entries[id]), expected, id);
    assert.equal(facts.scopeLabel(prices.entries[id]), expected, id);
  }
  assert.equal(facts.scopeLabel(specs.entries['phi-3']), 'Phi-3-mini-128k-instruct');
  assert.equal(facts.scopeLabel(specs.entries['qwen-3']), 'Qwen3-235B-A22B');
  assert.equal(facts.scopeLabel(specs.entries['gemini-4-argon']), 'Gemini 4 Argon (high)');
  assert.equal(facts.scopeLabel(specs.entries['claude-opus-5-5']), '');
});

test('family context, chosen price and evaluated member retain independent scopes', () => {
  const spec = specs.entries['gpt-6-sol-luna'];
  const price = prices.entries['gpt-6-sol-luna'];
  assert.equal(facts.scopeLabel(spec, spec.variants, 'zh'), '各型号');
  assert.equal(facts.scopeLabel(spec, spec.variants, 'en'), 'Variants');
  assert.equal(facts.scopeLabel(price, [price.variants[0]]), 'gpt-6-luna');
  assert.equal(facts.scoreLabel(scores.entries['gpt-6-sol-luna'].aa, scores.cardScopes['gpt-6-sol-luna']), 'GPT-6 Sol (max)');
  assert.equal(facts.scopeLabel(specs.entries['mimo-v2-6']), 'MiMo-V2.6-Pro-RL');
  assert.equal(facts.scopeLabel(prices.entries['glm-4-5']), 'GLM-4.5');
  assert.equal(facts.scopeLabel(undefined), '');
  assert.equal(facts.scoreLabel(undefined), '');
});

test('promotions remain visible without a fixed expiry and preserve context-tier qualifications', () => {
  const entry = prices.entries['gpt-5-6'];
  assert.ok(entry.variants[0].promotional);
  assert.ok(entry.variants[0].tiers.every(tier => !tier.validUntil), 'No invented expiry');
  assert.equal(facts.pricingQualifier(entry, 'zh'), '优惠 · 起');
  assert.equal(facts.pricingQualifier(entry, 'en'), 'Promo · from');
  assert.equal(facts.pricingQualifier(prices.entries['gemini-3-8-flash'], 'en'), 'Promo');
  assert.equal(facts.pricingQualifier(prices.entries['gpt-4-5'], 'en'), 'Archived');
  assert.equal(facts.pricingQualifier(prices.entries['gemini-4-argon'], 'en'), 'Announced · from');
  assert.equal(facts.pricingQualifier(prices.entries['gpt-6-sol-luna'], 'en'), 'from');
  assert.equal(facts.pricingQualifier({ variants: [{ tiers: [{ validUntil: '2027-01-01' }] }] }), '', 'An expiry alone does not establish a discount');
});

test('scope and promotion metadata is valid and separate from dated benchmark measurements', () => {
  const ids = new Set(models.releases.map(release => release.id));
  for (const dataset of [specs, prices]) for (const [id, entry] of Object.entries(dataset.entries)) {
    if (entry.cardScope) assert.ok(['variant', 'snapshot', 'configuration'].includes(entry.cardScope), id);
    for (const variant of entry.variants) if (variant.promotional !== undefined) {
      assert.equal(typeof variant.promotional, 'boolean');
      assert.ok(variant.note && variant.noteEn && variant.sources.length, id);
    }
  }
  for (const [id, scope] of Object.entries(scores.cardScopes)) {
    assert.ok(ids.has(id) && scores.entries[id], id);
    assert.ok(['variant', 'snapshot', 'configuration'].includes(scope), id);
  }
});
