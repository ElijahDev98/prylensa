/**
 * -----------------------------------------------------------------------------
 * File: InsightCard.tsx
 * Feature: Comparison
 *
 * Purpose:
 * Displays a single AI-generated comparison insight.
 *
 * Responsibilities:
 * - Present an individual AI insight.
 * - Visually distinguish insight severity.
 * - Maintain dashboard consistency.
 *
 * Does NOT:
 * - Execute business logic.
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
        return <CheckCircle2 size={22} className="text-emerald-600" />;

      case "warning":
        return <AlertTriangle size={22} className="text-amber-600" />;

      default:
        return <Info size={22} className="text-blue-600" />;
    }
  }

  function accentClasses() {
    switch (insight.severity) {
      case "success":
        return {
          border: "border-emerald-100",
          background: "bg-emerald-50",
        };

      case "warning":
        return {
          border: "border-amber-100",
          background: "bg-amber-50",
        };

      default:
        return {
          border: "border-blue-100",
          background: "bg-blue-50",
        };
    }
  }

  const accent = accentClasses();

  return (
    <article
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:shadow-lg
      "
    >
      <div className="flex">
        {/* ------------------------------------------------------------- */}
        {/* Severity Accent */}
        {/* ------------------------------------------------------------- */}

        <div
          className={`
            w-1.5
            ${accent.background}
          `}
        />

        {/* ------------------------------------------------------------- */}
        {/* Content */}
        {/* ------------------------------------------------------------- */}

        <div className="flex flex-1 gap-5 p-6">
          <div
            className={`
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              ${accent.border}
              ${accent.background}
            `}
          >
            {renderIcon()}
          </div>

          <div className="min-w-0 flex-1">
            <h3
              className="
                text-lg
                font-semibold
                tracking-tight
                text-slate-900
              "
            >
              {insight.title}
            </h3>

            <p
              className="
                mt-3
                leading-7
                text-slate-600
              "
            >
              {insight.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default InsightCard;
