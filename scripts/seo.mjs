// Static localization and metadata share one URL policy with the sitemap.
// No DOM or third-party packages are required at build time.
export const PAGE_FILES = Object.freeze({
  models: 'index.html',
  agents: 'agents.html',
  hardware: 'hardware.html',
  technology: 'technology.html',
  explore: 'explore.html',
  about: 'about.html',
});

const DEFAULT_ORIGIN = 'https://ai.taifua.com';
const LANGUAGES = Object.freeze({ zh: 'zh-CN', en: 'en' });
const VOID_ELEMENTS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const ENTITY_NAMES = Object.freeze({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u00a0' });

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function decodeHTML(value) {
  return value.replace(/&(#(?:x[\da-f]+|\d+)|[a-z]+);/gi, (entity, name) => {
    if (name[0] !== '#') return ENTITY_NAMES[name] ?? entity;
    const code = name[1].toLowerCase() === 'x' ? parseInt(name.slice(2), 16) : Number(name.slice(1));
    return code > 0 && code <= 0x10ffff && !(code >= 0xd800 && code <= 0xdfff) ? String.fromCodePoint(code) : '\ufffd';
  });
}

function siteBase(origin = DEFAULT_ORIGIN) {
  const url = new URL(origin);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash) {
    throw new TypeError('SEO origin must be an HTTP(S) URL without credentials, a query, or a fragment.');
  }
  // A path prefix also permits previews on static hosts such as GitHub Pages.
  return url.href.replace(/\/+$/, '');
}

function validatePage(page, language) {
  if (!Object.hasOwn(PAGE_FILES, page)) throw new TypeError(`Unknown SEO page: ${page}`);
  if (!Object.hasOwn(LANGUAGES, language)) throw new TypeError(`Unknown SEO language: ${language}`);
}

/** Canonical path; the two homepages use directory URLs, not index.html. */
export function pagePath(page, language = 'zh') {
  validatePage(page, language);
  return `${language === 'en' ? '/en/' : '/'}${page === 'models' ? '' : PAGE_FILES[page]}`;
}

function pageURL(base, page, language) {
  return `${base}${pagePath(page, language)}`;
}

function alternatives(base, page) {
  return [
    ['zh-CN', pageURL(base, page, 'zh')],
    ['en', pageURL(base, page, 'en')],
    ['x-default', pageURL(base, page, 'zh')],
  ];
}

// Tokenize tags without treating a quoted `>` or a script string as markup.
// The source files are valid, authored HTML; this is not an HTML sanitizer.
function tokenize(source) {
  const tokens = [];
  let cursor = 0;
  while (cursor < source.length) {
    const opening = source.indexOf('<', cursor);
    if (opening < 0) {
      tokens.push({ raw: source.slice(cursor) });
      break;
    }
    if (opening > cursor) tokens.push({ raw: source.slice(cursor, opening) });
    if (source.startsWith('<!--', opening)) {
      const end = source.indexOf('-->', opening + 4);
      cursor = end < 0 ? source.length : end + 3;
      tokens.push({ raw: source.slice(opening, cursor) });
      continue;
    }
    if (!/^<\/?[a-z!]/i.test(source.slice(opening, opening + 3))) {
      tokens.push({ raw: '<' });
      cursor = opening + 1;
      continue;
    }
    let quote = '';
    let end = opening + 1;
    for (; end < source.length; end += 1) {
      const character = source[end];
      if (quote) {
        if (character === quote) quote = '';
      } else if (character === '"' || character === "'") quote = character;
      else if (character === '>') break;
    }
    cursor = Math.min(end + 1, source.length);
    const raw = source.slice(opening, cursor);
    const tag = raw.match(/^<(\/)?([a-z][\w:-]*)\b/i);
    if (!tag) {
      tokens.push({ raw });
      continue;
    }
    const token = { raw, name: tag[2].toLowerCase(), closing: Boolean(tag[1]), attrs: new Map() };
    if (!token.closing) {
      const attributes = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
      const body = raw.slice(tag[0].length).replace(/\/?\s*>$/, '');
      for (const match of body.matchAll(attributes)) {
        token.attrs.set(match[1].toLowerCase(), {
          value: decodeHTML(match[2] ?? match[3] ?? match[4] ?? ''),
          start: tag[0].length + match.index,
          end: tag[0].length + match.index + match[0].length,
        });
      }
    }
    tokens.push(token);
    if (!token.closing && ['script', 'style', 'textarea', 'title'].includes(token.name)) {
      const close = new RegExp(`</${token.name}\\s*>`, 'ig');
      close.lastIndex = cursor;
      const match = close.exec(source);
      if (match) {
        tokens.push({ raw: source.slice(cursor, match.index) });
        cursor = match.index;
      }
    }
  }
  return tokens;
}

function attribute(token, name) {
  return token.attrs?.get(name)?.value;
}

function updateAttributes(token, updates) {
  const edits = [];
  const append = [];
  for (const [name, value] of Object.entries(updates)) {
    const replacement = `${name}="${escapeHTML(value)}"`;
    const existing = token.attrs.get(name);
    if (existing) edits.push({ ...existing, replacement });
    else append.push(replacement);
  }
  let raw = token.raw;
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    raw = raw.slice(0, edit.start) + edit.replacement + raw.slice(edit.end);
  }
  return append.length ? raw.replace(/(\/?\s*>)$/, (_, closing) => ` ${append.join(' ')}${closing}`) : raw;
}

