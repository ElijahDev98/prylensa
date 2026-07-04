/**
 * -----------------------------------------------------------------------------
 * File: ProductImageViewer.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays the active product image.
 * -----------------------------------------------------------------------------
 */

import type { ProductImageViewerProps } from "../types/product-gallery.types";

function ProductImageViewer({ image }: ProductImageViewerProps) {
  if (!image) {
    return (
      <figure
        className="
          flex
          h-[340px]
          items-center
          justify-center
          rounded-3xl
          bg-slate-50
          text-sm
          text-slate-400
        "
      >
        No product image available
      </figure>
    );
  }

  return (
    <figure
      className="
        flex
        h-[340px]
        items-center
        justify-center
        rounded-3xl
        bg-slate-50
        p-6
      "
    >
      <img
        src={image.url}
        alt={image.alt}
        className="
          max-h-full
          w-auto
          object-contain
          transition-all
          duration-300
        "
      />
    </figure>
  );
}

export default ProductImageViewer;
