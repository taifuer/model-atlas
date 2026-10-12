const { test } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { mkdtemp, readFile, writeFile, rm } = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');

const modulePromise = import('../scripts/check-sources.mjs');
const page = (body, nonce = '1') => `<html><head><title>Published model documentation</title><script>window.nonce='${nonce}'</script></head><body><nav>Build ${nonce}</nav><main><h1>Model specification</h1><p>${body}</p></main><footer>Generated ${nonce}</footer></body></html>`;
const original = 'This published model has a context window of 131072 tokens. The specification applies to the named checkpoint, without a hosted API price.';

async function fixture(t, handler) {
  const server = http.createServer(handler);
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  t.after(async () => { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); });
  return `http://127.0.0.1:${server.address().port}`;
}

test('source inventory deduplicates documents and preserves exact entry identities and field scopes', async () => {
  const { collectSources, loadSources } = await modulePromise;
  const sources = collectSources({
    ATLAS_CATALOG: { sections: { models: { data: { releases: [{ id: 'exact-model', sources: [{ url: 'https://example.com/model#a' }], openness: { source: 'https://example.com/model#license' } }] } } } },
    MODEL_ATLAS_SPECS: { entries: { 'exact-model': { variants: [{ name: 'checkpoint-a', sources: ['https://example.com/model'] }] } } },
    MODEL_ATLAS_PRICES: { entries: { 'exact-model': { variants: [{ sources: ['https://example.com/prices'] }] } } },
    MODEL_ATLAS_SCORES: { entries: { 'exact-model': { aa: { model: 'Exact Model (high)', source: 'https://example.com/score' } } }, benchmarks: { aa: { methodology: 'https://example.com/methodology' } } },
  }, ['models']);
  assert.equal(sources.length, 4);
  const model = sources.find(source => source.url === 'https://example.com/model');
  assert.deepEqual(model.references.map(ref => ref.field), ['release.sources[0].url', 'release.openness.source', 'specifications.variants[0].sources[0]']);
  assert.deepEqual(model.references.map(ref => ref.originalURL), ['https://example.com/model#a', 'https://example.com/model#license', 'https://example.com/model']);
  assert.equal(model.priority, 'high');
  assert.deepEqual(model.reviewScopes, ['license', 'specification']);
  assert.ok(model.references.every(ref => ref.entryId === 'exact-model'));
  assert.match(model.id, /^[a-f0-9]{64}$/);
  const actual = await loadSources();
  assert.ok(actual.length > 400);
  assert.equal(new Set(actual.map(source => source.url)).size, actual.length);
  for (const section of ['models', 'agents', 'hardware', 'technology']) assert.ok(actual.some(source => source.references.some(ref => ref.section === section)));
  for (const scope of ['specifications.', 'prices.', 'scores.', 'types.']) assert.ok(actual.some(source => source.references.some(ref => ref.field.startsWith(scope))), scope);
  assert.ok(actual.some(source => source.references.some(ref => ref.entryId === 'zcode' || ref.entryId?.startsWith('zcode-'))));
});

test('review priorities follow mutable field scopes, not paper dates', async () => {
  const { reviewPriority } = await modulePromise;
  assert.deepEqual(reviewPriority([{ section: 'technology', entryId: 'paper-1989', field: 'release.sources[0].url' }]), { priority: 'normal', reviewScopes: [] });
  assert.deepEqual(reviewPriority([{ field: 'prices.variants[0].sources[0]' }, { field: 'scores.arena.source' }, { field: 'release.openness.source' }, { field: 'release.hardware.sources[0]' }]), { priority: 'high', reviewScopes: ['license', 'price', 'score', 'specification'] });
});

