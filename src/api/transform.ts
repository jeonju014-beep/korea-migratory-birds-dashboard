import type {
  BirdDistributionRecord,
  DashboardData,
  HabitatPoint,
  MapSite,
  NkLapwingRecord,
  UlsanEmergence,
  UlsanObservatory,
} from './types';

const REGION_COORDS: Record<string, { lat: number; lng: number }> = {
  '경상남도 창원시': { lat: 35.22, lng: 128.68 },
  '경상남도 창원시 동읍': { lat: 35.22, lng: 128.68 },
  '경상남도 창원군': { lat: 35.22, lng: 128.68 },
  '제주도 북제주군': { lat: 33.52, lng: 126.85 },
  '부산광역시': { lat: 35.09, lng: 128.82 },
  '충청남도': { lat: 36.5, lng: 126.8 },
  '강원도': { lat: 38.2, lng: 127.22 },
  '경기도': { lat: 37.2, lng: 127.05 },
};

function jitter(base: { lat: number; lng: number }, seed: number) {
  const angle = (seed * 47) % 360;
  const dist = ((seed * 13) % 10) / 100;
  return {
    lat: base.lat + Math.sin(angle) * dist,
    lng: base.lng + Math.cos(angle) * dist,
  };
}

export function resolveRegionCoords(region: string, seed = 0) {
  const matched = Object.entries(REGION_COORDS).find(([key]) => region.includes(key));
  if (matched) return jitter(matched[1], seed);
  return jitter({ lat: 36.5, lng: 127.8 }, seed);
}

export function parsePolygonCentroid(polygonText?: string): { lat: number; lng: number } | null {
  if (!polygonText) return null;
  const match = polygonText.match(/\(\(([^)]+)\)\)/);
  if (!match) return null;
  const pairs = match[1].split(',').map((p) => p.trim().split(/\s+/).map(Number));
  if (!pairs.length) return null;
  const [sumX, sumY] = pairs.reduce(([x, y], [px, py]) => [x + px, y + py], [0, 0]);
  const x = sumX / pairs.length;
  const y = sumY / pairs.length;
  const lat = 38 + (y - 200000) / 111000;
  const lng = 127 + (x - 200000) / (111000 * Math.cos((lat * Math.PI) / 180));
  return { lat, lng };
}

export function buildMapSites(data: DashboardData): MapSite[] {
  const sites: MapSite[] = [];
  const seen = new Set<string>();

  const latestObservatories = new Map<string, UlsanObservatory>();
  (data.observatories as UlsanObservatory[]).forEach((obs) => {
    const key = obs.observatory_no;
    const prev = latestObservatories.get(key);
    if (!prev || obs.year > prev.year) latestObservatories.set(key, obs);
  });

  latestObservatories.forEach((obs) => {
    sites.push({
      id: `ulsan-${obs.observatory_year_no}`,
      name: obs.observatory_year_name,
      region: '울산',
      lat: obs.latitude,
      lng: obs.longitude,
      species: ['태화강 철새'],
      source: '울산시 철새 API · observatorYear',
    });
    seen.add(`${obs.latitude.toFixed(3)},${obs.longitude.toFixed(3)}`);
  });

  data.jejuSites.forEach((site) => {
    const lat = Number(site.위도);
    const lng = Number(site.경도);
    if (!lat || !lng) return;
    const hasLapwing = site.도래철새.includes('물떼') || site.도래철새.includes('댕기');
    sites.push({
      id: `jeju-${site.연번}`,
      name: site.도래지명,
      region: `제주 ${site.시군구명}`,
      lat,
      lng,
      species: site.도래철새.split(/[.,+]/).map((s) => s.trim()).filter(Boolean),
      note: site.장소,
      source: '제주특별자치도 철새도래지 API',
      isLapwing: hasLapwing,
    });
  });

  data.wetlands.slice(0, 12).forEach((wetland, index) => {
    const coords = resolveRegionCoords(wetland['위 치'], index);
    sites.push({
      id: `wetland-${index}`,
      name: wetland.지역명,
      region: wetland['위 치'].split(' ').slice(0, 2).join(' '),
      lat: coords.lat,
      lng: coords.lng,
      species: [wetland['특 징']],
      note: `면적 ${wetland.면적}km² · ${wetland['지정일자(람사르등록)']}`,
      source: '전북특별자치도 습지보호지역 API',
    });
  });

  const nkAreas = new Map<string, NkLapwingRecord>();
  data.nkLapwing.forEach((row) => {
    const prev = nkAreas.get(row.sareaNm);
    if (!prev || row.exmnYmd > prev.exmnYmd) nkAreas.set(row.sareaNm, row);
  });

  nkAreas.forEach((row) => {
    const coords = parsePolygonCentroid(row.spceCrdntCn) ?? { lat: 35.09, lng: 128.82 };
    const key = `${coords.lat.toFixed(3)},${coords.lng.toFixed(3)}`;
    if (seen.has(key)) return;
    sites.push({
      id: `nk-${row.sareaNm}`,
      name: row.sareaNm,
      region: '부산 · 낙동강하구',
      lat: coords.lat,
      lng: coords.lng,
      species: ['댕기머리물떼새', `최근 ${row.indvdCnt}마리`],
      note: `조사일 ${row.exmnYmd}`,
      source: '낙동강하구 생태계모니터링 API',
      isLapwing: true,
    });
    seen.add(key);
  });

  return sites;
}

