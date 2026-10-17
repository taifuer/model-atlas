// Manual discovery only: remote documents are parsed as data, never executed.
// All observations, raw snapshots and review decisions remain in ignored research/.
import { createHash, randomUUID } from 'node:crypto';
import { readFile, writeFile, mkdir, rename, realpath, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { createOriginGate, sourceURL } from './check-sources.mjs';
import { loadCatalog } from './prerender.mjs';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const PRIVATE_ROOT = path.join(ROOT, 'research/candidate-discovery');
const hash = value => createHash('sha256').update(value).digest('hex');
const SCHEMA = 1;
const PARSER = 'candidate-v2';
const KINDS = ['rss', 'atom', 'github-atom', 'github-json', 'aa-releases', 'arena-item-list'];

function decode(text = '') {
  return text.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (raw, code) => {
    if (!code.startsWith('#')) return { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }[code.toLowerCase()];
    const point = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : Number(code.slice(1));
    return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : raw;
  });
}
const clean = text => decode(String(text).replace(/<!\[CDATA\[([^]*?)\]\]>/g, '$1')).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const attribute = (text, name) => decode(text.match(new RegExp(`\\b${name}\\s*=\\s*(["'])([^]*?)\\1`, 'i'))?.[2] || '');
const tag = (text, name) => text.match(new RegExp(`<${name}\\b[^>]*>([^]*?)<\\/${name}\\s*>`, 'i'))?.[1] || '';
const date = text => text && Number.isFinite(Date.parse(text)) ? new Date(text).toISOString() : null;
const nameKey = text => String(text).normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').trim();
const candidateID = (source, item) => hash(`${source.id}\n${source.kind.startsWith('github-') && item.version ? '' : nameKey(item.title)}\n${item.url}\n${item.version || ''}`);
const candidateFingerprint = item => hash(JSON.stringify(['title', 'url', 'version', 'publishedAt', 'publishedPeriod', 'dateMeaning', 'dateEvidence', 'configurationScope', 'prerelease', 'descriptionHash'].map(field => [field, item[field] ?? (field === 'descriptionHash' ? hash(item.description || '') : null)])));

function candidate(value, source) {
  const title = clean(value.title);
  if (!title || title.length > 1000) throw new Error('A candidate title is missing or unexpectedly long.');
  const url = sourceURL(new URL(value.url, source.url).href);
  return { publishedAt: null, publishedPeriod: null, modifiedAt: null, ...value, title, url };
}

export function parseFeed(body, source) {
  if (/<!DOCTYPE|<!ENTITY/i.test(body)) throw new Error('XML document types/entities are unsupported.');
  const atom = ['atom', 'github-atom'].includes(source.kind);
  if (!new RegExp(atom ? '<feed\\b' : '<rss\\b', 'i').test(body) || !new RegExp(atom ? '</feed\\s*>\\s*$' : '</rss\\s*>\\s*$', 'i').test(body.trim())) throw new Error(`Expected an ${atom ? 'Atom' : 'RSS'} document.`);
  const element = atom ? 'entry' : 'item';
  const blocks = [...body.matchAll(new RegExp(`<${element}\\b[^>]*>([^]*?)<\\/${element}\\s*>`, 'gi'))];
  if (!blocks.length) throw new Error('The feed contains no parseable entries; verify the endpoint or parser.');
  return blocks.map(([, block]) => {
    let url = clean(tag(block, 'link'));
    if (atom) {
      const links = [...block.matchAll(/<link\b[^>]*\/?\s*>/gi)].map(match => match[0]);
      url = attribute(links.find(link => attribute(link, 'rel') === 'alternate') || links.find(link => !attribute(link, 'rel')) || '', 'href');
    }
    if (!url) throw new Error('A feed entry has no article/release URL.');
    const publishedRaw = clean(tag(block, atom ? 'published' : 'pubDate')) || null;
    const modifiedRaw = atom ? clean(tag(block, 'updated')) || null : null;
    if (publishedRaw && !date(publishedRaw)) throw new Error(`Invalid publication date: ${publishedRaw}`);
    const title = clean(tag(block, 'title'));
    return candidate({ title, url, publishedAt: date(publishedRaw), modifiedAt: date(modifiedRaw), publishedRaw,
      dateMeaning: publishedRaw ? (source.kind === 'github-atom' ? 'release-publication' : 'article-publication') : 'unknown',
      product: source.kind === 'github-atom' ? source.name : null,
      version: source.kind === 'github-atom' ? decodeURIComponent(new URL(url, source.url).pathname.split('/releases/tag/')[1] || '') || null : null,
      description: clean(tag(block, atom ? 'content' : 'description')).slice(0, 2000),
      descriptionHash: hash(clean(tag(block, atom ? 'content' : 'description'))),
      note: source.kind === 'github-atom' && !publishedRaw ? 'The feed supplies updated only; do not treat it as a release date.' : null,
    }, source);
  });
}

