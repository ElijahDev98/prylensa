/**
 * -----------------------------------------------------------------------------
 * File: trending-product.types.ts
 * Feature: Dashboard
 *
 * Purpose:
 * Defines the domain model for trending products displayed
 * within the dashboard.
 * -----------------------------------------------------------------------------
 */

export interface TrendingProduct {
  id: string;

  name: string;

  category: string;

  currentPrice: string;

  priceChange: string;

  trend: "up" | "down";

  store: string;

  /**
   * Optional thumbnail.
   *
   * Mock data may omit this value.
   * The API will later provide an image URL.
   */
  thumbnail?: string;
}
