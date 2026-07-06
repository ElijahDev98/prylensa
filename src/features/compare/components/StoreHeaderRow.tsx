/**
 * -----------------------------------------------------------------------------
 * File: StoreHeaderRow.tsx
 * Feature: Compare (Presentation)
 * -----------------------------------------------------------------------------
 */

import ComparisonRow from "./ComparisonRow";
import ProductLabelCell from "./ProductLabelCell";
import StoreHeaderCell from "./StoreHeaderCell";

import type { ComparisonProduct } from "@/features/comparison/types/comparison-product.types";
import type { Store } from "@/features/comparison/types/store.types";

interface StoreHeaderRowProps {
  products: ComparisonProduct[];
  stores: Store[];
}

function StoreHeaderRow({ products, stores }: StoreHeaderRowProps) {
  return (
    <ComparisonRow productCount={products.length}>
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
    </ComparisonRow>
  );
}

export default StoreHeaderRow;
