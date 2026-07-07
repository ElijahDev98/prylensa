/**
 * -----------------------------------------------------------------------------
 * File: search.types.ts
 * Feature: Search
 *
 * Purpose:
 * Shared Search Domain types.
 * -----------------------------------------------------------------------------
 */

import type { SearchResultViewModel } from "../viewmodels/search.viewmodel";

/**
 * ---------------------------------------------------------------------------
 * Feedback
 * ---------------------------------------------------------------------------
 */

export interface SearchFeedback {
  validation?: string;

  warning?: string;

  error?: string;

  success?: string;
}

/**
 * ---------------------------------------------------------------------------
 * Search State
 * ---------------------------------------------------------------------------
 */

export interface SearchState {
  query: string;

  loading: boolean;

  feedback: SearchFeedback;

  results: SearchResultViewModel[];

  selectedResult: SearchResultViewModel | null;
}

/**
 * ---------------------------------------------------------------------------
 * Search Input
 * ---------------------------------------------------------------------------
 */

export interface SearchInputProps {
  value: string;

  onChange(value: string): void;
}
