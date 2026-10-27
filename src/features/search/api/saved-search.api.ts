import { authenticatedFetch } from "@/features/auth/services/authenticated-fetch";

export interface SavedSearch {
  id: string;
  query: string;
  lastRefreshedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface SavedSearchResponse<T> {
  success: boolean;
  data: T;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";
const ENDPOINT = `${API_BASE_URL}/api/v1/intelligence/saved-searches`;

async function readData<T>(response: Response): Promise<T> {
  if (!response.ok) throw new Error(`Saved search request failed (${response.status}).`);
  const body = (await response.json()) as SavedSearchResponse<T>;
  if (!body.success) throw new Error("Saved search request was unsuccessful.");
  return body.data;
}

export async function fetchSavedSearches(): Promise<SavedSearch[]> {
  return readData(await authenticatedFetch(ENDPOINT));
}

export async function saveSearch(query: string): Promise<SavedSearch> {
  return readData(await authenticatedFetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  }));
}

export async function removeSavedSearch(id: string): Promise<void> {
  await readData(await authenticatedFetch(`${ENDPOINT}/${encodeURIComponent(id)}`, {
    method: "DELETE",
  }));
}

export async function markSavedSearchRefreshed(id: string): Promise<SavedSearch> {
  return readData(await authenticatedFetch(
    `${ENDPOINT}/${encodeURIComponent(id)}/refreshed`,
    { method: "POST" },
  ));
}
