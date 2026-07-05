/**
 * -----------------------------------------------------------------------------
 * File: CompareHeader.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays the comparison page heading.
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
          text-3xl
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
          text-base
          text-slate-500
        "
      >
        Compare prices, ratings, availability and product information across
        multiple online stores.
      </p>
    </header>
  );
}

export default CompareHeader;
