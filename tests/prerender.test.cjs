const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { createHash } = require('node:crypto');

const root = path.join(__dirname, '..');
const sourceRoot = path.join(root, 'src');
const seo = require(path.join(sourceRoot, 'seo.js'));
const escape = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const modules = Promise.all(['seo.mjs', 'prerender.mjs'].map(file => import(pathToFileURL(path.join(root, 'scripts', file)).href)));

for (const language of ['zh', 'en']) {
  test(`${language} static timelines expose every record, precise date and public source without JavaScript`, async () => {
    const [{ renderPage, PAGE_FILES }, { loadCatalog, prerenderPage }] = await modules;
    const window = await loadCatalog();
    for (const page of ['models', 'agents', 'hardware', 'technology']) {
      const source = fs.readFileSync(path.join(sourceRoot, PAGE_FILES[page]), 'utf8');
      const html = prerenderPage(renderPage(source, { page, language, seo }), { page, language, window });
      const raw = window.ATLAS_CATALOG.sections[page].data;
      const articles = [...html.matchAll(/<article\b[^>]*id="release-([^"]+)"[^>]*>[\s\S]*?<\/article>/g)];
      assert.equal(articles.length, raw.releases.length, page);
      assert.equal(new Set(articles.map(match => match[1])).size, raw.releases.length, `${page}: no duplicate records`);
      assert.match(html, new RegExp(`id="release-total">${raw.releases.length}<`), page);
      assert.match(html, new RegExp(`id="company-total">${raw.companies.length}<`), page);
      const dates = [];
      for (const [article, id] of articles) {
        const original = raw.releases.find(entry => entry.id === id);
        const entry = language === 'en' ? { ...original, ...(original.en || window.MODEL_ATLAS_EN?.[id]) } : original;
        assert.ok(article.includes(escape(entry.name)), `${page}/${id}: name`);
        assert.ok(article.includes(escape(entry.summary)), `${page}/${id}: readable summary`);
        assert.ok(article.includes(`datetime="${original.date}"`), `${page}/${id}: exact date precision`);
        assert.ok(article.includes(`href="${escape(entry.sources[0].url)}"`), `${page}/${id}: usable source`);
        assert.doesNotMatch(article, /<button\b/, `${page}/${id}: links work without scripts`);
        dates.push(original.date);
      }
      assert.deepEqual(dates, [...dates].sort().reverse(), `${page}: latest first`);
      assert.doesNotMatch(html, /请启用 JavaScript|Enable JavaScript to (?:browse|explore)/);
    }
  });

  test(`${language} static Explore keeps every unique event with its category and source`, async () => {
    const [{ renderPage }, { loadCatalog, prerenderPage }] = await modules;
    const window = await loadCatalog();
    const source = fs.readFileSync(path.join(sourceRoot, 'explore.html'), 'utf8');
    const html = prerenderPage(renderPage(source, { page: 'explore', language, seo }), { page: 'explore', language, window });
    const articles = [...html.matchAll(/<article\b[^>]*data-entry-key="([^"]+)"[^>]*>[\s\S]*?<\/article>/g)];
    assert.equal(articles.length, window.ATLAS_CATALOG.events.length);
    assert.equal(new Set(articles.map(match => match[1])).size, articles.length);
    for (const [article, key] of articles) {
      const entry = window.ATLAS_CATALOG.events.find(entry => entry.key === key);
      const text = window.ATLAS_CATALOG.text(entry, language);
      assert.ok(article.includes(escape(text.name)), `${key}: name`);
      assert.ok(article.includes(escape(text.summary)), `${key}: summary`);
      assert.ok(article.includes(`href="${escape(text.sources[0].url)}"`), `${key}: source`);
      for (const section of entry.sections) assert.ok(article.includes(`data-category="${section}"`), `${key}: ${section}`);
    }
    assert.ok(!articles.some(match => match[1] === 'models:transformer'), 'Transformer is counted only once');
    assert.ok(articles.some(match => match[1] === 'technology:transformer'));
    assert.doesNotMatch(html, /请启用 JavaScript|Enable JavaScript to (?:browse|explore)/);
  });
}

test('prerendered content escapes source text and preserves the script enhancement containers', async () => {
  const [{ renderPage }, { loadCatalog, prerenderPage }] = await modules;
  const window = await loadCatalog();
  const entry = window.MODEL_ATLAS.releases[0];
  entry.summary = '<img src=x onerror=alert(1)> & "quoted"';
  const source = fs.readFileSync(path.join(sourceRoot, 'index.html'), 'utf8');
  const html = prerenderPage(renderPage(source, { page: 'models', language: 'zh', seo }), { page: 'models', language: 'zh', window });
  assert.ok(html.includes(escape(entry.summary)));
  assert.ok(!html.includes(entry.summary));
  for (const id of ['timeline', 'year-nav', 'results-count', 'detail-dialog']) assert.equal((html.match(new RegExp(`id="${id}"`, 'g')) || []).length, 1);
  assert.match(html, /<script src="app\.js" defer>/);
});

test('local font faces use small CSS, separate unicode ranges and content-versioned WOFF2 files', () => {
  const css = fs.readFileSync(path.join(sourceRoot, 'assets/noto-sans-sc.css'), 'utf8');
  assert.ok(Buffer.byteLength(css) < 20000, 'Font CSS remains small and non-blocking');
  assert.doesNotMatch(css, /data:|https?:/, 'No embedded font or external font service');
  const faces = [...css.matchAll(/@font-face\s*\{([\s\S]*?)\}/g)].map(match => match[1]);
  assert.equal(faces.length, 2);
  const sets = faces.map(face => {
    const [, filename, version] = /url\("([^"?]+)\?v=([a-f0-9]{12})"\)/.exec(face);
    const body = fs.readFileSync(path.join(sourceRoot, 'assets', filename));
    assert.equal(body.subarray(0, 4).toString(), 'wOF2');
    assert.equal(createHash('sha256').update(body).digest('hex').slice(0, 12), version, `${filename}: cache invalidation`);
    assert.match(face, /font-display:\s*swap/);
    assert.match(face, /font-weight:\s*100 900/);
    const points = new Set();
    for (const [, first, last] of face.matchAll(/U\+([\dA-F]+)(?:-([\dA-F]+))?/g)) {
      for (let point = parseInt(first, 16); point <= parseInt(last || first, 16); point++) points.add(point);
    }
    assert.ok(points.size > 0);
    return points;
  });
  assert.ok(sets[0].has('A'.codePointAt(0)));
  for (const symbol of ['✓', '≈', '≤', '≥']) assert.ok(sets[0].has(symbol.codePointAt(0)), `${symbol}: English interface symbols use the small font`);
  assert.ok(!sets[0].has('中'.codePointAt(0)));
  assert.ok(sets[1].has('中'.codePointAt(0)));
  assert.ok(![...sets[0]].some(point => sets[1].has(point)), 'Unicode ranges never overlap');
});
