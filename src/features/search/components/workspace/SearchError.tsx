/**
 * -----------------------------------------------------------------------------
 * File: SearchError.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays the Search workspace error state.
 *
 * Responsibilities:
 * - Present search failures.
 * - Encourage retry.
 *
 * Architecture:
 * UI
 *
 * Notes:
 * - Pure presentation component.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

import { AlertTriangle, RotateCw } from "lucide-react";

interface SearchErrorProps {
  message: string;

  onRetry?(): void;
}

function SearchError({ message, onRetry }: SearchErrorProps) {
  return (
    <section
      aria-label="Search Error"
      className="
        flex
        min-h-[520px]
        items-center
        justify-center
      "
    >
      <div
        className="
          w-full
          max-w-3xl
          text-center
        "
      >
        <div
          className="
            mx-auto
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-full
            bg-red-50
          "
        >
          <AlertTriangle size={46} className="text-red-500" />
        </div>

        <h2
          className="
            mt-8
            text-3xl
            font-bold
            text-slate-900
          "
        >
          Something went wrong
        </h2>

        <p
          className="
            mx-auto
            mt-5
            max-w-2xl
            text-base
            leading-7
            text-slate-600
          "
        >
          {message}
        </p>

        <p
          className="
            mt-3
            text-sm
            text-slate-500
          "
        >
          Please try again. If the problem persists, check your network
          connection or try again later.
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="
              mt-10
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-blue-600
              px-6
              py-3
              font-medium
              text-white
              transition-colors
              hover:bg-blue-700
            "
          >
            <RotateCw size={18} />
            Try Again
          </button>
        )}
      </div>
    </section>
  );
}

export default SearchError;
