/**
 * -----------------------------------------------------------------------------
 * File: SettingsPage.tsx
 * Feature: Settings
 *
 * Purpose:
 * Displays account, sign-in and workspace preference controls.
 * -----------------------------------------------------------------------------
 */

import {
  Bell,
  CreditCard,
  Lock,
  Moon,
  RefreshCw,
  Settings,
  Sun,
  UserCircle2,
} from "lucide-react";
import { useState } from "react";

import { useGuestSession } from "@/features/auth";
import usePreferences from "./hooks/usePreferences";

import type { AppCurrency } from "@/shared/utils/currency";

function SettingsPage() {
  const { session, signingIn, error, signInGuest, signOut } = useGuestSession();
  const preferences = usePreferences();
  const [email, setEmail] = useState("");

  return (
    <section className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6">
      <header className="rounded-3xl border border-slate-200 bg-white p-7">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700">
            <Settings size={28} />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-600">Workspace</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-950">
              Settings
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              Manage guest access, marketplace preferences and notification
              defaults for product intelligence.
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-12">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 lg:col-span-5">
          <div className="mb-5 flex items-center gap-3">
            <UserCircle2 size={22} className="text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-900">
              Guest Sign In
            </h2>
          </div>

          {session ? (
            <div className="rounded-2xl bg-emerald-50 p-5">
              <p className="font-semibold text-emerald-800">
                Signed in as guest
              </p>
              <p className="mt-2 text-sm text-emerald-700">
                {session.user.email}
              </p>
              <button
                type="button"
                onClick={signOut}
                className="mt-4 rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                void signInGuest(email);
              }}
            >
              <label className="block">
                <span className="text-sm font-medium text-slate-700">
                  Email
                </span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-blue-500"
                />
              </label>

              {error && (
                <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={signingIn}
                className="w-full rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              >
                {signingIn ? "Creating guest session..." : "Sign In as Guest"}
              </button>
            </form>
          )}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 lg:col-span-7">
          <h2 className="mb-5 text-lg font-semibold text-slate-900">
            Product Intelligence Preferences
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4 md:col-span-2">
              <span className="text-sm font-semibold text-slate-900">
                Appearance
              </span>
              <div
                role="group"
                aria-label="Application appearance"
                className="mt-3 grid max-w-sm grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-white p-1"
              >
                <button
                  type="button"
                  aria-pressed={preferences.theme === "light"}
                  onClick={() => preferences.setTheme("light")}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    preferences.theme === "light"
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Sun size={16} />
                  Light
                </button>
                <button
                  type="button"
                  aria-pressed={preferences.theme === "dark"}
                  onClick={() => preferences.setTheme("dark")}
                  className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    preferences.theme === "dark"
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Moon size={16} />
                  Dark
                </button>
              </div>
            </div>

            <label className="rounded-2xl bg-slate-50 p-4">
              <span className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <CreditCard size={17} className="text-blue-600" />
                Currency
              </span>
              <select
                value={preferences.currency}
                onChange={(event) =>
                  preferences.setCurrency(event.target.value as AppCurrency)
                }
                className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
              >
                <option value="NGN">Nigerian Naira</option>
                <option value="USD">US Dollar</option>
                <option value="GBP">British Pound</option>
              </select>
              <div className="mt-3 flex items-center justify-between gap-3 text-xs text-slate-500">
                <span>
                  1 NGN = {preferences.rates[preferences.currency].toLocaleString(undefined, {
                    maximumFractionDigits: 6,
                  })} {preferences.currency}
                </span>
                <button
                  type="button"
                  onClick={() => void preferences.refreshRates()}
                  disabled={preferences.ratesLoading}
                  title="Refresh exchange rates"
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-200 disabled:opacity-50"
                >
                  <RefreshCw
                    size={15}
                    className={preferences.ratesLoading ? "animate-spin" : ""}
                  />
                </button>
              </div>
            </label>

            <div className="rounded-2xl bg-slate-50 p-4">
              <span className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Bell size={17} className="text-amber-600" />
                Notifications
              </span>
              <button
                type="button"
                aria-pressed={preferences.notificationsEnabled}
                onClick={() =>
                  preferences.setNotificationsEnabled(
                    !preferences.notificationsEnabled,
                  )
                }
                className={`mt-4 h-7 w-12 rounded-full p-1 transition-colors ${
                  preferences.notificationsEnabled ? "bg-blue-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`block h-5 w-5 rounded-full bg-white transition-transform ${
                    preferences.notificationsEnabled
                      ? "translate-x-5"
                      : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <a
              href="https://www.exchangerate-api.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-slate-400 hover:text-slate-600 md:col-span-2"
            >
              Exchange rates by ExchangeRate-API
            </a>

            <div className="rounded-2xl bg-slate-50 p-4 md:col-span-2">
              <span className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Lock size={17} className="text-emerald-600" />
                Security
              </span>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Guest sessions are backed by the backend user table. Full
                password accounts can be added when the production auth model is
                ready.
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default SettingsPage;
