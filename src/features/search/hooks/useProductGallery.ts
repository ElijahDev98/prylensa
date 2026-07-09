/**
 * -----------------------------------------------------------------------------
 * File: useProductGallery.ts
 * Feature: Search
 *
 * Purpose:
 * Manages the presentation state of the Product Gallery.
 *
 * Responsibilities:
 * - Maintain the active image.
 * - Resolve the active image.
 * - Expose gallery state.
 *
 * Architecture:
 * UI
 *   ↓
 * Hook
 *   ↓
 * ProductImageViewModel
 *
 * Notes:
 * - This hook owns gallery UI state only.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import { useMemo, useState } from "react";

import type { ProductImageViewModel } from "../viewmodels/search.viewmodel";

/**
 * Product Gallery hook.
 */
export function useProductGallery(images: ProductImageViewModel[]) {
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
