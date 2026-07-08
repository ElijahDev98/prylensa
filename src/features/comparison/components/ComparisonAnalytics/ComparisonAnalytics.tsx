/**
 * -----------------------------------------------------------------------------
 * File: ComparisonAnalytics.tsx
 * Feature: Comparison
 *
 * Purpose:
 * Displays analytics dashboard for the comparison.
 * -----------------------------------------------------------------------------
 */

import { BarChartCard } from "@/components/ui/charts";

import AnalyticsStats from "./AnalyticsStats";

import useComparison from "@/features/comparison/hooks/useComparison";

function ComparisonAnalytics() {
  const comparison = useComparison();

  if (comparison.analytics.prices.length === 0) {
    return null;
  }

  return (
    <section className="space-y-8">
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

        <p className="text-slate-500">
          Compare pricing across available stores.
        </p>
      </header>

      <div
        className="
          grid
          gap-6
          xl:grid-cols-[2fr_1fr]
        "
      >
        <BarChartCard
          title="Price Distribution"
          description="Current product prices by store."
          data={comparison.analytics.prices}
          xKey="storeName"
          yKey="price"
        />

        <AnalyticsStats />
      </div>
    </section>
  );
}

export default ComparisonAnalytics;
