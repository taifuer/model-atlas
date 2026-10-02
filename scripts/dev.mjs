import seo from '../src/seo.js';
import { renderPage, renderSitemap, renderRobots } from './seo.mjs';
import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat, readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const sourceRoot = new URL('../src/', import.meta.url);

const flag = (name, fallback) => {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
};
const port = Number(flag('--port', process.env.PORT || '5173'));
const host = flag('--host', '0.0.0.0');
const files = new Map([
  ['explore-periods.js', ['explore-periods.js', 'text/javascript']],
  ['seo.js', ['seo.js', 'text/javascript']],
  ['explore.html', ['explore.html', 'text/html']],
  ['catalog.js', ['catalog.js', 'text/javascript']],
  ['details.js', ['details.js', 'text/javascript']],
  ['workspace.js', ['workspace.js', 'text/javascript']],
  ['explore.js', ['explore.js', 'text/javascript']],
  ['workspace.css', ['workspace.css', 'text/css']],
  ['explore.css', ['explore.css', 'text/css']],
  ['/', ['index.html', 'text/html']], ['index.html', ['index.html', 'text/html']],
  ['agents.html', ['agents.html', 'text/html']], ['about.html', ['about.html', 'text/html']],
  ['hardware.html', ['hardware.html', 'text/html']], ['technology.html', ['technology.html', 'text/html']],
  ['data-hardware.js', ['data-hardware.js', 'text/javascript']], ['data-technology.js', ['data-technology.js', 'text/javascript']],
  ['site.js', ['site.js', 'text/javascript']], ['data-en.js', ['data-en.js', 'text/javascript']], ['data-agents.js', ['data-agents.js', 'text/javascript']],
  ['styles.css', ['styles.css', 'text/css']], ['app.js', ['app.js', 'text/javascript']],
  ['icons.js', ['icons.js', 'text/javascript']],
  ['data-scores.js', ['data-scores.js', 'text/javascript']],
  ['data-model-types.js', ['data-model-types.js', 'text/javascript']],
  ['data-access.js', ['data-access.js', 'text/javascript']], ['data-specs.js', ['data-specs.js', 'text/javascript']], ['data-prices.js', ['data-prices.js', 'text/javascript']], ['filters.js', ['filters.js', 'text/javascript']],
  ['data.js', ['data.js', 'text/javascript']], ['favicon.svg', ['favicon.svg', 'image/svg+xml']],
  ['assets/noto-sans-sc.css', ['assets/noto-sans-sc.css', 'text/css']],
]);
for (const name of await readdir(new URL('assets/icons/', sourceRoot))) {
  const extension = /^[a-z0-9-]+\.(svg|png|jpg|ico)$/.exec(name)?.[1];
  if (extension) files.set(`assets/icons/${name}`, [`assets/icons/${name}`, { svg: 'image/svg+xml', png: 'image/png', jpg: 'image/jpeg', ico: 'image/x-icon' }[extension]]);
}

const server = http.createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' });
    return res.end('Method not allowed');
  }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400); return res.end('Bad request'); }
  const origin = process.env.BASE_URL || 'https://ai.taifua.com';
  if (pathname === '/sitemap.xml' || pathname === '/robots.txt') {
    const body = pathname.endsWith('.xml') ? renderSitemap(origin) : renderRobots(origin);
    res.writeHead(200, { 'Content-Type': pathname.endsWith('.xml') ? 'application/xml; charset=utf-8' : 'text/plain; charset=utf-8' });
    return res.end(req.method === 'HEAD' ? undefined : body);
  }
  const english = pathname.startsWith('/en/');
  const localPath = english ? pathname.slice(3) : pathname;
  const entry = files.get(localPath === '/' ? '/' : localPath.slice(1));
  if (english && entry?.[1] !== 'text/html') { res.writeHead(404); return res.end('Not found'); }
  if (!entry) { res.writeHead(404); return res.end('Not found'); }
  const [name, mime] = entry;
  const path = fileURLToPath(new URL(name, sourceRoot));
  try {
    if (mime === 'text/html') {
      const source = await readFile(path, 'utf8');
      const body = renderPage(source, { page: name === 'index.html' ? 'models' : name.replace('.html', ''), language: english ? 'en' : 'zh', origin, seo });
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Content-Length': Buffer.byteLength(body), 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
      return res.end(req.method === 'HEAD' ? undefined : body);
    }
    const info = await stat(path);
    res.writeHead(200, { 'Content-Type': `${mime}; charset=utf-8`, 'Content-Length': info.size, 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' });
    if (req.method === 'HEAD') return res.end();
    const stream = createReadStream(path);
    stream.on('error', () => res.destroy());
    stream.pipe(res);
  } catch { res.writeHead(500); res.end('Unable to load asset'); }
});
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
server.listen(port, host, () => console.log(`Model Atlas is available at http://localhost:${server.address().port}`));
