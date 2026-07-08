/**
 * -----------------------------------------------------------------------------
 * File: comparison-normalizer.ts
 * Feature: Comparison Analysis
 *
 * Purpose:
 * Converts comparison rows into a normalized analytical structure.
 *
 * Responsibilities:
 * - Normalize comparison rows.
 * - Merge comparison attributes into analytical offers.
 *
 * Does NOT:
 * - Calculate metrics.
 * - Rank offers.
 * - Generate insights.
 * -----------------------------------------------------------------------------
 */

import type { StockStatus } from "@/features/offer";

import type { ComparisonRowModel } from "../../models/comparison-row.model";

import type { AnalysisOffer } from "./comparison-types";

const COMPARISON_ROW_ID = {
  PRICE: "price",
  DISCOUNT: "discount",
  AVAILABILITY: "availability",
} as const;

function isNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function createOfferKey(productId: string, storeId: string): string {
  return `${productId}:${storeId}`;
}

export function normalizeComparisonRows(
  rows: ComparisonRowModel[],
): AnalysisOffer[] {
  const offers = new Map<string, AnalysisOffer>();

  for (const row of rows) {
    for (const product of row.products) {
      for (const storeValue of product.values) {
        const key = createOfferKey(product.productId, storeValue.storeId);

        if (!offers.has(key)) {
          offers.set(key, {
            productId: product.productId,
            storeId: storeValue.storeId,
          });
        }

        const offer = offers.get(key)!;

        switch (row.id) {
          case COMPARISON_ROW_ID.PRICE:
            if (isNumber(storeValue.value)) {
              offer.price = storeValue.value;
            }
            break;

          case COMPARISON_ROW_ID.DISCOUNT:
            if (isNumber(storeValue.value)) {
              offer.discount = storeValue.value;
            }
            break;

          case COMPARISON_ROW_ID.AVAILABILITY:
            offer.availability = storeValue.value as StockStatus;
            break;
        }
      }
    }
  }

  return [...offers.values()];
}
