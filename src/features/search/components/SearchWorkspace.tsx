/**
 * -----------------------------------------------------------------------------
 * File: SearchWorkspace.tsx
 * Feature: Search
 *
 * Purpose:
 * Root container for the Search workspace.
 *
 * Responsibilities:
 * - Render workspace states.
 * - Render the product workspace.
 * - Delegate presentation to dedicated state components.
 *
 * Does NOT:
 * - Execute searches.
 * - Manage state.
 * - Fetch data.
 * -----------------------------------------------------------------------------
 */

import WorkspaceLayout from "./WorkspaceLayout";
import SearchLoading from "./SearchLoading";
import SearchEmpty from "./SearchEmpty";
import SearchError from "./SearchError";

import type { MockProduct } from "../data/products";

interface SearchWorkspaceProps {
  product: MockProduct | null;
  loading: boolean;
  error: string | null;
}

function SearchWorkspace({ product, loading, error }: SearchWorkspaceProps) {
  /**
   * Loading State
   */
  if (loading) {
    return <SearchLoading />;
  }

  /**
   * Error State
   */
  if (error) {
    return <SearchError message={error} />;
  }

  /**
   * Empty State
   */
  if (!product) {
    return <SearchEmpty />;
  }

  /**
   * Workspace
   */
  return (
    <section aria-label="Search Results Workspace" className="w-full">
      <WorkspaceLayout product={product} />
    </section>
  );
}

export default SearchWorkspace;
