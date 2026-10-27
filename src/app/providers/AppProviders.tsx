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

import { AuthGate, AuthProvider } from "@/features/auth";
import { ComparisonProvider } from "@/features/comparison/context/ComparisonContext";
import { DashboardProvider } from "@/features/dashboard/context/DashboardContext";
import { PreferencesProvider } from "@/features/settings";

interface AppProvidersProps {
  children: ReactNode;
}

function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <AuthProvider>
        <PreferencesProvider>
          <AuthGate>
            <DashboardProvider>
              <ComparisonProvider>{children}</ComparisonProvider>
            </DashboardProvider>
          </AuthGate>
        </PreferencesProvider>
      </AuthProvider>
    </QueryProvider>
  );
}

export default AppProviders;
