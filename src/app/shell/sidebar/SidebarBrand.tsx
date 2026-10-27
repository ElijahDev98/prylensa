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
        px-3
        py-5
        lg:px-6
      "
    >
      <section
        className="
          flex
          items-center
          justify-center
          lg:justify-start
          lg:gap-3
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

        <section className="hidden lg:block">
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
