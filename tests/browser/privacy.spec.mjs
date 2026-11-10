import { test, expect } from '@playwright/test';

const consentKey = 'atlas-analytics-consent';
const allowed = page => page.locator('[data-analytics-choice="allowed"]');
const declined = page => page.locator('[data-analytics-choice="denied"]');
const notice = page => page.locator('#analytics-notice');

async function enableAnalytics(context, saved = null) {
  await context.addInitScript(({ key, saved }) => {
    // Seed once, so later navigations exercise the visitor's saved choice.
    if (saved && !sessionStorage.getItem('consent-test-seeded')) {
      localStorage.setItem(key, saved);
      sessionStorage.setItem('consent-test-seeded', '1');
    }
    window.analyticsCalls = [];
    window.ATLAS_ANALYTICS = {
      start() { window.analyticsCalls.push('start'); },
      stop() { window.analyticsCalls.push('stop'); },
      clear() { window.analyticsCalls.push('clear'); },
    };
  }, { key: consentKey, saved });
}
const calls = page => page.evaluate(() => window.analyticsCalls);

test('default builds have a static privacy notice and no analytics prompt', async ({ page, baseURL }) => {
  const external = [];
  page.on('request', request => {
    if (new URL(request.url()).origin !== new URL(baseURL).origin) external.push(request.url());
  });
  await page.goto('/en/about.html#privacy');
  await expect(page.locator('#privacy')).toContainText('Website analytics is loaded only with consent');
  await expect(page.locator('#analytics-controls')).toBeHidden();
  await expect(notice(page)).toHaveCount(0);
  await expect(page.locator('footer')).not.toContainText('Privacy');
  expect(external).toEqual([]);
});

test('no choice means no analytics; declining survives navigation and language changes', async ({ page, context }) => {
  await enableAnalytics(context);
  await page.goto('/index.html');
  await expect(notice(page)).toBeVisible();
  expect(await calls(page)).toEqual(['clear']);
  await expect(page.locator('body')).not.toHaveClass(/modal-open/);
  await page.locator('#search-toggle').click();
  await expect(page.locator('#search-dialog')).toBeVisible();
  await page.locator('#search-dismiss').click();
  await declined(page).click();
  await expect(notice(page)).toBeHidden();
  expect(await calls(page)).not.toContain('start');
  await page.goto('/en/agents.html');
  await expect(page.locator('.release-card').first()).toBeVisible();
  await expect(notice(page)).toBeHidden();
  expect(await calls(page)).toEqual(['clear']);
  await page.goto('/en/about.html#privacy');
  await expect(page.locator('#analytics-status')).toHaveText('Analytics: declined');
  await page.locator('#analytics-settings').click();
  await expect(notice(page)).toBeFocused();
  await expect(allowed(page)).toHaveText('Allow analytics');
  expect(await calls(page)).not.toContain('start');
});

test('allowing persists and About can withdraw without losing functional preferences', async ({ page, context }) => {
  await enableAnalytics(context);
  await page.goto('/about.html#privacy');
  await allowed(page).focus();
  await page.keyboard.press('Enter');
  await expect(notice(page)).toBeHidden();
  expect(await calls(page)).toEqual(['clear', 'start']);
  await page.evaluate(() => {
    localStorage.setItem('atlas-language', 'zh');
    localStorage.setItem('atlas-view', 'compact');
  });
  await page.reload();
  await expect(page.locator('#analytics-status')).toHaveText('访问统计：已允许');
  expect(await calls(page)).toEqual(['start']);
  await page.locator('#analytics-settings').click();
  await declined(page).click();
  await expect(page.locator('#analytics-settings')).toBeFocused();
  await expect(page.locator('#analytics-status')).toHaveText('访问统计：已拒绝');
  expect(await calls(page)).toEqual(['start', 'stop', 'clear']);
  expect(await page.evaluate(() => [localStorage.getItem('atlas-language'), localStorage.getItem('atlas-view')])).toEqual(['zh', 'compact']);
  await page.reload();
  await expect(notice(page)).toBeHidden();
  expect(await calls(page)).toEqual(['clear']);
});

test('withdrawing in another tab stops an active tracker', async ({ page, context }) => {
  await enableAnalytics(context);
  await page.goto('/about.html#privacy');
  await allowed(page).click();
  const second = await context.newPage();
  await second.goto('/en/about.html#privacy');
  await expect(second.locator('#analytics-status')).toHaveText('Analytics: allowed');
  await second.locator('#analytics-settings').click();
  await declined(second).click();
  await expect(page.locator('#analytics-status')).toHaveText('访问统计：已拒绝');
  expect(await calls(page)).toEqual(['clear', 'start', 'stop', 'clear']);
  await second.close();
});

test('invalid or expired choices never start analytics', async ({ page, context }) => {
  await enableAnalytics(context);
  for (const saved of ['allowed', '{', JSON.stringify({ version: 1, choice: 'allowed', expires: Date.now() - 1 }), JSON.stringify({ version: 1, choice: 'allowed', expires: Date.now() + 365 * 86400000 })]) {
    await page.goto('/about.html');
    await page.evaluate(({ key, saved }) => localStorage.setItem(key, saved), { key: consentKey, saved });
    await page.reload();
    await expect(notice(page)).toBeVisible();
    expect(await calls(page)).toEqual(['clear']);
  }
});

test('blocked browser storage still permits browsing and a choice for this page', async ({ page, context }) => {
  await enableAnalytics(context);
  await context.addInitScript(() => {
    Storage.prototype.getItem = Storage.prototype.setItem = () => { throw new DOMException('Blocked', 'SecurityError'); };
  });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/en/about.html#privacy');
  await expect(notice(page)).toBeVisible();
  expect(await calls(page)).toEqual(['clear']);
  await declined(page).click();
  await expect(notice(page)).toBeHidden();
  await page.locator('#analytics-settings').click();
  await allowed(page).click();
  await expect(page.locator('#analytics-status')).toHaveText('Analytics: allowed');
  expect(await calls(page)).toEqual(['clear', 'clear', 'start']);
  expect(errors).toEqual([]);
});

for (const language of ['zh', 'en']) {
  test(`${language}: notice fits small screens and leaves the footer reachable`, async ({ page, context, isMobile }) => {
    await enableAnalytics(context);
    for (const width of isMobile ? [320, 390, 430] : [1165, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(`${language === 'en' ? '/en' : ''}/about.html#privacy`);
      await expect(notice(page)).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
      const bannerBox = await notice(page).boundingBox();
      expect(bannerBox.height).toBeLessThan(200);
      for (const button of [allowed(page), declined(page)]) {
        const box = await button.boundingBox();
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(width);
      }
      await page.evaluate(() => scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
      const footer = await page.locator('.footer-bottom').boundingBox();
      expect(footer.y + footer.height).toBeLessThanOrEqual(bannerBox.y + 1);
      const back = await page.locator('#back-to-top').boundingBox();
      expect(back.y + back.height).toBeLessThan(bannerBox.y);
      expect(await calls(page)).toEqual(['clear']);
    }
  });
}
