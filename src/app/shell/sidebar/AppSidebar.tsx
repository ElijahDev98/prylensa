/**
 * -----------------------------------------------------------------------------
 * File: AppSidebar.tsx
 * Feature: Application Shell
 *
 * Purpose:
 * Root sidebar component.
 *
 * Responsibilities:
 * - Render branding.
 * - Render navigation.
 * - Render footer.
 * -----------------------------------------------------------------------------
 */

import SidebarBrand from "./SidebarBrand";
import SidebarFooter from "./SidebarFooter";
import SidebarNavigation from "./SidebarNavigation";

function AppSidebar() {
  return (
    <aside
      className="
        flex
        h-screen
        w-72
        flex-col
        overflow-hidden
        border-r
        border-slate-200
        bg-white
      "
    >
      <SidebarBrand />

      <section
        className="
          flex-1
          overflow-y-auto
          px-4
          py-4
        "
      >
        <SidebarNavigation />
      </section>

      <SidebarFooter />
    </aside>
  );
}

export default AppSidebar;
