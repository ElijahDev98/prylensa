/**
 * -----------------------------------------------------------------------------
 * File: PriceAlertsWidget.tsx
 * Feature: Dashboard
 * -----------------------------------------------------------------------------
 */

import DashboardWidgetHeader from "./DashboardWidgetHeader";
import PriceAlertRow from "./PriceAlertRow";

import { PRICE_ALERTS } from "../data/price-alerts";

function PriceAlertsWidget() {
  return (
    <section>
      <DashboardWidgetHeader
        title="Price Alerts"
        description="Recent price movements from monitored products."
        actionLabel="View All"
      />

      <div>
        {PRICE_ALERTS.map((alert) => (
          <PriceAlertRow key={alert.id} alert={alert} />
        ))}
      </div>
    </section>
  );
}

export default PriceAlertsWidget;
