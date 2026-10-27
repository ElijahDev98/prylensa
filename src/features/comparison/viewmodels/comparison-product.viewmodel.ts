/**
 * -----------------------------------------------------------------------------
 * File: comparison-product.viewmodel.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Presentation model consumed by the Compare feature.
 *
 * NOTE:
 * This is NOT a business entity.
 * -----------------------------------------------------------------------------
 */

export interface ComparisonProductViewModel {
  /**
   * Product identifier.
   */
  id: string;

  /**
   * Display title.
   */
  title: string;

  /**
   * Display subtitle.
   */
  subtitle: string;

  /**
   * Product category used for a meaningful image fallback.
   */
  category: string;

  /**
   * Primary product image.
   */
  imageUrl: string;

  /**
   * Image alternative text.
   */
  imageAlt: string;

  /**
   * Product rating.
   */
  rating: number;

  /**
   * Number of reviews.
   */
  reviewCount: number;
}
