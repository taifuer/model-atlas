/* Shared detail content; the timeline and Explore use the same renderer. */
(() => {
  'use strict';
  function render(page, raw, id, language) {
    const { L, escape, formattedDate, companyName, releaseText } = window.ATLAS_UI;
    const english = language === 'en';
    const kinds = english ? raw.kindsEn || { paper: 'Research paper', release: 'Release', preview: 'Preview', product: 'Product launch', weights: 'Open weights', announcement: 'Announcement' } : raw.kinds;
    const pages = window.ATLAS_UI.pages;
    const releaseById = new Map(raw.releases.map(release => [release.id, release]));
    const companyById = new Map(raw.companies.map(company => [company.id, company]));
    const companyLabel = id => `<span class="company-label" title="${escape(companyName(companyById.get(id)))}">${escape(companyName(companyById.get(id)))}</span>`;
    const categoryName = id => english ? raw.categoriesEn?.[id] : raw.categories?.[id];
    const accessLabels = { open: L('开源', 'Open source'), closed: L('闭源', 'Closed source') };
    const releaseIcon = (release, size) => { const src = window.ATLAS_ICONS.release(release); return src ? `<img class="brand-icon" src="${escape(src)}" width="${size}" height="${size}" alt="" aria-hidden="true">` : ''; };
    const dateMarkup = release => release.date.length === 4 ? `<span>${release.date}</span>` : `<time datetime="${release.date}">${formattedDate(release.date)}</time>`;
    const money = (value, currency) => (currency === 'USD' ? '$' : currency === 'CNY' ? '¥' : currency + ' ') + Number(value).toLocaleString('en-US', { maximumFractionDigits: 6 });
  function sourceTitle(source) {
    if (!english) return source.title;
    if (source.titleEn) return source.titleEn;
    const host = new URL(source.url).hostname.replace(/^www\./, '');
    if (source.type === 'reporting') return `Reporting · ${host}`;
    if (host === 'ithome.com') return 'IT Home · Date cross-check';
    if (host === 'arxiv.org') return 'Original research · arXiv';
    return `Primary source · ${host}`;
  }
  function sectionHeading(id, title, checkedAt, link, linkLabel) {
    return `<div class="specs-heading"><div class="detail-section-title"><h3 id="${id}" tabindex="-1">${title}</h3>${checkedAt ? `<p class="spec-checked">${L('核对日期', 'Checked')} <time datetime="${escape(checkedAt)}">${formattedDate(checkedAt)}</time></p>` : ''}</div>${link ? `<a href="${escape(link)}">${linkLabel}</a>` : ''}</div>`;
  }
  function accessSummary(access) {
    if (!access || !(access.licenses?.length || access.note || access.noteEn)) return '';
    const licenses = (access.licenses || []).map(license => `<div><dt>${escape(L(license.object, license.objectEn))}</dt><dd><a href="${escape(license.source)}" target="_blank" rel="noopener noreferrer">${escape(license.name)}</a></dd></div>`).join('');
    const note = L(access.note || '', access.noteEn || '');
    return `<section class="detail-access-summary" aria-labelledby="access-title">${sectionHeading('access-title', L('开放与许可', 'Access and licensing'), access.checkedAt, `about.html?lang=${language}#openness`, L('分类说明', 'Classification guide'))}${licenses ? `<dl class="access-license-list">${licenses}</dl>` : ''}${note ? `<p class="detail-access-note">${escape(note)}</p>` : ''}${access.source ? `<p class="spec-sources"><a href="${escape(access.source)}" target="_blank" rel="noopener noreferrer">${L('核对来源', 'Evidence')}</a></p>` : ''}</section>`;
  }
  function specifications(id) {
    if (page === 'hardware') {
      const specs = releaseById.get(id)?.hardware;
      if (!specs) return '';
      const rows = specs.facts.map(fact => `<div><dt>${escape(L(fact.label, fact.labelEn))}</dt><dd>${escape(L(fact.value, fact.valueEn || fact.value))}</dd></div>`).join('');
      return `<section class="detail-specs" aria-labelledby="specs-title">${sectionHeading('specs-title', L('硬件规格', 'Hardware specifications'), specs.checkedAt, `about.html?lang=${language}#hardware`, L('字段说明', 'Field guide'))}<div class="spec-variant"><div class="spec-version"><h4>${escape(L(specs.variant, specs.variantEn || specs.variant))}</h4></div><dl class="spec-grid">${rows}</dl><p class="spec-sources">${specs.sources.map((url, i) => `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${L('规格来源', 'Specification source')}${specs.sources.length > 1 ? ` ${i + 1}` : ''}</a>`).join(' · ')}</p></div><p class="spec-note">${escape(L(specs.note, specs.noteEn))}</p></section>`;
    }
    const data = window.MODEL_ATLAS_SPECS;
    const entry = page === 'models' ? data?.entries[id] : null;
    if (!entry) return '';
    const basis = { api: 'API', weights: L('权重版本', 'Checkpoint'), paper: L('研究配置', 'Research configuration'), benchmark: L('评测配置', 'Benchmark configuration') };
    const sourceLabel = { api: L('官方文档', 'Documentation'), weights: L('官方模型卡', 'Model card'), paper: L('研究资料', 'Research source'), benchmark: L('评测来源', 'Benchmark source') };
    const modalities = { text: L('文本', 'Text'), image: L('图像', 'Image'), audio: L('音频', 'Audio'), video: L('视频', 'Video'), pdf: 'PDF', document: L('文档', 'Document') };
    const tokens = value => `${escape(typeof value === 'number' ? value.toLocaleString('en-US') : value)} <span class="spec-unit">tokens</span>`;
    const variants = entry.variants.map(variant => {
      const rows = [];
      const row = (label, value) => rows.push(`<div><dt>${label}</dt><dd>${value}</dd></div>`);
      if (variant.contextTokens) row(variant.extendedContextTokens ? L('原生上下文', 'Native context') : L('上下文窗口', 'Context window'), tokens(variant.contextTokens));
      if (variant.extendedContextTokens) row(L('扩展上下文', 'Extended context'), tokens(variant.extendedContextTokens));
      if (variant.inputTokens) row(L('输入上限', 'Input limit'), tokens(variant.inputTokens));
      if (variant.outputTokens) row(L('输出上限', 'Output limit'), tokens(variant.outputTokens));
      if (variant.trainingTokens) row(L('训练序列长度', 'Training sequence'), tokens(variant.trainingTokens));
      if (variant.parameters) row(variant.activeParameters ? L('总参数量', 'Total parameters') : L('参数量', 'Parameters'), escape(variant.parameters));
      if (variant.activeParameters) row(L('激活参数量', 'Active parameters'), escape(variant.activeParameters));
      for (const field of ['input', 'output']) if (variant[field]) row(field === 'input' ? L('输入类型', 'Input types') : L('输出类型', 'Output types'), variant[field].map(type => escape(modalities[type])).join(' · '));
      return `<div class="spec-variant"><div class="spec-version"><h4>${escape(variant.name)}</h4><span>${basis[variant.basis]}</span></div><dl class="spec-grid">${rows.join('')}</dl><p class="spec-sources">${variant.sources.map((url, i) => `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${sourceLabel[variant.basis]}${variant.sources.length > 1 ? ` ${i + 1}` : ''}</a>`).join(' · ')}</p></div>`;
    }).join('');
    const note = english ? entry.noteEn : entry.note;
    const checkedAt = entry.checkedAt || data.checkedAt;
    return `<section class="detail-specs" aria-labelledby="specs-title">${sectionHeading('specs-title', L('基本信息', 'Specifications'), checkedAt, `about.html?lang=${language}#specifications`, L('字段说明', 'Field guide'))}${variants}${note ? `<p class="spec-note">${escape(note)}</p>` : ''}</section>`;
  }
  function pricing(id) {
    const data = window.MODEL_ATLAS_PRICES;
    const entry = page === 'models' ? data?.entries[id] : null;
    if (!entry) return '';
    const variants = entry.variants.map(variant => {
      const note = english ? variant.noteEn : variant.note;
      return `<div class="spec-variant"><div class="spec-version"><h4>${escape(variant.name)}</h4><span>${variant.currency} / ${L('百万 tokens', 'million tokens')}${variant.archived ? ` · ${L('历史文档价', 'Archived rate')}` : ''}</span></div>${variant.tiers.map(rate => `<div class="price-tier"><p class="price-condition">${escape(english ? rate.labelEn : rate.label)}</p><dl class="spec-grid"><div><dt>${L('输入 · 未缓存', 'Input · uncached')}</dt><dd>${money(rate.input, variant.currency)}</dd></div><div><dt>${L('输出', 'Output')}</dt><dd>${money(rate.output, variant.currency)}</dd></div></dl></div>`).join('')}${note ? `<p class="spec-note">${escape(note)}</p>` : ''}<p class="spec-sources">${variant.sources.map((url, i) => `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${L('官方价格', 'Official pricing')}${variant.sources.length > 1 ? ` ${i + 1}` : ''}</a>`).join(' · ')}</p></div>`;
    }).join('');
    const note = english ? entry.noteEn : entry.note;
    const checkedAt = entry.checkedAt || data.checkedAt;
    return `<section class="detail-pricing" aria-labelledby="pricing-title">${sectionHeading('pricing-title', L('API 价格', 'API pricing'), checkedAt, `about.html?lang=${language}#pricing`, L('计价说明', 'Pricing guide'))}<p class="price-intro">${L('官方文本 API 按量计费，单位为每百万 tokens。缓存、批量、工具及多模态费用另计。', 'Official pay-as-you-go text API rates per million tokens. Cache, Batch, tools, and other modalities are priced separately.')}</p>${variants}${note ? `<p class="spec-note">${escape(note)}</p>` : ''}<p class="spec-note">${L('文档价格，不代表首发价格或当前可用性。', 'Documented rates, not launch prices or a guarantee of availability.')}</p></section>`;
  }
  function benchmarkScores(id) {
    const data = window.MODEL_ATLAS_SCORES;
    const entry = page === 'models' && data?.entries[id];
    if (!entry) return '';
    const records = Object.entries(entry).map(([key, score]) => {
      const metric = data.benchmarks[key];
      const title = metric.name + (metric.version ? ` v${metric.version}` : '');
      const checkedAt = score.checkedAt || metric.checkedAt || data.checkedAt;
      const caveat = score.estimated ? L('AA 估算值', 'AA estimate') : score.preliminary ? L('初步结果', 'Preliminary result') : '';
      const extra = key === 'arena' ? `${L('榜单日期', 'Leaderboard date')} ${formattedDate(metric.publishedAt)} · ${score.votes.toLocaleString('en-US')} ${L('次投票', 'votes')}${caveat ? ` · ${caveat}` : ''}` : caveat;
      return `<div class="benchmark-record"><div class="benchmark-heading"><div class="benchmark-identity"><h4>${escape(title)}</h4><p class="benchmark-model">${escape(score.model)}</p></div><strong>${score.score}${score.confidenceInterval ? `<span> ±${score.confidenceInterval}</span>` : ''}${score.estimated || score.preliminary ? '<sup>*</sup>' : ''}</strong></div><p class="benchmark-meta">${L('核对日期', 'Checked')} <time datetime="${escape(checkedAt)}">${formattedDate(checkedAt)}</time>${extra ? ` · ${escape(extra)}` : ''}</p><a href="${escape(score.source)}" target="_blank" rel="noopener noreferrer">${L('评测来源', 'Evaluation source')}</a></div>`;
    }).join('');
    return `<section class="detail-scores" aria-labelledby="scores-title">${sectionHeading('scores-title', L('评测分数', 'Benchmark scores'), '', `about.html?lang=${language}#scores`, L('评测口径', 'Methodology'))}${records}<p class="spec-note">${L('AA 衡量基准任务能力；Arena Text Overall（风格控制）反映文本对话偏好，± 为榜单置信区间。两者不直接换算。分数对应上述型号和推理配置，不代表整个系列或发布时的成绩。', 'AA measures benchmark-task performance; Arena Text Overall with Style Control reflects text-chat preferences, with the leaderboard confidence interval shown as ±. The scales are not interchangeable. Scores describe the listed configurations, not an entire family or performance at launch.')}</p></section>`;
  }
    const original = releaseById.get(id);
    if (!original) return '';
    const release = releaseText(original);
    const access = raw.accessFilter !== false ? original.openness : null;
    const modelType = page === 'models' && window.MODEL_ATLAS_TYPES?.entries[id];
    const metadata = [companyLabel(release.company), dateMarkup(release), `<span>${escape(kinds[release.kind])}</span>`];
    if (release.category) metadata.push(`<span class="dialog-category">${escape(categoryName(release.category))}</span>`);
    if (access) metadata.push(`<span>${escape(accessLabels[access.status])}</span>`);
    const accessHTML = accessSummary(access);
    const accessEvidence = !accessHTML && access?.source && !release.sources.some(source => source.url === access.source)
      ? `<li><a href="${escape(access.source)}" target="_blank" rel="noopener noreferrer">${L('开放依据', 'Access evidence')}</a> <span class="spec-checked">${L('核对日期', 'Checked')} <time datetime="${escape(access.checkedAt)}">${formattedDate(access.checkedAt)}</time></span></li>` : '';
    const classification = [];
    if (modelType) {
      const note = L(modelType.note || '', modelType.noteEn || '');
      classification.push(`<p class="detail-access">${L('输入类型：', 'Input type: ')}<strong>${escape(categoryName(modelType.category))}</strong>${note ? ` · ${escape(note)}` : ''} ${modelType.sources.map((url, i) => `<a href="${escape(url)}" target="_blank" rel="noopener noreferrer">${L('分类来源', 'Source')}${modelType.sources.length > 1 ? ` ${i + 1}` : ''}</a>`).join(' · ')} · <a href="about.html?lang=${language}#model-types">${L('分类说明', 'Classification guide')}</a></p>`);
    }
    const correctionURL = new URL('https://github.com/taifuer/model-atlas/issues/new');
    const record = window.ATLAS_CATALOG.get(`${page}:${id}`);
    const entryURL = new URL(window.ATLAS_CATALOG.timelineUrl(record, language), 'https://ai.taifua.com/');
    correctionURL.searchParams.set('template', 'entry.md');
    correctionURL.searchParams.set('title', `${L('纠错', 'Correction')}: ${release.name}`);
    correctionURL.searchParams.set('body', `**Timeline / 时间线**
${window.ATLAS_CATALOG.sections[page].zh} / ${window.ATLAS_CATALOG.sections[page].en}

**Event or existing entry / 事件或现有节点**
${release.name} · ${release.date}
${page}:${id}
${entryURL.href}

**Proposal / 建议**
What should be added or corrected? / 需要补充或修正什么？

**Sources / 来源**
Link reliable evidence and distinguish the event date from the article date.
提供可信来源，并区分事件发生日期与报道日期。

**Significance / 收录理由**
For new entries, explain their historical influence or technical significance.
新节点请说明经典性、技术代表性或可验证影响；硬件请补充该型号的实际采用证据。`);
    let html = `
      <header class="detail-header"><div class="dialog-title-row">${releaseIcon(release, 30)}<h2 id="dialog-title">${escape(release.name)}</h2></div><div class="dialog-meta">${metadata.join('')}</div></header>
      <div class="detail-overview"><p class="dialog-summary">${escape(release.summary)}</p>${release.details ? `<p class="detail-copy">${escape(release.details)}</p>` : ''}${release.dateNote ? `<p class="detail-note"><strong>${L('日期与范围：', 'Date and scope: ')}</strong>${escape(release.dateNote)}</p>` : ''}</div>
      ${accessHTML}${specifications(id)}${pricing(id)}${benchmarkScores(id)}
      ${classification.length ? `<section class="detail-classification" aria-labelledby="classification-title"><h3 id="classification-title">${L('分类依据', 'Classification')}</h3>${classification.join('')}</section>` : ''}
      <section class="detail-references" aria-labelledby="sources-title"><h3 class="dialog-source-title" id="sources-title">${L('资料来源', 'Sources')}</h3><ul class="detail-sources">${release.sources.map(source => `<li><a href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${escape(sourceTitle(source))}</a></li>`).join('')}${accessEvidence}</ul></section>
      <div class="dialog-actions"><a class="solid-button" href="${escape(release.sources[0].url)}" target="_blank" rel="noopener noreferrer">${L('查看资料', 'Read source')}</a><button class="outline-button" data-copy="${release.id}">${L('复制节点链接', 'Copy link')}</button></div>
      <p class="detail-correction"><a href="${escape(correctionURL.href)}" target="_blank" rel="noopener noreferrer">${L('纠错', 'Report a correction')}</a></p>`;
    if (id === 'transformer' && ['models', 'technology'].includes(page)) {
      const target = page === 'models' ? pages.technology : pages.models;
      html = html.replace('<div class="dialog-actions">', `<p class="detail-related"><a href="${target.file}?lang=${language}#release-transformer">${L('同时收录于', 'Also on')} ${L(...target.title)}</a></p><div class="dialog-actions">`);
    }
    if (window.ATLAS_UI.localPage) html = html.replace(/href="([a-z]+\.html)([^"]*)"/g, (_, file, suffix) => `href="${window.ATLAS_UI.localPage(file).pathname}${suffix}"`);
    return html;
  }
  window.ATLAS_DETAILS = Object.freeze({ render });
})();