function closingIndex(tokens, start) {
  const name = tokens[start].name;
  if (VOID_ELEMENTS.has(name) || /\/\s*>$/.test(tokens[start].raw)) return start;
  let depth = 1;
  for (let index = start + 1; index < tokens.length; index += 1) {
    if (tokens[index].name !== name) continue;
    depth += tokens[index].closing ? -1 : /\/\s*>$/.test(tokens[index].raw) ? 0 : 1;
    if (!depth) return index;
  }
  throw new Error(`Unclosed <${name}> in page source.`);
}

function localLink(href, language) {
  // Relative to the root source directory, or to <base href="../"> in /en/.
  // Only rewrite known page files; sources and other external links stay intact.
  const match = href.match(/^(?:\.\/|\/)?(?:en\/)?([^/?#]+\.html)([?#].*)?$/);
  if (!match || !Object.values(PAGE_FILES).includes(match[1])) return href;
  const target = new URL(`${match[1]}${match[2] || ''}`, 'https://atlas.invalid/');
  target.searchParams.delete('lang');
  return `${language === 'en' ? 'en/' : ''}${match[1]}${target.search}${target.hash}`;
}

function metadata(page, language, base, seo) {
  const data = seo?.[page]?.[language];
  if (!data || typeof data.title !== 'string' || !data.title.trim() || typeof data.description !== 'string' || !data.description.trim()) {
    throw new TypeError(`Missing SEO title or description for ${page}/${language}.`);
  }
  if (!(typeof data.keywords === 'string' || (Array.isArray(data.keywords) && data.keywords.every(value => typeof value === 'string')))) {
    throw new TypeError(`Missing SEO keywords for ${page}/${language}.`);
  }
  const keywords = Array.isArray(data.keywords) ? data.keywords.join(', ') : data.keywords;
  const canonical = pageURL(base, page, language);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite', '@id': `${base}/#website`,
        name: 'Model Atlas', url: `${base}/`, inLanguage: ['zh-CN', 'en'],
      },
      {
        '@type': page === 'about' ? 'AboutPage' : 'CollectionPage',
        '@id': `${canonical}#webpage`, url: canonical, name: data.title,
        description: data.description, inLanguage: LANGUAGES[language],
        isPartOf: { '@id': `${base}/#website` },
      },
    ],
  };
  const json = JSON.stringify(schema).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  const meta = (name, value, attributeName = 'name') => `  <meta ${attributeName}="${name}" content="${escapeHTML(value)}">`;
  return [
    '  <!-- Model Atlas metadata -->',
    `  <title>${escapeHTML(data.title)}</title>`,
    meta('description', data.description),
    meta('keywords', keywords),
    `  <link rel="canonical" href="${escapeHTML(canonical)}">`,
    ...alternatives(base, page).map(([lang, url]) => `  <link rel="alternate" hreflang="${lang}" href="${escapeHTML(url)}">`),
    meta('og:type', 'website', 'property'),
    meta('og:site_name', 'Model Atlas', 'property'),
    meta('og:title', data.title, 'property'),
    meta('og:description', data.description, 'property'),
    meta('og:url', canonical, 'property'),
    meta('og:locale', language === 'en' ? 'en_US' : 'zh_CN', 'property'),
    meta('og:locale:alternate', language === 'en' ? 'zh_CN' : 'en_US', 'property'),
    meta('twitter:card', 'summary'),
    meta('twitter:title', data.title),
    meta('twitter:description', data.description),
    meta('twitter:url', canonical),
    `  <script id="atlas-structured-data" type="application/ld+json">${json}</script>`,
    '  <!-- /Model Atlas metadata -->',
  ].join('\n');
}

