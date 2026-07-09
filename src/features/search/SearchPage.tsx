/**
 * -----------------------------------------------------------------------------
 * File: SearchPage.tsx
 * Feature: Search
 * -----------------------------------------------------------------------------
 */

import useComparison from "@/features/comparison/hooks/useComparison";

import { SearchToolbar } from "./components/toolbar";
import { RecentSearches, SearchResultList, WelcomeSection } from "./components";
import { SearchWorkspace } from "./components/workspace";

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

    suggestions,
    activeSuggestionIndex,

    updateQuery,
    updateSort,

    executeSearch,
    executeRecentSearch,

    selectSuggestion,
    moveSuggestionUp,
    moveSuggestionDown,
    clearSuggestions,

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

      {results.length === 0 && !loading && (
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
