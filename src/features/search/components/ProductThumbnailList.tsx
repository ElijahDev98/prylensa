/**
 * -----------------------------------------------------------------------------
 * File: ProductThumbnailList.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays the horizontal list of product thumbnails.
 * -----------------------------------------------------------------------------
 */

import type { RefObject } from "react";

import ProductThumbnail from "./ProductThumbnail";

import type { ProductImage } from "../types/product-gallery.types";

interface ProductThumbnailListProps {
  images: ProductImage[];
  activeImageId: string;
  onSelectImage: (id: string) => void;
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
