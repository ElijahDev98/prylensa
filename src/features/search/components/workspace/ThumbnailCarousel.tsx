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
}

function ThumbnailCarousel({
  images,
  activeImageId,
  onSelectImage,
}: ThumbnailCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) {
      return;
    }

    scrollRef.current.scrollBy({
      left: direction === "left" ? -92 : 92,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-3 flex items-center gap-2">
      <CarouselButton direction="left" onClick={() => scroll("left")} />

      <ProductThumbnailList
        images={images}
        activeImageId={activeImageId}
        onSelectImage={onSelectImage}
        scrollRef={scrollRef}
      />

      <CarouselButton direction="right" onClick={() => scroll("right")} />
    </div>
  );
}

export default ThumbnailCarousel;
