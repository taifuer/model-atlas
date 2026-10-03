const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..', 'src');
const context = { window: {}, URL };
for (const name of ['data.js', 'data-en.js', 'data-agents.js', 'data-hardware.js', 'data-technology.js', 'icons.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(root, name), 'utf8'), context);
}
const icons = context.window.ATLAS_ICONS;

test('all organizations and releases resolve to a bundled, passive image', () => {
  const used = new Set();
  for (const [page, data] of [['models', context.window.MODEL_ATLAS], ['agents', context.window.AGENT_ATLAS], ['hardware', context.window.HARDWARE_ATLAS], ['technology', context.window.TECHNOLOGY_ATLAS]]) {
    for (const company of data.companies) used.add(icons.company(company.id));
    for (const release of data.releases) used.add(icons.release(release, page));
  }
  for (const file of used) {
    assert.match(file, /^assets\/icons\/[a-z0-9-]+\.(svg|png|jpg|ico)$/);
    const body = fs.readFileSync(path.join(root, file));
    if (file.endsWith('.png')) { assert.equal(body.subarray(0, 8).toString('hex'), '89504e470d0a1a0a'); continue; }
    if (file.endsWith('.jpg')) { assert.equal(body.subarray(0, 3).toString('hex'), 'ffd8ff'); continue; }
    if (file.endsWith('.ico')) { assert.equal(body.subarray(0, 4).toString('hex'), '00000100'); continue; }
    const svg = body.toString('utf8');
    assert.match(svg, /<svg\b[^>]*viewBox="[^"]+"/);
    assert.doesNotMatch(svg, /<(?:script|foreignObject|iframe|image)\b|\bon[a-z]+\s*=|@import/i);
    for (const [, href] of svg.matchAll(/(?:href|xlink:href)\s*=\s*["']([^"']+)/g)) assert.match(href, /^#/);
    for (const [, url] of svg.matchAll(/url\(\s*["']?([^\s)'";]+)/g)) assert.match(url, /^#/);
  }
});

test('distinct products keep their own marks and unknown products fall back to their organization', () => {
  const release = (id, company) => icons.release({ id, company });
  assert.notEqual(release('claude-4', 'anthropic'), icons.company('anthropic'));
  assert.notEqual(release('gemini-1', 'google'), release('gemma-1', 'google'));
  assert.notEqual(release('devin', 'cognition'), icons.company('cognition'));
  assert.notEqual(release('codex-cli', 'openai'), release('codex', 'openai'));
  assert.equal(release('pi-agent', 'pi'), 'assets/icons/pi-agent.svg');
  assert.equal(release('new-model', 'openai'), icons.company('openai'));
  assert.equal(release('unknown', 'unknown'), '');
});

test('papers retain project and organization marks across timelines', () => {
  const papers = context.window.TECHNOLOGY_ATLAS.releases;
  const transformer = papers.find(entry => entry.id === 'transformer');
  const alexnet = papers.find(entry => entry.id === 'alexnet');
  assert.equal(icons.release(transformer, 'technology'), 'assets/icons/google-color.svg');
  assert.equal(icons.release(transformer, 'models'), 'assets/icons/google-color.svg');
  assert.equal(icons.release(transformer), icons.release(transformer, 'models'));
  assert.equal(icons.company('google'), 'assets/icons/google-color.svg');
  assert.equal(icons.release(alexnet, 'technology'), 'assets/icons/neurips.ico');

  for (const id of ['sglang']) {
    const paper = papers.find(entry => entry.id === id);
    assert.equal(paper.kind, 'paper');
    assert.equal(icons.release(paper, 'technology'), `assets/icons/${id}.png`);
    assert.equal(icons.release(paper, 'models'), `assets/icons/${id}.png`);
    assert.equal(icons.release({ ...paper, kind: 'release' }, 'technology'), `assets/icons/${id}.png`, 'Citing a paper does not turn a software release into a paper');
  }
});

test('research projects with generated GitHub avatars use the paper platform', () => {
  const papers = context.window.TECHNOLOGY_ATLAS.releases;
  for (const company of ['flashattention', 'state-spaces']) {
    assert.equal(icons.company(company), 'assets/icons/arxiv.svg');
    const entries = papers.filter(entry => entry.company === company);
    assert.ok(entries.length > 0);
    for (const entry of entries) {
      assert.equal(entry.kind, 'paper');
      assert.ok(entry.sources.some(source => new URL(source.url).hostname === 'arxiv.org'));
      assert.equal(icons.release(entry, 'technology'), 'assets/icons/arxiv.svg', entry.id);
      assert.equal(icons.release(entry, 'explore'), 'assets/icons/arxiv.svg', entry.id);
    }
  }
  assert.equal(icons.release(papers.find(entry => entry.id === 'flashattention-4')), 'assets/icons/arxiv.svg');
});

test('product and family marks take priority over paper sources', () => {
  const neurips = { url: 'https://papers.neurips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html' };
  const arxiv = { url: 'https://arxiv.org/abs/1706.03762' };
  const website = { url: 'https://example.com/paper' };
  for (const [id, mark] of [['tensorflow', 'tensorflow.svg'], ['gemini-1', 'gemini-color.svg']]) {
    const paper = { id, company: 'google', kind: 'paper', sources: [website, neurips, arxiv] };
    assert.equal(icons.release(paper, 'technology'), `assets/icons/${mark}`);
    assert.equal(icons.release({ ...paper, sources: [website, arxiv, neurips] }, 'technology'), `assets/icons/${mark}`);
  }
  assert.equal(icons.release({ id: 'unmatched-paper', company: 'google', kind: 'paper', sources: [website] }, 'technology'), icons.company('google'), 'An unsupported platform must not acquire an unrelated source mark');
});

test('paper sources replace missing or placeholder marks without changing organization filters', () => {
  const arxiv = { url: 'https://arxiv.org/abs/1706.03762' };
  const neurips = { url: 'https://papers.neurips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html' };
  const website = { url: 'https://example.com/paper' };
  for (const company of ['stanford', 'unknown']) {
    const paper = { id: 'unmatched-paper', company, kind: 'paper', sources: [neurips, arxiv] };
    assert.equal(icons.release(paper), 'assets/icons/arxiv.svg');
    assert.equal(icons.release({ ...paper, sources: [neurips] }), 'assets/icons/neurips.ico');
    assert.equal(icons.release({ ...paper, sources: [website] }), icons.company(company));
    assert.equal(icons.release({ ...paper, kind: 'release' }), icons.company(company));
  }
  assert.equal(icons.company('stanford'), 'assets/icons/university-stanford.svg');
  const papers = context.window.TECHNOLOGY_ATLAS.releases;
  assert.equal(icons.release(papers.find(entry => entry.id === 'dpo')), 'assets/icons/arxiv.svg');
});
