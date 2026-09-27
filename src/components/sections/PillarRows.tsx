import Link from "next/link";
import CapabilityArt from "@/components/graphics/capability";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import { servicesV3, type Pillar } from "@/content/services";

/**
 * /services pillar rows (brief §9.4): four full-width rows, not cards. Name
 * and tagline on the left with the sub-services as chips, the pillar's
 * isometric art on the right. Hovering a row shifts it to paper-2 and lifts
 * the art. Chips link straight to their service pages.
 */
export default function PillarRows({ pillars }: { pillars: Pillar[] }) {
  return (
    <ol className="border-t border-line">
      {pillars.map((pillar, index) => {
        const href = `/services/${pillar.slug}`;
        return (
          <li key={pillar.slug} className="group border-b border-line">
            <Reveal>
              <div className="-mx-3 grid gap-8 rounded-[var(--radius-md)] px-3 py-10 transition-colors duration-500 group-hover:bg-paper-2 sm:-mx-5 sm:px-5 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-12">
                <p className="type-mono text-ink-2 lg:col-span-1 lg:self-start lg:pt-3">
                  {`.${String(index + 1).padStart(2, "0")}`}
                </p>
                <div className="lg:col-span-6">
                  <h3 className="type-display-l text-ink">
                    <Link href={href} className="transition-colors hover:text-signal">
                      {pillar.name}
                    </Link>
                  </h3>
                  <p className="type-body-l mt-4 max-w-md text-pretty text-ink-2">{pillar.tagline}</p>
                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {pillar.subServices.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`${href}/${service.slug}`}
                          className="type-mono-s inline-flex min-h-11 items-center rounded-[var(--radius-sm)] bg-paper-2 px-2.5 text-ink-2 transition-colors hover:bg-ink hover:text-white group-hover:bg-card group-hover:hover:bg-ink lg:min-h-8"
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button href={href} variant="ghost">
                      {`${servicesV3.hub.explore} ${pillar.name}`}
                    </Button>
                  </div>
                </div>
                <div className="text-ink/50 transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 group-hover:text-ink/80 lg:col-span-5">
                  <CapabilityArt slug={pillar.slug} className="mx-auto h-auto w-full max-w-[24rem]" />
                </div>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}
