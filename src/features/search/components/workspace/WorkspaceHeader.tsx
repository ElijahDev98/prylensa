/**
 * -----------------------------------------------------------------------------
 * File: WorkspaceHeader.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays the workspace header.
 *
 * Responsibilities:
 * - Display the workspace title.
 * - Allow returning to the search results.
 *
 * Architecture:
 * UI
 *
 * Notes:
 * - Pure presentation component.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import { ArrowLeftRight } from "lucide-react";

interface WorkspaceHeaderProps {
  onChangeProduct(): void;
}

function WorkspaceHeader({ onChangeProduct }: WorkspaceHeaderProps) {
  return (
    <header
      className="
        flex
        items-center
        justify-between
      "
    >
      <div>
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-slate-500
          "
        >
          Selected Product
        </p>
      </div>

      <button
        type="button"
        onClick={onChangeProduct}
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          py-2
          text-sm
          font-medium
          text-slate-700
          transition-colors
          hover:border-blue-500
          hover:text-blue-600
        "
      >
        <ArrowLeftRight size={16} />
        Change Product
      </button>
    </header>
  );
}

export default WorkspaceHeader;
