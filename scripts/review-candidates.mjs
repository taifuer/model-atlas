// Local editorial review only. Reads the catalog; writes only ignored research/.
import { createHash, randomUUID } from 'node:crypto';
import { readFile, writeFile, mkdir, rename, realpath, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { loadCatalog } from './prerender.mjs';
import { catalogEntries, matchCatalog } from './discover-candidates.mjs';
import { sourceURL } from './check-sources.mjs';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const PRIVATE_ROOT = path.join(ROOT, 'research/candidate-discovery');
const STATUSES = ['needs_review', 'represented', 'deferred', 'rejected'];
const SECTIONS = ['models', 'agents', 'hardware', 'technology'];
const digest = value => createHash('sha256').update(value).digest('hex');
const json = value => JSON.stringify(value, null, 2) + '\n';

async function privateDirectory(directory) {
  await mkdir(directory, { recursive: true, mode: 0o700 });
  if (await realpath(directory) !== path.resolve(directory)) throw new Error('Private review directory cannot contain symlinks.');
  return path.resolve(directory);
}
async function readPrivate(filename) {
  if (await realpath(filename) !== path.resolve(filename)) throw new Error('Private review files cannot be symlinks.');
  return readFile(filename, 'utf8');
}
async function atomicJSON(filename, value) {
  const temporary = `${filename}.${randomUUID()}.tmp`;
  try { await writeFile(temporary, json(value), { mode: 0o600, flag: 'wx' }); await rename(temporary, filename); }
  finally { await rm(temporary, { force: true }); }
}
function validQueue(queue) {
  if (queue.schemaVersion !== 1 || !queue.entries || typeof queue.entries !== 'object' || Array.isArray(queue.entries)) throw new Error('Invalid candidate queue.');
  for (const [id, entry] of Object.entries(queue.entries)) {
    if (!/^[a-f0-9]{64}$/.test(id) || entry.id !== id || !STATUSES.includes(entry.status)) throw new Error('Invalid candidate identity or status.');
  }
}
function validateFilters(queue, { sources = [], statuses = ['needs_review'], since = null } = {}) {
  const known = new Set(Object.values(queue.entries).map(entry => entry.source.id));
  if (sources.some(source => !known.has(source))) throw new Error('Unknown source ID in the candidate queue.');
  if (statuses.some(status => !STATUSES.includes(status))) throw new Error('Unknown review status.');
  if (since && (!/^\d{4}-\d{2}-\d{2}$/.test(since) || new Date(since).toISOString().slice(0, 10) !== since)) throw new Error('since must be an exact YYYY-MM-DD date.');
  return { sources, statuses, since };
}
export function summarizeQueue(queue, entries = [], filters = {}) {
  validQueue(queue);
  const { sources, statuses, since } = validateFilters(queue, filters);
  const selected = Object.values(queue.entries).filter(entry =>
    (!sources.length || sources.includes(entry.source.id)) && (!statuses.length || statuses.includes(entry.status)) &&
    (!since || [entry.firstObservedAt, entry.lastChangedAt].some(time => time?.slice(0, 10) >= since))
  ).sort((a, b) => (b.lastChangedAt || b.firstObservedAt).localeCompare(a.lastChangedAt || a.firstObservedAt) || a.id.localeCompare(b.id));
  const items = selected.map(entry => ({ ...entry, catalogMatches: matchCatalog(entry, entries),
    signals: [(!since || entry.firstObservedAt.slice(0, 10) >= since) ? 'new_observation' : null,
      entry.lastChangedAt && (!since || entry.lastChangedAt.slice(0, 10) >= since) ? 'content_changed' : null,
      matchCatalog(entry, entries).length ? 'possible_existing_entry' : null].filter(Boolean) }));
  return { filters: { sources, statuses, since }, counts: { selected: items.length, queue: Object.keys(queue.entries).length,
    newObservations: items.filter(entry => entry.signals.includes('new_observation')).length,
    contentChanges: items.filter(entry => entry.signals.includes('content_changed')).length,
    possibleExisting: items.filter(entry => entry.signals.includes('possible_existing_entry')).length }, entries: items };
}
const safe = value => String(value ?? '').replace(/\r?\n/g, ' ').replace(/[\\`*_{}\[\]<>|]/g, '\\$&');
export function summaryMarkdown(report) {
  const lines = ['# Candidate review', '', `Generated: ${report.generatedAt}`, '',
    `${report.counts.selected} selected / ${report.counts.queue} queued. Signals overlap: ${report.counts.newObservations} new observations, ${report.counts.contentChanges} content changes, ${report.counts.possibleExisting} possible catalog matches.`, '',
    'Observation dates are not release dates. Match suggestions require version and configuration review. No decision is inferred.', ''];
  for (const entry of report.entries) {
    lines.push(`## ${safe(entry.title)}`, '', `ID: \`${entry.id}\``, '',
      `Source: ${safe(entry.source.id)} · Status: ${safe(entry.status)} · Signals: ${entry.signals.join(', ') || '—'}`, '',
      `URL: ${safe(entry.url)}`, '', `Published: ${safe(entry.publishedAt || entry.publishedPeriod || 'unknown')} (${safe(entry.dateMeaning)})`, '',
      `First observed: ${safe(entry.firstObservedAt)} · Last changed: ${safe(entry.lastChangedAt || '—')}`, '');
    if (entry.description) lines.push(safe(entry.description), '');
    if (entry.catalogMatches.length) lines.push('Possible existing entries:', '', ...entry.catalogMatches.map(match => `- ${safe(match.section)}/${safe(match.entryId)}: ${safe(match.name)} (${safe(match.reason)})`), '');
    if (entry.reviewNote) lines.push(`Previous note: ${safe(entry.reviewNote)}`, '');
  }
  return lines.join('\n');
}
export async function writeSummary({ directory = PRIVATE_ROOT, entries = [], ...filters } = {}) {
  const root = await privateDirectory(directory), raw = await readPrivate(path.join(root, 'queue.json'));
  const queue = JSON.parse(raw);
  const report = { schemaVersion: 1, generatedAt: new Date().toISOString(), queueHash: digest(raw), ...summarizeQueue(queue, entries, filters) };
  const reviews = await privateDirectory(path.join(root, 'reviews'));
  const basename = `${report.generatedAt.replace(/[:.]/g, '-')}-${randomUUID().slice(0, 8)}`;
  const filename = path.join(reviews, `${basename}.json`);
  await atomicJSON(filename, report);
  await writeFile(path.join(reviews, `${basename}.md`), summaryMarkdown(report), { mode: 0o600, flag: 'wx' });
  return { report, filename };
}

