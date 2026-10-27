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
import { usePreferences } from "@/features/settings";

function AnalyticsStats() {
  const { analytics } = useComparison();
  const { formatPrice } = usePreferences();

  const metrics = [
    { label: "Observed offers", value: analytics.offerCount.toString() },
    { label: "Marketplaces", value: analytics.storeCount.toString() },
    { label: "Median price", value: formatPrice(analytics.medianPrice) },
    {
      label: "Price spread",
      value: `${formatPrice(analytics.priceRange)} (${analytics.spreadPercentage.toFixed(1)}%)`,
    },
  ];

  return (
    <dl className="grid overflow-hidden rounded-lg border border-slate-200 bg-slate-50 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => (
        <div
          key={metric.label}
          className={`p-4 ${index > 0 ? "border-t border-slate-200 sm:border-l sm:border-t-0" : ""}`}
        >
          <dt className="text-xs font-semibold uppercase text-slate-500">
            {metric.label}
          </dt>
          <dd className="mt-1 text-lg font-bold text-slate-950">
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default AnalyticsStats;
