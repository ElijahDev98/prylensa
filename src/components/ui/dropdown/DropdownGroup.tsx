/**
 * -----------------------------------------------------------------------------
 * File: DropdownGroup.tsx
 * Layer: Shared UI
 *
 * Purpose:
 * Groups related dropdown items.
 *
 * Responsibilities:
 * - Provide semantic grouping.
 *
 * Does NOT:
 * - Apply business logic.
 * -----------------------------------------------------------------------------
 */

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import type { ComponentPropsWithoutRef } from "react";

type DropdownGroupProps = ComponentPropsWithoutRef<typeof DropdownMenu.Group>;

function DropdownGroup({ children, ...props }: DropdownGroupProps) {
  return <DropdownMenu.Group {...props}>{children}</DropdownMenu.Group>;
}

export default DropdownGroup;
