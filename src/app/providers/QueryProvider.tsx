/**
 * -----------------------------------------------------------------------------
 * File: QueryProvider.tsx
 *
 * Purpose:
 * Configures TanStack Query for the application.
 * -----------------------------------------------------------------------------
 */

import { type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface QueryProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
    },
  },
});

function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
