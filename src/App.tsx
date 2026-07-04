/**
 * -----------------------------------------------------------------------------
 * File: App.tsx
 * Feature: Application Bootstrap
 *
 * Purpose:
 * Root application component.
 *
 * Responsibilities:
 * - Display application loader on startup.
 * - Mount global providers.
 * - Render the application router.
 * -----------------------------------------------------------------------------
 */

import { useEffect, useState } from "react";

import AppLoader from "@/components/ui/loading/AppLoader";

import AppProviders from "@/app/providers/AppProviders";
import AppRouter from "./app/router/AppRouter";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => window.clearTimeout(timer);
  }, []);

  if (loading) {
    return <AppLoader />;
  }

  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
