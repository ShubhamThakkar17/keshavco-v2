import type { CSSProperties, ReactNode } from "react";
import GridGuides from "@/components/ui/GridGuides";
import SheetStack from "@/components/motion/SheetStack";

export type SheetTone = "paper" | "paper-2" | "night";

const tones: Record<SheetTone, string> = {
  paper: "bg-paper text-ink",
  "paper-2": "bg-paper-2 text-ink",
  night: "bg-night text-white",
};

/**
 * A page section as a "sheet" (brief §5.3): its own tone, rounded top corners
 * that overlap the sheet above, optional blueprint guides and film grain.
 *
 * `data-tone` is what the header reads to flip colour, and what the `night:`
 * Tailwind variant keys off, so components inside adapt automatically.
 */
export default function Sheet({
  tone = "paper",
  as = "section",
  id,
  overlap = true,
  inset = false,
  guides = false,
  grain,
  stack = true,
  pad = true,
  className = "",
  style,
  labelledBy,
  children,
}: {
  tone?: SheetTone;
  as?: "section" | "div" | "header";
  id?: string;
  /** Rounded top corners and a 28px pull-up over the previous sheet. */
  overlap?: boolean;
  /** Hero-style inset card with a page margin and fully rounded corners. */
  inset?: boolean;
  /** `true` for default guides, or GridGuides props. */
  guides?: boolean | Parameters<typeof GridGuides>[0];
  /** Film grain; defaults to on for night sheets. */
  grain?: boolean;
  /** Recede and dim as the next sheet slides over (SheetStack). */
  stack?: boolean;
  /** Standard 128/88/72 section padding. */
  pad?: boolean;
  className?: string;
  style?: CSSProperties;
  labelledBy?: string;
  children: ReactNode;
}) {
  const withGrain = grain ?? tone === "night";
  const shape = inset
    ? "mx-2 mt-2 rounded-[20px] md:mx-3 md:mt-3 md:rounded-[var(--radius-lg)]"
    : overlap
      ? "-mt-5 rounded-t-[20px] md:-mt-7 md:rounded-t-[var(--radius-lg)]"
      : "";
  const classes = [
    "relative isolate",
    tones[tone],
    shape,
    pad ? "sheet-pad" : "",
    withGrain ? "grain" : "",
    inset || overlap ? "overflow-clip" : "",
    className,
  ].join(" ");
  const sheetStyle = withGrain
    ? ({ "--grain-opacity": 0.25, ...style } as CSSProperties)
    : style;

  const content = (
    <>
      {guides && <GridGuides {...(guides === true ? {} : guides)} />}
      <div className="relative z-[1]">{children}</div>
    </>
  );

  const shared = {
    id,
    className: classes,
    style: sheetStyle,
    "data-tone": tone === "night" ? "night" : "paper",
    "data-sheet": tone,
    "aria-labelledby": labelledBy,
  };

  if (stack) {
    return (
      <SheetStack as={as} {...shared}>
        {content}
      </SheetStack>
    );
  }

  const Tag = as;
  return <Tag {...shared}>{content}</Tag>;
}
