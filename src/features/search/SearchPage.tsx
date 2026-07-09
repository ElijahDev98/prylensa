/**
 * -----------------------------------------------------------------------------
 * File: SearchPage.tsx
 * Feature: Search
 *
 * Purpose:
 * Entry point for the Search feature.
 *
 * Responsibilities:
 * - Compose the Search feature.
 * - Connect Search and Comparison features.
 * - Delegate business operations to hooks.
 *
 * Architecture:
 * UI
 *   ↓
 * useSearch()
 *   ↓
 * Search Service
 *
 * Notes:
 * - Composition root for the Search feature.
 * - No business logic belongs in this page.
 * -----------------------------------------------------------------------------
 */

import useComparison from "@/features/comparison/hooks/useComparison";

import {
  SearchResultList,
  SearchToolbar,
  SearchWorkspace,
  WelcomeSection,
} from "./components";

import useSearch from "./hooks/useSearch";

function SearchPage() {
  const {
    query,
    sort,
    loading,
    feedback,

    results,
    selectedResult,

    updateQuery,
    updateSort,
    executeSearch,

    selectResult,

    offerDialogOpen,
    openOfferDialog,
    closeOfferDialog,
  } = useSearch();

  const comparison = useComparison();

  return (
    <section
      className="
        mx-auto
        flex
        w-full
        max-w-screen-2xl
        flex-col
        gap-8
      "
    >
      <WelcomeSection />

      <SearchToolbar
        query={query}
        sort={sort}
        onQueryChange={updateQuery}
        onSortChange={updateSort}
        onSearch={executeSearch}
      />

      <SearchResultList
        results={results}
        selectedResult={selectedResult}
        onSelectResult={selectResult}
      />

      <SearchWorkspace
        result={selectedResult}
        loading={loading}
        error={feedback.error ?? null}
        onCompare={comparison.addProduct}
        isCompared={
          selectedResult !== null && comparison.isSelected(selectedResult.id)
        }
        offerDialogOpen={offerDialogOpen}
        onOpenOfferDialog={openOfferDialog}
        onCloseOfferDialog={closeOfferDialog}
      />
    </section>
  );
}

export default SearchPage;
