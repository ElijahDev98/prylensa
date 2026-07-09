import Card from "@/components/ui/Card";
import { LAYOUT, SPACING } from "@/design-system";

import ProductImageViewer from "./ProductImageViewer";
import ThumbnailCarousel from "./ThumbnailCarousel";

import { useProductGallery } from "../hooks/useProductGallery";

import type { ProductGalleryProps } from "../types/product-gallery.types";

function ProductGallery({ images }: ProductGalleryProps) {
  const {
    activeImage,
    images: galleryImages,
    setActiveImageId,
  } = useProductGallery(images);

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
        images={galleryImages}
        activeImageId={activeImage?.id ?? ""}
        onSelectImage={setActiveImageId}
      />
    </Card>
  );
}

export default ProductGallery;
