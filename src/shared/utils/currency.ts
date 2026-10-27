export type AppCurrency = "NGN" | "USD" | "GBP";

export type CurrencyRates = Record<AppCurrency, number>;

export const DEFAULT_CURRENCY_RATES: CurrencyRates = {
  NGN: 1,
  USD: 0.00073,
  GBP: 0.00055,
};

const CURRENCY_LOCALES: Record<AppCurrency, string> = {
  NGN: "en-NG",
  USD: "en-US",
  GBP: "en-GB",
};

export function convertFromNgn(
  value: number,
  currency: AppCurrency,
  rates: CurrencyRates = DEFAULT_CURRENCY_RATES,
): number {
  return value * rates[currency];
}

export function formatCurrency(
  value: number,
  currency: AppCurrency = "NGN",
  rates: CurrencyRates = DEFAULT_CURRENCY_RATES,
): string {
  return new Intl.NumberFormat(CURRENCY_LOCALES[currency], {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "NGN" ? 0 : 2,
  }).format(convertFromNgn(value, currency, rates));
}
