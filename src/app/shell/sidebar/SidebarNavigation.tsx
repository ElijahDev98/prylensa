/**
 * -----------------------------------------------------------------------------
 * File: SidebarNavigation.tsx
 *
 * Purpose:
 * Renders the application's primary navigation.
 * -----------------------------------------------------------------------------
 */

import { SIDEBAR_NAVIGATION } from "./sidebar.navigation";
import SidebarNavigationItem from "./SidebarNavigationItem";

function SidebarNavigation() {
  return (
    <nav aria-label="Primary Navigation" className="flex flex-col gap-2">
      {SIDEBAR_NAVIGATION.map((item) => (
        <SidebarNavigationItem key={item.id} item={item} />
      ))}
    </nav>
  );
}

export default SidebarNavigation;
