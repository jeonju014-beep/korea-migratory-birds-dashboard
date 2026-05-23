import type { DashboardStats } from '../api/types';
import { formatNumber, formatSurveyDate } from '../api/transform';

const statStyles = [
  { emoji: '📡', bg: 'from-blush-100 to-blush-50', accent: 'text-blush-500' },
  { emoji: '📍', bg: 'from-lilac-100 to-lilac-50', accent: 'text-lilac-500' },
  { emoji: '🦆', bg: 'from-mint-100 to-mint-100/50', accent: 'text-mint-400' },
  { emoji: '💕', bg: 'from-cream-200 to-cream-100', accent: 'text-blush-400' },
];

interface StatsOverviewProps {
  stats: DashboardStats;
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  const cards = [
    {
      label: '낙동강하구 최근 조사',
      value: stats.latestSurveyDate ? formatSurveyDate(stats.latestSurveyDate) : '—',
    },
    {
      label: '전국 관측·습지 지점',
      value: `${stats.observatoryCount + stats.wetlandSiteCount}곳`,
    },
    {
      label: '최근 표본 조류 수',
      value: `${formatNumber(stats.nkSampleTotal)}마리`,
    },
    {
      label: '댕기머리물떼새 기록',
      value: `${stats.lapwingRecordCount}건`,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((stat, i) => {
        const style = statStyles[i];
        return (
          <article
            key={stat.label}
            className={`cute-card bg-gradient-to-br ${style.bg} p-5 transition hover:-translate-y-1 hover:shadow-card`}
          >
            <div className="flex items-center justify-between">
              <p className={`text-sm font-medium ${style.accent}`}>{stat.label}</p>
              <span className="text-xl">{style.emoji}</span>
            </div>
            <p className="mt-3 font-display text-xl text-blush-600 sm:text-2xl">{stat.value}</p>
          </article>
        );
      })}
    </section>
  );
}
