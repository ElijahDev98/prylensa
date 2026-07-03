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
        h-16
        items-center
        justify-between
        gap-6
        border-b
        border-slate-200
        bg-white
        px-6
      "
    >
      <HeaderSearch />

      <HeaderActions />
    </header>
  );
}

export default AppHeader;
