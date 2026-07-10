/**
 * -----------------------------------------------------------------------------
 * File: SearchShortcutHint.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays a compact entry point for Search keyboard shortcuts.
 *
 * Responsibilities:
 * - Display shortcut trigger.
 * - Delegate tooltip rendering.
 *
 * Architecture:
 * UI
 *
 * Notes:
 * - Presentation only.
 * -----------------------------------------------------------------------------
 */

import { Keyboard } from "lucide-react";

import SearchShortcutTooltip from "./SearchShortcutTooltip";

function SearchShortcutHint() {
  return (
    <div className="group relative">
      <button
        type="button"
        aria-label="Keyboard shortcuts"
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          bg-white
          px-3
          py-2
          text-sm
          font-medium
          text-slate-600
          transition-colors
          hover:border-blue-500
          hover:text-blue-600
        "
      >
        <Keyboard size={16} />

        <span>Shortcuts</span>
      </button>

      <SearchShortcutTooltip />
    </div>
  );
}

export default SearchShortcutHint;
