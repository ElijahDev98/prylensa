/**
 * -----------------------------------------------------------------------------
 * File: RecommendationRow.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Displays a compact AI recommendation.
 *
 * Responsibilities:
 * - Display recommendation summary.
 * - Display recommendation priority.
 * - Provide navigation action.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Format business data.
 * -----------------------------------------------------------------------------
 */

import { ArrowRight, Sparkles } from "lucide-react";

import type { RecommendationViewModel } from "../viewmodels/dashboard.viewmodel";

interface RecommendationRowProps {
  recommendation: RecommendationViewModel;
}

function RecommendationRow({ recommendation }: RecommendationRowProps) {
  return (
    <article
      className="
        flex
        items-start
        justify-between
        gap-4
        border-b
        border-slate-200
        py-4
        transition-colors
        duration-200
        hover:bg-slate-50
        first:pt-0
        last:border-b-0
        last:pb-0
      "
    >
      <div className="flex gap-3">
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-blue-100
          "
        >
          <Sparkles size={18} className="text-blue-600" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3
              className="
                font-semibold
                text-slate-900
              "
            >
              {recommendation.title}
            </h3>

            <span
              className={`
                rounded-full
                px-2
                py-0.5
                text-xs
                font-medium
                ${recommendation.badgeColor}
              `}
            >
              {recommendation.priority}
            </span>
          </div>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            {recommendation.description}
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label={`View recommendation: ${recommendation.title}`}
        title={`View recommendation: ${recommendation.title}`}
        className="
          shrink-0
          rounded-lg
          p-2
          text-slate-400
          transition-colors
          hover:bg-slate-100
          hover:text-slate-700
        "
      >
        <ArrowRight size={18} />
      </button>
    </article>
  );
}

export default RecommendationRow;
