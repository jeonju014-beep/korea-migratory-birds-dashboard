interface SectionTitleProps {
  emoji: string;
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ emoji, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 text-xl shadow-soft">
          {emoji}
        </span>
        <div>
          <h2 className="cute-section-title">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-sm text-blush-400">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-blush-300 via-lilac-300 to-mint-300" />
    </div>
  );
}
