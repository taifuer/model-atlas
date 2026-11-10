/* Optional analytics consent. A deployment supplies the analytics adapter. */
(() => {
  'use strict';
  const analytics = window.ATLAS_ANALYTICS;
  if (!analytics || !window.ATLAS_UI) return;
  const { L, localPage } = window.ATLAS_UI;
  const key = 'atlas-analytics-consent';
  const lifetime = 180 * 24 * 60 * 60 * 1000;
  const controls = document.querySelector('#analytics-controls');
  const settings = document.querySelector('#analytics-settings');
  const status = document.querySelector('#analytics-status');
  let choice = null;
  let started = false;
  let returnFocus = false;

  function readChoice() {
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      if (saved?.version === 1 && ['allowed', 'denied'].includes(saved.choice) &&
          Number.isFinite(saved.expires) && saved.expires > Date.now() && saved.expires <= Date.now() + lifetime) return saved.choice;
    } catch { /* Unavailable or invalid storage never implies consent. */ }
    return null;
  }

  const notice = document.createElement('section');
  notice.className = 'analytics-notice';
  notice.id = 'analytics-notice';
  notice.setAttribute('aria-label', L('访问统计', 'Visit analytics'));
  notice.tabIndex = -1;
  notice.hidden = true;
  const inner = document.createElement('div');
  inner.className = 'wrap analytics-notice-inner';
  const message = document.createElement('p');
  message.append(L('允许使用网站统计了解访问情况吗？统计会使用 Cookie，拒绝不影响浏览。', 'Allow website analytics to measure visits using cookies? Browsing works either way.'), ' ');
  const privacy = document.createElement('a');
  const url = localPage('about.html');
  url.searchParams.set('lang', window.ATLAS_UI.language);
  url.hash = 'privacy';
  privacy.href = url.href;
  privacy.textContent = L('隐私说明', 'Privacy notice');
  message.append(privacy);
  const actions = document.createElement('div');
  actions.className = 'analytics-actions';
  for (const [value, label] of [['allowed', L('允许统计', 'Allow analytics')], ['denied', L('拒绝统计', 'Decline analytics')]]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'outline-button';
    button.dataset.analyticsChoice = value;
    button.textContent = label;
    button.addEventListener('click', () => choose(value));
    actions.append(button);
  }
  inner.append(message, actions);
  notice.append(inner);
  document.body.append(notice);

  function updateOffset() {
    document.documentElement.style.setProperty('--analytics-notice-height', `${notice.hidden ? 0 : Math.ceil(notice.getBoundingClientRect().height)}px`);
  }
  new ResizeObserver(updateOffset).observe(notice);
  function showNotice(show) {
    notice.hidden = !show;
    settings?.setAttribute('aria-expanded', String(show));
    updateOffset();
  }
  function apply(next) {
    choice = next;
    if (status) status.textContent = next === 'allowed' ? L('访问统计：已允许', 'Analytics: allowed') : next === 'denied' ? L('访问统计：已拒绝', 'Analytics: declined') : L('访问统计：未选择', 'Analytics: not selected');
    showNotice(next === null);
    if (next === 'allowed') {
      if (!started) { started = true; analytics.start(); }
    } else {
      // Stop the active tracker before deleting any of its local identifiers.
      if (started) { started = false; analytics.stop(); }
      analytics.clear();
    }
  }
  function choose(next) {
    try { localStorage.setItem(key, JSON.stringify({ version: 1, choice: next, expires: Date.now() + lifetime })); }
    catch { /* The choice still applies to this page when storage is blocked. */ }
    const hadFocus = notice.contains(document.activeElement);
    apply(next);
    if (hadFocus) (returnFocus ? settings : document.querySelector('#page-title'))?.focus({ preventScroll: true });
    returnFocus = false;
  }
  if (controls) controls.hidden = false;
  settings?.addEventListener('click', () => {
    returnFocus = true;
    showNotice(true);
    notice.focus({ preventScroll: true });
  });
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) apply(readChoice());
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted) apply(readChoice());
  });
  // Recheck an expired choice when returning to a long-lived browser tab.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && choice === 'allowed') {
      try { if (localStorage.getItem(key) && readChoice() !== 'allowed') apply(readChoice()); }
      catch { /* Keep an explicit in-memory choice if storage is unavailable. */ }
    }
  });
  apply(readChoice());
})();
