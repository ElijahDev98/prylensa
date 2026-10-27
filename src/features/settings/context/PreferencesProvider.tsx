import { useCallback, useEffect, useMemo, useState } from "react";

import {
  DEFAULT_CURRENCY_RATES,
  formatCurrency,
} from "@/shared/utils/currency";

import { PreferencesContext } from "./preferences-context";
import { useGuestSession } from "@/features/auth";
import { fetchSettings, updateSettings } from "../api/settings.api";

import type { ReactNode } from "react";
import type { AppCurrency, CurrencyRates } from "@/shared/utils/currency";
import { readMigratedStorageValue } from "@/shared/utils/migrated-storage";
import {
  applyAppTheme,
  isAppTheme,
  readStoredTheme,
} from "../theme/app-theme";

import type { AppTheme } from "../theme/app-theme";

interface PreferencesProviderProps {
  children: ReactNode;
}

interface StoredPreferences {
  currency: AppCurrency;
  notificationsEnabled: boolean;
  theme: AppTheme;
}

interface StoredRates {
  rates: CurrencyRates;
  updatedAt: string;
}

const PREFERENCES_KEY = "prylensa.preferences";
const RATES_KEY = "prylensa.currency-rates";
const LEGACY_PREFERENCES_KEY = "priciq.preferences";
const LEGACY_RATES_KEY = "priciq.currency-rates";
const RATE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

function loadPreferences(): StoredPreferences {
  const defaults: StoredPreferences = {
    currency: "NGN",
    notificationsEnabled: true,
    theme: readStoredTheme(),
  };

  try {
    const stored = readMigratedStorageValue(
      PREFERENCES_KEY,
      LEGACY_PREFERENCES_KEY,
    );
    if (!stored) return defaults;
    const parsed = JSON.parse(stored) as Partial<StoredPreferences>;
    return {
      ...defaults,
      ...parsed,
      theme: isAppTheme(parsed.theme) ? parsed.theme : defaults.theme,
    };
  } catch {
    return defaults;
  }
}

function loadRates(): StoredRates | null {
  try {
    const stored = readMigratedStorageValue(RATES_KEY, LEGACY_RATES_KEY);
    return stored ? (JSON.parse(stored) as StoredRates) : null;
  } catch {
    return null;
  }
}

function PreferencesProvider({ children }: PreferencesProviderProps) {
  const { session } = useGuestSession();
  const [currency, setCurrency] = useState(
    () => loadPreferences().currency,
  );
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    () => loadPreferences().notificationsEnabled,
  );
  const [theme, setTheme] = useState<AppTheme>(
    () => loadPreferences().theme,
  );
  const [rates, setRates] = useState<CurrencyRates>(
    () => loadRates()?.rates ?? DEFAULT_CURRENCY_RATES,
  );
  const [ratesUpdatedAt, setRatesUpdatedAt] = useState<string | null>(
    () => loadRates()?.updatedAt ?? null,
  );
  const [ratesLoading, setRatesLoading] = useState(false);
  const [hydratedUserId, setHydratedUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!session) {
      return;
    }

    let cancelled = false;

    void fetchSettings(session.user.id)
      .then((settings) => {
        if (cancelled) return;
        setCurrency(settings.currency);
        setNotificationsEnabled(settings.notificationsEnabled);
        if (isAppTheme(settings.theme)) setTheme(settings.theme);
      })
      .catch(() => {
        // Local preferences remain authoritative while the backend is offline.
      })
      .finally(() => {
        if (!cancelled) setHydratedUserId(session.user.id);
      });

    return () => { cancelled = true; };
  }, [session]);

  const refreshRates = useCallback(async () => {
    setRatesLoading(true);

    try {
      const response = await fetch("https://open.er-api.com/v6/latest/NGN");
      if (!response.ok) throw new Error("Exchange rates unavailable");

      const data = (await response.json()) as {
        result?: string;
        rates?: Partial<Record<AppCurrency, number>>;
        time_last_update_utc?: string;
      };
      const usd = data.rates?.USD;
      const gbp = data.rates?.GBP;

      if (data.result !== "success" || !usd || !gbp) {
        throw new Error("Invalid exchange-rate response");
      }

      const nextRates: CurrencyRates = { NGN: 1, USD: usd, GBP: gbp };
      const updatedAt = data.time_last_update_utc ?? new Date().toISOString();
      setRates(nextRates);
      setRatesUpdatedAt(updatedAt);
      window.localStorage.setItem(
        RATES_KEY,
        JSON.stringify({ rates: nextRates, updatedAt } satisfies StoredRates),
      );
    } catch {
      const attemptedAt = new Date().toISOString();
      setRatesUpdatedAt(attemptedAt);
      window.localStorage.setItem(
        RATES_KEY,
        JSON.stringify({ rates, updatedAt: attemptedAt } satisfies StoredRates),
      );
    } finally {
      setRatesLoading(false);
    }
  }, [rates]);

  useEffect(() => {
    applyAppTheme(theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(
      PREFERENCES_KEY,
      JSON.stringify({ currency, notificationsEnabled, theme } satisfies StoredPreferences),
    );
  }, [currency, notificationsEnabled, theme]);

  useEffect(() => {
    if (!session || hydratedUserId !== session.user.id) return;

    const timer = window.setTimeout(() => {
      void updateSettings(session.user.id, {
        currency,
        notificationsEnabled,
        theme,
      }).catch(() => undefined);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [currency, hydratedUserId, notificationsEnabled, session, theme]);

  useEffect(() => {
    const updatedTime = ratesUpdatedAt ? Date.parse(ratesUpdatedAt) : 0;
    if (Date.now() - updatedTime <= RATE_MAX_AGE_MS) return;

    const timer = window.setTimeout(() => void refreshRates(), 0);
    return () => window.clearTimeout(timer);
  }, [ratesUpdatedAt, refreshRates]);

  const formatPrice = useCallback(
    (valueInNgn: number) => formatCurrency(valueInNgn, currency, rates),
    [currency, rates],
  );

  const toggleTheme = useCallback(() => {
    setTheme((current) => current === "light" ? "dark" : "light");
  }, []);

  const value = useMemo(
    () => ({
      currency,
      rates,
      ratesUpdatedAt,
      ratesLoading,
      notificationsEnabled,
      theme,
      setCurrency,
      setNotificationsEnabled,
      setTheme,
      toggleTheme,
      refreshRates,
      formatPrice,
    }),
    [
      currency,
      rates,
      ratesUpdatedAt,
      ratesLoading,
      notificationsEnabled,
      theme,
      toggleTheme,
      refreshRates,
      formatPrice,
    ],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export default PreferencesProvider;
