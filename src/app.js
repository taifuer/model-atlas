(() => {
  'use strict';
  const { raw, page, pages, english, language, L, escape, formattedDate, companyName, releaseText, kinds, tag, toast } = window.ATLAS_UI;
  const extended = page === 'hardware' || page === 'technology';
  const allOrganizations = page === 'technology' ? L('全部机构', 'All organizations') : L('全部厂商', 'All organizations');
  const entryNoun = count => count === 1 ? 'entry' : 'entries';
  const { releases, themes, asOf, companyRanking } = raw;
  const rankingByCompany = new Map((companyRanking?.entries || []).map((entry, index) => [entry.company, { ...entry, order: index }]));
  const companies = [...raw.companies];
  if (companyRanking) companies.sort((a, b) => {
    const left = rankingByCompany.get(a.id);
    const right = rankingByCompany.get(b.id);
    if (left && right) return right.score - left.score || left.order - right.order;
    if (left || right) return left ? -1 : 1;
    return a.id.localeCompare(b.id);
  });
  const $ = selector => document.querySelector(selector);
  const icon = (src, size, lazy = false) => src ? `<img class="brand-icon" src="${escape(src)}" width="${size}" height="${size}" alt="" aria-hidden="true" decoding="async"${lazy ? ' loading="lazy"' : ''}>` : '';
  const releaseIcon = (release, size = 23, lazy = false) => icon(window.ATLAS_ICONS.release(release), size, lazy);
  function dateMarkup(release, className = '', short = false) {
    const classes = className ? ` class="${className}"` : '';
    if (release.date.length === 4) {
      const note = L('日期仅明确到年份', 'Date known to the year only');
      return `<span${classes} title="${release.date} · ${note}">${short ? `<span aria-hidden="true">—</span><span class="sr-only">${release.date} · ${note}</span>` : release.date}</span>`;
    }
    const label = short ? `<span class="sr-only">${release.date.slice(0, 4)} </span>${formattedDate(release.date).slice(5)}` : formattedDate(release.date);
    return `<time${classes} datetime="${release.date}"${short ? ` title="${formattedDate(release.date)}"` : ''}>${label}</time>`;
  }
  const companyById = new Map(companies.map(company => [company.id, company]));
  const releaseById = new Map(releases.map(release => [release.id, release]));
  const { normalize } = window.ATLAS_FILTERS;
  const categoryName = id => english ? raw.categoriesEn?.[id] : raw.categories?.[id];
  const searchIndex = new Map(releases.map(release => {
    const company = companyById.get(release.company);
    const en = release.en || window.MODEL_ATLAS_EN?.[release.id] || {};
    return [release.id, [release.name, en.name || '', company.name, companyName(company), company.aliases || '', release.date, release.summary, release.details, en.summary || '', en.details || '', raw.categories?.[release.category] || '', raw.categoriesEn?.[release.category] || '', ...release.tags, ...release.tags.map(tag)].map(normalize).join('\0')];
  }));
  const filters = window.ATLAS_FILTERS.create(raw, searchIndex);
  const accessLabels = { open: L('开源', 'Open source'), closed: L('闭源', 'Closed source') };
  const accessFilterLabel = value => accessLabels[value];
  let state = readState();
  let scrollFrame = 0;
  let scrollSections = [];
  let activeYear = '';
  const mobileFilters = matchMedia('(max-width: 760px)');
  let companiesExpanded = false;

  function renderCompanyDisclosure() {
    const buttons = [...document.querySelectorAll('[data-company-filter]')];
    const focused = document.activeElement;
    // Hide organizations without matching milestones before applying the mobile limit.
    // Selected conditions remain removable in the active-filter row, even with no results.
    const available = buttons.filter(button => !state.milestones || button.dataset.companyFilter === 'all' || !button.classList.contains('is-empty'));
    const secondary = available.filter((button, index) => index > 6 && button.getAttribute('aria-pressed') !== 'true');
    for (const button of buttons) button.hidden = !available.includes(button) || (mobileFilters.matches && !companiesExpanded && secondary.includes(button));
    const toggle = $('#company-disclosure');
    toggle.hidden = !mobileFilters.matches || !secondary.length;
    toggle.setAttribute('aria-expanded', String(companiesExpanded));
    toggle.textContent = companiesExpanded ? L('收起', 'Show fewer') : L(`更多（${secondary.length}）`, `More (${secondary.length})`);
    if ((buttons.includes(focused) || focused === toggle) && focused.hidden) {
      (toggle.hidden ? buttons[0] : toggle).focus({ preventScroll: true });
    }
  }

  function readState() {
    let view = 'detail';
    try { view = localStorage.getItem('atlas-view') || view; } catch { /* Optional. */ }
    return filters.read(location.search, view);
  }
  function writeState(mode = 'push') {
    const url = new URL(location.href);
    url.search = filters.serialize(state, language);
    if (url.hash.startsWith('#release-')) url.hash = '';
    if (url.href === location.href) return;
    try { history[mode === 'replace' ? 'replaceState' : 'pushState'](null, '', url); } catch { /* Optional on file previews. */ }
  }
  function companyLabel(id) { const name = escape(companyName(companyById.get(id))); return `<span class="company-label" title="${name}">${name}</span>`; }
  function companyHint(id) {
    if (!companyRanking) return '';
    const entry = rankingByCompany.get(id);
    const date = formattedDate(companyRanking.checkedAt);
    if (!entry) return L(`暂无 AA 综合指数 · ${date}`, `No AA Intelligence Index score · ${date}`);
    const score = `${entry.score}${entry.estimated ? L('*（AA 估算）', '* (AA estimate)') : ''}`;
    return `${entry.model} · AA ${score} · ${date}`;
  }
  const tokenCount = value => {
    if (typeof value !== 'number') return value;
    if (value >= 1e6 && value % 1000 === 0) return `${value / 1e6}M`;
    if (value >= 1000 && value % 1000 === 0) return `${value / 1000}K`;
    return value.toLocaleString('en-US');
  };
  const tokenSize = value => typeof value === 'number' ? value : parseFloat(value) * (value.endsWith('M') ? 1e6 : 1000);
  const money = (value, currency) => `${currency === 'USD' ? '$' : '¥'}${value.toLocaleString('en-US', { maximumFractionDigits: 6 })}`;
  function cardFacts(release) {
    if (page === 'hardware' && release.hardware) {
      const fields = release.hardware.facts.filter(fact => fact.chip);
      const variant = L(release.hardware.variant, release.hardware.variantEn || release.hardware.variant);
      return fields.length ? `<div class="card-facts">${fields.map(fact => `<button class="fact-chip" type="button" data-detail="${release.id}" data-detail-section="specs" aria-haspopup="dialog" title="${escape(variant)}" aria-label="${escape(`${variant} · ${L(fact.label, fact.labelEn)} ${L(fact.value, fact.valueEn || fact.value)} · ${L('查看规格与来源', 'View specifications and sources')}`)}"><span class="fact-label">${escape(L(fact.label, fact.labelEn))}</span><span>${escape(L(fact.value, fact.valueEn || fact.value))}</span></button>`).join('')}</div>` : '';
    }
    if (page !== 'models') return '';
    const specs = window.MODEL_ATLAS_SPECS?.entries[release.id];
    const prices = window.MODEL_ATLAS_PRICES?.entries[release.id];
    const grouped = specs?.variants.length > 1 || prices?.variants.length > 1 || release.name.includes('/');
    const variantLabel = name => grouped ? `<span class="fact-model">${escape(name)}</span>` : '';
    const chips = [];
    const chip = (section, content, description) => `<button class="fact-chip" type="button" data-detail="${release.id}" data-detail-section="${section}" aria-haspopup="dialog" aria-label="${escape(`${release.name} · ${description}`)}" title="${escape(description)}">${content}</button>`;
    if (specs) {
      const field = ['contextTokens', 'inputTokens', 'trainingTokens'].find(key => specs.variants.some(variant => variant[key]));
      if (field) {
        const variants = specs.variants.filter(variant => variant[field]);
        const values = [...new Set(variants.map(variant => variant[field]))].sort((a, b) => tokenSize(a) - tokenSize(b));
        const label = field === 'inputTokens' ? L('输入上限', 'Input limit') : field === 'trainingTokens' ? L('训练长度', 'Training length') : variants.every(variant => variant.basis === 'benchmark') ? L('评测上下文', 'Eval context') : variants.some(variant => variant.extendedContextTokens) ? L('原生上下文', 'Native context') : L('上下文', 'Context');
        const range = values.length > 1 ? `${tokenCount(values[0])}–${tokenCount(values.at(-1))}` : tokenCount(values[0]);
        const description = `${label} ${range} tokens · ${variants.map(variant => variant.name).join(' / ')} · ${L('查看完整规格', 'View full specifications')}`;
        const scope = variants.length === 1 ? variants[0].name : L('各型号', 'Variants');
        chips.push(chip('specs', `${variantLabel(scope)}<span class="fact-label">${label}</span><span>${escape(range)}</span><span class="fact-unit">tokens</span>`, description));
      } else if (specs.variants.some(variant => variant.parameters)) {
        const values = [...new Set(specs.variants.filter(variant => variant.parameters).map(variant => variant.parameters))];
        chips.push(chip('specs', `${variantLabel(L('各型号', 'Variants'))}<span class="fact-label">${L('参数量', 'Parameters')}</span><span>${escape(values.join(' / '))}</span>`, L('查看研究配置与模型参数', 'View research configurations and parameter counts')));
      }
    }
    if (prices) {
      // Use one actual rate pair. Never combine minima from different models.
      const variant = prices.variants[0];
      const rate = variant.tiers[0];
      const starting = prices.variants.length > 1 || variant.tiers.length > 1;
      const qualifier = variant.announced ? L('公布价', 'Announced') : variant.archived ? L('历史价', 'Archived') : rate.validUntil ? L('限时', 'Promo') : starting ? L('起', 'from') : '';
      const input = money(rate.input, variant.currency), output = money(rate.output, variant.currency);
      const description = `${variant.name} · ${rate[english ? 'labelEn' : 'label']} · ${L('输入', 'Input')} ${input} · ${L('输出', 'Output')} ${output} · ${variant.currency} / 1M tokens · ${L('查看计价条件与来源', 'View conditions and source')}`;
      chips.push(chip('pricing', `${variantLabel(variant.name)}<span class="fact-label">${L('输入', 'In')}</span><span>${input}</span><span class="fact-separator" aria-hidden="true">·</span><span class="fact-label">${L('输出', 'Out')}</span><span>${output}</span><span class="fact-unit">${variant.currency} / 1M tokens${qualifier ? ` · ${qualifier}` : ''}</span>`, description));
    }
    const scores = window.MODEL_ATLAS_SCORES?.entries[release.id];
    for (const key of ['aa', 'arena']) {
      const score = scores?.[key];
      if (!score) continue;
      const label = key === 'aa' ? 'AA' : 'Arena';
      const mark = score.estimated || score.preliminary ? '*' : '';
      const description = `${window.MODEL_ATLAS_SCORES.benchmarks[key].name} · ${score.model} · ${score.score}${mark} · ${L('查看配置与评测口径', 'View configuration and methodology')}`;
      chips.push(chip('scores', `${variantLabel(score.model)}<span class="fact-label">${label}</span><span>${score.score}${mark}</span>`, description));
    }
    return chips.length ? `<div class="card-facts">${chips.join('')}</div>` : '';
  }
  function card(original) {
    const release = releaseText(original);
    const categoryTag = release.category ? `<span class="tag">${escape(categoryName(release.category))}</span>` : '';
    const featureTags = !release.category || page === 'models' ? original.tags.filter(value => !['开放权重', '文本', '多模态', '原生多模态'].includes(value)).map(value => `<span class="tag">${escape(tag(value))}</span>`).join('') : '';
    if (state.view === 'compact') return `<article id="release-${release.id}" class="release-card compact-card" data-company="${release.company}" data-date="${release.date}" aria-labelledby="title-${release.id}">${dateMarkup(release, 'entry-date', true)}<div class="compact-identity"><h3 id="title-${release.id}"><button data-detail="${release.id}" title="${escape(release.name)}" aria-label="${escape(L('查看发布详情：', 'View release details: ') + release.name)}">${releaseIcon(release, 20, true)}<span>${escape(release.name)}</span></button></h3>${companyLabel(release.company)}</div></article>`;
    return `<article id="release-${release.id}" class="release-card${release.milestone ? ' is-milestone' : ''}" data-company="${release.company}" data-date="${release.date}" data-category="${release.category || ''}" aria-labelledby="title-${release.id}">
      ${dateMarkup(release, 'card-date', true)}
      <div class="release-body">
        <div class="card-heading"><h3 class="card-title" id="title-${release.id}"><button data-detail="${release.id}" aria-label="${escape(L('查看发布详情：', 'View release details: ') + release.name)}">${releaseIcon(release, 23, true)}<span>${escape(release.name)}</span></button></h3><div class="card-meta">${companyLabel(release.company)}${release.milestone ? `<span class="milestone-badge">${L('里程碑', 'Milestone')}</span>` : ''}</div></div>
        <p class="card-summary">${escape(release.summary)}</p>
        ${cardFacts(release)}
        <div class="card-bottom"><div class="card-tags"><span class="tag event-kind">${kinds[release.kind]}</span>${raw.accessFilter !== false && original.openness ? `<span class="tag access-tag">${accessLabels[original.openness.status]}</span>` : ''}${categoryTag}${featureTags}</div><a class="source-link" href="${escape(release.sources[0].url)}" target="_blank" rel="noopener noreferrer">${L('资料来源', 'Source')}</a></div>
      </div></article>`;
  }
  function renderChart() {
    const monthly = state.year !== 'all';
    const counts = monthly ? filters.monthlyCounts(state) : filters.annualCounts(state).filter(({ count }) => count > 0);
    const ceiling = Math.max(5, Math.ceil(Math.max(...counts.map(item => item.count), 1) / 5) * 5);
    $('#activity-title').textContent = monthly ? L(`${state.year} 年每月节点数量`, `Monthly entries · ${state.year}`) : L('年度节点数量', 'Entries by year');
    $('#chart-back').hidden = !monthly;
    $('#annual-chart').classList.toggle('monthly-chart', monthly);
    $('#annual-chart').setAttribute('aria-label', monthly ? L('选择月份筛选发布记录', 'Select a month to filter releases') : L('选择年份查看月度发布数量', 'Select a year to view monthly releases'));
    $('#annual-chart').innerHTML = counts.map(({ year, month, count, future }) => {
      const value = monthly ? month : year;
      const label = monthly ? L(`${Number(month)}月`, new Date(2000, Number(month) - 1, 1).toLocaleString('en', { month: 'short' })) : year;
      const date = monthly ? `${state.year}-${month}` : year;
      const accessible = future ? L(`${date}，资料截止日期之后`, `${date}, after the research cutoff`) : L(`${date}，${count} 个已收录节点，点击${monthly ? '筛选月份' : '查看每月统计'}`, `${date}: ${count} curated ${entryNoun(count)}. ${monthly ? 'Filter this month.' : 'View monthly counts.'}`);
      return `<button class="annual-bar${future ? ' is-future' : ''}" data-chart-${monthly ? 'month' : 'year'}="${value}" data-count="${count}"${future ? ' disabled' : ''} aria-pressed="${monthly && state.month === month}" aria-label="${escape(accessible)}" title="${escape(accessible)}" style="--bar-height:${count / ceiling * 100}%"><span class="bar-track"><span class="bar-count">${future ? '—' : count}</span><span class="bar-fill${date === (monthly ? asOf.slice(0, 7) : asOf.slice(0, 4)) ? ' current-year' : ''}"></span></span><span class="bar-year">${label}</span></button>`;
    }).join('') || `<p class="chart-empty">${L('当前筛选无收录记录', 'No entries match these filters')}</p>`;
    $('#chart-scope').textContent = state.companies.size || state.query || state.category !== 'all' || state.openness !== 'all' || state.milestones ? L('当前筛选', 'Filtered') : L('全部收录', 'All entries');
    $('#chart-note').textContent = '';
    const notes = [monthly ? L('* 仅统计本站收录节点。', '* Counts cover curated entries.') : L('* 仅统计本站收录节点，无记录的年份已省略。', '* Counts cover curated entries; years without entries are omitted.')];
    if (monthly) {
      const yearOnly = filters.select(state, ['month']).filter(release => release.date.length === 4).length;
      if (yearOnly) notes.push(L(`${yearOnly} 个节点仅记录年份，未计入月份。`, `${yearOnly} ${entryNoun(yearOnly)} dated to the year only; excluded from monthly counts.`));
      if (counts.some(item => item.future)) notes.push(L('— 表示尚未统计。', '— indicates months not yet covered.'));
    }
    const scopeNote = document.createElement('span');
    scopeNote.className = 'chart-scope-note';
    scopeNote.textContent = notes.join(' ');
    $('#chart-note').append(scopeNote);
    updateChartTicks();
  }
  function updateChartTicks() {
    const chart = $('#annual-chart');
    const bars = [...chart.querySelectorAll('[data-chart-year]')];
    const columnWidth = bars[0]?.getBoundingClientRect().width || chart.clientWidth;
    const step = Math.max(1, Math.ceil(32 / Math.max(columnWidth, 1)));
    const last = bars.length - 1;
    bars.forEach((bar, index) => bar.classList.toggle('is-unlabeled', index !== 0 && index !== last && (index % step !== 0 || last - index < step)));
  }
  new ResizeObserver(updateChartTicks).observe($('#annual-chart'));
  function renderActiveFilters() {
    const chips = [];
    const chip = (key, label) => chips.push(`<button class="filter-chip" type="button" data-remove-filter="${escape(key)}" aria-label="${escape(L('移除筛选：', 'Remove filter: ') + label)}"><span>${escape(label)}</span><span aria-hidden="true">×</span></button>`);
    state.companies.forEach(id => chip(`company:${id}`, companyName(companyById.get(id))));
    if (state.year !== 'all') chip('year', L(`${state.year} 年`, state.year));
    if (state.month !== 'all') chip('month', L(`${Number(state.month)} 月`, new Date(2000, Number(state.month) - 1, 1).toLocaleString('en', { month: 'long' })));
    if (state.openness !== 'all') chip('openness', accessFilterLabel(state.openness));
    if (state.category !== 'all') chip('category', categoryName(state.category));
    if (state.milestones) chip('milestones', L('里程碑', 'Milestones'));
    if (state.query) chip('query', L(`搜索：${state.query}`, `Search: ${state.query}`));
    $('#active-filters').innerHTML = chips.join('');
    $('#active-filters').hidden = !chips.length;
    $('#active-filter-row').hidden = !chips.length;
  }
  function render() {
    const filtered = filters.select(state).sort((a, b) => (state.sort === 'desc' ? -1 : 1) * a.date.localeCompare(b.date));
    const shownYears = [...new Set(filtered.map(release => release.date.slice(0, 4)))];
    if ($('#search').value !== state.query) $('#search').value = state.query;
    const availableYears = filters.annualCounts(state).filter(({ count }) => count > 0).map(({ year }) => year);
    // A year from a shared URL stays selectable even if other filters remove its entries.
    if (state.year !== 'all' && !availableYears.includes(state.year)) availableYears.push(state.year);
    availableYears.sort((a, b) => b.localeCompare(a));
    $('#year-select').innerHTML = `<option value="all">${L('全部年份', 'All years')}</option>` + availableYears.map(year => `<option value="${year}">${year}${L(' 年', '')}</option>`).join('');
    $('#year-select').value = state.year;
    if ($('#openness-select')) $('#openness-select').value = state.openness;
    if ($('#category-select')) $('#category-select').value = state.category;
    $('#milestone-only').checked = state.milestones;
    $('#company-multi').checked = state.multiSelect;
    $('#company-filters').setAttribute('aria-label', state.multiSelect ? L('按机构筛选，可多选', 'Filter by organization; multiple selection') : L('按机构筛选，单选', 'Filter by organization; single selection'));
    $('#sort-button').textContent = state.sort === 'desc' ? L('最新优先', 'Newest first') : L('最早优先', 'Oldest first');
    $('#sort-button').setAttribute('aria-label', L('切换时间排序，当前：', 'Toggle chronological order. Current: ') + $('#sort-button').textContent);
    const companyCounts = filters.companyCounts(state);
    document.querySelectorAll('[data-company-filter]').forEach(button => {
      const id = button.dataset.companyFilter;
      const selected = id === 'all' ? !state.companies.size : state.companies.has(id);
      const count = id === 'all' ? Object.values(companyCounts).reduce((a, b) => a + b, 0) : companyCounts[id];
      button.setAttribute('aria-pressed', String(selected));
      button.querySelector('.chip-count').textContent = count;
      button.classList.toggle('is-empty', count === 0);
      button.disabled = id !== 'all' && !selected && count === 0;
      button.setAttribute('aria-label', L(`${id === 'all' ? allOrganizations : companyName(companyById.get(id))}，${count} 个匹配节点${selected ? '，已选择' : ''}`, `${id === 'all' ? 'All organizations' : companyName(companyById.get(id))}: ${count} matching ${entryNoun(count)}${selected ? ', selected' : ''}`));
    });
    document.querySelectorAll('[data-view]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.view === state.view)));
    renderCompanyDisclosure();
    $('#timeline').classList.toggle('is-compact', state.view === 'compact');
    renderChart();
    renderActiveFilters();
    const hasFilter = filters.hasFilters(state);
    $('#search-toggle').classList.toggle('has-query', Boolean(state.query));
    $('#search-results').innerHTML = state.query ? filtered.slice(0, 8).map(original => {
      const release = releaseText(original);
      return `<button class="search-result" data-search-result="${release.id}"><div class="search-result-identity">${releaseIcon(release, 22)}<div><strong>${escape(release.name)}</strong><span>${escape(companyName(companyById.get(release.company)))}</span></div></div>${dateMarkup(release, 'search-result-date')}</button>`;
    }).join('') : '';
    $('#search-help').textContent = state.query ? L(`找到 ${filtered.length} 个节点，按 Enter 查看全部结果。`, `${filtered.length} matching ${entryNoun(filtered.length)}. Press Enter to view all results.`) : L('输入名称或关键词，按 Enter 查看筛选结果。', 'Search by name or keyword. Press Enter to view filtered results.');
    $('#reset-filters').hidden = !hasFilter;
    $('#results-count').innerHTML = hasFilter ? L(`找到 <strong>${filtered.length}</strong> / ${releases.length} 个节点`, `<strong>${filtered.length}</strong> of ${releases.length} entries`) : L(`共 <strong>${releases.length}</strong> 个${extended ? '' : '发布'}节点`, `<strong>${releases.length}</strong> ${extended ? '' : 'release '}entries`);
    const navigationYears = filters.annualCounts(state).filter(({ count }) => count > 0);
    if (state.sort === 'desc') navigationYears.reverse();
    $('#year-nav').innerHTML = navigationYears.map(({ year, count }) => `<button type="button" class="year-jump" data-chart-year="${year}" data-jump="${year}" aria-pressed="${state.year === year}" aria-label="${escape(L(`${year} 年，${count} 个节点，查看月度统计`, `${year}: ${count} ${entryNoun(count)}. View monthly counts.`))}">${year}<span>${count}</span></button>`).join('');
    $('.year-sidebar').hidden = !filtered.length;
    $('.timeline-layout').classList.toggle('has-no-results', !filtered.length);
    $('#timeline').innerHTML = shownYears.map(year => {
      const entries = filtered.filter(release => release.date.startsWith(year));
      const theme = english ? (raw.themesEn || window.MODEL_THEMES_EN)[year] : themes[year];
      return `<section class="year-section" id="year-${year}" aria-labelledby="heading-${year}"><div class="year-heading"><h2 id="heading-${year}">${year}</h2><span class="year-theme">${escape(theme || '')}</span><span class="year-count">${entries.length} ${L('个节点', entryNoun(entries.length))}</span></div>${entries.map(card).join('')}</section>`;
    }).join('') + (filtered.length ? `<p class="timeline-end">${L(`已显示全部 ${filtered.length} 个节点`, `${filtered.length === 1 ? '1 entry' : `All ${filtered.length} entries`} shown`)}</p>` : `<div class="empty-state"><h3>${L('没有找到匹配的节点', 'No matching entries')}</h3><p>${L('试试其他关键词，或放宽筛选条件。', 'Try a different search or fewer filters.')}</p><button class="solid-button" data-reset>${L('清除筛选', 'Reset filters')}</button></div>`);
    scrollSections = [...document.querySelectorAll('.year-section')];
    activeYear = '';
    updateActiveYear();
  }
  function updateActiveYear() {
    if (!scrollSections.length) return;
    let selected = scrollSections[0];
    for (const section of scrollSections) if (section.getBoundingClientRect().top <= 210) selected = section;
    const year = selected.id.replace('year-', '');
    if (year === activeYear) return;
    activeYear = year;
    document.querySelectorAll('.year-jump').forEach(link => { if (link.dataset.jump === year) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current'); });
  }
  function changeState(mode = 'push') { writeState(mode); render(); }
  function reset() { state = { ...filters.read(''), multiSelect: state.multiSelect, sort: state.sort, view: state.view }; changeState(); }
  function showRelease(id, updateHash = true, section = '') {
    if (!releaseById.has(id)) return;
    $('#dialog-content').innerHTML = window.ATLAS_DETAILS.render(page, raw, id, language);
    if (updateHash) { const url = new URL(location.href); url.hash = `release-${id}`; try { history.replaceState(null, '', url); } catch { /* Optional. */ } }
    const dialog = $('#detail-dialog');
    document.body.classList.add('modal-open');
    // Stop an in-flight page scroll before locking the background and moving focus.
    window.scrollTo({ top: window.scrollY, left: window.scrollX, behavior: 'instant' });
    if (!dialog.open) dialog.showModal();
    $('#dialog-content').scrollTop = 0;
    if (['specs', 'pricing', 'scores'].includes(section)) {
      const heading = $(`#${section}-title`);
      if (heading) {
        heading.focus({ preventScroll: true });
        const content = $('#dialog-content');
        content.scrollTop = heading.getBoundingClientRect().top - content.getBoundingClientRect().top - 12;
      }
    }
  }
  async function copyRelease(id) {
    const url = window.ATLAS_UI.localPage(pages[page].file);
    url.searchParams.set('lang', language);
    url.hash = `release-${id}`;
    try { await navigator.clipboard.writeText(url.href); toast(location.protocol === 'file:' ? L('本地路径已复制，托管网页后即可分享', 'Local path copied; host the site to share it') : L('节点链接已复制', 'Release link copied')); }
    catch {
      const input = document.createElement('input'); input.value = url.href; input.readOnly = true;
      input.setAttribute('aria-label', L('节点链接', 'Release link')); input.className = 'copy-link-input';
      $('#dialog-content').append(input); input.focus(); input.select(); toast(L('请选择并复制节点链接', 'Select and copy the release link'));
    }
  }
  function openHash() { if (location.hash.startsWith('#release-')) showRelease(location.hash.slice(9), false); }

  $('#release-total').textContent = releases.length;
  $('#company-total').textContent = companies.length;
  if ($('#category-select')) {
    $('#category-select').insertAdjacentHTML('beforeend', Object.keys(raw.categories).map(id => `<option value="${id}">${escape(categoryName(id))}</option>`).join(''));
    $('#category-select').addEventListener('change', event => { state.category = event.target.value; changeState(); });
  }
  $('#company-filters').innerHTML = `<button class="company-chip" data-company-filter="all" aria-pressed="true"><span>${allOrganizations}</span><span class="chip-count" aria-hidden="true"></span></button>` + companies.map(company => `<button class="company-chip" id="company-filter-${company.id}" data-company-filter="${company.id}" aria-pressed="false"${companyRanking ? ` title="${escape(companyHint(company.id))}"` : ''}>${icon(window.ATLAS_ICONS.company(company.id), 16)}<span>${escape(companyName(company))}</span><span class="chip-count" aria-hidden="true"></span></button>`).join('');
  $('#company-filters').append($('#company-disclosure'));
  const updateQuery = event => { if (event.isComposing) return; state.query = event.target.value.slice(0, 300); changeState('replace'); };
  $('#search').addEventListener('input', updateQuery);
  $('#search').addEventListener('compositionend', updateQuery);
  $('#search-form').addEventListener('submit', event => { event.preventDefault(); $('#search-dialog').close(); $('#explore').scrollIntoView({ behavior: 'instant' }); });
  $('#year-select').addEventListener('change', event => { state.year = event.target.value; state.month = 'all'; changeState(); });
  $('#openness-select')?.addEventListener('change', event => { state.openness = event.target.value; changeState(); });
  $('#chart-back').addEventListener('click', () => { state.year = 'all'; state.month = 'all'; changeState(); $('#annual-chart button:last-child')?.focus({ preventScroll: true }); });
  $('#milestone-only').addEventListener('change', event => { state.milestones = event.target.checked; changeState(); });
  $('#sort-button').addEventListener('click', () => { state.sort = state.sort === 'asc' ? 'desc' : 'asc'; changeState(); });
  $('#reset-filters').addEventListener('click', () => { reset(); $('[data-company-filter="all"]').focus({ preventScroll: true }); });
  $('#company-multi').addEventListener('change', event => { state = filters.setMultiSelect(state, event.target.checked); changeState(); });
  $('#company-disclosure').addEventListener('click', () => { companiesExpanded = !companiesExpanded; renderCompanyDisclosure(); });
  mobileFilters.addEventListener('change', renderCompanyDisclosure);
  $('#close-dialog').addEventListener('click', () => $('#detail-dialog').close());
  $('#detail-dialog').addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open');
    if (location.hash.startsWith('#release-')) { const url = new URL(location.href); url.hash = ''; try { history.replaceState(null, '', url); } catch { /* Optional. */ } }
  });
  $('#detail-dialog').addEventListener('click', event => {
    if (event.target !== $('#detail-dialog')) return;
    const bounds = event.target.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) event.target.close();
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.hasAttribute('data-company-filter')) {
      state = filters.chooseCompany(state, button.dataset.companyFilter);
      changeState();
    } else if (button.hasAttribute('data-chart-year')) {
      const year = button.dataset.chartYear;
      state.year = year;
      state.month = 'all';
      changeState();
      if (button.classList.contains('year-jump')) $('#activity').scrollIntoView({ behavior: 'instant', block: 'start' });
      $('#chart-back').focus({ preventScroll: true });
    } else if (button.hasAttribute('data-chart-month')) {
      const month = button.dataset.chartMonth;
      state.month = state.month === month ? 'all' : month;
      changeState();
      $(`[data-chart-month="${month}"]`).focus({ preventScroll: true });
    } else if (button.hasAttribute('data-view')) {
      state.view = button.dataset.view;
      try { localStorage.setItem('atlas-view', state.view); } catch { /* Optional. */ }
      changeState();
    } else if (button.hasAttribute('data-remove-filter')) {
      const key = button.dataset.removeFilter;
      if (key.startsWith('company:')) state.companies.delete(key.slice(8));
      else if (key === 'year') { state.year = 'all'; state.month = 'all'; }
      else if (key === 'query') state.query = '';
      else if (key === 'milestones') state.milestones = false;
      else if (['month', 'category', 'openness'].includes(key)) state[key] = 'all';
      changeState();
      ($('#active-filters button') || $('#sort-button')).focus({ preventScroll: true });
    } else if (button.hasAttribute('data-search-result')) { $('#search-dialog').close(); showRelease(button.dataset.searchResult); }
    else if (button.hasAttribute('data-detail')) showRelease(button.dataset.detail, true, button.dataset.detailSection);
    else if (button.hasAttribute('data-reset')) { reset(); $('#sort-button').focus(); }
    else if (button.hasAttribute('data-copy')) copyRelease(button.dataset.copy);
  });
  window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => { updateActiveYear(); scrollFrame = 0; });
  }, { passive: true });
  window.addEventListener('popstate', () => { state = readState(); render(); openHash(); });
  window.addEventListener('hashchange', openHash);
  render(); openHash();
})();
