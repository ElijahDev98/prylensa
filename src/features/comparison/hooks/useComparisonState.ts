/**
 * -----------------------------------------------------------------------------
 * File: useComparisonState.ts
 * Feature: Comparison Domain
 *
 * Purpose:
 * Owns the Comparison Domain state.
 *
 * Responsibilities:
 * - Manage selected product IDs.
 * - Compose comparison preferences.
 * - Resolve Product entities.
 * - Resolve Store entities.
 * - Order products.
 * - Apply comparison preferences.
 * - Build Comparison business models.
 * - Execute Comparison Intelligence.
 * - Execute Comparison Analytics.
 * - Export comparison data.
 * - Map business models into presentation ViewModels.
 * -----------------------------------------------------------------------------
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  addSelectedProduct,
  clearComparison,
  createComparisonState,
  normalizeSelectedProductGroups,
  removeProduct,
  replaceSelectedProductGroup,
  resetComparison,
} from "../services/comparison.service";

import { analyzeComparison } from "../services/comparison-analysis";

import { buildComparisonAnalytics } from "../services/comparison-analytics.service";
import {
  buildAiComparisonGroups,
  compareProductsWithAi,
  reformatAiComparison,
} from "../services/comparison-ai.service";

import { exportAiTrainingDataset } from "../services/comparison-export.service";

import { orderProducts } from "../services/comparison-product-order.service";

import { getComparisonRows } from "../services/comparison-row.service";

import { toComparisonInsightViewModels } from "../mappers/comparison-insight.mapper";
import { toComparisonProductViewModels } from "../mappers/comparison.mapper";
import { toComparisonRecommendationViewModel } from "../mappers/comparison-recommendation.mapper";
import { toComparisonRowViewModels } from "../mappers/comparison-row.mapper";
import { toComparisonSummaryViewModel } from "../mappers/comparison-summary.mapper";

import useComparisonPreferences from "./useComparisonPreferences";

import { EMPTY_ANALYTICS } from "../viewmodels/comparison-analytics.viewmodel";
import { EMPTY_INSIGHTS } from "../viewmodels/comparison-insight.viewmodel";
import { EMPTY_RECOMMENDATION } from "../viewmodels/recommendation.viewmodel";
import { EMPTY_SUMMARY } from "../viewmodels/comparison-summary.viewmodel";
import { EMPTY_AI_COMPARISON } from "../viewmodels/ai-comparison.viewmodel";

import type { Offer } from "@/features/offer/types/offer.types";
import type { Product } from "@/features/product/types/product.types";
import type { Store } from "@/features/store/types/store.types";

import type { ComparisonViewModel } from "../viewmodels/comparison.viewmodel";
import type { ComparisonSelectedProduct } from "../services/comparison.service";
import { usePreferences } from "@/features/settings";
import { useGuestSession } from "@/features/auth";
import {
  fetchComparisonWorkspace,
  saveComparisonWorkspace,
} from "../services/comparison-workspace.service";
import { toExternalMarketplaceProductUrl } from "@/shared/utils/marketplace-url";

function toProductEntity(product: ComparisonSelectedProduct): Product {
  return {
    id: product.id,

    title: product.title,

    brand: product.brand,

    category: product.category,

    description: product.description,

    rating: product.rating,

    reviewCount: product.reviewCount,

    images: product.imageUrl
      ? [
          {
            id: `${product.id}-image`,
            url: product.imageUrl,
            alt: product.imageAlt,
          },
        ]
      : [],

    specifications: product.specifications,
  };
}

function toOfferEntity(
  productId: string,
  offer: ComparisonSelectedProduct["offers"][number],
): Offer {
  return {
    ...offer,

    productUrl: toExternalMarketplaceProductUrl(
      offer.productUrl,
      offer.storeId,
    ),

    productId,

    currency: "NGN",

    dataSource: offer.dataSource,

    observedAt: offer.observedAt,

    lastUpdated: offer.observedAt ?? "",
  };
}

function useComparisonState(): ComparisonViewModel {
  const { formatPrice } = usePreferences();
  const { session } = useGuestSession();
  const formatPriceRef = useRef(formatPrice);
  /**
   * ---------------------------------------------------------------------------
   * Comparison State
   * ---------------------------------------------------------------------------
   */

  const [comparison, setComparison] = useState(createComparisonState);
  const [workspaceLoaded, setWorkspaceLoaded] = useState(false);
  const comparisonRef = useRef(comparison);
  const mutationVersionRef = useRef(0);
  const saveQueueRef = useRef<Promise<void>>(Promise.resolve());

  const [aiComparison, setAiComparison] = useState(EMPTY_AI_COMPARISON);

  const [aiRefreshVersion, setAiRefreshVersion] = useState(0);
  const [isExportingDataset, setIsExportingDataset] = useState(false);
  const [datasetExportError, setDatasetExportError] = useState<string | null>(null);

  useEffect(() => {
    formatPriceRef.current = formatPrice;
  }, [formatPrice]);

  const persistComparison = useCallback(
    (items: ComparisonSelectedProduct[]): Promise<void> => {
      if (!session) {
        return Promise.resolve();
      }

      const operation = saveQueueRef.current
        .catch(() => undefined)
        .then(() => saveComparisonWorkspace(items))
        .then(() => undefined);

      saveQueueRef.current = operation.catch(() => undefined);

      return operation;
    },
    [session],
  );

  useEffect(() => {
    if (!session) {
      queueMicrotask(() => {
        const emptyComparison = createComparisonState();
        setWorkspaceLoaded(false);
        comparisonRef.current = emptyComparison;
        setComparison(emptyComparison);
      });
      return;
    }
    const hydrationMutationVersion = mutationVersionRef.current;
    let cancelled = false;
    void fetchComparisonWorkspace()
      .then((items) => {
        if (
          !cancelled &&
          mutationVersionRef.current === hydrationMutationVersion
        ) {
          const normalizedItems = normalizeSelectedProductGroups(items);
          const hydratedComparison = {
            selectedProductIds: normalizedItems.map((item) => item.id),
            selectedProducts: normalizedItems,
          };
          comparisonRef.current = hydratedComparison;
          setComparison(hydratedComparison);
        }
      })
      .catch(() => undefined)
      .finally(() => { if (!cancelled) setWorkspaceLoaded(true); });
    return () => { cancelled = true; };
  }, [session]);

  useEffect(() => {
    if (!session || !workspaceLoaded) return;
    const timer = window.setTimeout(() => {
      void persistComparison(comparison.selectedProducts).catch(() => undefined);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [comparison.selectedProducts, persistComparison, session, workspaceLoaded]);

  const displayAiComparison = useMemo(
    () => reformatAiComparison(aiComparison, formatPrice),
    [aiComparison, formatPrice],
  );

  /**
   * ---------------------------------------------------------------------------
   * Comparison Preferences
   * ---------------------------------------------------------------------------
   */

  const preferences = useComparisonPreferences();

  const commitComparison = useCallback(
    (
      update: (previous: ReturnType<typeof createComparisonState>) =>
        ReturnType<typeof createComparisonState>,
    ): Promise<void> => {
      const nextComparison = update(comparisonRef.current);
      comparisonRef.current = nextComparison;
      mutationVersionRef.current += 1;
      setComparison(nextComparison);

      return persistComparison(nextComparison.selectedProducts);
    },
    [persistComparison],
  );

  /**
   * ---------------------------------------------------------------------------
   * Comparison Actions
   * ---------------------------------------------------------------------------
   */

  const actions = useMemo(
    () => ({
      addSelectedProduct(product: ComparisonSelectedProduct) {
        return commitComparison((previous) =>
          addSelectedProduct(previous, product),
        );
      },

      replaceSelectedProductGroup(
        groupId: string,
        products: ComparisonSelectedProduct[],
      ) {
        return commitComparison((previous) =>
          replaceSelectedProductGroup(previous, groupId, products),
        );
      },

      removeProduct(productId: string) {
        void commitComparison((previous) => removeProduct(previous, productId));
      },

      isSelected(productId: string) {
        return comparison.selectedProductIds.includes(productId);
      },

      clearComparison() {
        void commitComparison(() => clearComparison());
      },

      resetComparison() {
        void commitComparison(() => resetComparison());
      },
    }),
    [commitComparison, comparison.selectedProductIds],
  );

  /**
   * ---------------------------------------------------------------------------
   * Domain Entities
   * ---------------------------------------------------------------------------
   */

  const productEntities = comparison.selectedProducts.map(toProductEntity);

  const runtimeOfferEntities = comparison.selectedProducts.flatMap((product) =>
    product.offers.map((offer) => toOfferEntity(product.id, offer)),
  );

  const offerEntities = runtimeOfferEntities;

  const stores = [...new Set(offerEntities.map((offer) => offer.storeId))].map(
    (storeId): Store => {
      const storeOffer = offerEntities.find((offer) => offer.storeId === storeId);
      const website = (() => {
        try {
          return storeOffer?.productUrl ? new URL(storeOffer.productUrl).origin : "";
        } catch {
          return "";
        }
      })();
      return {
        id: storeId,
        name: storeId.charAt(0).toUpperCase() + storeId.slice(1),
        website,
        logoUrl: `/stores/${storeId.toLowerCase()}.svg`,
        logoAlt: `${storeId} logo`,
        trustScore: 0,
        rating: 0,
        reviewCount: 0,
        verified: false,
      };
    },
  );

  /**
   * ---------------------------------------------------------------------------
   * Ordered Products
   * ---------------------------------------------------------------------------
   */

  const orderedProducts = orderProducts(productEntities, preferences.sortBy, offerEntities);

  /**
   * ---------------------------------------------------------------------------
   * Visible Stores
   * ---------------------------------------------------------------------------
   */

  const visibleStores =
    preferences.selectedStoreIds.length === 0
      ? stores
      : stores.filter((store) =>
          preferences.selectedStoreIds.includes(store.id),
        );

  /**
   * ---------------------------------------------------------------------------
   * Business Models
   * ---------------------------------------------------------------------------
   */

  const rowModels = getComparisonRows({
    products: orderedProducts,
    stores: visibleStores,
    offers: offerEntities,
  });

  /**
   * ---------------------------------------------------------------------------
   * Comparison Intelligence
   * ---------------------------------------------------------------------------
   */

  const analysis = analyzeComparison(rowModels, visibleStores);

  /**
   * ---------------------------------------------------------------------------
   * Comparison Analytics
   * ---------------------------------------------------------------------------
   */

  const analytics = buildComparisonAnalytics(
    orderedProducts,
    rowModels,
    visibleStores,
    offerEntities,
  );

  /**
   * ---------------------------------------------------------------------------
   * Stable ViewModels
   * ---------------------------------------------------------------------------
   */

  const stableAnalytics = analytics ?? EMPTY_ANALYTICS;

  const summary =
    analysis.summary == null
      ? EMPTY_SUMMARY
      : toComparisonSummaryViewModel(analysis.summary, orderedProducts.length);

  const recommendation =
    analysis.recommendation == null
      ? EMPTY_RECOMMENDATION
      : (() => {
          const recommendedProduct =
            orderedProducts.find(
              (product) =>
                product.id === analysis.recommendation?.offer.productId,
            );

          const recommendedStore = stores.find(
            (store) => store.id === analysis.recommendation?.offer.storeId,
          );

          const recommendedOffer = offerEntities.find(
            (offer) =>
              offer.productId === analysis.recommendation?.offer.productId &&
              offer.storeId === analysis.recommendation?.offer.storeId,
          );

          return toComparisonRecommendationViewModel({
            recommendation: analysis.recommendation,

            product: recommendedProduct,

            store: recommendedStore,

            productUrl: recommendedOffer?.productUrl,

            sourceOffer: recommendedOffer,

            savings: Math.max(
              0,
              analysis.summary.averagePrice -
                (analysis.recommendation.offer.price ?? 0),
            ),

            searchAnalysis: comparison.selectedProducts.find(
              (product) => product.id === analysis.recommendation?.offer.productId,
            )?.aiAnalysis,

            formatPrice,
          });
        })();

  const insights =
    analysis.insights.length === 0
      ? EMPTY_INSIGHTS
      : toComparisonInsightViewModels(analysis.insights);

  /**
   * ---------------------------------------------------------------------------
   * Presentation ViewModels
   * ---------------------------------------------------------------------------
   */

  const products = toComparisonProductViewModels(orderedProducts);

  const rows = toComparisonRowViewModels(rowModels);

  /**
   * The serialized request is stable across ordinary renders, preventing the
   * AI comparison from being requested repeatedly unless products, offers,
   * store filters, or the explicit refresh action change.
   */
  const aiComparisonRequestKey = JSON.stringify(
    buildAiComparisonGroups(
      orderedProducts,
      offerEntities.filter((offer) =>
        visibleStores.some((store) => store.id === offer.storeId),
      ),
      visibleStores,
    ),
  );
  const hasComparableProducts = (
    JSON.parse(aiComparisonRequestKey) as ReturnType<
      typeof buildAiComparisonGroups
    >
  ).filter((group) => group.offers.length > 0).length >= 2;

  useEffect(() => {
    const groups = JSON.parse(aiComparisonRequestKey) as ReturnType<
      typeof buildAiComparisonGroups
    >;
    const comparableGroups = groups.filter((group) => group.offers.length > 0);

    if (comparableGroups.length < 2) {
      queueMicrotask(() => {
        setAiComparison((current) =>
          current.status === "idle" ? current : EMPTY_AI_COMPARISON,
        );
      });
      return;
    }

    const controller = new AbortController();

    void Promise.resolve()
      .then(() => {
        if (controller.signal.aborted) {
          return null;
        }

        setAiComparison({
          ...EMPTY_AI_COMPARISON,
          status: "loading",
        });

        return compareProductsWithAi(
          comparableGroups,
          formatPriceRef.current,
          controller.signal,
        );
      })
      .then((result) => {
        if (!result) {
          return;
        }

        setAiComparison(result);
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return;
        }

        setAiComparison({
          ...EMPTY_AI_COMPARISON,
          status: "error",
          error:
            error instanceof Error
              ? error.message
              : "Unable to generate the AI comparison.",
        });
      });

    return () => controller.abort();
  }, [aiComparisonRequestKey, aiRefreshVersion]);

  const refreshAiComparison = useCallback(() => {
    setAiRefreshVersion((version) => version + 1);
  }, []);

  /**
   * ---------------------------------------------------------------------------
   * Utility Actions
   * ---------------------------------------------------------------------------
   */

  const handleExportDataset = useCallback(async () => {
    if (isExportingDataset) return;

    setIsExportingDataset(true);
    setDatasetExportError(null);
    try {
      await exportAiTrainingDataset();
    } catch (error) {
      setDatasetExportError(
        error instanceof Error
          ? error.message
          : "Unable to export the AI dataset.",
      );
    } finally {
      setIsExportingDataset(false);
    }
  }, [isExportingDataset]);

  /**
   * ---------------------------------------------------------------------------
   * Public ViewModel
   * ---------------------------------------------------------------------------
   */

  return {
    products,

    rows,

    stores,

    analytics: stableAnalytics,

    summary,

    recommendation,

    insights,

    aiComparison: hasComparableProducts
      ? displayAiComparison
      : EMPTY_AI_COMPARISON,

    selectedCount: comparison.selectedProductIds.length,

    isExportingDataset,

    datasetExportError,

    exportDataset: handleExportDataset,

    refreshAiComparison,

    ...preferences,

    ...actions,
  };
}

export default useComparisonState;
