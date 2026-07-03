/**
 * -----------------------------------------------------------------------------
 * File: App.tsx
 * Feature: Application Bootstrap
 *
 * Purpose:
 * Root application component.
 *
 * Responsibilities:
 * - Mount global providers.
 * - Render the application router.
 * -----------------------------------------------------------------------------
 */

import AppProviders from "./providers/AppProviders";
import { AppRouter } from "./router";

function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
