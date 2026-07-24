/**
 * -----------------------------------------------------------------------------
 * File: useComparisonPreferences.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Owns the Comparison Preference state.
 *
 * Responsibilities:
 * - Manage comparison preferences.
 * - Expose preference state.
 * - Expose preference actions.
 *
 * Does NOT:
 * - Execute comparison business logic.
 * - Sort comparison data.
 * - Filter comparison data.
 * -----------------------------------------------------------------------------
 */

import { useMemo, useState } from "react";

import {
  clearStores,
  createComparisonPreferences,
  resetComparisonPreferences,
  setAvailability as updateAvailability,
  setSort as updateSort,
  toggleStore as updateStoreSelection,
} from "../services/comparison-preferences.service";

import type {
  AvailabilityFilter,
  ComparisonSortOption,
} from "../types/comparison-preferences.types";

import type { ComparisonPreferencesViewModel } from "../viewmodels/comparison-preferences.viewmodel";

function useComparisonPreferences(): ComparisonPreferencesViewModel {
  const [preferences, setPreferences] = useState(createComparisonPreferences);

  const actions = useMemo(
    () => ({
      setSort(sortBy: ComparisonSortOption) {
        setPreferences((previous) => updateSort(previous, sortBy));
      },

      toggleStore(storeId: string) {
        setPreferences((previous) => updateStoreSelection(previous, storeId));
      },

      clearStores() {
        setPreferences((previous) => clearStores(previous));
      },

      setAvailability(availability: AvailabilityFilter) {
        setPreferences((previous) =>
          updateAvailability(previous, availability),
        );
      },

      resetPreferences() {
        setPreferences(resetComparisonPreferences);
      },
    }),
    [],
  );

  return {
    sortBy: preferences.sortBy,

    selectedStoreIds: preferences.selectedStoreIds,

    availability: preferences.availability,

    ...actions,
  };
}

export default useComparisonPreferences;
