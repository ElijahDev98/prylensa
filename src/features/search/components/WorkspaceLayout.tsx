/**
 * -----------------------------------------------------------------------------
 * File: WorkspaceLayout.tsx
 * Feature: Search
 *
 * Purpose:
 * Defines the three-column workspace layout.
 * -----------------------------------------------------------------------------
 */

import { LAYOUT } from "@/design-system";

import BestPricePanel from "./BestPricePanel";
import ProductGallery from "./ProductGallery";
import ProductInformation from "./ProductInformation";

import type { MockProduct } from "../data/products";

interface WorkspaceLayoutProps {
  product: MockProduct;
}

function WorkspaceLayout({ product }: WorkspaceLayoutProps) {
  return (
    <section
      className={`
        grid
        ${LAYOUT.workspace.gap}
        items-stretch
        lg:grid-cols-3
      `}
    >
      <div className={`min-w-0 ${LAYOUT.workspacePanel.stretch}`}>
        <ProductGallery images={product.images} />
      </div>

      <div className={`min-w-0 ${LAYOUT.workspacePanel.stretch}`}>
        <ProductInformation product={product} />
      </div>

      <div className={`min-w-0 ${LAYOUT.workspacePanel.stretch}`}>
        <BestPricePanel />
      </div>
    </section>
  );
}

export default WorkspaceLayout;
