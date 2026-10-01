const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname, '../src/data.js'), 'utf8'), context);
const data = context.window.MODEL_ATLAS;

test('release dates are real, sorted, unique events within the research cutoff', () => {
  const ids = new Set();
  let previousDate = '2017-06-12';
  for (const release of data.releases) {
    assert.match(release.id, /^[a-z0-9-]+$/);
    assert.ok(!ids.has(release.id), `Duplicate id: ${release.id}`);
    ids.add(release.id);
    assert.match(release.date, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(new Date(`${release.date}T00:00:00Z`).toISOString().slice(0,10), release.date);
    assert.ok(release.date >= previousDate, `Out of order: ${release.name}`);
    assert.ok(release.date <= data.asOf, `Future event: ${release.name}`);
    previousDate = release.date;
  }
  assert.equal(data.releases[0].id, 'transformer');
  assert.equal(data.releases[1].id, 'gpt-1');
});

test('every event has valid metadata and a primary source; supporting reports are explicit', () => {
  const companyIds = new Set(data.companies.map(company => company.id));
  const primaryHosts = new Set(['openai.com', 'developers.openai.com', 'deepmind.google', 'arxiv.org', 'www.anthropic.com', 'platform.claude.com', 'research.google', 'blog.google', 'ai.meta.com', 'research.meta.ai', 'about.fb.com', 'api-docs.deepseek.com', 'github.com', 'huggingface.co', 'qwenlm.github.io', 'qwen.ai', 'docs.qwencloud.com', 'mistral.ai', 'x.ai', 'platform.kimi.ai', 'www.kimi.com', 'z.ai', 'docs.z.ai', 'www.minimax.io', 'mimo.xiaomi.com', 'mimo.mi.com', 'static.stepfun.com', 'www.stepfun.com', 'news.microsoft.com', 'techcommunity.microsoft.com', 'aws.amazon.com', 'nvidianews.nvidia.com', 'blogs.nvidia.com', 'cloud.tencent.com', 'www.tencent.com', 'seed.bytedance.com']);
  const supportingReports = new Set(['https://www.ithome.com/1/004/705.htm']);
  for (const release of data.releases) {
    assert.ok(companyIds.has(release.company), release.name);
    assert.ok(data.kinds[release.kind], release.name);
    assert.ok(data.themes[release.date.slice(0,4)], release.name);
    assert.ok(release.name && release.summary && release.details && release.tags.length, release.name);
    assert.equal(typeof release.milestone, 'boolean');
    assert.ok(release.sources.length, `Missing source: ${release.name}`);
    assert.ok(primaryHosts.has(new URL(release.sources[0].url).hostname), `First source must be primary: ${release.name}`);
    for (const source of release.sources) {
      const url = new URL(source.url);
      assert.equal(url.protocol, 'https:');
      if (!primaryHosts.has(url.hostname)) {
        assert.ok(supportingReports.has(source.url), `Unreviewed supporting source: ${source.url}`);
        assert.match(source.title, /交叉核验/);
        assert.ok(release.dateNote, 'Supporting reports must explain their date role');
      }
      assert.ok(source.title);
      if (url.hostname === 'github.com') assert.match(url.pathname, /^\/(QwenLM|deepseek-ai|MoonshotAI|stepfun-ai)\//);
      if (url.hostname === 'huggingface.co') assert.match(url.pathname, /^\/meta-llama\//);
    }
  }
});

test('research, product launches, and previews retain their distinct date meanings', () => {
  const find = id => data.releases.find(release => release.id === id);
  assert.equal(find('transformer').date, '2017-06-12');
  assert.equal(find('transformer').kind, 'paper');
  assert.ok(find('transformer').dateNote && find('transformer').milestone);
  assert.equal(find('gpt-3').date, '2020-05-28');
  assert.equal(find('gpt-3').kind, 'paper');
  assert.equal(find('chatgpt').kind, 'product');
  assert.equal(find('o1-preview').kind, 'preview');
  assert.equal(find('claude-3-5').date, '2024-06-20');
  assert.ok(find('claude-3-5').dateNote && find('claude-3-5').sources.length > 1);
  assert.ok(find('gpt-6-astra').sources.length > 1);
  assert.equal(find('claude-opus-4-5').date, '2025-11-24');
  assert.equal(find('glm-5-3').date, '2026-08-18');
  assert.equal(find('step-5-preview').kind, 'preview');
  assert.ok(find('step-5-preview').dateNote && find('step-5-preview').sources.length === 2);
  assert.equal(find('deepseek-v4').kind, 'preview');
  assert.equal(find('deepseek-v4-pro-0813').kind, 'release');
  assert.equal(find('deepseek-v4-pro-0813').date, '2026-08-13');
});

test('company coverage and research metadata are complete', () => {
  assert.equal(data.companies.length, new Set(data.companies.map(company => company.id)).size);
  for (const company of data.companies) {
    assert.ok(data.releases.some(release => release.company === company.id), `Empty company: ${company.id}`);
  }
  for (const id of ['minimax', 'xiaomi', 'stepfun', 'microsoft', 'amazon', 'nvidia', 'tencent', 'bytedance']) {
    assert.ok(data.companies.some(company => company.id === id), `Missing provider: ${id}`);
  }
  assert.equal(data.coverage.checkedAt, data.asOf);
  assert.deepEqual(Array.from(data.coverage.references, reference => new URL(reference.url).hostname).sort(), ['arena.ai', 'artificialanalysis.ai', 'crfm.stanford.edu', 'livebench.ai', 'rank.opencompass.org.cn', 'www.swebench.com', 'www.tbench.ai']);
});

test('organization ranking records a dated, comparable AA snapshot with explicit estimates', () => {
  const ranking = data.companyRanking;
  assert.equal(ranking.selection, 'highest-listed-score');
  assert.equal(ranking.metric, 'Artificial Analysis Intelligence Index');
  assert.match(ranking.version, /^\d+\.\d+\.\d+$/);
  assert.equal(new URL(ranking.source).hostname, 'artificialanalysis.ai');
  assert.equal(new Date(ranking.checkedAt + 'T00:00:00Z').toISOString().slice(0, 10), ranking.checkedAt);
  assert.ok(ranking.checkedAt <= data.updatedAt);
  const ids = new Set();
  let previousScore = Infinity;
  for (const entry of ranking.entries) {
    assert.ok(data.companies.some(company => company.id === entry.company), entry.company);
    assert.ok(!ids.has(entry.company), `Duplicate ranking representative: ${entry.company}`);
    ids.add(entry.company);
    assert.ok(entry.model && Number.isFinite(entry.score));
    assert.ok(entry.score >= 0 && entry.score <= 100 && entry.score <= previousScore, entry.model);
    if (entry.estimated !== undefined) assert.equal(typeof entry.estimated, 'boolean');
    previousScore = entry.score;
  }
  const find = company => ranking.entries.find(entry => entry.company === company);
  assert.equal(find('openai').model, 'GPT-6 Astra (max)');
  assert.equal(find('anthropic').model, 'Claude Opus 5.5 (max with fallback)');
  for (const company of ['amazon', 'bytedance', 'microsoft']) assert.equal(find(company).estimated, true);
});

test('English content covers every model and retains date clarifications', () => {
  vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname, '../src/data-en.js'), 'utf8'), context);
  for (const release of data.releases) {
    const translated = context.window.MODEL_ATLAS_EN[release.id];
    assert.ok(translated?.summary && translated.details, `Missing English copy: ${release.id}`);
    assert.doesNotMatch(translated.summary + translated.details + translated.dateNote, /[\u3400-\u9fff]/);
    if (release.dateNote) assert.ok(translated.dateNote, `Missing English date note: ${release.id}`);
    for (const tag of release.tags) if (/[\u3400-\u9fff]/.test(tag)) assert.ok(context.window.ATLAS_TAGS_EN[tag], `Missing tag: ${tag}`);
  }
  assert.equal(data.companies.some(company => ['baidu', 'cohere'].includes(company.id)), false);
  assert.equal(data.releases.some(release => ['baidu', 'cohere'].includes(release.company)), false);
});

