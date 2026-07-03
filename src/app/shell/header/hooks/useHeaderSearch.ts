/**
 * -----------------------------------------------------------------------------
 * File: useHeaderSearch.ts
 * Feature: Header
 *
 * Purpose:
 * Encapsulates the Header Search state and behaviour.
 *
 * Future Integration:
 * - Command Palette
 * - Ctrl + K
 * - Search Suggestions
 * - Search History
 * - AI Search
 * -----------------------------------------------------------------------------
 */

import { useCallback, useState } from "react";

import type { UseHeaderSearchReturn } from "../types/header.types";

export function useHeaderSearch(): UseHeaderSearchReturn {
  const [isOpen, setIsOpen] = useState(false);

  const openSearch = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    state: {
      isOpen,
    },
    openSearch,
  };
}
