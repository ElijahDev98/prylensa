/**
 * -----------------------------------------------------------------------------
 * File: SidebarFooter.tsx
 * Feature: Sidebar
 *
 * Purpose:
 * Displays application information at the bottom of the sidebar.
 *
 * Responsibilities:
 * - Display application version.
 * - Display copyright.
 * - Provide a placeholder for future system status.
 * -----------------------------------------------------------------------------
 */

import { BRAND } from "@/assets/branding/brand";

function SidebarFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="
        border-t
        border-slate-200
        px-5
        py-4
      "
    >
      <section className="space-y-1 text-center">
        <p className="text-xs font-medium text-slate-700">
          {BRAND.name} v0.1.0
        </p>

        <p className="text-xs text-slate-500">
          © {currentYear} {BRAND.name}
        </p>
      </section>
    </footer>
  );
}

export default SidebarFooter;
