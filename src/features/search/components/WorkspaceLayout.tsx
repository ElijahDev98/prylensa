/**
 * -----------------------------------------------------------------------------
 * File: WorkspaceLayout.tsx
 * Feature: Search
 *
 * Purpose:
 * Defines the three-column workspace layout.
 *
 * Responsibilities:
 * - Own layout only.
 * - Does not own business logic.
 * -----------------------------------------------------------------------------
 */

function WorkspaceLayout() {
  return (
    <section
      className="
        grid
        gap-6
        xl:grid-cols-[1.05fr_1.35fr_0.85fr]
      "
    >
      {/* ProductGallery */}

      <section
        className="
          h-[520px]
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      />

      {/* ProductInformation */}

      <section
        className="
          h-[520px]
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      />

      {/* BestPricePanel */}

      <section
        className="
          h-[520px]
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
      />
    </section>
  );
}

export default WorkspaceLayout;
