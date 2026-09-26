import type { ReactNode } from "react";

/** Mono micro-label chip for sub-services and tags. Adapts to night sheets. */
export default function Chip({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`type-mono-s inline-flex h-[26px] items-center whitespace-nowrap rounded-[var(--radius-sm)] bg-paper-2 px-2.5 text-ink-2 night:bg-white/[0.06] night:text-white/70 ${className}`}
    >
      {children}
    </span>
  );
}
