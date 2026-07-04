/**
 * -----------------------------------------------------------------------------
 * File: ProductGallery.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays the product gallery.
 * -----------------------------------------------------------------------------
 */

import ProductImageViewer from "./ProductImageViewer";
import ProductThumbnailList from "./ProductThumbnailList";

import { useProductGallery } from "../hooks/useProductGallery";

import type { ProductGalleryProps } from "../types/product-gallery.types";

function ProductGallery({ images }: ProductGalleryProps) {
  const {
    activeImage,
    images: galleryImages,
    setActiveImageId,
  } = useProductGallery(images);

  return (
    <section
      className="
        flex
        min-w-0
        min-h-[500px]
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="flex-1 min-h-0">
        <ProductImageViewer image={activeImage} />
      </div>

      <ProductThumbnailList
        images={galleryImages}
        activeImageId={activeImage?.id ?? ""}
        onSelectImage={setActiveImageId}
      />
    </section>
  );
}

export default ProductGallery;
