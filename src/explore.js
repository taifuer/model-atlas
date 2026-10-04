/* A complete chronology, grouped by period. Navigation never filters events out. */
(() => {
  'use strict';
  const { L, escape, language, english, companyName } = window.ATLAS_UI;
  const catalog = window.ATLAS_CATALOG;
  const { periods, years, periodByEntry } = window.ATLAS_PERIODS.build(catalog.events);
  const entries = periods.flatMap(period => period.entries);
  const periodIndex = new Map(periods.map((period, index) => [period.key, index]));
  const firstInYear = new Map(years.map(year => [year.year, periodIndex.get(year.periods[0].key)]));
  const canonicalKey = key => key === 'models:transformer' ? 'technology:transformer' : key;
  const root = document.querySelector('#explore-root');
  const sections = Object.keys(catalog.sections);
  const label = key => key === 'hardware' ? L('算力硬件', 'Hardware') : english ? catalog.sections[key].en : catalog.sections[key].zh;
  const noun = count => L(`${count} 条记录`, `${count} ${count === 1 ? 'event' : 'events'}`);
  const monthName = month => new Intl.DateTimeFormat(english ? 'en' : 'zh-CN', { month: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(2000, Number(month) - 1, 1)));
  const periodName = period => period.month ? L(`${period.year} 年 ${Number(period.month)} 月`, `${monthName(period.month)} ${period.year}`) : L(`${period.year} 年`, period.year);
  function locationState() {
    const params = new URLSearchParams(location.search);
    let hashKey;
    try { if (location.hash.startsWith('#entry=')) hashKey = canonicalKey(decodeURIComponent(location.hash.slice(7))); } catch { /* Ignore malformed legacy links. */ }
    const key = periodByEntry.has(hashKey) ? hashKey : canonicalKey(params.get('at'));
    const requestedPeriod = params.get('period');
    const legacyYear = /^(\d{4})-unknown$/.exec(requestedPeriod)?.[1];
    const index = periodByEntry.get(key) ?? periodIndex.get(requestedPeriod) ?? firstInYear.get(legacyYear || params.get('year') || params.get('from'));
    return { index: index ?? 0, key: periodByEntry.has(key) ? key : null, query: (params.get('q') || '').slice(0, 300), positioned: index !== undefined };
  }
  const initial = locationState();
  let query = initial.query, matches = [], matchCursor = -1;
  let active = -1, activeYear, currentIndex = initial.index, selectedKey = initial.key;
  let scrollFrame = 0, navigatingUntil = 0;
  let interacted = false, offsets = [];
  const search = document.querySelector('#search');
  function eventHTML(entry) {
    const release = catalog.text(entry, language);
    const icon = window.ATLAS_ICONS.release(entry.release);
    return `<article class="journey-event" data-entry-key="${escape(entry.key)}" style="--event-color:var(--lane-${entry.section})"><h3><button data-open-entry="${escape(entry.key)}" aria-label="${escape(L('查看详情：', 'View details: ') + release.name)}">${icon ? `<img class="brand-icon" src="${escape(icon)}" width="23" height="23" alt="" loading="lazy" decoding="async">` : ''}<span>${escape(release.name)}</span></button></h3><div class="journey-event-meta"><span>${escape(companyName(entry.company))}</span>${entry.sections.map(section => `<span class="journey-category" data-category="${section}">${label(section)}</span>`).join('')}</div><p class="journey-summary">${escape(release.summary)}</p></article>`;
  }
  function dayHTML(day) {
    const dated = day.date.length === 10;
    const date = dated ? `<time datetime="${day.date}">${english ? new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(`${day.date}T00:00:00Z`)) : `${Number(day.date.slice(5, 7))} 月 ${Number(day.date.slice(8, 10))} 日`}</time>` : day.date.length === 7 ? `<time datetime="${day.date}">${day.date.replace('-', '.')}</time>` : '';
    return `<div class="journey-day" data-day="${day.date}" style="--day-columns:${Math.min(day.entries.length, 3)}">${date ? `<div class="journey-day-date">${date}${day.entries.length > 1 ? `<span>${noun(day.entries.length)}</span>` : ''}</div>` : ''}<div class="journey-day-cards">${day.entries.map(eventHTML).join('')}</div></div>`;
  }
  const peak = Math.max(...years.map(year => year.entries.length), 1);
  root.innerHTML = `<div class="journey-overview"><p>${years.at(-1).year}<span aria-hidden="true">—</span>${years[0].year}<span class="journey-divider" aria-hidden="true">·</span>${noun(entries.length)}</p><div class="journey-legend">${sections.map(key => `<span style="--event-color:var(--lane-${key})"><i aria-hidden="true"></i>${label(key)}<small>${entries.filter(entry => entry.section === key).length}</small></span>`).join('')}</div></div>
    <div class="journey-controls"><nav class="journey-years" aria-label="${L('按年份定位', 'Navigate by year')}">${years.map(year => `<button type="button" data-year="${year.year}" aria-label="${year.year} · ${noun(year.entries.length)}" title="${year.year} · ${noun(year.entries.length)}"><span class="journey-year-chart" aria-hidden="true"><span class="journey-year-bar" style="height:${Math.max(4, year.entries.length / peak * 36)}px">${sections.filter(key => year.counts[key]).map(key => `<i style="flex:${year.counts[key]};background:var(--lane-${key})"></i>`).join('')}</span></span><span>${year.year}</span></button>`).join('')}</nav><div class="journey-control-row"><span class="journey-active-year" id="journey-active-year"></span><nav class="journey-months" id="journey-months" aria-label="${L('按月份定位', 'Navigate by month')}"></nav></div></div>
    <div class="journey-search" id="journey-search" hidden><p id="journey-search-status" role="status"></p><div><button id="journey-match-previous">${L('上一个', 'Previous match')}</button><button id="journey-match-next">${L('下一个', 'Next match')}</button><button id="journey-search-clear">${L('清除搜索', 'Clear search')}</button></div></div>
    <div id="journey-events">${periods.map((period, index) => `<section class="journey-period${period.entries.length === 1 ? ' is-single' : ''}" id="period-${period.key}" data-period-index="${index}" aria-labelledby="period-title-${period.key}"><h2 id="period-title-${period.key}"><span>${periodName(period)}</span><small>${noun(period.entries.length)}</small></h2><div class="journey-days">${period.days.map(dayHTML).join('')}</div></section>`).join('')}</div>`;
  const cards = new Map([...root.querySelectorAll('[data-entry-key]')].map(card => [card.dataset.entryKey, card]));
  const periodNodes = [...root.querySelectorAll('[data-period-index]')];
  const controls = root.querySelector('.journey-controls');
  controls.append(root.querySelector('#journey-search'));
  const yearNav = root.querySelector('.journey-years');
  const monthsNav = root.querySelector('#journey-months');
  function readingTop() {
    return document.querySelector('.site-header').getBoundingClientRect().height + controls.getBoundingClientRect().height + 24;
  }
  function writeLocation() {
    const params = new URLSearchParams({ lang: language });
    params.set('period', periods[currentIndex].key);
    if (selectedKey) params.set('at', selectedKey);
    if (query) params.set('q', query);
    history.replaceState(history.state, '', `${location.pathname}?${params}${location.hash}`);
  }
  function measure() {
    root.style.setProperty('--journey-header', `${document.querySelector('.site-header').getBoundingClientRect().height}px`);
    root.style.setProperty('--journey-controls', `${controls.getBoundingClientRect().height}px`);
    offsets = periodNodes.map(node => node.getBoundingClientRect().top + scrollY);
  }
  function follow(index, key = null) {
    const node = key ? cards.get(key) : periodNodes[index];
    if (!node) return;
    const destination = index === 0 && !key ? 0 : Math.min(document.documentElement.scrollHeight - innerHeight, Math.max(0, scrollY + node.getBoundingClientRect().top - readingTop()));
    navigatingUntil = performance.now() + 100;
    window.scrollTo({ top: destination, behavior: 'instant' });
  }
  function revealHorizontal(nav, item) {
    if (!item) return;
    const box = item.getBoundingClientRect(), bounds = nav.getBoundingClientRect();
    if (box.left < bounds.left || box.right > bounds.right) nav.scrollLeft += box.left + box.width / 2 - bounds.left - bounds.width / 2;
  }
  function update() {
    const period = periods[currentIndex]; if (!period) return;
    if (active !== currentIndex) {
      periodNodes[active]?.classList.remove('is-current');
      active = currentIndex; periodNodes[active].classList.add('is-current');
      if (activeYear !== period.year) {
        activeYear = period.year;
        root.querySelector('#journey-active-year').textContent = activeYear;
        yearNav.querySelectorAll('[data-year]').forEach(button => {
          if (button.dataset.year === activeYear) button.setAttribute('aria-current', 'date'); else button.removeAttribute('aria-current');
        });
        monthsNav.innerHTML = years.find(year => year.year === activeYear).periods.map(item => `<button type="button" data-period="${item.key}" aria-label="${periodName(item)} · ${noun(item.entries.length)}">${item.month ? L(`${Number(item.month)} 月`, new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' }).format(new Date(Date.UTC(2000, Number(item.month) - 1, 1)))) : L(`${item.year} 年`, item.year)}</button>`).join('');
        revealHorizontal(yearNav, yearNav.querySelector(`[data-year="${activeYear}"]`));
      }
      monthsNav.querySelectorAll('button').forEach(button => {
        if (button.dataset.period === period.key) button.setAttribute('aria-current', 'date'); else button.removeAttribute('aria-current');
      });
      revealHorizontal(monthsNav, monthsNav.querySelector(`[data-period="${period.key}"]`));
    }
  }
  function markInteraction() { interacted = true; }
  function goTo(index, scroll = true, key = null) {
    if (!Number.isFinite(index)) return;
    interacted = true;
    currentIndex = Math.max(0, Math.min(periods.length - 1, Math.trunc(index)));
    selectedKey = key;
    update(); writeLocation();
    if (scroll) follow(currentIndex, key);
  }
  yearNav.addEventListener('click', event => { const button = event.target.closest('[data-year]'); if (button) goTo(firstInYear.get(button.dataset.year)); });
  monthsNav.addEventListener('click', event => { const button = event.target.closest('[data-period]'); if (button) goTo(periodIndex.get(button.dataset.period)); });
  function goToEntry(key, scroll = true) { const canonical = canonicalKey(key), index = periodByEntry.get(canonical); if (index !== undefined) goTo(index, scroll, canonical); }
  function applyQuery(value, navigate = true) {
    query = value.trim().slice(0, 300); matchCursor = -1;
    const matchingKeys = new Set(catalog.search(query, language).map(entry => entry.key));
    matches = entries.filter(entry => matchingKeys.has(entry.key)).map(entry => entry.key);
    entries.forEach(entry => cards.get(entry.key).classList.toggle('is-match', matchingKeys.has(entry.key)));
    search.value = query; search.dispatchEvent(new Event('input'));
    root.querySelector('#journey-search').hidden = !query;
    root.querySelector('#journey-search-status').textContent = L(`“${query}” · ${matches.length} 条匹配`, `“${query}” · ${matches.length} ${matches.length === 1 ? 'match' : 'matches'}`);
    for (const id of ['journey-match-previous', 'journey-match-next']) root.querySelector('#' + id).disabled = !matches.length;
    measure();
    if (navigate && matches.length) { matchCursor = 0; goToEntry(matches[0]); }
    else if (navigate) { markInteraction(); writeLocation(); }
  }
  root.querySelector('#journey-search-clear').addEventListener('click', () => { applyQuery('', false); writeLocation(); root.querySelector('#journey-months [aria-current]')?.focus({ preventScroll: true }); });
  function jumpMatch(direction) {
    if (!matches.length) return;
    matchCursor = matchCursor < 0 ? (direction > 0 ? 0 : matches.length - 1) : (matchCursor + direction + matches.length) % matches.length;
    goToEntry(matches[matchCursor]);
  }
  root.querySelector('#journey-match-previous').addEventListener('click', () => jumpMatch(-1));
  root.querySelector('#journey-match-next').addEventListener('click', () => jumpMatch(1));
  document.addEventListener('atlas:query', event => applyQuery(event.detail));
  document.addEventListener('atlas:entry-open', event => { goToEntry(event.detail, false); });
  // Late font layout must not undo a user's first navigation or scroll.
  document.addEventListener('wheel', markInteraction, { passive: true, capture: true });
  document.addEventListener('touchstart', markInteraction, { passive: true, capture: true });
  document.addEventListener('pointerdown', markInteraction, true);
  document.addEventListener('focusin', event => {
    markInteraction();
    const card = event.target.closest('.journey-event');
    if (card) {
      const box = event.target.getBoundingClientRect();
      // Pointer focus must not move the button between pointerdown and click.
      const reveal = event.target.matches(':focus-visible') && (box.top < readingTop() || box.bottom > innerHeight - 22);
      goToEntry(card.dataset.entryKey, reveal);
    }
  });
  document.addEventListener('keydown', markInteraction);
  window.addEventListener('scroll', () => {
    if (scrollFrame || document.querySelector('dialog[open]')) return;
    scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      if (performance.now() < navigatingUntil) return;
      const marker = scrollY + readingTop() + 2;
      let low = 0, high = offsets.length - 1;
      while (low < high) { const mid = Math.ceil((low + high) / 2); if (offsets[mid] <= marker) low = mid; else high = mid - 1; }
      if (low !== currentIndex) goTo(low, false);
    });
  }, { passive: true });
  window.addEventListener('resize', measure);
  window.addEventListener('popstate', () => { const state = locationState(); applyQuery(state.query, false); goTo(state.index, true, state.key); });
  update();
  applyQuery(query, false);
  window.ATLAS_EXPLORER = Object.freeze({ snapshot: () => ({ index: currentIndex, period: periods[currentIndex].key }), goTo, goToEntry, count: entries.length, periodCount: periods.length });
  Promise.resolve(document.fonts?.ready).then(() => {
    measure();
    if (interacted) return;
    if (initial.positioned) goTo(initial.index, true, initial.key);
    else if (query && matches.length) { matchCursor = 0; goToEntry(matches[0]); }
  });
})();
