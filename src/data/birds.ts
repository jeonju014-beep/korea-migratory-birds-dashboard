export interface BirdSite {
  name: string;
  region: string;
  lat: number;
  lng: number;
  species: string[];
  count?: string;
  season: string;
}

export interface BirdSpecies {
  id: string;
  koreanName: string;
  englishName: string;
  scientificName: string;
  category: '겨울철새' | '나그네새' | '여름철새';
  count2025?: string;
  trend?: '증가' | '감소' | '유지';
  description: string;
  image?: string;
}

export const censusSummary = {
  season: '2024–2025 겨울철',
  totalBirds: '약 151만 6,664마리',
  surveySites: 200,
  changeFromLastYear: '-5.1%',
  topSpecies: [
    { name: '가창오리', share: '최다' },
    { name: '쇠기러기', share: '2위' },
    { name: '청둥오리', share: '3위' },
    { name: '큰기러기', share: '4위' },
    { name: '흰뺨검둥오리', share: '5위' },
  ],
  source: '환경부 국립생물자원관 「2024–2025 겨울철 조류 동시센서스」',
};

export const majorSites: BirdSite[] = [
  {
    name: '순천만',
    region: '전남',
    lat: 34.88,
    lng: 127.52,
    species: ['흑두루미', '저어새', '큰고니', '도요물떼새', '댕기머리물떼새'],
    count: '람사르습지 · IBA',
    season: '10월–3월',
  },
  {
    name: '금강하구',
    region: '충남·전북',
    lat: 36.0,
    lng: 126.72,
    species: ['가창오리', '청둥오리', '큰기러기', '쇠기러기'],
    count: '15만+ (2025.1)',
    season: '11월–2월',
  },
  {
    name: '천수만',
    region: '충남',
    lat: 36.78,
    lng: 126.45,
    species: ['황새', '흑두루미', '저어새', '장다리물떼새', '댕기머리물떼새'],
    count: '국내 철새 종 50% 이상',
    season: '11월–2월',
  },
  {
    name: '한강하구',
    region: '경기·서울',
    lat: 37.55,
    lng: 126.62,
    species: ['큰기러기', '청둥오리', '도요류', '물떼새류'],
    season: '10월–3월',
  },
  {
    name: '낙동강 하구',
    region: '경남',
    lat: 35.09,
    lng: 128.82,
    species: ['가창오리', '큰기러기', '도요류'],
    season: '10월–3월',
  },
  {
    name: '강화·하구',
    region: '인천',
    lat: 37.62,
    lng: 126.48,
    species: ['저어새', '도요류', '물떼새류'],
    season: '10월–3월',
  },
  {
    name: '철원·동송',
    region: '강원',
    lat: 38.2,
    lng: 127.22,
    species: ['댕기머리물떼새', '큰기러기', '청둥오리'],
    count: '댕기머리물떼새 대표 서식지',
    season: '10월–3월',
  },
  {
    name: '영종도',
    region: '인천',
    lat: 37.49,
    lng: 126.49,
    species: ['댕기머리물떼새', '도요류'],
    season: '10월–3월',
  },
  {
    name: '우포늪',
    region: '경남',
    lat: 35.55,
    lng: 128.42,
    species: ['흑두루미', '큰기러기', '물떼새류'],
    season: '10월–3월',
  },
  {
    name: '간월호',
    region: '충남',
    lat: 36.78,
    lng: 127.08,
    species: ['가창오리', '청둥오리', '쇠기러기'],
    season: '11월–2월',
  },
];

export const featuredBirds: BirdSpecies[] = [
  {
    id: 'lapwing',
    koreanName: '댕기머리물떼새',
    englishName: 'Northern Lapwing',
    scientificName: 'Vanellus vanellus',
    category: '겨울철새',
    trend: '감소',
    description: '뒷머리 깃이 위로 솟은 댕기가 특징. 논·습지·하천 삼각주에서 작은 무리로 월동.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Vanellus_vanellus_-_Northern_Lapwing.jpg/640px-Vanellus_vanellus_-_Northern_Lapwing.jpg',
  },
  {
    id: 'white-naped-crane',
    koreanName: '재두루미',
    englishName: 'White-naped Crane',
    scientificName: 'Antigone vipio',
    category: '겨울철새',
    trend: '감소',
    description: '한강하구 등에서 겨울을 나는 대표적인 두루미류.',
  },
  {
    id: 'whooper-swan',
    koreanName: '큰고니',
    englishName: 'Whooper Swan',
    scientificName: 'Cygnus cygnus',
    category: '겨울철새',
    trend: '유지',
    description: '순천만·호수·하구 습지에서 대규모 무리 관찰.',
  },
  {
    id: 'bean-goose',
    koreanName: '큰기러기',
    englishName: 'Taiga Bean Goose',
    scientificName: 'Anser fabalis',
    category: '겨울철새',
    count2025: '약 36.5만',
    trend: '증가',
    description: '2024–2025 겨울철 기러기류 중 가장 많이 관찰된 종.',
  },
  {
    id: 'mallard',
    koreanName: '가창오리',
    englishName: 'Mallard',
    scientificName: 'Anas platyrhynchos',
    category: '겨울철새',
    trend: '유지',
    description: '금강호 등 특정 지역에 대규모로 밀집하는 겨울철새.',
  },
  {
    id: 'spoonbill',
    koreanName: '저어새',
    englishName: 'Black-faced Spoonbill',
    scientificName: 'Platalea minor',
    category: '겨울철새',
    trend: '유지',
    description: '멸종위기종. 서해안·남해안 습지의 대표적 상징.',
  },
];
