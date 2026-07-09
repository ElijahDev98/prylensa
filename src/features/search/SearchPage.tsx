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
 * - Coordinate presentation components.
 *
 * Architecture:
 * UI
 *   ↓
 * useSearch()
 *   ↓
 * Search Service
 *
 * Notes:
 * - Composition root only.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import useComparison from "@/features/comparison/hooks/useComparison";

import {
  RecentSearches,
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
    recentSearches,

    updateQuery,
    updateSort,

    executeSearch,
    executeRecentSearch,

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

      {recentSearches.length > 0 && results.length === 0 && !loading && (
        <RecentSearches
          searches={recentSearches}
          onSelect={executeRecentSearch}
        />
      )}

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
