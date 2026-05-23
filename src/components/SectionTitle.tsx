interface SectionTitleProps {
  emoji: string;
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ emoji, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-6">
      <h2 className="flex items-center gap-2 font-display text-2xl text-blush-600 sm:text-3xl">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 text-lg shadow-soft">
          {emoji}
        </span>
        {title}
      </h2>
      {subtitle && <p className="mt-2 text-sm text-blush-400">{subtitle}</p>}
    </div>
  );
}
