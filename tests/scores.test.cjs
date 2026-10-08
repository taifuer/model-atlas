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
  assert.equal(scores.entries['gpt-6-1-sol'].arena.model, 'gpt-6.1-sol-max', 'Use the exact newly evaluated configuration');
  assert.equal(scores.entries['claude-sonnet-5-5'].arena.model, 'claude-sonnet-5.5-xhigh');
  assert.equal(scores.entries['gpt-6-sol-luna-chatgpt-october'], undefined, 'Do not transfer September API scores to the ChatGPT October versions');
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
  for (const entry of Object.values(prices.entries)) {
    const reviewed = entry.checkedAt || prices.checkedAt;
    assert.equal(new Date(reviewed + 'T00:00:00Z').toISOString().slice(0, 10), reviewed);
    assert.ok(reviewed <= models.updatedAt, 'A price review cannot postdate the site update');
  }
  assert.equal(context.window.MODEL_ATLAS.updatedAt, models.updatedAt, 'Access metadata must not overwrite the newer site update date');
  const october = 'gpt-6-sol-luna-chatgpt-october';
  assert.equal(context.window.MODEL_ATLAS_SPECS.entries[october], undefined, 'ChatGPT versions must not inherit an API context limit');
  assert.equal(prices.entries[october], undefined, 'ChatGPT access must not inherit API token pricing');
  const preview = models.releases.find(r => r.id === 'mistral-large-4-preview');
  assert.equal(preview.kind, 'preview');
  assert.equal(context.window.MODEL_ATLAS.releases.find(r => r.id === preview.id).openness.status, 'closed', 'Promised future weights are not available weights');
  assert.equal(prices.entries[preview.id].variants[0].promotional, true);
  assert.ok(prices.entries[preview.id].variants[0].tiers.every(tier => !tier.validUntil), 'Do not invent an exact deadline from a two-week promotion');
  assert.equal(context.window.MODEL_ATLAS_SPECS.entries[preview.id].variants[0].parameters, undefined, 'Conflicting official parameter counts remain omitted');
});
