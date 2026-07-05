/**
 * -----------------------------------------------------------------------------
 * File: CompareHeader.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays the page heading for the Compare feature.
 *
 * Responsibilities:
 * - Display title.
 * - Display supporting description.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

function CompareHeader() {
  return (
    <header
      className="
        flex
        flex-col
        gap-2
      "
    >
      <h1
        className="
          text-4xl
          font-bold
          tracking-tight
          text-slate-900
        "
      >
        Compare Products
      </h1>

      <p
        className="
          max-w-3xl
          text-lg
          leading-relaxed
          text-slate-500
        "
      >
        Compare prices, ratings, availability and product information across
        multiple online stores to find the best deal.
      </p>
    </header>
  );
}

export default CompareHeader;
