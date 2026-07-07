/**
 * -----------------------------------------------------------------------------
 * File: ProductLabelCell.tsx
 * Feature: Compare
 * -----------------------------------------------------------------------------
 */

interface ProductLabelCellProps {
  label: string;
}

function ProductLabelCell({ label }: ProductLabelCellProps) {
  return (
    <div
      className="
        sticky
        left-0
        z-20
        flex
        items-center
        border-r
        border-slate-200
        bg-white
        px-6
        py-5
        font-semibold
        text-slate-700
        min-w-55
      "
    >
      {label}
    </div>
  );
}

export default ProductLabelCell;
