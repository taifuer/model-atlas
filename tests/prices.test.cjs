const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = { window: {} };
for (const file of ['data.js', 'data-prices.js']) vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'src', file), 'utf8'), context);
const { MODEL_ATLAS: models, MODEL_ATLAS_PRICES: prices } = context.window;

test('documented rates retain currency, units, exact versions, and first-party evidence', () => {
  const ids = new Set(models.releases.map(model => model.id));
  const hosts = new Set(['docs.inceptionlabs.ai', 'www.inceptionlabs.ai', 'www.minimax.io', 'www.liquid.ai', 'dev.meta.ai', 'docs.mistral.ai', 'www.anthropic.com', 'blog.google', 'developers.openai.com', 'platform.claude.com', 'ai.google.dev', 'api-docs.deepseek.com', 'docs.x.ai', 'docs.z.ai', 'www.qwencloud.com', 'docs.qwencloud.com', 'platform.minimax.io', 'mimo.mi.com']);
  assert.equal(prices.unitTokens, 1000000);
  assert.equal(prices.inputType, 'uncached-text');
  assert.equal(prices.outputType, 'text');
  assert.equal(new Date(prices.checkedAt + 'T00:00:00Z').toISOString().slice(0, 10), prices.checkedAt);
  assert.ok(prices.checkedAt <= models.updatedAt);
  for (const [id, entry] of Object.entries(prices.entries)) {
    assert.ok(ids.has(id), `Orphaned price: ${id}`);
    assert.ok(entry.variants.length > 0, id);
    assert.equal(new Set(entry.variants.map(variant => variant.name)).size, entry.variants.length, id);
    if (entry.note) assert.ok(entry.noteEn, id);
    for (const variant of entry.variants) {
      assert.ok(variant.name && ['USD', 'CNY'].includes(variant.currency), id);
      assert.ok(variant.sources.length > 0 && variant.tiers.length > 0, id);
      if (variant.note) assert.ok(variant.noteEn, id);
      if (variant.archived) assert.ok(variant.note && variant.noteEn, id);
      for (const source of variant.sources) {
        const url = new URL(source);
        assert.equal(url.protocol, 'https:');
        assert.ok(hosts.has(url.hostname), source);
      }
      for (const tier of variant.tiers) {
        for (const key of ['input', 'output']) assert.ok(Number.isFinite(tier[key]) && tier[key] >= 0, `${id}: ${key}`);
        assert.ok(tier.label && tier.labelEn, id);
        if (tier.input === 0 || tier.output === 0) {
          assert.equal(id, 'glm-4-7-flash', 'Zero prices require explicit free-API evidence');
          assert.match(entry.note, /免费 API/);
        }
        if (tier.validUntil) {
          assert.equal(new Date(tier.validUntil + 'T00:00:00Z').toISOString().slice(0, 10), tier.validUntil);
          assert.ok(tier.validUntil >= prices.checkedAt && variant.note && variant.noteEn, id);
        }
      }
    }
    const first = entry.variants[0];
    for (const variant of entry.variants) for (const tier of variant.tiers) {
      // A "from" chip must be a real pair with neither dimension higher.
      assert.equal(variant.currency, first.currency, id);
      assert.ok(first.tiers[0].input <= tier.input && first.tiers[0].output <= tier.output, id);
    }
  }
});

test('pricing distinguishes context tiers, promotions, retired models, and hosted aliases', () => {
  const variants = id => prices.entries[id].variants;
  assert.equal(variants('gpt-6-sol-luna')[0].name, 'gpt-6-luna');
  assert.equal(variants('gpt-6-sol-luna')[0].tiers[0].input, 0.1);
  assert.equal(variants('gpt-6-sol-luna')[0].tiers[0].output, 0.5);
  assert.equal(variants('gpt-6-astra')[0].tiers[1].input, 20);
  assert.equal(variants('gpt-6-astra')[0].tiers[1].output, 75);
  assert.equal(variants('o3-o4-mini').find(variant => variant.name === 'o3-2025-04-16').tiers[0].input, 2, 'Do not use Flex rate');
  assert.equal(variants('gemini-3-8-flash')[0].tiers[0].validUntil, '2026-12-31');
  assert.equal(variants('gemini-3-1')[0].tiers[1].output, 18);
  assert.equal(variants('gpt-4-5')[0].archived, true);
  assert.equal(variants('deepseek-v4-1-flash')[0].tiers[0].input, 0.15, 'Do not use cache-hit rate');
  assert.equal(variants('deepseek-v4-1-flash')[0].tiers[1].input, 0.3);
  assert.equal(prices.entries['deepseek-v4'], undefined, 'A current alias must not backfill preview pricing');
  assert.equal(prices.entries['qwen-3-8-max'], undefined, 'Current Max rates follow the 0902 update');
  assert.equal(variants('minimax-m3')[0].tiers[0].input, 0.3, 'Use effective Standard price, not crossed-out or Priority rate');
  assert.equal(variants('mimo-v2-6')[0].currency, 'USD');
  assert.equal(variants('mimo-v2-6')[0].tiers[0].input, 0.14, 'Do not mix domestic CNY or Batch prices');
});


test('new availability and API replacements preserve variant and historical price scope', () => {
  const wonder = prices.entries['muse-wonder'];
  assert.equal(wonder.variants.length, 1, 'Wonder Full has no public per-token API price');
  assert.equal(wonder.variants[0].name, 'muse-wonder-1.0');
  assert.equal(wonder.cardScope, 'variant');
  assert.equal(wonder.variants[0].tiers[0].input, 4);
  assert.equal(wonder.variants[0].tiers[0].output, 20);
  const argon = prices.entries['gemini-4-argon'].variants[0];
  assert.equal(argon.tiers.length, 1, 'Future December pricing belongs in the dated note, not current price tiers');
  assert.equal(argon.announced, undefined);
  assert.equal(argon.tiers[0].validUntil, '2026-11-30');
  assert.match(argon.noteEn, /December 1/);
  for (const id of ['gemini-3-5-flash', 'gemini-3-7-flash', 'mimo-v2-5']) {
    for (const variant of prices.entries[id].variants) {
      assert.equal(variant.archived, true, id);
      assert.match(variant.noteEn, /routes?(?: requests)? to/, id);
      assert.ok(variant.sources.some(url => /changelog|deprecate/.test(url)), id);
    }
  }
  assert.equal(prices.entries['gemini-3-5-flash'].variants[0].tiers[0].input, 1.5, 'Retain historical price, not replacement-model price');
  assert.match(prices.entries['mimo-v2-5'].variants[0].noteEn, /October 14.*18:00.*October 21.*10:00/);
});
