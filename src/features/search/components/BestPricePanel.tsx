import Card from "@/components/ui/Card";
import { LAYOUT, SPACING } from "@/design-system";

import BestOfferCard from "./BestOfferCard";

function BestPricePanel() {
  return (
    <Card
      as="aside"
      className={`
        flex
        ${LAYOUT.workspacePanel.fullHeight}
        ${LAYOUT.workspacePanel.minHeight}
        ${LAYOUT.workspacePanel.maxHeight}
        flex-col
        ${SPACING.panel}
      `}
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Best Price</h2>

        <div className="mt-6">
          <BestOfferCard store="Jumia" price={1899000} currency="NGN" />
        </div>
      </div>

      <div className="flex-1" />

      <div className={SPACING.actionTop}>
        <button
          type="button"
          className="
            w-full
            rounded-2xl
            border
            border-slate-300
            py-3
            font-medium
            text-slate-700
            transition-colors
            duration-200
            hover:bg-slate-100
            focus:outline-none
            focus:ring-2
            focus:ring-slate-200
          "
        >
          View All Prices
        </button>
      </div>
    </Card>
  );
}

export default BestPricePanel;
