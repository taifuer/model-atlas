/* Time-based navigation, independent of the page and its animation settings. */
(function (root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.ATLAS_PLAYER = api;
})(typeof window === 'object' ? window : null, function () {
  'use strict';

  function create(options = {}) {
    options = options && typeof options === 'object' ? options : {};
    const length = Number.isFinite(options.length)
      ? Math.min(Number.MAX_SAFE_INTEGER, Math.max(0, Math.floor(options.length))) : 0;
    const interval = Number.isFinite(options.interval) && options.interval > 0
      ? options.interval : 6500;
    const schedule = typeof options.schedule === 'function' ? options.schedule : setTimeout;
    const cancel = typeof options.cancel === 'function' ? options.cancel : clearTimeout;
    const onChange = typeof options.onChange === 'function' ? options.onChange : () => {};
    const clamp = value => Math.max(0, Math.min(Math.max(0, length - 1), Math.trunc(value)));
    let index = Number.isFinite(options.initialIndex) ? clamp(options.initialIndex) : 0;
    let playing = false;
    let ended = length === 0;
    let speed = 1;
    let timer = null;
    let revision = 0;
    let destroyed = false;

    const snapshot = () => ({ index, playing, ended, speed });
    const emit = reason => { if (!destroyed) onChange(snapshot(), reason); };

    function clearTimer() {
      // A queued callback can survive cancellation. Its revision must also match.
      revision++;
      if (timer !== null) cancel(timer);
      timer = null;
    }

    function arm() {
      clearTimer();
      if (destroyed || !playing || !length) return;
      const expected = revision;
      timer = schedule(() => {
        if (destroyed || !playing || revision !== expected) return;
        timer = null;
        if (index < length - 1) {
          index++;
          emit('advance');
          // A consumer can pause, seek or change speed from its callback.
          if (!destroyed && playing && revision === expected) arm();
        } else {
          playing = false;
          ended = true;
          emit('end');
        }
      }, interval / speed);
    }

    function play() {
      if (destroyed || playing || !length) return snapshot();
      if (ended) index = 0;
      ended = false;
      playing = true;
      const expected = revision;
      emit('play');
      if (!destroyed && playing && revision === expected) arm();
      return snapshot();
    }

    function pause() {
      if (destroyed) return snapshot();
      clearTimer();
      if (playing) {
        playing = false;
        emit('pause');
      }
      return snapshot();
    }

    function seek(value) {
      if (destroyed || !Number.isFinite(value)) return snapshot();
      clearTimer();
      index = clamp(value);
      playing = false;
      ended = length === 0;
      emit('seek');
      return snapshot();
    }

    function setSpeed(value) {
      if (destroyed || ![0.5, 1, 2].includes(value) || speed === value) return snapshot();
      clearTimer();
      speed = value;
      const expected = revision;
      emit('speed');
      if (!destroyed && playing && revision === expected) arm();
      return snapshot();
    }

    function destroy() {
      if (!destroyed) {
        destroyed = true;
        playing = false;
        clearTimer();
      }
      return snapshot();
    }

    return { snapshot, play, pause, seek, next: () => seek(index + 1),
      previous: () => seek(index - 1), setSpeed, destroy };
  }

  return { create };
});
