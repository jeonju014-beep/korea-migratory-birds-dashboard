export interface MapPoint {
  name: string;
  lat: number;
  lng: number;
  note?: string;
  type: 'habitat' | 'breeding' | 'wintering' | 'stopover';
}

export const lapwingInfo = {
  koreanName: '댕기머리물떼새',
  englishName: 'Northern Lapwing',
  scientificName: 'Vanellus vanellus',
  family: '도요목 · 물떼새과',
  length: '28–31 cm',
  status: '흔한 겨울철새 (서식지 감소로 관찰 지역 축소 추세)',
  season: '10월 하순 – 이듬해 3월 (중부 이남)',
  habitat: '논, 저수지, 하천·강 하구 삼각주, 간척지, 습지, 농경지',
  behavior: '작은 무리를 이루며 지면을 두드려 곤충·지렁이 등을 찾아 먹음',
  breeding: '유라시아 북부 초원·농경지 (한국에서는 드물게 번식 기록)',
  image: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Vanellus_vanellus_-_Northern_Lapwing.jpg/800px-Vanellus_vanellus_-_Northern_Lapwing.jpg',
    credit: 'Wikimedia Commons · CC BY-SA 2.0',
    alt: '댕기머리물떼새(Northern Lapwing) — 검은 머리와 녹색 금속광, 뒤로 솟은 댕기 깃이 특징',
  },
  sources: [
    '국립생물자원관 한반도의 생물다양성',
    '강원 철원 디지털문화대전',
    'BirdLife International / BirdForum',
  ],
};

/** 국내 주요 관찰·월동 서식지 (국립생물자원관·지역 기록 기반) */
export const lapwingHabitats: MapPoint[] = [
  { name: '강원 철원·동송', lat: 38.2, lng: 127.22, note: '대표적 관찰 지역', type: 'habitat' },
  { name: '인천 영종도', lat: 37.49, lng: 126.49, note: 'NIBR 표본·관찰 기록', type: 'habitat' },
  { name: '충남 천수만', lat: 36.78, lng: 126.45, note: '습지·갯벌 인근', type: 'habitat' },
  { name: '전남 순천만', lat: 34.88, lng: 127.52, note: '남해안 습지', type: 'habitat' },
  { name: '경기 한강하구', lat: 37.55, lng: 126.62, note: '삼각주·논', type: 'habitat' },
  { name: '충남 금강하구', lat: 36.0, lng: 126.72, note: '하구 습지·농경지', type: 'habitat' },
  { name: '경남 낙동강 하구', lat: 35.09, lng: 128.82, note: '하구·간척지', type: 'habitat' },
  { name: '인천 강화', lat: 37.62, lng: 126.48, note: '연안 습지', type: 'habitat' },
  { name: '전북 새만금', lat: 35.82, lng: 126.55, note: '간척지·농경지', type: 'habitat' },
  { name: '경기 평택', lat: 36.99, lng: 127.11, note: '논·저수지', type: 'habitat' },
];

/** 대략적 이동 경로 (번식지 → 중간 휴식 → 월동지) */
export const migrationRoute: MapPoint[] = [
  { name: '서·북유럽 번식지', lat: 55.0, lng: 10.0, note: '영국·네덜란드·스칸디나비아', type: 'breeding' },
  { name: '동유럽·서부 시베리아', lat: 55.0, lng: 40.0, note: '러시아 서부·카자흐스탄', type: 'breeding' },
  { name: '몽골·만주 번식지', lat: 48.0, lng: 105.0, note: '몽골·헤이룽장 북부', type: 'breeding' },
  { name: '중국 동북부 (통과)', lat: 43.0, lng: 125.0, note: '가을·봄 이동 통로', type: 'stopover' },
  { name: '한반도 (월동)', lat: 37.0, lng: 127.5, note: '10월–3월 월동', type: 'wintering' },
  { name: '일본 서부 (월동)', lat: 35.0, lng: 133.0, note: '규슈·본州 서부', type: 'wintering' },
  { name: '중국 화동 (월동)', lat: 31.0, lng: 121.0, note: '양쯔강 하류 일대', type: 'wintering' },
];

export const migrationPath: [number, number][] = [
  [55.0, 10.0],
  [55.0, 25.0],
  [55.0, 40.0],
  [50.0, 70.0],
  [48.0, 90.0],
  [48.0, 105.0],
  [45.0, 115.0],
  [43.0, 125.0],
  [40.0, 127.0],
  [37.0, 127.5],
];

export const returnPath: [number, number][] = [
  [37.0, 127.5],
  [40.0, 125.0],
  [43.0, 120.0],
  [48.0, 105.0],
  [52.0, 60.0],
  [55.0, 25.0],
  [55.0, 10.0],
];
