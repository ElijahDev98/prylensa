/**
 * -----------------------------------------------------------------------------
 * File: SearchPage.tsx
 * Feature: Search
 *
 * Purpose:
 * Entry point for the Search feature.
 * -----------------------------------------------------------------------------
 */

import { SearchToolbar, WelcomeSection } from "./components";

import { useSearch } from "./hooks/useSearch";

function SearchPage() {
  const { state, updateQuery } = useSearch();

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

      <SearchToolbar query={state.query} onQueryChange={updateQuery} />

      {/* ProductWorkspace */}

      {/* CompareSection */}

      {/* PriceTrendSection */}

      {/* RecommendationSection */}
    </section>
  );
}

export default SearchPage;
