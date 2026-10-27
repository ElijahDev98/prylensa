import { ROUTES } from "@/app/router/routes";

import type { RecommendationViewModel } from "@/features/dashboard/viewmodels/dashboard.viewmodel";

export function recommendationProductTitle(
  recommendation: RecommendationViewModel,
): string {
  const separator = recommendation.title.indexOf(":");
  return separator >= 0
    ? recommendation.title.slice(separator + 1).trim()
    : recommendation.title.trim();
}

export function recommendationActionLabel(
  recommendation: RecommendationViewModel,
): string {
  return recommendation.title.toLowerCase().startsWith("track price")
    ? "Create alert"
    : "Find offers";
}

export function recommendationDestination(
  recommendation: RecommendationViewModel,
): string {
  const product = recommendationProductTitle(recommendation);

  if (recommendation.title.toLowerCase().startsWith("track price")) {
    return `${ROUTES.ALERTS}?product=${encodeURIComponent(product)}&type=price-drop`;
  }

  return `${ROUTES.SEARCH}?q=${encodeURIComponent(product)}`;
}
