import { ExternalLink, PackageCheck, ShieldCheck, Sparkles, X } from "lucide-react";
import { useState } from "react";

import ProductImage from "@/components/ui/ProductImage";
import useComparisonContext from "@/features/comparison/context/useComparisonContext";
import type { ComparisonMarketplacePriceViewModel } from "@/features/comparison/viewmodels/comparison-analytics.viewmodel";
import { usePreferences } from "@/features/settings";
import StoreMark from "@/features/store/components/StoreMark";

function variantClassName(
  status: "verified" | "review" | "conflict" | "insufficient",
): string {
  if (status === "verified") return "bg-emerald-50 text-emerald-700";
  if (status === "conflict") return "bg-red-50 text-red-700";
  return "bg-amber-50 text-amber-700";
}

function availabilityLabel(
  marketplace: ComparisonMarketplacePriceViewModel,
): string {
  if (marketplace.availabilityStatus === "unverified") {
    return "Availability unverified";
  }

  if (marketplace.stockStatus === "LOW_STOCK") return "Low stock";
  return "In stock";
}

function availabilityClassName(
  marketplace: ComparisonMarketplacePriceViewModel,
): string {
  return marketplace.availabilityStatus === "unverified"
    ? "text-amber-700"
    : "text-emerald-700";
}

