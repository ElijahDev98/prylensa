/**
 * -----------------------------------------------------------------------------
 * File: search-suggestion.service.ts
 * Feature: Search
 *
 * Purpose:
 * Generates ranked search suggestions from recent searches and products.
 *
 * Responsibilities:
 * - Generate search suggestions.
 * - Prioritize recent searches.
 * - Prioritize prefix matches.
 * - Remove duplicates.
 *
 * Architecture:
 * Hook
 *   ↓
 * Search Suggestion Service
 *
 * Notes:
 * - Pure business logic.
 * - No React dependencies.
 * -----------------------------------------------------------------------------
 */

const MAX_SUGGESTIONS = 8;

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function unique(values: string[]): string[] {
  const seen = new Set<string>();

  return values.filter((value) => {
    const key = normalize(value);

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);

    return true;
  });
}

function rankSuggestions(values: string[], keyword: string): string[] {
  const prefixMatches = values.filter((value) =>
    normalize(value).startsWith(keyword),
  );

  const partialMatches = values.filter(
    (value) =>
      !normalize(value).startsWith(keyword) &&
      normalize(value).includes(keyword),
  );

  return [...prefixMatches, ...partialMatches];
}

export function getSearchSuggestions(
  query: string,
  recentSearches: string[],
): string[] {
  const keyword = normalize(query);

  if (!keyword) {
    return [];
  }

  const suggestions = unique(recentSearches);

  return rankSuggestions(suggestions, keyword).slice(0, MAX_SUGGESTIONS);
}
