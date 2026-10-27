/**
 * -----------------------------------------------------------------------------
 * File: HeaderTheme.tsx
 * Feature: Header
 *
 * Purpose:
 * Persistent application theme switch.
 * -----------------------------------------------------------------------------
 */

import { Moon, Sun } from "lucide-react";
import { usePreferences } from "@/features/settings";

function HeaderTheme() {
  const { theme, toggleTheme } = usePreferences();
  const dark = theme === "dark";
  const label = dark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={dark}
      onClick={toggleTheme}
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
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export default HeaderTheme;
