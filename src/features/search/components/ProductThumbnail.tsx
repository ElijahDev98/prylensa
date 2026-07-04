/**
 * -----------------------------------------------------------------------------
 * File: ProductThumbnail.tsx
 * Feature: Search
 * -----------------------------------------------------------------------------
 */

import type { ProductImage } from "../types/product-gallery.types";

interface ProductThumbnailProps {
  image: ProductImage;
  isActive: boolean;
  onSelect: (id: string) => void;
}

function ProductThumbnail({
  image,
  isActive,
  onSelect,
}: ProductThumbnailProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(image.id)}
      aria-label={image.alt}
      className={`
        flex-none
        h-16
        w-16
        overflow-hidden
        rounded-2xl
        border
        transition-all
        ${
          isActive
            ? "border-blue-600 ring-2 ring-blue-100"
            : "border-slate-200 hover:border-slate-300"
        }
      `}
    >
      <img
        src={image.url}
        alt={image.alt}
        className="h-full w-full object-cover"
      />
    </button>
  );
}

export default ProductThumbnail;
