import StatsOverview from './components/StatsOverview';
import KoreaSiteMap from './components/KoreaSiteMap';
import BirdGrid from './components/BirdGrid';
import LapwingSpotlight from './components/LapwingSpotlight';
import SectionTitle from './components/SectionTitle';
import LoadingCard from './components/LoadingCard';
import ErrorBanner from './components/ErrorBanner';
import { useDashboardData } from './hooks/useDashboardData';
import { buildLapwingHabitats, buildMapSites } from './api/transform';

export default function App() {
  const { data, loading, error } = useDashboardData();

  const mapSites = data ? buildMapSites(data) : [];
  const lapwingHabitats = data ? buildLapwingHabitats(data) : [];

  return (
    <div className="min-h-screen">
      <header className="relative overflow-hidden bg-hero">
        <div className="sparkle-dot left-[8%] top-8 h-16 w-16" />
        <div className="sparkle-dot right-[12%] top-16 h-24 w-24" />
        <div className="sparkle-dot bottom-6 left-[20%] h-20 w-20" />
        <div className="absolute right-6 top-6 text-3xl opacity-70">✨</div>
        <div className="absolute bottom-10 right-[18%] text-2xl opacity-60">🌷</div>
        <div className="absolute left-[15%] top-[40%] text-xl opacity-50">💫</div>

        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <span className="cute-badge bg-white/70 text-blush-600 shadow-soft">
            🐦 bird diary · live API
          </span>
          <h1 className="mt-4 font-display text-4xl leading-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
            우리 동네
            <br />
            철새 분포 대시보드
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            공공데이터 API로 실시간에 가깝게 철새 분포를 확인해요.
            <span className="mt-1 block font-medium text-white">
              💕 내 최애 — 댕기머리물떼새도 API에서 사진·기록을 가져왔어!
            </span>
          </p>
          <a
            href="#lapwing"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-display text-base text-blush-600 shadow-glow transition hover:scale-105 hover:bg-blush-50 active:scale-95"
          >
            🎀 댕기머리물떼새 보러가기
          </a>
        </div>

        <div className="absolute -bottom-1 left-0 right-0">
          <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 48V20C240 44 480 0 720 20C960 40 1200 8 1440 24V48H0Z"
              fill="#fff5f7"
            />
          </svg>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-14 px-4 py-12 sm:px-6 sm:py-16">
        {error && <ErrorBanner message={error} />}
        {data?.warnings?.length ? (
          <div className="rounded-2xl border border-lilac-100 bg-lilac-50/80 px-4 py-3 text-sm text-lilac-600">
            ℹ️ {data.warnings[0]}
          </div>
        ) : null}

        <section>
          <SectionTitle
            emoji="📊"
            title="실시간 철새 현황"
            subtitle="공공데이터포털 API 기반"
          />
          {loading || !data ? (
            <LoadingCard />
          ) : (
            <>
              <StatsOverview stats={data.stats} />
              <p className="mt-4 rounded-2xl bg-white/50 px-4 py-2 text-xs text-blush-400">
                📎 낙동강하구 생태계모니터링 · 울산시 철새 · KISTI 국내 조류분포 · 제주 철새도래지 · 습지보호지역 API
              </p>
            </>
          )}
        </section>

        <section>
          <SectionTitle
            emoji="🗺️"
            title="전국 철새 도래지"
            subtitle="울산 관측구간 · 제주 · 습지 · 낙동강하구"
          />
          <p className="-mt-3 mb-5 text-sm text-blush-400">
            💗 핑크 마커 = 댕기머리물떼새 관찰 지역
          </p>
          {loading || !data ? <LoadingCard message="지도 데이터 불러오는 중..." /> : (
            <KoreaSiteMap sites={mapSites} />
          )}
        </section>

        <section>
          <SectionTitle
            emoji="🪶"
            title="주요 겨울철새 친구들"
            subtitle="울산 철새 마스터 + 낙동강하구 조사"
          />
          {loading || !data ? <LoadingCard /> : <BirdGrid data={data} />}
        </section>

        {loading || !data ? (
          <LoadingCard message="댕기머리물떼새 정보 불러오는 중..." />
        ) : (
          <LapwingSpotlight data={data} habitats={lapwingHabitats} />
        )}
      </main>

      <footer className="border-t border-blush-100/80 bg-white/60 py-10 text-center backdrop-blur-sm">
        <p className="font-display text-blush-500">
          🌸 우리 동네 철새 분포 대시보드
        </p>
        <p className="mt-2 text-sm text-blush-300">
          공공데이터포털 API 연동 · with love
        </p>
        <p className="mt-1 text-xs text-blush-200">
          data.go.kr · api.odcloud.kr · OpenStreetMap
        </p>
      </footer>
    </div>
  );
}
