import type { ReactNode } from "react";
import SectionTag from "@/components/ui/SectionTag";
import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";

/**
 * Section heading block (brief §5.4): numbered tag, H2 with a masked word
 * reveal, an optional one-line lead (max 18 words, enforced in content), and
 * an optional action pinned bottom-right.
 */
export default function SectionHead({
  index,
  tag,
  title,
  line,
  action,
  align = "left",
  id,
  className = "",
}: {
  index: number;
  tag: string;
  title: string;
  line?: string;
  action?: ReactNode;
  align?: "left" | "center";
  /** Put on the H2, for `aria-labelledby` on the sheet. */
  id?: string;
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div
      className={`grid gap-8 lg:grid-cols-12 lg:items-end ${centered ? "justify-items-center text-center" : ""} ${className}`}
    >
      <div className={centered ? "lg:col-span-12 lg:mx-auto lg:max-w-3xl" : "lg:col-span-7"}>
        <SectionTag index={index} label={tag} />
        <h2 id={id} className="type-display-l mt-6">
          <SplitText text={title} />
        </h2>
        {line && (
          <Reveal delay={0.1}>
            <p
              className={`type-body-l mt-5 max-w-xl text-pretty text-ink-2 night:text-white/65 ${centered ? "mx-auto" : ""}`}
            >
              {line}
            </p>
          </Reveal>
        )}
      </div>
      {action && (
        <Reveal
          delay={0.15}
          className={centered ? "lg:col-span-12" : "lg:col-span-5 lg:justify-self-end"}
        >
          {action}
        </Reveal>
      )}
    </div>
  );
}
