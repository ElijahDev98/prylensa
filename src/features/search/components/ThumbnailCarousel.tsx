/**
 * -----------------------------------------------------------------------------
 * File: ThumbnailCarousel.tsx
 * Feature: Search
 *
 * Purpose:
 * Wraps the thumbnail list with left and right navigation controls.
 * -----------------------------------------------------------------------------
 */

import { useRef } from "react";

import CarouselButton from "./CarouselButton";
import ProductThumbnailList from "./ProductThumbnailList";

import type { ProductImage } from "../types/product-gallery.types";

interface ThumbnailCarouselProps {
  images: ProductImage[];
  activeImageId: string;
  onSelectImage: (id: string) => void;
}

function ThumbnailCarousel({
  images,
  activeImageId,
  onSelectImage,
}: ThumbnailCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

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
