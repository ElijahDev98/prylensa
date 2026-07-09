/**
 * -----------------------------------------------------------------------------
 * File: SearchWorkspace.tsx
 * Feature: Search
 *
 * Purpose:
 * Composes the Search workspace.
 *
 * Responsibilities:
 * - Display loading state.
 * - Display error state.
 * - Display empty state.
 * - Display the workspace.
 * - Display the Offer dialog.
 *
 * Architecture:
 * UI
 *   ↓
 * Workspace
 *
 * Notes:
 * - Pure presentation component.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import { OfferDialog } from "../offers";

import SearchEmpty from "./SearchEmpty";
import SearchError from "./SearchError";
import SearchLoading from "./SearchLoading";
import WorkspaceLayout from "./WorkspaceLayout";

import type { SearchResultViewModel } from "../../viewmodels/search.viewmodel";

interface SearchWorkspaceProps {
  result: SearchResultViewModel | null;

  loading: boolean;

  error: string | null;

  onCompare(productId: string): void;

  isCompared: boolean;

  offerDialogOpen: boolean;

  onOpenOfferDialog(): void;

  onCloseOfferDialog(): void;
}

function SearchWorkspace({
  result,
  loading,
  error,
  onCompare,
  isCompared,
  offerDialogOpen,
  onOpenOfferDialog,
  onCloseOfferDialog,
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
    <>
      <section aria-label="Search Results Workspace" className="w-full">
        <WorkspaceLayout
          result={result}
          onCompare={onCompare}
          isCompared={isCompared}
          onViewAllPrices={onOpenOfferDialog}
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
