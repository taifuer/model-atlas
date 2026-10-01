const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..', 'src');
const context = { window: {} };
for (const name of ['data.js', 'data-scores.js']) vm.runInNewContext(fs.readFileSync(path.join(root, name), 'utf8'), context);
const { MODEL_ATLAS: models, MODEL_ATLAS_SCORES: scores } = context.window;

test('published scores exactly match dated public source snapshots and known releases', () => {
  assert.equal(scores.benchmarks.aa.version, models.companyRanking.version);
  assert.equal(scores.benchmarks.arena.category, 'text-overall');
  assert.equal(scores.benchmarks.arena.adjustments, 'style-control');
  const ids = new Set(models.releases.map(r => r.id));
  for (const key of ['aa', 'arena']) {
    const snapshot = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures', 'scores', scores.checkedAt, `${key}-scores.json`)));
    assert.deepEqual(JSON.parse(JSON.stringify(scores.benchmarks[key])), snapshot.metric);
    for (const row of snapshot.records) {
      const { releaseId, ...record } = row;
      assert.ok(ids.has(releaseId), releaseId);
      assert.deepEqual(JSON.parse(JSON.stringify(scores.entries[releaseId][key])), record);
      assert.ok(record.model && Number.isFinite(record.score));
      assert.equal(new URL(record.source).protocol, 'https:');
      if (key === 'arena') assert.ok(record.confidenceInterval > 0 && record.votes > 0);
    }
    assert.equal(snapshot.records.length, Object.values(scores.entries).filter(e => e[key]).length);
  }
  assert.equal(scores.entries['gemini-4-argon'].arena.preliminary, true);
  assert.equal(scores.entries['gpt-6-1-sol'].arena, undefined, 'An unavailable score must not borrow from GPT-6 Sol');
  assert.equal(scores.entries['qwen-3-8-max-0902'].arena, undefined, 'An undated Max alias must not be assigned to the 0902 snapshot');
  assert.equal(scores.entries['gpt-6-sol-luna'].aa.model, 'GPT-6 Sol (max)', 'A family score identifies its actual evaluated member');
});

test('new releases retain availability and independently dated specifications', () => {
  for (const f of ['data-agents.js','data-access.js','data-specs.js','data-prices.js']) vm.runInNewContext(fs.readFileSync(path.join(root,f),'utf8'),context);
  const gemini = context.window.MODEL_ATLAS.releases.find(r => r.id === 'gemini-4-argon');
  assert.equal(gemini.kind, 'announcement');
  assert.equal(gemini.openness.status, 'closed');
  const prices = context.window.MODEL_ATLAS_PRICES;
  assert.equal(prices.entries['gemini-4-argon'].variants[0].announced, true);
  assert.equal(prices.entries['gpt-6-1-sol'].variants[0].tiers[1].output, 15);
  assert.ok(prices.entries['gpt-6-1-sol'].checkedAt > prices.checkedAt);
  assert.equal(context.window.MODEL_ATLAS.updatedAt, models.updatedAt, 'Access metadata must not overwrite the newer site update date');
});
