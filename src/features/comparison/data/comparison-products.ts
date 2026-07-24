/**
 * -----------------------------------------------------------------------------
 * File: comparison-products.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Adapts the shared Product Catalog to the legacy ComparisonProduct shape.
 * -----------------------------------------------------------------------------
 */

import { PRODUCTS } from "@/features/product/data/products";

import type { ComparisonProduct } from "../types/comparison-product.types";

export const COMPARISON_PRODUCTS: ComparisonProduct[] = PRODUCTS.map(
  (product) => ({
    id: product.id,

    name: product.title,

    variant:
      product.specifications.length > 0
        ? product.specifications
            .map((specification) => specification.value)
            .join(" / ")
        : "Standard",

    rating: product.rating,

    reviewCount: product.reviewCount,

    thumbnail: product.images[0]?.url,
  }),
);
