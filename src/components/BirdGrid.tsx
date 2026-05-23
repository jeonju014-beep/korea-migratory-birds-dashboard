import type { DashboardData } from '../api/types';
import type { UlsanMigrant } from '../api/types';
import { formatNumber } from '../api/transform';

interface BirdCard {
  id: string;
  koreanName: string;
  englishName: string;
  scientificName: string;
  category: string;
  description: string;
  image?: string;
  count?: number;
  isLapwing?: boolean;
}

interface BirdGridProps {
  data: DashboardData;
}

function buildBirdCards(data: DashboardData): BirdCard[] {
  const lapwing = data.lapwingMaster as UlsanMigrant | undefined;
  const cards: BirdCard[] = [];

  if (lapwing) {
    cards.push({
      id: 'lapwing',
      koreanName: lapwing.species_name,
      englishName: lapwing.species_name_eng,
      scientificName: lapwing.science_name,
      category: lapwing.classificationcode,
      description: `${lapwing.habitat}. ${lapwing.feed}을 주로 먹어요.`,
      image: lapwing.picture1 ?? undefined,
      isLapwing: true,
    });
  }

  const winterMigrants = (data.migrants as UlsanMigrant[])
    .filter((bird) => bird.classificationcode === '겨울철새' && bird.migrant_no !== 'usmgt036')
    .slice(0, 3);

  winterMigrants.forEach((bird) => {
    cards.push({
      id: bird.migrant_no,
      koreanName: bird.species_name,
      englishName: bird.species_name_eng,
      scientificName: bird.science_name,
      category: bird.classificationcode,
      description: bird.habitat,
              image: bird.picture1?.replace(/^http:\/\//, 'https://') ?? undefined,
    });
  });

  data.stats.topSpecies.slice(0, 5).forEach((species, index) => {
    if (cards.some((c) => c.koreanName === species.name)) return;
    cards.push({
      id: `nk-${index}-${species.name}`,
      koreanName: species.name,
      englishName: species.name,
      scientificName: '—',
      category: '낙동강하구 조사',
      description: `낙동강하구 생태계모니터링 최근 표본에서 ${formatNumber(species.count)}마리 관찰`,
      count: species.count,
    });
  });

  return cards.slice(0, 6);
}

export default function BirdGrid({ data }: BirdGridProps) {
  const birds = buildBirdCards(data);

  return (
    <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {birds.map((bird) => (
        <article
          key={bird.id}
          className={`cute-card group overflow-hidden transition hover:-translate-y-1 hover:shadow-card ${
            bird.isLapwing
              ? 'ring-2 ring-blush-300 ring-offset-2 ring-offset-blush-50'
              : ''
          }`}
        >
          {bird.image ? (
            <div className="relative h-40 overflow-hidden">
              <img
                src={bird.image}
                alt={bird.koreanName}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blush-600/20 to-transparent" />
              {bird.isLapwing && (
                <span className="absolute left-3 top-3 cute-badge bg-blush-400 font-display text-white shadow-soft">
                  💕 my favorite
                </span>
              )}
            </div>
          ) : (
            <div className="flex h-28 items-center justify-center bg-gradient-to-br from-lilac-50 to-blush-50 text-4xl">
              🐦
            </div>
          )}
          <div className="p-5">
            <div>
              <h3 className="font-display text-lg text-blush-600">{bird.koreanName}</h3>
              <p className="text-sm text-blush-300">{bird.englishName}</p>
              <p className="text-xs italic text-blush-200">{bird.scientificName}</p>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-blush-400">{bird.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="cute-badge bg-blush-50 text-blush-400">{bird.category}</span>
              {bird.count != null && (
                <span className="cute-badge bg-lilac-50 text-lilac-400">
                  {formatNumber(bird.count)}마리
                </span>
              )}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
