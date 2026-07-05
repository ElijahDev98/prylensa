/**
 * -----------------------------------------------------------------------------
 * File: search.service.ts
 * Feature: Search
 * -----------------------------------------------------------------------------
 */

import { fetchProducts } from "../api/search.api";

import type { MockProduct } from "../data/products";

export async function searchProducts(query: string): Promise<MockProduct[]> {
  const products = await fetchProducts();

  const keyword = query.trim().toLowerCase();

  if (!keyword) {
    return products;
  }

  return products.filter((product) => {
    return (
      product.title.toLowerCase().includes(keyword) ||
      product.brand.toLowerCase().includes(keyword)
    );
  });
}
