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
  allStoreIds: string[],
): ComparisonPreferences {
  const selectedStoreIds =
    preferences.selectedStoreIds.length === 0
      ? allStoreIds
      : preferences.selectedStoreIds;
  const isSelected = selectedStoreIds.includes(storeId);
  const nextSelectedStoreIds = isSelected
    ? selectedStoreIds.filter((id) => id !== storeId)
    : [...selectedStoreIds, storeId];

  return {
    ...preferences,

    // An empty selection is the canonical representation for all stores.
    selectedStoreIds:
      nextSelectedStoreIds.length === allStoreIds.length
        ? []
        : nextSelectedStoreIds,
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

export function setStores(
  preferences: ComparisonPreferences,
  storeIds: string[],
  allStoreIds: string[],
): ComparisonPreferences {
  const validStoreIds = [...new Set(storeIds)].filter((storeId) =>
    allStoreIds.includes(storeId),
  );

  return {
    ...preferences,
    selectedStoreIds:
      validStoreIds.length === allStoreIds.length ? [] : validStoreIds,
  };
}

/**
 * Restores the default comparison preferences.
 */
export function resetComparisonPreferences(): ComparisonPreferences {
  return createComparisonPreferences();
}
