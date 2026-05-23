import {
  readFileCache,
  writeFileCache,
  readStaleFileCache,
  readPublicJson,
} from './cache';

const ODCLOUD = {
  jejuSites: '15097059/v1/uddi:77f0883c-fe45-4c4d-a5ce-c1d40ac41d36',
  wetlandProtection: '3081530/v1/uddi:2d25e5d4-fc54-44c8-bca0-e740dea7d761_201909250900',
} as const;

function ensureArray<T>(value: T | T[] | undefined | null): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

async function fetchJson(url: string, timeoutMs = 15000) {
  const response = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${text.slice(0, 200)}`);
  }
  return JSON.parse(text) as unknown;
}

function ulsanUrl(serviceKey: string, endpoint: string, params: Record<string, string | number>) {
  const search = new URLSearchParams({
    serviceKey,
    type: 'json',
    pageNo: '1',
    numOfRows: '100',
    ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
  });
  return `https://apis.data.go.kr/6310000/UlsanMigrantAPI/${endpoint}?${search}`;
}

function odcloudUrl(serviceKey: string, path: string, page = 1, perPage = 100) {
  const search = new URLSearchParams({
    serviceKey,
    page: String(page),
    perPage: String(perPage),
  });
  return `https://api.odcloud.kr/api/${path}?${search}`;
}

function nkUrl(serviceKey: string, pageNo: number, numOfRows: number) {
  const search = new URLSearchParams({
    serviceKey,
    pageNo: String(pageNo),
    numOfRows: String(numOfRows),
    resultType: 'json',
  });
  return `https://apis.data.go.kr/6260000/NkBirdSurveyService/getNkBirdSurvey?${search}`;
}

function parseUlsanItems(payload: unknown) {
  const body = (payload as { body?: { items?: { item?: unknown } } })?.body;
  return ensureArray(body?.items?.item);
}

function parseOdcloudItems(payload: unknown) {
  return ensureArray((payload as { data?: unknown[] })?.data);
}

function parseNkItems(payload: unknown) {
  const body = (payload as { response?: { body?: { items?: { item?: unknown } } } })?.response?.body;
  return ensureArray(body?.items?.item);
}

function loadStaticFallback() {
  return {
    birdDistribution: readPublicJson<Record<string, string>[]>('lapwing-distribution.json'),
    lapwingEmergence: readPublicJson<Record<string, string | number>[]>('ulsan-lapwing-emergence.json'),
    nkLapwing: readPublicJson<Record<string, string>[]>('nk-lapwing-recent.json'),
  };
}

async function fetchNkRecentPage(serviceKey: string) {
  const first = await fetchJson(nkUrl(serviceKey, 1, 100));
  const totalCount = Number(
    (first as { response?: { body?: { totalCount?: string } } }).response?.body?.totalCount ?? 0,
  );
  const lastPage = Math.max(1, Math.ceil(totalCount / 100));
  const data = lastPage === 1 ? first : await fetchJson(nkUrl(serviceKey, lastPage, 100));
  return parseNkItems(data) as Record<string, string>[];
}

export type DashboardBundle = Awaited<ReturnType<typeof buildDashboardBundle>>;

async function buildDashboardBundle(serviceKey: string, useStaticSupplements: boolean) {
  const staticData = loadStaticFallback();
  const warnings: string[] = [];

  let migrants: unknown[] = [];
  let observatories: unknown[] = [];
  let jejuSites: unknown[] = [];
  let wetlands: unknown[] = [];
  let nkRecent: Record<string, string>[] = [];
  let lapwingMaster: unknown;
  let lapwingEmergence = staticData.lapwingEmergence;
  let birdDistribution = staticData.birdDistribution;
  let nkLapwing = staticData.nkLapwing;

  if (useStaticSupplements) {
    warnings.push('API 트래픽 절약을 위해 일부 데이터는 로컬 파일을 사용합니다.');
  }

  const liveTasks = await Promise.allSettled([
    fetchJson(ulsanUrl(serviceKey, 'migrant', { pageNo: 1, numOfRows: 200 })),
    fetchJson(ulsanUrl(serviceKey, 'observatorYear', { pageNo: 1, numOfRows: 200 })),
    fetchJson(odcloudUrl(serviceKey, ODCLOUD.jejuSites)),
    fetchJson(odcloudUrl(serviceKey, ODCLOUD.wetlandProtection)),
    fetchNkRecentPage(serviceKey),
    useStaticSupplements
      ? Promise.resolve(null)
      : fetchJson(ulsanUrl(serviceKey, 'emergeMonth', { pageNo: 1, numOfRows: 100 })),
  ]);

  const [migrantRes, obsRes, jejuRes, wetlandRes, nkRes, emergeRes] = liveTasks;

  if (migrantRes.status === 'fulfilled') {
    migrants = parseUlsanItems(migrantRes.value);
    lapwingMaster = migrants.find(
      (item) =>
        (item as { science_name?: string }).science_name === 'Vanellus vanellus' ||
        (item as { migrant_no?: string }).migrant_no === 'usmgt036',
    );
  } else {
    warnings.push('울산 철새 마스터 API 호출 실패');
  }

  if (obsRes.status === 'fulfilled') {
    observatories = parseUlsanItems(obsRes.value);
  } else {
    warnings.push('울산 관측 위치 API 호출 실패');
  }

  if (jejuRes.status === 'fulfilled') {
    jejuSites = parseOdcloudItems(jejuRes.value);
  } else {
    warnings.push('제주 철새도래지 API 호출 실패');
  }

  if (wetlandRes.status === 'fulfilled') {
    wetlands = parseOdcloudItems(wetlandRes.value);
  } else {
    warnings.push('습지보호지역 API 호출 실패');
  }

  if (nkRes.status === 'fulfilled') {
    nkRecent = nkRes.value;
  } else {
    warnings.push('낙동강하구 조류조사 API 호출 실패');
  }

  if (!useStaticSupplements && emergeRes.status === 'fulfilled' && emergeRes.value) {
    const monthItems = parseUlsanItems(emergeRes.value) as Record<string, string | number>[];
    const liveLapwing = monthItems.filter(
      (row) => row.migrant_no === 'usmgt036' || row.species_name === '댕기물떼새',
    );
    if (liveLapwing.length) lapwingEmergence = liveLapwing;
  }

  const speciesTotals: Record<string, number> = {};
  nkRecent.forEach((row) => {
    speciesTotals[row.speciesNm] = (speciesTotals[row.speciesNm] || 0) + (Number(row.indvdCnt) || 0);
  });

  const topSpecies = Object.entries(speciesTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({ name, count }));

  const latestSurveyDate = [
    ...nkRecent.map((row) => row.exmnYmd),
    ...nkLapwing.map((row) => row.exmnYmd),
  ]
    .filter(Boolean)
    .sort()
    .pop() ?? '';

  return {
    fetchedAt: new Date().toISOString(),
    source: warnings.length ? 'mixed' : 'live',
    warnings,
    lapwingMaster,
    lapwingEmergence,
    birdDistribution,
    nkLapwing,
    migrants,
    observatories,
    jejuSites,
    wetlands,
    stats: {
      nkSampleTotal: nkRecent.reduce((sum, row) => sum + (Number(row.indvdCnt) || 0), 0),
      nkSampleSize: nkRecent.length,
      latestSurveyDate,
      topSpecies,
      lapwingRecordCount: birdDistribution.length,
      lapwingUlsanObservations: lapwingEmergence.length,
      observatoryCount: observatories.length,
      wetlandSiteCount: wetlands.length,
    },
  };
}

