/**
 * -----------------------------------------------------------------------------
 * File: ProductCardActions.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays actions available for a search result.
 * -----------------------------------------------------------------------------
 */

interface ProductCardActionsProps {
  onCompare: () => void;
}

function ProductCardActions({ onCompare }: ProductCardActionsProps) {
  return (
    <div
      className="
        mt-4
        flex
        justify-end
      "
    >
      <button
        type="button"
        onClick={onCompare}
        className="
          rounded-lg
          bg-blue-600
          px-4
          py-2
          text-sm
          font-medium
          text-white
          transition-colors
          hover:bg-blue-700
        "
      >
        Compare
      </button>
    </div>
  );
}

export default ProductCardActions;
