/**
 * -----------------------------------------------------------------------------
 * File: AppProviders.tsx
 *
 * Purpose:
 * Aggregates all application-wide providers.
 *
 * Responsibilities:
 * - Configure global providers.
 * - Compose provider hierarchy.
 *
 * Does NOT:
 * - Render application layout.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import type { ReactNode } from "react";

import QueryProvider from "./QueryProvider";

import { ComparisonProvider } from "@/features/comparison/context/ComparisonContext";

interface AppProvidersProps {
  children: ReactNode;
}

function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <ComparisonProvider>{children}</ComparisonProvider>
    </QueryProvider>
  );
}

export default AppProviders;
