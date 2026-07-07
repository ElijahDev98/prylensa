/**
 * -----------------------------------------------------------------------------
 * File: SearchPage.tsx
 * Feature: Search
 *
 * Purpose:
 * Entry point for the Search feature.
 *
 * Responsibilities:
 * - Connect Search and Comparison domains.
 * - Compose Search presentation.
 * - Own feature-level orchestration.
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
    loading,
    feedback,

    results,
    selectedResult,

    updateQuery,
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
        onQueryChange={updateQuery}
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
          selectedResult !== null &&
          comparison.isSelected(selectedResult.product.id)
        }
        offerDialogOpen={offerDialogOpen}
        onOpenOfferDialog={openOfferDialog}
        onCloseOfferDialog={closeOfferDialog}
      />
    </section>
  );
}

export default SearchPage;
