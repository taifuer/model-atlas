const { test } = require('node:test');
const assert = require('node:assert/strict');

const catalog = import('../scripts/prerender.mjs').then(({ loadCatalog }) => loadCatalog());

test('Sashiko records its public release, license, and subsequent adoption in kernel review', async () => {
  const { ATLAS_CATALOG, ATLAS_ICONS } = await catalog;
  const entry = ATLAS_CATALOG.get('agents:sashiko');
  assert.equal(entry.release.date, '2026-03-17');
  assert.equal(entry.release.category, 'coding');
  assert.equal(entry.release.openness.status, 'open');
  assert.equal(entry.release.openness.licenses[0].name, 'Apache 2.0');
  assert.equal(ATLAS_ICONS.release(entry.release), 'assets/icons/sashiko.ico');
  assert.match(entry.release.en.details, /241,000 completed patch reviews/);
  assert.match(entry.release.en.details, /mainline kernel commits that credit Sashiko/);
});

test('M890 chip metrics distinguish interconnect bandwidth from supernode capability', async () => {
  const { ATLAS_CATALOG } = await catalog;
  const { release } = ATLAS_CATALOG.get('hardware:thead-zhenwu-m890');
  assert.equal(release.date, '2026-05-20');
  assert.equal(release.kind, 'announcement');
  const facts = new Map(release.hardware.facts.map(fact => [fact.labelEn, fact.value]));
  assert.equal(facts.get('Memory'), '144 GB');
  assert.equal(facts.get('Chip-to-chip bandwidth'), '800 GB/s');
  assert.match(release.en.details, /supernode instance launched in August/);
});

test('desktop availability, Azure preview, and llama.cpp v1.0 stay with their original releases', async () => {
  const { ATLAS_CATALOG } = await catalog;
  const spark = ATLAS_CATALOG.get('hardware:nvidia-rtx-spark');
  const rubin = ATLAS_CATALOG.get('hardware:nvidia-rubin');
  const llama = ATLAS_CATALOG.get('technology:llama-cpp');
  assert.equal(spark.parentKey, 'hardware:dgx-spark');
  assert.equal(spark.release.date, '2026-05-31');
  assert.match(spark.release.en.details, /desktops went on sale on November 18/);
  assert.equal(rubin.release.date, '2026-01-05');
  assert.match(rubin.release.en.details, /November 6.*general availability of its NVL72-based A5X instances/);
  assert.match(rubin.release.en.details, /November 19.*Azure data centers.*VM preview/);
  assert.equal(llama.release.date, '2023-03-10');
  assert.match(llama.release.en.details, /November 13, 2026.*v1\.0\.0.*libllama and libggml/);
});
