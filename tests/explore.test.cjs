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
  models: ['MODEL_ATLAS', 'index.html', ['大模型时间线', 'Large Model Timeline']],
  agents: ['AGENT_ATLAS', 'agents.html', ['智能体工具时间线', 'Agent tool timeline']],
  hardware: ['HARDWARE_ATLAS', 'hardware.html', ['算力硬件时间线', 'AI hardware timeline']],
  technology: ['TECHNOLOGY_ATLAS', 'technology.html', ['AI 技术演进', 'AI technology timeline']],
};

function loadAtlas(language = 'zh') {
  const context = { window: {}, URL, URLSearchParams };
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
    assert.equal(matches[0].key, 'technology:transformer');
  }
});


test('search prioritizes exact identities and model variants without promoting sibling products', () => {
  for (const language of ['zh', 'en']) {
    const keys = query => Array.from(catalog.search(query, language), entry => entry.key);
    assert.equal(keys('BERT')[0], 'models:bert');
    assert.equal(keys('Transformer')[0], 'technology:transformer');
    assert.equal(keys('GPT 4')[0], 'models:gpt-4');
    assert.equal(keys('Qwen 3.8')[0], 'models:qwen-3-8');
    assert.deepEqual(keys('gpt-4o-2024-08-06'), ['models:gpt-4o']);
    assert.deepEqual(keys('H100'), ['hardware:nvidia-h100']);
    assert.ok(!keys('BERT').includes('models:gemini-4-argon'));
    assert.ok(!keys('Kiro').includes('models:amazon-nova'));
    assert.ok(!keys('Qwen').includes('agents:qoder'));
    assert.ok(keys('通义千问').includes('models:qwen-3-8'));
    assert.ok(!keys('通义千问').includes('agents:qoder'));
    assert.ok(keys('克劳德').includes('agents:claude-code'));
    const family = catalog.search('FlashAttention', language).slice(1).filter(entry => entry.release.name.startsWith('FlashAttention'));
    assert.ok(family.every((entry, index) => !index || family[index - 1].release.date >= entry.release.date), 'Equally relevant family entries remain newest first');
  }
});

test('organization names remain bilingual across sections and filters use the same matching fields', () => {
  for (const [company, queries] of [['google', ['Google', '谷歌', 'DeepMind']], ['qwen', ['Alibaba', '阿里巴巴']], ['zhipu', ['Z.ai', '智谱']]]) {
    for (const query of queries) {
      const found = new Set(catalog.search(query).map(entry => entry.key));
      for (const entry of catalog.events.filter(entry => entry.release.company === company)) assert.ok(found.has(entry.key), `${query}: ${entry.key}`);
    }
  }
  for (const query of ['BERT', 'Transformer', 'Qwen 3.8', '通义千问', 'Google', '谷歌', 'H100', 'gpt-4o-2024-08-06', 'FlashAttention‑4']) {
    const results = catalog.search(query);
    for (const [section, raw] of Object.entries(datasets)) {
      const filters = globals.ATLAS_FILTERS.create(raw, catalog.searchIndex(section));
      const state = filters.read(new URLSearchParams({ q: query }).toString());
      const selected = Array.from(filters.select(state), entry => entry.id).sort();
      const expected = Array.from(results.filter(entry => entry.sections.includes(section)), entry => entry.release.id).sort();
      assert.deepEqual(selected, expected, `${section}: ${query}`);
    }
  }
});

