/**
 * -----------------------------------------------------------------------------
 * File: search-autocomplete.service.ts
 * Feature: Search
 *
 * Purpose:
 * Provides Google-style inline autocomplete.
 *
 * Responsibilities:
 * - Complete the user's current query.
 * - Rank autocomplete candidates.
 * - Return the remaining completion (suffix).
 *
 * Architecture:
 * UI
 *   ↓
 * Hook
 *   ↓
 * Autocomplete Service
 *
 * Notes:
 * - No React.
 * - No presentation logic.
 * -----------------------------------------------------------------------------
 */

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * Returns the remaining autocomplete suffix.
 *
 * Example:
 * Query:      "Xiaomi"
 * Match:      "Xiaomi 15 Ultra"
 * Returns:    " 15 Ultra"
 */
export function getAutocomplete(query: string, candidates: string[] = []): string | null {
  const keyword = normalize(query);

  if (keyword.length < 2) {
    return null;
  }

  const bestMatch = candidates
    .filter((title) => normalize(title).startsWith(keyword))
    .sort((left, right) => left.localeCompare(right))[0];

  if (!bestMatch) {
    return null;
  }

  // Exact match — nothing left to autocomplete.
  if (normalize(bestMatch) === keyword) {
    return null;
  }

  // Return only the remaining portion of the suggestion.
  return bestMatch.substring(query.length);
}
