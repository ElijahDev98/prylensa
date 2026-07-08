/**
 * -----------------------------------------------------------------------------
 * File: DropdownContent.tsx
 * Layer: Shared UI
 *
 * Purpose:
 * Dropdown content container.
 * -----------------------------------------------------------------------------
 */

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import type { ComponentPropsWithoutRef } from "react";

type DropdownContentProps = ComponentPropsWithoutRef<
  typeof DropdownMenu.Content
>;

function DropdownContent({
  sideOffset = 8,
  align = "end",
  className = "",
  children,
  ...props
}: DropdownContentProps) {
  return (
    <DropdownMenu.Portal>
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
          ${className}
        `}
        {...props}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}

export default DropdownContent;
