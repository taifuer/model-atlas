const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const sourceRoot = path.join(__dirname, '..', 'src');
const scripts = [
  'data.js', 'data-en.js', 'data-agents.js', 'data-hardware.js', 'data-technology.js',
  'data-access.js', 'data-specs.js', 'data-prices.js', 'data-scores.js', 'data-model-types.js',
  'filters.js', 'catalog.js', 'details.js',
];
const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const definitions = {
  models: ['MODEL_ATLAS', 'index.html', ['大模型发布时间线', 'Language model timeline']],
  agents: ['AGENT_ATLAS', 'agents.html', ['智能体工具时间线', 'Agent tool timeline']],
  hardware: ['HARDWARE_ATLAS', 'hardware.html', ['算力硬件时间线', 'AI hardware timeline']],
  technology: ['TECHNOLOGY_ATLAS', 'technology.html', ['AI 技术演进', 'AI technology timeline']],
};

function loadAtlas(language = 'zh') {
  const context = { window: {}, URL };
  for (const file of scripts) vm.runInNewContext(fs.readFileSync(path.join(sourceRoot, file), 'utf8'), context, { filename: file });
  const globals = context.window;
  const english = language === 'en';
  const names = { qwen: 'Alibaba', moonshot: 'Moonshot AI', zhipu: 'Z.ai', xiaomi: 'Xiaomi', stepfun: 'StepFun', tencent: 'Tencent', bytedance: 'ByteDance' };
  globals.ATLAS_UI = {
    language, english,
    L: (zh, en) => english ? en : zh,
    escape,
    formattedDate: date => date.replaceAll('-', '.'),
    companyName: company => english ? company.nameEn || names[company.id] || company.name : company.name,
    releaseText: release => english ? { ...release, ...(release.en || globals.MODEL_ATLAS_EN?.[release.id]) } : release,
    pages: Object.fromEntries(Object.entries(definitions).map(([section, [, file, title]]) => [section, { file, title }])),
  };
  globals.ATLAS_ICONS = { release: () => '' };
  return globals;
}

const localized = { zh: loadAtlas('zh'), en: loadAtlas('en') };
const globals = localized.zh;
const catalog = globals.ATLAS_CATALOG;
const datasets = Object.fromEntries(Object.entries(definitions).map(([section, [global]]) => [section, globals[global]]));

test('cross-timeline search shares punctuation rules and both language titles', () => {
  const keys = (query, language) => Array.from(catalog.search(query, language), entry => entry.key);
  for (const language of ['zh', 'en']) {
    assert.deepEqual(keys('FlashAttention‑4', language), ['technology:flashattention-4']);
    assert.deepEqual(keys('FlashAttention—4', language), keys('FlashAttention-4', language));
    assert.deepEqual(keys('Qwen3.8 open-weight family', language), ['models:qwen-3-8']);
    assert.deepEqual(keys('DeepSeek-V4-Pro (GA)', language), ['models:deepseek-v4-pro-0813']);
    assert.deepEqual(keys('---', language), []);
    assert.deepEqual(keys('no-such-model-atlas-record', language), []);
    const matches = catalog.search('Transformer', language);
    assert.equal(matches.filter(entry => entry.release.id === 'transformer').length, 1);
    assert.ok(matches.every((entry, index) => !index || matches[index - 1].release.date >= entry.release.date));
  }
});

function detail(globals, record, language) {
  return globals.ATLAS_DETAILS.render(record.section, record.raw, record.release.id, language);
}

function section(html, className) {
  return new RegExp(`<section class="${className}"[^>]*>[\\s\\S]*?<\\/section>`).exec(html)?.[0] || '';
}

