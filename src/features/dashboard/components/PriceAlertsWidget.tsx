/**
 * -----------------------------------------------------------------------------
 * File: PriceAlertsWidget.tsx
 * Feature: Dashboard
 * -----------------------------------------------------------------------------
 */

import PriceAlertCard from "./PriceAlertCard";

import { PRICE_ALERTS } from "../data/price-alerts";

function PriceAlertsWidget() {
  return (
    <section className="flex h-full flex-col">
      <h2 className="text-xl font-semibold text-slate-900">Price Alerts</h2>

      <div className="mt-6 space-y-4">
        {PRICE_ALERTS.map((alert) => (
          <PriceAlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </section>
  );
}

export default PriceAlertsWidget;
