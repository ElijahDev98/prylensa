/**
 * -----------------------------------------------------------------------------
 * File: DashboardWidgetHeader.tsx
 * Feature: Dashboard
 *
 * Purpose:
 * Shared header for dashboard widgets.
 *
 * Responsibilities:
 * - Display widget title.
 * - Display widget description.
 * - Display optional action.
 * -----------------------------------------------------------------------------
 */

interface DashboardWidgetHeaderProps {
  title: string;

  description: string;

  actionLabel?: string;

  onAction?: () => void;
}

function DashboardWidgetHeader({
  title,
  description,
  actionLabel,
  onAction,
}: DashboardWidgetHeaderProps) {
  return (
    <header
      className="
        mb-6
        flex
        items-start
        justify-between
        gap-4
      "
    >
      <div>
        <h2
          className="
            text-lg
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
            shrink-0
            rounded-xl
            px-3
            py-2
            text-sm
            font-medium
            text-blue-600
            transition-colors
            hover:bg-blue-50
            hover:text-blue-700
          "
        >
          {actionLabel}
        </button>
      )}
    </header>
  );
}

export default DashboardWidgetHeader;
