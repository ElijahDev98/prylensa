/**
 * -----------------------------------------------------------------------------
 * File: useSearchAutocomplete.ts
 * Feature: Search
 *
 * Purpose:
 * Encapsulates Google-style inline autocomplete.
 *
 * Responsibilities:
 * - Manage autocomplete state.
 * - Produce inline completion.
 * - Accept autocomplete.
 * - Clear autocomplete.
 *
 * Architecture:
 * UI
 *   ↓
 * Hook
 *   ↓
 * Autocomplete Service
 *
 * Notes:
 * - UI state only.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import { useCallback, useState } from "react";

import { getAutocomplete } from "../../services/search-autocomplete.service";
import { loadRecentSearches } from "../../utils/recent-search.storage";

interface UseSearchAutocompleteResult {
  autocomplete: string | null;

  updateAutocomplete(query: string): void;

  acceptAutocomplete(onAccept: (value: string) => void): void;

  clearAutocomplete(): void;
}

export default function useSearchAutocomplete(): UseSearchAutocompleteResult {
  const [autocomplete, setAutocomplete] = useState<string | null>(null);

  const updateAutocomplete = useCallback((query: string) => {
    setAutocomplete(getAutocomplete(query, loadRecentSearches()));
  }, []);

  const acceptAutocomplete = useCallback(
    (onAccept: (value: string) => void) => {
      setAutocomplete((previous) => {
        if (previous) {
          onAccept(previous);
        }

        return null;
      });
    },
    [],
  );

  const clearAutocomplete = useCallback(() => {
    setAutocomplete(null);
  }, []);

  return {
    autocomplete,

    updateAutocomplete,

    acceptAutocomplete,

    clearAutocomplete,
  };
}
