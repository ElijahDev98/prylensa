/**
 * -----------------------------------------------------------------------------
 * File: DropdownSeparator.tsx
 * Layer: Shared UI
 *
 * Purpose:
 * Reusable separator for dropdown menus.
 *
 * Responsibilities:
 * - Visually separate groups of menu items.
 *
 * Does NOT:
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

function DropdownSeparator() {
  return (
    <DropdownMenu.Separator
      className="
        -mx-2
        my-2
        h-px
        bg-slate-200
      "
    />
  );
}

export default DropdownSeparator;