test('agent entries have distinct categories, bilingual descriptions, and dated first-party sources', () => {
  vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname, '../src/data-agents.js'), 'utf8'), context);
  const agents = context.window.AGENT_ATLAS;
  const hosts = new Set(['www.microsoft.com', 'www.langchain.com', 'cognition.com', 'arxiv.org', 'replit.com', 'windsurf.com', 'cursor.com', 'www.anthropic.com', 'openai.com', 'github.blog', 'blog.google', 'claude.com', 'mariozechner.at', 'openclaw.ai', 'nousresearch.com', 'hermes-agent.nousresearch.com', 'www.deepseek.com', 'www.codebuddy.cn', 'cloud.tencent.com', 'qoder.com', 'qwenlm.github.io', 'kiro.dev', 'www.trae.ai', 'aider.chat', 'github.com', 'opencode.ai', 'manus.im', 'huggingface.co', 'goose-docs.ai', 'developers.googleblog.com', 'aws.amazon.com', 'blog.crewai.com', 'www.warp.dev']);
  const ids = new Set();
  let previous = '';
  for (const entry of agents.releases) {
    assert.ok(!ids.has(entry.id)); ids.add(entry.id);
    assert.equal(new Date(entry.date + 'T00:00:00Z').toISOString().slice(0, 10), entry.date);
    assert.ok(entry.date >= previous && entry.date <= agents.asOf); previous = entry.date;
    assert.ok(agents.companies.some(company => company.id === entry.company));
    assert.ok(agents.categories[entry.category] && agents.categoriesEn[entry.category]);
    assert.ok(agents.kinds[entry.kind] && agents.themes[entry.date.slice(0, 4)]);
    assert.ok(entry.summary && entry.details && entry.en.summary && entry.en.details);
    if (entry.dateNote) assert.ok(entry.en.dateNote);
    for (const source of entry.sources) {
      const url = new URL(source.url);
      assert.equal(url.protocol, 'https:');
      assert.ok(hosts.has(url.hostname), source.url);
    }
  }
  for (const id of ['hermes-agent', 'workbuddy', 'deepseek-harness', 'aider', 'cline-2', 'opencode-1', 'qwen-code', 'kimi-cli-1', 'goose', 'kiro', 'qoder', 'trae-solo', 'google-antigravity']) assert.ok(ids.has(id), `Missing agent: ${id}`);
  assert.equal(agents.releases.find(entry => entry.id === 'workbuddy').date, '2026-03-04');
  assert.equal(agents.releases.find(entry => entry.id === 'deepseek-harness').kind, 'preview');
  for (const category of Object.keys(agents.categories)) assert.ok(agents.releases.some(entry => entry.category === category));
  assert.equal(agents.releases.find(entry => entry.id === 'pi-agent').kind, 'announcement');
  assert.equal(agents.releases.find(entry => entry.id === 'openclaw').kind, 'announcement');
  assert.equal(agents.releases.find(entry => entry.id === 'claude-code').date, '2025-02-24');
  assert.equal(agents.releases.find(entry => entry.id === 'codex-cli').date, '2025-04-16');
});
