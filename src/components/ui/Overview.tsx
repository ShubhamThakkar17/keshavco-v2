import Reveal from "@/components/motion/Reveal";
import { toParagraphs } from "@/lib/text";

/**
 * An inner page's approved long copy, kept whole but broken into paragraphs of
 * 60 words or fewer (brief §8.1), beside a mono note. The first paragraph
 * leads in ink; the rest sit back in ink-2.
 */
export default function Overview({
  note,
  text,
  className = "",
}: {
  note: string;
  text: string | readonly string[];
  className?: string;
}) {
  const paragraphs = toParagraphs(text);
  return (
    <div className={`grid gap-5 lg:grid-cols-12 lg:gap-8 ${className}`}>
      <p className="type-mono text-ink-2 night:text-white/60 lg:col-span-3">{note}</p>
      <div className="max-w-[62ch] space-y-5 lg:col-span-8 lg:col-start-5">
        {paragraphs.map((paragraph, index) => (
          <Reveal key={index} delay={index * 0.06}>
            <p
              className={
                index === 0
                  ? "type-body-l text-pretty text-ink night:text-white/85"
                  : "type-body text-pretty text-ink-2 night:text-white/65"
              }
            >
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
