import Header from './components/Header';
import SectionTitle from './components/SectionTitle';
import StatsOverview from './components/StatsOverview';
import DistributionMap from './components/DistributionMap';
import BirdCards from './components/BirdCards';
import LapwingSection from './components/LapwingSection';

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-6xl space-y-14 px-4 py-12 sm:px-6 sm:py-16">
        <section>
          <SectionTitle
            emoji="📊"
            title="2024–2025 겨울철새 현황"
            subtitle="환경부 국립생물자원관 동시센서스 기준"
          />
          <StatsOverview />
        </section>

        <section>
          <SectionTitle
            emoji="🗺️"
            title="전국 주요 철새 도래지"
            subtitle="습지·하구·호수 — 겨울철새가 모이는 대표 지역"
          />
          <p className="-mt-3 mb-5 text-sm text-blush-400">
            💗 핑크 마커 = 댕기머리물떼새도 함께 관찰되는 지역
          </p>
          <DistributionMap />
        </section>

        <section>
          <SectionTitle
            emoji="🪶"
            title="겨울철새 친구들"
            subtitle="전국에서 자주 만날 수 있는 대표 종"
          />
          <BirdCards />
        </section>

        <LapwingSection />
      </main>

      <footer className="border-t border-blush-100/80 bg-white/60 py-10 text-center backdrop-blur-sm">
        <p className="font-display text-blush-500">🌸 우리 동네 철새 분포 대시보드</p>
        <p className="mt-2 text-sm text-blush-300">딸과 함께 새 관찰 · with love</p>
        <p className="mt-1 text-xs text-blush-200">
          국립생물자원관 · OpenStreetMap · Wikimedia Commons
        </p>
      </footer>
    </div>
  );
}