test('detail corrections prefill the existing issue template with a stable bilingual node link', () => {
  const template = fs.readFileSync(path.join(sourceRoot, '..', '.github', 'ISSUE_TEMPLATE', 'entry.md'), 'utf8');
  const headings = template.match(/^\*\*.+\*\*$/gm);
  for (const language of ['zh', 'en']) {
    const current = localized[language];
    for (const key of ['models:bert', 'agents:claude-code', 'hardware:nvidia-h100', 'technology:transformer', 'models:transformer']) {
      const record = current.ATLAS_CATALOG.get(key);
      const html = detail(current, record, language);
      const markup = /<p class="detail-correction">([\s\S]*?)<\/p>/.exec(html)?.[1];
      assert.ok(markup, key);
      assert.ok(markup.includes(language === 'en' ? 'Report a correction' : '纠错'));
      const url = new URL(/href="([^"]+)"/.exec(markup)[1].replaceAll('&amp;', '&'));
      assert.equal(url.origin + url.pathname, 'https://github.com/taifuer/model-atlas/issues/new');
      assert.equal(url.searchParams.get('template'), 'entry.md');
      assert.ok(url.searchParams.get('title').endsWith(current.ATLAS_CATALOG.text(record, language).name));
      const body = url.searchParams.get('body');
      assert.ok(body.includes(record.key));
      assert.ok(body.includes(record.release.date));
      assert.ok(body.includes(new URL(current.ATLAS_CATALOG.timelineUrl(record, language), 'https://ai.taifua.com/').href));
      for (const heading of headings) assert.ok(body.includes(heading));
      assert.match(markup, /target="_blank" rel="noopener noreferrer"/);
    }
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
      const access = record.raw.accessFilter !== false && record.release.openness;
      const separateAccessSource = access?.source && !(access.licenses?.length || access.note || access.noteEn) && !record.release.sources.some(source => source.url === access.source);
      assert.equal((references.match(/<li>/g) || []).length, record.release.sources.length + Number(Boolean(separateAccessSource)), record.key);
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
        const note = language === 'en' ? score.noteEn : score.note;
        if (note) assert.ok(scoreHtml.includes(escape(note)), `${id}: checkpoint scope note in ${language}`);
        assert.ok(scoreHtml.includes(escape(current.MODEL_ATLAS_SCORES.benchmarks[benchmark].name)), `${id}: metric name`);
        assert.ok(scoreHtml.includes(escape(score.model)), `${id}: evaluated configuration`);
        assert.ok(scoreHtml.includes(`<strong>${score.score}`), `${id}: benchmark score`);
        if (score.confidenceInterval) assert.ok(scoreHtml.includes(`±${score.confidenceInterval}`), `${id}: score uncertainty`);
        if (score.votes) assert.ok(scoreHtml.includes(score.votes.toLocaleString('en-US')), `${id}: votes`);
        assert.ok(scoreHtml.includes(`href="${escape(score.source)}"`), `${id}: benchmark evidence`);
      }
    }
  });

  test(`licensing stays near the overview with its own evidence date in ${language}`, () => {
    const current = localized[language];
    for (const record of current.ATLAS_CATALOG.entries) {
      const html = detail(current, record, language);
      const access = record.raw.accessFilter !== false && record.release.openness;
      const accessHtml = section(html, 'detail-access-summary');
      const substantive = access && (access.licenses?.length || access.note || access.noteEn);
      assert.equal(Boolean(accessHtml), Boolean(substantive), `${record.key}: no empty licensing section`);
      if (!substantive) continue;
      assert.ok(accessHtml.includes(`datetime="${access.checkedAt}"`), `${record.key}: access-specific verification date`);
      for (const next of ['detail-specs', 'detail-pricing', 'detail-scores', 'detail-classification', 'detail-references']) {
        const position = html.indexOf(`class="${next}"`);
        if (position >= 0) assert.ok(html.indexOf('class="detail-access-summary"') < position, `${record.key}: access before ${next}`);
      }
      for (const license of access.licenses || []) {
        assert.ok(accessHtml.includes(`<dt>${escape(language === 'en' ? license.objectEn : license.object)}</dt>`), `${record.key}: opened object`);
        assert.ok(accessHtml.includes(escape(license.name)), `${record.key}: named license`);
        assert.ok(accessHtml.includes(`href="${escape(license.source)}"`), `${record.key}: license source`);
      }
      if (access.note) assert.ok(accessHtml.includes(escape(language === 'en' ? access.noteEn : access.note)), `${record.key}: restrictions retained`);
    }
  });

  test(`a separate access source remains reachable without an empty licensing section in ${language}`, () => {
    const current = localized[language];
    const record = current.ATLAS_CATALOG.get('models:gpt-1');
    const access = record.release.openness;
    assert.ok(access.source && !access.note && !access.licenses);
    assert.ok(!record.release.sources.some(source => source.url === access.source), 'Fixture has a separate code repository as access evidence');
    const html = detail(current, record, language);
    assert.equal(section(html, 'detail-access-summary'), '');
    const references = section(html, 'detail-references');
    assert.ok(references.includes(`href="${escape(access.source)}"`));
    assert.ok(references.includes(language === 'en' ? 'Access evidence' : '开放依据'));
    assert.ok(references.includes(`datetime="${access.checkedAt}"`));
  });

  test(`verification dates and leaderboard dates remain distinct in ${language}`, () => {
    const current = localized[language];
    for (const record of current.ATLAS_CATALOG.entries) {
      const html = detail(current, record, language);
      for (const [className, data] of [['detail-specs', current.MODEL_ATLAS_SPECS], ['detail-pricing', current.MODEL_ATLAS_PRICES]]) {
        const content = section(html, className);
        if (!content) continue;
        const expected = record.section === 'hardware' ? record.release.hardware.checkedAt : data.entries[record.release.id].checkedAt || data.checkedAt;
        const heading = /<div class="detail-section-title">[\s\S]*?<\/div>/.exec(content)?.[0];
        assert.ok(heading?.includes(`datetime="${expected}"`), `${record.key}: ${className} check date next to heading`);
        assert.ok(heading.includes(language === 'en' ? 'Checked' : '核对日期'), `${record.key}: a check date is not called a snapshot date`);
        assert.doesNotMatch(content, /评测快照|Benchmark snapshot|规格核对于|价格核对于/);
      }
      const scores = record.section === 'models' && current.MODEL_ATLAS_SCORES.entries[record.release.id];
      if (!scores) continue;
      const scoreHtml = section(html, 'detail-scores');
      const checkedRecords = Array.from(scoreHtml.matchAll(/<div class="benchmark-record">[\s\S]*?<\/a><\/div>/g), match => match[0]);
      for (const [key, score] of Object.entries(scores)) {
        const expected = score.checkedAt || current.MODEL_ATLAS_SCORES.benchmarks[key].checkedAt || current.MODEL_ATLAS_SCORES.checkedAt;
        const content = checkedRecords.find(record => record.includes(escape(score.model)));
        assert.ok(content?.includes(`datetime="${expected}"`), `${record.key}: ${key} keeps its own check date`);
      }
      const headings = Array.from(scoreHtml.matchAll(/<div class="benchmark-heading">[\s\S]*?<\/strong><\/div>/g), match => match[0]);
      for (const score of Object.values(scores)) assert.ok(headings.some(heading => heading.includes(escape(score.model)) && heading.includes(`<strong>${score.score}`)), `${record.key}: exact model configuration adjacent to score`);
      if (scores.arena) {
        assert.ok(scoreHtml.includes(`${language === 'en' ? 'Leaderboard date' : '榜单日期'} ${current.MODEL_ATLAS_SCORES.benchmarks.arena.publishedAt.replaceAll('-', '.')}`), `${record.key}: actual Arena publication date`);
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


test('benchmark check dates prefer the individual record, then its source, then the legacy default', () => {
  for (const language of ['zh', 'en']) {
    const current = loadAtlas(language), original = current.MODEL_ATLAS_SCORES;
    const key = 'claude-opus-5-5', entry = original.entries[key];
    for (const [recordDate, sourceDate, expected] of [
      ['2026-10-15', '2026-10-14', '2026-10-15'],
      [undefined, '2026-10-14', '2026-10-14'],
      [undefined, undefined, '2026-10-10'],
    ]) {
      current.MODEL_ATLAS_SCORES = {
        ...original, checkedAt: '2026-10-10',
        benchmarks: { ...original.benchmarks, aa: { ...original.benchmarks.aa, checkedAt: sourceDate }, arena: { ...original.benchmarks.arena, checkedAt: '2026-10-11' } },
        entries: { ...original.entries, [key]: { aa: { ...entry.aa, checkedAt: recordDate }, arena: { ...entry.arena, checkedAt: undefined } } },
      };
      const html = section(detail(current, current.ATLAS_CATALOG.get(`models:${key}`), language), 'detail-scores');
      const records = Array.from(html.matchAll(/<div class="benchmark-record">[\s\S]*?<\/a><\/div>/g), match => match[0]);
      assert.ok(records[0].includes(`datetime="${expected}"`));
      assert.ok(records[1].includes('datetime="2026-10-11"'));
      assert.ok(records[1].includes(`${language === 'en' ? 'Leaderboard date' : '榜单日期'} ${original.benchmarks.arena.publishedAt.replaceAll('-', '.')}`));
      assert.doesNotMatch(/<div class="detail-section-title">[\s\S]*?<\/div>/.exec(html)[0], /<time/, 'The section must not imply that different boards were checked on one date');
    }
  }
});

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
