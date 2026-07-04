/**
 * -----------------------------------------------------------------------------
 * File: CarouselButton.tsx
 * Feature: Search
 * -----------------------------------------------------------------------------
 */

import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled?: boolean;
}

function CarouselButton({
  direction,
  onClick,
  disabled = false,
}: CarouselButtonProps) {
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous" : "Next"}
      title={direction === "left" ? "Previous" : "Next"}
      className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-full
        border
        border-slate-200
        bg-white
        shadow-sm
        transition
        hover:bg-slate-50
        disabled:cursor-not-allowed
        disabled:opacity-40
      "
    >
      <Icon size={18} />
    </button>
  );
}

export default CarouselButton;
