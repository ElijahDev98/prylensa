/**
 * -----------------------------------------------------------------------------
 * File: ComparisonSummary.tsx
 * Feature: Comparison
 * -----------------------------------------------------------------------------
 */

import { ArrowDown, ArrowUp, BarChart3, PiggyBank } from "lucide-react";

import SummaryCard from "./SummaryCard";

import useComparison from "@/features/comparison/hooks/useComparison";
import { usePreferences } from "@/features/settings";

function ComparisonSummary() {
  const comparison = useComparison();
  const { formatPrice } = usePreferences();

  const summary = comparison.summary;

  if (summary.comparedProducts === 0) {
    return null;
  }

  return (
    <section
      className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-4
      "
    >
      <SummaryCard
        title="Estimated Savings"
        value={formatPrice(summary.estimatedSavings)}
        accent="bg-emerald-100"
        icon={<PiggyBank size={22} className="text-emerald-600" />}
      />

      <SummaryCard
        title="Lowest Price"
        value={formatPrice(summary.lowestPrice)}
        accent="bg-blue-100"
        icon={<ArrowDown size={22} className="text-blue-600" />}
      />

      <SummaryCard
        title="Highest Price"
        value={formatPrice(summary.highestPrice)}
        accent="bg-red-100"
        icon={<ArrowUp size={22} className="text-red-600" />}
      />

      <SummaryCard
        title="Average Price"
        value={formatPrice(summary.averagePrice)}
        accent="bg-violet-100"
        icon={<BarChart3 size={22} className="text-violet-600" />}
      />
    </section>
  );
}

export default ComparisonSummary;
