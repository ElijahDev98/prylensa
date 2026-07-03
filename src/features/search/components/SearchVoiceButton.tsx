/**
 * -----------------------------------------------------------------------------
 * File: SearchVoiceButton.tsx
 * Feature: Search
 *
 * Purpose:
 * Voice search placeholder.
 *
 * Future Enhancements:
 * - Speech Recognition
 * - Voice Commands
 * -----------------------------------------------------------------------------
 */

import { Mic } from "lucide-react";

function SearchVoiceButton() {
  return (
    <button
      type="button"
      aria-label="Voice search"
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
      <Mic size={20} />
    </button>
  );
}

export default SearchVoiceButton;