test('scope and identity filters are explicit, and acceptance cannot inherit fetching options', async () => {
  const { parseOptions, selectSources } = await modulePromise;
  const a = 'a'.repeat(64), b = 'b'.repeat(64), c = 'c'.repeat(64);
  assert.deepEqual(parseOptions(['--accept', 'report.json', '--source', `${a},${b}`, '--source', a]), { '--accept': 'report.json', '--source': [a, b] });
  for (const option of ['--scope', '--priority', '--section', '--limit', '--timeout', '--max-bytes', '--origin-delay', '--concurrency']) assert.throws(() => parseOptions(['--accept', 'report.json', option, 'high']), /cannot be combined/);
  assert.throws(() => parseOptions(['--accept', 'report.json', '--list']), /cannot be combined/);
  assert.throws(() => parseOptions(['--source', 'short-id']), /complete source IDs/);
  assert.throws(() => parseOptions(['--scope', 'price', '--scope', 'score']), /Repeated option/);
  const sources = [
    { id: a, priority: 'high', reviewScopes: ['price', 'specification'] },
    { id: b, priority: 'high', reviewScopes: ['score'] },
    { id: c, priority: 'normal', reviewScopes: [] },
  ];
  assert.deepEqual(selectSources(sources, { scopes: ['price', 'score'] }).map(source => source.id), [a, b]);
  assert.deepEqual(selectSources(sources, { priority: 'normal' }).map(source => source.id), [c]);
  assert.deepEqual(selectSources(sources, { sourceIds: [b], priority: 'high', scopes: ['score'] }).map(source => source.id), [b]);
  assert.throws(() => selectSources(sources, { scopes: ['unknown'] }), /Invalid scope/);
  assert.throws(() => selectSources(sources, { priority: 'unknown' }), /Invalid priority/);
  assert.throws(() => selectSources(sources, { sourceIds: ['d'.repeat(64)] }), /Unknown source identity/);
});

test('readable content ignores shell/script churn but retains changed specifications', async () => {
  const { fingerprint } = await modulePromise;
  const first = fingerprint(Buffer.from(page(original, 'a')), 'text/html');
  const second = fingerprint(Buffer.from(page(original, 'b')), 'text/html');
  assert.equal(first.hash, second.hash);
  assert.notEqual(first.hash, fingerprint(Buffer.from(page(original.replace('131072', '262144'))), 'text/html').hash);
  assert.equal(fingerprint(Buffer.from('{"a":1,"b":2}'), 'application/json').hash, fingerprint(Buffer.from('{"b":2,"a":1}'), 'application/json').hash);
  assert.equal(fingerprint(Buffer.from('<html><title>Just a moment...</title><body>Cloud challenge</body></html>'), 'text/html').blocked, true);
  assert.equal(fingerprint(Buffer.from('<html><title>Empty</title></html>'), 'text/html').blocked, true);
  assert.equal(fingerprint(Buffer.from('%PDF-example'), 'application/pdf').kind, 'binary');
});

test('HTTP classifications distinguish missing documents from access limits and temporary failures', async t => {
  const { probeSource } = await modulePromise;
  const url = await fixture(t, (request, response) => {
    const status = Number(request.url.slice(1));
    response.writeHead(status, { 'content-type': 'text/plain', ...(status === 429 ? { 'retry-after': '120' } : {}) });
    response.end('source unavailable');
  });
  for (const [code, status] of [[404, 'missing'], [410, 'missing'], [401, 'access_restricted'], [403, 'access_restricted'], [429, 'rate_limited'], [503, 'temporary_failure']]) {
    const observed = await probeSource({ url: `${url}/${code}` }, { allowLocal: true });
    assert.equal(observed.status, status);
    assert.equal(observed.httpStatus, code);
    assert.equal(observed.fingerprint, undefined);
    if (code === 429) assert.equal(observed.retryAfter, '120');
  }
});

test('redirects preserve document identity, reject loops and non-HTTP destinations', async t => {
  const { probeSource, compareObservation } = await modulePromise;
  const url = await fixture(t, (request, response) => {
    if (request.url === '/old') response.writeHead(301, { location: '/new' }).end();
    else if (request.url === '/loop') response.writeHead(302, { location: '/loop' }).end();
    else if (request.url === '/bad') response.writeHead(302, { location: 'file:///etc/passwd' }).end();
    else response.writeHead(200, { 'content-type': 'text/html' }).end(page(original));
  });
  const observed = await probeSource({ url: `${url}/old` }, { allowLocal: true, gate: async (_, work) => work() });
  assert.equal(observed.status, 'ok');
  assert.equal(observed.finalURL, `${url}/new`);
  assert.deepEqual(observed.redirects, [{ from: `${url}/old`, status: 301, to: `${url}/new` }]);
  assert.equal(compareObservation(observed, { ...observed, finalURL: `${url}/old` }).status, 'redirect_changed');
  assert.equal((await probeSource({ url: `${url}/loop` }, { allowLocal: true, gate: async (_, work) => work() })).status, 'redirect_error');
  assert.equal((await probeSource({ url: `${url}/bad` }, { allowLocal: true })).status, 'request_failed');
  assert.equal((await probeSource({ url: `${url}/new` })).status, 'request_failed');
});

