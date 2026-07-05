/**
 * -----------------------------------------------------------------------------
 * File: ComparePage.tsx
 * Feature: Compare
 *
 * Purpose:
 * Entry page for the product comparison experience.
 *
 * Responsibilities:
 * - Render compare header.
 * - Render compare workspace.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
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
