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
        h-full
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
          px-2
          py-4
          lg:px-4
        "
      >
        <SidebarNavigation />
      </section>

      <SidebarFooter />
    </aside>
  );
}

export default AppSidebar;
