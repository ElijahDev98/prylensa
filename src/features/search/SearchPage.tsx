/**
 * -----------------------------------------------------------------------------
 * File: SearchPage.tsx
 * Feature: Search
 *
 * Purpose:
 * Entry point for the Search feature.
 *
 * Responsibilities:
 * - Compose the Search experience.
 * - Connect feature state to presentation components.
 * - Manage product selection.
 *
 * Architecture:
 * SearchPage
 *      ↓
 * useSearch()
 *      ↓
 * SearchToolbar
 * SearchResultList
 * SearchWorkspace
 * -----------------------------------------------------------------------------
 */

import { DEFAULT_PRODUCT } from "./data/products";

import {
  SearchResultList,
  SearchToolbar,
  SearchWorkspace,
  WelcomeSection,
} from "./components";

import { useSearch } from "./hooks/useSearch";

function SearchPage() {
  const { state, updateQuery, executeSearch, setSelectedProduct } = useSearch();

  const currentProduct = state.selectedProduct ?? DEFAULT_PRODUCT;

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
        query={state.query}
        onQueryChange={updateQuery}
        onSearch={executeSearch}
      />

      <SearchResultList
        products={state.products}
        selectedProduct={state.selectedProduct}
        onSelectProduct={setSelectedProduct}
      />

      <SearchWorkspace
        product={currentProduct}
        loading={state.loading}
        error={state.error}
      />
    </section>
  );
}

export default SearchPage;
