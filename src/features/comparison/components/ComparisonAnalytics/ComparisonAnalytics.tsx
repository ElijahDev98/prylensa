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
  const { analytics } = useComparison();

  if (analytics.prices.length === 0) {
    return null;
  }

  return (
    <section
      className="
        space-y-6
      "
    >
      <header
        className="
          space-y-2
        "
      >
        <h2
          className="
            text-2xl
            font-bold
            tracking-tight
            text-slate-900
          "
        >
          Price Distribution
        </h2>

        <p
          className="
            max-w-2xl
            text-sm
            leading-6
            text-slate-500
          "
        >
          Compare the lowest available market price for each selected product
          across supported online stores.
        </p>
      </header>

      <BarChartCard
        title="Lowest Market Price"
        description="Each bar represents the best available price for a compared product."
        data={analytics.prices}
        xKey="productName"
        yKey="price"
      />
    </section>
  );
}

export default ComparisonAnalytics;
