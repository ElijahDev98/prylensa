/**
 * -----------------------------------------------------------------------------
 * File: comparison-analysis.service.ts
 * Feature: Comparison Analysis
 *
 * Purpose:
 * Public entry point for Comparison Intelligence.
 *
 * Responsibilities:
 * - Coordinate comparison analysis.
 * - Delegate work to specialized services.
 *
 * Does NOT:
 * - Normalize directly.
 * - Calculate metrics directly.
 * - Rank offers directly.
 * - Generate insights directly.
 * -----------------------------------------------------------------------------
 */

import type { Store } from "@/features/store/types/store.types";

import type { ComparisonRowModel } from "../../models/comparison-row.model";

import { normalizeComparisonRows } from "./comparison-normalizer";
import { buildComparisonSummary } from "./comparison-metrics";
import { buildRecommendation } from "./comparison-ranking";
import { buildComparisonInsights } from "./comparison-insights";

import type { ComparisonAnalysisResult } from "./comparison-types";

/**
 * Produces a complete comparison analysis.
 */
export function analyzeComparison(
  rows: ComparisonRowModel[],
  stores: Store[],
): ComparisonAnalysisResult {
  /**
   * Step 1
   * Normalize comparison rows.
   */
  const offers = normalizeComparisonRows(rows);

  /**
   * Step 2
   * Calculate summary metrics.
   */
  const summary = buildComparisonSummary(offers);

  /**
   * Step 3
   * Build recommendation.
   */
  const recommendation = buildRecommendation(offers, stores);

  /**
   * Step 4
   * Generate business insights.
   */
  const insights = buildComparisonInsights(summary, recommendation);

  /**
   * Final analysis.
   */
  return {
    offers,

    summary,

    recommendation,

    insights,
  };
}
