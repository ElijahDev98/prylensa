/**
 * -----------------------------------------------------------------------------
 * File: AppHeader.tsx
 * Feature: Application Shell
 *
 * Purpose:
 * Root application header.
 *
 * Responsibilities:
 * - Render the search trigger.
 * - Render the header action controls.
 * -----------------------------------------------------------------------------
 */

import HeaderActions from "./components/HeaderActions";
import HeaderSearch from "./components/HeaderSearch";

function AppHeader() {
  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        min-h-16
        items-center
        justify-between
        gap-3
        border-b
        border-slate-200
        bg-white
        px-4
        py-3
        sm:gap-6
        sm:px-6
      "
    >
      <div className="hidden min-w-0 flex-1 md:block">
        <HeaderSearch />
      </div>

      <HeaderActions />
    </header>
  );
}

export default AppHeader;
