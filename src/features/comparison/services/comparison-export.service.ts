/**
 * -----------------------------------------------------------------------------
 * File: comparison-export.service.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Exports comparison results.
 *
 * Responsibilities:
 * - Build CSV.
 * - Trigger file download.
 *
 * Does NOT:
 * - Render UI.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import type { ComparisonRowViewModel } from "../viewmodels/comparison-row.viewmodel";
import type { ComparisonProductViewModel } from "../viewmodels/comparison-product.viewmodel";
import type { Store } from "@/features/store";

interface ExportComparisonOptions {
  products: ComparisonProductViewModel[];

  rows: ComparisonRowViewModel[];

  stores: Store[];
}

export function exportComparison({
  products,
  rows,
  stores,
}: ExportComparisonOptions): void {
  const csv = buildCsv(products, rows, stores);

  downloadCsv(csv, "comparison.csv");
}
