/**
 * -----------------------------------------------------------------------------
 * File: search-history.state.ts
 * Feature: Search
 *
 * Purpose:
 * Provides immutable operations for managing Search history state.
 *
 * Responsibilities:
 * - Add recent searches.
 * - Remove duplicates.
 * - Limit history size.
 *
 * Architecture:
 * UI
 *   ↓
 * Hook
 *   ↓
 * State
 *
 * Notes:
 * - Pure functions only.
 * - No React.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

const MAX_RECENT_SEARCHES = 10;

/**
 * Updates the recent search history.
 *
 * @param history Existing search history.
 * @param query Search query.
 * @returns Updated history.
 */
export function updateRecentSearches(
  history: string[],
  query: string,
): string[] {
  const normalized = query.trim();

  if (normalized.length === 0) {
    return history;
  }

  return [
    normalized,
    ...history.filter(
      (item) => item.toLowerCase() !== normalized.toLowerCase(),
    ),
  ].slice(0, MAX_RECENT_SEARCHES);
}
