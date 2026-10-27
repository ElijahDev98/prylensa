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

import { useState } from "react";

import type { PriceAlertViewModel } from "../viewmodels/dashboard.viewmodel";

interface PriceAlertsWidgetProps {
  alerts: PriceAlertViewModel[];
}

function PriceAlertsWidget({ alerts }: PriceAlertsWidgetProps) {
  const [expanded, setExpanded] = useState(false);

  const visibleAlerts = expanded ? alerts : alerts.slice(0, 2);

  const canToggle = alerts.length > 2;

  return (
    <section>
      <DashboardWidgetHeader
        title="Price Alerts"
        description="Recent price movements from monitored products."
        actionLabel={canToggle ? (expanded ? "Show Less" : "View All") : undefined}
        onAction={() => setExpanded((current) => !current)}
      />

      {alerts.length === 0 ? (
        <p className="text-sm text-slate-500">
          No qualifying price changes have met an alert threshold yet.
        </p>
      ) : (
        <div>
          {visibleAlerts.map((alert) => (
            <PriceAlertRow key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </section>
  );
}

export default PriceAlertsWidget;
