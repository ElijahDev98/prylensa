/**
 * -----------------------------------------------------------------------------
 * File: Dropdown.tsx
 * Layer: Shared UI
 *
 * Purpose:
 * Root dropdown component.
 * -----------------------------------------------------------------------------
 */

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import type { PropsWithChildren } from "react";

function Dropdown({ children }: PropsWithChildren) {
  return <DropdownMenu.Root>{children}</DropdownMenu.Root>;
}

export default Dropdown;
