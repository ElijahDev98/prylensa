import { authenticatedFetch } from "@/features/auth/services/authenticated-fetch";

import type { ComparisonSelectedProduct } from "./comparison.service";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

async function readItems(response: Response): Promise<ComparisonSelectedProduct[]> {
  if (!response.ok) throw new Error(`Comparison workspace request failed (${response.status}).`);
  const body = await response.json() as { success: boolean; data: ComparisonSelectedProduct[] };
  if (!body.success || !Array.isArray(body.data)) throw new Error("Invalid comparison workspace response.");
  return body.data;
}

export async function fetchComparisonWorkspace(): Promise<ComparisonSelectedProduct[]> {
  return readItems(await authenticatedFetch(`${API_BASE_URL}/api/v1/comparison/workspace`));
}

export async function saveComparisonWorkspace(
  items: ComparisonSelectedProduct[],
): Promise<ComparisonSelectedProduct[]> {
  return readItems(await authenticatedFetch(`${API_BASE_URL}/api/v1/comparison/workspace`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  }));
}
