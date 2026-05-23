import type { BirdSpecies } from '../data/birds';

interface BirdSpeechBubbleProps {
  bird: BirdSpecies;
}

export default function BirdSpeechBubble({ bird }: BirdSpeechBubbleProps) {
  return (
    <div
      className="pointer-events-none absolute inset-x-3 top-3 z-20 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-1"
      role="tooltip"
      aria-hidden
    >
      <div className="speech-bubble mx-auto max-w-full px-3.5 py-3 text-left shadow-card">
        <p className="font-display text-sm text-blush-600">{bird.koreanName}</p>
        <p className="text-[11px] text-blush-300">{bird.englishName}</p>
        <ul className="mt-2 space-y-1">
          {bird.highlights.map((line) => (
            <li key={line} className="text-xs leading-snug text-blush-500">
              {line}
            </li>
          ))}
        </ul>
        {(bird.trend || bird.count2025) && (
          <div className="mt-2 flex flex-wrap gap-1 border-t border-blush-100 pt-2">
            {bird.trend && (
              <span className="cute-badge bg-blush-50 text-[10px] text-blush-400">
                추세 {bird.trend}
              </span>
            )}
            {bird.count2025 && (
              <span className="cute-badge bg-lilac-50 text-[10px] text-lilac-400">
                {bird.count2025}마리
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
