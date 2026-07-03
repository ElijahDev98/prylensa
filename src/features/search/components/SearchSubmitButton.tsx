/**
 * -----------------------------------------------------------------------------
 * File: SearchSubmitButton.tsx
 * Feature: Search
 *
 * Purpose:
 * Primary search action button.
 *
 * Future Enhancements:
 * - Trigger backend search
 * - Loading state
 * - Disable while searching
 * -----------------------------------------------------------------------------
 */

import { Search } from "lucide-react";

function SearchSubmitButton() {
  return (
    <button
      type="submit"
      className="
        flex
        h-14
        items-center
        justify-center
        rounded-2xl
        bg-blue-600
        px-8
        font-medium
        text-white
        transition-colors
        hover:bg-blue-700
      "
    >
      <Search size={18} className="mr-2" />
      Search
    </button>
  );
}

export default SearchSubmitButton;
