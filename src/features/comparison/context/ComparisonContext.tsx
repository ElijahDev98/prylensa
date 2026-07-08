/**
 * -----------------------------------------------------------------------------
 * File: ComparisonContext.tsx
 * Feature: Comparison (Domain)
 *
 * Purpose:
 * Provides the Comparison ViewModel.
 *
 * Responsibilities:
 * - Own comparison state.
 * - Provide comparison context.
 *
 * Does NOT:
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import { createContext } from "react";

import type { PropsWithChildren } from "react";

import useComparisonState from "../hooks/useComparisonState";

import type { ComparisonViewModel } from "../viewmodels/comparison.viewmodel";

const ComparisonContext = createContext<ComparisonViewModel | null>(null);

function ComparisonProvider({ children }: PropsWithChildren) {
  const comparison = useComparisonState();

  return (
    <ComparisonContext.Provider value={comparison}>
      {children}
    </ComparisonContext.Provider>
  );
}

export { ComparisonContext, ComparisonProvider };
