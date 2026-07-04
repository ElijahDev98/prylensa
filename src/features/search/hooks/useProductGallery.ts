/**
 * -----------------------------------------------------------------------------
 * File: useProductGallery.ts
 * Feature: Search
 *
 * Purpose:
 * Manages the state of the product gallery.
 * -----------------------------------------------------------------------------
 */

import { useMemo, useState } from "react";

import type { ProductImage } from "../types/product-gallery.types";

export function useProductGallery(images: ProductImage[]) {
  const [activeImageId, setActiveImageId] = useState(images[0]?.id ?? "");

  const activeImage = useMemo(() => {
    return images.find((image) => image.id === activeImageId) ?? images[0];
  }, [activeImageId, images]);

  return {
    images,
    activeImage,
    setActiveImageId,
  };
}
