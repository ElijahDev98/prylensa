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
 * - Return the best completion.
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

import { getProducts } from "@/features/product";

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

/**
 * Returns the best inline autocomplete.
 */
export function getAutocomplete(query: string): string | null {
  const keyword = normalize(query);

  if (keyword.length < 2) {
    return null;
  }

  const candidates = getProducts()
    .map((product) => product.title)
    .filter((title) => title.toLowerCase().startsWith(keyword))
    .sort((left, right) => left.localeCompare(right));

  return candidates[0] ?? null;
}
