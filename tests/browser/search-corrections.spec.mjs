import { test, expect } from '@playwright/test';

const route = (language, file) => `${language === 'en' ? '/en/' : '/'}${file}`;

for (const language of ['zh', 'en']) {
  test(`${language}: exact search hits lead to the right event without reordering Explore`, async ({ page }) => {
    await page.goto(route(language, 'index.html'));
    await page.locator('#search-toggle').click();
    for (const [query, key] of [['BERT', 'models:bert'], ['Transformer', 'technology:transformer'], ['GPT 4', 'models:gpt-4'], ['gpt-4o-2024-08-06', 'models:gpt-4o']]) {
      await page.locator('#search').fill(query);
      await expect(page.locator('#search-results .search-result').first()).toHaveAttribute('data-open-entry', key);
    }
    await page.locator('#search').fill('BERT');
    await page.locator('#search').press('Enter');
    await expect(page).toHaveURL(url => url.pathname === route(language, 'explore.html') && url.searchParams.get('at') === 'models:bert');
    await expect(page.locator('[data-entry-key="models:bert"]')).toBeInViewport();
    const chronology = await page.locator('.journey-event').evaluateAll(nodes => nodes.map(node => window.ATLAS_CATALOG.get(node.dataset.entryKey).release.date));
    expect(chronology).toEqual([...chronology].sort().reverse());
    expect(chronology.length).toBe(await page.evaluate(() => window.ATLAS_CATALOG.events.length));
    await page.locator('#search-toggle').click();
    await page.locator('#search').fill('Transformer');
    await page.locator('#search').press('Enter');
    await expect(page).toHaveURL(url => url.searchParams.get('at') === 'technology:transformer');
    await expect(page.locator('[data-entry-key="technology:transformer"]')).toBeInViewport();
    expect(await page.locator('.journey-event').evaluateAll(nodes => nodes.map(node => window.ATLAS_CATALOG.get(node.dataset.entryKey).release.date))).toEqual(chronology);
  });

  test(`${language}: every timeline and Explore offer a passive correction draft with a canonical entry link`, async ({ page }) => {
    const externalRequests = [];
    page.on('request', request => { if (new URL(request.url()).hostname === 'github.com') externalRequests.push(request.url()); });
    for (const [file, key] of [
      ['index.html', 'models:bert'], ['agents.html', 'agents:claude-code'],
      ['hardware.html', 'hardware:nvidia-h100'], ['technology.html', 'technology:transformer'],
      ['explore.html', 'technology:transformer'],
    ]) {
      await page.goto(`${route(language, file)}#entry=${encodeURIComponent(key)}`);
      await expect(page.locator('#detail-dialog')).toBeVisible();
      const link = page.locator('.detail-correction a');
      await link.scrollIntoViewIfNeeded();
      await link.focus();
      await expect(link).toBeInViewport();
      await expect(link).toBeFocused();
      await expect(link).toHaveText(language === 'en' ? 'Report a correction' : '纠错');
      const url = new URL(await link.getAttribute('href'));
      expect(url.origin + url.pathname).toBe('https://github.com/taifuer/model-atlas/issues/new');
      expect(url.searchParams.get('template')).toBe('entry.md');
      expect(url.searchParams.get('body')).toContain(key);
      expect(url.searchParams.get('body')).toContain(`https://ai.taifua.com/${language === 'en' ? 'en/' : ''}`);
      expect(url.searchParams.get('body')).not.toContain('127.0.0.1');
      expect(await page.locator('#dialog-content').evaluate(node => node.scrollWidth - node.clientWidth)).toBeLessThanOrEqual(1);
      await page.keyboard.press('Escape');
      await expect(page.locator('#detail-dialog')).not.toBeVisible();
    }
    expect(externalRequests).toEqual([]);
  });
}
