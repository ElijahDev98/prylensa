import type { AppCurrency } from "@/shared/utils/currency";
import type { AppTheme } from "../theme/app-theme";
import { authenticatedFetch } from "@/features/auth/services/authenticated-fetch";

export interface BackendSettings {
  currency: AppCurrency;
  notificationsEnabled: boolean;
  theme: AppTheme;
  updatedAt: string;
}

interface SettingsResponse {
  success: boolean;
  data: BackendSettings;
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

async function readSettings(response: Response): Promise<BackendSettings> {
  if (!response.ok) throw new Error(`Settings request failed (${response.status}).`);
  const body = (await response.json()) as SettingsResponse;
  if (!body.success) throw new Error("Settings request was unsuccessful.");
  return body.data;
}

export async function fetchSettings(userId: string): Promise<BackendSettings> {
  void userId;
  const response = await authenticatedFetch(`${API_BASE_URL}/api/v1/settings`);
  return readSettings(response);
}

export async function updateSettings(
  userId: string,
  input: Pick<BackendSettings, "currency" | "notificationsEnabled" | "theme">,
): Promise<BackendSettings> {
  void userId;
  const response = await authenticatedFetch(`${API_BASE_URL}/api/v1/settings`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return readSettings(response);
}
