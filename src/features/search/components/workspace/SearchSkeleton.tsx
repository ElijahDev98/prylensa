/**
 * -----------------------------------------------------------------------------
 * File: SearchSkeleton.tsx
 * Feature: Search
 *
 * Purpose:
 * Displays a skeleton UI while search results are loading.
 *
 * Responsibilities:
 * - Mimic the Search workspace layout.
 * - Improve perceived loading performance.
 *
 * Architecture:
 * UI
 *
 * Notes:
 * - Pure presentation component.
 * - No business logic.
 * -----------------------------------------------------------------------------
 */

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={`
        animate-pulse
        rounded-xl
        bg-slate-200
        ${className ?? ""}
      `}
    />
  );
}

function SearchSkeleton() {
  return (
    <section
      aria-label="Loading search results"
      className="
        grid
        gap-6
        lg:grid-cols-3
      "
    >
      {/* Gallery */}
      <article
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <SkeletonBlock className="h-72 w-full rounded-2xl" />

        <div className="mt-4 flex gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-14 w-14 rounded-xl" />
          ))}
        </div>
      </article>

      {/* Product Info */}
      <article
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <SkeletonBlock className="h-8 w-3/4" />

        <SkeletonBlock className="mt-4 h-5 w-1/3" />

        <SkeletonBlock className="mt-8 h-4 w-full" />
        <SkeletonBlock className="mt-2 h-4 w-5/6" />
        <SkeletonBlock className="mt-2 h-4 w-2/3" />

        <SkeletonBlock className="mt-10 h-12 w-full rounded-xl" />
      </article>

      {/* Best Price */}
      <article
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <SkeletonBlock className="h-8 w-1/2" />

        <SkeletonBlock className="mt-8 h-16 w-full rounded-xl" />

        <SkeletonBlock className="mt-8 h-12 w-full rounded-xl" />
      </article>
    </section>
  );
}

export default SearchSkeleton;
