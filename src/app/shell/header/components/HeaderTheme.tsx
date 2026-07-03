/**
 * -----------------------------------------------------------------------------
 * File: HeaderTheme.tsx
 * Feature: Header
 *
 * Purpose:
 * Theme switch placeholder.
 * -----------------------------------------------------------------------------
 */

import { Moon } from "lucide-react";

interface HeaderThemeProps {
  onClick: () => void;
}

function HeaderTheme({ onClick }: HeaderThemeProps) {
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={onClick}
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-xl
        border
        border-slate-200
        bg-white
        transition-colors
        hover:bg-slate-100
      "
    >
      <Moon size={18} />
    </button>
  );
}

export default HeaderTheme;
