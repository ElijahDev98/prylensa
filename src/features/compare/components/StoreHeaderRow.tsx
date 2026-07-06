/**
 * -----------------------------------------------------------------------------
 * File: StoreHeaderRow.tsx
 * Feature: Compare
 *
 * Purpose:
 * Displays the available stores for each compared product.
 *
 * Responsibilities:
 * - Render the stores row within the comparison matrix.
 * - Align store cells with the product columns.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import ProductLabelCell from "./ProductLabelCell";
import StoreHeaderCell from "./StoreHeaderCell";

import { COMPARISON_PRODUCTS } from "../data/comparison-products";
import { STORES } from "../data/stores";

function StoreHeaderRow() {
  return (
    <section
      className="
        grid
        border-b
        border-slate-200
      "
      style={{
        gridTemplateColumns: `140px repeat(${COMPARISON_PRODUCTS.length}, minmax(280px, 1fr))`,
      }}
    >
      {/* ---------------------------------------------------------------------- */}
      {/* Label Column                                                           */}
      {/* ---------------------------------------------------------------------- */}

      <ProductLabelCell label="Stores" />

      {/* ---------------------------------------------------------------------- */}
      {/* Store Columns                                                          */}
      {/* ---------------------------------------------------------------------- */}

      {COMPARISON_PRODUCTS.map((product) => (
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
          {STORES.map((store) => (
            <StoreHeaderCell key={store.id} store={store} />
          ))}
        </div>
      ))}
    </section>
  );
}

export default StoreHeaderRow;
