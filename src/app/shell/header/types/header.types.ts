/**
 * -----------------------------------------------------------------------------
 * File: header.types.ts
 * Feature: Header
 * -----------------------------------------------------------------------------
 */

export interface HeaderSearchState {
  query: string;
}

export interface UseHeaderSearchReturn {
  state: HeaderSearchState;
  updateQuery: (query: string) => void;
  submitSearch: () => void;
}
