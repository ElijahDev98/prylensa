/**
 * -----------------------------------------------------------------------------
 * File: ComparisonContext.tsx
 * Feature: Compare
 *
 * Purpose:
 * Provides the Comparison ViewModel to the Compare feature.
 *
 * Responsibilities:
 * - Provide the Comparison ViewModel.
 *
 * Does NOT:
 * - Manage comparison state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import { createContext, PropsWithChildren } from "react";

import type { ComparisonViewModel } from "../types/comparison.viewmodel";

interface ComparisonProviderProps extends PropsWithChildren {
  comparison: ComparisonViewModel;
}

const ComparisonContext = createContext<ComparisonViewModel | null>(null);

function ComparisonProvider({ comparison, children }: ComparisonProviderProps) {
  return (
    <ComparisonContext.Provider value={comparison}>
      {children}
    </ComparisonContext.Provider>
  );
}

export { ComparisonContext, ComparisonProvider };
