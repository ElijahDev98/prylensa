/**
 * -----------------------------------------------------------------------------
 * File: ComparisonAnalytics.tsx
 * Feature: Comparison
 *
 * Purpose:
 * Displays visual analytics for the current comparison.
 *
 * Responsibilities:
 * - Consume Comparison ViewModel.
 * - Render reusable chart components.
 *
 * Does NOT:
 * - Calculate analytics.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import { BarChartCard } from "@/components/ui/charts";

import useComparison from "@/features/comparison/hooks/useComparison";

function ComparisonAnalytics() {
  const comparison = useComparison();

  if (comparison.analytics.prices.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <header>
        <h2
          className="
            text-2xl
            font-bold
            text-slate-900
          "
        >
          Price Analytics
        </h2>

        <p
          className="
            text-slate-500
          "
        >
          Visual comparison of prices across stores.
        </p>
      </header>

      <BarChartCard
        title="Price Distribution"
        description="Current product prices by store."
        data={comparison.analytics.prices}
        xKey="storeName"
        yKey="price"
      />
    </section>
  );
}

export default ComparisonAnalytics;
