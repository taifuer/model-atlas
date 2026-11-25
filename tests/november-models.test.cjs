const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const context = { window: {} };
for (const file of ['data.js', 'data-en.js', 'data-agents.js', 'data-access.js', 'data-model-types.js', 'data-specs.js', 'data-prices.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'src', file), 'utf8'), context);
}
const { MODEL_ATLAS: models, MODEL_ATLAS_EN: english, MODEL_ATLAS_SPECS: specs, MODEL_ATLAS_PRICES: prices } = context.window;
const release = id => models.releases.find(entry => entry.id === id);

test('Neon has a shared context window and Aion has a separate on-device text model', () => {
  const neon = release('gemini-4-neon');
  assert.equal(neon.date, '2026-11-18');
  assert.equal(neon.openness.status, 'closed');
  assert.equal(neon.category, 'multimodal');
  const api = specs.entries[neon.id].variants[0];
  assert.equal(api.contextTokens, 1048576);
  assert.equal(api.outputTokens, 65536);
  assert.deepEqual(Array.from(api.output), ['text']);
  const rate = prices.entries[neon.id].variants[0].tiers[0];
  assert.equal(rate.input, 3);
  assert.equal(rate.output, 15);

  const aion = release('aion-instruct');
  assert.equal(aion.date, '2026-11-19');
  assert.equal(aion.category, 'text');
  assert.equal(aion.openness.licenses[0].name, 'MIT');
  assert.equal(specs.entries[aion.id].variants[0].contextTokens, 32768);
  assert.equal(prices.entries[aion.id], undefined);
});

test('SeedRealtime retains the Doubao launch date and distinguishes call minutes from token billing', () => {
  const seed = release('seedrealtime');
  assert.equal(seed.date, '2026-08-05');
  assert.equal(models.releases.filter(entry => /Seed.?Realtime/i.test(entry.name)).length, 1);
  assert.match(english[seed.id].dateNote, /November 19/);
  assert.equal(seed.openness.status, 'closed');
  assert.deepEqual(Array.from(seed.tasks), ['language']);
  const api = specs.entries[seed.id].variants[0];
  assert.ok(api.input.includes('video'));
  assert.deepEqual(Array.from(api.output), ['text', 'audio']);
  assert.match(english[seed.id].details, /0\.20 per audio minute.*0\.40 per video minute/);
  assert.equal(prices.entries[seed.id], undefined);
});

test('Hy4 retains its original launch and separates checkpoint capabilities from TokenHub', () => {
  const hy4 = release('hunyuan-hy4');
  assert.equal(hy4.date, '2026-11-04');
  assert.equal(hy4.openness.status, 'open');
  assert.equal(hy4.openness.licenses[0].name, 'Tencent Hy License 1.0');
  assert.match(english[hy4.id].dateNote, /November 20/);
  const variants = specs.entries[hy4.id].variants;
  const api = variants.find(variant => variant.basis === 'api');
  const weights = variants.find(variant => variant.basis === 'weights');
  assert.deepEqual(Array.from(api.input), ['text', 'image']);
  assert.ok(weights.input.includes('video'));
  assert.equal(weights.contextTokens, 1048576);
  assert.equal(weights.parameters, '770B');
  assert.equal(weights.activeParameters, '49B');
  assert.equal(release('hunyuan-hy4-preview').date, '2026-08-28');
  assert.equal(release('hunyuan-hy4-flash').date, '2026-11-16');
});

test('MAGI-2 keeps its video tariff separate from text API token prices', () => {
  const model = release('magi-2');
  assert.equal(model.openness.status, 'closed', 'Preview weights belong to a different checkpoint');
  assert.deepEqual(Array.from(model.tasks), ['video-generation']);
  assert.equal(prices.entries[model.id], undefined);
  assert.match(english[model.id].details, /0\.08/);
  assert.match(english[model.id].details, /1080p/);
});

test('Inkling 2 keeps paid sampling windows distinct from fine-tuning limits', () => {
  const small = specs.entries['inkling-2-small'].variants.filter(variant => variant.basis === 'api');
  assert.deepEqual(Array.from(small, variant => [variant.contextTokens, variant.trainingTokens]), [
    ['1M', '64K'],
    ['1M', '256K'],
  ]);
  const mini = specs.entries['inkling-2-mini'].variants[0];
  assert.equal(mini.contextTokens, 1048576);
  assert.equal(mini.activeParameters, '3.4B');
  const paid = prices.entries['inkling-2-mini'].variants[0];
  assert.equal(paid.tiers[0].input, 0.15);
  assert.equal(paid.tiers[0].output, 0.5);
  assert.match(paid.noteEn, /free tier has a 64K window/);
});
