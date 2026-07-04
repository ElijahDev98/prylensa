/**
 * -----------------------------------------------------------------------------
 * File: LoadingContent.tsx
 * Shared Loading Component
 * -----------------------------------------------------------------------------
 */

import { branding } from "@/design-system";

interface LoadingContentProps {
  message?: string;
}

function LoadingContent({
  message = branding.loaderMessage,
}: LoadingContentProps) {
  return (
    <div
      className="
        mt-8
        flex
        flex-col
        items-center
        gap-2
        text-center
      "
    >
      <h1
        className="
          text-3xl
          font-bold
          tracking-tight
          text-slate-900
        "
      >
        {branding.name}
      </h1>

      <p
        className="
          text-sm
          font-medium
          text-slate-500
        "
      >
        {branding.tagline}
      </p>

      <p
        className="
          mt-3
          text-sm
          text-slate-400
        "
      >
        {message}
      </p>
    </div>
  );
}

export default LoadingContent;
