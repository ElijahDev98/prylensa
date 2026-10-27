/**
 * -----------------------------------------------------------------------------
 * File: recent-search.storage.ts
 * Feature: Search
 *
 * Purpose:
 * Persists recent searches in Local Storage.
 *
 * Responsibilities:
 * - Save recent searches.
 * - Load recent searches.
 * - Clear recent searches.
 * - Prevent duplicates.
 * - Limit history length.
 * -----------------------------------------------------------------------------
 */

import {
  readMigratedStorageValue,
  removeMigratedStorageValue,
} from "@/shared/utils/migrated-storage";

const STORAGE_KEY = "prylensa.search.recent";
const LEGACY_STORAGE_KEY = "priciq.search.recent";

const MAX_RECENT_SEARCHES = 8;

/**
 * Loads recent searches.
 */
export function loadRecentSearches(): string[] {
  try {
    const value = readMigratedStorageValue(STORAGE_KEY, LEGACY_STORAGE_KEY);

    if (!value) {
      return [];
    }

    const searches = JSON.parse(value);

    return Array.isArray(searches) ? searches : [];
  } catch {
    return [];
  }
}

/**
 * Saves recent searches.
 */
export function saveRecentSearches(searches: string[]): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(searches.slice(0, MAX_RECENT_SEARCHES)),
  );
}

/**
 * Adds a search term.
 */
export function addRecentSearch(searches: string[], query: string): string[] {
  const keyword = query.trim();

  if (!keyword) {
    return searches;
  }

  const updated = [
    keyword,
    ...searches.filter((item) => item.toLowerCase() !== keyword.toLowerCase()),
  ].slice(0, MAX_RECENT_SEARCHES);

  saveRecentSearches(updated);

  return updated;
}

/**
 * Removes one search term while preserving the remaining order.
 */
export function removeRecentSearch(
  searches: string[],
  query: string,
): string[] {
  const updated = searches.filter(
    (item) => item.toLowerCase() !== query.trim().toLowerCase(),
  );

  if (updated.length === 0) {
    clearRecentSearches();
  } else {
    saveRecentSearches(updated);
  }

  return updated;
}

/**
 * Clears all recent searches.
 */
export function clearRecentSearches(): void {
  removeMigratedStorageValue(STORAGE_KEY, LEGACY_STORAGE_KEY);
}
