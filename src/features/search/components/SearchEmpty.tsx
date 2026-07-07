/**
 * -----------------------------------------------------------------------------
 * File: SearchEmpty.tsx
 * Feature: Search
 *
 * Purpose:
 * Displayed when there is no selected product.
 *
 * Responsibilities:
 * - Inform the user that no product is available.
 * - Encourage searching.
 *
 * Does NOT:
 * - Execute searches.
 * - Own state.
 * -----------------------------------------------------------------------------
 */

function SearchEmpty() {
  return (
    <section
      className="
        flex
        min-h-105
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-slate-300
        bg-white
        px-8
        py-16
        text-center
      "
    >
      <div
        className="
          mb-6
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-slate-100
        "
      >
        🔍
      </div>

      <h2
        className="
          text-xl
          font-semibold
          text-slate-900
        "
      >
        No Product Selected
      </h2>

      <p
        className="
          mt-3
          max-w-md
          text-sm
          leading-6
          text-slate-500
        "
      >
        Search for a product above to view its details, compare prices and
        analyze market information.
      </p>
    </section>
  );
}

export default SearchEmpty;
