/**
 * -----------------------------------------------------------------------------
 * File: AIRecommendationWidget.tsx
 * Feature: Dashboard
 * -----------------------------------------------------------------------------
 */

import RecommendationCard from "./RecommendationCard";

import { RECOMMENDATIONS } from "../data/recommendations";

function AIRecommendationWidget() {
  return (
    <section className="flex h-full flex-col">
      <h2 className="text-xl font-semibold text-slate-900">
        AI Recommendations
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Suggestions generated from pricing trends.
      </p>

      <div className="mt-6 space-y-4">
        {RECOMMENDATIONS.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
          />
        ))}
      </div>
    </section>
  );
}

export default AIRecommendationWidget;
