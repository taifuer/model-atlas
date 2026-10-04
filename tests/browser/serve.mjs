/* Serve only the production build for browser tests; no runtime dependency. */
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../dist/', import.meta.url));
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2',
  '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
};

http.createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400).end(); return; }
  const file = resolve(root, `.${pathname.endsWith('/') ? pathname + 'index.html' : pathname}`);
  if (!file.startsWith(root.endsWith(sep) ? root : root + sep)) {
    response.writeHead(403).end();
    return;
  }
  try {
    const body = await readFile(file);
    response.writeHead(200, {
      'Content-Type': types[extname(file)] || 'application/octet-stream',
      'Content-Length': body.length,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch { response.writeHead(404).end(); }
}).listen(4173, '127.0.0.1', () => console.log('Browser test server: http://127.0.0.1:4173'));
