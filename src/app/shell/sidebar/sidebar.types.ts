/**
 * -----------------------------------------------------------------------------
 * File: sidebar.types.ts
 *
 * Purpose:
 * Shared sidebar type definitions.
 * -----------------------------------------------------------------------------
 */

import { type LucideIcon } from "lucide-react";

export interface SidebarNavigationItem {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
}
