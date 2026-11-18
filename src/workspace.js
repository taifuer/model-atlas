/* Shared search and detail navigation across every timeline. */
(() => {
  'use strict';
  const { L, escape, language, english, companyName, page, toast, localPage } = window.ATLAS_UI;
  const catalog = window.ATLAS_CATALOG;
  const dialog = document.querySelector('#detail-dialog');
  const content = document.querySelector('#dialog-content');
  const search = document.querySelector('#search');
  const searchDialog = document.querySelector('#search-dialog');
  let activeEntry, previousFocus, previousSelector, closingFromLocation = false;

  function locationEntry() {
    try {
      if (location.hash.startsWith('#entry=')) return catalog.get(decodeURIComponent(location.hash.slice(7)));
      if (location.hash.startsWith('#release-') && catalog.sections[page]) return catalog.get(`${page}:${decodeURIComponent(location.hash.slice(9))}`);
    } catch { /* Malformed shared links do not open a dialog. */ }
  }
  function rememberFocus() {
    previousFocus = searchDialog.open ? document.querySelector('#search-toggle') : document.activeElement;
    previousSelector = '';
    if (previousFocus?.dataset.detail) {
      previousSelector = `[data-detail="${CSS.escape(previousFocus.dataset.detail)}"]`;
      if (previousFocus.dataset.detailSection) previousSelector += `[data-detail-section="${CSS.escape(previousFocus.dataset.detailSection)}"]`;
    } else if (previousFocus?.dataset.openEntry) previousSelector = `[data-open-entry="${CSS.escape(previousFocus.dataset.openEntry)}"]`;
  }
  function openEntry(key, update = true, section = '') {
    if (typeof update === 'string') { section = update; update = true; }
    let record = catalog.get(key);
    if (!record) return;
    const parent = catalog.get(record.parentKey);
    if (section.startsWith('history-')) {
      const child = catalog.get(`${record.section}:${section.slice(8)}`);
      if (child?.parentKey === parent.key) record = child;
      section = '';
    }
    const alreadyOpen = dialog.open;
    if (!alreadyOpen) rememberFocus();
    document.dispatchEvent(new CustomEvent('atlas:entry-open', { detail: record.key }));
    activeEntry = record;
    if (searchDialog.open) searchDialog.close();
    if (update) {
      const url = new URL(location.href);
      url.hash = record.section === page ? `release-${record.release.id}` : `entry=${encodeURIComponent(record.key)}`;
      if (url.href !== location.href) {
        const state = { ...history.state, atlasDetail: { key: record.key } };
        history[alreadyOpen ? 'replaceState' : 'pushState'](state, '', url);
      }
    }
    content.innerHTML = window.ATLAS_DETAILS.render(parent.section, parent.raw, parent.release.id, language);
    document.body.classList.add('modal-open');
    window.scrollTo({ top: scrollY, behavior: 'instant' });
    if (!alreadyOpen) dialog.showModal();
    content.scrollTop = 0;
    let heading;
    if (parent !== record) {
      const item = content.querySelector(`#history-${CSS.escape(record.release.id)}`);
      if (item) {
        window.ATLAS_DETAILS.expandHistory(item);
        heading = ['specs', 'pricing', 'scores'].includes(section) && item.querySelector(`#${CSS.escape(item.id)}-${section}-title`);
        if (!heading) heading = item.querySelector('summary');
      }
    } else if (['specs', 'pricing', 'scores', 'history'].includes(section)) {
      heading = content.querySelector(`#${section}-title`);
    }
    if (heading) {
      heading.focus({ preventScroll: true });
      content.scrollTop = heading.getBoundingClientRect().top - content.getBoundingClientRect().top - 12;
    }
  }
  function openHash() {
    const record = locationEntry();
    if (record) {
      if (!dialog.open || activeEntry?.key !== record.key) openEntry(record.key, false);
    } else if (dialog.open) {
      closingFromLocation = true;
      dialog.close();
    }
  }
  document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    const fromLocation = closingFromLocation;
    closingFromLocation = false;
    if (dialog.open) return;
    if (!fromLocation && locationEntry()) {
      if (history.state?.atlasDetail?.key === activeEntry?.key) history.back();
      else {
        const url = new URL(location.href); url.hash = '';
        const state = { ...history.state }; delete state.atlasDetail;
        history.replaceState(state, '', url);
      }
    }
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open');
    const focus = previousFocus?.isConnected ? previousFocus : previousSelector ? document.querySelector(previousSelector) : null;
    focus?.focus({ preventScroll: true });
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });

  let results = [];
  function renderSearch() {
    const query = search.value.trim().slice(0, 300);
    results = catalog.search(query, language);
    document.querySelector('#search-results').innerHTML = results.slice(0, 8).map(entry => {
      const src = window.ATLAS_ICONS.release(entry.release);
      const labels = [companyName(entry.company), english ? catalog.sections[entry.section].en : catalog.sections[entry.section].zh];
      if (entry.parentKey !== entry.key) labels.push(catalog.title(catalog.get(entry.parentKey), language));
      return `<button class="search-result" type="button" data-open-entry="${escape(entry.key)}"><div class="search-result-identity">${src ? `<img class="brand-icon" src="${escape(src)}" width="22" height="22" alt="">` : ''}<div><strong>${escape(catalog.title(entry, language))}</strong><span>${escape(labels.join(' · '))}</span></div></div><span class="search-result-date">${entry.release.date.replaceAll('-', '.')}</span></button>`;
    }).join('');
    document.querySelector('#search-help').textContent = query
      ? L(`${results.length} 个匹配结果 · Enter 查看全部结果`, `${results.length} ${results.length === 1 ? 'match' : 'matches'} · Enter to view all results`)
      : L('搜索全部时间线中的名称、机构或关键词。', 'Search names, organizations, or keywords across all timelines.');
  }
  search.addEventListener('input', event => { if (!event.isComposing) renderSearch(); });
  search.addEventListener('compositionend', renderSearch);
  document.querySelector('#search-form').addEventListener('submit', event => {
    event.preventDefault(); renderSearch();
    const query = search.value.trim().slice(0, 300);
    if (!query) return;
    if (page === 'explore') {
      document.dispatchEvent(new CustomEvent('atlas:query', { detail: query }));
      searchDialog.close();
    } else {
      const url = localPage('explore.html'); url.searchParams.set('lang', language); url.searchParams.set('q', query);
      location.assign(url.href);
    }
  });
  document.addEventListener('click', async event => {
    const trigger = event.target.closest('[data-open-entry], [data-detail]');
    if (trigger) {
      if (trigger.matches('a[href]') && (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)) return;
      event.preventDefault();
      openEntry(trigger.dataset.openEntry || `${page}:${trigger.dataset.detail}`, true, trigger.dataset.detailSection);
    }
    const copy = event.target.closest('[data-copy]');
    if (copy && activeEntry) {
      const record = catalog.get(`${activeEntry.section}:${copy.dataset.copy}`);
      if (!record) return;
      const url = new URL(catalog.timelineUrl(record, language), document.baseURI);
      try { await navigator.clipboard.writeText(url.href); toast(L('节点链接已复制', 'Entry link copied')); }
      catch {
        let input = content.querySelector('.copy-link-input');
        if (!input) { input = document.createElement('input'); input.className = 'copy-link-input'; input.readOnly = true; input.setAttribute('aria-label', L('节点链接', 'Entry link')); content.append(input); }
        input.value = url.href; input.focus(); input.select(); toast(L('请选择并复制节点链接', 'Select and copy the entry link'));
      }
    }
  });
  window.addEventListener('hashchange', openHash);
  window.addEventListener('popstate', openHash);
  window.ATLAS_WORKSPACE = { openEntry };
  renderSearch(); openHash();
})();
