/**
 * -----------------------------------------------------------------------------
 * File: AlertsPage.tsx
 * Feature: Alerts
 *
 * Purpose:
 * Entry page for future price and restock alerts.
 * -----------------------------------------------------------------------------
 */

import { Bell } from "lucide-react";

function AlertsPage() {
  return (
    <section className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-100 bg-amber-50 text-amber-600">
            <Bell size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-slate-950">Alerts</h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Price drops, restocks and saved alert rules will be managed here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AlertsPage;
