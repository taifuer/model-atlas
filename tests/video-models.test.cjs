const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { create } = require('../src/filters.js');
const context = { window: {}, URL, URLSearchParams };
for (const file of ['data.js', 'data-en.js', 'data-agents.js', 'data-access.js', 'data-model-types.js', 'data-specs.js', 'data-prices.js', 'data-scores.js', 'filters.js', 'catalog.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'src', file), 'utf8'), context);
}
const { MODEL_ATLAS: data, MODEL_ATLAS_SPECS: specs, ATLAS_CATALOG: catalog } = context.window;
const filters = create(data, catalog.searchIndex('models'));
const get = id => data.releases.find(entry => entry.id === id);

test('video generation is separate from multimodal understanding and text input', () => {
  const state = filters.read('?task=video-generation');
  const videos = filters.select(state);
  assert.ok(videos.length > 0);
  assert.ok(videos.includes(get('seedance-2-5')));
  assert.ok(videos.includes(get('hunyuan-video')));
  assert.ok(!videos.includes(get('gpt-4o')));
  assert.equal(get('hunyuan-video').category, 'text', 'Text-to-video does not itself imply multimodal input');
  assert.equal(get('seedance-2-5').category, 'multimodal');
  const language = filters.select(filters.read('?task=language'));
  assert.equal(videos.length + language.length, data.releases.length);
  assert.equal(new Set([...videos, ...language].map(entry => entry.id)).size, data.releases.length);
  for (const entry of videos) {
    assert.ok(entry.tags.includes('视频生成'), entry.id);
    assert.ok(specs.entries[entry.id].variants.every(variant => variant.output.includes('video')), entry.id);
    assert.equal(context.window.MODEL_ATLAS_PRICES.entries[entry.id], undefined, 'Video must not inherit token prices');
    assert.equal(context.window.MODEL_ATLAS_SCORES.entries[entry.id], undefined, 'Language scores do not measure video quality');
  }
});

test('task filters round-trip, combine with access and input, and keep chart counts consistent', () => {
  for (const query of ['?task=video-generation', '?task=video-generation&openness=open', '?task=video-generation&category=text', '?task=video-generation&companies=bytedance&year=2026&month=07', '?task=language&category=multimodal']) {
    const state = filters.read(query);
    assert.deepEqual(filters.read(filters.serialize(state, 'en')), state);
    assert.ok(filters.hasFilters(state));
    assert.equal(filters.annualCounts(state).reduce((sum, item) => sum + item.count, 0), filters.select(state, ['year', 'month']).length);
    assert.equal(Object.values(filters.companyCounts(state)).reduce((sum, count) => sum + count, 0), filters.select(state, ['companies']).length);
    if (state.year !== 'all') assert.equal(filters.monthlyCounts(state).reduce((sum, item) => sum + item.count, 0), filters.select(state, ['month']).length);
  }
  assert.equal(filters.read('?task=unknown').task, 'all');
  assert.equal(create(context.window.AGENT_ATLAS, new Map()).read('?task=video-generation').task, 'all');
  assert.ok(filters.select(filters.read('?q=视频生成')).includes(get('seedance-2-5')));
  assert.ok(filters.select(filters.read('?q=video%20generation')).includes(get('seedance-2-5')));
  assert.ok(filters.select(filters.read('?q=万相')).includes(get('wan-2-1')));
  assert.ok(filters.select(filters.read('?q=混元视频')).includes(get('hunyuan-video')));
});

test('release history retains video version boundaries and scoped limits', () => {
  assert.equal(get('seedance-2-5').date, '2026-07-31');
  assert.equal(specs.entries['seedance-2-5'].variants[0].video.maxDurationSeconds, 30, 'Extension totals are not single-pass limits');
  assert.equal(specs.entries['seedance-1-0'].variants[0].video.maxDurationSeconds, undefined, 'An example clip does not establish a hard limit');
  assert.equal(get('wan-2-1').openness.status, 'open');
  assert.equal(get('wan-3-0-video').openness.status, 'closed');
  assert.equal(get('wan-3-0-video').date, '2026-08-06');
  assert.equal(get('sora').date, '2024-02-15');
  assert.equal(get('sora-turbo').date, '2024-12-09');
  assert.match(get('sora-2').details, /9 月 24 日/);
  assert.match(context.window.MODEL_ATLAS_EN['sora-2'].details, /September 24/);
  const omni = specs.entries['gemini-omni-1-1-flash'].variants[0];
  assert.ok(!omni.video.resolutions.includes('4K') && omni.video.upscaledResolutions.includes('4K'));
  assert.ok(!omni.input.includes('audio'), 'Model-level audio references are not supported by this API');
  assert.equal(specs.entries['runway-gen-4-5'].variants[0].basis, 'service', 'Current service help is not a launch specification');
});