test('the catalog preserves every source entry and its section-qualified identity', () => {
  const expectedCount = Object.values(datasets).reduce((total, dataset) => total + dataset.releases.length, 0);
  assert.equal(catalog.entries.length, expectedCount);
  assert.equal(new Set(catalog.entries.map(record => record.key)).size, expectedCount);
  for (const [section, raw] of Object.entries(datasets)) {
    for (const release of raw.releases) {
      const key = `${section}:${release.id}`;
      const record = catalog.get(key);
      assert.ok(record, key);
      assert.equal(record.key, key);
      assert.equal(record.section, section);
      assert.equal(record.raw, raw, key);
      assert.equal(record.release, release, key);
      assert.equal(record.company, raw.companies.find(company => company.id === release.company), key);
      assert.ok(record.company, `${key}: organization is available to search and details`);
      assert.ok(catalog.entries.includes(record), key);
    }
  }
  assert.equal(catalog.get('models:not-a-release'), undefined);
  assert.equal(catalog.get('transformer'), undefined, 'Bare IDs must not silently choose a timeline');
});

test('Explore deduplicates the shared Transformer event without losing either timeline record', () => {
  const model = catalog.get('models:transformer');
  const technology = catalog.get('technology:transformer');
  assert.ok(model && technology);
  assert.notEqual(model, technology);
  assert.equal(model.release.date, technology.release.date);
  assert.equal(model.release.sources, technology.release.sources);
  assert.equal(model.release.category, 'text');
  assert.equal(technology.release.category, 'methods');
  const shared = catalog.events.filter(record => record.release.id === 'transformer');
  assert.equal(shared.length, 1);
  assert.equal(shared[0].key, 'technology:transformer');
  assert.deepEqual(Array.from(shared[0].sections).sort(), ['models', 'technology']);
  assert.equal(catalog.events.length, catalog.entries.length - 1);
  assert.deepEqual(
    new Set(catalog.events.map(record => record.key)),
    new Set(catalog.entries.filter(record => record.key !== model.key).map(record => record.key)),
    'No independent release may disappear during deduplication',
  );
});

test('catalog text translates descriptive fields without changing dates, identities or source data', () => {
  for (const record of catalog.entries) {
    const original = record.release;
    const snapshot = JSON.stringify(original);
    const en = original.en || globals.MODEL_ATLAS_EN?.[original.id];
    assert.ok(en, `${record.key}: an English translation exists`);
    assert.equal(catalog.text(record, 'zh'), original);
    const translated = catalog.text(record, 'en');
    for (const field of ['name', 'summary', 'details', 'dateNote']) {
      assert.equal(translated[field], en[field] ?? original[field], `${record.key}: ${field}`);
    }
    for (const field of ['id', 'date', 'company', 'kind', 'category', 'sources']) {
      assert.equal(translated[field], original[field], `${record.key}: keep ${field}`);
    }
    assert.equal(JSON.stringify(original), snapshot, `${record.key}: translation must not mutate the source`);
  }
});

test('timeline links target the original page and release, retaining the requested language', () => {
  for (const record of catalog.entries) {
    for (const [requested, expected] of [['zh', 'zh'], ['en', 'en'], [undefined, 'zh'], ['invalid', 'zh']]) {
      const link = new URL(catalog.timelineUrl(record, requested), 'https://atlas.example/');
      assert.equal(link.pathname, `/${expected === 'en' ? 'en/' : ''}${definitions[record.section][1]}`, record.key);
      assert.equal(link.searchParams.get('lang'), expected, record.key);
      assert.equal(link.hash, `#release-${record.release.id}`, record.key);
    }
  }
  assert.notEqual(catalog.timelineUrl(catalog.get('models:transformer'), 'en'), catalog.timelineUrl(catalog.get('technology:transformer'), 'en'));
});

