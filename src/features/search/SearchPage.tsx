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
 * Search Services
 *
 * Notes:
 * - Composition root only.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import useComparison from "@/features/comparison/hooks/useComparison";

import { RecentSearches, SearchResultList, WelcomeSection } from "./components";

import { SearchSummary } from "./components/summary";
import { SearchToolbar } from "./components/toolbar";
import { SearchWorkspace } from "./components/workspace";

import useSearch from "./hooks/useSearch";

function SearchPage() {
  const {
    query,
    sort,
    loading,
    feedback,

    results,
    summary,
    selectedResult,
    recentSearches,

    suggestions,
    activeSuggestionIndex,

    updateQuery,
    updateSort,

    executeSearch,
    executeRecentSearch,

    selectSuggestion,
    clearSuggestions,
    moveSuggestionDown,
    moveSuggestionUp,

    clearRecentSearchHistory,

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
        suggestions={suggestions}
        activeSuggestionIndex={activeSuggestionIndex}
        onQueryChange={updateQuery}
        onSortChange={updateSort}
        onSearch={executeSearch}
        onSelectSuggestion={selectSuggestion}
        onMoveSuggestionUp={moveSuggestionUp}
        onMoveSuggestionDown={moveSuggestionDown}
        onClearSuggestions={clearSuggestions}
      />

      {summary.resultCount > 0 && (
        <SearchSummary
          resultCount={summary.resultCount}
          storeCount={summary.storeCount}
          lowestPrice={summary.lowestPriceLabel}
          averagePrice={summary.averagePriceLabel}
        />
      )}

      {results.length === 0 && recentSearches.length > 0 && !loading && (
        <RecentSearches
          searches={recentSearches}
          onSelect={executeRecentSearch}
          onClear={clearRecentSearchHistory}
        />
      )}

      <SearchResultList
        results={results}
        selectedResult={selectedResult}
        onSelectResult={selectResult}
      />

      <SearchWorkspace
        query={query}
        results={results}
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
