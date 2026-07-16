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
        items-center
        justify-between
        gap-4
      "
    >
      <div className="min-w-0 flex-1">
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
            leading-6
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
            rounded-lg
            px-2
            py-1.5
            text-sm
            font-medium
            text-slate-600
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
