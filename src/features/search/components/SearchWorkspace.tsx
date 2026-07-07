/**
 * -----------------------------------------------------------------------------
 * File: SearchWorkspace.tsx
 * Feature: Search
 *
 * Purpose:
 * Root container for the Search workspace.
 *
 * Responsibilities:
 * - Render loading, error and empty states.
 * - Pass comparison actions to the workspace layout.
 * -----------------------------------------------------------------------------
 */

import WorkspaceLayout from "./WorkspaceLayout";
import SearchEmpty from "./SearchEmpty";
import SearchError from "./SearchError";
import SearchLoading from "./SearchLoading";

import type { SearchResultViewModel } from "../viewmodels/search.viewmodel";

interface SearchWorkspaceProps {
  result: SearchResultViewModel | null;

  loading: boolean;

  error: string | null;

  onCompare: (productId: string) => void;

  isCompared: boolean;
}

function SearchWorkspace({
  result,
  loading,
  error,
  onCompare,
  isCompared,
}: SearchWorkspaceProps) {
  if (loading) {
    return <SearchLoading />;
  }

  if (error) {
    return <SearchError message={error} />;
  }

  if (!result) {
    return <SearchEmpty />;
  }

  return (
    <section aria-label="Search Results Workspace" className="w-full">
      <WorkspaceLayout
        result={result}
        onCompare={onCompare}
        isCompared={isCompared}
      />
    </section>
  );
}

export default SearchWorkspace;
