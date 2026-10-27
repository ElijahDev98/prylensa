/**
 * -----------------------------------------------------------------------------
 * File: comparison.mapper.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Maps Product domain entities into Comparison presentation ViewModels.
 *
 * Responsibilities:
 * - Transform Product -> ComparisonProductViewModel.
 * - Keep presentation independent from Product entities.
 *
 * Does NOT:
 * - Execute business logic.
 * - Read React state.
 * -----------------------------------------------------------------------------
 */

import type { Product } from "@/features/product/types/product.types";

import type { ComparisonProductViewModel } from "../viewmodels/comparison-product.viewmodel";

export function toComparisonProductViewModel(
  product: Product,
): ComparisonProductViewModel {
  return {
    id: product.id,

    title: product.title,

    subtitle: product.brand,

    category: product.category,

    imageUrl: product.images[0]?.url ?? "",

    imageAlt: product.images[0]?.alt ?? product.title,

    rating: product.rating,

    reviewCount: product.reviewCount,
  };
}

export function toComparisonProductViewModels(
  products: Product[],
): ComparisonProductViewModel[] {
  return products.map(toComparisonProductViewModel);
}
