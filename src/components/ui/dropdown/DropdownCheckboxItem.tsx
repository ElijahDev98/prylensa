/**
 * -----------------------------------------------------------------------------
 * File: DropdownCheckboxItem.tsx
 * Layer: Shared UI
 *
 * Purpose:
 * Reusable dropdown checkbox item.
 *
 * Responsibilities:
 * - Display a selectable menu item.
 * - Display a check indicator.
 * - Apply consistent dropdown styling.
 *
 * Does NOT:
 * - Manage state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { Check } from "lucide-react";

import type { ComponentPropsWithoutRef } from "react";

type DropdownCheckboxItemProps = ComponentPropsWithoutRef<
  typeof DropdownMenu.CheckboxItem
>;

function DropdownCheckboxItem({
  className = "",
  children,
  checked,
  ...props
}: DropdownCheckboxItemProps) {
  return (
    <DropdownMenu.CheckboxItem
      checked={checked}
      {...props}
      className={`
        relative
        flex
        cursor-pointer
        select-none
        items-center
        gap-3
        rounded-xl
        py-2.5
        pl-10
        pr-3
        text-sm
        font-medium
        text-slate-700
        outline-none
        transition-colors

        hover:bg-slate-100
        focus:bg-slate-100

        data-disabled:pointer-events-none
        data-disabled:opacity-50

        ${className}
      `}
    >
      <span
        className="
          absolute
          left-3
          flex
          h-4
          w-4
          items-center
          justify-center
        "
      >
        <DropdownMenu.ItemIndicator>
          <Check size={14} strokeWidth={2.5} />
        </DropdownMenu.ItemIndicator>
      </span>

      {children}
    </DropdownMenu.CheckboxItem>
  );
}

export default DropdownCheckboxItem;
