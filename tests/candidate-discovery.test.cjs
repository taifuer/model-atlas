const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const modulePromise = import('../scripts/discover-candidates.mjs');
const source = (kind, id = kind) => ({ id, name: 'Tool', kind, url: 'https://example.com/feed', sections: ['agents'] });
const rss = `<rss><channel><item><title><![CDATA[Model 2 &amp; tools]]></title><link>https://example.com/model-2</link><pubDate>Mon, 12 Oct 2026 10:00:00 GMT</pubDate><description>Release details.</description></item></channel></rss>`;
const atom = `<feed xmlns="http://www.w3.org/2005/Atom"><entry><title>v2.0.0</title><updated>2026-10-12T10:00:00Z</updated><link rel="alternate" href="https://github.com/team/tool/releases/tag/v2.0.0"/><content type="html">&lt;p&gt;Changes&lt;/p&gt;</content></entry></feed>`;

async function fixture(t, handler) {
  const server = http.createServer(handler);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => { server.closeAllConnections(); server.close(resolve); }));
  return `http://127.0.0.1:${server.address().port}`;
}

test('RSS publication and GitHub Atom modification dates remain distinct', async () => {
  const { parseCandidates } = await modulePromise;
  const [news] = parseCandidates(rss, source('rss'));
  assert.equal(news.title, 'Model 2 & tools');
  assert.equal(news.publishedAt, '2026-10-12T10:00:00.000Z');
  assert.equal(news.dateMeaning, 'article-publication');
  const [release] = parseCandidates(atom, source('github-atom'));
  assert.equal(release.title, 'v2.0.0');
  assert.equal(release.publishedAt, null);
  assert.equal(release.modifiedAt, '2026-10-12T10:00:00.000Z');
  assert.equal(release.description, 'Changes');
  assert.equal(release.product, 'Tool');
});

test('GitHub JSON retains exact tag, prerelease and publication date', async () => {
  const { parseCandidates } = await modulePromise;
  const [release] = parseCandidates(JSON.stringify([{ name: 'Tool v3 RC', tag_name: 'v3.0-rc.1', html_url: 'https://github.com/team/tool/releases/tag/v3.0-rc.1', published_at: '2026-10-11T11:00:00Z', prerelease: true }]), source('github-json'));
  assert.equal(release.version, 'v3.0-rc.1');
  assert.equal(release.prerelease, true);
  assert.equal(release.publishedAt, '2026-10-11T11:00:00.000Z');
  assert.throws(() => parseCandidates('{"message":"API rate limit exceeded"}', source('github-json')), /releases array/);
});

test('AA preserves release-group month and Arena keeps exact configurations without invented dates', async () => {
  const { parseCandidates } = await modulePromise;
  const aa = `<a href="/models/releases/model-2"><p>Model 2 (high)</p><p>Lab · Oct 2026 · 3 variants</p></a>`;
  const [model] = parseCandidates(aa, source('aa-releases'));
  assert.equal(model.title, 'Model 2 (high)');
  assert.equal(model.publishedAt, null);
  assert.equal(model.publishedPeriod, '2026-10');
  assert.equal(model.configurationScope, 'release-group');
  const arena = `<script type="application/ld+json">${JSON.stringify({ '@type': 'ItemList', name: 'Text Arena', numberOfItems: 2, itemListElement: [{ name: 'model-2-high' }, { name: 'model-2-low' }] })}</script>`;
  const models = parseCandidates(arena, source('arena-item-list'));
  assert.deepEqual(models.map(item => item.title), ['model-2-high', 'model-2-low']);
  assert.ok(models.every(item => item.publishedAt === null && item.publishedPeriod === null));
  assert.throws(() => parseCandidates(arena.replace('"numberOfItems":2', '"numberOfItems":3'), source('arena-item-list')), /incomplete/);
});

// Synthetic cards reproduce AA's two link shapes without storing a remote page.
const aaCard = (href, title, metadata = 'Lab · Oct 2026 · 1 variant') => `<li><a href="${href}"><div><p>${title}</p><p>${metadata}</p></div><dl><dt>Intelligence</dt><dd>30</dd></dl></a></li>`;

