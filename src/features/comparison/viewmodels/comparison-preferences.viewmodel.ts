/**
 * -----------------------------------------------------------------------------
 * File: comparison-preferences.viewmodel.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Defines the public API exposed by the Comparison Preferences feature.
 *
 * Responsibilities:
 * - Expose preference state.
 * - Expose preference actions.
 *
 * Does NOT:
 * - Contain implementation.
 * -----------------------------------------------------------------------------
 */

import type {
  AvailabilityFilter,
  ComparisonSortOption,
} from "../types/comparison-preferences.types";

export interface ComparisonPreferencesViewModel {
  /**
   * Active sorting option.
   */
  sortBy: ComparisonSortOption;

  /**
   * Selected stores.
   */
  selectedStoreIds: string[];

  /**
   * Availability filter.
   */
  availability: AvailabilityFilter;

  /**
   * Updates the sorting option.
   */
  setSort(sortBy: ComparisonSortOption): void;

  /**
   * Toggles a store filter.
   */
  toggleStore(storeId: string): void;

  /**
   * Clears all selected stores.
   */
  clearStores(): void;

  /**
   * Updates the availability filter.
   */
  setAvailability(availability: AvailabilityFilter): void;

  /**
   * Restores the default preferences.
   */
  resetPreferences(): void;
}
