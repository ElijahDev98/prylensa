/**
 * -----------------------------------------------------------------------------
 * File: useSearchFocus.ts
 * Feature: Search
 *
 * Purpose:
 * Centralizes Search input focus management.
 *
 * Responsibilities:
 * - Focus search input on page load.
 * - Restore focus after changing product.
 * - Expose focus helpers.
 *
 * Architecture:
 * UI
 *   ↓
 * Hook
 *
 * Notes:
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import { useCallback, useEffect, useRef } from "react";

export default function useSearchFocus() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusSearch = useCallback(() => {
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  }, []);

  useEffect(() => {
    focusSearch();
  }, [focusSearch]);

  return {
    inputRef,
    focusSearch,
  };
}
