/**
 * -----------------------------------------------------------------------------
 * File: ComparePage.tsx
 * Feature: Compare
 *
 * Purpose:
 * Entry page for the Compare feature.
 *
 * Responsibilities:
 * - Render the compare page layout.
 * - Compose the page sections.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import CompareHeader from "./components/CompareHeader";
import CompareWorkspace from "./components/CompareWorkspace";

function ComparePage() {
  return (
    <section
      className="
        mx-auto
        flex
        min-w-0
        w-full
        max-w-screen-2xl
        flex-col
        gap-8
      "
    >
      <CompareHeader />

      <CompareWorkspace />
    </section>
  );
}

export default ComparePage;
