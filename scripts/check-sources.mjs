// Manual maintenance only. Remote responses are data, never executed or imported.
// Reports, normalized snapshots, and explicitly accepted baselines stay in research/.
import { createHash, randomUUID } from 'node:crypto';
import { readFile, writeFile, mkdir, rename, realpath, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import { loadCatalog } from './prerender.mjs';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const PRIVATE_ROOT = path.join(ROOT, 'research/source-monitor');
const SCHEMA = 1;
const NORMALIZER = 'text-v3';
const HTML_ATTRIBUTES = String.raw`(?:[^>"']|"[^"]*"|'[^']*')*`;
const stripTags = text => text.replace(new RegExp(`<${HTML_ATTRIBUTES}>`, 'g'), ' ');
function articleBody(text) {
  const opening = new RegExp(String.raw`<div\b${HTML_ATTRIBUTES}>`, 'gi');
  let match;
  while ((match = opening.exec(text))) {
    const classes = match[0].match(/\bclass\s*=\s*(["'])([^]*?)\1/i)?.[2]?.split(/\s+/) || [];
    if (!classes.includes('article-body')) continue;
    // Balance nested divs instead of truncating the document at its first child.
    const tags = new RegExp(String.raw`<\/?div\b${HTML_ATTRIBUTES}>`, 'gi');
    tags.lastIndex = opening.lastIndex;
    let depth = 1, end;
    while ((end = tags.exec(text))) {
      depth += /^<\//.test(end[0]) ? -1 : 1;
      if (!depth) return text.slice(opening.lastIndex, end.index);
    }
  }
  return null;
}
const SECTIONS = ['models', 'agents', 'hardware', 'technology'];
const REVIEW_SCOPES = ['price', 'score', 'license', 'specification'];
const hash = body => createHash('sha256').update(body).digest('hex');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export function sourceURL(value) {
  const url = new URL(value);
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) throw new Error('Only public HTTP(S) source URLs without credentials are supported.');
  url.hash = ''; // A document is fetched once, while individual reference paths remain in the report.
  return url.href;
}

export function collectSources(window, sections = SECTIONS) {
  const documents = new Map();
  function visit(value, reference, field = '') {
    if (typeof value === 'string' && /^https?:\/\//i.test(value)) {
      const url = sourceURL(value), id = hash(url);
      if (!documents.has(id)) documents.set(id, { id, url, references: [] });
      documents.get(id).references.push({ ...reference, field, originalURL: value });
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => visit(item, reference, `${field}[${index}]`));
    } else if (value && typeof value === 'object') {
      for (const [key, item] of Object.entries(value)) visit(item, reference, field ? `${field}.${key}` : key);
    }
  }
  for (const section of sections) {
    const data = window.ATLAS_CATALOG.sections[section].data;
    for (const release of data.releases) visit(release, { section, entryId: release.id }, 'release');
    if (data.companyRanking) visit(data.companyRanking, { section, entryId: null }, 'companyRanking');
  }
  if (sections.includes('models')) {
    for (const [name, data] of Object.entries({ specifications: window.MODEL_ATLAS_SPECS, prices: window.MODEL_ATLAS_PRICES, scores: window.MODEL_ATLAS_SCORES, types: window.MODEL_ATLAS_TYPES })) {
      for (const [entryId, entry] of Object.entries(data?.entries || {})) visit(entry, { section: 'models', entryId }, name);
      if (data?.benchmarks) visit(data.benchmarks, { section: 'models', entryId: null }, `${name}.benchmarks`);
    }
  }
  return [...documents.values()].map(source => ({ ...source, ...reviewPriority(source.references) })).sort((a, b) => a.url.localeCompare(b.url));
}

export function reviewPriority(references) {
  const scopes = new Set();
  for (const { field } of references) {
    if (field.startsWith('prices.')) scopes.add('price');
    else if (field.startsWith('scores.') || field.startsWith('companyRanking.')) scopes.add('score');
    else if (field.startsWith('release.openness.')) scopes.add('license');
    else if (field.startsWith('specifications.') || field.startsWith('release.hardware.')) scopes.add('specification');
  }
  return { priority: scopes.size ? 'high' : 'normal', reviewScopes: [...scopes].sort() };
}

export async function loadSources(sections = SECTIONS) {
  const window = await loadCatalog();
  const context = vm.createContext({ window });
  for (const file of ['data-specs.js', 'data-prices.js', 'data-scores.js']) {
    vm.runInContext(await readFile(path.join(ROOT, 'src', file), 'utf8'), context, { filename: file, timeout: 5000 });
  }
  return collectSources(window, sections);
}

function decodeEntities(text) {
  const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
  return text.replace(/&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (original, entity) => {
    if (!entity.startsWith('#')) return entities[entity.toLowerCase()];
    const code = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : Number(entity.slice(1));
    return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : original;
  });
}

function sortedJSON(value) {
  if (Array.isArray(value)) return value.map(sortedJSON);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(key => [key, sortedJSON(value[key])]));
  return value;
}

export function fingerprint(body, contentType = '') {
  const raw = body.toString('utf8');
  let text = raw, kind = 'text';
  if (/\bjson\b/i.test(contentType)) {
    text = JSON.stringify(sortedJSON(JSON.parse(raw)), null, 2);
    kind = 'json';
  } else if (/html/i.test(contentType) || /^\s*<!doctype html|^\s*<html[\s>]/i.test(raw)) {
    kind = 'html-text';
    text = raw.replace(/<!--[^]*?-->/g, ' ').replace(new RegExp(String.raw`<(script|style|noscript|svg|iframe)\b${HTML_ATTRIBUTES}>[^]*?<\/\1\s*>`, 'gi'), ' ');
    const title = decodeEntities(stripTags(text.match(/<title\b[^>]*>([^]*?)<\/title>/i)?.[1] || '')).trim();
    if (/^(just a moment|access denied|attention required|checking your browser|verify (you|that)|security (check|verification)|robot or human|403 forbidden|captcha)/i.test(title)) {
      return { blocked: true, reason: 'The response is an access challenge, not the source document.' };
    }
    // Main includes specification/price cards outside a prose article. Some news
    // sites use article tags only for related cards and article-body for the story.
    const articles = text.match(new RegExp(String.raw`<article\b${HTML_ATTRIBUTES}>[^]*?<\/article\s*>`, 'gi'));
    const main = text.match(new RegExp(String.raw`<main\b${HTML_ATTRIBUTES}>([^]*?)<\/main\s*>`, 'i'))?.[1];
    const story = articleBody(text);
    const scoped = Boolean(main || story || articles);
    text = main || story || articles?.join('\n') || text;
    // A document header can carry its title, publication date or license badge.
    const chrome = scoped ? 'nav|footer|aside|form' : 'nav|header|footer|aside|form';
    text = text.replace(new RegExp(String.raw`<(${chrome})\b${HTML_ATTRIBUTES}>[^]*?<\/\1\s*>`, 'gi'), ' ');
    text = `${title}\n${decodeEntities(stripTags(text))}`.replace(/\s+/g, ' ').trim();
    if (text.length < 80) return { blocked: true, reason: 'Too little readable HTML to establish a reliable content baseline.' };
  } else if (!/^text\//i.test(contentType) && !/xml|javascript|markdown/i.test(contentType)) {
    // PDFs and other binary documents are compared byte-for-byte, without extraction or execution.
    kind = 'binary';
    text = `Binary document; SHA-256 ${hash(body)}; ${body.length} bytes.`;
  } else text = text.replace(/\r\n/g, '\n').trim();
  return { kind, hash: hash(text), text, normalizer: NORMALIZER };
}

export function createOriginGate(delay = 800) {
  const origins = new Map();
  return async (url, work) => {
    const origin = new URL(url).origin;
    if (!origins.has(origin)) origins.set(origin, { tail: Promise.resolve(), nextAt: 0 });
    const state = origins.get(origin), previous = state.tail;
    let done;
    state.tail = new Promise(resolve => { done = resolve; });
    await previous;
    try {
      await sleep(Math.max(0, state.nextAt - Date.now()));
      return await work();
    } finally {
      state.nextAt = Date.now() + delay;
      done();
    }
  };
}

function allowedTarget(value, allowLocal) {
  const url = new URL(sourceURL(value));
  if (!allowLocal && /^(localhost|.*\.localhost|0\.0\.0\.0|127\..*|10\..*|192\.168\..*|169\.254\..*|172\.(1[6-9]|2\d|3[01])\..*|\[::1\]|\[f[cd][^]*\]|\[fe80:[^]*\])$/i.test(url.hostname)) throw new Error('A source redirected to a local or private address.');
  return url.href;
}

async function readBody(response, maxBytes) {
  if (Number(response.headers.get('content-length')) > maxBytes) {
    await response.body?.cancel();
    throw new Error('response_too_large');
  }
  const chunks = [];
  let size = 0;
  if (response.body) for await (const chunk of response.body) {
    size += chunk.length;
    if (size > maxBytes) throw new Error('response_too_large');
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export async function probeSource(source, { timeout = 15000, maxBytes = 4 * 1024 * 1024, gate = createOriginGate(), allowLocal = false } = {}) {
  const observation = { checkedAt: new Date().toISOString(), redirects: [] };
  let target = source.url;
  try {
    for (let redirects = 0; redirects <= 5; redirects++) {
      target = allowedTarget(target, allowLocal);
      const result = await gate(target, async () => {
        const response = await fetch(target, {
          redirect: 'manual', signal: AbortSignal.timeout(timeout),
          headers: { 'user-agent': 'ModelAtlasSourceCheck/1.0 (+https://github.com/taifuer/model-atlas)', accept: 'text/html,application/json,text/plain,application/pdf;q=0.8,*/*;q=0.5' },
        });
        const metadata = { httpStatus: response.status, finalURL: target, contentType: response.headers.get('content-type') || '', etag: response.headers.get('etag'), lastModified: response.headers.get('last-modified') };
        if ([301, 302, 303, 307, 308].includes(response.status)) {
          const location = response.headers.get('location');
          await response.body?.cancel();
          return { ...metadata, redirect: location ? new URL(location, target).href : null };
        }
        if (!response.ok) {
          const retryAfter = response.headers.get('retry-after');
          await response.body?.cancel();
          return { ...metadata, retryAfter };
        }
        return { ...metadata, body: await readBody(response, maxBytes) };
      });
      Object.assign(observation, { httpStatus: result.httpStatus, finalURL: result.finalURL, contentType: result.contentType, etag: result.etag, lastModified: result.lastModified });
      if (result.redirect) {
        observation.redirects.push({ from: target, status: result.httpStatus, to: result.redirect });
        target = result.redirect;
        if (redirects === 5) return { ...observation, status: 'redirect_error', reason: 'More than five redirects.' };
        continue;
      }
      const status = result.httpStatus;
      if ([404, 410].includes(status)) return { ...observation, status: 'missing', reason: `HTTP ${status}; verify the source or replacement manually.` };
      if ([401, 403].includes(status)) return { ...observation, status: 'access_restricted', reason: `HTTP ${status} does not establish that a link is broken.` };
      if (status === 429) return { ...observation, status: 'rate_limited', retryAfter: result.retryAfter, reason: 'Retry later; no automatic retry or baseline change.' };
      if (status >= 500) return { ...observation, status: 'temporary_failure', reason: `HTTP ${status}; keep the previous baseline.` };
      if (!result.body) return { ...observation, status: 'http_error', reason: `Unexpected HTTP ${status}.` };
      const content = fingerprint(result.body, result.contentType);
      if (content.blocked) return { ...observation, status: 'unreadable', reason: content.reason };
      return { ...observation, status: 'ok', fingerprint: { hash: content.hash, kind: content.kind, normalizer: content.normalizer }, text: content.text };
    }
  } catch (error) {
    const timedOut = ['TimeoutError', 'AbortError'].includes(error.name);
    return { ...observation, finalURL: target, status: timedOut ? 'timeout' : error.message === 'response_too_large' ? 'too_large' : 'request_failed', reason: timedOut ? 'Request timed out; keep the previous baseline.' : error.message };
  }
}

export function compareObservation(observation, previous) {
  if (observation.status !== 'ok') return { status: observation.status, review: true, reason: observation.reason };
  if (!previous) return { status: 'baseline_missing', review: true, reason: 'First observation; review before accepting a baseline.' };
  if (previous.fingerprint.normalizer !== observation.fingerprint.normalizer || previous.fingerprint.kind !== observation.fingerprint.kind) return { status: 'comparison_changed', review: true, reason: 'Content format or normalization changed; establish a reviewed baseline.' };
  if (previous.finalURL !== observation.finalURL) return { status: 'redirect_changed', review: true, reason: 'The final destination changed; verify the new destination and content.' };
  if (previous.fingerprint.hash !== observation.fingerprint.hash) return { status: 'content_changed', review: true, reason: 'Content differs from the accepted baseline. This is a review candidate, not a verified data change.' };
  return { status: 'unchanged', review: false, reason: 'Normalized content and final destination match the accepted baseline.' };
}

export async function readBaseline(directory) {
  try {
    const text = await readFile(path.join(directory, 'baseline.json'), 'utf8');
    const value = JSON.parse(text);
    if (value.schemaVersion !== SCHEMA || !value.entries) throw new Error('Unsupported or invalid source baseline.');
    return { value, digest: hash(text) };
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    return { value: { schemaVersion: SCHEMA, entries: {} }, digest: null };
  }
}

async function writeJSON(filename, value) {
  const temporary = `${filename}.${randomUUID()}.tmp`;
  await writeFile(temporary, JSON.stringify(value, null, 2) + '\n', { mode: 0o600 });
  await rename(temporary, filename);
}

export async function runCheck(sources, { directory = PRIVATE_ROOT, concurrency = 3, originDelay = 800, ...probeOptions } = {}) {
  await mkdir(path.join(directory, 'reports'), { recursive: true, mode: 0o700 });
  await mkdir(path.join(directory, 'snapshots'), { recursive: true, mode: 0o700 });
  const baseline = await readBaseline(directory);
  const gate = createOriginGate(originDelay), results = new Array(sources.length);
  let index = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, sources.length) }, async () => {
    while (index < sources.length) {
      const position = index++, source = sources[position];
      const observed = await probeSource(source, { ...probeOptions, gate });
      if (observed.text !== undefined) {
        observed.snapshot = `snapshots/${observed.fingerprint.hash}.txt`;
        await writeFile(path.join(directory, observed.snapshot), observed.text, { mode: 0o600 });
        delete observed.text;
      }
      const previous = baseline.value.entries[source.id] || null;
      results[position] = { ...source, ...compareObservation(observed, previous), previous, observed };
    }
  }));
  const report = { schemaVersion: SCHEMA, checkedAt: new Date().toISOString(), baselineDigest: baseline.digest, parameters: { concurrency, originDelay, timeout: probeOptions.timeout || 15000, maxBytes: probeOptions.maxBytes || 4 * 1024 * 1024 }, total: results.length, summary: {}, queue: [], results };
  for (const result of results) {
    report.summary[result.status] = (report.summary[result.status] || 0) + 1;
    if (result.review) report.queue.push({ sourceId: result.id, ...reviewPriority(result.references), status: result.status, url: result.url, reason: result.reason, entries: [...new Set(result.references.map(ref => `${ref.section}:${ref.entryId || '(shared reference)'}`))], references: result.references });
  }
  // Mutable facts deserve an earlier review; an old paper is not stale merely because of its age.
  report.queue.sort((a, b) => (a.priority === 'high' ? 0 : 1) - (b.priority === 'high' ? 0 : 1) || a.url.localeCompare(b.url));
  const filename = path.join(directory, 'reports', `${report.checkedAt.replace(/[:.]/g, '-')}-${randomUUID().slice(0, 8)}.json`);
  await writeJSON(filename, report);
  return { report, filename };
}

