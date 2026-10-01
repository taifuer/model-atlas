/* Cross-timeline search, detail dialogs, and links to the original timelines. */
(() => {
  'use strict';
  const { L, escape, language, english, companyName, page, toast } = window.ATLAS_UI;
  const catalog = window.ATLAS_CATALOG;
  const dialog = document.querySelector('#detail-dialog');
  const content = document.querySelector('#dialog-content');
  let activeEntry;
  let previousFocus;
  const search = document.querySelector('#search');
  const searchDialog = document.querySelector('#search-dialog');
  function openEntry(key, update = true) {
    const record = catalog.get(key);
    if (!record) return;
    activeEntry = record; previousFocus = searchDialog.open ? document.querySelector('#search-toggle') : document.activeElement;
    if (searchDialog.open) searchDialog.close();
    content.innerHTML = window.ATLAS_DETAILS.render(record.section, record.raw, record.release.id, language);
    document.body.classList.add('modal-open');
    window.scrollTo({ top: scrollY, behavior: 'instant' });
    if (!dialog.open) dialog.showModal();
    content.scrollTop = 0;
    if (update) { const url = new URL(location.href); url.hash = `entry=${encodeURIComponent(key)}`; history.replaceState(null, '', url); }
  }
  function openHash() {
    if (location.hash.startsWith('#entry=')) {
      try { const key = decodeURIComponent(location.hash.slice(7)); if (catalog.get(key)) { openEntry(key, false); return; } } catch { /* Invalid shared hash. */ }
    }
    if (dialog.open) dialog.close();
  }
  document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open');
    if (location.hash.startsWith('#entry=')) history.replaceState(null, '', location.pathname + location.search);
    if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
  });
  dialog.addEventListener('click', event => { if (event.target !== dialog) return; const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); });
  const normalize = value => String(value).normalize('NFKC').toLowerCase().replace(/[\s\-_.·/]+/g, '');
  let results = [];
  function renderSearch() {
    const terms = search.value.trim().split(/\s+/).filter(Boolean).map(normalize);
    results = terms.length ? [...catalog.events].sort((a, b) => b.release.date.localeCompare(a.release.date)).filter(entry => { const text = catalog.text(entry, language); const haystack = normalize([text.name, text.summary, entry.release.name, entry.company.name, entry.company.nameEn, entry.company.aliases, entry.release.date].join(' ')); return terms.every(term => haystack.includes(term)); }) : [];
    document.querySelector('#search-results').innerHTML = results.slice(0, 8).map(entry => {
      const text = catalog.text(entry, language), src = window.ATLAS_ICONS.release(entry.release);
      return `<button class="search-result" data-open-entry="${escape(entry.key)}"><div class="search-result-identity">${src ? `<img class="brand-icon" src="${escape(src)}" width="22" height="22" alt="">` : ''}<div><strong>${escape(text.name)}</strong><span>${escape(companyName(entry.company))} · ${escape(english ? catalog.sections[entry.section].en : catalog.sections[entry.section].zh)}</span></div></div><span class="search-result-date">${entry.release.date.replaceAll('-', '.')}</span></button>`;
    }).join('');
    document.querySelector('#search-help').textContent = terms.length ? L(`${results.length} 个匹配节点`, `${results.length} matching entries`) : L('搜索四条时间线中的名称、机构或关键词。', 'Search names, organizations, or keywords across all timelines.');
  }
  search.addEventListener('input', renderSearch);
  document.querySelector('#search-form').addEventListener('submit', event => {
    event.preventDefault(); renderSearch();
    if (page === 'explore') { document.dispatchEvent(new CustomEvent('atlas:query', { detail: search.value.trim() })); searchDialog.close(); }
    else if (results[0]) openEntry(results[0].key);
  });
  document.addEventListener('click', async event => {
    const trigger = event.target.closest('[data-open-entry]');
    if (trigger) { event.preventDefault(); openEntry(trigger.dataset.openEntry); }
    const copy = event.target.closest('[data-copy]');
    if (copy && activeEntry) {
      const url = window.ATLAS_UI.localPage(catalog.sections[activeEntry.section].file);
      url.searchParams.set('lang', language); url.hash = `release-${activeEntry.release.id}`;
      const href = url.href;
      try { await navigator.clipboard.writeText(href); toast(L('节点链接已复制', 'Entry link copied')); }
      catch { let input = content.querySelector('.copy-link-input'); if (!input) { input = document.createElement('input'); input.className = 'copy-link-input'; input.readOnly = true; input.setAttribute('aria-label', L('节点链接', 'Entry link')); content.append(input); } input.value = href; input.focus(); input.select(); toast(L('请选择并复制节点链接', 'Select and copy the entry link')); }
    }
  });
  window.addEventListener('hashchange', openHash); window.addEventListener('popstate', openHash);
  window.ATLAS_WORKSPACE = { openEntry };
  renderSearch(); openHash();
})();
