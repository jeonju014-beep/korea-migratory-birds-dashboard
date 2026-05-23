import { createServer as createHttpServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from 'dotenv';
import { createApiHandler } from './apiProxy';

config();

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const publicDir = join(__dirname, '..', 'public');
const serviceKey = process.env.DATA_GO_KR_SERVICE_KEY;
const apiHandler = createApiHandler(serviceKey);

const mime: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

const port = Number(process.env.PORT) || 4173;
const host = process.env.HOST || '127.0.0.1';

function getPathname(url: string) {
  const raw = decodeURIComponent(url.split('?')[0].split('#')[0] || '/');
  return raw.startsWith('/') ? raw : `/${raw}`;
}

function resolveStaticFile(pathname: string) {
  const relativePath = pathname.replace(/^\/+/, '');
  if (!relativePath || relativePath.includes('..')) return null;

  for (const root of [distDir, publicDir]) {
    const filePath = normalize(join(root, relativePath));
    if (!filePath.startsWith(normalize(root))) continue;
    if (!existsSync(filePath)) continue;
    if (!statSync(filePath).isFile()) continue;
    return filePath;
  }

  return null;
}

if (!existsSync(join(distDir, 'index.html'))) {
  console.error('\n❌ dist/index.html 이 없습니다. 먼저 빌드해 주세요:\n');
  console.error('   npm run build\n');
  process.exit(1);
}

createHttpServer((req, res) => {
  const pathname = getPathname(req.url ?? '/');

  if (pathname.startsWith('/api/')) {
    void apiHandler({ ...req, url: pathname }, res);
    return;
  }

  const staticFile = resolveStaticFile(pathname);
  if (staticFile) {
    const body = readFileSync(staticFile);
    res.statusCode = 200;
    res.setHeader('Content-Type', mime[extname(staticFile)] ?? 'application/octet-stream');
    res.end(body);
    return;
  }

  const indexHtml = join(distDir, 'index.html');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(readFileSync(indexHtml));
}).listen(port, host, () => {
  console.log(`\n✅ 서버 실행 중:`);
  console.log(`   http://127.0.0.1:${port}`);
  console.log(`   http://localhost:${port}\n`);
});
