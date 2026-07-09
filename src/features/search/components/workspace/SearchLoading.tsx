/**
 * -----------------------------------------------------------------------------
 * File: SearchLoading.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays the loading state for the Search workspace.
 *
 * Responsibilities:
 * - Render the SearchSkeleton component.
 *
 * Architecture:
 * UI
 *   ↓
 * SearchSkeleton
 *
 * Notes:
 * - Pure presentation component.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import SearchSkeleton from "./SearchSkeleton";

function SearchLoading() {
  return <SearchSkeleton />;
}

export default SearchLoading;
