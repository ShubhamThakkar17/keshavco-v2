import type { ReactNode } from "react";
import Sheet from "@/components/ui/Sheet";
import SectionTag from "@/components/ui/SectionTag";
import Breadcrumb, { type Crumb } from "@/components/ui/Breadcrumb";
import BlurInWords from "@/components/motion/BlurInWords";
import { breadcrumbV3 } from "@/content/misc";

/**
 * Shared inner-page hero (brief §9.3): an inset paper card like the home
 * hero, at least 64svh on desktop (auto on phones and for `short` pages).
 * Mono breadcrumb, the page tag, the H1 blurring in word by word (CSS, so it
 * paints with the first frame and stays the LCP element), one short line,
 * actions, and a page-specific vector on the right. No 3D here: the dot
 * landscape belongs to the home page and the footer.
 */
export default function PageHero({
  crumbs,
  tag,
  title,
  accent,
  line,
  actions,
  art,
  short = false,
}: {
  /** Crumbs after "Home"; the last one is the current page. */
  crumbs: Crumb[];
  tag: string;
  title: string;
  /** Optional second part of the H1, set in Indigo. */
  accent?: string;
  /** One line, 18 words at most (content `short` fields). */
  line?: string;
  actions?: ReactNode;
  /** Decorative vector; hidden from assistive tech. */
  art?: ReactNode;
  short?: boolean;
}) {
  const titleWords = title.split(" ").length;
  return (
    <Sheet
      tone="paper-2"
      inset
      pad={false}
      guides={{ accent: 0, animate: true }}
      className={short ? "" : "lg:min-h-[64svh]"}
    >
      <div
        className={`container-page relative flex flex-col pb-12 pt-28 md:pb-16 lg:pt-36 ${
          short ? "lg:pb-20" : "lg:min-h-[64svh] lg:pb-20"
        }`}
      >
        <Breadcrumb items={[{ label: breadcrumbV3.home, href: "/" }, ...crumbs]} />
        <div className="mt-10 grid flex-1 items-center gap-12 lg:mt-12 lg:grid-cols-12 lg:gap-8">
          <div className={art ? "lg:col-span-7" : "lg:col-span-10"}>
            <SectionTag index={1} label={tag} trigger="mount" />
            <h1 className="type-display-page mt-6 max-w-[20ch] text-ink">
              <BlurInWords text={title} />
              {accent && (
                <>
                  {" "}
                  <BlurInWords text={accent} className="text-signal" delay={150 + titleWords * 45} />
                </>
              )}
            </h1>
            {line && <p className="type-body-l mt-6 max-w-xl text-pretty text-ink-2">{line}</p>}
            {actions && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">{actions}</div>
            )}
          </div>
          {art && (
            <div aria-hidden="true" className="mx-auto w-full max-w-[26rem] text-ink/70 lg:col-span-5 lg:max-w-none">
              {art}
            </div>
          )}
        </div>
      </div>
    </Sheet>
  );
}
