/**
 * -----------------------------------------------------------------------------
 * File: PriceAlertsWidget.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Displays dashboard price alerts.
 *
 * Responsibilities:
 * - Render widget header.
 * - Render price alerts.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * - Know where the data comes from.
 * -----------------------------------------------------------------------------
 */

import DashboardWidgetHeader from "./DashboardWidgetHeader";
import PriceAlertRow from "./PriceAlertRow";

import type { PriceAlertViewModel } from "../viewmodels/dashboard.viewmodel";

interface PriceAlertsWidgetProps {
  alerts: PriceAlertViewModel[];
}

function PriceAlertsWidget({ alerts }: PriceAlertsWidgetProps) {
  return (
    <section>
      <DashboardWidgetHeader
        title="Price Alerts"
        description="Recent price movements from monitored products."
        actionLabel="View All"
      />

      <div>
        {alerts.map((alert) => (
          <PriceAlertRow key={alert.id} alert={alert} />
        ))}
      </div>
    </section>
  );
}

export default PriceAlertsWidget;
