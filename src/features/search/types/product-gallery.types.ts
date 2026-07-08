/**
 * -----------------------------------------------------------------------------
 * File: product-gallery.types.ts
 * Feature: Search
 *
 * Purpose:
 * Shared types for the Product Gallery presentation components.
 *
 * Architecture:
 * UI
 *   ↓
 * ProductImageViewModel
 *
 * Notes:
 * - Do not redefine image models.
 * - Reuse the Search presentation ViewModel.
 * -----------------------------------------------------------------------------
 */

import type { ProductImageViewModel } from "../viewmodels/search.viewmodel";

/**
 * Product gallery state.
 */
export interface ProductGalleryState {
  images: ProductImageViewModel[];

  activeImage?: ProductImageViewModel;
}

/**
 * Product image viewer props.
 */
export interface ProductImageViewerProps {
  image?: ProductImageViewModel;
}

/**
 * Product gallery props.
 */
export interface ProductGalleryProps {
  images: ProductImageViewModel[];
}
