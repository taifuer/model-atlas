const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { create } = require('../src/explore-player.js');

function clock() {
  let now = 0;
  let serial = 0;
  const jobs = new Map();
  const callbacks = [];
  return {
    schedule(callback, delay) {
      const id = serial++;
      jobs.set(id, { at: now + delay, callback });
      callbacks.push(callback);
      return id;
    },
    cancel(id) { jobs.delete(id); },
    tick(amount) {
      const end = now + amount;
      while (true) {
        const next = [...jobs.entries()].sort((a, b) => a[1].at - b[1].at)[0];
        if (!next || next[1].at > end) break;
        jobs.delete(next[0]);
        now = next[1].at;
        next[1].callback();
      }
      now = end;
    },
    get count() { return jobs.size; },
    get lastCallback() { return callbacks.at(-1); },
  };
}

function setup(options = {}) {
  const timer = clock();
  const changes = [];
  const player = create({ length: 3, interval: 1000, schedule: timer.schedule,
    cancel: timer.cancel, onChange: (state, reason) => changes.push({ ...state, reason }), ...options });
  return { player, timer, changes };
}

test('exports the same API in a browser without CommonJS or DOM', () => {
  const context = { window: {}, setTimeout, clearTimeout };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../src/explore-player.js'), 'utf8'), context);
  assert.equal(typeof context.window.ATLAS_PLAYER.create, 'function');
  assert.equal(context.window.ATLAS_PLAYER.create({ length: 2 }).snapshot().playing, false);
});

test('starts paused and each event, including the final event, gets its full interval', () => {
  const { player, timer, changes } = setup();
  assert.deepEqual(player.snapshot(), { index: 0, playing: false, ended: false, speed: 1 });
  assert.equal(timer.count, 0);
  player.play();
  timer.tick(999);
  assert.equal(player.snapshot().index, 0);
  timer.tick(1);
  assert.equal(player.snapshot().index, 1);
  timer.tick(1000);
  assert.deepEqual(player.snapshot(), { index: 2, playing: true, ended: false, speed: 1 });
  timer.tick(999);
  assert.equal(player.snapshot().playing, true);
  timer.tick(1);
  assert.deepEqual(player.snapshot(), { index: 2, playing: false, ended: true, speed: 1 });
  assert.equal(timer.count, 0);
  assert.deepEqual(changes.map(change => change.reason), ['play', 'advance', 'advance', 'end']);
  timer.tick(20000);
  assert.equal(changes.length, 4);
});

test('pause cancels a timer whose handle is zero and never resumes on its own', () => {
  const { player, timer, changes } = setup();
  player.play();
  const stale = timer.lastCallback;
  timer.tick(400);
  player.pause();
  assert.equal(timer.count, 0);
  timer.tick(5000);
  stale();
  assert.equal(player.snapshot().index, 0);
  assert.equal(player.snapshot().playing, false);
  assert.deepEqual(changes.map(change => change.reason), ['play', 'pause']);
  player.pause();
  assert.equal(changes.length, 2);
  player.play();
  timer.tick(999);
  assert.equal(player.snapshot().index, 0);
  timer.tick(1);
  assert.equal(player.snapshot().index, 1);
});

test('seek pauses, clamps and invalidates an old callback even after playback resumes', () => {
  const { player, timer, changes } = setup();
  player.play();
  const stale = timer.lastCallback;
  player.seek(1.9);
  assert.deepEqual(player.snapshot(), { index: 1, playing: false, ended: false, speed: 1 });
  assert.equal(timer.count, 0);
  player.play();
  stale();
  assert.equal(player.snapshot().index, 1);
  assert.equal(timer.count, 1);
  timer.tick(1000);
  assert.equal(player.snapshot().index, 2);
  player.seek(99);
  assert.equal(player.snapshot().index, 2);
  player.seek(-10);
  assert.equal(player.snapshot().index, 0);
  assert.ok(changes.some(change => change.reason === 'seek' && !change.playing));
});

test('next and previous pause playback, clamp at boundaries and can revisit a finished item', () => {
  const { player, timer } = setup({ length: 2 });
  player.previous();
  assert.equal(player.snapshot().index, 0);
  player.play();
  player.next();
  assert.deepEqual(player.snapshot(), { index: 1, playing: false, ended: false, speed: 1 });
  assert.equal(timer.count, 0);
  player.next();
  assert.equal(player.snapshot().index, 1);
  player.play();
  timer.tick(1000);
  assert.equal(player.snapshot().ended, true);
  player.previous();
  assert.deepEqual(player.snapshot(), { index: 0, playing: false, ended: false, speed: 1 });
});

test('play restarts only after completion and repeated play never stacks timers', () => {
  const { player, timer, changes } = setup({ initialIndex: 1 });
  player.play();
  for (let i = 0; i < 20; i++) player.play();
  assert.equal(timer.count, 1);
  assert.equal(changes.length, 1);
  timer.tick(2000);
  assert.equal(player.snapshot().ended, true);
  player.play();
  assert.deepEqual(player.snapshot(), { index: 0, playing: true, ended: false, speed: 1 });
  assert.equal(timer.count, 1);
});

