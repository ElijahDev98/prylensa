/**
 * -----------------------------------------------------------------------------
 * File: DashboardPage.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Entry point for the Dashboard feature.
 *
 * Responsibilities:
 * - Compose Dashboard presentation components.
 * - Connect the Dashboard hook to the UI.
 *
 * Architecture:
 *
 * UI
 *   ↓
 * useDashboard()
 *   ↓
 * Dashboard Service
 *   ↓
 * Dashboard Mapper
 *
 * Notes:
 * - Composition root only.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import DashboardHeader from "./components/DashboardHeader";
import DashboardMetrics from "./components/DashboardMetrics";
import DashboardWorkspace from "./components/DashboardWorkspace";

import useDashboard from "./hooks/useDashboard";

function DashboardPage() {
  const dashboard = useDashboard();

  return (
    <section
      className="
        mx-auto
        flex
        w-full
        max-w-screen-2xl
        flex-col
        gap-8
      "
    >
      <DashboardHeader />

      <DashboardMetrics metrics={dashboard.metrics} />

      <DashboardWorkspace
        trendingProducts={dashboard.trendingProducts}
        priceAlerts={dashboard.priceAlerts}
        recommendations={dashboard.recommendations}
        recentComparisons={dashboard.recentComparisons}
      />
    </section>
  );
}

export default DashboardPage;
