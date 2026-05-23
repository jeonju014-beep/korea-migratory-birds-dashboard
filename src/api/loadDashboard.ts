import type { BirdDistributionRecord, DashboardData, NkLapwingRecord, UlsanEmergence } from './types';

const LAPWING_MASTER = {
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
};

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function loadStaticDashboard(): Promise<DashboardData> {
  const [birdDistribution, lapwingEmergence, nkLapwing] = await Promise.all([
    fetchJson<BirdDistributionRecord[]>('/data/lapwing-distribution.json'),
    fetchJson<UlsanEmergence[]>('/data/ulsan-lapwing-emergence.json'),
    fetchJson<NkLapwingRecord[]>('/data/nk-lapwing-recent.json'),
  ]);

  const latestSurveyDate = nkLapwing
    .map((row) => row.exmnYmd)
    .filter(Boolean)
    .sort()
    .pop() ?? '';

  return {
    fetchedAt: new Date().toISOString(),
    source: 'static',
    warnings: ['API 서버 없이 로컬 데이터로 표시합니다.'],
    lapwingMaster: LAPWING_MASTER,
    lapwingEmergence,
    birdDistribution,
    nkLapwing,
    migrants: [],
    observatories: [],
    jejuSites: [],
    wetlands: [],
    stats: {
      nkSampleTotal: 0,
      nkSampleSize: 0,
      latestSurveyDate,
      topSpecies: [],
      lapwingRecordCount: birdDistribution.length,
      lapwingUlsanObservations: lapwingEmergence.length,
      observatoryCount: 0,
      wetlandSiteCount: 0,
    },
  };
}

export async function loadDashboard(): Promise<DashboardData> {
  try {
    const response = await fetch('/api/dashboard', {
      signal: AbortSignal.timeout(120000),
    });

    if (response.ok) {
      return (await response.json()) as DashboardData;
    }
  } catch {
    // fall through to static data
  }

  return loadStaticDashboard();
}
