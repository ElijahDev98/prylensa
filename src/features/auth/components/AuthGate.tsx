/**
 * -----------------------------------------------------------------------------
 * File: AuthGate.tsx
 * Feature: Auth
 *
 * Purpose:
 * Presents the Prylensa AI guest entry screen before the app opens.
 * -----------------------------------------------------------------------------
 */

import { ArrowRight, Database, Search, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

import { BRAND } from "@/assets/branding/brand";

import { useGuestSession } from "../hooks/useGuestSession";

import type { ReactNode } from "react";

interface AuthGateProps {
  children: ReactNode;
}

function AuthGate({ children }: AuthGateProps) {
  const { session, signingIn, error, signInGuest } = useGuestSession();
  const [email, setEmail] = useState("");

  if (session) {
    return children;
  }

  return (
    <main className="min-h-screen bg-slate-100 px-5 py-6 text-slate-950 sm:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/70 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="flex flex-col justify-between gap-12 bg-slate-950 p-8 text-white sm:p-10 lg:p-12">
          <div>
            <div className="inline-flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
              <img src={BRAND.logo} alt={BRAND.name} className="h-9 w-9" />
              <div>
                <p className="text-sm font-semibold">{BRAND.name} AI</p>
                <p className="text-xs text-slate-300">{BRAND.tagline}</p>
              </div>
            </div>

            <div className="mt-14 max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-300">
                {BRAND.name} product intelligence
              </p>
              <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl">
                {BRAND.fullTitle}
              </h1>
              <p className="mt-6 text-base leading-8 text-slate-300">
                Search live marketplaces, compare matching offers, analyze price
                movement and receive AI recommendations in one workspace.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              {
                icon: Search,
                label: "Live marketplace data",
              },
              {
                icon: Sparkles,
                label: "AI relevance and analysis",
              },
              {
                icon: Database,
                label: "Saved price intelligence",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <Icon size={20} className="text-blue-300" />
                  <p className="mt-3 text-sm font-semibold">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center p-6 sm:p-10">
          <form
            className="w-full"
            onSubmit={(event) => {
              event.preventDefault();
              void signInGuest(email);
            }}
          >
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <ShieldCheck size={28} />
            </div>

            <h2 className="text-2xl font-semibold text-slate-950">
              Continue to Prylensa
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Use an optional email for this guest profile, or continue without
              one. Your searches, comparisons, alerts and recommendations stay
              connected to the same profile.
            </p>

            <label className="mt-8 block">
              <span className="text-sm font-medium text-slate-700">
                Email address
              </span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-blue-500"
              />
            </label>

            {error && (
              <p className="mt-4 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={signingIn}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {signingIn ? "Creating guest workspace..." : "Enter workspace"}
              <ArrowRight size={17} />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AuthGate;
