import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { subscribeProductIntelligence } from "@/features/product-intelligence";

import { getDashboard } from "../services/dashboard.service";
import { DashboardContext } from "./dashboard-context";

import type { ReactNode } from "react";
import type { DashboardModel } from "../models/dashboard.model";
import type { DashboardContextValue } from "./dashboard-context";

interface DashboardProviderProps {
  children: ReactNode;
}

let cachedDashboard: DashboardModel | null = null;
let dashboardRequest: Promise<DashboardModel> | null = null;

function requestDashboard(): Promise<DashboardModel> {
  if (dashboardRequest === null) {
    dashboardRequest = getDashboard().finally(() => {
      dashboardRequest = null;
    });
  }

  return dashboardRequest;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [dashboard, setDashboard] = useState<DashboardModel | null>(
    cachedDashboard,
  );
  const [loading, setLoading] = useState(cachedDashboard === null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(
    cachedDashboard === null ? null : new Date(cachedDashboard.generatedAt),
  );
  const [intelligenceRevision, setIntelligenceRevision] = useState(0);

  const loadDashboard = useCallback(async (refresh = false) => {
    if (refresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError(null);

    try {
      const nextDashboard = await requestDashboard();

      cachedDashboard = nextDashboard;
      setDashboard(nextDashboard);
      setLastUpdated(new Date(nextDashboard.generatedAt));
    } catch {
      setError("Unable to load live dashboard data from the backend.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (cachedDashboard === null) {
      queueMicrotask(() => void loadDashboard());
    }
  }, [loadDashboard]);

  useEffect(() => {
    return subscribeProductIntelligence(() => {
      setIntelligenceRevision((revision) => revision + 1);
      setLastUpdated(new Date());
    });
  }, []);

  const refreshDashboard = useCallback(() => {
    void loadDashboard(true);
  }, [loadDashboard]);

  const value = useMemo<DashboardContextValue>(
    () => ({
      dashboard,
      loading,
      refreshing,
      error,
      lastUpdated,
      intelligenceRevision,
      refreshDashboard,
    }),
    [
      dashboard,
      error,
      intelligenceRevision,
      lastUpdated,
      loading,
      refreshDashboard,
      refreshing,
    ],
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}
