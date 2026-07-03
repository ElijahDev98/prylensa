/**
 * -----------------------------------------------------------------------------
 * File: header.types.ts
 * Feature: Header
 * -----------------------------------------------------------------------------
 */

export interface HeaderSearchState {
  isOpen: boolean;
}

export interface UseHeaderSearchReturn {
  state: HeaderSearchState;
  openSearch: () => void;
}
