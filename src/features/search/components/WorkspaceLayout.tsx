/**
 * -----------------------------------------------------------------------------
 * File: WorkspaceLayout.tsx
 * Feature: Search
 *
 * Purpose:
 * Defines the workspace layout.
 * -----------------------------------------------------------------------------
 */

import ProductGallery from "./ProductGallery";
import ProductInformation from "./ProductInformation";
import { PRODUCT_IMAGES } from "../data/products";

function WorkspaceLayout() {
  return (
    <section
      className="
    grid
    gap-6
    xl:grid-cols-[1.05fr_1.35fr_0.85fr]
  "
    >
      <div className="min-w-0">
        <ProductGallery images={PRODUCT_IMAGES} />
      </div>

      <div className="min-w-0">
        <ProductInformation />
      </div>

      <div className="min-w-0">
        <section
          className="
        min-h-[500px]
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
        />
      </div>
    </section>
  );
}

export default WorkspaceLayout;
