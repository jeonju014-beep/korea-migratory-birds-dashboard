import { createServer as createHttpServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from 'dotenv';
import { createApiHandler } from './apiProxy';

config();

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const serviceKey = process.env.DATA_GO_KR_SERVICE_KEY;
const apiHandler = createApiHandler(serviceKey);

const mime: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
};

const port = Number(process.env.PORT) || 4173;

createHttpServer((req, res) => {
  const url = req.url ?? '/';

  if (url.startsWith('/api/')) {
    void apiHandler(req, res);
    return;
  }

  const filePath = join(distDir, url === '/' ? 'index.html' : url);
  if (existsSync(filePath) && extname(filePath)) {
    const body = readFileSync(filePath);
    res.statusCode = 200;
    res.setHeader('Content-Type', mime[extname(filePath)] ?? 'application/octet-stream');
    res.end(body);
    return;
  }

  const indexHtml = join(distDir, 'index.html');
  if (existsSync(indexHtml)) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(readFileSync(indexHtml));
    return;
  }

  res.statusCode = 404;
  res.end('Not found');
}).listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
