import { test, expect } from '@playwright/test';
const route = (language, file) => `${language === 'en' ? '/en/' : '/'}${file}`;

for (const language of ['zh', 'en']) {
  test(`${language}: timelines expand without truncating dates, counts or explicit filters`, async ({ page }) => {
    for (const file of ['index.html', 'agents.html', 'hardware.html', 'technology.html']) {
      await page.goto(route(language, file));
      const cards = page.locator('.release-card');
      const total = await page.evaluate(() => window.ATLAS_UI.raw.releases.length);
      const initial = await cards.count();
      expect(initial).toBeGreaterThanOrEqual(30);
      expect(initial).toBeLessThan(total);
      const date = await cards.last().getAttribute('data-date');
      const expectedDay = await page.evaluate(date => window.ATLAS_UI.raw.releases.filter(entry => entry.date === date).length, date);
      await expect(page.locator(`.release-card[data-date="${date}"]`)).toHaveCount(expectedDay);
      expect(await page.locator('.annual-bar').evaluateAll(bars => bars.reduce((sum, bar) => sum + Number(bar.dataset.count), 0))).toBe(total);
      const firstIDs = await cards.evaluateAll(nodes => nodes.map(node => node.id));
      await page.locator('[data-show-more]').focus();
      await page.keyboard.press('Enter');
      const expanded = await cards.count();
      expect(expanded).toBeGreaterThan(initial);
      expect((await cards.evaluateAll(nodes => nodes.map(node => node.id))).slice(0, initial)).toEqual(firstIDs);
      expect(await page.evaluate(() => document.activeElement.closest('.release-card')?.id)).toBe(await cards.nth(initial).getAttribute('id'));
      await expect(page.locator(':focus')).toBeInViewport();
      await page.locator('[data-view="compact"]').click();
      await expect(cards).toHaveCount(expanded);
      await page.goBack();
      await expect(cards).toHaveCount(expanded);
      await page.goForward();
      await expect(cards).toHaveCount(expanded);
      if (expanded < total) await page.locator('[data-show-all]').click();
      await expect(cards).toHaveCount(total);
      const year = await page.locator('#annual-chart [data-chart-year]').first().getAttribute('data-chart-year');
      await page.locator(`#annual-chart [data-chart-year="${year}"]`).click();
      const expectedYear = await page.evaluate(year => window.ATLAS_UI.raw.releases.filter(entry => entry.date.startsWith(year)).length, year);
      await expect(cards).toHaveCount(expectedYear);
      await expect(page.locator('[data-show-more]')).toHaveCount(0);
      await page.locator('#chart-back').click();
      await expect(cards).toHaveCount(initial);
      await page.locator('#sort-button').click();
      const dates = await cards.evaluateAll(nodes => nodes.map(node => node.dataset.date));
      expect(dates).toEqual([...dates].sort());
      expect(dates[0]).toBe(await page.evaluate(() => window.ATLAS_UI.raw.releases.map(entry => entry.date).sort()[0]));
      expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    }
    await page.goto(route(language, 'index.html') + '#release-gpt-4o');
    await expect(page.locator('#detail-dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#release-gpt-4o')).toBeVisible();
    await page.goto(route(language, 'index.html') + '#year-2018');
    await expect(page.locator('#year-2018')).toBeInViewport();
    await page.evaluate(() => window.dispatchEvent(new Event('beforeprint')));
    await expect(page.locator('.release-card')).toHaveCount(await page.evaluate(() => window.ATLAS_UI.raw.releases.length));
  });

  test(`${language}: Explore expands whole months and reveals requested years, search and links`, async ({ page }) => {
    await page.goto(route(language, 'explore.html'));
    const cards = page.locator('.journey-event');
    const total = await page.evaluate(() => window.ATLAS_EXPLORER.count);
    const initial = await cards.count();
    expect(initial).toBeGreaterThanOrEqual(30);
    expect(initial).toBeLessThan(total);
    const period = await page.locator('.journey-period').last().getAttribute('id');
    const expectedMonth = await page.evaluate(id => window.ATLAS_CATALOG.events.filter(entry => entry.release.date.startsWith(id.slice(7))).length, period);
    await expect(page.locator(`#${period} .journey-event`)).toHaveCount(expectedMonth);
    await page.locator('#journey-more').focus();
    await page.keyboard.press('Enter');
    expect(await cards.count()).toBeGreaterThan(initial);
    expect(await page.evaluate(() => document.activeElement.closest('.journey-event')?.dataset.entryKey)).toBe(await cards.nth(initial).getAttribute('data-entry-key'));
    await expect(page.locator(':focus')).toBeInViewport();
    await page.locator('[data-year="2025"]').click();
    const expectedYear = await page.evaluate(() => window.ATLAS_CATALOG.events.filter(entry => entry.release.date.startsWith('2025')).length);
    await expect(page.locator('[id^="period-2025-"] .journey-event')).toHaveCount(expectedYear);
    await page.goto(route(language, 'explore.html') + '?period=2024-01');
    await expect(page.locator('#period-2024-01 h2')).toBeInViewport();
    await page.goto(route(language, 'explore.html') + '?q=H100');
    await expect(cards).toHaveCount(total);
    await expect(page.locator('.journey-event.is-match').first()).toContainText('H100');
    await page.locator('#journey-search-clear').click();
    await expect(cards).toHaveCount(total);
    await page.goto(route(language, 'explore.html'));
    await page.locator('#journey-all').click();
    await expect(cards).toHaveCount(total);
    expect(new Set(await cards.evaluateAll(nodes => nodes.map(node => node.dataset.entryKey))).size).toBe(total);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  });
}
