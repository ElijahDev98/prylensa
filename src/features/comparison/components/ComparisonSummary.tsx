/**
 * -----------------------------------------------------------------------------
 * File: ComparisonSummary.tsx
 * Feature: Compare (Presentation)
 *
 * Purpose:
 * Displays a quick overview of the current comparison.
 *
 * Responsibilities:
 * - Display number of products.
 * - Display number of stores.
 * - Display comparison status.
 *
 * Does NOT:
 * - Execute business logic.
 * - Fetch data.
 * -----------------------------------------------------------------------------
 */

import Card from "@/components/ui/Card";

interface ComparisonSummaryProps {
  productCount: number;

  storeCount: number;
}

function ComparisonSummary({
  productCount,
  storeCount,
}: ComparisonSummaryProps) {
  return (
    <Card
      className="
        grid
        gap-6
        rounded-2xl
        p-6
        sm:grid-cols-3
      "
    >
      <SummaryItem title="Products" value={productCount.toString()} />

      <SummaryItem title="Stores" value={storeCount.toString()} />

      <SummaryItem
        title="Status"
        value={productCount > 1 ? "Ready" : "Select Products"}
      />
    </Card>
  );
}

interface SummaryItemProps {
  title: string;

  value: string;
}

function SummaryItem({ title, value }: SummaryItemProps) {
  return (
    <div className="space-y-1">
      <p
        className="
          text-sm
          font-medium
          text-slate-500
        "
      >
        {title}
      </p>

      <h3
        className="
          text-2xl
          font-bold
          text-slate-900
        "
      >
        {value}
      </h3>
    </div>
  );
}

export default ComparisonSummary;
