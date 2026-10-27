import { Star, Store } from "lucide-react";
import { useState } from "react";

interface StoreMarkProps {
  storeId: string;
  storeName: string;
  className?: string;
}

function StoreMark({ storeId, storeName, className = "h-8 w-8" }: StoreMarkProps) {
  const [kongaLogoFailed, setKongaLogoFailed] = useState(false);
  const identity = `${storeId} ${storeName}`.toLowerCase();
  const commonClassName = `inline-flex shrink-0 items-center justify-center overflow-hidden rounded-lg border bg-white ${className}`;

  if (identity.includes("jumia")) {
    return (
      <span role="img" aria-label="Jumia marketplace" className={`${commonClassName} border-orange-200`}>
        <Star size={19} className="fill-orange-500 text-orange-500" aria-hidden="true" />
      </span>
    );
  }

  if (identity.includes("konga")) {
    if (!kongaLogoFailed) {
      return (
        <span
          role="img"
          aria-label="Konga marketplace"
          className={`${commonClassName} border-pink-200 p-1`}
        >
          <img
            src="/stores/konga.svg"
            alt=""
            className="h-full w-full object-contain"
            onError={() => setKongaLogoFailed(true)}
          />
        </span>
      );
    }

    return (
      <span role="img" aria-label="Konga marketplace" className={`${commonClassName} border-pink-200 bg-pink-600 font-black text-white`}>
        K
      </span>
    );
  }

  if (identity.includes("slot")) {
    return (
      <span role="img" aria-label="SLOT marketplace" className={`${commonClassName} border-emerald-200 text-[9px] font-black text-emerald-700`}>
        SLOT
      </span>
    );
  }

  if (identity.includes("amazon")) {
    return (
      <span role="img" aria-label="Amazon marketplace" className={`${commonClassName} relative border-amber-200 text-xl font-bold text-slate-900`}>
        <span className="-mt-1">a</span>
        <span className="absolute bottom-1 h-1 w-4 rounded-b-full border-b-2 border-amber-500" aria-hidden="true" />
      </span>
    );
  }

  return (
    <span
      role="img"
      aria-label={`${storeName} marketplace`}
      className={`${commonClassName} border-slate-200 bg-slate-50 text-slate-600`}
    >
      <Store size={16} aria-hidden="true" />
    </span>
  );
}

export default StoreMark;
