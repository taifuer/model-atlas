const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const { pathToFileURL } = require('node:url');
const modulePromise = import(pathToFileURL(path.resolve(__dirname, '../scripts/review-candidates.mjs')));
const a = 'a'.repeat(64), b = 'b'.repeat(64), c = 'c'.repeat(64);
const entries = [{ section: 'models', id: 'model-a', name: 'Model A', names: ['Model A'], date: '2025-01-01', urls: ['https://example.com/a'] }];
const queue = () => ({ schemaVersion: 1, entries: {
  [a]: { id: a, title: 'Model A', url: 'https://example.com/a', source: { id: 'models' }, status: 'needs_review', firstObservedAt: '2026-10-12T00:00:00Z', lastObservedAt: '2026-10-15T00:00:00Z', fingerprint: a, reviewHistory: [], publishedAt: null },
  [b]: { id: b, title: 'Tool 2', url: 'https://example.com/b', source: { id: 'tools' }, status: 'deferred', firstObservedAt: '2026-09-12T00:00:00Z', lastChangedAt: '2026-10-14T00:00:00Z', lastObservedAt: '2026-10-15T00:00:00Z', fingerprint: b, reviewNote: 'Await adoption evidence.', reviewHistory: [{ status: 'rejected', reviewNote: 'Original reason.' }], publishedAt: '2026-01-01T00:00:00Z' },
  [c]: { id: c, title: '<script>alert(1)</script>', url: 'https://example.com/c', source: { id: 'tools' }, status: 'rejected', firstObservedAt: '2026-01-01T00:00:00Z', lastObservedAt: '2026-10-15T00:00:00Z', fingerprint: c, reviewNote: 'Routine patch.', reviewHistory: [] },
} });
async function fixture(t) {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'atlas-review-'));
  t.after(() => fs.rm(directory, { recursive: true, force: true }));
  await fs.writeFile(path.join(directory, 'queue.json'), JSON.stringify(queue()));
  return directory;
}

test('incremental summaries distinguish observations from release dates and keep overlapping match signals', async () => {
  const { summarizeQueue, summaryMarkdown } = await modulePromise;
  const report = summarizeQueue(queue(), entries, { statuses: [], since: '2026-10-12' });
  assert.equal(report.counts.selected, 2); assert.equal(report.counts.newObservations, 1); assert.equal(report.counts.contentChanges, 1); assert.equal(report.counts.possibleExisting, 1);
  assert.equal(report.entries[0].id, b, 'A changed old release remains in the incremental summary.');
  assert.deepEqual(report.entries[1].signals, ['new_observation', 'possible_existing_entry']);
  assert.equal(summarizeQueue(queue(), entries).counts.selected, 1, 'Default is pending review.');
  assert.equal(summarizeQueue(queue(), entries, { statuses: [], sources: ['models'] }).counts.selected, 1);
  assert.throws(() => summarizeQueue(queue(), entries, { sources: ['unknown'] }), /Unknown source/);
  assert.throws(() => summarizeQueue(queue(), entries, { statuses: ['published'] }), /Unknown review status/);
  assert.throws(() => summarizeQueue(queue(), entries, { since: '2026-02-30' }), /exact YYYY-MM-DD/);
  assert.doesNotMatch(summaryMarkdown(summarizeQueue(queue(), entries, { statuses: [] })), /<script>/);
});

