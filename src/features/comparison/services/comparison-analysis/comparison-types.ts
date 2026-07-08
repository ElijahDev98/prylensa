/**
 * -----------------------------------------------------------------------------
 * File: comparison-types.ts
 * Feature: Comparison Analysis
 *
 * Purpose:
 * Shared business models used by the Comparison Analysis package.
 *
 * Responsibilities:
 * - Define analytical business models.
 * - Keep models independent of presentation.
 *
 * Does NOT:
 * - Perform calculations.
 * - Render UI.
 * -----------------------------------------------------------------------------
 */

import type { StockStatus } from "@/features/offer";

/**
 * Internal normalized representation.
 *
 * NOTE:
 * This is produced by the Comparison Normalizer and
 * consumed by Metrics, Ranking and Insights.
 */
export interface AnalysisOffer {
  /**
   * Product identifier.
   */
  productId: string;

  /**
   * Store identifier.
   */
  storeId: string;

  /**
   * Current selling price.
   */
  price?: number;

  /**
   * Discount percentage.
   */
  discount?: number;

  /**
   * Current stock availability.
   */
  availability?: StockStatus;
}

/**
 * Aggregated numerical comparison metrics.
 */
export interface ComparisonSummary {
  /**
   * Lowest available price.
   */
  lowestPrice: number;

  /**
   * Highest available price.
   */
  highestPrice: number;

  /**
   * Average market price.
   */
  averagePrice: number;

  /**
   * Difference between highest and lowest price.
   */
  priceSpread: number;

  /**
   * Maximum achievable savings.
   */
  potentialSavings: number;
}

/**
 * Recommended offer produced by the ranking engine.
 */
export interface ComparisonRecommendation {
  /**
   * Recommended offer.
   */
  offer: AnalysisOffer;

  /**
   * Weighted recommendation score.
   */
  score: number;
}

export type ComparisonInsightSeverity = "success" | "info" | "warning";

export type ComparisonInsightType =
  "potential-savings" | "best-offer" | "price-spread" | "average-price";

/**
 * Defines how an insight value should be interpreted.
 *
 * This enables the presentation layer to render
 * values correctly without making business assumptions.
 */
export type ComparisonInsightMetricType = "currency" | "percentage" | "number";

/**
 * Structured business insight.
 *
 * NOTE:
 * Produced by the Comparison Analysis engine.
 * This model represents analytical intelligence,
 * not presentation.
 */
export interface ComparisonInsight {
  /**
   * Stable identifier.
   */
  id: string;

  /**
   * Business insight type.
   */
  type: ComparisonInsightType;

  /**
   * Severity level.
   */
  severity: ComparisonInsightSeverity;

  /**
   * Primary business value.
   */
  value: number;

  /**
   * Describes how the value should be interpreted.
   */
  metricType: ComparisonInsightMetricType;

  /**
   * Human-readable title.
   */
  title: string;

  /**
   * Explanation of the insight.
   */
  description: string;

  /**
   * Label describing the primary value.
   */
  valueLabel: string;

  /**
   * Suggested action for the user.
   */
  recommendationText: string;

  /**
   * Optional recommended offer.
   */
  recommendation?: ComparisonRecommendation;
}

/**
 * Final comparison analysis.
 *
 * Returned by comparison-analysis.service.ts
 */
export interface ComparisonAnalysisResult {
  /**
   * Normalized analytical offers.
   *
   * Exposed intentionally so downstream
   * services never normalize twice.
   */
  offers: AnalysisOffer[];

  /**
   * Aggregated numerical metrics.
   */
  summary: ComparisonSummary;

  /**
   * Best overall recommendation.
   */
  recommendation?: ComparisonRecommendation;

  /**
   * Structured business insights.
   */
  insights: ComparisonInsight[];
}
