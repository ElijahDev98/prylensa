/**
 * -----------------------------------------------------------------------------
 * File: DashboardMetrics.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Displays the dashboard metrics grid.
 *
 * Responsibilities:
 * - Render dashboard metric cards.
 * - Arrange metric cards responsively.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Know where the data comes from.
 * -----------------------------------------------------------------------------
 */

import DashboardMetricCard from "./DashboardMetricCard";

import type { DashboardMetricViewModel } from "../viewmodels/dashboard.viewmodel";

interface DashboardMetricsProps {
  metrics: DashboardMetricViewModel[];
}

function DashboardMetrics({ metrics }: DashboardMetricsProps) {
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
      {metrics.map((metric) => (
        <DashboardMetricCard key={metric.id} metric={metric} />
      ))}
    </section>
  );
}

export default DashboardMetrics;
