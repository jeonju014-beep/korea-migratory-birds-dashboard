import { useState } from 'react';

interface BirdImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackEmoji?: string;
}

export default function BirdImage({
  src,
  alt,
  className = '',
  fallbackEmoji = '🐦',
}: BirdImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-lilac-50 to-blush-50 ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="text-4xl">{fallbackEmoji}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}
