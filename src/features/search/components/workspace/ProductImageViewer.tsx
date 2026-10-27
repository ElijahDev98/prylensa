import ProductImage from "@/components/ui/ProductImage";

import type { ProductImageViewerProps } from "../../types/product-gallery.types";

function ProductImageViewer({ image }: ProductImageViewerProps) {
  if (!image) {
    return (
      <figure
        className="
          flex
          h-full
          w-full
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
        h-full
        w-full
        items-center
        justify-center
        rounded-3xl
        bg-slate-50
        p-6
      "
    >
      <ProductImage
        src={image.url}
        alt={image.alt}
        className="h-full w-auto max-w-full object-contain transition-all duration-300"
        fallbackClassName="h-full w-full rounded-lg"
      />
    </figure>
  );
}

export default ProductImageViewer;
