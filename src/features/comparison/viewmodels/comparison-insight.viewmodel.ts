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
   * Label describing the value.
   *
   * Example:
   * - Potential Savings
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
