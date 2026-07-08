/**
 * -----------------------------------------------------------------------------
 * File: comparison-analytics.service.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Generates analytics for charts.
 * -----------------------------------------------------------------------------
 */

import type { ComparisonAnalyticsViewModel } from "../viewmodels/comparison-analytics.viewmodel";

import type { ComparisonRowModel } from "../models/comparison-row.model";

export function buildComparisonAnalytics(
  rows: ComparisonRowModel[],
): ComparisonAnalyticsViewModel {
  const priceRow = rows.find((row) => row.id === "price");

  if (!priceRow) {
    return {
      prices: [],
      lowestPrice: 0,
      highestPrice: 0,
      averagePrice: 0,
    };
  }

  const prices = priceRow.products.flatMap((product) =>
    product.values
      .filter(
        (value): value is typeof value & { value: number } =>
          typeof value.value === "number",
      )
      .map((value) => ({
        storeId: value.storeId,
        storeName: value.storeId,
        price: value.value,
      })),
  );

  const values = prices.map((item) => item.price);

  if (values.length === 0) {
    return {
      prices,
      lowestPrice: 0,
      highestPrice: 0,
      averagePrice: 0,
    };
  }

  return {
    prices,

    lowestPrice: Math.min(...values),

    highestPrice: Math.max(...values),

    averagePrice: values.reduce((sum, value) => sum + value, 0) / values.length,
  };
}
