const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = { window: {} };
for (const name of ['data.js', 'data-specs.js']) vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'src', name), 'utf8'), context);
const { MODEL_ATLAS: models, MODEL_ATLAS_SPECS: specs } = context.window;
const tokenFields = ['contextTokens', 'extendedContextTokens', 'inputTokens', 'outputTokens', 'trainingTokens'];
const allowedFields = new Set(['name', 'basis', 'sources', ...tokenFields, 'parameters', 'activeParameters', 'input', 'output', 'video', 'note', 'noteEn']);
const types = new Set(['text', 'image', 'audio', 'video', 'pdf', 'document']);

test('specifications identify existing entries, exact variants, and first-party evidence', () => {
  const hosts = new Set(['docs.bfl.ai', 'docs.liquid.ai', 'seed.bytedance.com', 'www.alibabacloud.com', 'openai.com', 'blog.google', 'cloud.google.com', 'docs.cloud.google.com', 'deepmind.google', 'ir.kuaishou.com', 'runway.com', 'help.runwayml.com', 'www.minimax.io', 'dev.meta.ai', 'research.meta.ai', 'developer.ant-ling.com', 'docs.mistral.ai', 'artificialanalysis.ai', 'developers.openai.com', 'cdn.openai.com', 'platform.claude.com', 'ai.google.dev', 'api-docs.deepseek.com', 'huggingface.co', 'docs.x.ai', 'docs.z.ai', 'docs.qwencloud.com', 'www.qwencloud.com', 'arxiv.org', 'github.com', 'aws.amazon.com']);
  const hfOrganizations = new Set(['black-forest-labs', 'LiquidAI', 'EleutherAI', 'allenai', 'JetBrains', 'deepseek-ai', 'Qwen', 'zai-org', 'MiniMaxAI', 'moonshotai', 'XiaomiMiMo', 'microsoft', 'nvidia', 'stepfun-ai', 'tencent', 'mistralai', 'meta-llama', 'meta-models', 'reflection', 'google']);
  const reviewedSources = new Set([
    'https://developers.reflection.ai/models',
    'https://kling.ai/blog/kling40-kling-visual-realism-creative-control-introducing-storytelling',
  ]);
  const ids = new Set(models.releases.map(model => model.id));
  assert.equal(new Date(specs.checkedAt + 'T00:00:00Z').toISOString().slice(0, 10), specs.checkedAt);
  assert.ok(specs.checkedAt <= models.updatedAt);
  for (const [id, entry] of Object.entries(specs.entries)) {
    assert.ok(ids.has(id), `Orphaned specification: ${id}`);
    assert.ok(entry.variants.length > 0, id);
    assert.equal(entry.variants.length, new Set(entry.variants.map(variant => variant.name)).size, id);
    if (entry.note) {
      assert.ok(entry.noteEn, id);
      assert.doesNotMatch(entry.noteEn, /[\u3400-\u9fff]/, id);
    }
    for (const variant of entry.variants) {
      assert.ok(variant.name && ['api', 'weights', 'paper', 'benchmark', 'release', 'service'].includes(variant.basis), id);
      assert.doesNotMatch(variant.name, /[\u3400-\u9fff]/, id);
      assert.ok(variant.sources.length > 0, id);
      for (const field of Object.keys(variant)) assert.ok(allowedFields.has(field), `${id}: unknown field ${field}`);
      assert.ok([...tokenFields, 'parameters', 'input', 'output'].some(field => variant[field]), `${id}: empty specification`);
      if (variant.note) {
        assert.ok(variant.noteEn, id);
        assert.doesNotMatch(variant.noteEn, /[\u3400-\u9fff]/, id);
      }
      for (const source of variant.sources) {
        const url = new URL(source);
        assert.equal(url.protocol, 'https:', id);
        assert.ok(hosts.has(url.hostname) || reviewedSources.has(source), source);
        if (url.hostname === 'huggingface.co') assert.ok(hfOrganizations.has(url.pathname.split('/')[1]) || (id === 'starcoder' && url.pathname === '/blog/starcoder'), source);
        if (url.hostname === 'github.com') assert.ok(/^\/google-research\/bert/.test(url.pathname) || (id === 'chatglm-6b' && url.pathname === '/zai-org/ChatGLM-6B') || (/^wan-2-[12]$/.test(id) && /^\/Wan-Video\/Wan2\.[12]$/.test(url.pathname)) || (/^hunyuan-video(?:-1-5)?$/.test(id) && /^\/Tencent-Hunyuan\/HunyuanVideo(?:-1\.5)?$/.test(url.pathname)), source);
      }
    }
  }
});

