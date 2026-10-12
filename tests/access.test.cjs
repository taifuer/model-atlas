const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { create } = require('../src/filters.js');
const context = { window: {} };
for (const file of ['data.js', 'data-agents.js', 'data-access.js']) vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'src', file), 'utf8'), context);
const { MODEL_ATLAS: models, AGENT_ATLAS: agents, ATLAS_ACCESS: access } = context.window;

test('every model and agent has one explicit binary classification and dated evidence', () => {
  for (const [data, metadata] of [[models, access.models], [agents, access.agents]]) {
    assert.deepEqual(Object.keys(metadata).sort(), Array.from(data.releases, release => release.id).sort());
    for (const release of data.releases) {
      assert.ok(['open', 'closed'].includes(release.openness.status), release.id);
      assert.equal(new URL(release.openness.source).protocol, 'https:', release.id);
      assert.ok(release.openness.checkedAt >= access.checkedAt && release.openness.checkedAt <= data.updatedAt);
      if (release.openness.note) assert.ok(release.openness.noteEn, release.id);
      for (const license of release.openness.licenses || []) {
        assert.ok(license.object && license.objectEn && license.name, `${release.id}: license has a scoped bilingual label`);
        assert.equal(new URL(license.source).protocol, 'https:', `${release.id}: license evidence`);
      }
    }
  }
});

test('licenses distinguish weights, components and SDK scope without changing the binary filter', () => {
  const accessFor = id => [...models.releases, ...agents.releases].find(release => release.id === id).openness;
  const chatglm = accessFor('chatglm-6b');
  assert.equal(chatglm.licenses.find(item => item.objectEn === 'Model weights').name, 'ChatGLM-6B Model License');
  assert.equal(chatglm.licenses.find(item => item.objectEn === 'Code').name, 'Apache 2.0');
  assert.match(chatglm.noteEn, /commercial use requires registration/);
  const starcoder = accessFor('starcoder');
  assert.equal(starcoder.licenses.find(item => item.objectEn === 'Model weights').name, 'BigCode OpenRAIL-M v1');
  assert.match(starcoder.licenses.find(item => item.objectEn === 'Training code').name, /MIT.*BSD.*NVIDIA/);
  for (const id of ['gemma-1', 'gemma-2', 'gemma-3']) assert.equal(accessFor(id).licenses[0].name, 'Gemma Terms of Use');
  assert.equal(accessFor('gemma-4').licenses[0].name, 'Apache 2.0', 'The newer license must not overwrite earlier Gemma releases');
  assert.equal(accessFor('stanford-alpaca').licenses[0].objectEn, 'Weight differences');
  assert.match(accessFor('stanford-alpaca').noteEn, /non-commercial/);
  assert.equal(accessFor('zcode-open-source').licenses[0].objectEn, 'Tool code');
  assert.equal(accessFor('claude-agent-sdk').licenses[0].objectEn, 'SDK code');
  assert.match(accessFor('claude-agent-sdk').noteEn, /runtime and model are not made open source/);
  for (const id of ['llama-2', 'gemma-1', 'gemma-2', 'gemma-3', 'gemma-4', 'stanford-alpaca', 'chatglm-6b', 'starcoder', 'zcode-open-source', 'claude-agent-sdk']) assert.equal(accessFor(id).status, 'open', id);
});

test('open and closed filters partition results under combined filters and chart counts', () => {
  for (const data of [models, agents]) {
    const filters = create(data, new Map(data.releases.map(release => [release.id, release.id])));
    for (const query of ['', '?year=2026', '?year=2025&companies=google', '?milestones=1', '?category=coding']) {
      const state = filters.read(query);
      const all = filters.select(state);
      const openState = { ...state, openness: 'open' }, closedState = { ...state, openness: 'closed' };
      const open = filters.select(openState), closed = filters.select(closedState);
      assert.equal(open.length + closed.length, all.length, query);
      assert.equal(new Set([...open, ...closed].map(release => release.id)).size, all.length, query);
      assert.equal(filters.annualCounts(openState).reduce((sum, item) => sum + item.count, 0) + filters.annualCounts(closedState).reduce((sum, item) => sum + item.count, 0), filters.annualCounts(state).reduce((sum, item) => sum + item.count, 0));
    }
    for (const obsolete of ['restricted', 'unknown', 'open-weights']) assert.equal(filters.read(`?openness=${obsolete}`).openness, 'all');
    for (const value of ['open', 'closed']) assert.equal(filters.read('?' + filters.serialize(filters.read(`?openness=${value}`), 'en')).openness, value);
  }
});

test('public base models and later weight releases preserve version scope and event dates', () => {
  const model = id => models.releases.find(release => release.id === id);
  for (const id of ['llama-1', 'grok-1', 'qwen-3-8-flash', 'qwen-3-8-max']) {
    assert.equal(model(id).openness.status, 'open');
    assert.ok(model(id).openness.note && model(id).openness.noteEn);
  }
  assert.equal(model('qwen-3-8-max-0902').openness.status, 'closed');
  assert.equal(model('grok-1').date, '2023-11-03');
  assert.equal(agents.releases.find(release => release.id === 'agent-skills').openness.status, 'open');
  const jules = agents.releases.find(release => release.id === 'jules');
  assert.equal(jules.name, 'Jules');
  assert.equal(jules.en.name, 'Jules');
  assert.equal(jules.kind, 'preview');
  assert.match(jules.dateNote, /公测/);
});
