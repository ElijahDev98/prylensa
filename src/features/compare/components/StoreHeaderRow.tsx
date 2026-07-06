/**
 * -----------------------------------------------------------------------------
 * File: StoreHeaderRow.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays the available stores for each compared product.
 *
 * Responsibilities:
 * - Render the stores row.
 * - Align stores beneath each product.
 *
 * Does NOT:
 * - Import mock data.
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import ProductLabelCell from "./ProductLabelCell";
import StoreHeaderCell from "./StoreHeaderCell";

import type { ComparisonProduct } from "../types/comparison-product.types";
import type { Store } from "../types/store.types";

interface StoreHeaderRowProps {
  products: ComparisonProduct[];
  stores: Store[];
}

function StoreHeaderRow({ products, stores }: StoreHeaderRowProps) {
  return (
    <section
      className="
        grid
        border-b
        border-slate-200
      "
      style={{
        gridTemplateColumns: `140px repeat(${products.length}, minmax(280px, 1fr))`,
      }}
    >
      <ProductLabelCell label="Stores" />

      {products.map((product) => (
        <div
          key={product.id}
          className="
            flex
            items-center
            justify-evenly
            border-r
            border-slate-200
            px-6
            py-5
            last:border-r-0
          "
        >
          {stores.map((store) => (
            <StoreHeaderCell key={store.id} store={store} />
          ))}
        </div>
      ))}
    </section>
  );
}

export default StoreHeaderRow;