export async function saveDecisions({ directory = PRIVATE_ROOT, summaryPath, decisions, entries = [] }) {
  const root = await privateDirectory(directory), reviews = path.join(root, 'reviews');
  const summaryFile = path.resolve(summaryPath || '');
  if (path.dirname(summaryFile) !== reviews || path.extname(summaryFile) !== '.json') throw new Error('Use an unchanged summary JSON from the private reviews directory.');
  if (!Array.isArray(decisions) || !decisions.length) throw new Error('At least one explicit decision is required.');
  const lock = path.join(root, '.lock');
  await mkdir(lock); // Shared with discovery: concurrent writes must fail, never overwrite.
  try {
    const raw = await readPrivate(path.join(root, 'queue.json')), queue = JSON.parse(raw);
    validQueue(queue);
    const summary = JSON.parse(await readPrivate(summaryFile));
    if (summary.schemaVersion !== 1 || summary.queueHash !== digest(raw) || !Array.isArray(summary.entries)) throw new Error('Stale review summary; generate a fresh summary before deciding.');
    const selected = new Set(summary.entries.map(entry => entry.id)), seen = new Set(), now = new Date().toISOString();
    const catalog = new Set(entries.map(entry => `${entry.section}/${entry.id}`));
    for (const decision of decisions) {
      if (!/^[a-f0-9]{64}$/.test(decision.id || '') || !Object.hasOwn(queue.entries, decision.id) || !selected.has(decision.id) || seen.has(decision.id)) throw new Error('Unknown, unselected, or repeated candidate ID.');
      seen.add(decision.id);
      if (!STATUSES.includes(decision.status)) throw new Error('Unknown review status.');
      if (typeof decision.note !== 'string' || !decision.note.trim() || decision.note.length > 10000) throw new Error('Each decision requires a nonempty reason (at most 10000 characters).');
      const mappings = decision.entries || [], evidence = decision.evidence || [];
      if (!Array.isArray(mappings) || mappings.some(value => typeof value !== 'string' || !SECTIONS.includes(value.split('/')[0]) || !catalog.has(value))) throw new Error('Unknown catalog entry mapping.');
      if (decision.status === 'represented' && !mappings.length) throw new Error('A represented decision requires an explicit catalog entry mapping.');
      if (!Array.isArray(evidence) || evidence.some(value => typeof value !== 'string' || sourceURL(value) !== value)) throw new Error('Evidence must contain full public HTTP(S) URLs without fragments.');
      if (['represented', 'rejected'].includes(decision.status) && !evidence.length) throw new Error('Represented/rejected decisions require evidence URLs.');
    }
    for (const decision of decisions) {
      const entry = queue.entries[decision.id];
      if (entry.reviewDecision || entry.reviewNote || entry.status !== 'needs_review') {
        entry.reviewHistory = [...(entry.reviewHistory || []), { status: entry.status, reviewNote: entry.reviewNote || '',
          reviewDecision: entry.reviewDecision || null, fingerprint: entry.fingerprint, supersededAt: now, reason: 'Explicit editorial review.' }];
      }
      entry.status = decision.status; entry.reviewNote = decision.note.trim();
      entry.reviewDecision = { reviewedAt: now, fingerprint: entry.fingerprint, entries: decision.entries || [], evidence: decision.evidence || [], summary: path.basename(summaryFile) };
    }
    queue.updatedAt = now;
    await atomicJSON(path.join(root, 'queue.json'), queue);
    return { reviewedAt: now, saved: decisions.length, statuses: Object.fromEntries(STATUSES.map(status => [status, Object.values(queue.entries).filter(entry => entry.status === status).length])) };
  } finally { await rm(lock, { recursive: true }); }
}

