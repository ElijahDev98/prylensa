/**
 * -----------------------------------------------------------------------------
 * File: MainLayout.tsx
 * Feature: Application Shell
 *
 * Purpose:
 * Defines the primary application layout for Prylensa.
 *
 * Responsibilities:
 * - Establish the root page structure.
 * - Reserve dedicated regions for the sidebar, header and page content.
 * - Provide a responsive layout foundation for future components.
 *
 * Does NOT:
 * - Fetch data.
 * - Contain business logic.
 * - Handle routing logic.
 *
 * Dependencies:
 * - React Router Outlet
 *
 * Used By:
 * - AppRouter
 * -----------------------------------------------------------------------------
 */

// -----------------------------------------------------------------------------
// Imports
// -----------------------------------------------------------------------------

import { Outlet } from "react-router-dom";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

function MainLayout() {
  return (
    <div
      className="
        min-h-screen
        bg-slate-50
        text-slate-900
      "
    >
      {/* ---------------------------------------------------------------------
          Application Shell
          ------------------------------------------------------------------ */}

      <div
        className="
          flex
          min-h-screen
        "
      >
        {/* ================================================================
            Sidebar Region
            Will render <AppSidebar /> in the next implementation.
           ================================================================ */}

        <aside id="app-sidebar" />

        {/* ================================================================
            Main Region
           ================================================================ */}

        <div
          className="
            flex
            min-h-screen
            flex-1
            flex-col
          "
        >
          {/* --------------------------------------------------------------
              Header Region
              Will render <AppHeader /> later.
             -------------------------------------------------------------- */}

          <header id="app-header" />

          {/* --------------------------------------------------------------
              Main Content Region
             -------------------------------------------------------------- */}

          <main
            id="app-content"
            className="
              flex-1
              overflow-y-auto
            "
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
