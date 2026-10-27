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

import { useCallback, useEffect, useRef, useState } from "react";

import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/app/router/routes";

import useComparison from "@/features/comparison/hooks/useComparison";
import {
  recordComparisonIntelligence,
  recordSearchIntelligence,
} from "@/features/product-intelligence";

import useKeyboardShortcuts from "./hooks/useKeyboardShortcuts";
import useSearch from "./hooks/useSearch";
import useSearchFocus from "./hooks/useSearchFocus";
import useVoiceSearch from "./hooks/useVoiceSearch";
import { useGuestSession } from "@/features/auth";
import {
  fetchSavedSearches,
  markSavedSearchRefreshed,
  removeSavedSearch,
  saveSearch,
} from "./api/saved-search.api";

import { toComparisonSelectedProducts } from "./mappers/search-comparison.mapper";

import type { SearchResultViewModel } from "./viewmodels/search.viewmodel";
import type { SavedSearch } from "./api/saved-search.api";

import { RecentSearches, SearchResultList, WelcomeSection } from "./components";

import { SearchSummary } from "./components/summary";
import { SearchToolbar } from "./components/toolbar";
import { SearchWorkspace } from "./components/workspace";
import VisualSearchDialog from "./components/visual-search/VisualSearchDialog";

function SearchPage() {
  const {
    query,
    sort,
    loading,
    hasSearched,
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
    executeSearchQuery,
    selectSuggestion,
    acceptAutocomplete,

    clearSuggestions,
    resetSearch,

    moveSuggestionDown,
    moveSuggestionUp,

    clearRecentSearchHistory,
    removeRecentSearchHistory,

    selectResult,
    offerDialogOpen,
    openOfferDialog,
    closeOfferDialog,
  } = useSearch();

  const comparison = useComparison();
  const { session } = useGuestSession();

  const { inputRef, focusSearch } = useSearchFocus();

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const historyMode = location.pathname === ROUTES.SEARCH_HISTORY;
  const comparisonPicker = searchParams.get("mode") === "comparison";

  const lastRouteQuery = useRef("");
  const lastSelectedResultId = useRef(selectedResult?.id ?? null);

  const [visualSearchOpen, setVisualSearchOpen] = useState(false);
  const [choosingProduct, setChoosingProduct] = useState(false);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [savingQuery, setSavingQuery] = useState<string | null>(null);
  const [refreshingSavedId, setRefreshingSavedId] = useState<string | null>(null);
  const [savedSearchError, setSavedSearchError] = useState<string | null>(null);

  const loadSavedSearches = useCallback(async () => {
    if (!session) return;
    try {
      setSavedSearches(await fetchSavedSearches());
    } catch {
      // Local recent searches remain usable while persistence is unavailable.
    }
  }, [session]);

  useEffect(() => {
    queueMicrotask(() => void loadSavedSearches());
  }, [loadSavedSearches]);

  const handleVoiceSearch = useCallback(
    (transcript: string) => {
      void executeSearchQuery(transcript);
    },
    [executeSearchQuery],
  );

  const handleVisualSearch = useCallback(
    async (visualQuery: string) => {
      updateQuery(visualQuery);
      await executeSearchQuery(visualQuery);
    },
    [executeSearchQuery, updateQuery],
  );

  const voiceSearch = useVoiceSearch({
    onInterimTranscript: updateQuery,
    onFinalTranscript: handleVoiceSearch,
  });

  useEffect(() => {
    const routeQuery = searchParams.get("q")?.trim() ?? "";

    if (routeQuery.length === 0 || routeQuery === lastRouteQuery.current) {
      return;
    }

    lastRouteQuery.current = routeQuery;

    void executeSearchQuery(routeQuery);
  }, [executeSearchQuery, searchParams]);

  useEffect(() => {
    if (loading || results.length === 0) {
      return;
    }

    recordSearchIntelligence(query, results);
  }, [loading, query, results]);

  useEffect(() => {
    const selectedResultId = selectedResult?.id ?? null;

    if (selectedResultId !== lastSelectedResultId.current) {
      lastSelectedResultId.current = selectedResultId;
      if (!comparisonPicker) {
        queueMicrotask(() => setChoosingProduct(false));
      }
    }
  }, [comparisonPicker, selectedResult?.id]);

  useEffect(() => {
    if (!comparisonPicker || results.length === 0) return;
    queueMicrotask(() => setChoosingProduct(true));
  }, [comparisonPicker, results.length]);

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
    setChoosingProduct(true);
    clearSuggestions();
  }, [clearSuggestions]);

  const handleReturnToSelectedProduct = useCallback(() => {
    if (comparisonPicker) {
      navigate(ROUTES.COMPARE);
      return;
    }
    setChoosingProduct(false);
  }, [comparisonPicker, navigate]);

  const handleSelectResult = useCallback(
    (result: SearchResultViewModel) => {
      selectResult(result);
      setChoosingProduct(comparisonPicker);
      recordSearchIntelligence(query, [result]);
    },
    [comparisonPicker, query, selectResult],
  );

  const handleExecuteRecentSearch = useCallback(
    (search: string) => {
      navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(search)}`);
    },
    [navigate],
  );

  const handleToggleSavedSearch = useCallback(async (search: string) => {
    const current = savedSearches.find(
      (item) => item.query.toLowerCase() === search.trim().toLowerCase(),
    );
    setSavedSearchError(null);
    setSavingQuery(search);
    try {
      if (current) {
        await removeSavedSearch(current.id);
        setSavedSearches((items) => items.filter((item) => item.id !== current.id));
      } else {
        const saved = await saveSearch(search);
        setSavedSearches((items) => [
          saved,
          ...items.filter((item) => item.id !== saved.id),
        ]);
      }
    } catch {
      setSavedSearchError(
        current
          ? "The saved search could not be removed. Please try again."
          : "The search could not be saved. Please try again.",
      );
    } finally {
      setSavingQuery(null);
    }
  }, [savedSearches]);

  const handleDeleteSearch = useCallback(async (search: string) => {
    const saved = savedSearches.find(
      (item) => item.query.toLowerCase() === search.trim().toLowerCase(),
    );
    setSavedSearchError(null);

    try {
      if (saved) {
        await removeSavedSearch(saved.id);
        setSavedSearches((items) => items.filter((item) => item.id !== saved.id));
      }
      removeRecentSearchHistory(search);
    } catch {
      setSavedSearchError(
        "The search could not be deleted. Its saved value is unchanged.",
      );
    }
  }, [removeRecentSearchHistory, savedSearches]);

  const handleRefreshSavedSearch = useCallback(async (search: SavedSearch) => {
    setSavedSearchError(null);
    setRefreshingSavedId(search.id);
    try {
      const refreshed = await executeSearchQuery(search.query);
      if (!refreshed) return;
      const updated = await markSavedSearchRefreshed(search.id);
      setSavedSearches((items) => items.map((item) =>
        item.id === updated.id ? updated : item
      ));
      navigate(ROUTES.SEARCH);
    } catch {
      setSavedSearchError(
        "The saved search could not be refreshed. Its existing saved value is unchanged.",
      );
    } finally {
      setRefreshingSavedId(null);
    }
  }, [executeSearchQuery, navigate]);

  /**
   * ---------------------------------------------------------------------------
   * Add Selected Product To Comparison
   * ---------------------------------------------------------------------------
   */

  const handleCompareSelectedProduct = useCallback(async () => {
    if (selectedResult === null) {
      return;
    }

    const comparisonProducts = toComparisonSelectedProducts(selectedResult);
    const newProducts = comparisonProducts.filter(
      (product) => !comparison.isSelected(product.id),
    );

    await comparison.replaceSelectedProductGroup(
      selectedResult.id,
      comparisonProducts,
    );

    for (const product of newProducts) {
      recordComparisonIntelligence(product);
    }
  }, [comparison, selectedResult]);

  const handleOpenComparison = useCallback(async () => {
    await handleCompareSelectedProduct();
    closeOfferDialog();
    navigate(ROUTES.COMPARE);
  }, [closeOfferDialog, handleCompareSelectedProduct, navigate]);

  const handleViewComparison = useCallback(() => {
    navigate(ROUTES.COMPARE);
  }, [navigate]);

  const handleConfirmComparisonSelection = useCallback(async () => {
    await handleCompareSelectedProduct();
    navigate(ROUTES.COMPARE);
  }, [handleCompareSelectedProduct, navigate]);

  /**
   * ---------------------------------------------------------------------------
   * Global Keyboard Shortcuts
   * ---------------------------------------------------------------------------
   */

  useKeyboardShortcuts({
    onFocusSearch: focusSearch,
    onEscape: handleEscape,
  });

  if (historyMode) {
    return (
      <section className="mx-auto w-full max-w-5xl">
        <RecentSearches
          searches={recentSearches}
          savedSearches={savedSearches}
          onSelect={handleExecuteRecentSearch}
          onRemove={(search) => void handleDeleteSearch(search)}
          onClear={clearRecentSearchHistory}
          onNewSearch={() => navigate(ROUTES.SEARCH)}
          onToggleSave={(search) => void handleToggleSavedSearch(search)}
          onRefreshSaved={(search) => void handleRefreshSavedSearch(search)}
          savingQuery={savingQuery}
          refreshingSavedId={refreshingSavedId}
          persistenceError={savedSearchError}
        />
      </section>
    );
  }

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
        loading={loading}
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
        onOpenVisualSearch={() => {
          clearSuggestions();
          voiceSearch.stop();
          setVisualSearchOpen(true);
        }}
        onToggleVoiceSearch={voiceSearch.toggle}
        voiceListening={voiceSearch.listening}
        voiceSupported={voiceSearch.supported}
        voiceMessage={voiceSearch.message}
        voiceError={voiceSearch.error}
      />

      <VisualSearchDialog
        open={visualSearchOpen}
        onClose={() => setVisualSearchOpen(false)}
        onSearch={handleVisualSearch}
      />

      {summary.resultCount > 0 && (
        <SearchSummary
          query={query}
          resultCount={summary.resultCount}
          storeCount={summary.storeCount}
          lowestPrice={summary.lowestPriceLabel}
          averagePrice={summary.averagePriceLabel}
          bestQueryMatch={summary.bestQueryMatchLabel}
        />
      )}

      {query.trim().length === 0 &&
        results.length === 0 &&
        (recentSearches.length > 0 || savedSearches.length > 0) &&
        !loading && (
        <RecentSearches
          searches={recentSearches}
          savedSearches={savedSearches}
          onSelect={handleExecuteRecentSearch}
          onRemove={(search) => void handleDeleteSearch(search)}
          onClear={clearRecentSearchHistory}
          onToggleSave={(search) => void handleToggleSavedSearch(search)}
          onRefreshSaved={(search) => void handleRefreshSavedSearch(search)}
          savingQuery={savingQuery}
          refreshingSavedId={refreshingSavedId}
          persistenceError={savedSearchError}
        />
      )}

      {(selectedResult === null || choosingProduct || comparisonPicker) && (
        <SearchResultList
          results={results}
          selectedResult={selectedResult}
          onSelectResult={handleSelectResult}
          onReturnToSelection={
            comparisonPicker || (selectedResult !== null && choosingProduct)
              ? handleReturnToSelectedProduct
              : undefined
          }
          comparisonPicker={comparisonPicker}
          onConfirmSelection={
            comparisonPicker ? handleConfirmComparisonSelection : undefined
          }
        />
      )}

      <div className={choosingProduct || comparisonPicker ? "hidden" : undefined}>
        <SearchWorkspace
          query={query}
          results={results}
          result={selectedResult}
          loading={loading}
          hasSearched={hasSearched}
          error={feedback.error ?? null}
          onCompare={handleCompareSelectedProduct}
          isCompared={
            selectedResult !== null &&
            toComparisonSelectedProducts(selectedResult).every((product) =>
              comparison.isSelected(product.id),
            )
          }
          offerDialogOpen={offerDialogOpen}
          onOpenOfferDialog={openOfferDialog}
          onCloseOfferDialog={closeOfferDialog}
          onOpenComparison={handleOpenComparison}
          onViewComparison={handleViewComparison}
          onChangeProduct={handleChangeProduct}
        />
      </div>
    </section>
  );
}

export default SearchPage;
