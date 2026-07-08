/**
 * -----------------------------------------------------------------------------
 * File: comparison-preferences.types.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Defines user-controlled comparison preferences.
 *
 * Responsibilities:
 * - Describe comparison preference state.
 *
 * Does NOT:
 * - Contain business logic.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

export type ComparisonSortOption =
  | "price-ascending"
  | "price-descending"
  | "discount-descending"
  | "alphabetical";

export type AvailabilityFilter = "all" | "in-stock" | "out-of-stock";

export interface ComparisonPreferences {
  /**
   * Active sorting option.
   */
  sortBy: ComparisonSortOption;

  /**
   * Visible stores.
   * Empty = all stores.
   */
  selectedStoreIds: string[];

  /**
   * Availability filter.
   */
  availability: AvailabilityFilter;
}
