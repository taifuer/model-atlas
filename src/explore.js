/* The complete chronology stays in the document. Playback only guides reading. */
(() => {
  'use strict';
  const { L, escape, language, english, companyName, formattedDate } = window.ATLAS_UI;
  const catalog = window.ATLAS_CATALOG;
  const entries = [...catalog.events].sort((a, b) => a.release.date.localeCompare(b.release.date) || a.key.localeCompare(b.key));
  const indexByKey = new Map(entries.map((entry, index) => [entry.key, index]));
  if (indexByKey.has('technology:transformer')) indexByKey.set('models:transformer', indexByKey.get('technology:transformer'));
  const years = [...new Set(entries.map(entry => entry.release.date.slice(0, 4)))];
  const firstInYear = new Map(years.map(year => [year, entries.findIndex(entry => entry.release.date.startsWith(year))]));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.querySelector('#explore-root');
  const normalize = value => String(value || '').normalize('NFKC').toLowerCase().replace(/[\s\-_.·/]+/g, '');
  const label = key => english ? catalog.sections[key].en : catalog.sections[key].zh;
  const icons = {
    pause: '<path d="M9 5v14M15 5v14"/>', play: '<path d="m9 5 10 7-10 7V5Z"/>',
    previous: '<path d="M6 5v14m12-14L8 12l10 7V5Z"/>', next: '<path d="M18 5v14M6 5l10 7-10 7V5Z"/>',
  };
  const svg = name => `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">${icons[name]}</svg>`;
  const noun = count => L(`${count} 条记录`, `${count} ${count === 1 ? 'event' : 'events'}`);
  function locationState() {
    const params = new URLSearchParams(location.search);
    const at = params.get('at');
    const year = params.get('year') || params.get('from');
    let hashKey;
    try { if (location.hash.startsWith('#entry=')) hashKey = decodeURIComponent(location.hash.slice(7)); } catch { /* Ignore malformed legacy links. */ }
    return { index: indexByKey.get(hashKey) ?? indexByKey.get(at) ?? firstInYear.get(year) ?? 0, query: (params.get('q') || '').slice(0, 300), positioned: indexByKey.has(hashKey) || indexByKey.has(at) || firstInYear.has(year), located: indexByKey.has(hashKey) || indexByKey.has(at) || firstInYear.has(year) || params.has('q') || params.get('play') === '0' };
  }
  const initial = locationState();
  let query = initial.query;
  let matches = [];
  let active = -1;
  let shouldFollow = false;
  let scrollBehavior = 'instant';
  let navigatingUntil = 0;
  let scrollFrame = 0;
  let offsets = [];
  let player;
  let canAutostart = true;
  const search = document.querySelector('#search');
  const group = year => entries.map((entry, index) => ({ entry, index })).filter(({ entry }) => entry.release.date.startsWith(year));
  function eventHTML(entry, index) {
    const release = catalog.text(entry, language);
    const icon = window.ATLAS_ICONS.release(entry.release);
    const date = release.date.length === 4 ? `<span title="${L('日期仅明确到年份', 'Date known to the year only')}">${release.date}</span>` : `<time datetime="${release.date}">${formattedDate(release.date)}</time>`;
    return `<li class="journey-event" id="journey-event-${index}" data-event-index="${index}" data-entry-key="${escape(entry.key)}" style="--event-color:var(--lane-${entry.section})"><span class="journey-marker" aria-hidden="true"></span><div class="journey-event-meta">${date}<span class="journey-category">${entry.sections.map(label).join(' / ')}</span><span>${escape(companyName(entry.company))}</span></div><h3><button data-open-entry="${escape(entry.key)}" aria-label="${escape(L('查看详情：', 'View details: ') + release.name)}">${icon ? `<img class="brand-icon" src="${escape(icon)}" width="24" height="24" alt="" loading="lazy" decoding="async">` : ''}<span>${escape(release.name)}</span></button></h3><p class="journey-summary">${escape(release.summary)}</p></li>`;
  }
  root.innerHTML = `<div class="journey-overview"><p>${years[0]}<span aria-hidden="true">—</span>${years.at(-1)}<span class="journey-divider" aria-hidden="true">·</span>${noun(entries.length)}</p><div class="journey-legend">${Object.keys(catalog.sections).map(key => `<span style="--event-color:var(--lane-${key})"><i aria-hidden="true"></i>${label(key)}<small>${entries.filter(entry => entry.section === key).length}</small></span>`).join('')}</div></div>
    <div class="journey-controls" role="region" aria-label="${L('时间线播放控制', 'Timeline playback controls')}"><div class="journey-control-row"><div class="journey-transport"><button class="journey-step" id="journey-previous" aria-label="${L('上一条', 'Previous event')}" title="${L('上一条', 'Previous event')}">${svg('previous')}</button><button class="journey-toggle" id="journey-toggle" aria-controls="journey-events">${svg('play')}<span>${L('播放', 'Play')}</span></button><button class="journey-step" id="journey-next" aria-label="${L('下一条', 'Next event')}" title="${L('下一条', 'Next event')}">${svg('next')}</button></div><label class="journey-select"><span class="sr-only">${L('播放速度', 'Playback speed')}</span><select id="journey-speed"><option value="0.5">0.5×</option><option value="1" selected>1×</option><option value="2">2×</option></select></label><label class="journey-select journey-year-select"><span class="sr-only">${L('跳转到年份', 'Jump to year')}</span><select id="journey-year">${years.map(year => `<option value="${year}">${year}</option>`).join('')}</select></label><span class="journey-state" id="journey-state" role="status"></span></div><label class="journey-progress"><span class="sr-only">${L('按事件顺序拖动浏览', 'Browse events in sequence')}</span><input id="journey-progress" type="range" min="0" max="${Math.max(0, entries.length - 1)}" value="${initial.index}" step="1"><span class="journey-counter" id="journey-counter"></span></label></div>
    <div class="journey-search" id="journey-search" hidden><p id="journey-search-status" role="status"></p><div><button id="journey-match-previous">${L('上一个', 'Previous match')}</button><button id="journey-match-next">${L('下一个', 'Next match')}</button><button id="journey-search-clear">${L('清除搜索', 'Clear search')}</button></div></div>
    <div class="journey-layout"><nav class="journey-years" aria-label="${L('按年份定位', 'Navigate by year')}">${years.map(year => `<button data-year="${year}"><span>${year}</span><span class="journey-year-count">${group(year).length}</span></button>`).join('')}</nav><div id="journey-events">${years.map(year => `<section class="journey-year" id="journey-year-${year}" aria-labelledby="journey-year-title-${year}"><h2 id="journey-year-title-${year}">${year}<span>${noun(group(year).length)}</span></h2><ol>${group(year).map(({ entry, index }) => eventHTML(entry, index)).join('')}</ol></section>`).join('')}</div></div>`;
  const cards = [...root.querySelectorAll('[data-event-index]')];
  const controls = root.querySelector('.journey-controls');
  const toggle = root.querySelector('#journey-toggle');
  const progress = root.querySelector('#journey-progress');
  const counter = root.querySelector('#journey-counter');
  const stateLabel = root.querySelector('#journey-state');
  const yearSelect = root.querySelector('#journey-year');
  const previous = root.querySelector('#journey-previous');
  const next = root.querySelector('#journey-next');
  function writeLocation(state) {
    const params = new URLSearchParams({ lang: language });
    if (entries[state.index]) params.set('at', entries[state.index].key);
    if (!state.playing) params.set('play', '0');
    if (query) params.set('q', query);
    history.replaceState(null, '', `${location.pathname}?${params}${location.hash}`);
  }
  function measure() {
    const headerHeight = document.querySelector('.site-header').getBoundingClientRect().height;
    root.style.setProperty('--journey-header', `${headerHeight}px`);
    root.style.setProperty('--journey-controls', `${controls.getBoundingClientRect().height}px`);
    offsets = cards.map(card => card.getBoundingClientRect().top + scrollY);
  }
  function follow(index, behavior = 'instant') {
    const card = cards[index]; if (!card) return;
    const top = document.querySelector('.site-header').getBoundingClientRect().height + controls.getBoundingClientRect().height + 22;
    const box = card.getBoundingClientRect();
    if (behavior === 'smooth' && box.top >= top && box.bottom <= innerHeight - 28) return;
    navigatingUntil = performance.now() + (behavior === 'smooth' && !reduced.matches ? 800 : 100);
    window.scrollTo({ top: Math.max(0, scrollY + box.top - top), behavior: reduced.matches ? 'instant' : behavior });
  }
  function update(state, reason) {
    const entry = entries[state.index]; if (!entry) return;
    if (active !== state.index) {
      if (cards[active]) { cards[active].classList.remove('is-current'); cards[active].removeAttribute('aria-current'); }
      active = state.index;
      cards[active].classList.add('is-current'); cards[active].setAttribute('aria-current', 'step');
      const year = entry.release.date.slice(0, 4);
      yearSelect.value = year;
      root.querySelectorAll('[data-year]').forEach(button => {
        if (button.dataset.year === year) button.setAttribute('aria-current', 'date'); else button.removeAttribute('aria-current');
      });
      const yearButton = root.querySelector(`[data-year="${year}"]`), nav = root.querySelector('.journey-years');
      if (nav.clientHeight && (yearButton.offsetTop < nav.scrollTop || yearButton.offsetTop + yearButton.offsetHeight > nav.scrollTop + nav.clientHeight)) nav.scrollTop = Math.max(0, yearButton.offsetTop - nav.clientHeight / 2);
    }
    toggle.innerHTML = `${svg(state.playing ? 'pause' : 'play')}<span>${state.playing ? L('暂停', 'Pause') : state.ended ? L('重播', 'Replay') : L('播放', 'Play')}</span><i class="journey-clock" aria-hidden="true"></i>`;
    toggle.setAttribute('aria-label', state.playing ? L('暂停自动播放', 'Pause autoplay') : state.ended ? L('从头重新播放', 'Replay from the beginning') : L('播放时间线', 'Play the timeline'));
    const status = state.playing ? L('播放中', 'Playing') : state.ended ? L('已播完', 'Finished') : L('已暂停', 'Paused');
    if (stateLabel.textContent !== status) stateLabel.textContent = status;
    controls.dataset.playing = String(state.playing);
    controls.style.setProperty('--dwell', `${6500 / state.speed}ms`);
    counter.textContent = `${state.index + 1} / ${entries.length}`;
    previous.disabled = state.index === 0; next.disabled = state.index === entries.length - 1;
    progress.value = state.index;
    progress.style.setProperty('--progress', `${state.index / Math.max(1, entries.length - 1) * 100}%`);
    progress.setAttribute('aria-valuetext', `${state.index + 1} / ${entries.length} · ${entry.release.date} · ${catalog.text(entry, language).name}`);
    if (reason !== 'initial') writeLocation(state);
    if (reason === 'advance' || shouldFollow) follow(state.index, reason === 'advance' ? 'smooth' : scrollBehavior);
  }
  player = window.ATLAS_PLAYER.create({ length: entries.length, initialIndex: initial.index, interval: 6500, onChange: update });
  function pause() {
    canAutostart = false;
    if (player.snapshot().playing) {
      player.pause();
      window.scrollTo({ top: scrollY, behavior: 'instant' });
      navigatingUntil = 0;
    }
  }
  function goTo(index, scroll = true) {
    canAutostart = false;
    shouldFollow = scroll; scrollBehavior = 'instant'; player.seek(index); shouldFollow = false;
  }
  function togglePlayback() {
    canAutostart = false;
    if (player.snapshot().playing) pause();
    else { shouldFollow = true; scrollBehavior = 'instant'; player.play(); shouldFollow = false; }
  }
  toggle.addEventListener('click', togglePlayback);
  previous.addEventListener('click', () => goTo(player.snapshot().index - 1));
  next.addEventListener('click', () => goTo(player.snapshot().index + 1));
  progress.addEventListener('input', () => goTo(Number(progress.value)));
  yearSelect.addEventListener('change', () => goTo(firstInYear.get(yearSelect.value)));
  root.querySelector('#journey-speed').addEventListener('change', event => player.setSpeed(Number(event.target.value)));
  root.querySelector('.journey-years').addEventListener('click', event => { const button = event.target.closest('[data-year]'); if (button) goTo(firstInYear.get(button.dataset.year)); });
  function applyQuery(value, navigate = true) {
    query = value.trim().slice(0, 300);
    const terms = query.split(/\s+/).filter(Boolean).map(normalize);
    matches = [];
    entries.forEach((entry, index) => {
      const translated = catalog.text(entry, language);
      const haystack = normalize([entry.release.name, translated.name, entry.release.summary, translated.summary, companyName(entry.company), entry.company.name, entry.company.nameEn, entry.company.aliases, entry.release.date].join(' '));
      const match = terms.length > 0 && terms.every(term => haystack.includes(term));
      cards[index].classList.toggle('is-match', match);
      if (match) matches.push(index);
    });
    search.value = query; search.dispatchEvent(new Event('input'));
    root.querySelector('#journey-search').hidden = !query;
    root.querySelector('#journey-search-status').textContent = L(`“${query}” · ${matches.length} 条匹配，仍展示全部记录`, `“${query}” · ${matches.length} ${matches.length === 1 ? 'match' : 'matches'}; all events remain visible`);
    for (const id of ['journey-match-previous', 'journey-match-next']) root.querySelector('#' + id).disabled = !matches.length;
    measure();
    if (navigate && matches.length) goTo(matches[0]);
    else if (navigate) { pause(); writeLocation(player.snapshot()); }
  }
  root.querySelector('#journey-search-clear').addEventListener('click', () => { applyQuery('', false); writeLocation(player.snapshot()); measure(); toggle.focus({ preventScroll: true }); });
  function jumpMatch(direction) {
    const current = player.snapshot().index;
    const target = direction > 0 ? matches.find(index => index > current) ?? matches[0] : [...matches].reverse().find(index => index < current) ?? matches.at(-1);
    if (target !== undefined) goTo(target);
  }
  root.querySelector('#journey-match-previous').addEventListener('click', () => jumpMatch(-1));
  root.querySelector('#journey-match-next').addEventListener('click', () => jumpMatch(1));
  document.addEventListener('atlas:query', event => applyQuery(event.detail));
  document.addEventListener('atlas:entry-open', event => { const index = indexByKey.get(event.detail); pause(); if (index !== undefined) goTo(index, false); });
  // User input stops the guide permanently until Play is explicitly selected.
  document.addEventListener('wheel', pause, { passive: true, capture: true });
  document.addEventListener('touchstart', event => { if (!event.target.closest('#journey-toggle, #journey-speed')) pause(); }, { passive: true, capture: true });
  document.addEventListener('pointerdown', event => { if (!event.target.closest('#journey-toggle, #journey-speed')) pause(); }, true);
  document.addEventListener('focusin', event => {
    if (!event.target.closest('#journey-toggle, #journey-speed')) pause();
    const card = event.target.closest('.journey-event');
    if (card) {
      const box = event.target.getBoundingClientRect();
      const top = document.querySelector('.site-header').getBoundingClientRect().height + controls.getBoundingClientRect().height + 12;
      if (box.top < top || box.bottom > innerHeight - 22) goTo(Number(card.dataset.eventIndex));
    }
  });
  document.addEventListener('keydown', event => {
    const interactive = event.target.closest('button, a, input, select, textarea, [contenteditable="true"]');
    if (event.code === 'Space' && !interactive && !document.querySelector('dialog[open]')) { event.preventDefault(); togglePlayback(); }
    else if (['Escape', 'Tab', 'ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End'].includes(event.key) && !event.target.closest('#journey-speed')) pause();
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  window.addEventListener('pagehide', pause);
  window.addEventListener('pageshow', event => { if (event.persisted) pause(); });
  reduced.addEventListener('change', event => { if (event.matches) pause(); });
  const dialogObserver = new MutationObserver(() => { if (document.querySelector('dialog[open]')) pause(); });
  document.querySelectorAll('dialog').forEach(dialog => dialogObserver.observe(dialog, { attributes: true, attributeFilter: ['open'] }));
  window.addEventListener('scroll', () => {
    if (scrollFrame || player.snapshot().playing || document.querySelector('dialog[open]')) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      if (performance.now() < navigatingUntil || player.snapshot().playing) return;
      const marker = scrollY + controls.getBoundingClientRect().bottom + 48;
      let low = 0, high = offsets.length - 1;
      while (low < high) { const mid = Math.ceil((low + high) / 2); if (offsets[mid] <= marker) low = mid; else high = mid - 1; }
      if (low !== player.snapshot().index) goTo(low, false);
    });
  }, { passive: true });
  window.addEventListener('resize', measure);
  window.addEventListener('popstate', () => { const state = locationState(); applyQuery(state.query, false); goTo(state.index); });
  update(player.snapshot(), 'initial');
  applyQuery(query, false);
  window.ATLAS_EXPLORER = Object.freeze({ snapshot: () => player.snapshot(), pause, goTo, count: entries.length });
  Promise.resolve(document.fonts?.ready).then(() => {
    measure();
    if (!canAutostart) return;
    if (initial.positioned) goTo(initial.index, !document.querySelector('dialog[open]'));
    else if (query && matches.length) goTo(matches[0]);
    else if (!initial.located && !reduced.matches && !document.hidden && !document.querySelector('dialog[open]')) player.play();
  });
})();
