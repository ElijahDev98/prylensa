/**
 * -----------------------------------------------------------------------------
 * File: WorkspaceHeader.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays the workspace header.
 *
 * Responsibilities:
 * - Display the selected product.
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

import { ArrowLeft } from "lucide-react";

interface WorkspaceHeaderProps {
  title: string;

  onChangeProduct(): void;
}

function WorkspaceHeader({ title, onChangeProduct }: WorkspaceHeaderProps) {
  return (
    <header
      className="
        mb-6
        flex
        items-center
        justify-between
      "
    >
      <div>
        <p
          className="
            text-sm
            font-medium
            uppercase
            tracking-wide
            text-slate-500
          "
        >
          Selected Product
        </p>

        <h2
          className="
            mt-1
            text-2xl
            font-bold
            text-slate-900
          "
        >
          {title}
        </h2>
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
          transition-all
          hover:border-blue-500
          hover:text-blue-600
        "
      >
        <ArrowLeft size={18} />
        Change Product
      </button>
    </header>
  );
}

export default WorkspaceHeader;
