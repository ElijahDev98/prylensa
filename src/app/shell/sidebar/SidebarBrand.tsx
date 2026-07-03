/**
 * -----------------------------------------------------------------------------
 * File: SidebarBrand.tsx
 *
 * Purpose:
 * Displays the application's branding.
 * -----------------------------------------------------------------------------
 */

import { BRAND } from "@/assets/branding/brand";

function SidebarBrand() {
  return (
    <header
      className="
        border-b
        border-slate-200
        px-6
        py-5
      "
    >
      <section
        className="
          flex
          items-center
          gap-3
        "
      >
        <img
          src={BRAND.logo}
          alt={`${BRAND.name} Logo`}
          className="
            h-11
            w-11
            object-contain
          "
        />

        <section>
          <h1
            className="
              text-lg
              font-bold
              tracking-tight
              text-slate-900
            "
          >
            {BRAND.name}
          </h1>

          <p
            className="
              text-xs
              text-slate-500
            "
          >
            {BRAND.tagline}
          </p>
        </section>
      </section>
    </header>
  );
}

export default SidebarBrand;
