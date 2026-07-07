/**
 * -----------------------------------------------------------------------------
 * File: comparison-products.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Adapts the shared Product Catalog to the Comparison Domain.
 *
 * Responsibilities:
 * - Transform shared Product models into ComparisonProduct models.
 *
 * Does NOT:
 * - Duplicate product data.
 * - Contain business logic.
 * -----------------------------------------------------------------------------
 */

import { MOCK_PRODUCTS } from "@/features/product/data/products";

import type { ComparisonProduct } from "../types/comparison-product.types";

export const COMPARISON_PRODUCTS: ComparisonProduct[] = MOCK_PRODUCTS.map(
  (product) => ({
    id: product.id,

    name: product.title,

    variant:
      product.features.length > 0
        ? product.features.map((feature) => feature.label).join(" • ")
        : "Standard",

    rating: product.rating,

    reviewCount: product.reviews,
  }),
);
