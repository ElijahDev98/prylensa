/**
 * -----------------------------------------------------------------------------
 * File: AppLoader.tsx
 * -----------------------------------------------------------------------------
 */

import { branding } from "@/design-system";

import LoadingContent from "./LoadingContent";
import LoadingRing from "./LoadingRing";

interface AppLoaderProps {
  message?: string;
}

function AppLoader({ message }: AppLoaderProps) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-slate-50
      "
    >
      <div
        className="
          flex
          flex-col
          items-center
        "
      >
        {/* Logo + Ring */}

        <div
          className="
            relative
            flex
            h-[160px]
            w-[160px]
            items-center
            justify-center
          "
        >
          <LoadingRing />

          <img
            src={branding.logo}
            alt={branding.name}
            draggable={false}
            className="
              absolute
              h-24
              w-24
              object-contain
              select-none
            "
          />
        </div>

        {/* Text */}

        <LoadingContent message={message} />
      </div>
    </div>
  );
}

export default AppLoader;
