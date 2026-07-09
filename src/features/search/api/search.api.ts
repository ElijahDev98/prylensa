/**
 * -----------------------------------------------------------------------------
 * File: search.api.ts
 * Feature: Search
 *
 * Purpose:
 * Defines the API client for the Search feature.
 *
 * Responsibilities:
 * - Retrieve products from the configured data source.
 * - Abstract data retrieval from the Search Service.
 *
 * Architecture:
 * UI
 *   ↓
 * Hook
 *   ↓
 * Search Service
 *   ↓
 * Search API
 *   ↓
 * Mock Data (Current)
 *   ↓
 * Backend API (Future)
 *
 * Notes:
 * - This implementation currently returns mock data.
 * - It will later be replaced with HTTP requests without affecting the
 *   Search Service or UI.
 * -----------------------------------------------------------------------------
 */

import { MOCK_PRODUCTS, type MockProduct } from "../data/products";

const MOCK_API_DELAY_MS = 250;

/**
 * Retrieves searchable products.
 */
export async function fetchProducts(): Promise<MockProduct[]> {
  await new Promise((resolve) => {
    setTimeout(resolve, MOCK_API_DELAY_MS);
  });

  return MOCK_PRODUCTS;
}
