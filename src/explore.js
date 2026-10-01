(() => {
  'use strict';
  const { L, escape, language, english, companyName } = window.ATLAS_UI;
  const { events, sections, text } = window.ATLAS_CATALOG;
  const keys = Object.keys(sections);
  const firstYear = Math.min(...events.map(entry => Number(entry.release.date.slice(0, 4))));
  const lastYear = Math.max(...keys.map(key => Number(sections[key].data.asOf.slice(0, 4))));
  const years = Array.from({ length: lastYear - firstYear + 1 }, (_, index) => firstYear + index);
  const organizations = new Map(events.map(entry => [entry.company.id, entry.company]));
  const root = document.querySelector('#explore-root');
  const yearValue = (value, fallback) => /^\d{4}$/.test(value || '') && years.includes(Number(value)) ? Number(value) : fallback;
  const normalize = value => String(value).normalize('NFKC').toLowerCase().replace(/[\s\-_.·/]+/g, '');
  function read() {
    const p = new URLSearchParams(location.search);
    const from = yearValue(p.get('from'), firstYear), to = yearValue(p.get('to'), lastYear);
    return { from: Math.min(from, to), to: Math.max(from, to), scale: p.get('scale') === 'month' ? 'month' : 'year', company: organizations.has(p.get('company')) ? p.get('company') : '', sections: p.has('sections') ? keys.filter(key => p.get('sections').split(',').includes(key)) : [...keys], milestones: p.get('milestones') !== '0', query: (p.get('q') || '').slice(0, 300) };
  }
  let state = read();
  let scrollToLatest = true;
  function write(mode = 'push') {
    const p = new URLSearchParams({ lang: language });
    if (state.from !== firstYear) p.set('from', state.from);
    if (state.to !== lastYear) p.set('to', state.to);
    if (state.scale !== 'year') p.set('scale', state.scale);
    if (state.company) p.set('company', state.company);
    if (state.sections.length !== keys.length) p.set('sections', state.sections.join(',') || 'none');
    if (!state.milestones) p.set('milestones', '0');
    if (state.query) p.set('q', state.query);
    const url = `${location.pathname}?${p}`;
    if (url !== location.pathname + location.search || location.hash) history[mode === 'replace' ? 'replaceState' : 'pushState'](null, '', url);
  }
  function matching(entry, ignoreCompany = false) {
    const release = entry.release, year = Number(release.date.slice(0, 4));
    if (year < state.from || year > state.to || state.milestones && !release.milestone || !entry.sections.some(key => state.sections.includes(key)) || !ignoreCompany && state.company && release.company !== state.company) return false;
    const translated = text(entry, language);
    const haystack = normalize([release.name, translated.name, release.summary, translated.summary, entry.company.name, entry.company.nameEn, entry.company.aliases, release.date].join(' '));
    return state.query.trim().split(/\s+/).filter(Boolean).every(term => haystack.includes(normalize(term)));
  }
  const lane = entry => state.sections.includes(entry.section) ? entry.section : entry.sections.find(key => state.sections.includes(key));
  const label = key => english ? sections[key].en : sections[key].zh;
  function node(entry, mobile = false) {
    const release = text(entry, language), src = window.ATLAS_ICONS.release(entry.release);
    const date = release.date.length === 4 ? L('仅年份', 'Year only') : release.date.slice(5).replace('-', '.');
    const joint = entry.sections.length > 1 ? ` · ${entry.sections.map(label).join(' / ')}` : '';
    return `<button class="explore-event${mobile ? ' explore-event-mobile' : ''}" data-open-entry="${entry.key}" aria-label="${escape(`${release.name} · ${release.date} · ${companyName(entry.company)}${joint}`)}"><span class="explore-event-date">${date}</span><span class="explore-event-name">${src ? `<img class="brand-icon" src="${src}" width="17" height="17" alt="" loading="lazy">` : ''}<span>${escape(release.name)}</span></span>${mobile ? `<span class="explore-event-company">${escape(companyName(entry.company))}</span>` : ''}</button>`;
  }
  function render() {
    const active = root.contains(document.activeElement) ? document.activeElement : null;
    const focusId = active?.id;
    const focusSection = active?.dataset.section;
    const focusScale = active?.dataset.scale;
    const search = document.querySelector('#search');
    search.value = state.query;
    search.dispatchEvent(new Event('input'));
    const oldScroll = root.querySelector('.explore-scroll')?.scrollLeft || 0;
    const entries = events.filter(entry => matching(entry)).sort((a, b) => b.release.date.localeCompare(a.release.date) || a.key.localeCompare(b.key));
    const viable = new Set(events.filter(entry => matching(entry, true)).map(entry => entry.company.id));
    const options = [...organizations.values()].filter(company => viable.has(company.id) || company.id === state.company).sort((a, b) => companyName(a).localeCompare(companyName(b), english ? 'en' : 'zh'));
    const hasFilters = state.from !== firstYear || state.to !== lastYear || state.company || state.sections.length !== keys.length || !state.milestones || state.query;
    const yearOptions = selected => years.map(year => `<option value="${year}"${year === selected ? ' selected' : ''}>${year}</option>`).join('');
    const periods = [...new Set(entries.map(entry => state.scale === 'month' && entry.release.date.length > 4 ? entry.release.date.slice(0, 7) : entry.release.date.slice(0, 4)))].sort();
    const heading = period => period.length === 4 ? period + (state.scale === 'month' ? ` · ${L('仅年份', 'Year only')}` : '') : `${period.slice(0, 4)}.${period.slice(5)}`;
    root.innerHTML = `<div class="explore-toolbar"><div class="explore-range"><label>${L('起始年份', 'From')}<select id="explore-from">${yearOptions(state.from)}</select></label><span aria-hidden="true">—</span><label>${L('结束年份', 'To')}<select id="explore-to">${yearOptions(state.to)}</select></label></div><label class="explore-organization">${L('机构', 'Organization')}<select id="explore-company"><option value="">${L('全部机构', 'All organizations')}</option>${options.map(company => `<option value="${company.id}"${company.id === state.company ? ' selected' : ''}>${escape(companyName(company))}</option>`).join('')}</select></label><div class="explore-scale" role="group" aria-label="${L('时间尺度', 'Time scale')}"><button data-scale="year" aria-pressed="${state.scale === 'year'}">${L('年', 'Year')}</button><button data-scale="month" aria-pressed="${state.scale === 'month'}">${L('月', 'Month')}</button></div><button class="outline-button button-small" id="explore-overview">${L('全览', 'Full period')}</button><label class="milestone-toggle"><input id="explore-milestones" type="checkbox"${state.milestones ? ' checked' : ''}><span class="switch" aria-hidden="true"></span>${L('只看里程碑', 'Milestones')}</label></div>
    <div class="explore-filter-row"><div class="explore-sections" role="group" aria-label="${L('选择板块', 'Select timelines')}">${keys.map(key => `<label style="--lane-color:var(--lane-${key})"><input type="checkbox" data-section="${key}"${state.sections.includes(key) ? ' checked' : ''}>${label(key)}</label>`).join('')}</div><div class="explore-result-tools"><p id="explore-count" role="status" aria-live="polite">${L(`${entries.length} 条记录`, `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}`)}</p>${hasFilters ? `<button class="explore-clear" id="explore-reset">${L('清除筛选', 'Clear filters')}</button>` : ''}</div></div>
    ${state.query ? `<div class="explore-query"><button class="filter-chip" id="explore-clear-query" aria-label="${L('清除搜索', 'Clear search')}">${escape(state.query)} <span aria-hidden="true">×</span></button></div>` : ''}
    ${entries.length ? `<div class="explore-desktop"><div class="explore-scroll" tabindex="0" role="region" aria-label="${L('按时间横向浏览，点击年份展开月份', 'Browse horizontally; select a year to see its months')}"><div class="explore-board" style="--periods:${periods.length}"><div class="explore-corner">${L('时间', 'Time')}</div>${periods.map(period => state.scale === 'year' ? `<button class="explore-period" data-period="${period}" aria-label="${escape(L(`查看 ${period} 年月份`, `View months in ${period}`))}">${heading(period)}</button>` : `<div class="explore-period">${heading(period)}</div>`).join('')}${state.sections.filter(key => entries.some(entry => lane(entry) === key)).map(key => `<div class="explore-lane" style="--lane-color:var(--lane-${key})"><span class="lane-dot" aria-hidden="true"></span>${label(key)}</div>${periods.map(period => { const group = entries.filter(entry => lane(entry) === key && (state.scale === 'month' && entry.release.date.length > 4 ? entry.release.date.slice(0, 7) : entry.release.date.slice(0, 4)) === period); return `<div class="explore-cell">${group.slice(0, 4).map(entry => node(entry)).join('')}${group.length > 4 ? `<details class="explore-overflow"><summary>${L(`其余 ${group.length - 4} 条`, `${group.length - 4} more`)}</summary>${group.slice(4).map(entry => node(entry)).join('')}</details>` : ''}</div>`; }).join('')}`).join('')}</div></div><p class="explore-note">${L('无记录的时段已省略，列间距不代表时间跨度；同一事件仅展示一次。', 'Empty periods are omitted; column spacing is not proportional to elapsed time. Shared events appear once.')}</p></div>
    <div class="explore-mobile">${[...periods].reverse().map(period => `<section class="explore-mobile-period"><h2>${heading(period)}</h2>${state.sections.map(key => { const group = entries.filter(entry => lane(entry) === key && (state.scale === 'month' && entry.release.date.length > 4 ? entry.release.date.slice(0, 7) : entry.release.date.slice(0, 4)) === period); return group.length ? `<div class="explore-mobile-lane"><h3 style="--lane-color:var(--lane-${key})"><span class="lane-dot" aria-hidden="true"></span>${label(key)}<span>${group.length}</span></h3>${group.map(entry => node(entry, true)).join('')}</div>` : ''; }).join('')}</section>`).join('')}</div>` : `<div class="workspace-empty"><p>${L('没有匹配的记录', 'No matching entries')}</p><button class="outline-button" id="explore-empty-reset">${L('清除筛选', 'Reset filters')}</button></div>`}`;
    const scroll = root.querySelector('.explore-scroll');
    if (scroll) { scroll.scrollLeft = scrollToLatest ? scroll.scrollWidth : oldScroll; let start; scroll.addEventListener('pointerdown', event => { if (event.pointerType !== 'mouse' || event.button !== 0 || event.target.closest('button, a, summary, input, select')) return; start = { x: event.clientX, left: scroll.scrollLeft }; scroll.setPointerCapture(event.pointerId); }); scroll.addEventListener('pointermove', event => { if (start) scroll.scrollLeft = start.left - event.clientX + start.x; }); const stop = () => { start = null; }; scroll.addEventListener('pointerup', stop); scroll.addEventListener('pointercancel', stop); }
    scrollToLatest = false;
    const focus = focusId ? document.getElementById(focusId) : focusSection ? root.querySelector(`[data-section="${focusSection}"]`) : focusScale ? root.querySelector(`[data-scale="${focusScale}"]`) : null;
    (focus || (active ? document.getElementById('explore-from') : null))?.focus({ preventScroll: true });
  }
  function update(periodChanged = false) { scrollToLatest = periodChanged; write(); render(); }
  root.addEventListener('change', event => {
    const target = event.target;
    if (target.id === 'explore-from') { state.from = Number(target.value); state.to = Math.max(state.from, state.to); }
    else if (target.id === 'explore-to') { state.to = Number(target.value); state.from = Math.min(state.from, state.to); }
    else if (target.id === 'explore-company') state.company = target.value;
    else if (target.id === 'explore-milestones') state.milestones = target.checked;
    else if (target.hasAttribute('data-section')) state.sections = keys.filter(key => root.querySelector(`[data-section="${key}"]`).checked);
    update(target.id === 'explore-from' || target.id === 'explore-to');
  });
  root.addEventListener('click', event => {
    const button = event.target.closest('button'); if (!button) return;
    if (button.dataset.scale) { state.scale = button.dataset.scale; update(true); }
    else if (button.dataset.period) { state.from = state.to = Number(button.dataset.period.slice(0, 4)); state.scale = 'month'; update(true); }
    else if (button.id === 'explore-overview') { state.from = firstYear; state.to = lastYear; state.scale = 'year'; update(true); }
    else if (button.id === 'explore-clear-query') { state.query = ''; update(); }
    else if (['explore-reset', 'explore-empty-reset'].includes(button.id)) { state = { from: firstYear, to: lastYear, scale: 'year', company: '', sections: [...keys], milestones: true, query: '' }; update(true); }
  });
  document.addEventListener('atlas:query', event => { state = { from: firstYear, to: lastYear, scale: state.scale, company: '', sections: [...keys], milestones: false, query: event.detail.slice(0, 300) }; update(true); });
  window.addEventListener('popstate', () => { state = read(); scrollToLatest = true; render(); });
  matchMedia('(min-width: 901px)').addEventListener('change', event => { if (event.matches) { scrollToLatest = true; render(); } });
  render();
})();
