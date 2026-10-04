import { test as base, expect } from '@playwright/test';

const test = base.extend({
  clientErrors: [async ({ page }, use) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => {
      if (response.status() >= 400 && new URL(response.url()).origin === new URL(page.url()).origin) {
        errors.push(`${response.status()} ${new URL(response.url()).pathname}`);
      }
    });
    await use(errors);
    expect(errors, 'No uncaught application errors or missing local assets').toEqual([]);
  }, { auto: true }],
});

const pages = ['index.html', 'agents.html', 'hardware.html', 'technology.html', 'explore.html', 'about.html'];
const route = (language, file = 'index.html') => `${language === 'en' ? '/en/' : '/'}${file}`;
const noOverflow = async page => {
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth), 'Page must not scroll sideways').toBeLessThanOrEqual(1);
};
const ready = async (page, url) => {
  await page.goto(url);
  await expect(page.locator('#page-title')).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
};
const searchFor = async (page, query) => {
  if (!(await page.locator('#search-dialog').isVisible())) await page.locator('#search-toggle').click();
  await page.locator('#search').fill(query);
};

for (const language of ['zh', 'en']) {
  test.describe(language, () => {
    test('filters, detail history, milestones and compact view preserve the reading state', async ({ page }) => {
      await ready(page, route(language));
      await page.locator('[data-company-filter="openai"]').click();
      await page.locator('#year-select').selectOption('2024');
      const filteredURL = page.url();
      const filteredIDs = await page.locator('.release-card').evaluateAll(cards => cards.map(card => card.id));
      expect(filteredIDs).toContain('release-gpt-4o');
      expect(await page.locator('.release-card').evaluateAll(cards => cards.every(card => card.dataset.company === 'openai' && card.dataset.date.startsWith('2024')))).toBe(true);

      await page.locator('#release-gpt-4o .card-title button').click();
      await expect(page.locator('#detail-dialog')).toBeVisible();
      await expect(page.locator('#dialog-title')).toHaveText('GPT-4o');
      const detailURL = page.url();
      expect(detailURL).not.toBe(filteredURL);
      await page.goBack();
      await expect(page.locator('#detail-dialog')).not.toBeVisible();
      await expect(page).toHaveURL(filteredURL);
      await expect(page.locator('#year-select')).toHaveValue('2024');
      await page.goForward();
      await expect(page.locator('#detail-dialog')).toBeVisible();
      await expect(page).toHaveURL(detailURL);
      await page.locator('#close-dialog').click();
      await expect(page.locator('#detail-dialog')).not.toBeVisible();
      await expect(page).toHaveURL(filteredURL);
      expect(await page.locator('.release-card').evaluateAll(cards => cards.map(card => card.id))).toEqual(filteredIDs);
      await page.goBack();
      await expect(page.locator('#year-select')).toHaveValue('all');
      await expect(page.locator('[data-company-filter="openai"]')).toHaveAttribute('aria-pressed', 'true');
      await page.goForward();
      await expect(page.locator('#year-select')).toHaveValue('2024');
      await expect(page).toHaveURL(filteredURL);

      await page.locator('#milestone-only').check();
      await expect(page.locator('.release-card:not(.is-milestone)')).toHaveCount(0);
      await page.locator('[data-view="compact"]').click();
      await expect(page.locator('.compact-card').first()).toBeVisible();
      await expect(page.locator('.card-facts')).toHaveCount(0);
      await page.locator('#reset-filters').click();
      await expect(page.locator('#year-select')).toHaveValue('all');
      await expect(page.locator('#milestone-only')).not.toBeChecked();
      await expect(page.locator('#active-filter-row')).not.toBeVisible();
      await noOverflow(page);
    });

    test('shared detail links close locally and Escape restores focus', async ({ page }) => {
      await ready(page, route(language) + '#release-gpt-4o');
      await expect(page.locator('#detail-dialog')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.locator('#detail-dialog')).not.toBeVisible();
      expect(new URL(page.url()).pathname).toBe(route(language));
      expect(new URL(page.url()).hash).toBe('');
      await page.locator('#release-gpt-4o .card-title button').click();
      await expect(page.locator('#detail-dialog')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.locator('#detail-dialog')).not.toBeVisible();
      await expect(page.locator('#release-gpt-4o .card-title button')).toBeFocused();
    });

    test('fact chips identify the model, snapshot and promotional price, then open the right section', async ({ page }) => {
      await ready(page, route(language));
      const sol = page.locator('#release-gpt-5-6');
      const solSpecs = sol.locator('[data-detail-section="specs"]');
      const solPrice = sol.locator('[data-detail-section="pricing"]');
      await expect(solSpecs).toContainText('gpt-5.6-sol');
      await expect(solPrice).toContainText('gpt-5.6-sol');
      await expect(solPrice).toContainText(language === 'en' ? 'Promo' : '优惠');
      await solPrice.click();
      await expect(page.locator('#pricing-title')).toBeFocused();
      await expect(page.locator('#pricing-title')).toBeInViewport();
      await expect(page.locator('.detail-pricing')).toContainText('gpt-5.6-sol');
      await page.locator('#close-dialog').click();
      await expect(page.locator('#detail-dialog')).not.toBeVisible();

      const gpt4o = page.locator('#release-gpt-4o');
      await expect(gpt4o.locator('[data-detail-section="specs"]')).toContainText('gpt-4o-2024-08-06');
      await expect(gpt4o.locator('[data-detail-section="pricing"]')).toContainText('gpt-4o-2024-08-06');
      await gpt4o.locator('[data-detail-section="specs"]').click();
      await expect(page.locator('#specs-title')).toBeFocused();
      await expect(page.locator('#specs-title')).toBeInViewport();
      await expect(page.locator('.detail-specs')).toContainText('gpt-4o-2024-08-06');
      await page.keyboard.press('Escape');
      await expect(page.locator('#detail-dialog')).not.toBeVisible();

      const snapshot = await page.evaluate(() => window.MODEL_ATLAS_SCORES.checkedAt.replaceAll('-', '.'));
      const score = page.locator('#release-claude-opus-5-5 [data-detail-section="scores"]').first();
      await expect(score).toHaveAttribute('title', new RegExp(snapshot.replaceAll('.', '\\.')));
      await page.locator('[data-view="compact"]').click();
      await expect(page.locator('.compact-card').first()).toBeVisible();
      await expect(page.locator('.fact-chip')).toHaveCount(0);
      await noOverflow(page);
    });

    test('every header searches all timelines and understands typographic hyphens', async ({ page }) => {
      for (const file of pages) {
        await ready(page, route(language, file));
        await noOverflow(page);
        const hit = await page.locator('.explore-launch').boundingBox();
        expect(hit.width, `${file}: Explore hit target width`).toBeGreaterThanOrEqual(44);
        expect(hit.height, `${file}: Explore hit target height`).toBeGreaterThanOrEqual(44);
        const beforeSearch = page.url();
        await searchFor(page, 'FlashAttention‑4');
        const result = page.locator('#search-results .search-result').filter({ hasText: 'FlashAttention-4' });
        await expect(result).toHaveCount(1);
        expect(page.url(), 'Typing in global search must not filter the current timeline').toBe(beforeSearch);
        await result.click();
        await expect(page.locator('#dialog-title')).toHaveText('FlashAttention-4');
        await expect(page.locator('#dialog-content .detail-sources a').first()).toHaveAttribute('href', /^https:\/\//);
        if (file === 'index.html') {
          await page.goBack();
          await expect(page.locator('#detail-dialog')).not.toBeVisible();
          await expect(page).toHaveURL(beforeSearch);
          await page.goForward();
          await expect(page.locator('#detail-dialog')).toBeVisible();
          await expect(page.locator('#dialog-title')).toHaveText('FlashAttention-4');
        }
        await page.keyboard.press('Escape');
        await expect(page.locator('#detail-dialog')).not.toBeVisible();
      }
      await searchFor(page, 'H100');
      await expect(page.locator('#search-results')).toContainText('H100');
      await page.locator('#search').press('Enter');
      await expect(page).toHaveURL(url => url.pathname === route(language, 'explore.html') && url.searchParams.get('q') === 'H100');
      await expect(page.locator('#journey-search')).toBeVisible();
      await expect(page.locator('.journey-event.is-match').first()).toContainText('H100');
      const completeCount = await page.locator('.journey-event').count();
      expect(completeCount, 'Search highlights matches without hiding the chronology').toBeGreaterThan(100);
      await searchFor(page, 'atlas-nonexistent-model-000000');
      await expect(page.locator('#search-results .search-result')).toHaveCount(0);
      await page.locator('#search').press('Enter');
      await expect(page.locator('#search-dialog')).not.toBeVisible();
      await expect(page.locator('#journey-search-status')).toContainText(/0/);
      await expect(page.locator('.journey-event.is-match')).toHaveCount(0);
      await expect(page.locator('.journey-event')).toHaveCount(completeCount);
      await noOverflow(page);
    });

    test('a short landscape viewport keeps search input, results and help reachable', async ({ page }) => {
      await page.setViewportSize({ width: 568, height: 320 });
      await ready(page, route(language));
      await searchFor(page, 'GPT');
      await expect(page.locator('#search-results .search-result')).toHaveCount(8);
      const geometry = await page.evaluate(() => {
        const bounds = selector => {
          const rect = document.querySelector(selector).getBoundingClientRect();
          return { top: rect.top, bottom: rect.bottom, height: rect.height };
        };
        const results = document.querySelector('#search-results');
        return { height: innerHeight, dialog: bounds('#search-dialog'), input: bounds('#search-form'), help: bounds('#search-help'), results: bounds('#search-results'), scrollHeight: results.scrollHeight };
      });
      expect(geometry.dialog.top).toBeGreaterThanOrEqual(8);
      expect(geometry.dialog.bottom).toBeLessThanOrEqual(geometry.height - 8);
      expect(geometry.input.height).toBeGreaterThanOrEqual(44);
      expect(geometry.help.bottom).toBeLessThanOrEqual(geometry.dialog.bottom);
      expect(geometry.results.height).toBeGreaterThan(30);
      expect(geometry.scrollHeight).toBeGreaterThan(geometry.results.height);
      await page.locator('#search-results .search-result').last().scrollIntoViewIfNeeded();
      await expect(page.locator('#search-help')).toBeInViewport();
      await expect(page.locator('#search')).toBeInViewport();
      await page.locator('#search-dismiss').click();
      await expect(page.locator('#search-dialog')).not.toBeVisible();
      await noOverflow(page);
    });

    test('font resources load successfully without a Chinese download on an English first view', async ({ page }) => {
      const fonts = [];
      page.on('response', response => {
        if (new URL(response.url()).pathname.endsWith('.woff2')) fonts.push({ url: response.url(), status: response.status() });
      });
      await ready(page, route(language));
      expect(fonts.length).toBeGreaterThan(0);
      expect(fonts.every(font => font.status === 200)).toBe(true);
      expect(fonts.some(font => font.url.includes('atlas-sans-latin.woff2'))).toBe(true);
      expect(fonts.some(font => font.url.includes('atlas-sans-cjk.woff2'))).toBe(language === 'zh');
      expect(await page.evaluate(() => document.fonts.check('16px "Atlas Sans"', 'Model Atlas'))).toBe(true);
      await noOverflow(page);
    });

    test.describe('without JavaScript', () => {
      test.use({ javaScriptEnabled: false });
      test('all static editions retain readable events and working source links', async ({ page }) => {
        for (const file of pages) {
          await ready(page, route(language, file));
          await expect(page.locator('html')).toHaveAttribute('lang', language === 'en' ? 'en' : 'zh-CN');
          if (file === 'about.html') {
            await expect(page.locator('#criteria')).toContainText(language === 'en' ? 'Selection criteria' : '收录标准');
          } else {
            const entrySelector = file === 'explore.html' ? '#explore-root .journey-event' : '#timeline .release-card';
            const entries = page.locator(entrySelector);
            expect(await entries.count(), file).toBeGreaterThan(20);
            const entry = entries.first();
            await expect(entry.locator('h3')).not.toBeEmpty();
            await expect(entry.locator('.card-summary, .journey-summary')).not.toBeEmpty();
            await expect(entry.locator('a.source-link')).toHaveAttribute('href', /^https:\/\//);
            await expect(entry.locator('button')).toHaveCount(0);
          }
          await noOverflow(page);
        }
      });
    });
  });
}
