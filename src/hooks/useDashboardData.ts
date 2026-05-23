import { useEffect, useState } from 'react';
import type { DashboardData } from '../api/types';

interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
  partial: boolean;
}

export function useDashboardData() {
  const [state, setState] = useState<DashboardState>({
    data: null,
    loading: true,
    error: null,
    partial: false,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch('/api/dashboard', {
          signal: AbortSignal.timeout(120000),
        });
        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(payload.error ?? `API error ${response.status}`);
        }
        const data = (await response.json()) as DashboardData;
        if (!cancelled) {
          setState({
            data,
            loading: false,
            error: null,
            partial: Boolean(data.warnings?.length),
          });
        }
      } catch (error) {
        if (!cancelled) {
          setState({
            data: null,
            loading: false,
            error: error instanceof Error ? error.message : '데이터를 불러오지 못했습니다',
            partial: false,
          });
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