for (const language of ['zh', 'en']) {
  test(`shared details render every ${language} entry with its title, date, description and original sources`, () => {
    const current = localized[language];
    for (const record of current.ATLAS_CATALOG.entries) {
      const expected = language === 'en' ? { ...record.release, ...(record.release.en || current.MODEL_ATLAS_EN?.[record.release.id]) } : record.release;
      const html = detail(current, record, language);
      assert.doesNotMatch(html, /\bundefined\b|\bNaN\b|\[object Object\]/, record.key);
      assert.ok(html.includes(`<h2 id="dialog-title">${escape(expected.name)}</h2>`), `${record.key}: title`);
      assert.ok(html.includes(`<p class="dialog-summary">${escape(expected.summary)}</p>`), `${record.key}: summary`);
      if (expected.details) assert.ok(html.includes(escape(expected.details)), `${record.key}: details`);
      if (expected.dateNote) assert.ok(html.includes(escape(expected.dateNote)), `${record.key}: date scope`);
      if (expected.date.length === 4) {
        assert.ok(html.includes(`<span>${expected.date}</span>`), `${record.key}: year-only date`);
        assert.ok(!html.includes(`datetime="${expected.date}-01-01"`), `${record.key}: no fabricated day`);
      } else assert.ok(html.includes(`<time datetime="${expected.date}">${expected.date.replaceAll('-', '.')}</time>`), `${record.key}: date`);
      const references = section(html, 'detail-references');
      assert.ok(references, `${record.key}: source section`);
      assert.doesNotMatch(references, /<a\b[^>]*>\s*<\/a>/, `${record.key}: sources have readable labels`);
      assert.equal((references.match(/<li>/g) || []).length, record.release.sources.length, record.key);
      for (const source of record.release.sources) {
        assert.ok(references.includes(`href="${escape(source.url)}"`), `${record.key}: ${source.url}`);
        if (language === 'zh' || source.titleEn) assert.ok(references.includes(escape(language === 'zh' ? source.title : source.titleEn)), `${record.key}: source label`);
      }
      assert.ok(html.includes(`href="${escape(record.release.sources[0].url)}"`), `${record.key}: primary source action`);
    }
    assert.equal(current.ATLAS_DETAILS.render('models', current.MODEL_ATLAS, 'not-a-release', language), '');
  });

  test(`model details retain documented specifications, price tiers and benchmark configurations in ${language}`, () => {
    const current = localized[language];
    for (const record of current.ATLAS_CATALOG.entries.filter(record => record.section === 'models')) {
      const html = detail(current, record, language);
      const id = record.release.id;
      const specs = current.MODEL_ATLAS_SPECS.entries[id];
      const prices = current.MODEL_ATLAS_PRICES.entries[id];
      const scores = current.MODEL_ATLAS_SCORES.entries[id];
      const specHtml = section(html, 'detail-specs');
      const priceHtml = section(html, 'detail-pricing');
      const scoreHtml = section(html, 'detail-scores');
      assert.equal(Boolean(specHtml), Boolean(specs), `${id}: specifications presence`);
      assert.equal(Boolean(priceHtml), Boolean(prices), `${id}: pricing presence`);
      assert.equal(Boolean(scoreHtml), Boolean(scores), `${id}: scores presence`);
      for (const variant of specs?.variants || []) {
        assert.ok(specHtml.includes(`<h4>${escape(variant.name)}</h4>`), `${id}: specification variant`);
        for (const field of ['contextTokens', 'extendedContextTokens', 'inputTokens', 'outputTokens', 'trainingTokens']) {
          if (variant[field]) assert.ok(specHtml.includes(escape(typeof variant[field] === 'number' ? variant[field].toLocaleString('en-US') : variant[field])), `${id}: ${field}`);
        }
        for (const field of ['parameters', 'activeParameters']) if (variant[field]) assert.ok(specHtml.includes(escape(variant[field])), `${id}: ${field}`);
        for (const source of variant.sources) assert.ok(specHtml.includes(`href="${escape(source)}"`), `${id}: specification evidence`);
      }
      for (const variant of prices?.variants || []) {
        assert.ok(priceHtml.includes(`<h4>${escape(variant.name)}</h4>`), `${id}: priced variant`);
        assert.ok(priceHtml.includes(`${variant.currency} / `), `${id}: pricing currency`);
        for (const tier of variant.tiers) {
          assert.ok(priceHtml.includes(escape(language === 'en' ? tier.labelEn : tier.label)), `${id}: pricing tier`);
          for (const field of ['input', 'output']) {
            const symbol = variant.currency === 'USD' ? '$' : '¥';
            assert.ok(priceHtml.includes(`<dd>${symbol}${tier[field].toLocaleString('en-US', { maximumFractionDigits: 6 })}</dd>`), `${id}: ${field} rate`);
          }
        }
        for (const source of variant.sources) assert.ok(priceHtml.includes(`href="${escape(source)}"`), `${id}: pricing evidence`);
      }
      for (const [benchmark, score] of Object.entries(scores || {})) {
        assert.ok(scoreHtml.includes(escape(current.MODEL_ATLAS_SCORES.benchmarks[benchmark].name)), `${id}: metric name`);
        assert.ok(scoreHtml.includes(escape(score.model)), `${id}: evaluated configuration`);
        assert.ok(scoreHtml.includes(`<strong>${score.score}`), `${id}: benchmark score`);
        if (score.confidenceInterval) assert.ok(scoreHtml.includes(`±${score.confidenceInterval}`), `${id}: score uncertainty`);
        if (score.votes) assert.ok(scoreHtml.includes(score.votes.toLocaleString('en-US')), `${id}: votes`);
        assert.ok(scoreHtml.includes(`href="${escape(score.source)}"`), `${id}: benchmark evidence`);
      }
    }
  });

  test(`hardware and other timelines retain their own detail fields in ${language}`, () => {
    const current = localized[language];
    for (const record of current.ATLAS_CATALOG.entries.filter(record => record.section !== 'models')) {
      const html = detail(current, record, language);
      assert.equal(section(html, 'detail-pricing'), '', `${record.key}: no model pricing`);
      assert.equal(section(html, 'detail-scores'), '', `${record.key}: no model scores`);
      const specs = section(html, 'detail-specs');
      const hardware = record.section === 'hardware' && record.release.hardware;
      assert.equal(Boolean(specs), Boolean(hardware), `${record.key}: only documented hardware specs`);
      if (!hardware) continue;
      assert.ok(specs.includes(language === 'en' ? 'Hardware specifications' : '硬件规格'), record.key);
      assert.ok(specs.includes(escape(language === 'en' ? hardware.variantEn || hardware.variant : hardware.variant)), record.key);
      for (const fact of hardware.facts) {
        const label = language === 'en' ? fact.labelEn : fact.label;
        const value = language === 'en' ? fact.valueEn || fact.value : fact.value;
        assert.ok(specs.includes(`<dt>${escape(label)}</dt><dd>${escape(value)}</dd>`), `${record.key}: ${label}`);
      }
      for (const source of hardware.sources) assert.ok(specs.includes(`href="${escape(source)}"`), `${record.key}: hardware evidence`);
      assert.ok(specs.includes(`datetime="${hardware.checkedAt}"`), `${record.key}: hardware verification date`);
    }
  });
}

test('a hardware ID collision cannot import model specifications, prices or scores', () => {
  const current = loadAtlas('en');
  const hardware = current.ATLAS_CATALOG.entries.find(record => record.section === 'hardware' && record.release.hardware);
  assert.ok(hardware);
  for (const key of ['MODEL_ATLAS_SPECS', 'MODEL_ATLAS_PRICES', 'MODEL_ATLAS_SCORES']) {
    const data = current[key];
    const modelEntry = Object.values(data.entries)[0];
    const replacement = modelEntry.variants
      ? { ...modelEntry, variants: modelEntry.variants.map(variant => ({ ...variant, name: 'MODEL-ONLY-COLLISION' })) }
      : Object.fromEntries(Object.entries(modelEntry).map(([metric, score]) => [metric, { ...score, model: 'MODEL-ONLY-COLLISION' }]));
    current[key] = { ...data, entries: { ...data.entries, [hardware.release.id]: replacement } };
  }
  const html = detail(current, hardware, 'en');
  assert.doesNotMatch(html, /MODEL-ONLY-COLLISION/);
  assert.equal(section(html, 'detail-pricing'), '');
  assert.equal(section(html, 'detail-scores'), '');
  assert.match(section(html, 'detail-specs'), /Hardware specifications/);
});