function buildFromStaticOnly() {
  const staticData = loadStaticFallback();
  return {
    fetchedAt: new Date().toISOString(),
    source: 'static',
    warnings: ['공공 API를 사용할 수 없어 로컬 데이터로 표시합니다.'],
    lapwingMaster: {
      migrant_no: 'usmgt036',
      species_name: '댕기물떼새',
      science_name: 'Vanellus vanellus',
      species_name_eng: 'Northern Lapwing',
      habitat: '강 또는 강 하구, 하천 호수 등의 습지',
      breedingplace: '강, 하천 주변 풀밭 - 아시아북부',
      apperance: '뒷머리 깃이 위로 솟은 댕기가 특징인 겨울철새',
      feed: '곤충, 지렁이, 씨앗',
      classificationcode: '겨울철새',
      picture1:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Vanellus_vanellus_-_Northern_Lapwing.jpg/800px-Vanellus_vanellus_-_Northern_Lapwing.jpg',
      copyright1: 'Wikimedia Commons',
    },
    lapwingEmergence: staticData.lapwingEmergence,
    birdDistribution: staticData.birdDistribution,
    nkLapwing: staticData.nkLapwing,
    migrants: [],
    observatories: [],
    jejuSites: [],
    wetlands: [],
    stats: {
      nkSampleTotal: 0,
      nkSampleSize: 0,
      latestSurveyDate: staticData.nkLapwing[0]?.exmnYmd ?? '',
      topSpecies: [],
      lapwingRecordCount: staticData.birdDistribution.length,
      lapwingUlsanObservations: staticData.lapwingEmergence.length,
      observatoryCount: 0,
      wetlandSiteCount: 0,
    },
  };
}

export async function fetchDashboardBundle(serviceKey: string | undefined) {
  const cached = readFileCache<DashboardBundle>();
  if (cached) return { ...cached.data, fetchedAt: cached.fetchedAt, cacheHit: true };

  if (!serviceKey) {
    return buildFromStaticOnly();
  }

  try {
    const data = await buildDashboardBundle(serviceKey, true);
    writeFileCache(data);
    return data;
  } catch (error) {
    const stale = readStaleFileCache<DashboardBundle>();
    if (stale) {
      return {
        ...stale.data,
        fetchedAt: stale.fetchedAt,
        warnings: [
          ...(stale.data.warnings ?? []),
          `API 오류로 캐시 데이터 사용: ${String(error)}`,
        ],
        cacheHit: true,
      };
    }
    return {
      ...buildFromStaticOnly(),
      warnings: [String(error), '로컬 데이터로 대체 표시합니다.'],
    };
  }
}

function normalizeApiPath(url: string) {
  const path = (url.split('?')[0] ?? '').replace(/\/+$/, '') || '/';
  return path;
}

export function createApiHandler(serviceKey: string | undefined) {
  return async (
    req: { url?: string },
    res: {
      setHeader: (k: string, v: string) => void;
      statusCode: number;
      end: (body: string) => void;
    },
  ) => {
    const path = normalizeApiPath(req.url ?? '');

    if (path === '/api/dashboard') {
      try {
        const data = await fetchDashboardBundle(serviceKey);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Cache-Control', 'public, max-age=300');
        res.end(JSON.stringify(data));
      } catch (error) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.end(JSON.stringify(buildFromStaticOnly()));
      }
      return;
    }

    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'Not found' }));
  };
}
