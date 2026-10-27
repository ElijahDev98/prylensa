import { createContext } from "react";

import type { DashboardModel } from "../models/dashboard.model";

export interface DashboardContextValue {
  dashboard: DashboardModel | null;
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  lastUpdated: Date | null;
  intelligenceRevision: number;
  refreshDashboard: () => void;
}

export const DashboardContext = createContext<DashboardContextValue | null>(null);
