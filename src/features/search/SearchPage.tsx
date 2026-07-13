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
 *
 * UI
 *   ↓
 * useSearch()
 * useSearchFocus()
 *   ↓
 * Search Services
 *
 * Notes:
 * - Composition root only.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import { useCallback } from "react";

import useComparison from "@/features/comparison/hooks/useComparison";

import useKeyboardShortcuts from "./hooks/useKeyboardShortcuts";
import useSearch from "./hooks/useSearch";
import useSearchFocus from "./hooks/useSearchFocus";

import { RecentSearches, SearchResultList, WelcomeSection } from "./components";

import { SearchSession } from "./components/session";
import { SearchSummary } from "./components/summary";
import { SearchToolbar } from "./components/toolbar";
import { SearchWorkspace } from "./components/workspace";

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
    autocomplete,
    activeSuggestionIndex,

    updateQuery,
    updateSort,

    executeSearch,
    executeRecentSearch,

    selectSuggestion,
    acceptAutocomplete,

    clearSuggestions,
    resetSearch,

    moveSuggestionDown,
    moveSuggestionUp,

    clearRecentSearchHistory,

    selectResult,
    clearSelection,

    offerDialogOpen,
    openOfferDialog,
    closeOfferDialog,
  } = useSearch();

  const comparison = useComparison();

  const { inputRef, focusSearch } = useSearchFocus();

  /**
   * ---------------------------------------------------------------------------
   * Escape Behaviour
   * ---------------------------------------------------------------------------
   */

  const handleEscape = useCallback(() => {
    resetSearch();
    focusSearch();
  }, [resetSearch, focusSearch]);

  /**
   * ---------------------------------------------------------------------------
   * Hide Suggestion Popup
   * ---------------------------------------------------------------------------
   */

  const handleHideSuggestions = useCallback(() => {
    clearSuggestions();
  }, [clearSuggestions]);

  /**
   * ---------------------------------------------------------------------------
   * Change Product
   * ---------------------------------------------------------------------------
   */

  const handleChangeProduct = useCallback(() => {
    clearSelection();
    focusSearch();
  }, [clearSelection, focusSearch]);

  /**
   * ---------------------------------------------------------------------------
   * Global Keyboard Shortcuts
   * ---------------------------------------------------------------------------
   */

  useKeyboardShortcuts({
    onFocusSearch: focusSearch,
    onEscape: handleEscape,
  });

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
        inputRef={inputRef}
        query={query}
        ghostText={autocomplete ?? ""}
        sort={sort}
        suggestions={suggestions}
        activeSuggestionIndex={activeSuggestionIndex}
        onQueryChange={updateQuery}
        onSortChange={updateSort}
        onSearch={executeSearch}
        onEscape={handleEscape}
        onHideSuggestions={handleHideSuggestions}
        onAcceptAutocomplete={acceptAutocomplete}
        onSelectSuggestion={selectSuggestion}
        onMoveSuggestionUp={moveSuggestionUp}
        onMoveSuggestionDown={moveSuggestionDown}
      />

      <SearchSession
        query={query}
        resultCount={summary.resultCount}
        storeCount={summary.storeCount}
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

      {selectedResult === null && (
        <SearchResultList
          results={results}
          selectedResult={selectedResult}
          onSelectResult={selectResult}
        />
      )}

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
        onChangeProduct={handleChangeProduct}
      />
    </section>
  );
}

export default SearchPage;
