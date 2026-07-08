/**
 * -----------------------------------------------------------------------------
 * File: ComparisonInsights.tsx
 * Feature: Comparison
 * -----------------------------------------------------------------------------
 */

import InsightCard from "./InsightCard";

import useComparison from "@/features/comparison/hooks/useComparison";

import type { ComparisonInsightViewModel } from "../../viewmodels/comparison-insight.viewmodel";

function ComparisonInsights() {
  const comparison = useComparison();

  if (comparison.insights.length === 0) {
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
          AI Insights
        </h2>

        <p
          className="
            text-slate-500
          "
        >
          Intelligent observations generated from your comparison.
        </p>
      </header>

      <div
        className="
          grid
          gap-5
          lg:grid-cols-2
        "
      >
        {comparison.insights.map((insight: ComparisonInsightViewModel) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </section>
  );
}

export default ComparisonInsights;
