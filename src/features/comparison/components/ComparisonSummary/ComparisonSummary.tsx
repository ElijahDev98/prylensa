/**
 * -----------------------------------------------------------------------------
 * File: ComparisonSummary.tsx
 * Feature: Comparison
 * -----------------------------------------------------------------------------
 */

import { ArrowDown, ArrowUp, BarChart3, PiggyBank } from "lucide-react";

import SummaryCard from "./SummaryCard";

import useComparison from "@/features/comparison/hooks/useComparison";

function ComparisonSummary() {
  const comparison = useComparison();

  const summary = comparison.summary;

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
        value={`₦${summary.estimatedSavings.toLocaleString()}`}
        accent="bg-emerald-100"
        icon={<PiggyBank size={22} className="text-emerald-600" />}
      />

      <SummaryCard
        title="Lowest Price"
        value={`₦${summary.lowestPrice.toLocaleString()}`}
        accent="bg-blue-100"
        icon={<ArrowDown size={22} className="text-blue-600" />}
      />

      <SummaryCard
        title="Highest Price"
        value={`₦${summary.highestPrice.toLocaleString()}`}
        accent="bg-red-100"
        icon={<ArrowUp size={22} className="text-red-600" />}
      />

      <SummaryCard
        title="Average Price"
        value={`₦${summary.averagePrice.toLocaleString()}`}
        accent="bg-violet-100"
        icon={<BarChart3 size={22} className="text-violet-600" />}
      />
    </section>
  );
}

export default ComparisonSummary;
