const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { build } = require('../src/explore-periods.js');

const entry = (key, date, section = 'models', extra = {}) => ({ key, section, release: { date }, ...extra });
const keys = entries => entries.map(item => item.key);
const emptyCounts = { models: 0, agents: 0, hardware: 0, technology: 0 };

test('empty input produces empty navigation and lookup', () => {
  const result = build([]);
  assert.deepEqual(result.periods, []);
  assert.deepEqual(result.years, []);
  assert.equal(result.periodByEntry.size, 0);
});

test('year-only records retain their precision and follow the known months of their year', () => {
  const unknown = entry('technology:unknown', '2014', 'technology');
  const dated = entry('models:dated', '2014-12-31');
  const nextYear = entry('hardware:next', '2015', 'hardware');
  const result = build([nextYear, unknown, dated]);
  assert.deepEqual(result.periods.map(period => period.key), ['2015-unknown', '2014-12', '2014-unknown']);
  const period = result.periods[2];
  assert.equal(period.month, null);
  assert.equal(period.year, '2014');
  assert.deepEqual(period.days.map(day => [day.key, day.date]), [['2014', '2014']]);
  assert.strictEqual(period.entries[0], unknown);
  assert.deepEqual(result.years.map(year => year.year), ['2015', '2014']);
  assert.strictEqual(result.years[1].periods[1], period);
  assert.deepEqual(keys(result.years[1].entries), ['models:dated', 'technology:unknown']);
});

test('month-only records join their known month without inventing a day', () => {
  const monthOnly = entry('technology:month', '2024-12', 'technology');
  const result = build([
    entry('models:november', '2024-11-30'),
    monthOnly,
    entry('models:december', '2024-12-01'),
    entry('hardware:year', '2024', 'hardware'),
  ]);
  assert.deepEqual(result.periods.map(period => period.key), ['2024-12', '2024-11', '2024-unknown']);
  const period = result.periods[0];
  assert.equal(period.month, '12');
  assert.deepEqual(period.days.map(day => [day.key, day.date]), [['2024-12-01', '2024-12-01'], ['2024-12', '2024-12']]);
  assert.strictEqual(period.days[1].entries[0], monthOnly);
  assert.equal(result.periodByEntry.get(monthOnly.key), 0);
});

test('same-day events share a date group and preserve every independent identity', () => {
  const result = build([
    entry('models:second', '2026-01-02'),
    entry('technology:shared-name', '2026-01-01', 'technology'),
    entry('models:shared-name', '2026-01-01'),
    entry('agents:other', '2026-01-01', 'agents'),
  ]);
  assert.equal(result.periods.length, 1);
  const period = result.periods[0];
  assert.deepEqual(period.days.map(day => day.date), ['2026-01-02', '2026-01-01']);
  assert.deepEqual(keys(period.days[1].entries), ['agents:other', 'models:shared-name', 'technology:shared-name']);
  assert.equal(period.entries.length, 4, 'Date or name similarity never merges events');
  assert.deepEqual(period.counts, { models: 2, agents: 1, hardware: 0, technology: 1 });
  for (const item of period.entries) assert.equal(result.periodByEntry.get(item.key), 0);
});

test('ordering is deterministic and neither the input nor its entries are mutated', () => {
  const inputs = [
    entry('models:z', '2025-02-02'),
    entry('models:a', '2025-02-02'),
    entry('hardware:earlier', '2024-12-31', 'hardware'),
    entry('agents:earlier', '2025-02-01', 'agents'),
    entry('technology:march', '2025-03-01', 'technology'),
  ];
  for (const item of inputs) { Object.freeze(item.release); Object.freeze(item); }
  Object.freeze(inputs);
  const snapshot = JSON.stringify(inputs);
  const result = build(inputs);
  assert.deepEqual(result.periods.map(period => period.key), ['2025-03', '2025-02', '2024-12']);
  assert.deepEqual(keys(result.periods.flatMap(period => period.entries)), [
    'technology:march', 'models:a', 'models:z', 'agents:earlier', 'hardware:earlier',
  ]);
  assert.deepEqual(keys(build([...inputs].reverse()).periods.flatMap(period => period.entries)), keys(result.periods.flatMap(period => period.entries)));
  assert.equal(JSON.stringify(inputs), snapshot);
  for (const item of inputs) {
    const period = result.periods[result.periodByEntry.get(item.key)];
    assert.ok(period.entries.includes(item));
    assert.ok(period.days.some(day => day.entries.includes(item)));
  }
});

test('cross-listed events count only their primary section', () => {
  const result = build([entry('technology:transformer', '2017-06-12', 'technology', { sections: ['models', 'technology'] })]);
  assert.deepEqual(result.periods[0].counts, { ...emptyCounts, technology: 1 });
  assert.deepEqual(result.years[0].counts, { ...emptyCounts, technology: 1 });
});

test('invalid dates or identities fail clearly instead of inventing a period or losing entries', () => {
  for (const date of [undefined, null, 2024, '', '2024-1', '2024-00', '2024-13', '2024-1-01', '2024-00-01', '2024-13-01', '2024-01-00', '2024-04-31', '2023-02-29', '1900-02-29']) {
    assert.throws(() => build([entry('models:invalid', date)]), /Invalid release date/);
  }
  for (const date of ['2024-02-29', '2000-02-29', '2024-01', '2024-12', '2017']) assert.doesNotThrow(() => build([entry('models:valid', date)]));
  assert.throws(() => build(null), /must be an array/);
  assert.throws(() => build([entry('', '2024')]), /require a key/);
  assert.throws(() => build([entry('other:item', '2024', 'other')]), /recognized primary section/);
  assert.throws(() => build([entry('models:same', '2024'), entry('models:same', '2025')]), /Duplicate Explore entry key/);
});

test('browser export groups the real catalog with every event present exactly once', () => {
  const sourceRoot = path.join(__dirname, '..', 'src');
  const context = { window: {} };
  for (const file of ['data.js', 'data-en.js', 'data-agents.js', 'data-hardware.js', 'data-technology.js', 'catalog.js', 'explore-periods.js']) {
    vm.runInNewContext(fs.readFileSync(path.join(sourceRoot, file), 'utf8'), context, { filename: file });
  }
  const events = context.window.ATLAS_CATALOG.events;
  const snapshot = JSON.stringify(events);
  const result = context.window.ATLAS_PERIODS.build(events);
  const grouped = Array.from(result.periods).flatMap(period => Array.from(period.entries));
  assert.equal(grouped.length, events.length);
  assert.equal(new Set(grouped).size, events.length);
  assert.equal(result.periodByEntry.size, events.length);
  assert.equal(JSON.stringify(events), snapshot);
  for (const item of events) {
    const period = result.periods[result.periodByEntry.get(item.key)];
    assert.ok(grouped.includes(item), item.key);
    assert.ok(period.days.some(day => day.entries.includes(item)), item.key);
    if (item.release.date.length === 4) assert.equal(period.month, null, item.key);
  }
  for (const year of result.years) {
    assert.equal(Object.values(year.counts).reduce((sum, count) => sum + count, 0), year.entries.length);
    assert.equal(year.periods.reduce((sum, period) => sum + period.entries.length, 0), year.entries.length);
    for (const period of year.periods) assert.ok(result.periods.includes(period));
  }
});
