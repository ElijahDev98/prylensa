/**
 * -----------------------------------------------------------------------------
 * File: PriceAlertsWidget.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Displays recent price alerts.
 *
 * Responsibilities:
 * - Render widget header.
 * - Render price alert rows.
 * - Render "View All" action.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

import PriceAlertRow from "./PriceAlertRow";

import { PRICE_ALERTS } from "../data/price-alerts";

function PriceAlertsWidget() {
  return (
    <section className="flex flex-col">
      {/* ------------------------------------------------------------------ */}
      {/* Header                                                             */}
      {/* ------------------------------------------------------------------ */}

      <header
        className="
          mb-6
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-slate-900
            "
          >
            Price Alerts
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
            "
          >
            Recent price movements from monitored products.
          </p>
        </div>

        <button
          type="button"
          className="
            shrink-0
            rounded-xl
            px-3
            py-2
            text-sm
            font-medium
            text-blue-600
            transition-colors
            hover:bg-blue-50
            hover:text-blue-700
          "
        >
          View All
        </button>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Alert List                                                         */}
      {/* ------------------------------------------------------------------ */}

      <div>
        {PRICE_ALERTS.map((alert) => (
          <PriceAlertRow key={alert.id} alert={alert} />
        ))}
      </div>
    </section>
  );
}

export default PriceAlertsWidget;
