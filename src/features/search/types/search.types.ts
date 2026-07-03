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

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}
