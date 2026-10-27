/**
 * -----------------------------------------------------------------------------
 * File: layout.ts
 * Design System
 *
 * Purpose:
 * Shared layout tokens.
 * -----------------------------------------------------------------------------
 */

export const LAYOUT = {
  workspace: {
    gap: "gap-6",
  },

  workspacePanel: {
    minHeight: "min-h-[420px]",
    maxHeight: "max-h-none",
    fullHeight: "h-full",
    stretch: "self-stretch",
  },
} as const;