test('AA discovers single-model and multi-configuration cards while excluding navigation and hydration', async () => {
  const { parseCandidates } = await modulePromise;
  const cards = [
    aaCard('/models/beam', 'Beam 1.0'),
    aaCard('/models/muse-open', 'Muse Spark Open'),
    aaCard('https://example.com/models/nemotron-vl', 'Nemotron 3.5 Super VL'),
    aaCard('/models/releases/model-2', 'Model 2', 'Lab · Sep 2026 · 5 variants'),
  ].join('');
  const body = `<p>4 of 510 releases</p><a href="/models/recommend">Model Recommender</a><ul>${cards}</ul>
    <script>throw new Error('Never execute remote data'); ${aaCard('/models/script-only', 'Hidden model')} releaseDate: '2026-10-16'</script>
    <template>${aaCard('/models/template-only', 'Template model')}</template>
    <!-- ${aaCard('/models/comment-only', 'Comment model')} -->`;
  const models = parseCandidates(body, source('aa-releases'));
  assert.deepEqual(models.map(item => item.title), ['Beam 1.0', 'Muse Spark Open', 'Nemotron 3.5 Super VL', 'Model 2']);
  assert.equal(models[0].url, 'https://example.com/models/beam');
  assert.deepEqual(models.map(item => item.publishedPeriod), ['2026-10', '2026-10', '2026-10', '2026-09']);
  assert.ok(models.every(item => item.publishedAt === null && item.dateMeaning === 'reported-release-month' && item.configurationScope === 'release-group'));
  const [undated] = parseCandidates(aaCard('/models/undated', 'Undated model', 'Lab · Unknown · 1 variant'), source('aa-releases'));
  assert.equal(undated.publishedAt, null);
  assert.equal(undated.publishedPeriod, null);
});

test('AA rejects partial lists and changed card structures instead of reporting a subset as success', async () => {
  const { parseCandidates } = await modulePromise;
  const card = aaCard('/models/releases/model-2', 'Model 2', 'Lab · Oct 2026 · 3 variants');
  assert.throws(() => parseCandidates('<p>2 of 510 releases</p>' + card, source('aa-releases')), /parsed 1, expected 2 of 510/);
  assert.throws(() => parseCandidates('<p>1 of 0 releases</p>' + card, source('aa-releases')), /incomplete or changed/);
  assert.throws(() => parseCandidates(card + aaCard('/models/new/path', 'New URL'), source('aa-releases')), /URL structure changed/);
  assert.throws(() => parseCandidates(card + '<a href="/models/broken"><p>Missing metadata</p><dl></dl></a>', source('aa-releases')), /card structure changed/);
  assert.throws(() => parseCandidates(aaCard('/models/empty', 'Empty group', 'Lab · Oct 2026 · 0 variants'), source('aa-releases')), /card structure changed/);
  assert.equal(parseCandidates('<p>1 of 510 releases</p>' + card + card, source('aa-releases')).length, 1, 'Repeated markup must not inflate the visible candidate count.');
});

test('broken or blocked structures fail explicitly instead of returning empty success', async () => {
  const { parseCandidates } = await modulePromise;
  for (const kind of ['rss', 'atom', 'aa-releases', 'arena-item-list']) {
    assert.throws(() => parseCandidates('<html><title>Access denied</title></html>', source(kind)));
  }
  assert.throws(() => parseCandidates('<rss><channel></channel></rss>', source('rss')), /no parseable entries/);
  assert.throws(() => parseCandidates(rss.replace('Mon, 12 Oct 2026 10:00:00 GMT', 'tomorrow'), source('rss')), /Invalid publication/);
  assert.throws(() => parseCandidates('<!DOCTYPE rss [<!ENTITY x SYSTEM "file:///etc/passwd">]>' + rss, source('rss')), /unsupported/);
});

test('exact matching and deduplication retain new versions, configs and shared-URL candidates', async () => {
  const { matchCatalog, mergeQueue } = await modulePromise;
  const entries = [{ section: 'models', id: 'model-2', name: 'Model 2', names: ['Model 2'], date: '2026-10-01', urls: ['https://example.com/models'] }];
  const item = { title: 'Model 2.1', url: 'https://example.com/models', publishedAt: null };
  assert.equal(matchCatalog(item, entries)[0].reason, 'shared-source-url');
  assert.deepEqual(matchCatalog({ ...item, url: 'https://example.com/new', title: 'Model 2 (high)' }, entries), []);
  assert.equal(matchCatalog({ ...item, title: ' MODEL 2 ' }, entries)[0].reason, 'exact-title');
  const observation = { source: source('rss'), observedAt: '2026-10-12T00:00:00Z', candidates: [item, item, { ...item, title: 'Model 2.2' }] };
  const first = mergeQueue({ schemaVersion: 1, entries: {} }, [observation], entries);
  assert.equal(Object.keys(first.entries).length, 2);
  const id = Object.keys(first.entries)[0];
  first.entries[id].status = 'deferred'; first.entries[id].reviewNote = 'Need representative impact.';
  const second = mergeQueue(first, [{ ...observation, observedAt: '2026-10-13T00:00:00Z', candidates: [item] }], entries);
  assert.equal(second.entries[id].status, 'deferred');
  assert.equal(second.entries[id].reviewNote, 'Need representative impact.');
  assert.equal(second.entries[id].firstObservedAt, '2026-10-12T00:00:00Z');
  assert.equal(second.entries[id].lastObservedAt, '2026-10-13T00:00:00Z');
  assert.equal(Object.keys(second.entries).length, 2, 'A candidate disappearing from a feed must remain in the queue.');
});

