import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_DIR = join(__dirname, 'cache');
const CACHE_FILE = join(CACHE_DIR, 'dashboard.json');
const CACHE_TTL_MS = 60 * 60 * 1000;

export function readFileCache<T>(): { data: T; fetchedAt: string } | null {
  if (!existsSync(CACHE_FILE)) return null;
  try {
    const raw = JSON.parse(readFileSync(CACHE_FILE, 'utf8')) as {
      expires: number;
      data: T;
      fetchedAt: string;
    };
    if (raw.expires < Date.now()) return null;
    return { data: raw.data, fetchedAt: raw.fetchedAt };
  } catch {
    return null;
  }
}

export function writeFileCache<T>(data: T) {
  mkdirSync(CACHE_DIR, { recursive: true });
  writeFileSync(
    CACHE_FILE,
    JSON.stringify({ expires: Date.now() + CACHE_TTL_MS, data, fetchedAt: new Date().toISOString() }),
  );
}

export function readStaleFileCache<T>(): { data: T; fetchedAt: string } | null {
  if (!existsSync(CACHE_FILE)) return null;
  try {
    const raw = JSON.parse(readFileSync(CACHE_FILE, 'utf8')) as {
      data: T;
      fetchedAt: string;
    };
    return { data: raw.data, fetchedAt: raw.fetchedAt };
  } catch {
    return null;
  }
}

export function readPublicJson<T>(relativePath: string): T {
  const filePath = join(__dirname, '..', 'public', 'data', relativePath);
  return JSON.parse(readFileSync(filePath, 'utf8')) as T;
}
