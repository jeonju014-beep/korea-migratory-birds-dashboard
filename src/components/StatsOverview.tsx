import { censusSummary } from '../data/birds';

const trendColor = {
  증가: 'bg-mint-100 text-mint-400',
  감소: 'bg-blush-100 text-blush-500',
  유지: 'bg-lilac-100 text-lilac-500',
} as const;

export default function StatsOverview() {
  const cards = [
    {
      emoji: '🦆',
      label: '겨울철 조사 개체',
      value: censusSummary.totalBirds,
      note: censusSummary.season,
    },
    {
      emoji: '📍',
      label: '전국 조사 지점',
      value: `${censusSummary.surveySites}곳`,
      note: '습지·하구·호수',
    },
    {
      emoji: '📉',
      label: '전년 대비',
      value: censusSummary.changeFromLastYear,
      note: '동시센서스 기준',
    },
    {
      emoji: '👑',
      label: '가장 많이 본 새',
      value: censusSummary.topSpecies[0].name,
      note: '2024–2025 겨울',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="glass-card p-5 transition hover:-translate-y-0.5 hover:shadow-card">
            <span className="text-2xl">{card.emoji}</span>
            <p className="mt-2 text-xs font-medium text-lilac-400">{card.label}</p>
            <p className="mt-1 font-display text-xl text-blush-600">{card.value}</p>
            <p className="mt-1 text-xs text-blush-300">{card.note}</p>
          </div>
        ))}
      </div>

      <div className="glass-card p-5">
        <p className="text-sm font-medium text-blush-500">🏆 겨울철 주요 종 TOP 5</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {censusSummary.topSpecies.map((species, i) => (
            <span
              key={species.name}
              className={`cute-badge ${i === 0 ? 'bg-blush-400 text-white' : 'bg-white text-blush-500 ring-1 ring-blush-100'}`}
            >
              {i + 1}. {species.name}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-blush-300">{censusSummary.source}</p>
      </div>
    </div>
  );
}

export { trendColor };
