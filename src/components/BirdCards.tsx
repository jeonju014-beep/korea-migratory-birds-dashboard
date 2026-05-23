import { featuredBirds } from '../data/birds';
import { trendColor } from './StatsOverview';
import BirdImage from './BirdImage';

export default function BirdCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {featuredBirds.map((bird) => (
        <article
          key={bird.id}
          className={`glass-card group overflow-hidden transition hover:-translate-y-1 hover:shadow-card ${
            bird.id === 'lapwing' ? 'ring-2 ring-blush-300 ring-offset-2 ring-offset-blush-50' : ''
          }`}
        >
          <div className="relative h-40 overflow-hidden">
            <BirdImage
              src={bird.image ?? ''}
              alt={bird.koreanName}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blush-600/25 to-transparent pointer-events-none" />
            {bird.id === 'lapwing' && (
              <span className="absolute left-3 top-3 cute-badge bg-blush-400 font-display text-white shadow-soft">
                💕 my favorite
              </span>
            )}
          </div>
          <div className="p-5">
            <h3 className="font-display text-lg text-blush-600">{bird.koreanName}</h3>
            <p className="text-sm text-blush-300">{bird.englishName}</p>
            <p className="text-xs italic text-blush-200">{bird.scientificName}</p>
            <p className="mt-3 text-sm leading-relaxed text-blush-400">{bird.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="cute-badge bg-blush-50 text-blush-400">{bird.category}</span>
              {bird.trend && (
                <span className={`cute-badge ${trendColor[bird.trend]}`}>추세 {bird.trend}</span>
              )}
              {bird.count2025 && (
                <span className="cute-badge bg-lilac-50 text-lilac-400">{bird.count2025}마리</span>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
