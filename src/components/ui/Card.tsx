/**
 * -----------------------------------------------------------------------------
 * File: Card.tsx
 * Shared UI Component
 *
 * Purpose:
 * Generic container component.
 *
 * Responsibilities:
 * - Border
 * - Radius
 * - Shadow
 * - Background
 *
 * Does NOT:
 * - Decide height
 * - Decide width
 * - Decide layout
 * -----------------------------------------------------------------------------
 */

import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: "article" | "section" | "aside";
}

function Card({
  as: Component = "section",
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <Component
      className={`
        flex
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Card;