export function parseGitHub(body, source) {
  const releases = JSON.parse(body);
  if (!Array.isArray(releases) || !releases.length) throw new Error('Expected a nonempty GitHub releases array.');
  return releases.filter(release => !release.draft).map(release => {
    if (!release.tag_name || !release.html_url || !date(release.published_at)) throw new Error('Incomplete GitHub release identity or publication date.');
    return candidate({ title: release.name || release.tag_name, version: release.tag_name, product: source.name,
      url: release.html_url, publishedAt: date(release.published_at), publishedRaw: release.published_at,
      dateMeaning: 'release-publication', prerelease: Boolean(release.prerelease), description: String(release.body || '').slice(0, 2000),
      descriptionHash: hash(String(release.body || '').replace(/\r\n/g, '\n').trim()),
    }, source);
  });
}

export function parseLeaderboard(body, source) {
  const result = [];
  if (source.kind === 'aa-releases') {
    // AA links multi-configuration groups to /models/releases/:slug and
    // single-configuration groups directly to /models/:slug. Read rendered
    // cards only: navigation links and script/hydration data are not releases.
    const visible = body.replace(/<!--[^]*?-->|<(script|style|template)\b[^>]*>[^]*?<\/\1\s*>/gi, '');
    const origin = new URL(source.url).origin;
    for (const match of visible.matchAll(/<a\b([^>]*\bhref\s*=\s*["'][^"']+["'][^>]*)>([^]*?)<\/a\s*>/gi)) {
      const href = attribute(match[1], 'href');
      const target = new URL(href, source.url);
      if (target.origin !== origin || !target.pathname.startsWith('/models/')) continue;
      const paragraphs = [...match[2].matchAll(/<p\b[^>]*>([^]*?)<\/p\s*>/gi)].map(item => clean(item[1]));
      const variants = paragraphs[1]?.match(/\b(\d+)\s+variants?\b/i);
      const grouped = /^\/models\/releases\/[^/]+\/?$/.test(target.pathname);
      const looksLikeCard = grouped || variants || /<dl\b/i.test(match[2]);
      if (!looksLikeCard) continue;
      if (!/^\/models\/(?:releases\/)?[^/]+\/?$/.test(target.pathname)) throw new Error('AA release card URL structure changed.');
      if (paragraphs.length < 2 || !paragraphs[0] || !variants || Number(variants[1]) < 1) throw new Error('AA release card structure changed.');
      const period = paragraphs[1].match(/\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(20\d{2})\b/);
      const month = period ? String(['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].indexOf(period[1]) + 1).padStart(2, '0') : null;
      result.push(candidate({ title: paragraphs[0], url: target.href, publishedPeriod: period ? `${period[2]}-${month}` : null,
        dateMeaning: 'reported-release-month', dateEvidence: paragraphs[1], configurationScope: 'release-group',
        note: 'AA groups variants here. Verify the original announcement and exact configuration before inclusion.',
      }, source));
    }
    // The counter describes the current filtered/paginated view, not every
    // model in AA's database. Refuse partial success if a card was missed.
    const counts = [...visible.matchAll(/<p\b[^>]*>([^]*?)<\/p\s*>/gi)]
      .map(([, value]) => clean(value).match(/^(?:Showing\s+)?([\d,]+)\s+of\s+([\d,]+)\s+releases$/i)).filter(Boolean);
    const parsedCount = new Set(result.map(item => `${nameKey(item.title)}\n${item.url}`)).size;
    for (const [, shown, total] of counts) {
      const expected = Number(shown.replaceAll(',', '')), available = Number(total.replaceAll(',', ''));
      if (!Number.isSafeInteger(expected) || !Number.isSafeInteger(available) || expected > available || expected !== parsedCount) {
        throw new Error(`AA visible release list is incomplete or changed: parsed ${parsedCount}, expected ${shown} of ${total} releases.`);
      }
    }
  } else {
    for (const match of body.matchAll(/<script\b([^>]*)>([^]*?)<\/script\s*>/gi)) {
      if (attribute(match[1], 'type') !== 'application/ld+json') continue;
      const value = JSON.parse(match[2]); // Data only; no evaluation of scripts or hydration payloads.
      const objects = Array.isArray(value) ? value : [value, ...(value['@graph'] || [])];
      for (const list of objects) {
        if (list['@type'] !== 'ItemList' || !/text arena/i.test(list.name || '')) continue;
        if (!Array.isArray(list.itemListElement) || !list.itemListElement.length) throw new Error('Arena model list is empty or changed.');
        if (list.numberOfItems && Number(list.numberOfItems) !== list.itemListElement.length) throw new Error('Arena structured list is incomplete.');
        for (const item of list.itemListElement) {
          if (typeof item.name !== 'string' || !item.name.trim()) throw new Error('Arena item has no exact model/configuration name.');
          result.push(candidate({ title: item.name, url: item.url || source.url, dateMeaning: 'unknown', configurationScope: 'exact-listed-name',
            note: 'Leaderboard appearance is not a release date. Confirm the model and configuration with a release source.',
          }, source));
        }
      }
    }
  }
  if (!result.length) throw new Error('No model candidates parsed; verify access and the current leaderboard structure.');
  return result;
}

export function parseCandidates(body, source) {
  if (!KINDS.includes(source.kind)) throw new Error(`Unsupported parser: ${source.kind}`);
  const parsed = source.kind === 'github-json' ? parseGitHub(body, source) : source.kind.includes('atom') || source.kind === 'rss' ? parseFeed(body, source) : parseLeaderboard(body, source);
  if (!parsed.length) throw new Error('No public candidates found; review the response.');
  return [...new Map(parsed.map(item => [hash(`${nameKey(item.title)}\n${item.url}\n${item.version || ''}`), item])).values()];
}

export function catalogEntries(window) {
  return Object.entries(window.ATLAS_CATALOG.sections).flatMap(([section, { data }]) => data.releases.map(entry => ({
    section, id: entry.id, name: entry.name, names: [...new Set([entry.name, entry.en?.name, window.MODEL_ATLAS_EN?.[entry.id]?.name].filter(Boolean))],
    date: entry.date, urls: (entry.sources || []).map(source => sourceURL(source.url)),
  })));
}

export function matchCatalog(item, entries) {
  // Only whitespace/case normalization. Version, punctuation and reasoning configuration remain significant.
  // Shared URLs can refer to several versions, and are suggestions only. Never suppress a candidate.
  return entries.flatMap(entry => {
    const exact = entry.names.some(name => nameKey(name) === nameKey(item.title));
    const shared = entry.urls.includes(item.url);
    return exact || shared ? [{ section: entry.section, entryId: entry.id, name: entry.name, date: entry.date,
      reason: exact ? 'exact-title' : 'shared-source-url', requiresVersionReview: true }] : [];
  });
}

export async function fetchDocument(url, { timeout = 20000, maxBytes = 5 * 1024 * 1024, gate = createOriginGate(), allowLocal = false } = {}) {
  const observation = { observedAt: new Date().toISOString(), redirects: [] };
  let target = url;
  try {
    for (let step = 0; step <= 5; step++) {
      target = sourceURL(target);
      const hostname = new URL(target).hostname;
      if (!allowLocal && /^(localhost|.*\.localhost|0\.0\.0\.0|127\..*|10\..*|192\.168\..*|169\.254\..*|172\.(1[6-9]|2\d|3[01])\..*|\[::1\]|\[f[cd][^]*\]|\[fe80:[^]*\])$/i.test(hostname)) throw new Error('Local/private targets are not allowed.');
      const value = await gate(target, async () => {
        const response = await fetch(target, { redirect: 'manual', signal: AbortSignal.timeout(timeout), headers: { 'user-agent': 'ModelAtlasCandidateDiscovery/1.0 (+https://github.com/taifuer/model-atlas)', accept: 'application/atom+xml,application/rss+xml,application/json,text/html,application/xml;q=0.9' } });
        const metadata = { httpStatus: response.status, finalURL: target, contentType: response.headers.get('content-type') || '' };
        if ([301, 302, 303, 307, 308].includes(response.status)) {
          const redirect = response.headers.get('location'); await response.body?.cancel();
          return { ...metadata, redirect: redirect ? new URL(redirect, target).href : null };
        }
        if (!response.ok) {
          const retryAfter = response.headers.get('retry-after'); await response.body?.cancel(); return { ...metadata, retryAfter };
        }
        if (Number(response.headers.get('content-length')) > maxBytes) { await response.body?.cancel(); throw new Error('response_too_large'); }
        const chunks = []; let size = 0;
        if (response.body) for await (const chunk of response.body) { size += chunk.length; if (size > maxBytes) throw new Error('response_too_large'); chunks.push(chunk); }
        return { ...metadata, body: Buffer.concat(chunks).toString('utf8') };
      });
      Object.assign(observation, { httpStatus: value.httpStatus, finalURL: value.finalURL, contentType: value.contentType });
      if (value.redirect) {
        observation.redirects.push({ from: target, to: value.redirect, status: value.httpStatus }); target = value.redirect;
        if (step === 5) return { ...observation, status: 'redirect_error', reason: 'More than five redirects.' };
        continue;
      }
      const status = value.httpStatus;
      if ([404, 410].includes(status)) return { ...observation, status: 'missing', reason: `HTTP ${status}.` };
      if ([401, 403].includes(status)) return { ...observation, status: 'access_restricted', reason: `HTTP ${status}; API quota or access restrictions are not a missing source.` };
      if (status === 429) return { ...observation, status: 'rate_limited', reason: 'HTTP 429; retry later.', retryAfter: value.retryAfter };
      if (status >= 500) return { ...observation, status: 'temporary_failure', reason: `HTTP ${status}.` };
      if (value.body === undefined) return { ...observation, status: 'http_error', reason: `Unexpected HTTP ${status}.` };
      return { ...observation, status: 'ok', body: value.body };
    }
  } catch (error) {
    return { ...observation, finalURL: target, status: ['TimeoutError', 'AbortError'].includes(error.name) ? 'timeout' : error.message === 'response_too_large' ? 'too_large' : 'request_failed', reason: error.message };
  }
}

export function mergeQueue(previous, observations, entries) {
  if (previous.schemaVersion !== SCHEMA || !previous.entries || Array.isArray(previous.entries)) throw new Error('Invalid candidate queue.');
  const queue = structuredClone(previous);
  for (const observation of observations) {
    for (const item of observation.candidates || []) {
      const id = candidateID(observation.source, item);
      const old = queue.entries[id];
      const matching = matchCatalog(item, entries), fingerprint = candidateFingerprint(item);
      const changed = Boolean(old && candidateFingerprint(old) !== fingerprint);
      const reviewHistory = [...(old?.reviewHistory || [])];
      if (changed && (old.status !== 'needs_review' || old.reviewNote || old.reviewDecision)) reviewHistory.push({ status: old.status, reviewNote: old.reviewNote || '', reviewDecision: old.reviewDecision || null, supersededAt: observation.observedAt, fingerprint: candidateFingerprint(old), reason: 'Candidate fields changed after the previous decision.' });
      queue.entries[id] = { ...old, id, source: observation.source, ...item, firstObservedAt: old?.firstObservedAt || observation.observedAt,
        lastObservedAt: observation.observedAt, lastChangedAt: changed ? observation.observedAt : old?.lastChangedAt || null, snapshot: observation.snapshot, catalogMatches: matching,
        fingerprint, observationChange: old ? changed ? 'changed' : 'unchanged' : 'first_observation', reviewHistory,
        status: changed ? 'needs_review' : old?.status || 'needs_review', reviewNote: changed ? '' : old?.reviewNote || '',
        reviewDecision: changed ? null : old?.reviewDecision || null,
        reason: changed ? 'Candidate fields changed; review the release/configuration again. Any previous decision is preserved in reviewHistory.' : matching.length ? 'Possible existing entry; compare release version, date and configuration. Kept for review.' : 'Observed in a monitored source; assess whether it is classic, representative or influential.',
      };
    }
  }
  return queue;
}

async function writeJSON(filename, value) {
  const temporary = `${filename}.${randomUUID()}.tmp`;
  await writeFile(temporary, JSON.stringify(value, null, 2) + '\n', { mode: 0o600 }); await rename(temporary, filename);
}

export async function runDiscovery(sources, { directory = PRIVATE_ROOT, entries = [], concurrency = 3, originDelay = 800, since = null, limit = 1000, ...fetchOptions } = {}) {
  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 4 || !Number.isInteger(limit) || limit < 1 || limit > 5000) throw new Error('Invalid concurrency or limit.');
  if (since && (!/^\d{4}-\d{2}-\d{2}$/.test(since) || date(since)?.slice(0, 10) !== since)) throw new Error('since must be an exact YYYY-MM-DD date.');
  await mkdir(directory, { recursive: true, mode: 0o700 });
  const root = await realpath(directory);
  if (root !== path.resolve(directory)) throw new Error('Private output directory cannot contain symlinks.');
  for (const name of ['reports', 'snapshots']) { await mkdir(path.join(root, name), { recursive: true, mode: 0o700 }); if (await realpath(path.join(root, name)) !== path.join(root, name)) throw new Error('Private output subdirectory cannot be a symlink.'); }
  const lock = path.join(root, '.lock');
  await mkdir(lock); // Refuse overlapping writes; a stale lock requires manual inspection.
  try {
    let previous = { schemaVersion: SCHEMA, entries: {} };
    try {
      if (await realpath(path.join(root, 'queue.json')) !== path.join(root, 'queue.json')) throw new Error('Candidate queue cannot be a symlink.');
      previous = JSON.parse(await readFile(path.join(root, 'queue.json'), 'utf8'));
    } catch (error) { if (error.code !== 'ENOENT') throw error; }
    if (previous.schemaVersion !== SCHEMA || !previous.entries || Array.isArray(previous.entries)) throw new Error('Invalid candidate queue.');
    const gate = createOriginGate(originDelay), results = new Array(sources.length); let next = 0;
    await Promise.all(Array.from({ length: Math.min(concurrency, sources.length) }, async () => {
      while (next < sources.length) {
        const position = next++, source = sources[position];
        const fetched = await fetchDocument(source.url, { ...fetchOptions, gate });
        const { body, ...metadata } = fetched;
        const result = { source, ...metadata, candidates: [] };
        if (body !== undefined) {
          result.contentHash = hash(body); result.snapshot = `snapshots/${result.contentHash}.txt`;
          await writeFile(path.join(root, result.snapshot), body, { mode: 0o600 });
          try {
            const parsed = parseCandidates(body, source);
            const eligible = parsed.filter(item => !since || !item.publishedAt || item.publishedAt.slice(0, 10) >= since);
            result.parsedCount = parsed.length; result.beforeSince = parsed.length - eligible.length;
            result.truncated = eligible.length > limit;
            result.candidates = eligible.slice(0, limit).map(item => ({ ...item, id: candidateID(source, item), catalogMatches: matchCatalog(item, entries) }));
            result.undatedCount = result.candidates.filter(item => !item.publishedAt).length;
          } catch (error) { result.status = 'parse_error'; result.reason = error.message; }
        }
        results[position] = result;
      }
    }));
    const generatedAt = new Date().toISOString();
    const queue = mergeQueue(previous, results, entries); queue.updatedAt = generatedAt;
    const newCandidateIds = Object.keys(queue.entries).filter(id => !Object.hasOwn(previous.entries, id));
    const observedIds = new Set(results.flatMap(result => result.candidates.map(item => item.id)));
    const changedCandidateIds = [...observedIds].filter(id => queue.entries[id].observationChange === 'changed');
    const report = { schemaVersion: SCHEMA, parser: PARSER, generatedAt, since, limitPerSource: limit,
      scope: 'Manual discovery from a bounded source registry. Not exhaustive; nothing is automatically included or published. Feed dates describe articles/releases as labelled; missing dates stay unknown.',
      summary: { sources: results.length, successful: results.filter(item => item.status === 'ok').length, errors: results.filter(item => item.status !== 'ok').length,
        observedCandidates: results.reduce((sum, item) => sum + item.candidates.length, 0), newCandidates: newCandidateIds.length, changedCandidates: changedCandidateIds.length, queueEntries: Object.keys(queue.entries).length, needsReview: Object.values(queue.entries).filter(item => item.status === 'needs_review').length }, newCandidateIds, changedCandidateIds, results };
    const filename = path.join(root, 'reports', `${generatedAt.replace(/[:.]/g, '-')}-${randomUUID().slice(0, 8)}.json`);
    await writeJSON(filename, report); await writeJSON(path.join(root, 'queue.json'), queue);
    return { report, filename };
  } finally { await rm(lock, { recursive: true }); }
}

const HELP = `Manual release-candidate discovery (Node 22+).
Usage: node scripts/discover-candidates.mjs [options]
  --list                 List the verified source registry, without fetching.
  --source ID[,ID]        Select sources; defaults to all registered sources.
  --since YYYY-MM-DD      Exclude candidates with an earlier known publication day.
                         Unknown dates and month-only dates remain in the queue.
  --limit N              Maximum candidates per source, default 1000 (1-5000).
                         Truncation is reported; feeds may also expose limited history.
  --concurrency N        Simultaneous sources, default 3 (1-4).
  --timeout MS           Per-request timeout, default 20000 (100-60000).
  --help                 Show this help.
Reports/raw snapshots/queue: research/candidate-discovery/ (Git-ignored).
Use npm run review:candidates to summarize and explicitly review the private queue.
firstObservedAt, lastChangedAt and review decisions survive later runs.
Changed candidate fields reopen needs_review and retain the earlier decision in
reviewHistory; page-navigation changes alone do not. GitHub version IDs survive title edits.
Suggested statuses: needs_review, represented, deferred, rejected. An exact title or
shared source URL is only a match suggestion. All versions/configurations remain
review candidates. No schedule, credentials, automatic site edits or publication.
Exit 2 means one or more fetch/parser failures; successful observations are still saved.`;

async function main(args) {
  if (args.includes('--help')) return console.log(HELP);
  const options = {}, values = new Set(['--source', '--since', '--limit', '--concurrency', '--timeout']);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--list') options.list = true;
    else if (values.has(args[i]) && args[i + 1] && !args[i + 1].startsWith('--')) options[args[i]] = args[++i];
    else throw new Error(`Unknown option or missing value: ${args[i]}. Use --help.`);
  }
  const registry = JSON.parse(await readFile(new URL('./candidate-sources.json', import.meta.url), 'utf8'));
  if (registry.schemaVersion !== SCHEMA || !Array.isArray(registry.sources)) throw new Error('Invalid source registry.');
  const ids = options['--source']?.split(',');
  if (ids?.some(id => !registry.sources.some(source => source.id === id))) throw new Error('Unknown source ID; use --list.');
  const sources = registry.sources.filter(source => !ids || ids.includes(source.id));
  if (options.list) return console.log(JSON.stringify(sources, null, 2));
  const integer = (key, fallback, min, max) => { const value = options[key] === undefined ? fallback : Number(options[key]); if (!Number.isInteger(value) || value < min || value > max) throw new Error(`Invalid ${key}; expected ${min}-${max}.`); return value; };
  const { report, filename } = await runDiscovery(sources, { entries: catalogEntries(await loadCatalog()), since: options['--since'] || null,
    limit: integer('--limit', 1000, 1, 5000), concurrency: integer('--concurrency', 3, 1, 4), timeout: integer('--timeout', 20000, 100, 60000) });
  console.log(JSON.stringify(report.summary)); console.log(`Review ${path.relative(ROOT, filename)} and research/candidate-discovery/queue.json. Website data was not changed.`);
  if (report.summary.errors) process.exitCode = 2;
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  main(process.argv.slice(2)).catch(error => { console.error(error.message); process.exitCode = 1; });
}
