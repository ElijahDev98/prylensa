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

import { useEffect, useMemo, useState } from "react";

import { LAYOUT } from "@/design-system";

import { BestPricePanel } from "../offers";

import ProductGallery from "./ProductGallery";
import ProductInformation from "./ProductInformation";
import ProductIntelligencePanel from "./ProductIntelligencePanel";
import WorkspaceHeader from "./WorkspaceHeader";

import type {
  SearchOfferViewModel,
  SearchResultViewModel,
} from "../../viewmodels/search.viewmodel";

function getStoreKey(offer: SearchOfferViewModel): string {
  const identity = `${offer.storeId} ${offer.storeName}`.toLowerCase();

  for (const marketplace of ["konga", "slot", "jumia", "amazon"]) {
    if (identity.includes(marketplace)) {
      return marketplace;
    }
  }

  return offer.storeId.trim().toLowerCase();
}

function selectStoreMatches(
  offers: SearchOfferViewModel[],
): SearchOfferViewModel[] {
  const matches = new Map<string, SearchOfferViewModel>();

  for (const offer of offers) {
    const storeKey = getStoreKey(offer);
    const current = matches.get(storeKey);

    if (
      !current ||
      (offer.inStock && !current.inStock) ||
      (offer.inStock === current.inStock &&
        offer.currentPrice < current.currentPrice)
    ) {
      matches.set(storeKey, offer);
    }
  }

  return [...matches.values()].sort(
    (left, right) => left.currentPrice - right.currentPrice,
  );
}

interface WorkspaceLayoutProps {
  result: SearchResultViewModel;

  onCompare(productId: string): void;

  onViewComparison(): void;

  isCompared: boolean;

  onViewAllPrices(): void;

  onChangeProduct(): void;
}

function WorkspaceLayout({
  result,
  onCompare,
  onViewComparison,
  isCompared,
  onViewAllPrices,
  onChangeProduct,
}: WorkspaceLayoutProps) {
  const { offers, lowestOffer } = result;
  const storeMatches = useMemo(() => selectStoreMatches(offers), [offers]);
  const matchImages = useMemo(
    () =>
      storeMatches.map((offer) => ({
        id: getStoreKey(offer),
        url: offer.imageUrl,
        alt: `${offer.productTitle} at ${offer.storeName}`,
      })),
    [storeMatches],
  );
  const galleryImages = matchImages.length > 0 ? matchImages : result.images;
  const defaultMatchId = galleryImages[0]?.id ?? "";
  const [activeMatchId, setActiveMatchId] = useState(defaultMatchId);

  useEffect(() => {
    queueMicrotask(() => setActiveMatchId(defaultMatchId));
  }, [defaultMatchId, result.id]);

  const activeMatchIndex = Math.max(
    0,
    galleryImages.findIndex((image) => image.id === activeMatchId),
  );
  const activeMatch =
    storeMatches.find(
      (offer) => getStoreKey(offer) === galleryImages[activeMatchIndex]?.id,
    ) ??
    lowestOffer;

  const selectPreviousMatch = () => {
    const previousImage = galleryImages[activeMatchIndex - 1];
    if (previousImage) {
      setActiveMatchId(previousImage.id);
    }
  };

  const selectNextMatch = () => {
    const nextImage = galleryImages[activeMatchIndex + 1];
    if (nextImage) {
      setActiveMatchId(nextImage.id);
    }
  };

  return (
    <section className="space-y-6">
      <WorkspaceHeader onChangeProduct={onChangeProduct} />

      <ProductIntelligencePanel result={result} />

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
          <ProductGallery
            images={galleryImages}
            activeImageId={galleryImages[activeMatchIndex]?.id ?? ""}
            onSelectImage={setActiveMatchId}
            onPreviousImage={selectPreviousMatch}
            onNextImage={selectNextMatch}
          />
        </div>

        <div
          className={`
            min-w-0
            ${LAYOUT.workspacePanel.stretch}
          `}
        >
          <ProductInformation
            result={result}
            offer={activeMatch}
            matchPosition={storeMatches.length > 0 ? activeMatchIndex + 1 : 0}
            matchCount={storeMatches.length}
            onPreviousMatch={selectPreviousMatch}
            onNextMatch={selectNextMatch}
            onCompare={onCompare}
            onOpenComparison={onViewComparison}
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
