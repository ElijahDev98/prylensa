/**
 * -----------------------------------------------------------------------------
 * File: store.types.ts
 * Feature: Store Domain
 *
 * Purpose:
 * Defines the canonical Store model.
 *
 * NOTE:
 * A Store represents an e-commerce platform or retailer.
 * It owns store metadata only.
 * -----------------------------------------------------------------------------
 */

export interface Store {
  /**
   * Unique store identifier.
   */
  id: string;

  /**
   * Display name.
   */
  name: string;

  /**
   * Official website.
   */
  website: string;

  /**
   * Store logo.
   */
  logoUrl: string;

  /**
   * Logo alternative text.
   */
  logoAlt: string;

  /**
   * Trust score used by the comparison engine.
   *
   * Range:
   * 0 - 100
   */
  trustScore: number;

  /**
   * Average customer rating.
   *
   * Range:
   * 0 - 5
   */
  rating: number;

  /**
   * Number of customer reviews.
   */
  reviewCount: number;

  /**
   * Whether the retailer is officially verified.
   */
  verified: boolean;
}
