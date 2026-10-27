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

interface DashboardHeaderProps {
  refreshing: boolean;

  lastUpdated: Date | null;

  onRefresh: () => void;
}

function DashboardHeader({
  refreshing,
  lastUpdated,
  onRefresh,
}: DashboardHeaderProps) {
  const today = new Intl.DateTimeFormat("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const lastUpdatedLabel =
    lastUpdated === null
      ? "Live marketplace data"
      : `Updated ${new Intl.DateTimeFormat("en-NG", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(lastUpdated)}`;

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
          Monitor live market trends, product quality and buying signals in one
          place.
        </p>

        <p className="mt-3 text-sm font-medium text-slate-500">
          {lastUpdatedLabel}
        </p>
      </div>

      <button
        type="button"
        onClick={onRefresh}
        disabled={refreshing}
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
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        <RefreshCw
          size={18}
          className={refreshing ? "animate-spin" : undefined}
        />
        {refreshing ? "Refreshing" : "Refresh"}
      </button>
    </header>
  );
}

export default DashboardHeader;
