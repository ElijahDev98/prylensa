/**
 * -----------------------------------------------------------------------------
 * File: DashboardPage.tsx
 * Feature: Dashboard
 * -----------------------------------------------------------------------------
 */

import DashboardHeader from "./components/DashboardHeader";
import DashboardMetrics from "./components/DashboardMetrics";
import DashboardWorkspace from "./components/DashboardWorkspace";

function DashboardPage() {
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
      <DashboardHeader />

      <DashboardMetrics />

      <DashboardWorkspace />
    </section>
  );
}

export default DashboardPage;
