export default function FamilyLoveNote() {
  return (
    <aside
      className="pointer-events-none fixed bottom-4 right-4 z-50 max-w-[min(100vw-2rem,18rem)] sm:max-w-xs"
      aria-label="가족에게 보내는 사랑 메시지"
    >
      <div className="relative overflow-hidden rounded-2xl border border-blush-200/80 bg-white/85 px-4 py-3 shadow-glow backdrop-blur-md">
        <div className="pointer-events-none absolute -right-1 -top-1 text-lg opacity-40">💕</div>
        <div className="pointer-events-none absolute bottom-1 left-2 text-sm opacity-30">💖</div>

        <p className="relative text-center font-display text-sm leading-relaxed text-blush-600 sm:text-base">
          <span className="inline-block animate-pulse text-blush-400">♥</span>
          {' '}사랑하는 내 아내{' '}
          <span className="font-bold text-blush-500">정은이</span>,{' '}
          <br className="sm:hidden" />
          그리고{' '}
          <span className="font-bold text-lilac-500">예지</span>
          <span className="mx-0.5">&</span>
          <span className="font-bold text-lilac-500">상윤</span>
          이{' '}
          <span className="text-base text-blush-500 sm:text-lg">사랑해~!!</span>
          <span className="ml-1 inline-flex gap-0.5">
            <span className="animate-pulse text-blush-400">♥</span>
            <span className="animate-pulse text-lilac-400 [animation-delay:150ms]">♥</span>
            <span className="animate-pulse text-blush-400 [animation-delay:300ms]">♥</span>
          </span>
        </p>
      </div>
    </aside>
  );
}
