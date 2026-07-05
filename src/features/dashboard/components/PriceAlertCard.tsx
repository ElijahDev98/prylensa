/**
 * -----------------------------------------------------------------------------
 * File: PriceAlertCard.tsx
 * Feature: Dashboard
 * -----------------------------------------------------------------------------
 */

import { ArrowDown, ArrowUp } from "lucide-react";

import type { PriceAlert } from "../types/price-alert.types";

interface PriceAlertCardProps {
  alert: PriceAlert;
}

function PriceAlertCard({ alert }: PriceAlertCardProps) {
  const isDrop = alert.status === "drop";

  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-slate-200
        p-4
      "
    >
      <div>
        <h3 className="font-medium text-slate-900">{alert.product}</h3>

        <p className="mt-1 text-sm text-slate-500">{alert.store}</p>
      </div>

      <div className="text-right">
        <div
          className={`
            inline-flex
            items-center
            gap-1
            rounded-full
            px-2
            py-1
            text-xs
            font-semibold
            ${
              isDrop ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }
          `}
        >
          {isDrop ? <ArrowDown size={14} /> : <ArrowUp size={14} />}

          {alert.change}
        </div>

        <p className="mt-2 text-sm text-slate-500">{alert.currentPrice}</p>
      </div>
    </div>
  );
}

export default PriceAlertCard;