export function buildLapwingHabitats(data: DashboardData): HabitatPoint[] {
  const points: HabitatPoint[] = [];
  const grouped = new Map<string, UlsanEmergence>();

  data.lapwingEmergence.forEach((row) => {
    const key = `${row.observatory_year_name}-${row.latitude}-${row.longitude}`;
    const prev = grouped.get(key);
    if (!prev || row.observation_month > prev.observation_month) grouped.set(key, row);
  });

  grouped.forEach((row) => {
    points.push({
      name: row.observatory_year_name,
      lat: row.latitude,
      lng: row.longitude,
      count: Number(row.migrant_population_sum),
      date: row.observation_month,
      source: '울산시 철새 API · emergeMonth',
    });
  });

  const nkAreas = new Map<string, NkLapwingRecord>();
  data.nkLapwing.forEach((row) => {
    const prev = nkAreas.get(row.sareaNm);
    if (!prev || row.exmnYmd > prev.exmnYmd) nkAreas.set(row.sareaNm, row);
  });

  nkAreas.forEach((row) => {
    const coords = parsePolygonCentroid(row.spceCrdntCn);
    if (!coords) return;
    points.push({
      name: row.sareaNm,
      lat: coords.lat,
      lng: coords.lng,
      count: Number(row.indvdCnt),
      date: row.exmnYmd,
      note: '낙동강하구 조사 구역',
      source: '낙동강하구 생태계모니터링 API',
    });
  });

  const regionGroups = new Map<string, BirdDistributionRecord[]>();
  data.birdDistribution.forEach((row) => {
    const region = row.행정구역 || row.조사지역;
    if (!regionGroups.has(region)) regionGroups.set(region, []);
    regionGroups.get(region)!.push(row);
  });

  let seed = 0;
  regionGroups.forEach((records, region) => {
    const coords = resolveRegionCoords(region, seed);
    seed += 1;
    const maxCount = Math.max(...records.map((r) => Number(r.관찰개체수) || 0));
    points.push({
      name: records[0].조사지역,
      lat: coords.lat,
      lng: coords.lng,
      count: maxCount,
      note: region,
      date: (records[records.length - 1].관찰시기 ?? '').trim(),
      source: 'KISTI 국내 조류분포 (로컬/API)',
    });
  });

  return points;
}

export function formatSurveyDate(raw: string) {
  if (!raw || raw.length !== 8) return raw;
  return `${raw.slice(0, 4)}.${raw.slice(4, 6)}.${raw.slice(6, 8)}`;
}

export function formatNumber(n: number) {
  return n.toLocaleString('ko-KR');
}
