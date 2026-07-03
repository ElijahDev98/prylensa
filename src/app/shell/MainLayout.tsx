/**
 * -----------------------------------------------------------------------------
 * File: MainLayout.tsx
 * Feature: Application Shell
 *
 * Purpose:
 * Defines the primary application shell.
 *
 * Responsibilities:
 * - Render the application sidebar.
 * - Render the application header.
 * - Render routed page content.
 * -----------------------------------------------------------------------------
 */

import { Outlet } from "react-router-dom";
import { AppHeader } from "@/app/shell/header";
import { AppSidebar } from "@/app/shell/sidebar";

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* ---------------------------------------------------------------------
          Sidebar
      ---------------------------------------------------------------------- */}
      <aside
        className="
          w-72
          shrink-0
          border-r
          border-slate-200
          bg-white
        "
      >
        <AppSidebar />
      </aside>

      {/* ---------------------------------------------------------------------
          Main Application
      ---------------------------------------------------------------------- */}
      <div className="flex min-h-screen flex-1 flex-col">
        <AppHeader />

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
  );
}

export default MainLayout;
