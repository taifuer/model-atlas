import { test, expect } from '@playwright/test';

const route = (language, file) => `${language === 'en' ? '/en/' : '/'}${file}`;

for (const language of ['zh', 'en']) {
  test(`${language}: old model links, copy actions and grouped cards retain their exact configuration`, async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', { value: { writeText: async text => { window.copiedEntry = text; } } });
    });
    const path = route(language, 'index.html');
    await page.goto(`${path}?lang=${language}#release-gpt-6-2-sol`);
    const child = page.locator('#history-gpt-6-2-sol');
    await expect(page.locator('#dialog-title')).toHaveText('GPT-6.2 Astra');
    await expect(child.locator('summary')).toBeFocused();
    await expect(child.locator('summary')).toBeInViewport();
    await expect(child.locator('.detail-pricing')).toContainText('gpt-6.2-sol');
    for (const id of ['gpt-6-2-sol', 'gpt-6-2-astra']) {
      await page.locator(`[data-copy="${id}"]`).click();
      const copied = new URL(await page.evaluate(() => window.copiedEntry));
      expect(copied.pathname + copied.search + copied.hash).toBe(`${path}?lang=${language}#release-${id}`);
    }
    await page.keyboard.press('Escape');
    const card = page.locator('#release-gpt-6-2-astra');
    await expect(card.locator('.card-title')).toHaveText('GPT-6.2 Astra / Sol');
    await expect(page.locator('.release-card#release-gpt-6-2-sol')).toHaveCount(0);
    const scopes = await card.locator('.fact-chip').evaluateAll(chips => chips.map(chip => chip.querySelector('.fact-model')?.textContent));
    expect(scopes.length).toBeGreaterThan(0);
    expect(scopes.every(scope => /astra/i.test(scope))).toBe(true);
    await card.locator('[data-detail-section="history"]').click();
    await expect(page.locator('#history-title')).toBeFocused();
    await expect(child).not.toHaveAttribute('open');
    await page.goto(`${path}#release-transformer`);
    await expect(page.locator('#dialog-title')).toContainText('Transformer');
    await page.locator('[data-copy="transformer"]').click();
    expect(await page.evaluate(() => new URL(window.copiedEntry).pathname)).toBe(route(language, 'technology.html'));
  });

  test(`${language}: historical search results and saved Explore positions open the matching release`, async ({ page }) => {
    await page.goto(route(language, 'about.html'));
    await page.locator('#search-toggle').click();
    await page.locator('#search').fill('FlashAttention‑4');
    const childKey = 'technology:flashattention-4';
    const result = page.locator(`#search-results [data-open-entry="${childKey}"]`);
    await expect(result).toContainText('FlashAttention-4');
    await result.click();
    await expect(page.locator('#history-flashattention-4 summary')).toBeFocused();
    await page.keyboard.press('Escape');
    await page.locator('#search-toggle').click();
    await page.locator('#search').press('Enter');
    const explore = route(language, 'explore.html');
    await expect(page).toHaveURL(url => url.pathname === explore && url.searchParams.get('at') === childKey);
    const card = page.locator('[data-entry-key="technology:flashattention"]');
    const child = card.locator(`[data-open-entry="${childKey}"]`);
    await expect(card).toHaveClass(/is-match/);
    await expect(child).toBeInViewport();
    await expect(page.locator(`[data-entry-key="${childKey}"]`)).toHaveCount(0);
    await page.goto(`${explore}?at=${encodeURIComponent(childKey)}`);
    await expect(child).toBeInViewport();
    await child.click();
    await expect(page.locator('#history-flashattention-4 summary')).toBeFocused();
    await page.goBack();
    await expect(page.locator('#detail-dialog')).not.toBeVisible();
    await page.goForward();
    await expect(page.locator('#history-flashattention-4 summary')).toBeFocused();
    await page.goto(`${explore}?at=models%3Atransformer`);
    await expect(page.locator('[data-entry-key="technology:transformer"]')).toBeInViewport();
  });

  test(`${language}: a saved organization filter and its search alias lead to the original entry`, async ({ page }) => {
    const file = route(language, 'agents.html');
    await page.goto(`${file}?companies=kilo`);
    await expect(page.locator('[data-company-filter="kilo"]')).toHaveCount(0);
    await expect(page.locator('[data-remove-filter="company:kilo"]')).toContainText('Kilo');
    await expect(page.locator('.release-card')).toHaveCount(1);
    const link = page.locator('#release-roo-code-3-2 [data-history-match]');
    await expect(link).toContainText('Kilo Code');
    expect(new URL(await link.evaluate(node => node.href)).pathname).toBe(file);
    await link.click();
    await expect(page.locator('#history-kilo-code summary')).toBeFocused();
    await page.keyboard.press('Escape');
    await page.locator('#search-toggle').click();
    await page.locator('#search').fill('Anaconda');
    await page.locator('#search-results [data-open-entry="agents:kilo-code"]').click();
    await expect(page.locator('#history-kilo-code .detail-overview')).toBeVisible();
  });
}
