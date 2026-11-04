import { test, expect } from '@playwright/test';

const route = (language, file = 'benchmarks.html') => `${language === 'en' ? '/en/' : '/'}${file}`;
const noOverflow = async page => expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
const destinations = {
  'benchmark-artificial-analysis': 'https://artificialanalysis.ai/leaderboards/models',
  'benchmark-arena-text': 'https://arena.ai/leaderboard/chat/text',
  'benchmark-livebench': 'https://livebench.ai/',
  'benchmark-swe-bench': 'https://www.swebench.com/',
  'benchmark-terminal-bench': 'https://www.tbench.ai/',
  'benchmark-osworld': 'https://osworld-v2.xlang.ai/',
  'benchmark-arena-agent': 'https://arena.ai/leaderboard/agent',
};
const checkTitleLinks = async page => {
  await expect(page.locator('article.benchmark-card h3 a[href]')).toHaveCount(7);
  for (const [id, href] of Object.entries(destinations)) {
    const title = page.locator(`#${id} h3 a`);
    await expect(title).toHaveAttribute('href', href);
    await expect(title).toHaveAttribute('target', '_blank');
    expect((await title.getAttribute('rel')).split(/\s+/)).toEqual(expect.arrayContaining(['noopener', 'noreferrer']));
  }
};

const ready = async (page, path) => {
  await page.goto(path);
  await expect(page.locator('#page-title')).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
};

// Navigation and anchors exercise actual destinations, including English <base> handling.
test('the benchmark directory is reachable at phone, tablet and desktop widths and preserves its language and anchor', async ({ page, isMobile }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const language of ['zh', 'en']) {
    for (const width of isMobile ? [320, 390] : [900, 1024, 1165, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await ready(page, route(language, 'about.html'));
      await noOverflow(page);
      const menu = page.locator('#menu-toggle');
      if (await menu.isVisible()) {
        await menu.click();
        await expect(menu).toHaveAttribute('aria-expanded', 'true');
      }
      const link = page.locator('.header-nav a').filter({ hasText: language === 'en' ? 'Benchmarks' : '评测' });
      await expect(link).toBeVisible();
      await link.click();
      await expect(page).toHaveURL(url => url.pathname === route(language));
      await expect(page.locator('.header-nav a[aria-current="page"]')).toHaveText(language === 'en' ? 'Benchmarks' : '评测');
      await expect(page.locator('article.benchmark-card')).toHaveCount(7);
      await noOverflow(page);
    }
    await checkTitleLinks(page);
    await page.locator('#page-title').focus();
    const visited = new Set();
    for (let step = 0; step < 28 && visited.size < 7; step += 1) {
      await page.keyboard.press('Tab');
      const id = await page.evaluate(() => document.activeElement.matches('article.benchmark-card h3 a') ? document.activeElement.closest('article').id : null);
      if (id) visited.add(id);
    }
    expect([...visited].sort(), 'Each official leaderboard title is reachable with Tab').toEqual(Object.keys(destinations).sort());
    await ready(page, route(language) + '#agent-benchmarks');
    await expect(page).toHaveURL(url => url.pathname === route(language) && url.hash === '#agent-benchmarks');
    const next = language === 'en' ? 'zh' : 'en';
    const menu = page.locator('#menu-toggle');
    if (await menu.isVisible()) {
      await menu.click();
      await page.locator(`.mobile-language [data-language="${next}"]`).click();
    } else {
      await page.locator('#language-toggle').click();
      await page.locator(`#language-options [data-language="${next}"]`).click();
    }
    await expect(page).toHaveURL(url => url.pathname === route(next) && url.hash === '#agent-benchmarks');
    await expect(page.locator('html')).toHaveAttribute('lang', next === 'en' ? 'en' : 'zh-CN');
    await expect(page.locator('#agent-benchmarks')).toBeInViewport();
    await noOverflow(page);
  }
  expect(errors).toEqual([]);
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('benchmark titles, sources and group links remain accessible in both static editions', async ({ page }) => {
    for (const language of ['zh', 'en']) {
      await ready(page, route(language));
      const cards = page.locator('article.benchmark-card');
      await expect(cards).toHaveCount(7);
      await checkTitleLinks(page);
      const links = await cards.locator('a[href]').evaluateAll(elements => elements.map(link => ({ href: link.href, target: link.target, rel: link.rel })));
      expect(links.length).toBeGreaterThanOrEqual(7);
      for (const link of links) {
        expect(new URL(link.href).protocol).toBe('https:');
        expect(link.target).toBe('_blank');
        expect(link.rel.split(/\s+/)).toEqual(expect.arrayContaining(['noopener', 'noreferrer']));
      }
      if (language === 'en') {
        const copy = await page.locator('main').evaluate(element => {
          const content = element.cloneNode(true);
          content.querySelectorAll('a[lang="zh-CN"]').forEach(link => link.remove());
          return content.textContent;
        });
        expect(copy).not.toMatch(/[\u3400-\u9fff]/);
      }
      for (const id of ['model-benchmarks', 'coding-benchmarks', 'agent-benchmarks']) {
        await ready(page, route(language) + `#${id}`);
        await expect(page).toHaveURL(url => url.pathname === route(language) && url.hash === `#${id}`);
        await expect(page.locator(`#${id}`)).toBeInViewport();
        await noOverflow(page);
      }
    }
  });
});
