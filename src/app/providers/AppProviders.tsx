/**
 * -----------------------------------------------------------------------------
 * File: AppProviders.tsx
 *
 * Purpose:
 * Aggregates all global providers.
 * -----------------------------------------------------------------------------
 */

import { type ReactNode } from "react";

import QueryProvider from "./QueryProvider";

interface AppProvidersProps {
  children: ReactNode;
}

function AppProviders({ children }: AppProvidersProps) {
  return <QueryProvider>{children}</QueryProvider>;
}

export default AppProviders;
