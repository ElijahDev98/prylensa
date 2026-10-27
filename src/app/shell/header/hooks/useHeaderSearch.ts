/**
 * -----------------------------------------------------------------------------
 * File: useHeaderSearch.ts
 * Feature: Header
 *
 * Purpose:
 * Encapsulates the Header Search state and behaviour.
 *
 * -----------------------------------------------------------------------------
 */

import { useCallback, useState } from "react";

import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/app/router/routes";

import type { UseHeaderSearchReturn } from "../types/header.types";

export function useHeaderSearch(): UseHeaderSearchReturn {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const updateQuery = useCallback((nextQuery: string) => {
    setQuery(nextQuery);
  }, []);

  const submitSearch = useCallback(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length === 0) {
      navigate(ROUTES.SEARCH);
      return;
    }

    navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(trimmedQuery)}`);
  }, [navigate, query]);

  return {
    state: {
      query,
    },
    updateQuery,
    submitSearch,
  };
}
