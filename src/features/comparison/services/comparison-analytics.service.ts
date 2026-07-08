/**
 * -----------------------------------------------------------------------------
 * File: comparison-analytics.service.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Builds presentation analytics for the Comparison feature.
 *
 * Responsibilities:
 * - Produce product-based chart data.
 * - Calculate aggregate analytics.
 * - Keep presentation independent of UI.
 *
 * Does NOT:
 * - Execute comparison analysis.
 * - Format UI values.
 * -----------------------------------------------------------------------------
 */

import type { Product } from "@/features/product";

import type { ComparisonRowModel } from "../models/comparison-row.model";

import type {
  ComparisonAnalyticsViewModel,
  ComparisonPricePointViewModel,
} from "../viewmodels/comparison-analytics.viewmodel";

export function buildComparisonAnalytics(
  products: Product[],
  rows: ComparisonRowModel[],
): ComparisonAnalyticsViewModel {
  /**
   * ---------------------------------------------------------------------------
   * Resolve the price comparison row.
   * ---------------------------------------------------------------------------
   */

  const priceRow = rows.find((row) => row.id === "price");

  if (!priceRow) {
    return {
      prices: [],
      lowestPrice: 0,
      highestPrice: 0,
      averagePrice: 0,
    };
  }

  /**
   * ---------------------------------------------------------------------------
   * Build one chart point per product.
   * ---------------------------------------------------------------------------
   */

  const prices: ComparisonPricePointViewModel[] = products.flatMap(
    (product) => {
      const comparisonProduct = priceRow.products.find(
        (item) => item.productId === product.id,
      );

      if (!comparisonProduct) {
        return [];
      }

      const numericPrices = comparisonProduct.values
        .map((value) => value.value)
        .filter((value): value is number => typeof value === "number");

      if (numericPrices.length === 0) {
        return [];
      }

      return [
        {
          productId: product.id,

          productName: product.title,

          price: Math.min(...numericPrices),

          isLowest: false,

          isHighest: false,
        },
      ];
    },
  );

  /**
   * ---------------------------------------------------------------------------
   * Aggregate metrics.
   * ---------------------------------------------------------------------------
   */

  const values = prices.map((item) => item.price);

  if (values.length === 0) {
    return {
      prices: [],

      lowestPrice: 0,

      highestPrice: 0,

      averagePrice: 0,
    };
  }

  const lowestPrice = Math.min(...values);

  const highestPrice = Math.max(...values);

  const averagePrice =
    values.reduce((sum, value) => sum + value, 0) / values.length;

  /**
   * ---------------------------------------------------------------------------
   * Decorate chart points.
   * ---------------------------------------------------------------------------
   */

  const decoratedPrices = prices.map((item) => ({
    ...item,

    isLowest: item.price === lowestPrice,

    isHighest: item.price === highestPrice,
  }));

  return {
    prices: decoratedPrices,

    lowestPrice,

    highestPrice,

    averagePrice,
  };
}
