/**
 * -----------------------------------------------------------------------------
 * File: comparison-insights.ts
 * Feature: Comparison Analysis
 *
 * Purpose:
 * Produces structured business insights.
 *
 * Responsibilities:
 * - Generate comparison insight models.
 *
 * Does NOT:
 * - Render UI.
 * - Format values.
 * - Produce presentation text.
 * -----------------------------------------------------------------------------
 */

import type {
  ComparisonInsight,
  ComparisonRecommendation,
  ComparisonSummary,
} from "./comparison-types";

export function buildComparisonInsights(
  summary: ComparisonSummary,
  recommendation?: ComparisonRecommendation,
): ComparisonInsight[] {
  const insights: ComparisonInsight[] = [];

  if (summary.potentialSavings > 0) {
    insights.push({
      id: "potential-savings",

      type: "potential-savings",

      severity: "success",

      value: summary.potentialSavings,
    });
  }

  if (recommendation) {
    insights.push({
      id: "best-offer",

      type: "best-offer",

      severity: "success",

      value: recommendation.score,

      recommendation,
    });
  }

  if (summary.priceSpread > 0) {
    insights.push({
      id: "price-spread",

      type: "price-spread",

      severity: "info",

      value: summary.priceSpread,
    });
  }

  if (summary.averagePrice > 0) {
    insights.push({
      id: "average-price",

      type: "average-price",

      severity: "info",

      value: summary.averagePrice,
    });
  }

  return insights;
}
