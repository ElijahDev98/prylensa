/**
 * -----------------------------------------------------------------------------
 * File: search.api.ts
 * Feature: Search
 *
 * Temporary API implementation.
 *
 * NOTE:
 * This file represents the API layer.
 * Today it returns mock data.
 * Later it will call the backend without changing the service.
 * -----------------------------------------------------------------------------
 */

import { MOCK_PRODUCTS, type MockProduct } from "../data/products";

export async function fetchProducts(): Promise<MockProduct[]> {
  await new Promise((resolve) => setTimeout(resolve, 250));

  return MOCK_PRODUCTS;
}
