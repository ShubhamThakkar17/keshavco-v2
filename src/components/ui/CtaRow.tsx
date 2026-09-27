import type { ReactNode } from "react";
import Reveal from "@/components/motion/Reveal";
import Brackets from "@/components/ui/Brackets";
import { toParagraphs } from "@/lib/text";

/**
 * A page-specific closing prompt: one card with the page's own CTA heading and
 * button. Deliberately compact; the full closing CTA is the footer
 * (decision log #3), so this never repeats the footer's line.
 */
export default function CtaRow({
  tag,
  heading,
  body,
  actions,
  className = "",
}: {
  tag?: string;
  heading: string;
  body?: string | readonly string[];
  actions: ReactNode;
  className?: string;
}) {
  const paragraphs = body ? toParagraphs(body) : [];
  return (
    <Reveal className={className}>
      <div className="relative grid gap-8 rounded-[var(--radius-md)] border border-line bg-card p-7 sm:p-10 lg:grid-cols-12 lg:items-end lg:gap-8 night:border-line-night night:bg-night-2">
        <Brackets inset={-1} />
        <div className="lg:col-span-8">
          {tag && <p className="type-mono-s text-ink-2 night:text-white/60">{tag}</p>}
          <h2 className="type-display-m mt-3 max-w-2xl text-balance text-ink night:text-white">{heading}</h2>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="type-body mt-3 max-w-2xl text-pretty text-ink-2 night:text-white/65">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-4 lg:justify-end">{actions}</div>
      </div>
    </Reveal>
  );
}
