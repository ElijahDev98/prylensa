/**
 * -----------------------------------------------------------------------------
 * File: WorkspaceLayout.tsx
 * Feature: Search
 *
 * Purpose:
 * Defines the three-column workspace layout.
 * -----------------------------------------------------------------------------
 */

import BestPricePanel from "./BestPricePanel";
import ProductGallery from "./ProductGallery";
import ProductInformation from "./ProductInformation";

import { MOCK_PRODUCT } from "../data/products";

function WorkspaceLayout() {
  return (
    <section
      className="
        grid
        gap-6
        items-stretch
        lg:grid-cols-3
      "
    >
      <div className="min-w-0 h-full">
        <ProductGallery images={MOCK_PRODUCT.images} />
      </div>

      <div className="min-w-0 h-full">
        <ProductInformation product={MOCK_PRODUCT} />
      </div>

      <div className="min-w-0 h-full">
        <BestPricePanel />
      </div>
    </section>
  );
}

export default WorkspaceLayout;
