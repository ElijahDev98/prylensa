/**
 * -----------------------------------------------------------------------------
 * File: comparison-preferences.service.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Owns the Comparison Preferences state.
 *
 * Responsibilities:
 * - Create preference state.
 * - Update sorting.
 * - Update store filters.
 * - Update availability filter.
 * - Reset preferences.
 *
 * Does NOT:
 * - Execute comparison business logic.
 * - Sort products.
 * - Filter comparison rows.
 * -----------------------------------------------------------------------------
 */

import type {
  AvailabilityFilter,
  ComparisonPreferences,
  ComparisonSortOption,
} from "../types/comparison-preferences.types";

/**
 * Creates the initial comparison preferences.
 */
export function createComparisonPreferences(): ComparisonPreferences {
  return {
    sortBy: "price-ascending",

    selectedStoreIds: [],

    availability: "all",
  };
}

/**
 * Updates the active sorting option.
 */
export function setSort(
  preferences: ComparisonPreferences,
  sortBy: ComparisonSortOption,
): ComparisonPreferences {
  if (preferences.sortBy === sortBy) {
    return preferences;
  }

  return {
    ...preferences,

    sortBy,
  };
}

/**
 * Adds or removes a store filter.
 */
export function toggleStore(
  preferences: ComparisonPreferences,
  storeId: string,
): ComparisonPreferences {
  const isSelected = preferences.selectedStoreIds.includes(storeId);

  return {
    ...preferences,

    selectedStoreIds: isSelected
      ? preferences.selectedStoreIds.filter((id) => id !== storeId)
      : [...preferences.selectedStoreIds, storeId],
  };
}

/**
 * Updates the availability filter.
 */
export function setAvailability(
  preferences: ComparisonPreferences,
  availability: AvailabilityFilter,
): ComparisonPreferences {
  if (preferences.availability === availability) {
    return preferences;
  }

  return {
    ...preferences,

    availability,
  };
}

/**
 * Clears all selected store filters.
 */
export function clearStores(
  preferences: ComparisonPreferences,
): ComparisonPreferences {
  if (preferences.selectedStoreIds.length === 0) {
    return preferences;
  }

  return {
    ...preferences,

    selectedStoreIds: [],
  };
}

/**
 * Restores the default comparison preferences.
 */
export function resetComparisonPreferences(): ComparisonPreferences {
  return createComparisonPreferences();
}
