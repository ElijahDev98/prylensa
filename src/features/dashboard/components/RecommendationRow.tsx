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
 * - Present AI insight.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Format business data.
 * -----------------------------------------------------------------------------
 */

import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  recommendationActionLabel,
  recommendationDestination,
} from "@/features/ai-recommendations/services/recommendation-navigation";

import type { RecommendationViewModel } from "../viewmodels/dashboard.viewmodel";

interface RecommendationRowProps {
  recommendation: RecommendationViewModel;
}

function RecommendationRow({ recommendation }: RecommendationRowProps) {
  const navigate = useNavigate();

  return (
    <article
      className="
        border-b
        border-slate-200
        py-5
        transition-colors
        duration-200
        hover:bg-slate-50
        first:pt-0
        last:border-b-0
        last:pb-0
      "
    >
      <div className="flex items-start gap-4">
        {/* -------------------------------------------------------------- */}
        {/* AI Icon                                                        */}
        {/* -------------------------------------------------------------- */}

        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-blue-100
          "
        >
          <Sparkles size={20} className="text-blue-600" />
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Recommendation                                                 */}
        {/* -------------------------------------------------------------- */}

        <div className="min-w-0 flex-1">
          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <span
              className="
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-slate-400
              "
            >
              AI Insight
            </span>

            <span
              className={`
                rounded-full
                px-2.5
                py-1
                text-xs
                font-semibold
                uppercase
                ${recommendation.badgeColor}
              `}
            >
              {recommendation.priority}
            </span>
          </div>

          <h3
            className="
              mt-2
              text-base
              font-semibold
              text-slate-900
            "
          >
            {recommendation.title}
          </h3>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-slate-500
            "
          >
            {recommendation.description}
          </p>

          <button
            type="button"
            onClick={() => navigate(recommendationDestination(recommendation))}
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            {recommendationActionLabel(recommendation)}
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* TODO (AI Service)
          Display recommendation confidence.
          Display reasoning summary.
          Allow user feedback (Helpful / Not Helpful).
          Support recommendation actions.
      */}
    </article>
  );
}

export default RecommendationRow;