test('explicit decisions preserve history and mappings while rejecting stale summaries', async t => {
  const { writeSummary, saveDecisions } = await modulePromise;
  const directory = await fixture(t);
  const { filename } = await writeSummary({ directory, entries, statuses: [] });
  const decisions = [{ id: a, status: 'represented', note: 'Exact version and release source match the existing entry.', entries: ['models/model-a'], evidence: ['https://example.com/a'] }, { id: b, status: 'deferred', note: 'Still missing deployment evidence.' }];
  const result = await saveDecisions({ directory, summaryPath: filename, decisions, entries });
  assert.equal(result.saved, 2);
  const saved = JSON.parse(await fs.readFile(path.join(directory, 'queue.json')));
  assert.equal(saved.entries[a].reviewDecision.entries[0], 'models/model-a');
  assert.equal(saved.entries[a].reviewDecision.evidence[0], 'https://example.com/a');
  assert.equal(saved.entries[b].reviewHistory.length, 2);
  assert.equal(saved.entries[b].reviewHistory[0].reviewNote, 'Original reason.');
  assert.equal(saved.entries[b].reviewHistory[1].reviewNote, 'Await adoption evidence.');
  assert.equal(saved.entries[c].status, 'rejected');
  await assert.rejects(saveDecisions({ directory, summaryPath: filename, decisions, entries }), /Stale review summary/);
  assert.match(await fs.readFile(filename.replace(/\.json$/, '.md'), 'utf8'), /Observation dates are not release dates/);
});

test('invalid IDs, status, reason, evidence or mapping reject the whole batch without changing the queue', async t => {
  const { writeSummary, saveDecisions } = await modulePromise;
  const directory = await fixture(t), before = await fs.readFile(path.join(directory, 'queue.json'), 'utf8');
  const { filename } = await writeSummary({ directory, entries });
  const valid = { id: a, status: 'deferred', note: 'Await evidence.' };
  for (const invalid of [
    { ...valid, id: 'd'.repeat(64) }, { ...valid, id: b }, { ...valid, status: 'published' }, { ...valid, note: '' },
    { ...valid, status: 'represented' }, { ...valid, status: 'represented', entries: ['models/unknown'] },
    { ...valid, status: 'represented', entries: ['models/model-a'] }, { ...valid, status: 'rejected', evidence: ['file:///tmp/source'] },
  ]) {
    await assert.rejects(saveDecisions({ directory, summaryPath: filename, decisions: [invalid], entries }));
    assert.equal(await fs.readFile(path.join(directory, 'queue.json'), 'utf8'), before);
  }
  await assert.rejects(saveDecisions({ directory, summaryPath: filename, decisions: [valid, valid], entries }), /repeated candidate ID/);
  assert.equal(await fs.readFile(path.join(directory, 'queue.json'), 'utf8'), before);
});

test('review shares discovery lock and refuses symlinked private input', async t => {
  const { writeSummary, saveDecisions } = await modulePromise;
  const directory = await fixture(t), { filename } = await writeSummary({ directory, entries });
  const options = { directory, summaryPath: filename, decisions: [{ id: a, status: 'deferred', note: 'Later.' }], entries };
  await fs.mkdir(path.join(directory, '.lock'));
  await assert.rejects(saveDecisions(options), { code: 'EEXIST' });
  await fs.rmdir(path.join(directory, '.lock'));
  await fs.rename(path.join(directory, 'queue.json'), path.join(directory, 'actual.json'));
  await fs.symlink(path.join(directory, 'actual.json'), path.join(directory, 'queue.json'));
  await assert.rejects(saveDecisions(options), /symlinks/);
  await assert.rejects(fs.stat(path.join(directory, '.lock')), { code: 'ENOENT' });
});

test('CLI keeps filters separate from explicit decisions and requires full context', async () => {
  const { parseReviewArgs } = await modulePromise;
  assert.deepEqual(parseReviewArgs(['--source', 'models,tools', '--status', 'all', '--since', '2026-10-12']), { sources: ['models', 'tools'], statuses: [], since: '2026-10-12' });
  assert.throws(() => parseReviewArgs(['--decide', 'rejected']), /require/);
  assert.throws(() => parseReviewArgs(['--status', 'needs_review', '--from', 'file', '--id', a, '--decide', 'deferred', '--note', 'Later']), /cannot be mixed/);
  assert.throws(() => parseReviewArgs(['--unknown', 'value']), /Unknown/);
  const options = parseReviewArgs(['--from', 'file', '--id', a, '--decide', 'represented', '--note', 'Exact release.', '--entry', 'models/model-a', '--evidence', 'https://example.com/a']);
  assert.equal(options.decisions[0].entries[0], 'models/model-a');
});
