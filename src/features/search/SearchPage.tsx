/**
 * -----------------------------------------------------------------------------
 * File: SearchPage.tsx
 * Feature: Search
 *
 * Purpose:
 * Entry page for the Search feature.
 *
 * Responsibilities:
 * - Compose all Search feature sections.
 *
 * Future Enhancements:
 * - Search Toolbar
 * - Product Workspace
 * - Compare Prices
 * - Price Trend
 * - AI Recommendation
 * -----------------------------------------------------------------------------
 */

import WelcomeSection from "./components/WelcomeSection";

function SearchPage() {
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

      {/* SearchToolbar */}
      {/* ProductWorkspace */}
      {/* CompareSection */}
      {/* PriceTrendSection */}
      {/* RecommendationSection */}
    </section>
  );
}

export default SearchPage;
