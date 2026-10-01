const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { pathToFileURL } = require('node:url');

const sourceRoot = path.join(__dirname, '..', 'src');
const seo = require(path.join(sourceRoot, 'seo.js'));
const pages = ['models', 'agents', 'hardware', 'technology', 'explore', 'about'];
const languages = ['zh', 'en'];
const plain = value => JSON.parse(JSON.stringify(value));

test('the build and browser receive the same metadata without DOM or network dependencies', () => {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(sourceRoot, 'seo.js'), 'utf8'), context, { filename: 'seo.js' });
  assert.deepEqual(plain(context.window.ATLAS_SEO), plain(seo));
  assert.deepEqual(Object.keys(seo).sort(), [...pages].sort());
  assert.deepEqual(Object.keys(context.window), ['ATLAS_SEO']);
});

test('each page has distinct, complete Chinese and English metadata', () => {
  for (const language of languages) {
    const titles = new Set();
    const descriptions = new Set();
    for (const page of pages) {
      assert.deepEqual(Object.keys(seo[page]).sort(), [...languages].sort(), page);
      const metadata = seo[page][language];
      assert.deepEqual(Object.keys(metadata).sort(), ['description', 'keywords', 'title']);
      for (const field of ['title', 'description']) {
        const value = metadata[field];
        assert.equal(typeof value, 'string', `${page}/${language}/${field}`);
        assert.equal(value, value.trim(), `${page}/${language}/${field}`);
        assert.ok(value.length > 0, `${page}/${language}/${field}`);
        assert.doesNotMatch(value, /[<>\r\n]|\bundefined\b|\bTODO\b/, `${page}/${language}/${field}`);
        if (language === 'zh') assert.match(value, /[\u3400-\u9fff]/, `${page}/${field}`);
        else assert.doesNotMatch(value, /[\u3400-\u9fff]/, `${page}/${field}`);
      }
      assert.match(metadata.title, / · Model Atlas$/);
      assert.equal(metadata.title.match(/Model Atlas/g).length, 1);
      // Editorial bounds keep metadata concise; they are not search-engine display guarantees.
      assert.ok(metadata.title.length <= 80, `${page}/${language}: title is concise`);
      assert.ok(metadata.description.length >= (language === 'zh' ? 40 : 90), `${page}/${language}: description identifies the content`);
      assert.ok(metadata.description.length <= (language === 'zh' ? 160 : 240), `${page}/${language}: description stays concise`);
      assert.ok(!titles.has(metadata.title), `${page}/${language}: page-specific title`);
      assert.ok(!descriptions.has(metadata.description), `${page}/${language}: page-specific description`);
      titles.add(metadata.title);
      descriptions.add(metadata.description);
    }
  }
});

test('keywords remain short, readable topic lists without duplicates or packed phrases', () => {
  for (const page of pages) for (const language of languages) {
    const keywords = seo[page][language].keywords;
    assert.ok(Array.isArray(keywords));
    assert.ok(keywords.length >= 3 && keywords.length <= 8, `${page}/${language}`);
    const seen = new Set();
    for (const keyword of keywords) {
      assert.equal(typeof keyword, 'string');
      assert.ok(keyword && keyword === keyword.trim() && keyword.length <= 40, `${page}/${language}: ${keyword}`);
      assert.doesNotMatch(keyword, /[<>,，;；\r\n]/, `${page}/${language}: individual keyword`);
      if (language === 'en') assert.doesNotMatch(keyword, /[\u3400-\u9fff]/);
      const normalized = keyword.normalize('NFKC').toLowerCase().replace(/\s+/g, ' ');
      assert.ok(!seen.has(normalized), `${page}/${language}: duplicate ${keyword}`);
      seen.add(normalized);
    }
  }
});

