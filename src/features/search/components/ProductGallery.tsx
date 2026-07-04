import Card from "@/components/ui/Card";

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
    <Card className="p-6">
      <div className="flex min-h-0 flex-1">
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
