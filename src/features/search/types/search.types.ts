/**
 * -----------------------------------------------------------------------------
 * File: search.types.ts
 * Feature: Search
 *
 * Purpose:
 * Shared types for the Search feature.
 * -----------------------------------------------------------------------------
 */

export interface SearchState {
  query: string;
}

export interface UseSearchReturn {
  state: SearchState;
  updateQuery: (value: string) => void;
}
