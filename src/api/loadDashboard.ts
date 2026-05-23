import type { BirdDistributionRecord, DashboardData, NkLapwingRecord, UlsanEmergence } from './types';
import birdDistributionData from '../data/lapwing-distribution.json';
import lapwingEmergenceData from '../data/ulsan-lapwing-emergence.json';
import nkLapwingData from '../data/nk-lapwing-recent.json';

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

function buildStaticDashboard(
  birdDistribution: BirdDistributionRecord[],
  lapwingEmergence: UlsanEmergence[],
  nkLapwing: NkLapwingRecord[],
  warning?: string,
): DashboardData {
  const latestSurveyDate =
    nkLapwing
      .map((row) => row.exmnYmd)
      .filter(Boolean)
      .sort()
      .pop() ?? '';

  return {
    fetchedAt: new Date().toISOString(),
    source: 'static',
    warnings: warning ? [warning] : [],
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

export function getStaticDashboard(): DashboardData {
  return buildStaticDashboard(
    birdDistributionData as BirdDistributionRecord[],
    lapwingEmergenceData as UlsanEmergence[],
    nkLapwingData as NkLapwingRecord[],
    '로컬 데이터로 먼저 표시합니다. API에서 최신 정보를 불러오는 중…',
  );
}

async function fetchJsonFallback<T>(path: string): Promise<T> {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const response = await fetch(`${base}${path}`);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function loadStaticDashboard(): Promise<DashboardData> {
  try {
    return getStaticDashboard();
  } catch {
    const [birdDistribution, lapwingEmergence, nkLapwing] = await Promise.all([
      fetchJsonFallback<BirdDistributionRecord[]>('/data/lapwing-distribution.json'),
      fetchJsonFallback<UlsanEmergence[]>('/data/ulsan-lapwing-emergence.json'),
      fetchJsonFallback<NkLapwingRecord[]>('/data/nk-lapwing-recent.json'),
    ]);
    return buildStaticDashboard(
      birdDistribution,
      lapwingEmergence,
      nkLapwing,
      'API 서버 없이 로컬 데이터로 표시합니다.',
    );
  }
}

export async function loadDashboard(): Promise<DashboardData> {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}api/dashboard`, {
      signal: AbortSignal.timeout(20000),
    });

    if (response.ok) {
      return (await response.json()) as DashboardData;
    }
  } catch {
    // fall through to static data
  }

  return loadStaticDashboard();
}
