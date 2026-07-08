/**
 * -----------------------------------------------------------------------------
 * File: InsightCard.tsx
 * Feature: Comparison
 *
 * Purpose:
 * Displays a single AI insight.
 * -----------------------------------------------------------------------------
 */

import { AlertTriangle, CheckCircle2, Info } from "lucide-react";

import type { ComparisonInsightViewModel } from "@/features/comparison/viewmodels/comparison-insight.viewmodel";

interface InsightCardProps {
  insight: ComparisonInsightViewModel;
}

function InsightCard({ insight }: InsightCardProps) {
  function renderIcon() {
    switch (insight.severity) {
      case "success":
        return <CheckCircle2 size={20} className="text-emerald-600" />;

      case "warning":
        return <AlertTriangle size={20} className="text-amber-600" />;

      default:
        return <Info size={20} className="text-blue-600" />;
    }
  }

  return (
    <article
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
      "
    >
      <div className="flex gap-4">
        {renderIcon()}

        <div>
          <h3
            className="
              font-semibold
              text-slate-900
            "
          >
            {insight.title}
          </h3>

          <p
            className="
              mt-2
              text-sm
              text-slate-600
            "
          >
            {insight.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export default InsightCard;
