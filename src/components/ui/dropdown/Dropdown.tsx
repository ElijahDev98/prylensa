/**
 * -----------------------------------------------------------------------------
 * File: Dropdown.tsx
 * Layer: Shared UI
 *
 * Purpose:
 * Reusable dropdown foundation built on Radix UI.
 *
 * Responsibilities:
 * - Expose reusable dropdown primitives.
 * - Apply shared styling.
 * - Provide a consistent API across the application.
 *
 * Does NOT:
 * - Contain feature-specific logic.
 * -----------------------------------------------------------------------------
 */

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import type { ComponentPropsWithoutRef } from "react";

export const Dropdown = DropdownMenu.Root;

export const DropdownTrigger = DropdownMenu.Trigger;

export const DropdownPortal = DropdownMenu.Portal;

type DropdownContentProps = ComponentPropsWithoutRef<
  typeof DropdownMenu.Content
>;

export function DropdownContent({
  sideOffset = 8,
  align = "end",
  className = "",
  children,
  ...props
}: DropdownContentProps) {
  return (
    <DropdownPortal>
      <DropdownMenu.Content
        sideOffset={sideOffset}
        align={align}
        className={`
          z-50
          min-w-64
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-2
          shadow-xl
          outline-none
          animate-in
          fade-in-0
          zoom-in-95
          ${className}
        `}
        {...props}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownPortal>
  );
}
