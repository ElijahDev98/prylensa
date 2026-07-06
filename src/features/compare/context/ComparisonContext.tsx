/**
 * -----------------------------------------------------------------------------
 * File: ComparisonContext.tsx
 * Feature: Compare
 *
 * Purpose:
 * Provides the Comparison ViewModel for the Compare feature.
 *
 * Responsibilities:
 * - Create comparison state.
 * - Provide comparison state.
 *
 * Does NOT:
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import { createContext } from "react";

import type { PropsWithChildren } from "react";

import useComparisonState from "../hooks/useComparisonState";

import type { ComparisonViewModel } from "../types/comparison.viewmodel";

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
