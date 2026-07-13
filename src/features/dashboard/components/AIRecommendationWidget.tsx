/**
 * -----------------------------------------------------------------------------
 * File: AIRecommendationWidget.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Displays AI recommendations.
 *
 * Responsibilities:
 * - Render widget header.
 * - Render AI recommendations.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Know where the data comes from.
 * -----------------------------------------------------------------------------
 */

import DashboardWidgetHeader from "./DashboardWidgetHeader";
import RecommendationRow from "./RecommendationRow";

import type { RecommendationViewModel } from "../viewmodels/dashboard.viewmodel";

interface AIRecommendationWidgetProps {
  recommendations: RecommendationViewModel[];
}

function AIRecommendationWidget({
  recommendations,
}: AIRecommendationWidgetProps) {
  return (
    <section>
      <DashboardWidgetHeader
        title="AI Recommendations"
        description="AI-powered suggestions based on market trends."
        actionLabel="View All"
      />

      <div>
        {recommendations.map((recommendation) => (
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
