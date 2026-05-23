const base = import.meta.env.BASE_URL;

/** 로컬 public/images/ — Wikimedia 외부 링크 차단 대비 */
export const birdImages = {
  lapwing: `${base}images/lapwing.jpg`,
  'white-naped-crane': `${base}images/white-naped-crane.jpg`,
  'whooper-swan': `${base}images/whooper-swan.jpg`,
  'bean-goose': `${base}images/bean-goose.jpg`,
  mallard: `${base}images/mallard.jpg`,
  spoonbill: `${base}images/spoonbill.jpg`,
} as const;

export const birdImageCredits: Record<keyof typeof birdImages, string> = {
  lapwing: 'Wikimedia Commons · CC BY-SA 2.0',
  'white-naped-crane': 'Wikimedia Commons · CC BY-SA 2.0',
  'whooper-swan': 'Wikimedia Commons · CC BY 2.0',
  'bean-goose': 'Wikimedia Commons · CC BY 2.0',
  mallard: 'Wikimedia Commons · CC BY-SA 2.0',
  spoonbill: 'Wikimedia Commons · CC BY-SA 2.0',
};
