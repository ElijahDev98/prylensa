/**
 * -----------------------------------------------------------------------------
 * File: comparison-insight.viewmodel.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Presentation model for comparison insights.
 * -----------------------------------------------------------------------------
 */

export interface ComparisonInsightViewModel {
  id: string;

  title: string;

  description: string;

  severity: "info" | "success" | "warning";
}

/**
 * Empty insights collection.
 */
export const EMPTY_INSIGHTS: ComparisonInsightViewModel[] = [];
