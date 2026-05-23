import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const csvPath =
  process.argv[2] ??
  'C:/Users/d/Downloads/한국과학기술정보연구원_국내 조류분포_20211124.csv';
const outPath = join(__dirname, '..', 'public', 'data', 'lapwing-distribution.json');

const text = readFileSync(csvPath, 'utf8');
const lines = text.split(/\r?\n/);
const header = lines[0].split(',');
const col = (name) => header.indexOf(name);

function parseCsvLine(line) {
  const cols = [];
  let cur = '';
  let inQuotes = false;
  for (const ch of line) {
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === ',' && !inQuotes) {
      cols.push(cur);
      cur = '';
      continue;
    }
    cur += ch;
  }
  cols.push(cur);
  return cols;
}

const records = [];
for (let i = 1; i < lines.length; i += 1) {
  const line = lines[i];
  if (!line || !line.includes('Vanellus vanellus')) continue;
  const cols = parseCsvLine(line);
  records.push({
    '국명(원병오2000)': cols[col('국명(원병오2000)')],
    '학명(원병오2000)': cols[col('학명(원병오2000)')],
    '영문명(원병오2000)': cols[col('영문명(원병오2000)')],
    관찰개체수: cols[col('관찰개체수')],
    조사지역: cols[col('조사지역')],
    행정구역: cols[col('행정구역')],
    관찰시기: cols[col('관찰시기')],
  });
}

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, JSON.stringify(records, null, 2));
console.log(`Saved ${records.length} records to ${outPath}`);
