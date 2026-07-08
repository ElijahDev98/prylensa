/**
 * -----------------------------------------------------------------------------
 * File: InsightCard.tsx
 * Feature: Comparison
 *
 * Purpose:
 * Displays a single AI-generated comparison insight.
 *
 * Responsibilities:
 * - Present AI insight information.
 * - Display the primary business value.
 * - Display AI recommendation.
 * - Apply severity styling.
 *
 * Does NOT:
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import { AlertTriangle, CheckCircle2, Info, Lightbulb } from "lucide-react";

import type { ComparisonInsightViewModel } from "@/features/comparison/viewmodels/comparison-insight.viewmodel";

interface InsightCardProps {
  insight: ComparisonInsightViewModel;
}

function InsightCard({ insight }: InsightCardProps) {
  function getSeverityStyles() {
    switch (insight.severity) {
      case "success":
        return {
          icon: <CheckCircle2 size={22} className="text-emerald-600" />,

          accent: "bg-emerald-50",

          border: "border-emerald-100",
        };

      case "warning":
        return {
          icon: <AlertTriangle size={22} className="text-amber-600" />,

          accent: "bg-amber-50",

          border: "border-amber-100",
        };

      default:
        return {
          icon: <Info size={22} className="text-blue-600" />,

          accent: "bg-blue-50",

          border: "border-blue-100",
        };
    }
  }

  const severity = getSeverityStyles();

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
        {/* Accent */}

        <div
          className={`
            w-1.5
            ${severity.accent}
          `}
        />

        <div className="flex flex-1 gap-5 p-6">
          {/* Icon */}

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
              ${severity.accent}
              ${severity.border}
            `}
          >
            {severity.icon}
          </div>

          <div className="flex-1">
            {/* Title */}

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

            {/* Metric */}

            <div
              className="
                mt-5
                rounded-2xl
                bg-slate-50
                p-4
              "
            >
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-widest
                  text-slate-500
                "
              >
                {insight.valueLabel}
              </p>

              <p
                className="
                  mt-2
                  text-3xl
                  font-bold
                  text-slate-900
                "
              >
                ₦{insight.value.toLocaleString()}
              </p>
            </div>

            {/* Description */}

            <p
              className="
                mt-5
                leading-7
                text-slate-600
              "
            >
              {insight.description}
            </p>

            {/* Recommendation */}

            <div
              className="
                mt-6
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-4
              "
            >
              <div className="flex items-center gap-2">
                <Lightbulb size={18} className="text-amber-500" />

                <span
                  className="
                    text-sm
                    font-semibold
                    text-slate-800
                  "
                >
                  AI Recommendation
                </span>
              </div>

              <p
                className="
                  mt-3
                  leading-7
                  text-slate-600
                "
              >
                {insight.recommendationText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default InsightCard;