export async function acceptReport(filename, directory = PRIVATE_ROOT, sourceIds) {
  const base = await realpath(directory), resolved = await realpath(filename);
  if (!resolved.startsWith(path.join(base, 'reports') + path.sep)) throw new Error('Accept only reports inside research/source-monitor/reports/.');
  const lock = path.join(base, '.accept.lock');
  try { await mkdir(lock); }
  catch (error) {
    if (error.code === 'EEXIST') throw new Error('Another baseline acceptance holds research/source-monitor/.accept.lock. Retry after it finishes; remove a stale lock only after confirming that no acceptance process is running.');
    throw error;
  }
  try { return await acceptLockedReport(resolved, directory, sourceIds); }
  finally { await rm(lock, { recursive: true }); }
}

async function acceptLockedReport(resolved, directory, sourceIds) {
  const reportText = await readFile(resolved, 'utf8'), reportDigest = hash(reportText);
  const report = JSON.parse(reportText);
  const baseline = await readBaseline(directory);
  if (report.schemaVersion !== SCHEMA || !Array.isArray(report.results)) throw new Error('The source report is invalid.');
  const receiptFile = path.join(directory, 'acceptances', `${reportDigest}.json`);
  let receipt;
  try { receipt = JSON.parse(await readFile(receiptFile, 'utf8')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  // A report may be reviewed in several batches. Only this exact report's most
  // recent acceptance can advance its baseline; unrelated writes still invalidate it.
  const continuedReview = receipt?.schemaVersion === SCHEMA && receipt.reportDigest === reportDigest && receipt.originalBaselineDigest === report.baselineDigest && receipt.baselineDigest === baseline.digest;
  if (report.baselineDigest !== baseline.digest && !continuedReview) throw new Error('The report baseline is stale. Run the check again before accepting.');
  const knownIds = new Set(report.results.map(result => result.id));
  if (knownIds.size !== report.results.length) throw new Error('Duplicate source identities in report.');
  const selected = sourceIds === undefined ? undefined : new Set(sourceIds);
  if (selected && !selected.size) throw new Error('Select at least one source identity to accept.');
  for (const id of selected || []) {
    if (!knownIds.has(id)) throw new Error(`Unknown source identity in this report: ${id}`);
    if (report.results.find(result => result.id === id).observed?.status !== 'ok') throw new Error(`Source ${id} has no successful observation to accept. Keep its prior baseline and review the fetch issue.`);
  }
  const acceptedAt = new Date().toISOString(), entries = { ...baseline.value.entries };
  const previouslyAccepted = new Set(continuedReview ? receipt.sourceIds : []);
  let accepted = 0;
  for (const result of report.results) {
    if (selected && !selected.has(result.id)) continue;
    const observation = result.observed;
    if (observation?.status !== 'ok') continue; // Never replace a valid baseline with a failure.
    if (result.id !== hash(sourceURL(result.url)) || !/^[a-f0-9]{64}$/.test(observation.fingerprint?.hash || '') || observation.fingerprint.normalizer !== NORMALIZER || !['text', 'html-text', 'json', 'binary'].includes(observation.fingerprint.kind)) throw new Error('Invalid source identity or fingerprint in report.');
    const snapshot = `snapshots/${observation.fingerprint.hash}.txt`;
    if (hash(await readFile(path.join(directory, snapshot))) !== observation.fingerprint.hash) throw new Error('The normalized snapshot is missing or changed.');
    if (previouslyAccepted.has(result.id)) continue;
    entries[result.id] = { url: sourceURL(result.url), finalURL: sourceURL(observation.finalURL), fingerprint: observation.fingerprint, snapshot, checkedAt: observation.checkedAt, acceptedAt, report: path.basename(resolved) };
    previouslyAccepted.add(result.id);
    accepted++;
  }
  if (accepted) {
    await mkdir(path.dirname(receiptFile), { recursive: true, mode: 0o700 });
    await writeJSON(path.join(directory, 'baseline.json'), { schemaVersion: SCHEMA, acceptedAt, entries });
    const updated = await readBaseline(directory);
    // Baseline first: an interrupted receipt write fails closed on the next accept.
    await writeJSON(receiptFile, { schemaVersion: SCHEMA, report: path.basename(resolved), reportDigest, originalBaselineDigest: report.baselineDigest, baselineDigest: updated.digest, acceptedAt, sourceIds: [...previouslyAccepted].sort() });
  }
  return accepted;
}

const HELP = `Manual source checks for Model Atlas (Node.js 22 or 24)

  npm run check:sources -- --section models --limit 8
  npm run check:sources -- --scope price,score --priority high
  npm run check:sources -- --list
  npm run check:sources -- --accept research/source-monitor/reports/<report>.json --source <id>

Options:
  --section <names>     models,agents,hardware,technology (default: all)
  --scope <names>       price,score,license,specification; match any requested scope
  --priority <value>    high or normal (default: both)
  --source <ids>        Full source IDs; comma-separated or repeat this option
  --limit <number>      Check the first N deduplicated URLs (sorted by URL)
  --concurrency <1-4>   Total concurrent requests (default: 3)
  --timeout <ms>        Per-request timeout, 100-60000 (default: 15000)
  --max-bytes <bytes>   Per-document limit, 1024-16777216 (default: 4194304)
  --origin-delay <ms>   Delay between requests to one origin, 200-10000 (default: 800)
  --list               Print source identities/references without fetching or writing
  --accept <report>     Accept observations AFTER manually reviewing their snapshots
  --help               Show this help

One request per origin at a time; at most five redirects and 4 MiB per document by default.
No retries, authentication, remote script execution, schedules, or public-data edits.
HTML is compared as normalized readable text; binary files use byte fingerprints.
A content difference is only a candidate for review, not a verified factual change.
The first run reports missing baselines; acceptance is always an explicit manual step.
Use --accept with --source to accept ONLY reviewed IDs. Unknown/failed IDs reject the batch.
Without --source, --accept accepts ALL successful observations in that report.
More subsets of the same report may be accepted until another report changes the baseline.
Already accepted IDs are skipped. A stale report must be checked again; do not edit reports.
Acceptance cannot be combined with fetching/listing filters other than --source.
Reports and snapshots stay in Git-ignored research/source-monitor/, outside dist/.
Completed checks exit 0 even when the report needs review; execution errors exit 1.
`;

export function parseOptions(args) {
  const options = {}, flags = new Set(['--list']), values = new Set(['--section', '--scope', '--priority', '--source', '--limit', '--concurrency', '--timeout', '--max-bytes', '--origin-delay', '--accept']);
  for (let index = 0; index < args.length; index++) {
    const name = args[index];
    if (flags.has(name)) options[name] = true;
    else if (values.has(name) && args[index + 1] && !args[index + 1].startsWith('--')) {
      const value = args[++index];
      if (name === '--source') options[name] = [...(options[name] || []), ...value.split(',')];
      else {
        if (options[name] !== undefined) throw new Error(`Repeated option: ${name}. Use comma-separated names where supported.`);
        options[name] = value;
      }
    }
    else throw new Error(`Unknown option or missing value: ${name}. Use --help.`);
  }
  if (options['--source']) {
    if (options['--source'].some(id => !/^[a-f0-9]{64}$/.test(id))) throw new Error('Invalid --source; use complete source IDs from --list or a report.');
    options['--source'] = [...new Set(options['--source'])];
  }
  if (options['--accept'] && Object.keys(options).some(name => !['--accept', '--source'].includes(name))) throw new Error('--accept cannot be combined with fetching or listing options; only --source is allowed.');
  return options;
}

export function selectSources(sources, { scopes, priority, sourceIds } = {}) {
  if (scopes?.some(scope => !REVIEW_SCOPES.includes(scope))) throw new Error('Invalid scope. Use --help.');
  if (priority && !['high', 'normal'].includes(priority)) throw new Error('Invalid priority. Use high or normal.');
  const selected = sourceIds && new Set(sourceIds);
  if (selected) for (const id of selected) {
    if (!sources.some(source => source.id === id)) throw new Error(`Unknown source identity in the selected sections: ${id}`);
  }
  return sources.filter(source => (!scopes || source.reviewScopes.some(scope => scopes.includes(scope))) && (!priority || source.priority === priority) && (!selected || selected.has(source.id)));
}

async function main(args) {
  if (args.includes('--help')) return console.log(HELP);
  const options = parseOptions(args);
  if (options['--accept']) {
    return console.log(`Accepted ${await acceptReport(path.resolve(options['--accept']), PRIVATE_ROOT, options['--source'])} reviewed observations. Website data was not changed.`);
  }
  const sections = options['--section']?.split(',') || SECTIONS;
  if (sections.some(section => !SECTIONS.includes(section))) throw new Error('Invalid section. Use --help.');
  const number = (key, fallback, min, max) => {
    const value = options[key] === undefined ? fallback : Number(options[key]);
    if (!Number.isInteger(value) || value < min || value > max) throw new Error(`Invalid ${key}; expected ${min}-${max}.`);
    return value;
  };
  const limit = number('--limit', 10000, 1, 10000), concurrency = number('--concurrency', 3, 1, 4), timeout = number('--timeout', 15000, 100, 60000), originDelay = number('--origin-delay', 800, 200, 10000), maxBytes = number('--max-bytes', 4 * 1024 * 1024, 1024, 16 * 1024 * 1024);
  const sources = selectSources(await loadSources([...new Set(sections)]), { scopes: options['--scope']?.split(','), priority: options['--priority'], sourceIds: options['--source'] }).slice(0, limit);
  if (options['--list']) return console.log(JSON.stringify(sources, null, 2));
  console.log(`Checking ${sources.length} source documents; no public data will be changed.`);
  const { report, filename } = await runCheck(sources, { concurrency, timeout, originDelay, maxBytes });
  console.log(JSON.stringify(report.summary));
  console.log(`Review ${path.relative(ROOT, filename)} (${report.queue.length} candidates/issues).`);
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  main(process.argv.slice(2)).catch(error => { console.error(error.message); process.exitCode = 1; });
}
