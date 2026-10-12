import { test, expect } from '@playwright/test';

const timelines = ['index.html', 'agents.html', 'hardware.html', 'technology.html'];
const rowCount = page => page.locator('#company-filters > :not([hidden])').evaluateAll(elements => new Set(elements.map(element => Math.round(element.getBoundingClientRect().top))).size);
const ready = async (page, route) => {
  await page.goto(route);
  await expect(page.locator('.release-card').first()).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
};

for (const language of ['zh', 'en']) {
  test(`${language}: first-screen content and organization filters fit desktop and phone widths`, async ({ page, isMobile }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const width of isMobile ? [320, 390, 430] : [1165, 1440]) {
      const height = isMobile ? 844 : 747;
      await page.setViewportSize({ width, height });
      for (const file of timelines) {
        await ready(page, `${language === 'en' ? '/en/' : '/'}${file}`);
        expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
        const firstTitle = await page.locator('.card-title').first().boundingBox();
        expect(firstTitle.y + firstTitle.height, `${width}px ${file}: first entry title is visible without scrolling`).toBeLessThanOrEqual(height);
        if (isMobile) {
          await expect.poll(() => rowCount(page), { message: `${width}px ${file}: collapsed organizations occupy at most two rows, including More` }).toBeLessThanOrEqual(2);
          await expect(page.locator('#company-disclosure')).toHaveAttribute('aria-expanded', 'false');
          expect(await page.locator('.filter-options select').evaluateAll(elements => elements.every(element => element.getBoundingClientRect().height >= 44))).toBe(true);
        } else {
          await expect(page.locator('[data-company-filter][hidden]')).toHaveCount(0);
          await expect(page.locator('#company-disclosure')).toBeHidden();
        }
      }
    }
    if (isMobile) {
      await ready(page, `${language === 'en' ? '/en/' : '/'}agents.html`);
      const disclosure = page.locator('#company-disclosure');
      await disclosure.focus();
      await page.keyboard.press('Enter');
      await expect(disclosure).toHaveAttribute('aria-expanded', 'true');
      await page.locator('[data-company-filter="factory"]').click();
      await disclosure.focus();
      await page.keyboard.press('Enter');
      await expect(disclosure).toHaveAttribute('aria-expanded', 'false');
      await expect(disclosure).toBeFocused();
      for (const width of [320, 430, 390]) {
        await page.setViewportSize({ width, height: 844 });
        await expect(page.locator('[data-company-filter="factory"]')).toBeVisible();
        await expect(page.locator('[data-company-filter="factory"]')).toHaveAttribute('aria-pressed', 'true');
        await expect.poll(() => rowCount(page)).toBeLessThanOrEqual(2);
        await expect(page.locator('#results-count')).toBeVisible();
      }
      await disclosure.focus();
      await page.keyboard.press('Enter');
      await page.setViewportSize({ width: 1165, height: 844 });
      await expect(disclosure).toBeHidden();
      await expect(page.locator('[data-company-filter][hidden]')).toHaveCount(0);
      await page.setViewportSize({ width: 390, height: 844 });
      await expect(disclosure).toHaveAttribute('aria-expanded', 'true');
      await expect(page.locator('[data-company-filter][hidden]')).toHaveCount(0);
      await expect(page.locator('.release-card:not([data-company="factory"])')).toHaveCount(0);
    }
    expect(errors).toEqual([]);
  });
}
