/**
 * -----------------------------------------------------------------------------
 * File: useKeyboardShortcuts.ts
 * Feature: Search
 *
 * Purpose:
 * Centralizes Search keyboard shortcuts.
 *
 * Responsibilities:
 * - Register global shortcuts.
 * - Delegate shortcut actions.
 *
 * Supported:
 * - Ctrl + K
 * - Escape
 *
 * Notes:
 * - UI interaction only.
 * -----------------------------------------------------------------------------
 */

import { useEffect } from "react";

interface UseKeyboardShortcutsProps {
  onFocusSearch(): void;

  onEscape?(): void;
}

export default function useKeyboardShortcuts({
  onFocusSearch,
  onEscape,
}: UseKeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      /**
       * Ctrl + K
       */
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();

        onFocusSearch();

        return;
      }

      /**
       * Escape
       */
      if (event.key === "Escape") {
        onEscape?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onEscape, onFocusSearch]);
}