test('timeouts, network failures, and oversized bodies remain fetch issues', async t => {
  const { probeSource, compareObservation } = await modulePromise;
  const url = await fixture(t, (request, response) => {
    if (request.url === '/large') response.writeHead(200, { 'content-type': 'text/plain' }).end('x'.repeat(3000));
    else if (request.url === '/disconnect') request.socket.destroy();
    // /timeout intentionally does not send headers; teardown closes its socket.
  });
  for (const [endpoint, expected] of [['/timeout', 'timeout'], ['/disconnect', 'request_failed'], ['/large', 'too_large']]) {
    const observed = await probeSource({ url: url + endpoint }, { allowLocal: true, timeout: 100, maxBytes: 1000 });
    assert.equal(observed.status, expected);
    assert.equal(compareObservation(observed, null).status, expected);
  }
});

test('requests to one origin are serialized and respect the configured pause', async () => {
  const { createOriginGate } = await modulePromise;
  const gate = createOriginGate(20), starts = [], ends = [];
  let active = 0, maximum = 0;
  await Promise.all([1, 2, 3].map(number => gate(`https://example.com/${number}`, async () => {
    active++; maximum = Math.max(maximum, active); starts.push(Date.now());
    await new Promise(resolve => setTimeout(resolve, 10));
    active--; ends.push(Date.now());
  })));
  assert.equal(maximum, 1);
  for (let index = 1; index < starts.length; index++) assert.ok(starts[index] - ends[index - 1] >= 18);
});

