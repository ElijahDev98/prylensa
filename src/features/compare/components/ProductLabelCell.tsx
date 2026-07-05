/**
 * -----------------------------------------------------------------------------
 * File: ProductLabelCell.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays the left label column for the comparison matrix.
 *
 * Responsibilities:
 * - Render the row label.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Render comparison data.
 * -----------------------------------------------------------------------------
 */

interface ProductLabelCellProps {
  label: string;
}

function ProductLabelCell({ label }: ProductLabelCellProps) {
  return (
    <div
      className="
        flex
        items-start
        justify-start
        border-r
        border-slate-200
        p-8
      "
    >
      <span
        className="
          text-lg
          font-semibold
          text-slate-900
        "
      >
        {label}
      </span>
    </div>
  );
}

export default ProductLabelCell;
