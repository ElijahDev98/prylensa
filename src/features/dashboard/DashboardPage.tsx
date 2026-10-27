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

  const hasDashboardData = dashboard.metrics.length > 0;

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
      <DashboardHeader
        refreshing={dashboard.refreshing}
        lastUpdated={dashboard.lastUpdated}
        onRefresh={dashboard.refreshDashboard}
      />

      {dashboard.error && (
        <section
          role="alert"
          className="
            rounded-3xl
            border
            border-red-200
            bg-red-50
            p-5
            text-sm
            font-medium
            text-red-700
          "
        >
          {dashboard.error}
        </section>
      )}

      {dashboard.loading ? (
        <section
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-8
            text-sm
            text-slate-500
          "
        >
          Loading live marketplace intelligence...
        </section>
      ) : dashboard.error && !hasDashboardData ? null : (
        <>
          <DashboardMetrics metrics={dashboard.metrics} />

          <DashboardWorkspace
            trendingProducts={dashboard.trendingProducts}
            priceAlerts={dashboard.priceAlerts}
            recommendations={dashboard.recommendations}
            recentComparisons={dashboard.recentComparisons}
          />
        </>
      )}
    </section>
  );
}

export default DashboardPage;
