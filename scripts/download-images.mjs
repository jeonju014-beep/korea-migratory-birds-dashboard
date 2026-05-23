import { mkdirSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'images');
const UA = 'KoreaMigratoryBirdsDashboard/2.0 (github.com/jeonju014-beep; educational)';

const birds = [
  { file: 'lapwing.jpg', title: 'Vanellus vanellus - Northern Lapwing.jpg' },
  { file: 'white-naped-crane.jpg', title: 'Grus vipio 2.jpg' },
  { file: 'whooper-swan.jpg', title: 'Whooper Swans (Cygnus cygnus) on the ice at Uyeasound - geograph.org.uk - 676594.jpg' },
  { file: 'mallard.jpg', title: 'Anas platyrhynchos male female.jpg' },
  { file: 'spoonbill.jpg', title: 'Black-faced Spoonbill Platalea minor 1.jpg' },
  { file: 'bean-goose.jpg', title: 'Taiga bean goose (53347585277).jpg' },
];

mkdirSync(outDir, { recursive: true });

async function fetchJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

async function resolveImageUrl(title) {
  const api =
    'https://commons.wikimedia.org/w/api.php?action=query&titles=File:' +
    encodeURIComponent(title) +
    '&prop=imageinfo&iiprop=url|thumburl&iiurlwidth=800&format=json';
  const json = await fetchJson(api);
  const page = Object.values(json.query?.pages ?? {})[0];
  if (page?.missing) return null;
  return page.imageinfo?.[0]?.thumburl ?? page.imageinfo?.[0]?.url ?? null;
}

async function downloadFile(url, dest) {
  const res = await fetch(url, {
    headers: { 'User-Agent': UA, Accept: 'image/*' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8000) throw new Error(`too small (${buf.length} bytes)`);
  writeFileSync(dest, buf);
  return buf.length;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

for (const bird of birds) {
  const dest = join(outDir, bird.file);
  if (existsSync(dest) && statSync(dest).size > 8000) {
    console.log(`skip ${bird.file} (exists)`);
    continue;
  }

  try {
    const url = await resolveImageUrl(bird.title);
    if (!url) {
      console.error(`no url: ${bird.file}`);
      continue;
    }
    await sleep(2000);
    const size = await downloadFile(url, dest);
    console.log(`ok ${bird.file} (${size} bytes)`);
  } catch (error) {
    console.error(`fail ${bird.file}:`, error.message ?? error);
  }
}