const pageFiles = {
  models: 'index.html', agents: 'agents.html', hardware: 'hardware.html',
  technology: 'technology.html', explore: 'explore.html', about: 'about.html',
};
const origin = 'https://atlas.example';
const expectedPath = (page, language) => `${language === 'en' ? '/en/' : '/'}${page === 'models' ? '' : pageFiles[page]}`;
const decode = value => value.replace(/&#(x[0-9a-f]+|\d+);|&(amp|quot|apos|lt|gt);/gi, (entity, number, name) => number ? String.fromCodePoint(number[0].toLowerCase() === 'x' ? parseInt(number.slice(1), 16) : Number(number)) : { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' }[name.toLowerCase()]);
const attributes = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(([, name, double, single]) => [name.toLowerCase(), decode(double ?? single)]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(match => attributes(match[0]));
const textContent = html => decode(html.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();
const canonicalPath = pathname => pathname.replace(/\/index\.html$/, '/');
const renderers = () => import(pathToFileURL(path.join(__dirname, '..', 'scripts', 'seo.mjs')).href);

for (const language of languages) {
  test(`the six static ${language} editions publish their own metadata and language alternatives`, async () => {
    const { renderPage } = await renderers();
    for (const page of pages) {
      const source = fs.readFileSync(path.join(sourceRoot, pageFiles[page]), 'utf8');
      const html = renderPage(source, { page, language, origin, seo });
      const metadata = seo[page][language];
      assert.equal(tags(html, 'html')[0].lang, language === 'en' ? 'en' : 'zh-CN', `${page}: document language`);
      const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
      assert.equal(titles.length, 1, `${page}: exactly one title`);
      assert.equal(textContent(titles[0][1]), metadata.title, page);
      const meta = tags(html, 'meta');
      const values = key => meta.filter(tag => tag.name === key || tag.property === key).map(tag => tag.content);
      for (const [field, expected] of [
        ['description', metadata.description], ['keywords', metadata.keywords.join(', ')],
        ['og:title', metadata.title], ['og:description', metadata.description],
        ['og:url', origin + expectedPath(page, language)],
        ['og:locale', language === 'en' ? 'en_US' : 'zh_CN'],
        ['twitter:title', metadata.title], ['twitter:description', metadata.description],
      ]) assert.deepEqual(values(field), [expected], `${page}/${language}: ${field}`);
      assert.equal(values('twitter:card').length, 1, page);
      assert.ok(['summary', 'summary_large_image'].includes(values('twitter:card')[0]), page);
      const links = tags(html, 'link');
      assert.deepEqual(links.filter(link => link.rel === 'canonical').map(link => link.href), [origin + expectedPath(page, language)], `${page}: canonical`);
      const alternates = links.filter(link => link.rel === 'alternate' && link.hreflang);
      for (const [hreflang, target] of [['zh-CN', 'zh'], ['en', 'en'], ['x-default', 'zh']]) {
        assert.deepEqual(alternates.filter(link => link.hreflang === hreflang).map(link => link.href), [origin + expectedPath(page, target)], `${page}: ${hreflang} alternative`);
      }
    }
  });

  test(`static ${language} navigation stays in its edition and in-page links survive the base URL`, async () => {
    const { renderPage } = await renderers();
    for (const page of pages) {
      const source = fs.readFileSync(path.join(sourceRoot, pageFiles[page]), 'utf8');
      const html = renderPage(source, { page, language, origin, seo });
      const documentUrl = origin + expectedPath(page, language);
      const baseTags = tags(html, 'base');
      if (language === 'en') assert.deepEqual(baseTags.map(base => base.href), ['../'], `${page}: English shared assets base`);
      const baseUrl = baseTags[0] ? new URL(baseTags[0].href, documentUrl).href : documentUrl;
      const nav = /<nav\b[^>]*class="[^"]*\bheader-nav\b[^"]*"[^>]*>([\s\S]*?)<\/nav>/i.exec(html);
      assert.ok(nav, `${page}: primary navigation`);
      const visibleNav = textContent(nav[1]);
      if (language === 'en') assert.doesNotMatch(visibleNav, /[\u3400-\u9fff]/, `${page}: translated navigation`);
      else assert.match(visibleNav, /大模型.*智能体.*关于/, `${page}: Chinese navigation`);
      for (const link of tags(nav[1], 'a')) {
        const target = new URL(link.href, baseUrl);
        assert.equal(target.origin, origin, `${page}: internal navigation`);
        assert.equal(target.pathname.startsWith('/en/'), language === 'en', `${page}: ${link.href}`);
        assert.ok(!target.searchParams.has('lang') || target.searchParams.get('lang') === language, `${page}: consistent navigation language`);
      }
      const links = tags(html, 'a');
      const languageLinks = links.filter(link => link['data-language']);
      assert.ok(languageLinks.length >= 2, `${page}: language switch links`);
      for (const link of languageLinks) {
        const target = new URL(link.href, baseUrl);
        assert.equal(target.origin, origin);
        assert.equal(canonicalPath(target.pathname), expectedPath(page, link['data-language']), `${page}: ${link['data-language']} switch`);
      }
      const fragments = tags(source, 'a').filter(link => link.href?.startsWith('#')).map(link => link.href);
      for (const hash of fragments) {
        const candidates = links.filter(link => link.href && new URL(link.href, baseUrl).hash === hash);
        assert.ok(candidates.length, `${page}: preserve ${hash}`);
        assert.ok(candidates.some(link => canonicalPath(new URL(link.href, baseUrl).pathname) === expectedPath(page, language)), `${page}: ${hash} targets this edition`);
      }
      for (const form of tags(html, 'form').filter(form => form.action)) {
        const target = new URL(form.action, baseUrl);
        if (target.origin === origin) assert.equal(target.pathname.startsWith('/en/'), language === 'en', `${page}: form destination`);
      }
    }
  });
}

test('the sitemap lists twelve canonical editions and robots links to that sitemap', async () => {
  const { renderSitemap, renderRobots } = await renderers();
  const xml = renderSitemap(origin);
  const blocks = [...xml.matchAll(/<url\b[^>]*>([\s\S]*?)<\/url>/g)].map(match => match[1]);
  const urls = blocks.map(block => decode(/<loc>([^<]+)<\/loc>/.exec(block)?.[1] || ''));
  const expected = pages.flatMap(page => languages.map(language => origin + expectedPath(page, language)));
  assert.equal(blocks.length, pages.length * languages.length);
  assert.deepEqual(new Set(urls), new Set(expected));
  for (const url of urls) {
    assert.equal(new URL(url).search, '');
    assert.equal(new URL(url).hash, '');
  }
  const robots = renderRobots(origin);
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
  assert.doesNotMatch(robots, /^Disallow:\s*\/\s*$/m, 'The public site must not be blocked wholesale');
});
