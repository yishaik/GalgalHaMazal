import http from 'http';
import { promises as fs } from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, 'docs');
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.pdf': 'application/pdf',
  '.csv': 'text/csv; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.jsx': 'text/plain; charset=utf-8'
};

function safeJoin(base, target) {
  const targetPath = path.join(base, target);
  if (!targetPath.startsWith(base)) throw new Error('Bad path');
  return targetPath;
}

const server = http.createServer(async (req, res) => {
  try {
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    let pathname = decodeURIComponent(reqUrl.pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';
    const filePath = safeJoin(ROOT, pathname);
    let stat;
    try { stat = await fs.stat(filePath); } catch { /* no-op */ }

    // If exact file not found, try without URL params and default to index.html
    let finalPath = filePath;
    if (!stat || !stat.isFile()) {
      const alt = safeJoin(ROOT, 'index.html');
      finalPath = alt;
    }

    const ext = path.extname(finalPath).toLowerCase();
    const ctype = types[ext] || 'application/octet-stream';
    const data = await fs.readFile(finalPath);
    res.writeHead(200, {
      'Content-Type': ctype,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Serving docs/ at http://localhost:${PORT}`);
});

