import { createContext } from "react";

import type { AppCurrency, CurrencyRates } from "@/shared/utils/currency";
import type { AppTheme } from "../theme/app-theme";

export interface PreferencesContextValue {
  currency: AppCurrency;
  rates: CurrencyRates;
  ratesUpdatedAt: string | null;
  ratesLoading: boolean;
  notificationsEnabled: boolean;
  theme: AppTheme;
  setCurrency(currency: AppCurrency): void;
  setNotificationsEnabled(enabled: boolean): void;
  setTheme(theme: AppTheme): void;
  toggleTheme(): void;
  refreshRates(): Promise<void>;
  formatPrice(valueInNgn: number): string;
}

export const PreferencesContext = createContext<PreferencesContextValue | null>(
  null,
);
