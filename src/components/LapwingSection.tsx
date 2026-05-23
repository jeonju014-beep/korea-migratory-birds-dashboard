import { lapwingInfo } from '../data/lapwing';
import HabitatMap from './HabitatMap';
import MigrationMap from './MigrationMap';
import BirdImage from './BirdImage';

export default function LapwingSection() {
  const facts = [
    { emoji: '🏷️', label: '분류', value: lapwingInfo.family },
    { emoji: '📏', label: '체장', value: lapwingInfo.length },
    { emoji: '🗓️', label: '한국 체류', value: lapwingInfo.season },
    { emoji: '🌿', label: '서식지', value: lapwingInfo.habitat },
    { emoji: '🪺', label: '번식지', value: lapwingInfo.breeding },
    { emoji: '🍽️', label: '행동', value: lapwingInfo.behavior },
  ];

  return (
    <section
      id="lapwing"
      className="glass-card overflow-hidden bg-gradient-to-br from-white via-blush-50/80 to-lilac-50/60 shadow-glow"
    >
      <div className="relative border-b border-blush-100/80 bg-gradient-to-r from-blush-100/60 via-lilac-100/40 to-blush-100/60 px-6 py-6 sm:px-8">
        <div className="absolute right-6 top-4 text-2xl opacity-60">💖</div>
        <span className="cute-badge bg-white/80 font-display text-blush-500 shadow-soft">
          ✨ my bias bird
        </span>
        <h2 className="mt-3 font-display text-3xl text-blush-600 sm:text-4xl">
          {lapwingInfo.koreanName}
        </h2>
        <p className="mt-1 text-lg text-lilac-400">{lapwingInfo.englishName}</p>
        <p className="text-sm italic text-blush-300">{lapwingInfo.scientificName}</p>
        <p className="mt-3 inline-block rounded-full bg-white/70 px-3 py-1 text-xs text-blush-500">
          {lapwingInfo.status}
        </p>
      </div>

      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-3xl border-4 border-white bg-white p-2 shadow-card">
            <BirdImage
              src={lapwingInfo.image.url}
              alt={lapwingInfo.image.alt}
              className="aspect-[4/3] w-full rounded-2xl object-cover"
              fallbackEmoji="🪶"
            />
            <p className="px-2 py-2 text-center text-xs text-blush-300">
              📷 {lapwingInfo.image.credit}
            </p>
          </div>

          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl bg-white/80 p-4 shadow-soft ring-1 ring-blush-100"
              >
                <dt className="flex items-center gap-1.5 text-xs font-medium text-lilac-400">
                  <span>{fact.emoji}</span> {fact.label}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-blush-600">{fact.value}</dd>
              </div>
            ))}
          </dl>
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
              논·습지·하구·간척지 등에서 월동해요. 핑크 마커가 국내 주요 서식지예요.
            </p>
            <HabitatMap />
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
                Autumn migration
              </span>
              <span className="cute-badge bg-lilac-50">
                <span className="inline-block h-0.5 w-5 border-t-2 border-dashed border-lilac-400" />
                Spring migration
              </span>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-blush-100/80 bg-white/40 px-6 py-4 text-xs text-blush-300 sm:px-8">
        📚 출처: {lapwingInfo.sources.join(' · ')}
      </footer>
    </section>
  );
}
