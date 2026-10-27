/**
 * -----------------------------------------------------------------------------
 * File: Dialog.tsx
 * Component: Reusable Dialog
 *
 * Purpose:
 * Generic modal dialog used across the application.
 *
 * Responsibilities:
 * - Render dialog overlay.
 * - Render dialog container.
 * - Handle close interaction.
 * - Render arbitrary dialog content.
 *
 * Does NOT:
 * - Own business state.
 * - Execute business logic.
 * -----------------------------------------------------------------------------
 */

import { X } from "lucide-react";
import { type ReactNode } from "react";

interface DialogProps {
  open: boolean;

  title: string;

  children: ReactNode;

  footer?: ReactNode;

  size?: "default" | "wide";

  onClose(): void;
}

function Dialog({
  open,
  title,
  children,
  footer,
  size = "default",
  onClose,
}: DialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-slate-900/50
        p-4
      "
      onClick={onClose}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className={`
          flex
          max-h-[90vh]
          w-full
          flex-col
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
          ${size === "wide" ? "max-w-6xl" : "max-w-3xl"}
        `}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}

        <header
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            px-6
            py-4
          "
        >
          <h2
            id="dialog-title"
            className="
              text-xl
              font-semibold
              text-slate-900
            "
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="
              rounded-lg
              p-2
              transition-colors
              hover:bg-slate-100
            "
          >
            <X size={20} />
          </button>
        </header>

        {/* Body */}

        <div
          className="
            flex-1
            overflow-y-auto
            p-6
          "
        >
          {children}
        </div>

        {/* Footer */}

        {footer && (
          <footer
            className="
              border-t
              border-slate-200
              px-6
              py-4
            "
          >
            {footer}
          </footer>
        )}
      </section>
    </div>
  );
}

export default Dialog;
