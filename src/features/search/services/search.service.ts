/**
 * -----------------------------------------------------------------------------
 * File: search.service.ts
 * Feature: Search
 *
 * Purpose:
 * Centralizes all search operations.
 * -----------------------------------------------------------------------------
 */

import { MOCK_PRODUCT } from "../data/products";

import type { MockProduct } from "../data/products";

export async function searchProducts(query: string): Promise<MockProduct[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const products: MockProduct[] = [MOCK_PRODUCT];

  if (!query.trim()) {
    return products;
  }

  const keyword = query.toLowerCase();

  return products.filter(
    (product) =>
      product.title.toLowerCase().includes(keyword) ||
      product.brand.toLowerCase().includes(keyword),
  );
}
