import { test, expect } from '@playwright/test';

for (const language of ['zh', 'en']) {
  test(`${language}: video task, chart, input and access filters share URL state`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${language === 'en' ? '/en/' : '/'}index.html?task=video-generation`);
    await expect(page.locator('#task-select')).toHaveValue('video-generation');
    await expect(page.locator('#release-seedance-2-5')).toBeAttached();
    await expect(page.locator('#release-gpt-4o')).toHaveCount(0);
    await expect(page.locator('.company-chip.is-empty:visible')).toHaveCount(0);
    const videoCount = await page.locator('.release-card').count();
    const chartTotal = await page.locator('.annual-bar').evaluateAll(bars => bars.reduce((sum, bar) => sum + Number(bar.dataset.count), 0));
    expect(chartTotal).toBe(videoCount);
    await page.locator('#category-select').selectOption('text');
    await page.locator('#openness-select').selectOption('open');
    await expect(page.locator('#release-hunyuan-video')).toBeAttached();
    await expect(page.locator('#release-seedance-2-5')).toHaveCount(0);
    await page.reload();
    await expect(page.locator('#task-select')).toHaveValue('video-generation');
    await expect(page.locator('#category-select')).toHaveValue('text');
    await expect(page.locator('#openness-select')).toHaveValue('open');
    await page.locator('#reset-filters').click();
    await expect(page.locator('#task-select')).toHaveValue('all');
    await expect(page.locator('#release-gpt-4o')).toBeAttached();
    await page.goBack();
    await expect(page.locator('#task-select')).toHaveValue('video-generation');
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    expect(errors).toEqual([]);
  });

  test(`${language}: video chips keep variant limits and distinguish enhanced output`, async ({ page }) => {
    await page.goto(`${language === 'en' ? '/en/' : '/'}index.html?task=video-generation`);
    const seedance = page.locator('#release-seedance-2-5');
    await expect(seedance.locator('.fact-chip')).toContainText(['30']);
    await expect(page.locator('[data-detail-section="pricing"], [data-detail-section="scores"]')).toHaveCount(0);
    await seedance.locator('.fact-chip').first().click();
    await expect(page.locator('#specs-title')).toBeFocused();
    await expect(page.locator('.detail-specs')).toContainText(language === 'en' ? 'Maximum generation duration' : '单次生成时长上限');
    await page.keyboard.press('Escape');
    const hailuo = page.locator('#release-hailuo-02');
    await expect(hailuo.locator('.fact-chip')).toContainText(['Hailuo 02 · 768p', 'Hailuo 02 · 768p']);
    await hailuo.locator('.fact-chip').first().click();
    const fullHD = page.locator('.spec-variant').filter({ hasText: 'Hailuo 02 · 1080p' });
    await expect(fullHD.locator('.spec-grid')).toContainText(language === 'en' ? '6 seconds' : '6 秒');
    await expect(fullHD.locator('.spec-grid')).not.toContainText(language === 'en' ? '10 seconds' : '10 秒');
    await page.keyboard.press('Escape');
    await page.locator('#release-gemini-omni-1-1-flash .card-title button').click();
    await expect(page.locator('.detail-specs')).toContainText(language === 'en' ? 'Upscaled output' : '升采样输出');
    await expect(page.locator('.detail-specs')).toContainText('4K');
    await page.keyboard.press('Escape');
    await page.locator('[data-view="compact"]').click();
    await expect(page.locator('.fact-chip, .card-tags')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  });
}
