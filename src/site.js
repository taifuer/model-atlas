(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  let saved;
  try { saved = localStorage.getItem('atlas-language'); } catch { /* Storage is optional. */ }
  const requested = params.get('lang');
  const supported = value => ['zh', 'en'].includes(value);
  const browserLanguage = (navigator.languages?.length ? navigator.languages : [navigator.language]).map(value => String(value).toLowerCase().split('-')[0]).find(supported);
  const englishPath = /\/en\/(?:[^/]+\.html)?$/.test(location.pathname);
  const explicitPage = /\/[^/]+\.html$/.test(location.pathname);
  const language = supported(requested) ? requested : englishPath ? 'en' : explicitPage ? 'zh' : supported(saved) ? saved : browserLanguage || 'en';
  const english = language === 'en';
  const L = (zh, en) => english ? en : zh;
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const formattedDate = date => date.replaceAll('-', '.');
  const page = document.body.dataset.page;
  const pages = {
    models: { file: 'index.html', zh: '大模型', en: 'LLM', title: ['大模型发布时间线', 'Language model timeline'], data: window.MODEL_ATLAS },
    agents: { file: 'agents.html', zh: '智能体', en: 'Agent', title: ['智能体工具时间线', 'Agent tool timeline'], data: window.AGENT_ATLAS },
    hardware: { file: 'hardware.html', zh: '算力', en: 'Hardware', title: ['算力硬件时间线', 'AI hardware timeline'], data: window.HARDWARE_ATLAS },
    technology: { file: 'technology.html', zh: '技术', en: 'Technology', title: ['AI 技术演进', 'AI technology timeline'], data: window.TECHNOLOGY_ATLAS },
    explore: { file: 'explore.html', zh: '探索', en: 'Explore', title: ['探索', 'Explore'], data: window.MODEL_ATLAS },
    about: { file: 'about.html', zh: '关于', en: 'About', title: ['关于', 'About'], data: window.MODEL_ATLAS },
  };
  const raw = pages[page].data;
  const siteRoot = new URL('./', document.baseURI);
  function localPage(file, targetLanguage = language) {
    return new URL((targetLanguage === 'en' ? 'en/' : '') + file, siteRoot);
  }
  const seo = window.ATLAS_SEO?.[page]?.[language];
  const names = { qwen: 'Alibaba', moonshot: 'Moonshot AI', zhipu: 'Z.ai', xiaomi: 'Xiaomi', stepfun: 'StepFun', tencent: 'Tencent', bytedance: 'ByteDance' };
  const companyName = company => english ? company.nameEn || names[company.id] || company.name : company.name;
  const releaseText = release => english ? { ...release, ...(release.en || window.MODEL_ATLAS_EN?.[release.id]) } : release;
  const kinds = english ? raw.kindsEn || { paper: 'Research paper', release: 'Release', preview: 'Preview', product: 'Product launch', weights: 'Open weights', announcement: 'Announcement' } : raw.kinds;
  const tag = text => english ? raw.tagsEn?.[text] || window.ATLAS_TAGS_EN?.[text] || text : text;
  let toastTimer;
  function toast(message) {
    clearTimeout(toastTimer);
    const element = document.querySelector('#toast');
    element.textContent = message;
    element.classList.add('is-visible');
    toastTimer = setTimeout(() => element.classList.remove('is-visible'), 2600);
  }
  document.documentElement.lang = english ? 'en' : 'zh-CN';
  document.title = seo?.title || `${L(...pages[page].title)} · Model Atlas`;
  if (seo) {
    const declaredRoot = document.head.querySelector('link[hreflang="zh-CN"]')?.href || 'https://ai.taifua.com/';
    const canonical = new URL((english ? 'en/' : '') + (page === 'models' ? '' : pages[page].file), new URL('./', declaredRoot)).href;
    const values = { description: seo.description, keywords: seo.keywords.join(', '), 'og:title': seo.title, 'og:description': seo.description, 'og:url': canonical, 'og:locale': english ? 'en_US' : 'zh_CN', 'og:locale:alternate': english ? 'zh_CN' : 'en_US', 'twitter:title': seo.title, 'twitter:description': seo.description, 'twitter:url': canonical };
    for (const [name, content] of Object.entries(values)) {
      let meta = document.head.querySelector(`meta[${name.startsWith('og:') ? 'property' : 'name'}="${name}"]`);
      if (!meta) { meta = document.createElement('meta'); meta.setAttribute(name.startsWith('og:') ? 'property' : 'name', name); document.head.append(meta); }
      meta.content = content;
    }
    const link = document.head.querySelector('link[rel="canonical"]'); if (link) link.href = canonical;
    const structured = document.getElementById('atlas-structured-data');
    if (structured) {
      try {
        const data = JSON.parse(structured.textContent);
        const record = data['@graph']?.find(item => ['CollectionPage', 'AboutPage'].includes(item['@type']));
        if (record) Object.assign(record, { '@id': canonical + '#webpage', url: canonical, name: seo.title, description: seo.description, inLanguage: english ? 'en' : 'zh-CN' });
        structured.textContent = JSON.stringify(data);
      } catch { /* Keep the static metadata if a custom template uses another schema. */ }
    }
  }
  document.querySelectorAll('[data-zh][data-en]').forEach(element => { element.textContent = element.dataset[english ? 'en' : 'zh']; });
  document.querySelectorAll('[data-aria-zh]').forEach(element => element.setAttribute('aria-label', element.dataset[english ? 'ariaEn' : 'ariaZh']));
  document.querySelectorAll('[data-placeholder-zh]').forEach(element => { element.placeholder = element.dataset[english ? 'placeholderEn' : 'placeholderZh']; });
  document.querySelectorAll('[data-local]').forEach(link => {
    const existing = new URL(link.getAttribute('href'), document.baseURI);
    const file = existing.pathname.split('/').pop();
    const url = localPage(file);
    url.search = existing.search; url.hash = existing.hash;
    url.searchParams.set('lang', language);
    link.href = url.href;
  });
  document.querySelectorAll('[data-updated], [data-cutoff]').forEach(time => {
    const date = time.hasAttribute('data-cutoff') ? raw.asOf : raw.updatedAt || raw.asOf;
    time.dateTime = date;
    time.textContent = formattedDate(date);
  });
  document.querySelectorAll('[data-ranking-date]').forEach(time => {
    const date = window.MODEL_ATLAS.companyRanking.checkedAt;
    time.dateTime = date;
    time.textContent = formattedDate(date);
  });
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('#menu-toggle');
  const mobileHeader = matchMedia('(max-width: 760px)');
  const languageToggle = document.querySelector('#language-toggle');
  const languageOptions = document.querySelector('#language-options');
  const languageControl = document.querySelector('.language-control');
  const languageLinks = [...document.querySelectorAll('[data-language]')];
  function refreshLanguageLinks() {
    languageLinks.forEach(link => {
      const next = link.dataset.language;
      const url = localPage(pages[page].file, next);
      url.search = location.search; url.hash = location.hash;
      url.searchParams.set('lang', next);
      link.href = url.href;
      if (next === language) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }
  function setLanguageOpen(open, restoreFocus = false) {
    open = open && !mobileHeader.matches;
    languageOptions.hidden = !open;
    languageToggle.setAttribute('aria-expanded', String(open));
    if (open) refreshLanguageLinks();
    if (restoreFocus) languageToggle.focus();
  }
  refreshLanguageLinks();
  languageToggle.title = L('选择语言', 'Choose language');
  languageToggle.addEventListener('click', () => setLanguageOpen(languageOptions.hidden));
  languageLinks.forEach(link => link.addEventListener('click', () => {
    refreshLanguageLinks();
    try { localStorage.setItem('atlas-language', link.dataset.language); } catch { /* URL preserves the choice without storage. */ }
  }));
  function setMenuOpen(open, restoreFocus = false) {
    open = open && mobileHeader.matches;
    header.classList.toggle('is-menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? L('关闭菜单', 'Close menu') : L('打开菜单', 'Open menu'));
    menuToggle.querySelector('.menu-line-top').setAttribute('d', open ? 'M6 6l12 12' : 'M5 8h14');
    menuToggle.querySelector('.menu-line-bottom').setAttribute('d', open ? 'M6 18 18 6' : 'M5 16h14');
    if (open) refreshLanguageLinks();
    if (restoreFocus) menuToggle.focus();
  }
  setMenuOpen(false);
  menuToggle.addEventListener('click', event => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    setMenuOpen(open);
    if (open && event.detail === 0) header.querySelector('.header-nav a').focus();
  });
  mobileHeader.addEventListener('change', () => { setMenuOpen(false); setLanguageOpen(false); });
  document.addEventListener('pointerdown', event => {
    if (!header.contains(event.target)) setMenuOpen(false);
    if (!languageControl.contains(event.target)) setLanguageOpen(false);
  });
  header.addEventListener('focusout', event => {
    if (!header.contains(event.relatedTarget)) setMenuOpen(false);
  });
  languageControl.addEventListener('focusout', event => {
    if (!languageControl.contains(event.relatedTarget)) setLanguageOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      setMenuOpen(false, true);
    }
    if (event.key === 'Escape' && !languageOptions.hidden) {
      event.preventDefault();
      setLanguageOpen(false, true);
    }
  });
  const form = document.querySelector('#search-form');
  const searchFile = new URL(form.getAttribute('action'), document.baseURI).pathname.split('/').pop();
  form.action = localPage(searchFile).href;
  const searchDialog = document.querySelector('#search-dialog');
  function openSearch() {
    setMenuOpen(false);
    setLanguageOpen(false);
    if (!searchDialog.open) searchDialog.showModal();
    document.body.classList.add('modal-open');
    document.querySelector('#search').focus();
  }
  document.querySelector('#search-toggle').addEventListener('click', openSearch);
  document.querySelector('#search-dismiss').addEventListener('click', () => searchDialog.close());
  searchDialog.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    event.stopPropagation();
    searchDialog.close();
  });
  searchDialog.addEventListener('close', () => { if (!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open'); });
  searchDialog.addEventListener('click', event => {
    if (event.target !== searchDialog) return;
    const box = searchDialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) searchDialog.close();
  });
  const languageInput = document.createElement('input');
  languageInput.type = 'hidden'; languageInput.name = 'lang'; languageInput.value = language;
  form.append(languageInput);
  if (page === 'about') {
    document.querySelector('#search').placeholder = L('搜索模型…', 'Search models…');
    document.querySelector('label[for="search"]').textContent = L('搜索大模型时间线', 'Search the model timeline');
  }
  const back = document.querySelector('#back-to-top');
  back.title = L('返回顶部', 'Back to top');
  document.querySelector('#search-toggle').title = L('搜索（/）', 'Search (/)');
  const footer = document.querySelector('.site-footer');
  let scrollFrame = 0;
  const updateBack = () => {
    back.hidden = window.scrollY < 500;
    const footerOffset = Math.max(0, window.innerHeight - footer.getBoundingClientRect().top);
    back.style.setProperty('--footer-offset', `${Math.ceil(footerOffset)}px`);
  };
  window.addEventListener('scroll', () => {
    if (scrollFrame) return;
    scrollFrame = requestAnimationFrame(() => { updateBack(); scrollFrame = 0; });
  }, { passive: true });
  window.addEventListener('resize', updateBack);
  back.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    document.querySelector('#page-title').focus({ preventScroll: true });
  });
  updateBack();
  document.addEventListener('keydown', event => {
    const shortcut = event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey || event.key.toLowerCase() === 'k' && (event.ctrlKey || event.metaKey) && !event.altKey;
    if (shortcut && !document.querySelector('dialog[open]') && !event.target.closest('input, textarea, select, [contenteditable="true"]')) {
      event.preventDefault(); openSearch();
    }
  });
  window.ATLAS_UI = { raw, page, pages, language, english, L, escape, formattedDate, companyName, releaseText, kinds, tag, toast, localPage };
})();
