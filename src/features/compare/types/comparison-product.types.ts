/**
 * -----------------------------------------------------------------------------
 * File: comparison-product.types.ts
 * Feature: Compare
 *
 * Purpose:
 * Domain model representing a selected comparison product.
 *
 * Responsibilities:
 * - Define the product information displayed in the comparison header.
 * -----------------------------------------------------------------------------
 */

export interface ComparisonProduct {
  id: string;

  name: string;

  brand: string;

  storage: string;

  rating: number;

  imageUrl?: string;
}
