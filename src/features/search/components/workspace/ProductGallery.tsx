/**
 * -----------------------------------------------------------------------------
 * File: ProductGallery.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays the selected product image gallery.
 *
 * Responsibilities:
 * - Display the active product image.
 * - Display thumbnail navigation.
 * - Render controlled matched-store navigation.
 *
 * Architecture:
 * UI
 *   ↓
 * useProductGallery
 *   ↓
 * ProductImageViewModel
 *
 * Notes:
 * - Pure presentation component.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import Card from "@/components/ui/Card";
import { LAYOUT, SPACING } from "@/design-system";

import ProductImageViewer from "./ProductImageViewer";
import ThumbnailCarousel from "./ThumbnailCarousel";

import type { ProductGalleryProps } from "../../types/product-gallery.types";

function ProductGallery({
  images,
  activeImageId,
  onSelectImage,
  onPreviousImage,
  onNextImage,
}: ProductGalleryProps) {
  const activeIndex = Math.max(
    0,
    images.findIndex((image) => image.id === activeImageId),
  );
  const activeImage = images[activeIndex];

  return (
    <Card
      className={`
        flex
        ${LAYOUT.workspacePanel.fullHeight}
        ${LAYOUT.workspacePanel.minHeight}
        ${LAYOUT.workspacePanel.maxHeight}
        flex-col
        ${SPACING.panel}
      `}
    >
      <div
        className="
          flex
          flex-1
          items-center
          justify-center
          overflow-hidden
        "
      >
        <ProductImageViewer image={activeImage} />
      </div>

      <ThumbnailCarousel
        images={images}
        activeImageId={activeImage?.id ?? ""}
        onSelectImage={onSelectImage}
        onPrevious={onPreviousImage}
        onNext={onNextImage}
        canGoPrevious={activeIndex > 0}
        canGoNext={activeIndex < images.length - 1}
      />
    </Card>
  );
}

export default ProductGallery;
