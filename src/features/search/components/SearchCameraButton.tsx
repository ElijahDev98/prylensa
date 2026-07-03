/**
 * -----------------------------------------------------------------------------
 * File: SearchCameraButton.tsx
 * Feature: Search
 *
 * Purpose:
 * Camera search placeholder.
 *
 * Future Enhancements:
 * - Image Upload
 * - Barcode Scanner
 * - OCR Product Recognition
 * -----------------------------------------------------------------------------
 */

import { Camera } from "lucide-react";

function SearchCameraButton() {
  return (
    <button
      type="button"
      aria-label="Search by image"
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        text-slate-500
        transition-colors
        hover:bg-slate-100
        hover:text-slate-700
      "
    >
      <Camera size={20} />
    </button>
  );
}

export default SearchCameraButton;
