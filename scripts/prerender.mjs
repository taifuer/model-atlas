// Build readable HTML from the same curated records used by the browser.
// JavaScript progressively enhances these containers with filtering and dialogs.
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { PAGE_FILES } from './seo.mjs';

const escape = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const dataFiles = ['data.js', 'data-en.js', 'data-agents.js', 'data-hardware.js', 'data-technology.js', 'data-access.js', 'data-model-types.js', 'icons.js', 'catalog.js', 'explore-periods.js'];
const englishOrganizations = { qwen: 'Alibaba', moonshot: 'Moonshot AI', zhipu: 'Z.ai', xiaomi: 'Xiaomi', stepfun: 'StepFun', tencent: 'Tencent', bytedance: 'ByteDance' };
const englishKinds = { paper: 'Research paper', release: 'Release', preview: 'Preview', product: 'Product launch', weights: 'Open weights', announcement: 'Announcement' };

export async function loadCatalog(sourceRoot = new URL('../src/', import.meta.url)) {
  const context = vm.createContext({ window: {}, URL });
  for (const file of dataFiles) {
    vm.runInContext(await readFile(new URL(file, sourceRoot), 'utf8'), context, { filename: file, timeout: 5000 });
  }
  return context.window;
}

function replaceContainer(html, id, content) {
  const pattern = new RegExp(`(<([a-z]+)\\b[^>]*\\bid="${id}"[^>]*>)([\\s\\S]*?)(<\\/\\2>)`, 'i');
  if (!pattern.test(html)) throw new Error(`Missing prerender container: ${id}`);
  return html.replace(pattern, (_, opening, tag, previous, closing) => `${opening}${content}${closing}`);
}

function translated(window, entry, language) {
  return language === 'en' ? { ...entry, ...(entry.en || window.MODEL_ATLAS_EN?.[entry.id]) } : entry;
}

function companyName(company, language) {
  return language === 'en' ? company.nameEn || englishOrganizations[company.id] || company.name : company.name;
}

function dateHTML(date, className = '', short = false) {
  const formatted = date.replaceAll('-', '.');
  const label = short && date.length > 4 ? `<span class="sr-only">${date.slice(0, 4)} </span>${formatted.slice(5)}` : formatted;
  return `<time${className ? ` class="${className}"` : ''} datetime="${date}"${short ? ` title="${formatted}"` : ''}>${label}</time>`;
}

function iconHTML(window, entry) {
  const src = window.ATLAS_ICONS.release(entry);
  return src ? `<img class="brand-icon" src="${escape(src)}" width="23" height="23" alt="" loading="lazy" decoding="async">` : '';
}

function timelineHTML(window, page, language) {
  const english = language === 'en';
  const raw = window.ATLAS_CATALOG.sections[page].data;
  const companies = new Map(raw.companies.map(company => [company.id, company]));
  const entries = [...raw.releases].sort((a, b) => b.date.localeCompare(a.date));
  const years = [...new Set(entries.map(entry => entry.date.slice(0, 4)))];
  const noun = count => english ? `${count} ${count === 1 ? 'entry' : 'entries'}` : `${count} 个节点`;
  const sourceLabel = english ? 'Source' : '资料来源';
  const card = original => {
    const entry = translated(window, original, language);
    const category = english ? raw.categoriesEn?.[entry.category] : raw.categories?.[entry.category];
    const kind = english ? (raw.kindsEn || englishKinds)[entry.kind] : raw.kinds?.[entry.kind];
    const access = raw.accessFilter !== false && original.openness ? (original.openness.status === 'open' ? (english ? 'Open source' : '开源') : (english ? 'Closed source' : '闭源')) : '';
    const source = entry.sources[0].url;
    return `<article id="release-${escape(entry.id)}" class="release-card${entry.milestone ? ' is-milestone' : ''}" data-company="${escape(entry.company)}" data-date="${entry.date}" data-category="${escape(entry.category || '')}" aria-labelledby="title-${escape(entry.id)}">
      ${dateHTML(entry.date, 'card-date', true)}<div class="release-body"><div class="card-heading"><h3 class="card-title" id="title-${escape(entry.id)}"><a href="${escape(source)}" target="_blank" rel="noopener noreferrer">${iconHTML(window, original)}<span>${escape(entry.name)}</span></a></h3><div class="card-meta"><span class="company-label">${escape(companyName(companies.get(entry.company), language))}</span>${entry.milestone ? `<span class="milestone-badge">${english ? 'Milestone' : '里程碑'}</span>` : ''}</div></div>
      <p class="card-summary">${escape(entry.summary)}</p><div class="card-bottom"><div class="card-tags">${[kind, access, category].filter(Boolean).map(label => `<span class="tag">${escape(label)}</span>`).join('')}</div><a class="source-link" href="${escape(source)}" target="_blank" rel="noopener noreferrer">${sourceLabel}</a></div></div></article>`;
  };
  const markup = years.map(year => {
    const releases = entries.filter(entry => entry.date.startsWith(year));
    const theme = english ? (raw.themesEn || window.MODEL_THEMES_EN)?.[year] : raw.themes?.[year];
    return `<section class="year-section" id="year-${year}" aria-labelledby="heading-${year}"><div class="year-heading"><h2 id="heading-${year}">${year}</h2><span class="year-theme">${escape(theme)}</span><span class="year-count">${noun(releases.length)}</span></div>${releases.map(card).join('')}</section>`;
  }).join('');
  const navigation = years.map(year => `<a class="year-jump" href="${language === 'en' ? 'en/' : ''}${PAGE_FILES[page]}#year-${year}">${year}<span>${entries.filter(entry => entry.date.startsWith(year)).length}</span></a>`).join('');
  return { raw, markup: markup + `<p class="timeline-end">${english ? `All ${entries.length} entries shown` : `已显示全部 ${entries.length} 个节点`}</p>`, navigation };
}

