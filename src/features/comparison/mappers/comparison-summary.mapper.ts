/**
 * -----------------------------------------------------------------------------
 * File: comparison-summary.mapper.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Maps Comparison Analysis models into Comparison Summary ViewModels.
 *
 * Responsibilities:
 * - Convert business models into presentation models.
 * - Keep UI independent of analysis models.
 *
 * Does NOT:
 * - Perform calculations.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import type { ComparisonSummary } from "../services/comparison-analysis/comparison-types";

import type { ComparisonSummaryViewModel } from "../viewmodels/comparison-summary.viewmodel";

export function toComparisonSummaryViewModel(
  summary: ComparisonSummary,
  comparedProducts: number,
): ComparisonSummaryViewModel {
  return {
    lowestPrice: summary.lowestPrice,

    highestPrice: summary.highestPrice,

    averagePrice: summary.averagePrice,

    estimatedSavings: summary.potentialSavings,

    comparedProducts,
  };
}
