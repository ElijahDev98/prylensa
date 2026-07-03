/**
 * -----------------------------------------------------------------------------
 * File: App.tsx
 * Feature: Application Bootstrap
 *
 * Purpose:
 * Root application component.
 *
 * Responsibilities:
 * - Render global providers.
 * - Prepare for router integration.
 * -----------------------------------------------------------------------------
 */

import AppProviders from "./providers/AppProviders";

function App() {
  return (
    <AppProviders>
      <main
        className="
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    bg-slate-50
                "
      >
        <section
          className="
                        text-center
                    "
        >
          <h1
            className="
                            text-4xl
                            font-bold
                            text-slate-900
                        "
          >
            Priciq
          </h1>

          <p
            className="
                            mt-2
                            text-slate-500
                        "
          >
            Application Bootstrap Complete
          </p>
        </section>
      </main>
    </AppProviders>
  );
}

export default App;
