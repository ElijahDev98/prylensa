/**
 * -----------------------------------------------------------------------------
 * File: SearchWorkspace.tsx
 * Feature: Search
 *
 * Purpose:
 * Root container for the product search workspace.
 *
 * Responsibilities:
 * - Render workspace states.
 * - Compose workspace layout.
 *
 * Future Enhancements:
 * - Loading state
 * - Empty state
 * - Error state
 * - Skeleton loader
 * -----------------------------------------------------------------------------
 */

import WorkspaceLayout from "./WorkspaceLayout";

function SearchWorkspace() {
  return (
    <section aria-label="Search Results Workspace" className="w-full">
      <WorkspaceLayout />
    </section>
  );
}

export default SearchWorkspace;
