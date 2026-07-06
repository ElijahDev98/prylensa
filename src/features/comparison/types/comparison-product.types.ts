/**
 * -----------------------------------------------------------------------------
 * File: comparison-product.types.ts
 * Feature: Compare
 * -----------------------------------------------------------------------------
 */

export interface ComparisonProduct {
  id: string;

  name: string;

  variant: string;

  rating: number;

  reviewCount: number;

  thumbnail?: string;
}
