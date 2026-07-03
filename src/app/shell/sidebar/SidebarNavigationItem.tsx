/**
 * -----------------------------------------------------------------------------
 * File: SidebarNavigationItem.tsx
 *
 * Purpose:
 * Renders a single sidebar navigation item.
 * -----------------------------------------------------------------------------
 */

import { NavLink } from "react-router-dom";

import type { SidebarNavigationItem as NavigationItem } from "./sidebar.types";

interface SidebarNavigationItemProps {
  item: NavigationItem;
}

function SidebarNavigationItem({ item }: SidebarNavigationItemProps) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
          isActive
            ? "bg-blue-600 text-white"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        ].join(" ")
      }
    >
      <Icon size={18} />

      <span>{item.label}</span>
    </NavLink>
  );
}

export default SidebarNavigationItem;
