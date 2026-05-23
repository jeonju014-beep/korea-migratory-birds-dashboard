export default function Header() {
  return (
    <header className="relative overflow-hidden bg-hero">
      <div className="sparkle left-[8%] top-8 h-16 w-16" />
      <div className="sparkle right-[10%] top-14 h-24 w-24" />
      <div className="sparkle bottom-8 left-[18%] h-20 w-20" />
      <div className="absolute right-6 top-6 text-3xl opacity-70">✨</div>
      <div className="absolute bottom-12 right-[20%] text-2xl opacity-60">🌷</div>
      <div className="absolute left-[12%] top-[42%] text-xl opacity-50">💫</div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <span className="cute-badge bg-white/75 font-medium text-blush-600 shadow-soft">
          🐦 bird diary · 대한민국 철새
        </span>
        <h1 className="mt-4 font-display text-4xl leading-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
          우리 동네
          <br />
          철새 분포 대시보드
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
          겨울철새가 어디에 모여 있는지, 전국 주요 도래지를 한눈에 볼 수 있어요.
          <span className="mt-2 block font-medium text-white">
            💕 내 최애 — 댕기머리물떼새(Northern Lapwing)도 자세히 담았어!
          </span>
        </p>
        <a
          href="#lapwing"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-display text-base text-blush-600 shadow-glow transition hover:scale-105 hover:bg-blush-50 active:scale-95"
        >
          🎀 댕기머리물떼새 보러가기
        </a>
      </div>

      <div className="absolute -bottom-px left-0 right-0">
        <svg viewBox="0 0 1440 48" fill="none" className="w-full" aria-hidden>
          <path
            d="M0 48V20C240 44 480 0 720 20C960 40 1200 8 1440 24V48H0Z"
            fill="#fff5f7"
          />
        </svg>
      </div>
    </header>
  );
}
