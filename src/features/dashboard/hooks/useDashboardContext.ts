import { useContext } from "react";

import { DashboardContext } from "../context/dashboard-context";

import type { DashboardContextValue } from "../context/dashboard-context";

export function useDashboardContext(): DashboardContextValue {
  const context = useContext(DashboardContext);

  if (context === null) {
    throw new Error("useDashboardContext must be used within DashboardProvider.");
  }

  return context;
}