test('semantic changes reopen reviewed candidates while stable GitHub versions retain their identity', async () => {
  const { mergeQueue, parseCandidates } = await modulePromise;
  const github = source('github-atom');
  const [item] = parseCandidates(atom, github);
  const observed = { source: github, observedAt: '2026-10-12T00:00:00Z', candidates: [item], snapshot: 'snapshots/first.txt' };
  const first = mergeQueue({ schemaVersion: 1, entries: {} }, [observed], []);
  const id = Object.keys(first.entries)[0];
  first.entries[id].status = 'represented'; first.entries[id].reviewNote = 'Original release reviewed.';
  first.entries[id].reviewDecision = { entries: ['agents/example'], evidence: ['https://example.com/original'], reviewedAt: '2026-10-12T12:00:00Z' };
  const second = mergeQueue(first, [{ ...observed, candidates: [{ ...item, title: 'Release 2.0.0 — corrected notes' }], observedAt: '2026-10-13T00:00:00Z' }], []);
  assert.equal(Object.keys(second.entries).length, 1, 'Editable GitHub title must not create a second version identity.');
  assert.equal(second.entries[id].status, 'needs_review');
  assert.equal(second.entries[id].observationChange, 'changed');
  assert.equal(second.entries[id].reviewHistory[0].status, 'represented');
  assert.equal(second.entries[id].reviewHistory[0].reviewNote, 'Original release reviewed.');
  assert.deepEqual(second.entries[id].reviewHistory[0].reviewDecision.entries, ['agents/example']);
  assert.equal(second.entries[id].reviewDecision, null);
  assert.equal(second.entries[id].lastChangedAt, '2026-10-13T00:00:00Z');
  second.entries[id].status = 'represented';
  const stable = mergeQueue(second, [{ ...observed, candidates: [{ ...second.entries[id], modifiedAt: '2026-10-14T00:00:00Z' }], snapshot: 'snapshots/navigation-only.txt' }], []);
  assert.equal(stable.entries[id].status, 'represented', 'A page hash or modification timestamp alone does not reopen a decision.');
  assert.equal(stable.entries[id].lastChangedAt, '2026-10-13T00:00:00Z', 'Incremental review must retain semantic change time across unchanged observations.');
  const aa = source('aa-releases');
  const card = { title: 'Model 2', url: 'https://example.com/model-2', publishedPeriod: '2026-10', dateEvidence: 'Lab · Oct 2026 · 2 variants' };
  const aaFirst = mergeQueue({ schemaVersion: 1, entries: {} }, [{ source: aa, observedAt: observed.observedAt, candidates: [card] }], []);
  const aaId = Object.keys(aaFirst.entries)[0]; aaFirst.entries[aaId].status = 'rejected';
  const aaChanged = mergeQueue(aaFirst, [{ source: aa, observedAt: observed.observedAt, candidates: [{ ...card, dateEvidence: 'Lab · Oct 2026 · 3 variants' }] }], []);
  assert.equal(aaChanged.entries[aaId].status, 'needs_review');
  assert.equal(aaChanged.entries[aaId].reviewHistory[0].status, 'rejected');
  const long = rss.replace('Release details.', 'x'.repeat(2200) + 'A');
  const [one] = parseCandidates(long, source('rss')), [two] = parseCandidates(long.replace('A</description>', 'B</description>'), source('rss'));
  assert.equal(one.description, two.description);
  assert.notEqual(one.descriptionHash, two.descriptionHash, 'Edits beyond the excerpt remain detectable.');
});

