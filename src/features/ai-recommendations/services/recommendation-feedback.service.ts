import { authenticatedFetch } from "@/features/auth/services/authenticated-fetch";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

export type RecommendationFeedback = "helpful" | "not-helpful";

export async function submitRecommendationFeedback(
  recommendationId: string,
  feedback: RecommendationFeedback,
): Promise<void> {
  const response = await authenticatedFetch(
    `${API_BASE_URL}/api/v1/recommendations/${encodeURIComponent(recommendationId)}/feedback`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ feedback }),
    },
  );

  if (!response.ok) {
    throw new Error(`Recommendation feedback failed (${response.status}).`);
  }
}
