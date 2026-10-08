const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = { window: {}, URLSearchParams };
for (const name of ['data.js', 'data-en.js', 'data-model-types.js', 'data-hardware.js', 'data-technology.js', 'filters.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'src', name), 'utf8'), context);
}
const { MODEL_ATLAS: models, MODEL_ATLAS_TYPES: types, HARDWARE_ATLAS: hardware, TECHNOLOGY_ATLAS: technology, ATLAS_FILTERS } = context.window;

test('new timelines have ordered, source-linked, bilingual entries with explicit date precision', () => {
  for (const data of [hardware, technology]) {
    const ids = new Set();
    const companies = new Set(data.companies.map(c => c.id));
    let previous = '';
    for (const entry of data.releases) {
      assert.ok(!ids.has(entry.id), entry.id); ids.add(entry.id);
      assert.match(entry.date, /^\d{4}(?:-(?:0[1-9]|1[0-2])(?:-\d{2})?)?$/);
      if (entry.date.length === 10) assert.equal(new Date(entry.date).toISOString().slice(0, 10), entry.date);
      else assert.ok(entry.dateNote && entry.en.dateNote, entry.id);
      assert.ok(entry.date >= previous && entry.date <= data.asOf, entry.id); previous = entry.date;
      assert.ok(companies.has(entry.company), entry.id);
      assert.ok(data.categories[entry.category] && data.categoriesEn[entry.category], entry.id);
      assert.ok(data.kinds[entry.kind] && data.kindsEn[entry.kind], entry.id);
      assert.ok(entry.summary && entry.details && entry.en.summary && entry.en.details, entry.id);
      assert.doesNotMatch(entry.en.summary + entry.en.details + (entry.en.dateNote || ''), /[\u3400-\u9fff]/, entry.id);
      assert.ok(entry.sources.length, entry.id);
      for (const source of entry.sources) assert.equal(new URL(source.url).protocol, 'https:');
    }
    for (const category of Object.keys(data.categories)) assert.ok(data.releases.some(r => r.category === category));
    assert.equal(data.accessFilter, false);
  }
  assert.ok(hardware.releases.length >= 30);
  assert.ok(technology.releases.length >= 40);
});

test('Transformer shares its canonical event and monthly counts respect date precision', () => {
  const original = models.releases.find(r => r.id === 'transformer');
  const linked = technology.releases.find(r => r.id === 'transformer');
  assert.equal(linked.date, original.date);
  assert.equal(linked.sources, original.sources);
  assert.equal(linked.summary, original.summary);
  assert.equal(original.category, 'text');
  assert.equal(linked.category, 'methods');
  const filters = ATLAS_FILTERS.create(technology, new Map(technology.releases.map(r => [r.id, r.name.toLowerCase()])));
  const state = filters.read('?year=2012');
  assert.equal(filters.select(state).length, 1);
  assert.equal(filters.annualCounts(state).find(y => y.year === '2012').count, 1);
  assert.equal(filters.monthlyCounts(state).find(m => m.month === '12').count, 1);
  assert.ok(filters.years.includes('2008'), 'The data layer retains zero years; the UI can omit them without changing counts');
  const dated = filters.read('?year=2017');
  assert.equal(filters.select(dated).length, filters.monthlyCounts(dated).reduce((sum, m) => sum + m.count, 0));
  const fixture = { ...technology, releases: [
    { ...original, id: 'year', date: '2012' },
    { ...original, id: 'month', date: '2012-12' },
    { ...original, id: 'day', date: '2012-12-04' },
  ] };
  const precision = ATLAS_FILTERS.create(fixture, new Map());
  const all = precision.read('?year=2012');
  assert.equal(precision.annualCounts(all).find(y => y.year === '2012').count, 3);
  assert.equal(precision.monthlyCounts(all).reduce((sum, m) => sum + m.count, 0), 2, 'Only dates with a confirmed month enter monthly counts');
  assert.equal(filters.read('?openness=open').openness, 'all', 'Hardware and research do not inherit model access classification');
});

test('hardware specifications retain board, memory, and announcement scope', () => {
  for (const r of hardware.releases.filter(r => r.hardware)) {
    assert.ok(r.hardware.variant && r.hardware.sources.length && r.hardware.note && r.hardware.noteEn, r.id);
    for (const f of r.hardware.facts) assert.ok(f.label && f.labelEn && f.value, r.id);
  }
  const json = id => JSON.stringify(hardware.releases.find(r => r.id === id));
  assert.match(json('tesla-k80'), /12 GB/);
  assert.match(json('nvidia-a100'), /40 GB/);
  assert.doesNotMatch(JSON.stringify(hardware.releases.find(r => r.id === 'nvidia-a100').hardware), /80 GB/);
  assert.match(json('aws-trainium2'), /GiB/);
  assert.match(json('cerebras-wse3'), /SRAM/);
  assert.match(json('apple-m3-ultra'), /统一内存/);
  assert.equal(hardware.releases.find(r => r.id === 'nvidia-h100').kind, 'announcement');
});

test('model input types cover every release and preserve meaningful historical distinctions', () => {
  assert.equal(Object.keys(types.entries).length, models.releases.length);
  for (const release of models.releases) {
    const type = types.entries[release.id];
    assert.ok(['text', 'multimodal'].includes(release.category), release.id);
    assert.ok(type.sources.length, release.id);
    for (const url of type.sources) assert.equal(new URL(url).protocol, 'https:');
    if (type.note) assert.ok(type.noteEn, release.id);
  }
  for (const id of ['gpt-1','chatgpt','phi-3','qwen-2','qwen-2-5','qwen-3-7-max','gpt-5-3-codex-spark','glm-5-3']) assert.equal(types.entries[id].category, 'text', id);
  for (const id of ['gpt-4','llama-3-2','gemma-3','qwen-3-8-max','glm-5-3-flash','kimi-k2-7-code']) assert.equal(types.entries[id].category, 'multimodal', id);
  assert.match(types.entries['qwen-3-7-max'].note, /6 月 8 日/);
  const filters = ATLAS_FILTERS.create(models, new Map(models.releases.map(r => [r.id, r.name.toLowerCase()])));
  const state = filters.read('?category=multimodal&companies=openai&year=2023');
  assert.ok(filters.select(state).length);
  assert.ok(filters.select(state).every(r => r.category === 'multimodal'));
  assert.equal(filters.read(filters.serialize(state, 'en')).category, 'multimodal');
});

test('hardware events do not turn roadmap targets or report publication dates into launches', () => {
  const get = id => hardware.releases.find(r => r.id === id);
  assert.equal(get('ascend-950pr').date, '2026-03-20');
  assert.equal(get('ascend-950pr').kind, 'availability');
  assert.match(JSON.stringify(get('ascend-950pr').hardware), /112 GB/);
  assert.doesNotMatch(JSON.stringify(get('ascend-950pr').hardware), /128 GB|144 GB/);
  assert.ok(get('ascend-950pr').sources.some(s => s.type === 'reporting' && s.titleEn));
  assert.equal(get('atlas-950-superpod').kind, 'showcase');
  assert.match(JSON.stringify(get('atlas-950-superpod').hardware), /1024/);
  assert.doesNotMatch(JSON.stringify(get('atlas-950-superpod').hardware), /8192/);
  assert.equal(get('atlas-960e-superpod'), undefined, 'A system still in testing remains a candidate');
  assert.equal(get('ascend-910c-cloudmatrix384').date, '2025-04-10');
  assert.equal(get('ascend-910b').date, '2023-08-15');
  assert.equal(get('ascend-910b').kind, 'deployment');
  assert.match(get('ascend-910b').dateNote, /星火一体机公开发布/);
  assert.match(get('ascend-910b').en.dateNote, /customer product event/);
  assert.ok(get('ascend-910b').sources.some(source => source.url === 'https://www.nbd.com.cn/articles/2023-08-15/2961074.html'));
  assert.equal(get('hygon-deepcompute3'), undefined, 'Deferred until product-level evidence supports inclusion');
});

test('compute facts retain precision, sparsity, scale, and preliminary status', () => {
  const compute = id => hardware.releases.find(r => r.id === id).hardware.facts.find(f => f.metric === 'compute');
  const records = hardware.releases.flatMap(r => (r.hardware?.facts || []).filter(f => f.metric === 'compute'));
  assert.ok(records.length >= 10);
  for (const fact of records) {
    assert.ok(['BF16', 'FP16', 'FP16.16', 'FP32', 'FP8', 'FP4', 'INT8'].includes(fact.precision));
    assert.ok(['dense', 'sparse', 'not-stated'].includes(fact.sparsity));
    assert.ok(['chip', 'accelerator', 'system'].includes(fact.scope));
    assert.equal(fact.chip, true);
  }
  assert.equal(compute('nvidia-a100').value, '312 TFLOPS');
  assert.equal(compute('nvidia-h100').estimate, true);
  assert.equal(compute('nvidia-h200').sparsity, 'sparse');
  assert.equal(compute('nvidia-h200').estimate, true);
  assert.match(compute('nvidia-h200').valueEn, /preliminary/);
  assert.equal(compute('graphcore-bow').precision, 'FP16.16');
  assert.equal(compute('graphcore-bow').scope, 'chip');
  assert.equal(compute('graphcore-bow').value, '350 TFLOPS');
  assert.equal(compute('aws-trainium2').scope, 'chip');
  assert.equal(compute('aws-trainium2').value, '667 TFLOPS');
  assert.match(hardware.releases.find(r => r.id === 'instinct-mi350').hardware.variant, /MI355X/);
  assert.match(hardware.releases.find(r => r.id === 'tpu-v5p').hardware.facts.find(f => f.label === '显存').value, /GiB/);
});