test('limits and parameter counts retain valid units and coherent ranges', () => {
  const size = value => Number(value.replace('≈', '').slice(0, -1)) * { M: 1e6, B: 1e9, T: 1e12 }[value.at(-1)];
  for (const [id, entry] of Object.entries(specs.entries)) {
    for (const variant of entry.variants) {
      for (const field of tokenFields) {
        if (variant[field] === undefined) continue;
        const value = variant[field];
        if (typeof value === 'number') assert.ok(Number.isSafeInteger(value) && value > 0, `${id}: ${field}`);
        else assert.match(value, /^[1-9]\d*(?:\.\d+)?[KM]$/, `${id}: ${field}`);
      }
      if (variant.extendedContextTokens) {
        assert.ok(typeof variant.contextTokens === 'number' && variant.extendedContextTokens > variant.contextTokens, id);
        assert.ok(entry.note && entry.noteEn, `${id}: extension requires scope notes`);
      }
      for (const field of ['parameters', 'activeParameters']) if (variant[field]) assert.match(variant[field], /^≈?[1-9]\d*(?:\.\d+)?[MBT]$/, id);
      if (variant.activeParameters) assert.ok(variant.parameters && size(variant.activeParameters) <= size(variant.parameters), id);
      for (const field of ['input', 'output']) if (variant[field]) {
        assert.ok(variant[field].length > 0 && new Set(variant[field]).size === variant[field].length, id);
        variant[field].forEach(type => assert.ok(types.has(type), `${id}: ${type}`));
      }
      if (variant.video) {
        assert.ok(variant.output.includes('video'), id);
        const video = variant.video;
        for (const key of Object.keys(video)) assert.ok(['maxDurationSeconds', 'resolutions', 'upscaledResolutions', 'frameRates', 'audio'].includes(key), `${id}: ${key}`);
        if (video.maxDurationSeconds !== undefined) assert.ok(Number.isFinite(video.maxDurationSeconds) && video.maxDurationSeconds > 0, id);
        for (const resolution of [...(video.resolutions || []), ...(video.upscaledResolutions || [])]) assert.match(resolution, /^(?:[1-9]\d*p|[1-9]\d*K|[1-9]\d*×[1-9]\d*)$/, id);
        if (video.frameRates) for (const fps of video.frameRates) assert.ok(Number.isFinite(fps) && fps > 0, id);
        if (video.audio) {
          assert.ok(['native', 'silent'].includes(video.audio), id);
          assert.equal(variant.output.includes('audio'), video.audio === 'native', id);
        }
      }
    }
  }
});

test('research configurations, API versions, family variants, and extensions stay distinct', () => {
  const variants = id => specs.entries[id].variants;
  assert.equal(variants('gemini-4-argon')[0].contextTokens, 1048576);
  assert.equal(variants('gemini-4-argon')[0].inputTokens, undefined, 'Unified context is not a separate input allowance');
  assert.equal(variants('gemini-4-argon')[0].outputTokens, 65536, 'Do not replace the default synchronous limit with conditional long-decode capacity');
  assert.match(specs.entries['gemini-4-argon'].noteEn, /thinking and output together/);
  assert.equal(variants('muse-wonder')[0].basis, 'api');
  assert.equal(variants('muse-wonder')[1].basis, 'paper', 'Full has a model card, not public API documentation');
  assert.equal(variants('muse-wonder')[1].outputTokens, undefined);
  assert.equal(variants('gpt-4o')[0].name, 'gpt-4o-2024-08-06');
  assert.equal(variants('gpt-4o')[0].parameters, undefined);
  assert.equal(variants('gpt-1')[0].trainingTokens, 512);
  assert.ok(variants('transformer').every(variant => !variant.contextTokens && variant.basis === 'paper'));
  assert.equal(variants('gemini-3-8-flash')[0].contextTokens, undefined);
  assert.equal(variants('gemini-3-8-flash')[0].inputTokens, 1048576);
  assert.equal(variants('qwen-3')[0].contextTokens, 32768);
  assert.equal(variants('qwen-3')[0].extendedContextTokens, 131072);
  assert.deepEqual(Array.from(variants('llama-4'), variant => variant.contextTokens), ['10M', '1M']);
  assert.deepEqual(Array.from(variants('qwen-3-8')[0].input), ['text']);
  assert.deepEqual(Array.from(variants('deepseek-v4-pro-0813')[0].input), ['text']);
  assert.equal(specs.entries['deepseek-v4'], undefined, 'Current API limits must not silently backfill the original preview');
  assert.equal(variants('nemotron-3-nano')[0].activeParameters, '3.5B');
  assert.deepEqual(Array.from(variants('nemotron-3-5-vl-bolt'), variant => variant.contextTokens), ['1M', '256K']);
  assert.equal(specs.entries['nemotron-3-5-vl-bolt'].cardScope, 'variant', 'Family specifications must identify their individual model');
  assert.equal(variants('reflection-beam-1')[0].basis, 'api');
  assert.equal(variants('reflection-beam-1')[0].outputTokens, '128K');
  assert.equal(specs.entries['deepseek-v4-1-flash'].cardScope, 'snapshot');
  assert.match(variants('deepseek-v4-1-flash')[0].name, /1017/);
  assert.equal(variants('kling-4')[0].video.maxDurationSeconds, 30, 'Single-generation duration excludes announced extensions');
  assert.equal(variants('kling-4')[0].video.resolutions, undefined, 'Announced 4K is not silently treated as generally available');
  assert.equal(variants('kling-4')[0].contextTokens, undefined, 'Prompt input size is not a multimodal context window');
});
