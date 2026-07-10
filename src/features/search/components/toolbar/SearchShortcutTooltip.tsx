/**
 * -----------------------------------------------------------------------------
 * File: SearchShortcutTooltip.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays available Search keyboard shortcuts.
 *
 * Responsibilities:
 * - Display supported shortcuts.
 * - Educate users about productivity features.
 *
 * Architecture:
 * UI
 *
 * Notes:
 * - Presentation only.
 * -----------------------------------------------------------------------------
 */

const SHORTCUTS = [
  {
    key: "Ctrl + K",
    description: "Focus Search",
  },
  {
    key: "Tab",
    description: "Accept Autocomplete",
  },
  {
    key: "↑ ↓",
    description: "Navigate Suggestions",
  },
  {
    key: "Enter",
    description: "Search",
  },
  {
    key: "Esc",
    description: "Close Suggestions",
  },
];

function SearchShortcutTooltip() {
  return (
    <div
      className="
        invisible
        absolute
        right-0
        top-full
        z-50
        mt-3
        w-72
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        opacity-0
        shadow-xl
        transition-all
        duration-200
        group-hover:visible
        group-hover:opacity-100
        group-focus-within:visible
        group-focus-within:opacity-100
      "
    >
      <h3
        className="
          mb-3
          text-sm
          font-semibold
          text-slate-900
        "
      >
        Keyboard Shortcuts
      </h3>

      <ul className="space-y-2">
        {SHORTCUTS.map((shortcut) => (
          <li
            key={shortcut.key}
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <kbd
              className="
                rounded-md
                border
                border-slate-300
                bg-slate-50
                px-2
                py-1
                text-xs
                font-semibold
                text-slate-700
              "
            >
              {shortcut.key}
            </kbd>

            <span
              className="
                text-sm
                text-slate-600
              "
            >
              {shortcut.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchShortcutTooltip;
