/**
 * -----------------------------------------------------------------------------
 * File: DropdownItem.tsx
 * Layer: Shared UI
 *
 * Purpose:
 * Reusable dropdown action item.
 *
 * Responsibilities:
 * - Display a dropdown action.
 * - Support optional leading icon.
 * - Support destructive styling.
 * -----------------------------------------------------------------------------
 */

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

type DropdownItemVariant = "default" | "destructive";

interface DropdownItemProps extends ComponentPropsWithoutRef<
  typeof DropdownMenu.Item
> {
  /**
   * Optional icon displayed before the label.
   */
  leftIcon?: ReactNode;

  /**
   * Visual style.
   */
  variant?: DropdownItemVariant;
}

function DropdownItem({
  children,
  leftIcon,
  variant = "default",
  className = "",
  ...props
}: DropdownItemProps) {
  const variantClass =
    variant === "destructive"
      ? `
          text-red-600
          data-[highlighted]:bg-red-50
        `
      : `
          text-slate-700
          data-[highlighted]:bg-slate-100
        `;

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
        outline-none
        transition-colors

        data-disabled:pointer-events-none
        data-disabled:opacity-50

        ${variantClass}

        ${className}
      `}
    >
      {leftIcon && (
        <span
          className="
            flex
            h-4
            w-4
            items-center
            justify-center
            shrink-0
          "
        >
          {leftIcon}
        </span>
      )}

      <span className="flex-1">{children}</span>
    </DropdownMenu.Item>
  );
}

export default DropdownItem;
