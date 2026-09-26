import Link from "next/link";
import type { ReactNode } from "react";
import TextRoll from "@/components/motion/TextRoll";

/**
 * v3 button (brief §5.4).
 *
 * - **solid**: ink fill, white label, a 36px paper icon tile inset 4px on the
 *   left. Inverted on night.
 * - **ghost**: 1px line border, transparent, with a small ink icon tile.
 * - **link**: text with an arrow, for inline "All services →" style actions.
 *
 * Hover (and keyboard focus) rolls the label and swaps the tile's arrow:
 * the old one leaves right while a new one enters from the left. All CSS, so
 * the button stays a server component.
 *
 * `tone` defaults to following the sheet it sits in (`night:` variant);
 * pass it explicitly where the background is not a Sheet.
 *
 * Legacy variant names from v2 are still accepted while the old pages are
 * being replaced (see `legacy` below); they map onto the v3 styles.
 */
type V3Variant = "solid" | "ghost" | "link";
type LegacyVariant = "primary" | "secondary" | "ghost" | "light" | "onBrand";
type Tone = "auto" | "paper" | "night";
type Size = "md" | "lg";

const legacy: Record<Exclude<LegacyVariant, "ghost">, { variant: V3Variant; tone?: Tone }> = {
  primary: { variant: "solid" },
  secondary: { variant: "ghost" },
  light: { variant: "solid", tone: "night" },
  onBrand: { variant: "solid", tone: "night" },
};

const surface: Record<V3Variant, Record<Tone, string>> = {
  solid: {
    paper: "bg-ink text-white hover:bg-night-3",
    night: "bg-white text-ink hover:bg-paper-2",
    auto: "bg-ink text-white hover:bg-night-3 night:bg-white night:text-ink night:hover:bg-paper-2",
  },
  ghost: {
    paper: "border border-ink/15 text-ink hover:border-ink/40",
    night: "border border-white/20 text-white hover:border-white/50",
    auto: "border border-ink/15 text-ink hover:border-ink/40 night:border-white/20 night:text-white night:hover:border-white/50",
  },
  link: {
    paper: "text-ink hover:text-signal",
    night: "text-white hover:text-white/75",
    auto: "text-ink hover:text-signal night:text-white night:hover:text-white/75",
  },
};

const tile: Record<Exclude<V3Variant, "link">, Record<Tone, string>> = {
  solid: {
    paper: "bg-paper text-ink",
    night: "bg-ink text-white",
    auto: "bg-paper text-ink night:bg-ink night:text-white",
  },
  ghost: {
    paper: "bg-ink text-white",
    night: "bg-white text-ink",
    auto: "bg-ink text-white night:bg-white night:text-ink",
  },
};

const sizes: Record<Size, { box: string; tile: string }> = {
  md: { box: "h-11 gap-3 pl-1 pr-4 text-[0.9375rem]", tile: "h-9 w-9" },
  lg: { box: "h-12 gap-3.5 pl-1 pr-5 text-[0.9375rem]", tile: "h-10 w-10" },
};

function Arrow({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`btn-arrow absolute h-3.5 w-3.5 ${className}`}
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: V3Variant | LegacyVariant;
  tone?: Tone;
  size?: Size;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  /** v2 prop; v3 buttons always carry their arrow tile. Ignored. */
  withArrow?: boolean;
};

export default function Button({
  href,
  children,
  variant = "solid",
  tone: toneProp,
  size = "md",
  className = "",
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  const mapped =
    variant in legacy
      ? legacy[variant as keyof typeof legacy]
      : { variant: variant as V3Variant, tone: undefined };
  const kind = mapped.variant;
  const tone: Tone = toneProp ?? mapped.tone ?? "auto";

  const label = typeof children === "string" ? <TextRoll>{children}</TextRoll> : children;

  const inner =
    kind === "link" ? (
      <>
        {label}
        <span aria-hidden="true" className="relative inline-flex h-3.5 w-3.5 overflow-hidden text-signal night:text-current">
          <Arrow className="btn-arrow-out" />
          <Arrow className="btn-arrow-in" />
        </span>
      </>
    ) : (
      <>
        <span
          aria-hidden="true"
          className={`relative grid shrink-0 place-items-center overflow-hidden rounded-[var(--radius-sm)] ${sizes[size].tile} ${tile[kind][tone]}`}
        >
          <Arrow className="btn-arrow-out" />
          <Arrow className="btn-arrow-in" />
        </span>
        {label}
      </>
    );

  const classes =
    kind === "link"
      ? `roll-host group inline-flex items-center gap-2 font-medium transition-colors duration-300 ${surface.link[tone]} ${className}`
      : `roll-host group inline-flex items-center rounded-[10px] font-medium tracking-[-0.01em] transition-colors duration-300 disabled:opacity-50 ${sizes[size].box} ${surface[kind][tone]} ${className}`;

  if (href) {
    const external = /^(https?:|mailto:|tel:)/.test(href);
    if (external) {
      return (
        <a href={href} className={classes}>
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {inner}
    </button>
  );
}