test('first observations require explicit baseline acceptance; changes remain queued and failures never replace prior evidence', async t => {
  const { runCheck, acceptReport, readBaseline } = await modulePromise;
  const { createHash } = require('node:crypto');
  const directory = await mkdtemp(path.join(os.tmpdir(), 'model-atlas-source-check-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  let body = original, status = 200;
  const url = await fixture(t, (_request, response) => response.writeHead(status, { 'content-type': 'text/html' }).end(page(body)));
  const source = { id: createHash('sha256').update(`${url}/`).digest('hex'), url: `${url}/`, references: [{ section: 'models', entryId: 'fixture', field: 'release.sources[0].url', originalURL: `${url}/#release` }] };
  const priced = { id: createHash('sha256').update(`${url}/z-price`).digest('hex'), url: `${url}/z-price`, references: [{ section: 'models', entryId: 'fixture', field: 'prices.variants[0].sources[0]', originalURL: `${url}/z-price#uncached` }] };
  const options = { directory, allowLocal: true, originDelay: 0 };
  const prioritized = await runCheck([source, priced], options);
  assert.deepEqual(prioritized.report.queue.map(item => item.priority), ['high', 'normal']);
  assert.equal(prioritized.report.queue[0].references[0].originalURL, `${url}/z-price#uncached`);
  const first = await runCheck([source], options);
  assert.deepEqual(first.report.summary, { baseline_missing: 1 });
  assert.equal((await readBaseline(directory)).digest, null);
  assert.equal(await acceptReport(first.filename, directory), 1);
  const accepted = await readBaseline(directory);
  assert.equal((await runCheck([source], options)).report.results[0].status, 'unchanged');
  body = original.replace('131072', '262144');
  const changed = await runCheck([source], options);
  assert.equal(changed.report.queue[0].status, 'content_changed');
  assert.equal((await readBaseline(directory)).digest, accepted.digest);
  assert.ok((await readFile(path.join(directory, changed.report.results[0].observed.snapshot), 'utf8')).includes('262144'));
  status = 403;
  const restricted = await runCheck([source], options);
  assert.equal(restricted.report.queue[0].status, 'access_restricted');
  assert.equal(await acceptReport(restricted.filename, directory), 0);
  assert.equal((await readBaseline(directory)).digest, accepted.digest);
  assert.equal(await acceptReport(changed.filename, directory), 1);
  assert.notEqual((await readBaseline(directory)).digest, accepted.digest);
  await assert.rejects(acceptReport(first.filename, directory), /stale/);
  await assert.rejects(acceptReport(path.join(directory, 'baseline.json'), directory), /Accept only reports/);
});

test('concurrent accept operations cannot silently overwrite a newly accepted baseline', async t => {
  const { runCheck, acceptReport, readBaseline } = await modulePromise;
  const { createHash } = require('node:crypto');
  const directory = await mkdtemp(path.join(os.tmpdir(), 'model-atlas-source-lock-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const url = await fixture(t, (_request, response) => response.writeHead(200, { 'content-type': 'text/html' }).end(page(original)));
  const source = suffix => ({ id: createHash('sha256').update(url + suffix).digest('hex'), url: url + suffix, references: [{ section: 'models', entryId: suffix.slice(1), field: 'release.sources[0].url' }] });
  const options = { directory, allowLocal: true, originDelay: 0 };
  const a = await runCheck([source('/a')], options), b = await runCheck([source('/b')], options);
  const results = await Promise.allSettled([acceptReport(a.filename, directory), acceptReport(b.filename, directory)]);
  assert.equal(results.filter(result => result.status === 'fulfilled').length, 1);
  const failure = results.find(result => result.status === 'rejected');
  assert.match(failure.reason.message, /acceptance holds|baseline is stale/);
  assert.equal(Object.keys((await readBaseline(directory)).value.entries).length, 1);
  const refreshed = await runCheck([source('/a'), source('/b')], options);
  assert.equal(await acceptReport(refreshed.filename, directory), 2);
  assert.equal(Object.keys((await readBaseline(directory)).value.entries).length, 2);
});

test('reviewed subsets can be accepted sequentially without accepting unknown, failed, or unreviewed sources', async t => {
  const { runCheck, acceptReport, readBaseline } = await modulePromise;
  const { createHash } = require('node:crypto');
  const directory = await mkdtemp(path.join(os.tmpdir(), 'model-atlas-source-subsets-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const url = await fixture(t, (request, response) => response.writeHead(request.url === '/restricted' ? 403 : 200, { 'content-type': 'text/html' }).end(page(original)));
  const source = suffix => ({ id: createHash('sha256').update(url + suffix).digest('hex'), url: url + suffix, references: [{ section: 'models', entryId: suffix.slice(1), field: 'release.sources[0].url' }] });
  const [existing, a, b, restricted] = ['/existing', '/a', '/b', '/restricted'].map(source);
  const options = { directory, allowLocal: true, originDelay: 0 };
  await acceptReport((await runCheck([existing], options)).filename, directory);
  const originalBaseline = await readBaseline(directory);
  const batch = await runCheck([a, b, restricted], options);
  await assert.rejects(acceptReport(batch.filename, directory, [a.id, 'f'.repeat(64)]), /Unknown source identity/);
  await assert.rejects(acceptReport(batch.filename, directory, [a.id, restricted.id]), /no successful observation/);
  await assert.rejects(acceptReport(batch.filename, directory, []), /at least one source/);
  assert.equal((await readBaseline(directory)).digest, originalBaseline.digest);
  assert.equal(await acceptReport(batch.filename, directory, [a.id]), 1);
  let accepted = await readBaseline(directory);
  assert.deepEqual(Object.keys(accepted.value.entries).sort(), [existing.id, a.id].sort());
  assert.deepEqual(accepted.value.entries[existing.id], originalBaseline.value.entries[existing.id]);
  const aRecord = accepted.value.entries[a.id];
  assert.equal(await acceptReport(batch.filename, directory, [b.id]), 1);
  accepted = await readBaseline(directory);
  assert.deepEqual(Object.keys(accepted.value.entries).sort(), [existing.id, a.id, b.id].sort());
  assert.deepEqual(accepted.value.entries[a.id], aRecord);
  assert.equal(await acceptReport(batch.filename, directory, [a.id, b.id]), 0);
  assert.equal((await readBaseline(directory)).digest, accepted.digest);
  const receipt = JSON.parse(await readFile(path.join(directory, 'acceptances', createHash('sha256').update(await readFile(batch.filename)).digest('hex') + '.json'), 'utf8'));
  assert.deepEqual(receipt.sourceIds, [a.id, b.id].sort());
  assert.equal(receipt.baselineDigest, accepted.digest);
});

test('partial acceptance cannot continue after an unrelated baseline update or a modified report', async t => {
  const { runCheck, acceptReport, readBaseline } = await modulePromise;
  const { createHash } = require('node:crypto');
  const directory = await mkdtemp(path.join(os.tmpdir(), 'model-atlas-source-stale-subsets-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const url = await fixture(t, (_request, response) => response.writeHead(200, { 'content-type': 'text/html' }).end(page(original)));
  const source = suffix => ({ id: createHash('sha256').update(url + suffix).digest('hex'), url: url + suffix, references: [{ section: 'models', entryId: suffix.slice(1), field: 'release.sources[0].url' }] });
  const [a, b, c] = ['/a', '/b', '/c'].map(source), options = { directory, allowLocal: true, originDelay: 0 };
  const batch = await runCheck([a, b], options);
  await acceptReport(batch.filename, directory, [a.id]);
  const reportText = await readFile(batch.filename, 'utf8');
  await writeFile(batch.filename, reportText + '\n');
  await assert.rejects(acceptReport(batch.filename, directory, [b.id]), /stale/);
  await writeFile(batch.filename, reportText);
  const separate = await runCheck([c], options);
  await acceptReport(separate.filename, directory, [c.id]);
  const accepted = await readBaseline(directory);
  await assert.rejects(acceptReport(batch.filename, directory, [b.id]), /stale/);
  assert.equal((await readBaseline(directory)).digest, accepted.digest);
  assert.equal(accepted.value.entries[b.id], undefined);
  assert.equal(await acceptReport((await runCheck([b], options)).filename, directory, [b.id]), 1);
});

test('a selected changed snapshot rejects the entire batch before any baseline write', async t => {
  const { runCheck, acceptReport, readBaseline } = await modulePromise;
  const { createHash } = require('node:crypto');
  const directory = await mkdtemp(path.join(os.tmpdir(), 'model-atlas-source-subset-integrity-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const url = await fixture(t, (request, response) => response.writeHead(200, { 'content-type': 'text/html' }).end(page(original + request.url)));
  const source = suffix => ({ id: createHash('sha256').update(url + suffix).digest('hex'), url: url + suffix, references: [{ section: 'models', entryId: suffix.slice(1), field: 'release.sources[0].url' }] });
  const [a, b] = ['/a', '/b'].map(source), options = { directory, allowLocal: true, originDelay: 0 };
  const batch = await runCheck([a, b], options);
  await writeFile(path.join(directory, batch.report.results[1].observed.snapshot), 'tampered snapshot');
  await assert.rejects(acceptReport(batch.filename, directory, [a.id, b.id]), /snapshot is missing or changed/);
  assert.equal((await readBaseline(directory)).digest, null);
  assert.equal(await acceptReport(batch.filename, directory, [a.id]), 1);
  assert.equal((await readBaseline(directory)).value.entries[b.id], undefined);
});


test('HTML fingerprints keep document headers and ignore markup-like strings inside attributes', async () => {
  const { fingerprint } = await modulePromise;
  const document = nonce => `<html><title>Alpaca weight differences</title><body><nav>Site shell ${nonce}</nav><main><div data-props='{"token":"</s>","nonce":"${nonce}"}'><header><h1>Alpaca</h1><p>License: CC BY-NC 4.0</p></header><p>These weight differences reconstruct the research model when applied to the original base weights.</p></div></main></body></html>`;
  const first = fingerprint(Buffer.from(document('one')), 'text/html');
  assert.equal(first.hash, fingerprint(Buffer.from(document('two')), 'text/html').hash);
  assert.match(first.text, /License: CC BY-NC 4.0/);
  assert.match(first.text, /weight differences reconstruct/);
  assert.doesNotMatch(first.text, /nonce|token|Site shell|one/);
  assert.notEqual(first.hash, fingerprint(Buffer.from(document('one').replace('CC BY-NC 4.0', 'Apache 2.0')), 'text/html').hash);
  const article = fingerprint(Buffer.from(`<html><title>Model card</title><article data-config='{"token":"<s>"}'><header>Model X, October 12</header><p>${original}</p></article></html>`), 'text/html');
  assert.match(article.text, /Model X, October 12/);
  assert.match(article.text, /131072/);
  assert.doesNotMatch(article.text, /"token"|data-config/);
});
