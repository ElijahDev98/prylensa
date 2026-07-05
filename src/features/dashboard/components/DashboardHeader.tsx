/**
 * -----------------------------------------------------------------------------
 * File: DashboardHeader.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Top section of the dashboard.
 *
 * Responsibilities:
 * - Display dashboard title.
 * - Display overview text.
 * - Display current date.
 * - Display refresh button.
 *
 * Does NOT:
 * - Refresh data.
 * - Fetch data.
 * -----------------------------------------------------------------------------
 */

import { RefreshCw } from "lucide-react";

function DashboardHeader() {
  const today = new Intl.DateTimeFormat("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <header
      className="
        flex
        flex-col
        gap-6
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      <div>
        <p className="text-sm font-medium text-blue-600">{today}</p>

        <h1
          className="
            mt-2
            text-3xl
            font-bold
            tracking-tight
            text-slate-900
          "
        >
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor market trends, savings and AI insights in one place.
        </p>
      </div>

      <button
        type="button"
        className="
          inline-flex
          items-center
          justify-center
          gap-2
          rounded-2xl
          border
          border-slate-300
          px-5
          py-3
          font-medium
          text-slate-700
          transition-colors
          duration-200
          hover:bg-slate-100
        "
      >
        <RefreshCw size={18} />
        Refresh
      </button>
    </header>
  );
}

export default DashboardHeader;
