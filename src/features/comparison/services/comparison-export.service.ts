/**
 * -----------------------------------------------------------------------------
 * File: comparison-export.service.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Exports comparison results.
 *
 * Responsibilities:
 * - Generate CSV output.
 * - Download comparison data.
 *
 * Does NOT:
 * - Render UI.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import type { ComparisonProductViewModel } from "../viewmodels/comparison-product.viewmodel";
import type { ComparisonRowViewModel } from "../viewmodels/comparison-row.viewmodel";

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

function buildCsv(
  products: ComparisonProductViewModel[],
  rows: ComparisonRowViewModel[],
  stores: Store[],
): string {
  const lines: string[] = [];

  /**
   * Header
   */
  lines.push(
    ["Attribute", ...products.map((product) => product.title)].join(","),
  );

  /**
   * Rows
   */
  for (const row of rows) {
    const values = row.products.map((product) =>
      buildProductValue(product, stores),
    );

    lines.push([row.label, ...values].join(","));
  }

  return lines.join("\n");
}

function buildProductValue(
  product: ComparisonRowViewModel["products"][number],
  stores: Store[],
): string {
  return product.values
    .map((value) => {
      const store = stores.find((item) => item.id === value.storeId);

      if (!store) {
        return "";
      }

      return `${store.name}: ${String(value.value)}`;
    })
    .join(" | ");
}

function downloadCsv(csv: string, filename: string): void {
  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = filename;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
