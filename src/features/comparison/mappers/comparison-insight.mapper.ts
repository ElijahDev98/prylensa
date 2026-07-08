/**
 * -----------------------------------------------------------------------------
 * File: comparison-insight.mapper.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Maps Comparison Analysis insights into presentation ViewModels.
 *
 * Responsibilities:
 * - Convert business insight models.
 * - Produce ComparisonInsightViewModels.
 * - Keep presentation independent of business models.
 *
 * Does NOT:
 * - Execute business logic.
 * - Generate insights.
 * - Format UI components.
 * -----------------------------------------------------------------------------
 */

import type { ComparisonInsight } from "../services/comparison-analysis/comparison-types";

import type { ComparisonInsightViewModel } from "../viewmodels/comparison-insight.viewmodel";

/**
 * Maps a single Comparison Insight.
 */
export function toComparisonInsightViewModel(
  insight: ComparisonInsight,
): ComparisonInsightViewModel {
  return {
    id: insight.id,

    severity: insight.severity,

    title: insight.title,

    description: insight.description,

    value: insight.value,

    metricType: insight.metricType,

    valueLabel: insight.valueLabel,

    recommendationText: insight.recommendationText,
  };
}

/**
 * Maps a collection of Comparison Insights.
 */
export function toComparisonInsightViewModels(
  insights: ComparisonInsight[],
): ComparisonInsightViewModel[] {
  return insights.map(toComparisonInsightViewModel);
}
