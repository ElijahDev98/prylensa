/**
 * -----------------------------------------------------------------------------
 * File: ThumbnailCarousel.tsx
 * Feature: Search
 *
 * Purpose:
 * Wraps the product thumbnail list with horizontal navigation controls.
 *
 * Responsibilities:
 * - Render thumbnail navigation.
 * - Manage carousel scrolling.
 * - Delegate thumbnail rendering.
 *
 * Architecture:
 * UI
 *   ↓
 * ProductImageViewModel
 *
 * Notes:
 * - Pure presentation component.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import { useRef } from "react";

import CarouselButton from "../CarouselButton";

import ProductThumbnailList from "./ProductThumbnailList";

import type { ProductImageViewModel } from "../../viewmodels/search.viewmodel";

interface ThumbnailCarouselProps {
  images: ProductImageViewModel[];

  activeImageId: string;

  onSelectImage(id: string): void;

  onPrevious(): void;

  onNext(): void;

  canGoPrevious: boolean;

  canGoNext: boolean;
}

function ThumbnailCarousel({
  images,
  activeImageId,
  onSelectImage,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: ThumbnailCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mt-3 flex items-center gap-2">
      <CarouselButton
        direction="left"
        onClick={onPrevious}
        disabled={!canGoPrevious}
      />

      <ProductThumbnailList
        images={images}
        activeImageId={activeImageId}
        onSelectImage={onSelectImage}
        scrollRef={scrollRef}
      />

      <CarouselButton
        direction="right"
        onClick={onNext}
        disabled={!canGoNext}
      />
    </div>
  );
}

export default ThumbnailCarousel;
