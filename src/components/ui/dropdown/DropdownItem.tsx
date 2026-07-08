/**
 * -----------------------------------------------------------------------------
 * File: DropdownItem.tsx
 * Layer: Shared UI
 *
 * Purpose:
 * Reusable dropdown action item.
 *
 * Responsibilities:
 * - Render a clickable dropdown item.
 * - Apply consistent styling.
 * - Support disabled state.
 *
 * Does NOT:
 * - Execute feature logic.
 * -----------------------------------------------------------------------------
 */

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import type { ComponentPropsWithoutRef } from "react";

type DropdownItemProps = ComponentPropsWithoutRef<typeof DropdownMenu.Item>;

function DropdownItem({
  className = "",
  children,
  ...props
}: DropdownItemProps) {
  return (
    <DropdownMenu.Item
      {...props}
      className={`
        flex
        cursor-pointer
        select-none
        items-center
        gap-3
        rounded-xl
        px-3
        py-2.5
        text-sm
        font-medium
        text-slate-700
        outline-none
        transition-colors

        hover:bg-slate-100
        focus:bg-slate-100

        data-[disabled]:pointer-events-none
        data-[disabled]:opacity-50

        ${className}
      `}
    >
      {children}
    </DropdownMenu.Item>
  );
}

export default DropdownItem;
