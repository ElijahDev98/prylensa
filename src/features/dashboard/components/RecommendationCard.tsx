/**
 * -----------------------------------------------------------------------------
 * File: RecommendationCard.tsx
 * Feature: Dashboard
 * -----------------------------------------------------------------------------
 */

import type { Recommendation } from "../types/recommendation.types";

interface RecommendationCardProps {
  recommendation: Recommendation;
}

function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const badgeClass =
    recommendation.priority === "high"
      ? "bg-red-100 text-red-700"
      : recommendation.priority === "medium"
        ? "bg-amber-100 text-amber-700"
        : "bg-green-100 text-green-700";

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        p-4
      "
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold text-slate-900">{recommendation.title}</h3>

        <span
          className={`
            rounded-full
            px-2
            py-1
            text-xs
            font-semibold
            ${badgeClass}
          `}
        >
          {recommendation.priority}
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-500">
        {recommendation.description}
      </p>
    </div>
  );
}

export default RecommendationCard;
