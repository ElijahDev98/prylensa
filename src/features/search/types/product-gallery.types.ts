/**
 * -----------------------------------------------------------------------------
 * File: product-gallery.types.ts
 * -----------------------------------------------------------------------------
 */

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface ProductGalleryState {
  images: ProductImage[];
  activeImage?: ProductImage;
}

export interface ProductImageViewerProps {
  image?: ProductImage;
}

export interface ProductGalleryProps {
  images: ProductImage[];
}
