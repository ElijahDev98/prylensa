/**
 * -----------------------------------------------------------------------------
 * File: ProductThumbnailList.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays a horizontally scrollable list of product thumbnails.
 * -----------------------------------------------------------------------------
 */

import ProductThumbnail from "./ProductThumbnail";

import type { ProductImage } from "../types/product-gallery.types";

interface ProductThumbnailListProps {
  images: ProductImage[];
  activeImageId: string;
  onSelectImage: (id: string) => void;
}

function ProductThumbnailList({
  images,
  activeImageId,
  onSelectImage,
}: ProductThumbnailListProps) {
  return (
    <nav
      aria-label="Product image thumbnails"
      className="
        mt-5
        flex
        gap-3
        overflow-x-auto
        pb-2
        scrollbar-none
      "
    >
      {images.map((image) => (
        <div key={image.id} className="shrink-0">
          <ProductThumbnail
            image={image}
            isActive={image.id === activeImageId}
            onSelect={onSelectImage}
          />
        </div>
      ))}
    </nav>
  );
}

export default ProductThumbnailList;
