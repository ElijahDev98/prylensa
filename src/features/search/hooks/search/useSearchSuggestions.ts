/**
 * -----------------------------------------------------------------------------
 * File: useSearchSuggestions.ts
 * Feature: Search
 *
 * Purpose:
 * Encapsulates Search suggestion state and behaviour.
 *
 * Responsibilities:
 * - Generate suggestions.
 * - Track active suggestion.
 * - Navigate suggestions.
 * - Select suggestions.
 * - Clear suggestions.
 *
 * Architecture:
 * UI
 *   ↓
 * Hook
 *   ↓
 * Search Suggestion Service
 *
 * Notes:
 * - UI state only.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import { useCallback, useState } from "react";

import { getSearchSuggestions } from "../../services/search-suggestion.service";

interface UseSearchSuggestionsResult {
  suggestions: string[];

  activeSuggestionIndex: number;

  updateSuggestions(query: string, recentSearches: string[]): void;

  selectSuggestion(suggestion: string, onSelect: (value: string) => void): void;

  moveSuggestionUp(): void;

  moveSuggestionDown(): void;

  clearSuggestions(): void;
}

export default function useSearchSuggestions(): UseSearchSuggestionsResult {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);

  const updateSuggestions = useCallback(
    (query: string, recentSearches: string[]) => {
      setSuggestions(getSearchSuggestions(query, recentSearches));

      setActiveSuggestionIndex(-1);
    },
    [],
  );

  const selectSuggestion = useCallback(
    (suggestion: string, onSelect: (value: string) => void) => {
      onSelect(suggestion);

      setSuggestions([]);

      setActiveSuggestionIndex(-1);
    },
    [],
  );

  const moveSuggestionUp = useCallback(() => {
    setActiveSuggestionIndex((previous) => Math.max(previous - 1, 0));
  }, []);

  const moveSuggestionDown = useCallback(() => {
    setActiveSuggestionIndex((previous) =>
      Math.min(previous + 1, suggestions.length - 1),
    );
  }, [suggestions.length]);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);

    setActiveSuggestionIndex(-1);
  }, []);

  return {
    suggestions,

    activeSuggestionIndex,

    updateSuggestions,

    selectSuggestion,

    moveSuggestionUp,
    moveSuggestionDown,

    clearSuggestions,
  };
}
