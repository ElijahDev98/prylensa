/**
 * -----------------------------------------------------------------------------
 * File: ComparisonPanelHeader.tsx
 * Feature: Compare
 *
 * Purpose:
 * Shared header displayed at the top of the comparison panel.
 *
 * Responsibilities:
 * - Display panel title.
 * - Display panel description.
 * - Display optional action button.
 *
 * Does NOT:
 * - Fetch data.
 * - Manage state.
 * -----------------------------------------------------------------------------
 */

interface ComparisonPanelHeaderProps {
  title: string;

  description: string;

  actionLabel?: string;

  onAction?: () => void;
}

function ComparisonPanelHeader({
  title,
  description,
  actionLabel,
  onAction,
}: ComparisonPanelHeaderProps) {
  return (
    <header
      className="
        flex
        items-start
        justify-between
        gap-4
        border-b
        border-slate-200
        px-8
        py-6
      "
    >
      <div>
        <h2
          className="
            text-xl
            font-semibold
            text-slate-900
          "
        >
          {title}
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          {description}
        </p>
      </div>

      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="
            rounded-xl
            px-3
            py-2
            text-sm
            font-medium
            text-blue-600
            transition-colors
            hover:bg-blue-50
          "
        >
          {actionLabel}
        </button>
      )}
    </header>
  );
}

export default ComparisonPanelHeader;
