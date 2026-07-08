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
 * - Translate analytical results into actionable business insights.
 *
 * Does NOT:
 * - Render UI.
 * - Format presentation components.
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

  /**
   * ---------------------------------------------------------------------------
   * Potential Savings
   * ---------------------------------------------------------------------------
   */

  if (summary.potentialSavings > 0) {
    insights.push({
      id: "potential-savings",

      type: "potential-savings",

      severity: "success",

      value: summary.potentialSavings,

      metricType: "currency",

      valueLabel: "Potential Savings",

      title: "Savings Opportunity",

      description:
        "A significant price difference exists between the lowest and highest available offers.",

      recommendationText:
        "Purchase from the lowest-priced retailer to maximize your savings.",
    });
  }

  /**
   * ---------------------------------------------------------------------------
   * Best Overall Offer
   * ---------------------------------------------------------------------------
   */

  if (recommendation) {
    insights.push({
      id: "best-offer",

      type: "best-offer",

      severity: "success",

      value: recommendation.score * 100,

      metricType: "percentage",

      valueLabel: "Recommendation Score",

      title: "Best Overall Offer",

      description:
        "The comparison engine identified the strongest overall offer using price, discount and stock availability.",

      recommendationText:
        "Choose the recommended retailer for the best overall purchasing value.",

      recommendation,
    });
  }

  /**
   * ---------------------------------------------------------------------------
   * Price Spread
   * ---------------------------------------------------------------------------
   */

  if (summary.priceSpread > 0) {
    insights.push({
      id: "price-spread",

      type: "price-spread",

      severity: "info",

      value: summary.priceSpread,

      metricType: "currency",

      valueLabel: "Price Spread",

      title: "Price Variation Detected",

      description:
        "Prices vary noticeably across retailers for the selected products.",

      recommendationText:
        "Compare prices carefully before purchasing because retailers are not equally priced.",
    });
  }

  /**
   * ---------------------------------------------------------------------------
   * Average Market Price
   * ---------------------------------------------------------------------------
   */

  if (summary.averagePrice > 0) {
    insights.push({
      id: "average-price",

      type: "average-price",

      severity: "info",

      value: summary.averagePrice,

      metricType: "currency",

      valueLabel: "Average Market Price",

      title: "Market Price Overview",

      description:
        "The average market price provides a useful benchmark for evaluating current offers.",

      recommendationText:
        "Use the market average as a reference when deciding whether an offer represents good value.",
    });
  }

  return insights;
}
