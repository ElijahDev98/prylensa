/**
 * -----------------------------------------------------------------------------
 * File: SearchResultList.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays the available search results.
 *
 * Responsibilities:
 * - Render search results.
 * - Highlight the selected product.
 * - Notify parent when a product is selected.
 *
 * Does NOT:
 * - Fetch data.
 * - Own state.
 * - Execute searches.
 * -----------------------------------------------------------------------------
 */

import type { MockProduct } from "../data/products";

interface SearchResultListProps {
  products: MockProduct[];

  selectedProduct: MockProduct | null;

  onSelectProduct: (product: MockProduct) => void;
}

function SearchResultList({
  products,
  selectedProduct,
  onSelectProduct,
}: SearchResultListProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Search Results"
      className="
        flex
        flex-col
        gap-3
      "
    >
      {products.map((product) => {
        const isSelected = selectedProduct?.id === product.id;

        return (
          <button
            key={product.id}
            type="button"
            onClick={() => onSelectProduct(product)}
            className={`
              w-full
              rounded-xl
              border
              p-4
              text-left
              transition-all
              duration-200

              ${
                isSelected
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
              }
            `}
          >
            <div className="font-semibold text-slate-900">{product.title}</div>

            <div className="mt-1 text-sm text-slate-500">{product.brand}</div>

            <div className="mt-2 font-medium text-blue-600">
              ₦{product.currentPrice.toLocaleString()}
            </div>
          </button>
        );
      })}
    </section>
  );
}

export default SearchResultList;
