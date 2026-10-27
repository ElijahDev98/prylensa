import {
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ChartCard } from "@/components/ui/charts";
import { usePreferences } from "@/features/settings";
import type { ComparisonOfferPricePointViewModel } from "@/features/comparison/viewmodels/comparison-analytics.viewmodel";

interface OfferDistributionChartProps {
  offers: ComparisonOfferPricePointViewModel[];
  medianPrice: number;
}

interface DistributionPoint extends ComparisonOfferPricePointViewModel {
  yPosition: number;
}

const MARKETPLACE_ORDER = ["konga", "slot", "jumia"];

function marketplaceOrder(storeId: string): number {
  const index = MARKETPLACE_ORDER.indexOf(storeId.toLowerCase());
  return index === -1 ? MARKETPLACE_ORDER.length : index;
}

function pointColor(point: ComparisonOfferPricePointViewModel): string {
  if (point.isBest) return "#16a34a";

  if (
    point.isStale ||
    point.dataSource === "persisted-snapshot" ||
    point.availabilityStatus === "unverified"
  ) {
    return "#d97706";
  }

  return "#2563eb";
}

function OfferDistributionChart({
  offers,
  medianPrice,
}: OfferDistributionChartProps) {
  const { currency, formatPrice } = usePreferences();
  const marketplaces = [...new Map(
    offers.map((offer) => [
      offer.storeId,
      { id: offer.storeId, name: offer.storeName },
    ]),
  ).values()].sort((left, right) => {
    const orderDifference = marketplaceOrder(left.id) - marketplaceOrder(right.id);
    return orderDifference || left.name.localeCompare(right.name);
  });
  const marketplaceIndexes = new Map(
    marketplaces.map((marketplace, index) => [marketplace.id, index]),
  );
  const offersByMarketplace = new Map<string, ComparisonOfferPricePointViewModel[]>();

  for (const offer of offers) {
    const marketplaceOffers = offersByMarketplace.get(offer.storeId) ?? [];
    marketplaceOffers.push(offer);
    offersByMarketplace.set(offer.storeId, marketplaceOffers);
  }

  const points: DistributionPoint[] = marketplaces.flatMap((marketplace) => {
    const marketplaceOffers = offersByMarketplace.get(marketplace.id) ?? [];
    const center = marketplaceIndexes.get(marketplace.id) ?? 0;

    return marketplaceOffers.map((offer, index) => {
      const offset = marketplaceOffers.length <= 1
        ? 0
        : ((index / (marketplaceOffers.length - 1)) - 0.5) * 0.28;

      return {
        ...offer,
        yPosition: center + offset,
      };
    });
  });
  const yTicks = marketplaces.map((_, index) => index);
  const chartHeight = Math.max(300, marketplaces.length * 82 + 110);

  return (
    <ChartCard
      title="Offer Price Distribution"
      description="Every dot is an available matched listing. Position shows the real price spread within each marketplace."
    >
      <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-600">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
          Current verified offer
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-amber-600" />
          Snapshot or unverified
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
          Best available offer
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="w-5 border-t-2 border-dashed border-violet-500" />
          Median price
        </span>
      </div>

      <div
        className="w-full"
        style={{ height: chartHeight }}
        role="img"
        aria-label={`Offer price distribution for ${offers.length} available listings across ${marketplaces.length} marketplaces`}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 32, right: 28, bottom: 42, left: 18 }}>
            <CartesianGrid
              stroke="var(--chart-grid)"
              strokeDasharray="4 4"
              horizontal
              vertical
            />
            <XAxis
              type="number"
              dataKey="price"
              name="Price"
              tickFormatter={(value) => formatPrice(Number(value))}
              tick={{
                fontSize: 12,
                fontWeight: 500,
                fill: "var(--chart-text-muted)",
              }}
              label={{
                value: `Offer price (${currency})`,
                position: "insideBottom",
                offset: -24,
                fill: "var(--chart-text)",
                fontSize: 14,
                fontWeight: 600,
              }}
            />
            <YAxis
              type="number"
              dataKey="yPosition"
              domain={[-0.5, Math.max(marketplaces.length - 0.5, 0.5)]}
              ticks={yTicks}
              width={86}
              tickFormatter={(value) => marketplaces[Math.round(Number(value))]?.name ?? ""}
              tick={{
                fontSize: 13,
                fontWeight: 600,
                fill: "var(--chart-text)",
              }}
            />
            <ReferenceLine
              x={medianPrice}
              stroke="#8b5cf6"
              strokeDasharray="6 5"
              strokeWidth={2}
              label={{
                value: `Median ${formatPrice(medianPrice)}`,
                position: "top",
                fill: "var(--chart-text)",
                fontSize: 12,
                fontWeight: 600,
              }}
            />
            <Tooltip
              cursor={{ stroke: "var(--chart-text-muted)", strokeDasharray: "4 4" }}
              content={({ active, payload }) => {
                const point = payload?.[0]?.payload as DistributionPoint | undefined;

                if (!active || !point) return null;

                return (
                  <div className="max-w-xs rounded-lg border border-slate-200 bg-white p-3 shadow-lg">
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      {point.storeName}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm font-semibold text-slate-900">
                      {point.productName}
                    </p>
                    <p className="mt-2 text-lg font-bold text-slate-950">
                      {formatPrice(point.price)}
                    </p>
                    <div className="mt-2 space-y-1 text-xs text-slate-600">
                      <p>{point.freshnessLabel}</p>
                      <p>
                        {point.isBest
                          ? "Lowest available matched offer"
                          : `${point.differencePercentage.toFixed(1)}% above the best offer`}
                      </p>
                      {point.availabilityStatus === "unverified" && (
                        <p className="font-semibold text-amber-700">
                          Availability not verified by the marketplace
                        </p>
                      )}
                    </div>
                  </div>
                );
              }}
            />
            <Scatter data={points}>
              {points.map((point) => (
                <Cell
                  key={point.id}
                  fill={pointColor(point)}
                  stroke="#ffffff"
                  strokeWidth={1.5}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export default OfferDistributionChart;
