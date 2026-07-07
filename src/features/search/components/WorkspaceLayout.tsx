/**
 * -----------------------------------------------------------------------------
 * File: WorkspaceLayout.tsx
 * Feature: Search
 *
 * Purpose:
 * Defines the three-column Search workspace.
 *
 * Responsibilities:
 * - Arrange workspace panels.
 * - Delegate rendering to child components.
 *
 * Does NOT:
 * - Manage state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import { LAYOUT } from "@/design-system";

import BestPricePanel from "./BestPricePanel";
import ProductGallery from "./ProductGallery";
import ProductInformation from "./ProductInformation";

import type { SearchResultViewModel } from "../viewmodels/search.viewmodel";

interface WorkspaceLayoutProps {
  result: SearchResultViewModel;

  onCompare: (productId: string) => void;

  isCompared: boolean;

  onViewAllPrices(): void;
}

function WorkspaceLayout({
  result,
  onCompare,
  isCompared,
  onViewAllPrices,
}: WorkspaceLayoutProps) {
  const { product, offers, lowestOffer } = result;

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
        <ProductInformation
          result={result}
          onCompare={onCompare}
          isCompared={isCompared}
        />
      </div>

      <div className={`min-w-0 ${LAYOUT.workspacePanel.stretch}`}>
        <BestPricePanel
          offers={offers}
          lowestOffer={lowestOffer}
          onViewAllPrices={onViewAllPrices}
        />
      </div>
    </section>
  );
}

export default WorkspaceLayout;
