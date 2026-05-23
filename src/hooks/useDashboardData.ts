import { useEffect, useState } from 'react';
import { getStaticDashboard, loadDashboard } from '../api/loadDashboard';
import type { DashboardData } from '../api/types';

interface DashboardState {
  data: DashboardData;
  refreshing: boolean;
  error: string | null;
}

export function useDashboardData() {
  const [state, setState] = useState<DashboardState>({
    data: getStaticDashboard(),
    refreshing: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await loadDashboard();
        if (!cancelled) {
          setState({
            data,
            refreshing: false,
            error: null,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setState((prev) => ({
            ...prev,
            refreshing: false,
            error: error instanceof Error ? error.message : '데이터를 불러오지 못했습니다',
          }));
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
