/**
 * -----------------------------------------------------------------------------
 * File: comparison-insights.ts
 * Feature: Comparison Analysis
 *
 * Purpose:
 * Produces structured business insights.
 * -----------------------------------------------------------------------------
 */

let title: string;

let severity: ComparisonInsight["severity"];

let description: string;

let recommendationText: string;

import type {
  ComparisonInsight,
  ComparisonRecommendation,
  ComparisonSummary,
} from "./comparison-types";

function buildSavingsInsight(
  summary: ComparisonSummary,
): ComparisonInsight | undefined {
  if (summary.potentialSavings <= 0) {
    return undefined;
  }

  if (summary.potentialSavings >= 100_000) {
    title = "Excellent Savings Opportunity";

    description = "The lowest-priced retailer provides a substantial saving over the most expensive current offer.";

    recommendationText =
      "This price difference is substantial. Purchasing from the recommended retailer provides excellent value.";
  } else if (summary.potentialSavings >= 50_000) {
    title = "Good Savings Opportunity";

    description = "Current retailer prices differ enough to create a worthwhile saving opportunity.";

    recommendationText =
      "Compare retailers before checkout to avoid paying significantly more.";
  } else {
    title = "Limited Savings Available";

    severity = "info";

    description =
      "Retail prices are relatively close, resulting in modest savings.";

    recommendationText =
      "Choose the retailer offering the best delivery, warranty or customer experience.";
  }

  return {
    id: "potential-savings",

    type: "potential-savings",

    severity,

    value: summary.potentialSavings,

    metricType: "currency",

    valueLabel: "Potential Savings",

    title,

    description,

    recommendationText,
  };
}

function buildRecommendationInsight(
  recommendation: ComparisonRecommendation,
): ComparisonInsight {
  const score = recommendation.score * 100;

  let title = "Best Available Option";
  let description = "No retailer significantly outperforms the others.";

  let recommendationText =
    "Compare seller reputation and delivery options before purchasing.";

  if (score >= 80) {
    title = "Excellent Buying Opportunity";

    description =
      "The recommended offer clearly outperforms competing retailers across price, discount and availability.";

    recommendationText =
      "This is an excellent time to purchase from the recommended retailer.";
  } else if (score >= 60) {
    title = "Recommended Purchase";

    description =
      "The recommended retailer provides the strongest overall value.";

    recommendationText =
      "Proceed with the recommended retailer for the best balance of price and availability.";
  }

  return {
    id: "best-offer",

    type: "best-offer",

    severity: "success",

    value: score,

    metricType: "percentage",

    valueLabel: "Recommendation Score",

    title,

    description,

    recommendationText,

    recommendation,
  };
}

function buildPriceSpreadInsight(
  summary: ComparisonSummary,
): ComparisonInsight | undefined {
  if (summary.priceSpread <= 0) {
    return undefined;
  }

  let title = "Stable Market Pricing";
  let description = "Retail prices remain relatively consistent.";

  let recommendationText =
    "Choose a retailer based on service quality rather than price.";

  let severity: ComparisonInsight["severity"] = "info";

  if (summary.priceSpread >= 100_000) {
    title = "Significant Price Differences";

    severity = "warning";

    description = "A significant price difference is present across retailers.";

    recommendationText =
      "Always compare prices before purchasing to avoid unnecessary spending.";
  } else if (summary.priceSpread >= 40_000) {
    title = "Moderate Price Variation";

    description = "Retail prices show a moderate difference across marketplaces.";

    recommendationText =
      "Price comparison is recommended before making a purchase.";
  }

  return {
    id: "price-spread",

    type: "price-spread",

    severity,

    value: summary.priceSpread,

    metricType: "currency",

    valueLabel: "Price Spread",

    title,

    description,

    recommendationText,
  };
}

function buildAveragePriceInsight(
  summary: ComparisonSummary,
): ComparisonInsight | undefined {
  if (summary.averagePrice <= 0) {
    return undefined;
  }

  return {
    id: "average-price",

    type: "average-price",

    severity: "info",

    value: summary.averagePrice,

    metricType: "currency",

    valueLabel: "Average Market Price",

    title: "Market Price Benchmark",

    description: "This is the current average selling price across all compared retailers.",

    recommendationText:
      "Use this average as a benchmark when evaluating future offers.",
  };
}

export function buildComparisonInsights(
  summary: ComparisonSummary,
  recommendation?: ComparisonRecommendation,
): ComparisonInsight[] {
  const insights: ComparisonInsight[] = [];

  const savingsInsight = buildSavingsInsight(summary);

  if (savingsInsight) {
    insights.push(savingsInsight);
  }

  if (recommendation) {
    insights.push(buildRecommendationInsight(recommendation));
  }

  const spreadInsight = buildPriceSpreadInsight(summary);

  if (spreadInsight) {
    insights.push(spreadInsight);
  }

  const averageInsight = buildAveragePriceInsight(summary);

  if (averageInsight) {
    insights.push(averageInsight);
  }

  return insights;
}