test('single-item sequences display the item for a full interval and can replay', () => {
  const { player, timer, changes } = setup({ length: 1 });
  player.play();
  timer.tick(999);
  assert.equal(player.snapshot().ended, false);
  timer.tick(1);
  assert.equal(player.snapshot().ended, true);
  assert.deepEqual(changes.map(change => change.reason), ['play', 'end']);
  player.play();
  assert.equal(player.snapshot().index, 0);
  assert.equal(player.snapshot().ended, false);
});

test('changing speed restarts the current interval without changing playing state', () => {
  const { player, timer, changes } = setup();
  player.play();
  const stale = timer.lastCallback;
  timer.tick(600);
  player.setSpeed(2);
  stale();
  timer.tick(499);
  assert.equal(player.snapshot().index, 0);
  timer.tick(1);
  assert.equal(player.snapshot().index, 1);
  player.setSpeed(0.5);
  timer.tick(1999);
  assert.equal(player.snapshot().index, 1);
  timer.tick(1);
  assert.equal(player.snapshot().index, 2);
  player.pause();
  player.setSpeed(1);
  assert.deepEqual(player.snapshot(), { index: 2, playing: false, ended: false, speed: 1 });
  assert.equal(timer.count, 0);
  assert.equal(changes.filter(change => change.reason === 'speed').length, 3);
});

test('unsupported speed and malformed seek inputs leave playback untouched', () => {
  const { player, timer, changes } = setup();
  player.play();
  timer.tick(600);
  for (const value of [0, -1, 3, 1.5, Infinity, NaN, null, undefined, '2']) player.setSpeed(value);
  player.setSpeed(1);
  for (const value of [Infinity, -Infinity, NaN, null, undefined, '1']) player.seek(value);
  assert.equal(changes.length, 1);
  assert.equal(timer.count, 1);
  timer.tick(400);
  assert.equal(player.snapshot().index, 1);
});

test('invalid lengths are empty, initial positions clamp and invalid intervals use the default', () => {
  for (const length of [0, -1, NaN, Infinity, null, undefined, '3']) {
    const { player, timer } = setup({ length });
    player.play();
    assert.deepEqual(player.snapshot(), { index: 0, playing: false, ended: true, speed: 1 });
    assert.equal(timer.count, 0);
  }
  assert.equal(create().snapshot().ended, true);
  assert.equal(create(null).snapshot().ended, true);
  assert.equal(create({ length: 3.8, initialIndex: 100 }).snapshot().index, 2);
  assert.equal(create({ length: 3, initialIndex: -5 }).snapshot().index, 0);
  assert.equal(create({ length: 3, initialIndex: NaN }).snapshot().index, 0);
  const { player, timer } = setup({ interval: 0 });
  player.play();
  timer.tick(6499);
  assert.equal(player.snapshot().index, 0);
  timer.tick(1);
  assert.equal(player.snapshot().index, 1);
});

test('destroy cancels pending work and every later method is inert', () => {
  const { player, timer, changes } = setup();
  player.play();
  const stale = timer.lastCallback;
  player.destroy();
  const destroyed = player.snapshot();
  assert.equal(timer.count, 0);
  stale();
  timer.tick(10000);
  player.play(); player.pause(); player.seek(2); player.next(); player.previous();
  player.setSpeed(2); player.destroy();
  assert.deepEqual(player.snapshot(), destroyed);
  assert.equal(changes.length, 1);
  assert.equal(timer.count, 0);
});

test('callbacks can pause or destroy a player without allowing another timer', () => {
  for (const action of ['pause', 'destroy']) {
    const timer = clock();
    const player = create({ length: 3, interval: 1000, schedule: timer.schedule, cancel: timer.cancel,
      onChange(state, reason) { if (reason === 'advance') player[action](); } });
    player.play();
    timer.tick(1000);
    assert.equal(player.snapshot().playing, false);
    assert.equal(timer.count, 0);
    timer.tick(5000);
    assert.equal(player.snapshot().index, 1);
  }
});

test('a speed change inside an advance callback creates exactly one new interval', () => {
  const timer = clock();
  const player = create({ length: 3, interval: 1000, schedule: timer.schedule, cancel: timer.cancel,
    onChange(state, reason) { if (reason === 'advance' && state.index === 1) player.setSpeed(2); } });
  player.play();
  timer.tick(1000);
  assert.equal(timer.count, 1);
  timer.tick(500);
  assert.equal(player.snapshot().index, 2);
  assert.equal(timer.count, 1);
});

test('snapshots and notifications cannot mutate internal state', () => {
  const { player, timer, changes } = setup();
  const initial = player.snapshot();
  initial.index = 2; initial.playing = true; initial.speed = 0;
  assert.equal(player.snapshot().index, 0);
  player.play();
  changes[0].index = 99;
  timer.tick(1000);
  assert.equal(player.snapshot().index, 1);
});
