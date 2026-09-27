"use client";

import ExpandingPanels from "@/components/motion/ExpandingPanels";
import CapabilityArt from "@/components/graphics/capability";
import Chip from "@/components/ui/Chip";
import Button from "@/components/ui/Button";
import { homeV3 } from "@/content/home";
import type { Pillar } from "@/content/services";

/**
 * S5 Capabilities: the four pillars as expanding panels on the night sheet.
 * The open panel shows the pillar line, its sub-services and the isometric
 * art, which plays each time its panel opens.
 */
export default function CapabilityPanels({ pillars }: { pillars: Pillar[] }) {
  return (
    <ExpandingPanels
      items={pillars.map((pillar) => ({
        id: pillar.slug,
        name: pillar.name,
        content: (active: boolean) => (
          <div className="grid gap-6 px-5 pb-6 lg:h-full lg:grid-cols-[46%_54%] lg:gap-4 lg:px-8 lg:pb-8">
            <div className="flex flex-col">
              <p className="type-display-m hidden text-white lg:block">{pillar.name}</p>
              <p className="type-body-l max-w-sm text-white/70 lg:mt-3">{pillar.tagline}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {pillar.subServices.map((service) => (
                  <li key={service.slug}>
                    <Chip>{service.name}</Chip>
                  </li>
                ))}
              </ul>
              <div className="mt-6 lg:mt-auto">
                <Button href={`/services/${pillar.slug}`} variant="ghost" tone="night">
                  {`${homeV3.capabilities.explore} ${pillar.name}`}
                </Button>
              </div>
            </div>
            <div className="grid place-items-center text-white/70">
              <CapabilityArt slug={pillar.slug} active={active} className="h-auto w-full max-w-[26rem]" />
            </div>
          </div>
        ),
      }))}
    />
  );
}
