/**
 * -----------------------------------------------------------------------------
 * File: SettingsPage.tsx
 * Feature: Settings
 *
 * Purpose:
 * Entry page for future account and workspace preferences.
 * -----------------------------------------------------------------------------
 */

import { Settings } from "lucide-react";

function SettingsPage() {
  return (
    <section className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
            <Settings size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-slate-950">Settings</h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Profile, currency, notifications, security and account
              preferences will be configured here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SettingsPage;