const HELP = `Private candidate review (Node 22+).
Usage: node scripts/review-candidates.mjs [summary filters]
  --source ID[,ID]       Filter source IDs present in the queue.
  --status STATUS[,...]  Default needs_review; use all for every status.
  --since YYYY-MM-DD     First observed or semantically changed since this day.
                        This is NOT a release-date filter.
Writes readable Markdown + JSON under research/candidate-discovery/reviews/.
Signals can overlap; matches are suggestions, never automatic decisions.

Record an explicit decision from a freshly generated JSON summary:
  --from PATH --id FULL_ID[,FULL_ID] --decide STATUS --note REASON
  --entry SECTION/ID     Required for represented; may be repeated.
  --evidence URL         Required for represented/rejected; may be repeated.
Statuses: needs_review, represented, deferred, rejected.
The queue must be unchanged since the summary. Unknown IDs, invalid mappings,
concurrent discovery/review writes and symlinks are refused. Decision history
is retained. No source fetching, website changes, scheduling or publication.`;

export function parseReviewArgs(args) {
  const options = {}, repeated = { '--entry': [], '--evidence': [] };
  const allowed = new Set(['--source', '--status', '--since', '--from', '--id', '--decide', '--note', '--entry', '--evidence']);
  for (let i = 0; i < args.length; i++) {
    const key = args[i];
    if (!allowed.has(key) || !args[i + 1] || args[i + 1].startsWith('--')) throw new Error(`Unknown option or missing value: ${key}. Use --help.`);
    const value = args[++i];
    if (key in repeated) repeated[key].push(value);
    else if (key in options) throw new Error(`Repeated option: ${key}.`);
    else options[key] = value;
  }
  const mutation = ['--from', '--id', '--decide', '--note'].some(key => key in options) || Object.values(repeated).some(values => values.length);
  if (mutation) {
    if (['--source', '--status', '--since'].some(key => key in options) || ['--from', '--id', '--decide', '--note'].some(key => !options[key])) throw new Error('Decisions require --from, --id, --decide and --note; summary filters cannot be mixed with decisions.');
    return { summaryPath: options['--from'], decisions: options['--id'].split(',').map(id => ({ id, status: options['--decide'], note: options['--note'], entries: repeated['--entry'], evidence: repeated['--evidence'] })) };
  }
  return { sources: options['--source']?.split(',') || [], statuses: options['--status'] === 'all' ? [] : options['--status']?.split(',') || ['needs_review'], since: options['--since'] || null };
}
async function main(args) {
  if (args.includes('--help')) return console.log(HELP);
  const options = parseReviewArgs(args), entries = catalogEntries(await loadCatalog());
  if (options.decisions) return console.log(JSON.stringify(await saveDecisions({ ...options, entries })));
  const { report, filename } = await writeSummary({ ...options, entries });
  console.log(JSON.stringify(report.counts)); console.log(`Review ${path.relative(ROOT, filename.replace(/\.json$/, '.md'))}; use its .json companion with --from.`);
}
if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  main(process.argv.slice(2)).catch(error => { console.error(error.message); process.exitCode = 1; });
}
