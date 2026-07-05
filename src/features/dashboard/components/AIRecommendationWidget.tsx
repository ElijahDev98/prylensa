/**
 * -----------------------------------------------------------------------------
 * File: AIRecommendationWidget.tsx
 * Feature: Dashboard
 * -----------------------------------------------------------------------------
 */

import DashboardWidgetHeader from "./DashboardWidgetHeader";
import RecommendationRow from "./RecommendationRow";

import { RECOMMENDATIONS } from "../data/recommendations";

function AIRecommendationWidget() {
  return (
    <section>
      <DashboardWidgetHeader
        title="AI Recommendations"
        description="AI-powered suggestions based on market trends."
        actionLabel="View All"
      />

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
