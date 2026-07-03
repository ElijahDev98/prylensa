/**
 * -----------------------------------------------------------------------------
 * File: SidebarBrand.tsx
 * Feature: Sidebar
 *
 * Purpose:
 * Displays the Priciq branding inside the application sidebar.
 *
 * Responsibilities:
 * - Render the application logo.
 * - Render the product name.
 * - Render the product tagline.
 *
 * Dependencies:
 * - BRAND
 *
 * Used By:
 * - AppSidebar
 * -----------------------------------------------------------------------------
 */

// -----------------------------------------------------------------------------
// Imports
// -----------------------------------------------------------------------------

import { BRAND } from "@/assets/branding/brand";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export interface SidebarBrandProps {
  className?: string;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

function SidebarBrand({ className = "" }: SidebarBrandProps) {
  return (
    <header
      className={`flex items-center gap-3 border-b border-slate-200 px-6 py-5 ${className}`}
    >
      <img
        src={BRAND.logo}
        alt={`${BRAND.name} logo`}
        className="h-11 w-11 rounded-xl object-contain"
      />

      <section className="min-w-0">
        <h1 className="truncate text-lg font-bold tracking-tight text-slate-900">
          {BRAND.name}
        </h1>

        <p className="text-xs text-slate-500">{BRAND.tagline}</p>
      </section>
    </header>
  );
}

export default SidebarBrand;
