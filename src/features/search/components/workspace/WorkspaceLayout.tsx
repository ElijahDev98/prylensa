/**
 * -----------------------------------------------------------------------------
 * File: WorkspaceLayout.tsx
 * Feature: Search
 *
 * Purpose:
 * Defines the Search workspace layout.
 *
 * Responsibilities:
 * - Display the workspace header.
 * - Arrange workspace panels.
 * - Delegate rendering to child components.
 *
 * Architecture:
 * UI
 *   ↓
 * SearchResultViewModel
 *
 * Notes:
 * - Pure layout component.
 * - Must never access Product domain models.
 * - Must never execute business logic.
 * -----------------------------------------------------------------------------
 */

import { LAYOUT } from "@/design-system";

import { BestPricePanel } from "../offers";

import ProductGallery from "./ProductGallery";
import ProductInformation from "./ProductInformation";
import WorkspaceHeader from "./WorkspaceHeader";

import type { SearchResultViewModel } from "../../viewmodels/search.viewmodel";

interface WorkspaceLayoutProps {
  result: SearchResultViewModel;

  onCompare(productId: string): void;

  isCompared: boolean;

  onViewAllPrices(): void;

  onChangeProduct(): void;
}

function WorkspaceLayout({
  result,
  onCompare,
  isCompared,
  onViewAllPrices,
  onChangeProduct,
}: WorkspaceLayoutProps) {
  const { title, images, offers, lowestOffer } = result;

  return (
    <section className="space-y-6">
      <WorkspaceHeader title={title} onChangeProduct={onChangeProduct} />

      <section
        className={`
          grid
          ${LAYOUT.workspace.gap}
          items-stretch
          lg:grid-cols-3
        `}
      >
        <div
          className={`
            min-w-0
            ${LAYOUT.workspacePanel.stretch}
          `}
        >
          <ProductGallery images={images} />
        </div>

        <div
          className={`
            min-w-0
            ${LAYOUT.workspacePanel.stretch}
          `}
        >
          <ProductInformation
            result={result}
            onCompare={onCompare}
            isCompared={isCompared}
          />
        </div>

        <div
          className={`
            min-w-0
            ${LAYOUT.workspacePanel.stretch}
          `}
        >
          <BestPricePanel
            offers={offers}
            lowestOffer={lowestOffer}
            onViewAllPrices={onViewAllPrices}
          />
        </div>
      </section>
    </section>
  );
}

export default WorkspaceLayout;
