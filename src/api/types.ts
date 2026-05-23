export interface UlsanMigrant {
  migrant_no: string;
  species_name: string;
  science_name: string;
  species_name_eng: string;
  habitat: string;
  breedingplace: string;
  apperance: string;
  feed: string;
  classificationcode: string;
  picture1?: string | null;
  copyright1?: string | null;
}

export interface UlsanObservatory {
  observatory_year_no: string;
  year: number;
  observatory_no: string;
  observatory_year_name: string;
  latitude: number;
  longitude: number;
  remark?: string | null;
}

export interface UlsanEmergence {
  observation_month: string;
  observatory_year_no: string;
  observatory_year_name: string;
  migrant_no: string;
  species_name: string;
  migrant_population_sum: number;
  latitude: number;
  longitude: number;
}

export interface JejuSite {
  연번: number;
  시군구명: string;
  도래지명: string;
  장소: string;
  '공유수면_면적(만미터제곱)': string;
  '육상_면적(만미터제곱)': string;
  도래철새: string;
  위도: string;
  경도: string;
  데이터기준일자: string;
}

export interface WetlandSite {
  지역명: string;
  '위 치': string;
  면적: string;
  '특 징': string;
  '지정일자(람사르등록)': string;
}

export interface BirdDistributionRecord {
  '국명(원병오2000)': string;
  '학명(원병오2000)': string;
  '영문명(원병오2000)': string;
  관찰개체수: string;
  조사지역: string;
  행정구역: string;
  관찰시기: string;
}

export interface NkLapwingRecord {
  exmnYmd: string;
  sareaNm: string;
  speciesNm: string;
  indvdCnt: string;
  spceCrdntCn?: string;
}

export interface DashboardStats {
  nkSampleTotal: number;
  nkSampleSize: number;
  latestSurveyDate: string;
  topSpecies: { name: string; count: number }[];
  lapwingRecordCount: number;
  lapwingUlsanObservations: number;
  observatoryCount: number;
  wetlandSiteCount: number;
}

export interface DashboardData {
  fetchedAt: string;
  source?: string;
  warnings?: string[];
  cacheHit?: boolean;
  lapwingMaster?: UlsanMigrant;
  lapwingEmergence: UlsanEmergence[];
  birdDistribution: BirdDistributionRecord[];
  nkLapwing: NkLapwingRecord[];
  migrants: UlsanMigrant[];
  observatories: UlsanObservatory[];
  jejuSites: JejuSite[];
  wetlands: WetlandSite[];
  stats: DashboardStats;
}

export interface MapSite {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  species: string[];
  note?: string;
  source: string;
  isLapwing?: boolean;
}

export interface HabitatPoint {
  name: string;
  lat: number;
  lng: number;
  note?: string;
  count?: number;
  date?: string;
  source: string;
}
