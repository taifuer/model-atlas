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
  const primaryHosts = new Set(['www.canva.com', 'fal.ai', 'docs.inceptionlabs.ai', 'www.inceptionlabs.ai', 'platform.minimax.io', 'stability.ai', 'docs.midjourney.com', 'imagen.research.google', 'artificialanalysis.ai', 'bfl.ai', 'docs.bfl.ai', 'www.liquid.ai', 'docs.liquid.ai', 'www.alibabacloud.com', 'help.openai.com', 'cloud.google.com', 'docs.cloud.google.com', 'help.runwayml.com', 'ir.kuaishou.com', 'runway.com', 'openai.com', 'developers.openai.com', 'deploymentsafety.openai.com', 'docs.mistral.ai', 'deepmind.google', 'arxiv.org', 'www.anthropic.com', 'platform.claude.com', 'research.google', 'blog.google', 'dev.meta.ai', 'ai.google.dev', 'ai.meta.com', 'research.meta.ai', 'about.fb.com', 'api-docs.deepseek.com', 'github.com', 'huggingface.co', 'qwenlm.github.io', 'qwen.ai', 'docs.qwencloud.com', 'mistral.ai', 'x.ai', 'platform.kimi.ai', 'www.kimi.com', 'z.ai', 'docs.z.ai', 'www.minimax.io', 'mimo.xiaomi.com', 'mimo.mi.com', 'static.stepfun.com', 'www.stepfun.com', 'news.microsoft.com', 'techcommunity.microsoft.com', 'aws.amazon.com', 'nvidianews.nvidia.com', 'blogs.nvidia.com', 'cloud.tencent.com', 'www.tencent.com', 'seed.bytedance.com']);
  // These additional official/project/author pages were reviewed for the named event.
  // Keep community-hosted articles and personal author archives URL-specific.
  const reviewedPrimarySources = new Map([
    ['https://community.canva.dev/t/connect-api-canva-craft-is-now-available-for-image-generation/8999', 'canva-craft'],
    ['https://www.prnewswire.com/news-releases/fal-launches-flux-3-max-delivering-1-tier-image-to-video-quality-at-industry-leading-speeds-302913033.html', 'flux-3-max'],
    ['https://research.nvidia.com/labs/nemotron/NVIDIA-Nemotron-3.5-Bolt-E4B-4GB/', 'nemotron-3-5-vl-bolt'],
    ['https://community.openai.com/t/dall-e-3-announcement-coming-soon/385170', 'dall-e-3'],
    ['https://storage.googleapis.com/deepmind-media/Model-Cards/Imagen-4-Model-Card.pdf', 'imagen-4'],
    ['https://reflection.ai/blog/introducing-beam', 'reflection-beam-1'],
    ['https://reflection.ai/blog/beam-is-available', 'reflection-beam-1'],
    ['https://kling.ai/blog/kling40-kling-visual-realism-creative-control-introducing-storytelling', 'kling-4'],
    ['https://www.youtube.com/watch?v=trXPfpV5iRQ', 'runway-gen-2'],
    ['https://www.ant-ling.com/', 'ling-3-1-flash'],
    ['https://developer.ant-ling.com/zh-CN/docs/models/ling/', 'ling-3-1-flash'],
    ['https://vercel.com/changelog/ling-3-1-flash-is-now-available-on-ai-gateway', 'ling-3-1-flash'],
    ['https://x.com/Zai_org/status/2065704919299235870', 'glm-5-2'],
    ['https://arankomatsuzaki.wordpress.com/2021/06/04/gpt-j/', 'gpt-j-6b'],
    ['https://university.chatglm.cn/blog', 'chatglm-6b'],
    ['https://allenai.org/blog/hello-olmo-a-truly-open-llm-43f7e7359222', 'olmo'],
    ['https://blog.jetbrains.com/ai/2026/10/mellum2-1-gets-to-work-a-fast-open-model-for-coding-agents/', 'mellum-2-1-thinking'],
    ['https://crfm.stanford.edu/2023/03/13/alpaca.html', 'stanford-alpaca'],
    ['https://llava-vl.github.io/', 'llava'],
    ['https://ai.google.dev/gemma/docs/get_started', 'gemma-3'],
    ['https://developer.cloud.tencent.com/article/2508216', 'hunyuan-t1'],
    ['https://www.kimi.ai/blog/kimi-k3', 'kimi-k3'],
    ['https://docs.x.ai/developers/release-notes', 'grok-4-6'],
    ['https://shital.com/blog/tweets/thread/202501082332-phi-4-official-release/', 'phi-4'],
    ['https://platform.stepfun.ai/docs/en/guides/models/step-5-preview', 'step-5-preview'],
  ]);
  const reviewedHuggingFacePaths = new Map([
    ['/MiniMaxAI/MiniMax-M3.1-Flash', 'minimax-m3-1-flash'],
    ['/inclusionAI/Ling-3.1-flash', 'ling-3-1-flash'],
    ["/CompVis/stable-diffusion-v1-4", "stable-diffusion-1"],
    ["/stabilityai/stable-diffusion-xl-base-1.0", "sdxl-1"],
    ["/black-forest-labs/FLUX.1-dev", "flux-1-open"],
    ["/black-forest-labs/FLUX.1-schnell", "flux-1-open"],
    ["/black-forest-labs/FLUX.1-Kontext-dev", "flux-1-kontext-dev"],
    ["/Qwen/Qwen-Image", "qwen-image"],
    ['/black-forest-labs/flux-3-image-klein', 'flux-3-image-klein'],
    ['/LiquidAI/LFM2.5-24B-A2B', 'lfm-2-5-24b-a2b'],
    ['/deepseek-ai/DeepSeek-V4.1-Flash-1017', 'deepseek-v4-1-flash'],
    ['/stepfun-ai/Step-5-Preview-NVFP4', 'step-5-preview'],
    ['/stepfun-ai/Step-5-Preview/blob/main/LICENSE.txt', 'step-5-preview'],
    ['/reflection/Beam-1.0-501B-A23B', 'reflection-beam-1'],
    ['/meta-models/Muse-Spark-Open-816B-A42B', 'muse-spark-open'],
    ['/nvidia/NVIDIA-Nemotron-3.5-Super-VL-120B-A12B-NVFP4', 'nemotron-3-5-vl-bolt'],
    ['/nvidia/NVIDIA-Nemotron-3.5-Bolt-74B-A9B-24GB', 'nemotron-3-5-vl-bolt'],
    ['/tencent/HunyuanVideo-1.5', 'hunyuan-video-1-5'],
    ['/MiniMaxAI/MiniMax-H3', 'minimax-h3'],
    ['/MiniMaxAI/MiniMax-H3/raw/main/LICENSE', 'minimax-h3'],
    ['/EleutherAI/gpt-j-6b', 'gpt-j-6b'],
    ['/blog/starcoder', 'starcoder'],
    ['/allenai/OLMo-7B', 'olmo'],
    ['/JetBrains/Mellum2.1-12B-A2.5B-Thinking', 'mellum-2-1-thinking'],
    ['/blog/bloom', 'bloom'],
    ['/Qwen/Qwen3-Next-80B-A3B-Instruct', 'qwen-3-next'],
    ['/zai-org/GLM-4.5', 'glm-4-5'],
    ['/stepfun-ai/Step-3.5-Flash', 'step-3-5-flash'],
  ]);
  const reviewedImageRepositories = new Map([["/openai/DALL-E", "dall-e"], ["/openai/dalle-2-preview/blob/main/system-card.md", "dall-e-2"], ["/CompVis/stable-diffusion", "stable-diffusion-1"], ["/Stability-AI/generative-models", "sdxl-1"], ["/QwenLM/Qwen-Image", "qwen-image"]]);
  const isPrimary = source => primaryHosts.has(new URL(source.url).hostname) || reviewedPrimarySources.has(source.url);
  const supportingReports = new Set(['https://www.ithome.com/1/004/705.htm']);
  for (const release of data.releases) {
    assert.ok(companyIds.has(release.company), release.name);
    assert.ok(data.kinds[release.kind], release.name);
    assert.ok(data.themes[release.date.slice(0,4)], release.name);
    assert.ok(release.name && release.summary && release.details && release.tags.length, release.name);
    assert.equal(typeof release.milestone, 'boolean');
    assert.ok(release.sources.length, `Missing source: ${release.name}`);
    assert.ok(isPrimary(release.sources[0]), `First source must be primary: ${release.name}`);
    for (const source of release.sources) {
      const url = new URL(source.url);
      assert.equal(url.protocol, 'https:');
      if (reviewedPrimarySources.has(source.url)) {
        assert.equal(release.id, reviewedPrimarySources.get(source.url), `Source does not identify this event: ${source.url}`);
        if (url.hostname === 'shital.com') assert.match(source.title, /Phi.*作者/);
      }
      if (!isPrimary(source)) {
        assert.ok(supportingReports.has(source.url), `Unreviewed supporting source: ${source.url}`);
        assert.match(source.title, /交叉核验/);
        assert.ok(release.dateNote, 'Supporting reports must explain their date role');
      }
      assert.ok(source.title);
      if (url.hostname === 'github.com') {
        if (reviewedImageRepositories.has(url.pathname)) assert.equal(release.id, reviewedImageRepositories.get(url.pathname));
        else if (url.pathname === '/zai-org/ChatGLM-6B') assert.equal(release.id, 'chatglm-6b');
        else if (url.pathname.startsWith('/Wan-Video/')) assert.ok(new RegExp('^/Wan-Video/Wan2\\.[12](?:/|$)').test(url.pathname) && /^wan-2-[12]$/.test(release.id), source.url);
        else if (url.pathname.startsWith('/Tencent-Hunyuan/')) assert.ok(/^\/Tencent-Hunyuan\/HunyuanVideo(?:-1\.5)?(?:\/|$)/.test(url.pathname) && /^hunyuan-video(?:-1-5)?$/.test(release.id), source.url);
        else assert.match(url.pathname, /^\/(QwenLM|deepseek-ai|MoonshotAI|stepfun-ai)\//);
      }
      if (url.hostname === 'huggingface.co' && !/^\/meta-llama\//.test(url.pathname)) {
        assert.equal(reviewedHuggingFacePaths.get(url.pathname), release.id, `Unreviewed publisher or model version: ${source.url}`);
      }
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
  assert.ok(find('step-5-preview').dateNote && find('step-5-preview').sources.length >= 2);
  assert.equal(find('deepseek-v4').kind, 'preview');
  assert.equal(find('deepseek-v4-pro-0813').kind, 'release');
  assert.equal(find('deepseek-v4-pro-0813').date, '2026-08-13');
  assert.equal(find('step-5-preview').date, '2026-09-20', 'Later public weights do not move the original preview date');
  assert.equal(find('deepseek-v4-1-flash').date, '2026-09-10', 'The 1017 checkpoint remains a follow-up to the original model release');
  assert.equal(find('reflection-beam-1').date, '2026-10-05', 'Beam was announced before the October 16 weight release');
  assert.equal(find('reflection-beam-1').kind, 'announcement');
  assert.equal(find('kling-4').date, '2026-09-30', 'The main model preview predates October general availability');
  assert.equal(find('kling-4').kind, 'preview');
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
  assert.deepEqual([...new Set(Array.from(data.coverage.references, reference => new URL(reference.url).hostname))].sort(), ['arena.ai', 'artificialanalysis.ai', 'crfm.stanford.edu', 'livebench.ai', 'rank.opencompass.org.cn', 'www.swebench.com', 'www.tbench.ai']);
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

test('agent entries have distinct categories, bilingual descriptions, and primary sources with explicit corroboration', () => {
  vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname, '../src/data-agents.js'), 'utf8'), context);
  const agents = context.window.AGENT_ATLAS;
  const hosts = new Set(['docs.replit.com', 'x.ai', 'devin.ai', 'docs.devin.ai', 'registry.npmjs.org', 'developer.cloud.tencent.com', 'docs.factory.com', 'open-vsx.org', 'blog.jetbrains.com', 'blog.kilo.ai', 'www.augmentcode.com', 'zed.dev', 'ampcode.com', 'factory.com', 'earendil.com', 'about.fb.com', 'www.microsoft.com', 'www.langchain.com', 'cognition.com', 'arxiv.org', 'replit.com', 'windsurf.com', 'cursor.com', 'www.anthropic.com', 'openai.com', 'github.blog', 'blog.google', 'antigravity.google', 'claude.com', 'support.claude.com', 'mariozechner.at', 'openclaw.ai', 'nousresearch.com', 'hermes-agent.nousresearch.com', 'www.deepseek.com', 'www.codebuddy.cn', 'cloud.tencent.com', 'qoder.com', 'qwenlm.github.io', 'kiro.dev', 'www.trae.ai', 'aider.chat', 'github.com', 'opencode.ai', 'manus.im', 'huggingface.co', 'goose-docs.ai', 'developers.googleblog.com', 'aws.amazon.com', 'blog.crewai.com', 'www.warp.dev']);
  const supportingReports = new Map([['https://www.ithome.com/1/005/046.htm', 'zcode-open-source']]);
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
    assert.ok(hosts.has(new URL(entry.sources[0].url).hostname), `First source must be primary: ${entry.id}`);
    for (const source of entry.sources) {
      const url = new URL(source.url);
      assert.equal(url.protocol, 'https:');
      if (!hosts.has(url.hostname)) {
        assert.equal(supportingReports.get(source.url), entry.id, source.url);
        assert.ok(entry.dateNote && entry.en.dateNote, 'Corroborating reports retain the event date scope');
      }
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
  const kimi = agents.releases.find(entry => entry.id === 'kimi-cli-1');
  assert.equal(kimi.name, 'Kimi CLI', 'Keep existing links while selecting the representative public release');
  assert.equal(kimi.date, '2025-10-21', 'Use the published Release date, not the earlier changelog date');
  assert.ok(kimi.sources.some(source => source.url === 'https://github.com/MoonshotAI/kimi-cli/releases/tag/0.33'));
  assert.equal(kimi.milestone, false);
});
