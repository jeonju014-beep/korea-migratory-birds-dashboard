import { useEffect, useState, type ReactNode } from 'react';

interface LeafletMapShellProps {
  className?: string;
  placeholder?: string;
  children: ReactNode;
}

export default function LeafletMapShell({
  className = 'flex h-full w-full items-center justify-center rounded-2xl bg-blush-50 text-sm text-blush-400',
  placeholder = '지도 준비 중…',
  children,
}: LeafletMapShellProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return <div className={className}>{placeholder}</div>;
  }

  return <>{children}</>;
}
