/**
 * -----------------------------------------------------------------------------
 * File: DropdownTrigger.tsx
 * Layer: Shared UI
 *
 * Purpose:
 * Dropdown trigger.
 * -----------------------------------------------------------------------------
 */

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import type { ComponentPropsWithoutRef } from "react";

type DropdownTriggerProps = ComponentPropsWithoutRef<
  typeof DropdownMenu.Trigger
>;

function DropdownTrigger({ children, ...props }: DropdownTriggerProps) {
  return <DropdownMenu.Trigger {...props}>{children}</DropdownMenu.Trigger>;
}

export default DropdownTrigger;
