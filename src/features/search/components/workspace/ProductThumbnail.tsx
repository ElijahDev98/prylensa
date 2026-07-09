/**
 * -----------------------------------------------------------------------------
 * File: ProductThumbnail.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays a single product thumbnail.
 *
 * Responsibilities:
 * - Render a thumbnail image.
 * - Highlight the active thumbnail.
 * - Notify the parent when selected.
 *
 * Architecture:
 * UI
 *   ↓
 * ProductImageViewModel
 *
 * Notes:
 * - Pure presentation component.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import type { ProductImageViewModel } from "../viewmodels/search.viewmodel";

interface ProductThumbnailProps {
  image: ProductImageViewModel;

  isActive: boolean;

  onSelect(id: string): void;
}

function ProductThumbnail({
  image,
  isActive,
  onSelect,
}: ProductThumbnailProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(image.id)}
      aria-label={image.alt}
      className={`
        flex-none
        h-12
        w-12
        overflow-hidden
        rounded-2xl
        border
        transition-all
        duration-200

        ${
          isActive
            ? "border-blue-600 ring-2 ring-blue-100"
            : "border-slate-200 hover:border-slate-300"
        }
      `}
    >
      <img
        src={image.url}
        alt={image.alt}
        className="h-full w-full object-cover"
      />
    </button>
  );
}

export default ProductThumbnail;