function MatchedMarketplaceMatrix() {
  const comparison = useComparisonContext();
  const { formatPrice } = usePreferences();
  const [expandedStoreId, setExpandedStoreId] = useState<string | null>(null);
  const marketplaces = comparison.analytics.marketplacePrices;
  const priceLeader = marketplaces.find((marketplace) => marketplace.isLowest) ?? marketplaces[0];
  const canonicalProduct = comparison.products.find(
    (product) => product.id === priceLeader?.productId,
  ) ?? comparison.products[0];
  const highestDiscount = Math.max(
    0,
    ...marketplaces.map((marketplace) => marketplace.discount),
  );
  const expandedMarketplace = marketplaces.find(
    (marketplace) => marketplace.storeId === expandedStoreId,
  );
  const expandedOffers = comparison.analytics.offers.filter(
    (offer) => offer.storeId === expandedStoreId,
  );

  if (!canonicalProduct || !priceLeader) return null;

  return (
    <section aria-label="Matched marketplace comparison">
      <header className="flex flex-col gap-5 border-b border-slate-200 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
            <ProductImage
              src={canonicalProduct.imageUrl}
              alt={canonicalProduct.imageAlt}
              category={canonicalProduct.category}
            />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xs font-semibold uppercase text-blue-700">
                Matched product group
              </p>
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                1 product · {marketplaces.length} marketplaces
              </span>
            </div>
            <h3 className="mt-2 max-w-3xl text-xl font-bold leading-tight text-slate-950">
              {canonicalProduct.title}
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {canonicalProduct.subtitle} · {comparison.analytics.offerCount} available matched listings
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={comparison.clearComparison}
          title="Remove matched product group"
          aria-label="Remove matched product group"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center self-end rounded-lg border border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-600 lg:self-auto"
        >
          <X size={17} aria-hidden="true" />
        </button>
      </header>

      <div className="grid gap-4 border-b border-slate-200 bg-slate-50 px-6 py-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="flex min-w-0 items-start gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-700 shadow-sm">
            <ShieldCheck size={18} aria-hidden="true" />
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-slate-950">AI match integrity</p>
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${variantClassName(comparison.recommendation.aiVariantStatus)}`}>
                {comparison.recommendation.aiVariantLabel}
              </span>
            </div>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
              {comparison.recommendation.aiVariantSummary}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-blue-50 px-3 py-1.5 text-blue-700">
            {comparison.recommendation.aiConfidenceLabel || `${comparison.recommendation.confidence}% confidence`}
          </span>
          {comparison.recommendation.aiRiskLabel && (
            <span className="rounded-full bg-amber-50 px-3 py-1.5 text-amber-700">
              {comparison.recommendation.aiRiskLabel}
            </span>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-215 w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-white">
              <th className="sticky left-0 z-20 w-52 bg-white px-6 py-5 text-xs font-semibold uppercase text-slate-500">
                Marketplace evidence
              </th>
              {marketplaces.map((marketplace) => (
                <th key={marketplace.id} className="min-w-64 border-l border-slate-200 px-5 py-5">
                  <div className="flex items-center gap-3">
                    <StoreMark
                      storeId={marketplace.storeId}
                      storeName={marketplace.storeName}
                      className="h-9 w-9 text-[8px]"
                    />
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-950">{marketplace.storeName}</span>
                        {marketplace.isLowest && (
                          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                            Best price
                          </span>
                        )}
                      </div>
                      <span className="mt-1 block text-xs font-normal text-slate-500">
                        {marketplace.offerCount} listing{marketplace.offerCount === 1 ? "" : "s"}
                      </span>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            <tr>
              <th className="sticky left-0 z-10 bg-white px-6 py-4 font-semibold text-slate-700">Best valid price</th>
              {marketplaces.map((marketplace) => (
                <td key={marketplace.id} className={`border-l border-slate-200 px-5 py-4 text-lg font-bold ${marketplace.isLowest ? "bg-emerald-50 text-emerald-700" : "text-slate-950"}`}>
                  {formatPrice(marketplace.price)}
                </td>
              ))}
            </tr>
            <tr>
              <th className="sticky left-0 z-10 bg-white px-6 py-4 font-semibold text-slate-700">Original price</th>
              {marketplaces.map((marketplace) => (
                <td key={marketplace.id} className="border-l border-slate-200 px-5 py-4 text-slate-700">
                  {marketplace.previousPrice > marketplace.price
                    ? formatPrice(marketplace.previousPrice)
                    : "Not provided"}
                </td>
              ))}
            </tr>
            <tr>
              <th className="sticky left-0 z-10 bg-white px-6 py-4 font-semibold text-slate-700">Discount</th>
              {marketplaces.map((marketplace) => (
                <td key={marketplace.id} className={`border-l border-slate-200 px-5 py-4 font-semibold ${marketplace.discount > 0 && marketplace.discount === highestDiscount ? "bg-amber-50 text-amber-700" : "text-slate-700"}`}>
                  {marketplace.discount > 0 ? `${marketplace.discount}%` : "No verified discount"}
                </td>
              ))}
            </tr>
            <tr>
              <th className="sticky left-0 z-10 bg-white px-6 py-4 font-semibold text-slate-700">Availability</th>
              {marketplaces.map((marketplace) => (
                <td key={marketplace.id} className={`border-l border-slate-200 px-5 py-4 font-semibold ${availabilityClassName(marketplace)}`}>
                  <span className="inline-flex items-center gap-2">
                    <PackageCheck size={16} aria-hidden="true" />
                    {availabilityLabel(marketplace)}
                  </span>
                </td>
              ))}
            </tr>
            <tr>
              <th className="sticky left-0 z-10 bg-white px-6 py-4 font-semibold text-slate-700">Observation freshness</th>
              {marketplaces.map((marketplace) => (
                <td key={marketplace.id} className={`border-l border-slate-200 px-5 py-4 ${marketplace.isStale ? "font-semibold text-amber-700" : "text-slate-700"}`}>
                  {marketplace.freshnessLabel}
                </td>
              ))}
            </tr>
            <tr>
              <th className="sticky left-0 z-10 bg-white px-6 py-4 font-semibold text-slate-700">Evidence source</th>
              {marketplaces.map((marketplace) => (
                <td key={marketplace.id} className="border-l border-slate-200 px-5 py-4 text-slate-700">
                  {marketplace.dataSource === "live" ? "Live marketplace result" : "Persisted marketplace snapshot"}
                </td>
              ))}
            </tr>
            <tr>
              <th className="sticky left-0 z-10 bg-white px-6 py-4 font-semibold text-slate-700">Marketplace offers</th>
              {marketplaces.map((marketplace) => (
                <td key={marketplace.id} className="border-l border-slate-200 px-5 py-4">
                  <button
                    type="button"
                    aria-expanded={expandedStoreId === marketplace.storeId}
                    aria-controls={`marketplace-offers-${marketplace.storeId}`}
                    onClick={() => setExpandedStoreId((current) => current === marketplace.storeId ? null : marketplace.storeId)}
                    className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100"
                  >
                    View {marketplace.offerCount} offer{marketplace.offerCount === 1 ? "" : "s"}
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {expandedMarketplace && (
        <section
          id={`marketplace-offers-${expandedMarketplace.storeId}`}
          className="border-t border-slate-200 bg-slate-50 px-6 py-5"
          aria-label={`${expandedMarketplace.storeName} matched offers`}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-blue-700">
                <Sparkles size={16} aria-hidden="true" />
                <p className="text-sm font-semibold">Matched offer evidence</p>
              </div>
              <h4 className="mt-1 text-lg font-bold text-slate-950">
                {expandedMarketplace.storeName} offers
              </h4>
            </div>
            <p className="text-xs text-slate-500">
              Ranked by valid current price
            </p>
          </div>

          <div className="mt-4 divide-y divide-slate-200 border-y border-slate-200">
            {expandedOffers.map((offer, index) => (
              <div key={`${offer.id}:${index}`} className="grid gap-3 py-3 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center">
                <div className="min-w-0">
                  <p className="line-clamp-1 font-medium text-slate-900">{offer.productName}</p>
                  <p className="mt-1 text-xs text-slate-500">{offer.freshnessLabel}</p>
                </div>
                <p className="font-bold text-slate-950">{formatPrice(offer.price)}</p>
                {offer.productUrl ? (
                  <a
                    href={offer.productUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
                  >
                    Visit store
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                ) : (
                  <span className="text-xs text-slate-500">Store link unavailable</span>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}

export default MatchedMarketplaceMatrix;
