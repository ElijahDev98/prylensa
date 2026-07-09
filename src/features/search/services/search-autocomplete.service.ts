/**
 * -----------------------------------------------------------------------------
 * File: search-autocomplete.service.ts
 * Feature: Search
 *
 * Purpose:
 * Provides autocomplete behavior for the Search feature.
 *
 * Responsibilities:
 * - Resolve the active autocomplete suggestion.
 * - Accept highlighted suggestions.
 * - Navigate suggestion lists.
 *
 * Architecture:
 * UI
 *   ↓
 * Hook
 *   ↓
 * SearchAutocompleteService
 *   ↓
 * SearchSuggestionService
 *
 * Notes:
 * - Contains business logic only.
 * - No React dependencies.
 * -----------------------------------------------------------------------------
 */

export interface AutocompleteState {
  suggestions: string[];
  activeIndex: number;
}

export function moveToPreviousSuggestion(state: AutocompleteState): number {
  if (state.suggestions.length === 0) {
    return -1;
  }

  if (state.activeIndex <= 0) {
    return 0;
  }

  return state.activeIndex - 1;
}

export function moveToNextSuggestion(state: AutocompleteState): number {
  if (state.suggestions.length === 0) {
    return -1;
  }

  if (state.activeIndex >= state.suggestions.length - 1) {
    return state.suggestions.length - 1;
  }

  return state.activeIndex + 1;
}

export function getHighlightedSuggestion(
  state: AutocompleteState,
): string | null {
  if (state.activeIndex < 0 || state.activeIndex >= state.suggestions.length) {
    return null;
  }

  return state.suggestions[state.activeIndex];
}

export function acceptSuggestion(state: AutocompleteState): string | null {
  return getHighlightedSuggestion(state);
}

export function hasSuggestions(state: AutocompleteState): boolean {
  return state.suggestions.length > 0;
}
