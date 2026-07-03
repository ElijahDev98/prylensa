/**
 * -----------------------------------------------------------------------------
 * File: MainLayout.tsx
 * Feature: Application Shell
 *
 * Purpose:
 * Defines the primary application shell shared across authenticated pages.
 *
 * Responsibilities:
 * - Render the application structure.
 * - Reserve regions for sidebar and header.
 * - Render nested page content.
 * -----------------------------------------------------------------------------
 */

import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        {/* Sidebar Region */}
        <aside
          className="
            hidden
            w-72
            border-r
            border-slate-200
            bg-white
            lg:block
          "
        >
          {/* AppSidebar will be mounted here */}
        </aside>

        {/* Main Application */}
        <div className="flex min-h-screen flex-1 flex-col">
          {/* Header Region */}
          <header
            className="
              sticky
              top-0
              z-40
              h-16
              border-b
              border-slate-200
              bg-white
            "
          >
            {/* AppHeader will be mounted here */}
          </header>

          {/* Main Content */}
          <main
            id="main-content"
            className="
              flex-1
              overflow-y-auto
              p-6
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
