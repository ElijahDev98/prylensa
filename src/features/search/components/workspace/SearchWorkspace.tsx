/**
 * -----------------------------------------------------------------------------
 * File: SearchWorkspace.tsx
 * Feature: Search
 *
 * Purpose:
 * Coordinates every Search workspace state.
 *
 * Responsibilities:
 * - Display loading state.
 * - Display error state.
 * - Display initial workspace.
 * - Display no-results workspace.
 * - Display selection placeholder.
 * - Display selected product workspace.
 *
 * Architecture:
 * UI
 *   ↓
 * SearchResultViewModel
 *
 * Notes:
 * - Pure presentation component.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import OfferDialog from "../offers/OfferDialog";
import SearchEmpty from "./SearchEmpty";
import SearchError from "./SearchError";
import SearchLoading from "./SearchLoading";
import SearchNoResults from "./SearchNoResults";
import SearchSelectionPlaceholder from "./SearchSelectionPlaceholder";
import WorkspaceLayout from "./WorkspaceLayout";

import type { SearchResultViewModel } from "../../viewmodels/search.viewmodel";

interface SearchWorkspaceProps {
  query: string;

  results: SearchResultViewModel[];

  result: SearchResultViewModel | null;

  loading: boolean;

  error: string | null;

  onCompare(productId: string): void;

  isCompared: boolean;

  offerDialogOpen: boolean;

  onOpenOfferDialog(): void;

  onCloseOfferDialog(): void;

  /**
   * Clears the current product selection.
   */
  onChangeProduct(): void;

  onRetry?(): void;
}

function SearchWorkspace({
  query,
  results,
  result,
  loading,
  error,
  onCompare,
  isCompared,
  offerDialogOpen,
  onOpenOfferDialog,
  onCloseOfferDialog,
  onChangeProduct,
  onRetry,
}: SearchWorkspaceProps) {
  /**
   * Loading
   */
  if (loading) {
    return <SearchLoading />;
  }

  /**
   * Error
   */
  if (error) {
    return <SearchError message={error} onRetry={onRetry} />;
  }

  /**
   * Initial workspace
   */
  if (query.trim().length === 0) {
    return <SearchEmpty />;
  }

  /**
   * Search completed with no matches
   */
  if (results.length === 0) {
    return <SearchNoResults query={query} />;
  }

  /**
   * Results exist but user hasn't selected one.
   */
  if (result === null) {
    return <SearchSelectionPlaceholder resultCount={results.length} />;
  }

  /**
   * Product selected
   */
  return (
    <>
      <section aria-label="Search Workspace" className="w-full">
        <WorkspaceLayout
          result={result}
          onCompare={onCompare}
          isCompared={isCompared}
          onViewAllPrices={onOpenOfferDialog}
          onChangeProduct={onChangeProduct}
        />
      </section>

      <OfferDialog
        open={offerDialogOpen}
        offers={result.offers}
        onClose={onCloseOfferDialog}
      />
    </>
  );
}

export default SearchWorkspace;
