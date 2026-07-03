/**
 * -----------------------------------------------------------------------------
 * File: useSearch.ts
 * Feature: Search
 *
 * Purpose:
 * Encapsulates search state and behavior.
 *
 * Responsibilities:
 * - Manage the search query state.
 * - Expose actions for updating the query.
 *
 * Dependencies:
 * - React Hooks
 * - Search constants
 * - Search types
 *
 * Future Enhancements:
 * - Debounced search
 * - Search suggestions
 * - Search history
 * - Filter integration
 * - API integration
 * - AI-powered recommendations
 * -----------------------------------------------------------------------------
 */

import { useCallback, useState } from "react";

import { SEARCH_DEFAULTS } from "../constants/search.constants";
import type { UseSearchReturn } from "../types/search.types";

export function useSearch(): UseSearchReturn {
  const [query, setQuery] = useState<string>(SEARCH_DEFAULTS.initialQuery);

  const updateQuery = useCallback((value: string) => {
    setQuery(value);
  }, []);

  return {
    state: {
      query,
    },
    updateQuery,
  };
}