/**
 * Render a complete localized source page, ready for root/ or root/en/.
 * `seo` is the plain ATLAS_SEO object from src/seo.js. Inputs are never mutated.
 */
export function renderPage(source, { page, language = 'zh', origin = DEFAULT_ORIGIN, seo } = {}) {
  validatePage(page, language);
  if (typeof source !== 'string') throw new TypeError('Page source must be an HTML string.');
  const base = siteBase(origin);
  const headMetadata = metadata(page, language, base, seo);
  // Permit rebuilding rendered HTML without duplicated generated metadata.
  const clean = source.replace(/[ \t]*<!-- Model Atlas metadata -->[\s\S]*?<!-- \/Model Atlas metadata -->\n?/g, '');
  const tokens = tokenize(clean);
  const output = [];
  let inHead = false;
  let foundHead = false;
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (!token.name) {
      output.push(token.raw);
      continue;
    }
    if (token.name === 'head') {
      inHead = !token.closing;
      output.push(token.raw);
      if (inHead) {
        foundHead = true;
        // charset remains first; base precedes every relative asset URL.
        output.push(`\n  <meta charset="UTF-8">${language === 'en' ? '\n  <base href="../">' : ''}\n${headMetadata}`);
      }
      continue;
    }
    if (token.closing) {
      output.push(token.raw);
      continue;
    }
    if (inHead) {
      const metaName = (attribute(token, 'name') || attribute(token, 'property') || '').toLowerCase();
      const relation = (attribute(token, 'rel') || '').toLowerCase().split(/\s+/);
      if (token.name === 'base' || (token.name === 'meta' && (token.attrs.has('charset') || ['description', 'keywords'].includes(metaName) || /^(og:|twitter:)/.test(metaName)))) continue;
      if (token.name === 'link' && (relation.includes('canonical') || (relation.includes('alternate') && token.attrs.has('hreflang')))) continue;
      if (token.name === 'title' || (token.name === 'script' && attribute(token, 'id') === 'atlas-structured-data')) {
        index = closingIndex(tokens, index);
        continue;
      }
    }
    const updates = {};
    if (token.name === 'html') updates.lang = LANGUAGES[language];
    for (const [prefix, target] of [['aria', 'aria-label'], ['placeholder', 'placeholder'], ['title', 'title']]) {
      const translated = attribute(token, `data-${prefix}-${language}`);
      if (translated !== undefined) updates[target] = translated;
    }
    const href = attribute(token, 'href');
    const selectedLanguage = attribute(token, 'data-language');
    if (href !== undefined && Object.hasOwn(LANGUAGES, selectedLanguage || '')) {
      updates.href = `${selectedLanguage === 'en' ? 'en/' : ''}${PAGE_FILES[page]}`;
    } else if (href?.startsWith('#') && language === 'en') {
      updates.href = `en/${PAGE_FILES[page]}${href}`;
    } else if (href !== undefined && token.attrs.has('data-local')) {
      updates.href = localLink(href, language);
    }
    if (token.name === 'form' && token.attrs.has('action')) updates.action = localLink(attribute(token, 'action'), language);
    output.push(updateAttributes(token, updates));
    const translated = attribute(token, `data-${language}`);
    if (translated !== undefined && token.attrs.has('data-zh') && token.attrs.has('data-en') && !VOID_ELEMENTS.has(token.name)) {
      output.push(escapeHTML(translated));
      index = closingIndex(tokens, index);
      output.push(tokens[index].raw);
    }
  }
  if (!foundHead) throw new Error('Page source requires a <head> element.');
  return output.join('');
}

/** Twelve canonical URLs, each with reciprocal language alternatives. */
export function renderSitemap(origin = DEFAULT_ORIGIN) {
  const base = siteBase(origin);
  const entries = [];
  for (const page of Object.keys(PAGE_FILES)) {
    for (const language of Object.keys(LANGUAGES)) {
      entries.push([
        '  <url>',
        `    <loc>${escapeHTML(pageURL(base, page, language))}</loc>`,
        ...alternatives(base, page).map(([lang, url]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${escapeHTML(url)}"/>`),
        '  </url>',
      ].join('\n'));
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`;
}

export function renderRobots(origin = DEFAULT_ORIGIN) {
  return `User-agent: *\nAllow: /\nSitemap: ${siteBase(origin)}/sitemap.xml\n`;
}
