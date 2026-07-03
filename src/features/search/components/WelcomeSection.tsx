/**
 * -----------------------------------------------------------------------------
 * File: WelcomeSection.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays the welcome message shown at the top of the
 * Search experience.
 *
 * Responsibilities:
 * - Welcome heading.
 * - Feature subtitle.
 *
 * Future Enhancements:
 * - Personalized greeting.
 * - Time-based greeting.
 * - User statistics.
 * -----------------------------------------------------------------------------
 */

import { SEARCH_CONTENT } from "../constants/search.constants";

function WelcomeSection() {
  return (
    <header className="space-y-1" aria-labelledby="search-page-title">
      <h1
        id="search-page-title"
        className="
          text-3xl
          font-bold
          tracking-tight
          text-slate-900
        "
      >
        {SEARCH_CONTENT.welcomeTitle}
      </h1>

      <p
        className="
          text-sm
          font-medium
          text-slate-500
        "
      >
        {SEARCH_CONTENT.welcomeSubtitle}
      </p>
    </header>
  );
}

export default WelcomeSection;
