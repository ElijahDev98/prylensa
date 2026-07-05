/**
 * -----------------------------------------------------------------------------
 * File: DashboardMetrics.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Displays the dashboard metrics grid.
 *
 * Responsibilities:
 * - Render metric cards.
 * - Handle responsive layout.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import DashboardMetricCard from "./DashboardMetricCard";

import { DASHBOARD_METRICS } from "../data/metrics";

function DashboardMetrics() {
  return (
    <section
      aria-label="Dashboard Metrics"
      className="
        grid
        gap-6
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      {DASHBOARD_METRICS.map((metric) => (
        <DashboardMetricCard key={metric.id} metric={metric} />
      ))}
    </section>
  );
}

export default DashboardMetrics;
