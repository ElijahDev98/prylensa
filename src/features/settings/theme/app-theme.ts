export type AppTheme = "light" | "dark";

const PREFERENCES_KEY = "prylensa.preferences";
const LEGACY_PREFERENCES_KEY = "priciq.preferences";

export function isAppTheme(value: unknown): value is AppTheme {
  return value === "light" || value === "dark";
}

export function readStoredTheme(): AppTheme {
  try {
    const stored = window.localStorage.getItem(PREFERENCES_KEY) ??
      window.localStorage.getItem(LEGACY_PREFERENCES_KEY);
    if (!stored) return "light";

    const theme = (JSON.parse(stored) as { theme?: unknown }).theme;
    return isAppTheme(theme) ? theme : "light";
  } catch {
    return "light";
  }
}

export function applyAppTheme(theme: AppTheme): void {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
}
