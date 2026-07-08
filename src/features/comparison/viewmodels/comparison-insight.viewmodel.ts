/**
 * -----------------------------------------------------------------------------
 * File: comparison-insight.viewmodel.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Presentation model for AI comparison insights.
 *
 * Responsibilities:
 * - Expose comparison insights to the presentation layer.
 * - Keep UI independent from business models.
 *
 * Does NOT:
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

export type ComparisonInsightSeverity = "success" | "info" | "warning";

/**
 * Describes how the insight value should be presented.
 */
export type ComparisonInsightMetricType = "currency" | "percentage" | "number";

export interface ComparisonInsightViewModel {
  /**
   * Stable identifier.
   */
  id: string;

  /**
   * Severity level.
   */
  severity: ComparisonInsightSeverity;

  /**
   * Insight heading.
   */
  title: string;

  /**
   * AI explanation.
   */
  description: string;

  /**
   * Primary numerical value.
   */
  value: number;

  /**
   * Defines how the value should be formatted.
   */
  metricType: ComparisonInsightMetricType;

  /**
   * Label describing the value.
   *
   * Example:
   * - Potential Savings
   * - Recommendation Score
   * - Price Spread
   * - Average Market Price
   */
  valueLabel: string;

  /**
   * AI recommendation.
   */
  recommendationText: string;
}

/**
 * Empty insights collection.
 */
export const EMPTY_INSIGHTS: ComparisonInsightViewModel[] = [];