function exploreHTML(window, language) {
  const english = language === 'en';
  const catalog = window.ATLAS_CATALOG;
  const { periods, years } = window.ATLAS_PERIODS.build(catalog.events);
  const noun = count => english ? `${count} ${count === 1 ? 'event' : 'events'}` : `${count} 条记录`;
  const label = section => section === 'hardware' && !english ? '算力硬件' : catalog.sections[section][language];
  const periodName = period => period.month ? english ? `${new Intl.DateTimeFormat('en', { month: 'long', timeZone: 'UTC' }).format(new Date(`${period.year}-${period.month}-01T00:00:00Z`))} ${period.year}` : `${period.year} 年 ${Number(period.month)} 月` : english ? period.year : `${period.year} 年`;
  const card = entry => {
    const release = translated(window, entry.release, language);
    return `<article class="journey-event" data-entry-key="${escape(entry.key)}" style="--event-color:var(--lane-${entry.section})"><h3><a href="${escape(release.sources[0].url)}" target="_blank" rel="noopener noreferrer">${iconHTML(window, entry.release)}<span>${escape(release.name)}</span></a></h3><div class="journey-event-meta"><span>${escape(companyName(entry.company, language))}</span>${entry.sections.map(section => `<span class="journey-category" data-category="${section}">${label(section)}</span>`).join('')}</div><p class="journey-summary">${escape(release.summary)}</p><a class="source-link" href="${escape(release.sources[0].url)}" target="_blank" rel="noopener noreferrer">${english ? 'Source' : '资料来源'}</a></article>`;
  };
  const dayHTML = day => `<div class="journey-day" data-day="${day.date}" style="--day-columns:${Math.min(day.entries.length, 3)}"><div class="journey-day-date">${dateHTML(day.date)}${day.entries.length > 1 ? `<span>${noun(day.entries.length)}</span>` : ''}</div><div class="journey-day-cards">${day.entries.map(card).join('')}</div></div>`;
  return `<div class="journey-overview"><p>${years.at(-1).year}<span aria-hidden="true">—</span>${years[0].year}<span class="journey-divider" aria-hidden="true">·</span>${noun(catalog.events.length)}</p><div class="journey-legend">${Object.keys(catalog.sections).map(section => `<span style="--event-color:var(--lane-${section})"><i aria-hidden="true"></i>${label(section)}<small>${catalog.events.filter(entry => entry.section === section).length}</small></span>`).join('')}</div></div><div id="journey-events">${periods.map((period, index) => `<section class="journey-period${period.entries.length === 1 ? ' is-single' : ''}" id="period-${period.key}" data-period-index="${index}" aria-labelledby="period-title-${period.key}"><h2 id="period-title-${period.key}"><span>${periodName(period)}</span><small>${noun(period.entries.length)}</small></h2><div class="journey-days">${period.days.map(dayHTML).join('')}</div></section>`).join('')}</div>`;
}

function fallbackNavigation(page, language) {
  const labels = language === 'en' ? ['LLM', 'Agent', 'Hardware', 'Technology', 'Explore', 'About'] : ['大模型', '智能体', '算力', '技术', '探索', '关于'];
  const prefix = language === 'en' ? 'en/' : '';
  const links = Object.keys(PAGE_FILES).map((key, index) => `<a href="${prefix}${PAGE_FILES[key]}">${labels[index]}</a>`);
  links.push(`<a href="${language === 'en' ? '' : 'en/'}${PAGE_FILES[page]}" lang="${language === 'en' ? 'zh-CN' : 'en'}">${language === 'en' ? '简体中文' : 'English'}</a>`);
  return `<noscript><nav class="static-navigation" aria-label="${language === 'en' ? 'Site navigation' : '站点导航'}" style="display:flex;flex-wrap:wrap;gap:12px 20px;margin-bottom:24px;font-size:13px">${links.join('')}</nav></noscript>`;
}

export function prerenderPage(html, { page, language, window }) {
  if (!PAGE_FILES[page]) throw new Error(`Unknown page: ${page}`);
  if (!['en', 'zh'].includes(language)) throw new Error(`Unknown language: ${language}`);
  if (page !== 'about') {
    if (page === 'explore') html = replaceContainer(html, 'explore-root', exploreHTML(window, language));
    else {
      const { raw, markup, navigation } = timelineHTML(window, page, language);
      html = replaceContainer(html, 'timeline', markup);
      html = replaceContainer(html, 'year-nav', navigation);
      html = replaceContainer(html, 'release-total', raw.releases.length);
      html = replaceContainer(html, 'company-total', raw.companies.length);
      html = replaceContainer(html, 'results-count', language === 'en' ? `<strong>${raw.releases.length}</strong> entries` : `共 <strong>${raw.releases.length}</strong> 个节点`);
      const chartColumns = Math.max(new Set(raw.releases.map(entry => entry.date.slice(0, 4))).size, 1);
      html = html.replace(/(<figure\b[^>]*\bid="activity")/, `$1 style="--chart-columns:${chartColumns}"`);
    }
    // A readable default collection replaces the old JavaScript-required notice.
    html = html.replace(/<noscript>[\s\S]*?<\/noscript>/g, '');
  }
  html = html.replace(/(<main\b[^>]*>)/, '$1' + fallbackNavigation(page, language));
  const fallbackStyle = '<noscript><style>.filter-panel,.results-actions,.activity,#search-toggle,#language-toggle,#menu-toggle{display:none!important}</style></noscript>';
  return html.replace('</head>', `${fallbackStyle}\n</head>`);
}
