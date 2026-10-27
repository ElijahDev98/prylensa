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

import { useState } from "react";

import type { RecommendationViewModel } from "../viewmodels/dashboard.viewmodel";

interface AIRecommendationWidgetProps {
  recommendations: RecommendationViewModel[];
}

function AIRecommendationWidget({
  recommendations,
}: AIRecommendationWidgetProps) {
  const [expanded, setExpanded] = useState(false);

  const visibleRecommendations = expanded
    ? recommendations
    : recommendations.slice(0, 2);

  const canToggle = recommendations.length > 2;

  return (
    <section>
      <DashboardWidgetHeader
        title="AI Recommendations"
        description="AI-powered suggestions based on market trends."
        actionLabel={canToggle ? (expanded ? "Show Less" : "View All") : undefined}
        onAction={() => setExpanded((current) => !current)}
      />

      {recommendations.length === 0 ? (
        <p className="text-sm text-slate-500">
          Recommendations will appear after live marketplace data loads.
        </p>
      ) : (
        <div>
          {visibleRecommendations.map((recommendation) => (
            <RecommendationRow
              key={recommendation.id}
              recommendation={recommendation}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default AIRecommendationWidget;
