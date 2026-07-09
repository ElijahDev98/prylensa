/**
 * -----------------------------------------------------------------------------
 * File: ProductThumbnailList.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays the horizontal list of product thumbnails.
 *
 * Responsibilities:
 * - Render product thumbnails.
 * - Highlight the active thumbnail.
 * - Delegate thumbnail selection.
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

import type { RefObject } from "react";

import ProductThumbnail from "./ProductThumbnail";

import type { ProductImageViewModel } from "../viewmodels/search.viewmodel";

interface ProductThumbnailListProps {
  images: ProductImageViewModel[];

  activeImageId: string;

  onSelectImage(id: string): void;

  scrollRef: RefObject<HTMLDivElement | null>;
}

function ProductThumbnailList({
  images,
  activeImageId,
  onSelectImage,
  scrollRef,
}: ProductThumbnailListProps) {
  return (
    <div
      ref={scrollRef}
      className="
        flex-1
        overflow-x-auto
        overflow-y-hidden
        whitespace-nowrap
        scrollbar-hide
      "
    >
      <div className="flex items-center gap-2">
        {images.map((image) => (
          <ProductThumbnail
            key={image.id}
            image={image}
            isActive={image.id === activeImageId}
            onSelect={onSelectImage}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductThumbnailList;
