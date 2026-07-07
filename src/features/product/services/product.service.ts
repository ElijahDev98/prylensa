/**
 * -----------------------------------------------------------------------------
 * File: product.service.ts
 * Feature: Product Domain
 *
 * Purpose:
 * Provides read-only access to the shared Product Catalog.
 *
 * Responsibilities:
 * - Return all products.
 * - Return one product.
 * - Return products by IDs.
 *
 * Does NOT:
 * - Manage React state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import { PRODUCTS } from "../data/products";

import type { Product } from "../types/product.types";

export function getProducts(): Product[] {
  return PRODUCTS;
}

export function getProductById(productId: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === productId);
}

export function getProductsByIds(productIds: string[]): Product[] {
  return productIds
    .map(getProductById)
    .filter((product): product is Product => product !== undefined);
}
