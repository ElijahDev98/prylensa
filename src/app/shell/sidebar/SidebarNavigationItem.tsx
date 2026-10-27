/**
 * -----------------------------------------------------------------------------
 * File: SidebarNavigationItem.tsx
 *
 * Purpose:
 * Renders a single sidebar navigation item.
 * -----------------------------------------------------------------------------
 */

import { NavLink } from "react-router-dom";
import { ROUTES } from "@/app/router/routes";

import type { SidebarNavigationItem as NavigationItem } from "./sidebar.types";

interface SidebarNavigationItemProps {
  item: NavigationItem;
}

function SidebarNavigationItem({ item }: SidebarNavigationItemProps) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      end={item.path === ROUTES.SEARCH}
      className={({ isActive }) =>
        [
          "flex items-center justify-center rounded-xl px-3 py-3 text-sm font-medium transition-colors lg:justify-start lg:gap-3 lg:px-4",
          isActive
            ? "bg-blue-600 text-white"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        ].join(" ")
      }
    >
      <Icon size={18} />

      <span className="hidden lg:inline">{item.label}</span>
    </NavLink>
  );
}

export default SidebarNavigationItem;
