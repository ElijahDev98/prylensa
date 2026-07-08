/**
 * -----------------------------------------------------------------------------
 * File: AnalyticsStats.tsx
 * Feature: Comparison
 *
 * Purpose:
 * Displays comparison analytics statistics.
 * -----------------------------------------------------------------------------
 */

import useComparison from "@/features/comparison/hooks/useComparison";

function AnalyticsStats() {
  const { analytics, summary } = useComparison();

  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <h3
        className="
          text-lg
          font-semibold
          text-slate-900
        "
      >
        Price Statistics
      </h3>

      <dl
        className="
          mt-6
          space-y-5
        "
      >
        <div className="flex justify-between">
          <dt className="text-slate-500">Lowest Price</dt>

          <dd className="font-semibold">
            ₦{analytics.lowestPrice.toLocaleString()}
          </dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-slate-500">Highest Price</dt>

          <dd className="font-semibold">
            ₦{analytics.highestPrice.toLocaleString()}
          </dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-slate-500">Average Price</dt>

          <dd className="font-semibold">
            ₦{analytics.averagePrice.toLocaleString()}
          </dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-slate-500">Estimated Savings</dt>

          <dd
            className="
              font-semibold
              text-emerald-600
            "
          >
            ₦{summary.estimatedSavings.toLocaleString()}
          </dd>
        </div>
      </dl>
    </section>
  );
}

export default AnalyticsStats;
