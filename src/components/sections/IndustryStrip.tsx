import Marquee from "@/components/motion/Marquee";
import { homeV3 } from "@/content/home";

/**
 * S2 Industry strip: a 64px mono band. The moving copy is decorative (the
 * marquee hides itself from assistive tech), so the list is also given once
 * as screen-reader text.
 */
export default function IndustryStrip() {
  const { strip } = homeV3;
  return (
    <section aria-label={strip.label} className="relative border-y border-line bg-paper">
      <div className="container-page flex h-16 items-center gap-6">
        <p className="type-mono flex shrink-0 items-center gap-2.5 text-ink">
          <span aria-hidden="true" className="h-2.5 w-2.5 bg-signal" />
          {strip.label}
        </p>
        <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <Marquee baseVelocity={1.4} className="type-mono text-ink-2">
            {strip.items.map((item) => (
              <span key={item} className="flex items-center gap-8 pr-8 uppercase">
                {item}
                <span aria-hidden="true" className="text-signal">
                  +
                </span>
              </span>
            ))}
          </Marquee>
        </div>
        <ul className="sr-only">
          {strip.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
