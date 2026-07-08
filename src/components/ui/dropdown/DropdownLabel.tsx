/**
 * -----------------------------------------------------------------------------
 * File: DropdownLabel.tsx
 * Layer: Shared UI
 *
 * Purpose:
 * Displays a section label inside a dropdown.
 *
 * Responsibilities:
 * - Display non-interactive headings.
 * - Maintain consistent spacing.
 *
 * Does NOT:
 * - Handle interactions.
 * -----------------------------------------------------------------------------
 */

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import type { ComponentPropsWithoutRef } from "react";

type DropdownLabelProps = ComponentPropsWithoutRef<typeof DropdownMenu.Label>;

function DropdownLabel({
  className = "",
  children,
  ...props
}: DropdownLabelProps) {
  return (
    <DropdownMenu.Label
      {...props}
      className={`
        px-3
        py-2
        text-xs
        font-semibold
        uppercase
        tracking-wide
        text-slate-500
        ${className}
      `}
    >
      {children}
    </DropdownMenu.Label>
  );
}

export default DropdownLabel;
