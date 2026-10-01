import seo from '../src/seo.js';
import { renderPage, renderSitemap, renderRobots } from './seo.mjs';
import { mkdir, copyFile, readFile, writeFile, readdir, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const root = new URL('../', import.meta.url);
const sourceRoot = new URL('src/', root);
const output = new URL('dist/', root);
const pages = ['index.html', 'agents.html', 'hardware.html', 'technology.html', 'about.html', 'explore.html'];
const assets = ['seo.js', 'catalog.js', 'details.js', 'workspace.js', 'explore.js', 'workspace.css', 'explore.css', 'styles.css', 'site.js', 'app.js', 'filters.js', 'icons.js', 'data.js', 'data-en.js', 'data-agents.js', 'data-hardware.js', 'data-technology.js', 'data-access.js', 'data-specs.js', 'data-prices.js', 'data-scores.js', 'data-model-types.js', 'favicon.svg', 'assets/noto-sans-sc.css', 'assets/OFL.txt', 'assets/FONT-NOTICE.md'];
for (const name of (await readdir(new URL('assets/icons/', sourceRoot))).sort()) {
  if (/^[a-zA-Z0-9.-]+\.(svg|png|jpg|ico|txt|md)$/.test(name)) assets.push(`assets/icons/${name}`);
}
await rm(output, { recursive: true, force: true });
await mkdir(new URL('assets/icons/', output), { recursive: true });
await mkdir(new URL('en/', output), { recursive: true });
const origin = process.env.BASE_URL || 'https://ai.taifua.com';
const versions = new Map();
for (const file of assets) {
  const body = await readFile(new URL(file, sourceRoot));
  versions.set(file, createHash('sha256').update(body).digest('hex').slice(0, 12));
  await copyFile(new URL(file, sourceRoot), new URL(file, output));
}
// Static servers may cache scripts and styles. New content gets a new asset URL.
for (const page of pages) for (const language of ['zh', 'en']) {
  const source = await readFile(new URL(page, sourceRoot), 'utf8');
  const localized = renderPage(source, { page: page === 'index.html' ? 'models' : page.replace('.html', ''), language, origin, seo });
  const html = localized.replace(/\b(src|href)="([^"?#]+\.(?:js|css|svg))"/g, (match, attribute, file) => {
    if (!versions.has(file)) throw new Error(`Unbundled asset in ${page}: ${file}`);
    return `${attribute}="${file}?v=${versions.get(file)}"`;
  });
  await writeFile(new URL((language === 'en' ? 'en/' : '') + page, output), html);
}
await writeFile(new URL('sitemap.xml', output), renderSitemap(origin));
await writeFile(new URL('robots.txt', output), renderRobots(origin));
console.log(`Built ${pages.length * 2} pages and ${assets.length} local assets into dist/.`);
