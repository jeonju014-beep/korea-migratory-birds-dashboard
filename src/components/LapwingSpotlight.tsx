import type { DashboardData, HabitatPoint, UlsanMigrant } from '../api/types';
import HabitatMap from './HabitatMap';
import MigrationMap from './MigrationMap';

interface LapwingSpotlightProps {
  data: DashboardData;
  habitats: HabitatPoint[];
}

export default function LapwingSpotlight({ data, habitats }: LapwingSpotlightProps) {
  const lapwing = data.lapwingMaster as UlsanMigrant | undefined;
  const recentNk = data.nkLapwing
    .slice()
    .sort((a, b) => b.exmnYmd.localeCompare(a.exmnYmd))
    .slice(0, 5);

  const distributionSummary = [...new Set(data.birdDistribution.map((r) => r.조사지역))].slice(0, 6);

  const facts = lapwing
    ? [
        { label: '분류', value: lapwing.classificationcode, emoji: '🏷️' },
        { label: '서식지', value: lapwing.habitat, emoji: '🌿' },
        { label: '번식지', value: lapwing.breedingplace, emoji: '🪺' },
        { label: '먹이', value: lapwing.feed, emoji: '🍽️' },
      ]
    : [];

  const imageUrl = (() => {
    const raw =
      lapwing?.picture1 ??
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Vanellus_vanellus_-_Northern_Lapwing.jpg/800px-Vanellus_vanellus_-_Northern_Lapwing.jpg';
    return raw.startsWith('http://') ? raw.replace('http://', 'https://') : raw;
  })();

  return (
    <section
      id="lapwing"
      className="cute-card overflow-hidden bg-gradient-to-br from-white via-blush-50/80 to-lilac-50/60 shadow-glow"
    >
      <div className="relative border-b border-blush-100/80 bg-gradient-to-r from-blush-100/60 via-lilac-100/40 to-blush-100/60 px-6 py-6 sm:px-8">
        <div className="absolute right-6 top-4 text-2xl opacity-60">💖</div>
        <span className="cute-badge bg-white/80 font-display text-blush-500 shadow-soft">
          ✨ my bias bird · API live
        </span>
        <h2 className="mt-3 font-display text-3xl text-blush-600 sm:text-4xl">
          {lapwing?.species_name ?? '댕기물떼새'}
        </h2>
        <p className="mt-1 text-lg text-lilac-400">
          {lapwing?.species_name_eng ?? 'Northern Lapwing'}
        </p>
        <p className="text-sm italic text-blush-300">
          {lapwing?.science_name ?? 'Vanellus vanellus'}
        </p>
      </div>

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-3xl border-4 border-white bg-white p-2 shadow-card">
            <img
              src={imageUrl}
              alt="댕기머리물떼새"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
            />
            <p className="px-2 py-2 text-center text-xs text-blush-300">
              📷 {lapwing?.copyright1 ?? '울산시청 / 국립생물자원관'}
            </p>
          </div>

          {lapwing?.apperance && (
            <p className="mt-5 line-clamp-4 leading-relaxed text-blush-500">{lapwing.apperance}</p>
          )}

          {recentNk.length > 0 && (
            <div className="mt-4 rounded-2xl bg-gradient-to-r from-blush-100 to-lilac-100 px-4 py-3 text-sm text-blush-600">
              🌊 낙동강하구 최근 관찰: {recentNk[0].sareaNm} · {recentNk[0].indvdCnt}마리 (
              {recentNk[0].exmnYmd.slice(0, 4)}.{recentNk[0].exmnYmd.slice(4, 6)}.
              {recentNk[0].exmnYmd.slice(6, 8)})
            </div>
          )}

          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl bg-white/80 p-4 shadow-soft ring-1 ring-blush-100"
              >
                <dt className="flex items-center gap-1.5 text-xs font-medium text-lilac-400">
                  <span>{fact.emoji}</span> {fact.label}
                </dt>
                <dd className="mt-1.5 text-sm text-blush-600">{fact.value}</dd>
              </div>
            ))}
          </dl>

          {distributionSummary.length > 0 && (
            <div className="mt-5 rounded-2xl bg-white/70 p-4 ring-1 ring-blush-100">
              <p className="text-xs font-medium text-lilac-400">KISTI 국내 조류분포 기록 지역</p>
              <p className="mt-2 text-sm text-blush-500">{distributionSummary.join(' · ')}</p>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="mb-3 flex items-center gap-2 font-display text-lg text-blush-600">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blush-100 text-base">
                📍
              </span>
              한국에서 어디에 살까?
            </h3>
            <p className="mb-3 text-sm text-blush-400">
              울산 태화강, 낙동강하구, 전국 문헌 기록을 API에서 불러왔어요.
            </p>
            <HabitatMap points={habitats} />
          </div>

          <div>
            <h3 className="mb-3 flex items-center gap-2 font-display text-lg text-lilac-500">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-lilac-100 text-base">
                ✈️
              </span>
              이동 경로 (여행 코스)
            </h3>
            <p className="mb-3 text-sm text-blush-400">
              유라시아 북부에서 태어나 가을에 날아와, 한반도에서 따뜻한 겨울을 보내요.
            </p>
            <MigrationMap />
            <div className="mt-3 flex flex-wrap gap-3 text-xs text-blush-400">
              <span className="cute-badge bg-blush-50">
                <span className="inline-block h-0.5 w-5 border-t-2 border-dashed border-blush-400" />
                가을 이동
              </span>
              <span className="cute-badge bg-lilac-50">
                <span className="inline-block h-0.5 w-5 border-t-2 border-dashed border-lilac-400" />
                봄 이동
              </span>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-blush-100/80 bg-white/40 px-6 py-4 text-xs text-blush-300 sm:px-8">
        📚 출처: 울산시 철새 API · 낙동강하구 조류조사 API · KISTI 국내 조류분포 API · 제주 철새도래지 API
        · {new Date(data.fetchedAt).toLocaleString('ko-KR')} 갱신
      </footer>
    </section>
  );
}
