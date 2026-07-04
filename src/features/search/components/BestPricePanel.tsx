import Card from "@/components/ui/Card";

import BestOfferCard from "./BestOfferCard";

function BestPricePanel() {
  return (
    <Card as="aside" className="p-6">
      <h2 className="text-lg font-semibold text-slate-900">Best Price</h2>

      <div className="mt-6">
        <BestOfferCard store="Jumia" price={1899000} currency="NGN" />
      </div>

      <div className="flex-1" />

      <button
        type="button"
        className="
          rounded-2xl
          border
          border-slate-300
          py-3
          font-medium
          text-slate-700
          transition-colors
          hover:bg-slate-100
        "
      >
        View All Prices
      </button>
    </Card>
  );
}

export default BestPricePanel;