test('bounded transport distinguishes redirects, rate limits, failures, private targets and oversized bodies', async t => {
  const { fetchDocument } = await modulePromise;
  const base = await fixture(t, (request, response) => {
    if (request.url === '/redirect') { response.writeHead(302, { location: '/feed' }); return response.end(); }
    if (request.url === '/loop') { response.writeHead(302, { location: '/loop' }); return response.end(); }
    if (request.url === '/large') return response.end('x'.repeat(1024));
    if (request.url === '/slow') return setTimeout(() => response.end('slow'), 150);
    if (/^\/(403|404|429|503)$/.test(request.url)) { response.writeHead(Number(request.url.slice(1)), { 'retry-after': '30' }); return response.end('unavailable'); }
    response.writeHead(200, { 'content-type': 'application/rss+xml' }); response.end(rss);
  });
  const options = { allowLocal: true, gate: async (_url, work) => work() };
  const redirected = await fetchDocument(base + '/redirect', options);
  assert.equal(redirected.status, 'ok'); assert.equal(redirected.redirects.length, 1); assert.equal(redirected.body, rss);
  for (const [code, status] of [[403, 'access_restricted'], [404, 'missing'], [429, 'rate_limited'], [503, 'temporary_failure']]) assert.equal((await fetchDocument(base + '/' + code, options)).status, status);
  assert.equal((await fetchDocument(base + '/large', { ...options, maxBytes: 100 })).status, 'too_large');
  assert.equal((await fetchDocument(base + '/slow', { ...options, timeout: 10 })).status, 'timeout');
  assert.equal((await fetchDocument(base + '/loop', options)).status, 'redirect_error');
  assert.equal((await fetchDocument(base + '/feed')).status, 'request_failed');
});

test('discovery persists private queue, reports partial errors, and applies since only to known publication days', async t => {
  const { runDiscovery } = await modulePromise;
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'atlas-candidates-'));
  t.after(() => fs.rm(directory, { recursive: true, force: true }));
  const base = await fixture(t, (request, response) => {
    response.writeHead(200);
    response.end(request.url === '/rss' ? rss.replace('12 Oct 2026', '11 Oct 2026') : request.url === '/atom' ? atom : 'Unexpected structure');
  });
  const sources = [{ ...source('rss'), url: base + '/rss' }, { ...source('atom'), url: base + '/atom' }, { ...source('arena-item-list'), url: base + '/broken' }];
  const { report, filename } = await runDiscovery(sources, { directory, allowLocal: true, originDelay: 0, since: '2026-10-12' });
  assert.equal(report.summary.successful, 2); assert.equal(report.summary.errors, 1);
  assert.equal(report.results[0].beforeSince, 1); assert.equal(report.results[1].undatedCount, 1);
  assert.equal(report.results[2].status, 'parse_error');
  const queue = JSON.parse(await fs.readFile(path.join(directory, 'queue.json'), 'utf8'));
  assert.equal(Object.keys(queue.entries).length, 1);
  assert.ok(filename.startsWith(path.join(directory, 'reports')));
  const saved = Object.values(queue.entries)[0];
  assert.equal(await fs.readFile(path.join(directory, saved.snapshot), 'utf8'), atom);
  assert.equal(saved.publishedAt, null);
  await assert.rejects(runDiscovery([], { directory, since: '2026-02-30' }), /exact YYYY-MM-DD/);
});

test('AA completeness failures preserve reviewed queue entries and retain the failed snapshot for inspection', async t => {
  const { runDiscovery } = await modulePromise;
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'atlas-aa-candidates-'));
  t.after(() => fs.rm(directory, { recursive: true, force: true }));
  let body = '<p>2 of 510 releases</p>' + aaCard('/models/one', 'One') + aaCard('/models/releases/two', 'Two', 'Lab · Oct 2026 · 2 variants');
  const base = await fixture(t, (_request, response) => { response.writeHead(200); response.end(body); });
  const sources = [{ ...source('aa-releases'), url: base + '/models/releases' }];
  const options = { directory, allowLocal: true, originDelay: 0, since: '2026-10-17' };
  const first = await runDiscovery(sources, options);
  assert.equal(first.report.results[0].parsedCount, 2);
  assert.equal(first.report.results[0].undatedCount, 2, 'A leaderboard month cannot be used as an exact-day cutoff.');
  const queueFile = path.join(directory, 'queue.json');
  const queue = JSON.parse(await fs.readFile(queueFile, 'utf8'));
  assert.ok(Object.values(queue.entries).every(entry => entry.status === 'needs_review'));
  const id = Object.keys(queue.entries)[0];
  queue.entries[id].status = 'deferred'; queue.entries[id].reviewNote = 'Await original release evidence.';
  await fs.writeFile(queueFile, JSON.stringify(queue));
  body = '<p>2 of 510 releases</p>' + aaCard('/models/releases/two', 'Two', 'Lab · Oct 2026 · 2 variants');
  const failed = await runDiscovery(sources, options);
  const result = failed.report.results[0];
  assert.equal(result.status, 'parse_error');
  assert.match(result.reason, /parsed 1, expected 2/);
  assert.equal(failed.report.summary.observedCandidates, 0);
  assert.equal(await fs.readFile(path.join(directory, result.snapshot), 'utf8'), body);
  const retained = JSON.parse(await fs.readFile(queueFile, 'utf8'));
  assert.deepEqual(retained.entries, queue.entries, 'A partial response must not supersede prior observations or review decisions.');
});
