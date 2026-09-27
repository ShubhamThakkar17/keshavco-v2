import Reveal from "@/components/motion/Reveal";

/**
 * Outcome checklist: each line opens with the green "result" eye from the
 * brand's growth colour (brief §5.1: green marks outcomes only).
 */
export default function CheckList({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`divide-y divide-line border-y border-line night:divide-line-night night:border-line-night ${className}`}>
      {items.map((item, index) => (
        <Reveal key={item} as="li" delay={index * 0.05} className="block">
          <span className="flex items-start gap-4 py-5">
            <span
              aria-hidden="true"
              className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-growth/15"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-growth" />
            </span>
            <span className="type-body-l text-pretty text-ink night:text-white/85">{item}</span>
          </span>
        </Reveal>
      ))}
    </ul>
  );
}
