/**
 * -----------------------------------------------------------------------------
 * File: index.ts
 * Feature: Comparison Analysis
 *
 * Purpose:
 * Public entry point for the Comparison Analysis package.
 *
 * Responsibilities:
 * - Expose the package public API.
 *
 * Does NOT:
 * - Expose internal implementation details.
 * -----------------------------------------------------------------------------
 */

export { analyzeComparison } from "./comparison-analysis.service";

export type {
  ComparisonAnalysisResult,
  ComparisonSummary,
  ComparisonRecommendation,
  ComparisonInsight,
} from "./comparison-types";
