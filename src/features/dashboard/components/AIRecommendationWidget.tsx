/**
 * -----------------------------------------------------------------------------
 * File: AIRecommendationWidget.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Displays AI-generated recommendations.
 * -----------------------------------------------------------------------------
 */

import RecommendationRow from "./RecommendationRow";

import { RECOMMENDATIONS } from "../data/recommendations";

function AIRecommendationWidget() {
  return (
    <section className="flex flex-col">
      <header
        className="
          mb-6
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-slate-900
            "
          >
            AI Recommendations
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Personalized insights generated from pricing trends.
          </p>
        </div>

        <button
          type="button"
          className="
            shrink-0
            rounded-xl
            px-3
            py-2
            text-sm
            font-medium
            text-blue-600
            transition-colors
            hover:bg-blue-50
            hover:text-blue-700
          "
        >
          View All
        </button>
      </header>

      <div>
        {RECOMMENDATIONS.map((recommendation) => (
          <RecommendationRow
            key={recommendation.id}
            recommendation={recommendation}
          />
        ))}
      </div>
    </section>
  );
}

export default AIRecommendationWidget;
