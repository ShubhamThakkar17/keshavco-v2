"use client";

import Link from "next/link";
import { useState } from "react";
import IndustryIcon from "@/components/graphics/industry/IndustryIcon";
import IndustryScene from "@/components/graphics/industry/IndustryScene";
import Crosshair from "@/components/ui/Crosshair";
import { homeV3 } from "@/content/home";
import type { Industry } from "@/content/industries";

/**
 * S6 Industries: an Oberon-style grid of cells split by dashed guides. Each
 * cell links to its industry and, on desktop, carries the industry's
 * isometric scene (motion graphics instead of photographs, decision log #4).
 * Hover or focus lifts the scene, plays its loop and reveals the one-line
 * tagline; on phones the tagline is always shown and the scene is left out.
 */
export default function IndustryGrid({ industries }: { industries: Industry[] }) {
  const [active, setActive] = useState<number | null>(null);
  const { cta } = homeV3.industries;
  const cell = "border-b border-r border-dashed border-line";

  return (
    <ul className="grid grid-cols-2 border-l border-t border-dashed border-line lg:grid-cols-4">
      {industries.map((industry, index) => (
        <li key={industry.slug} className={cell}>
          <Link
            href={`/industries#${industry.slug}`}
            className="group relative flex h-full min-h-56 flex-col justify-between gap-6 overflow-hidden p-4 sm:p-5 lg:aspect-[1/0.9] lg:min-h-0"
            onPointerEnter={() => setActive(index)}
            onPointerLeave={() => setActive(null)}
            onFocus={() => setActive(index)}
            onBlur={() => setActive(null)}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-4 top-6 hidden h-[52%] text-ink/55 transition-[transform,color] duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 group-hover:text-ink/80 group-focus-visible:-translate-y-1.5 group-focus-visible:text-ink/80 lg:block"
            >
              <IndustryScene slug={industry.slug} active={active === index ? true : undefined} className="h-full w-full" />
            </span>
            <span className="relative z-10 grid h-14 w-14 place-items-center border border-line bg-card text-ink">
              <IndustryIcon slug={industry.slug} />
            </span>
            <span className="relative z-10 lg:min-h-[5.75rem]">
              <span className="type-mono block text-ink">{industry.name}</span>
              <span className="type-body-s mt-2 block text-ink-2 transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100">
                {industry.tagline}
              </span>
            </span>
          </Link>
        </li>
      ))}
      <li className={cell}>
        <Link
          href={cta.href}
          className="roll-host group relative flex h-full min-h-56 flex-col justify-between p-4 sm:p-5 lg:aspect-[1/0.9] lg:min-h-0"
        >
          <span className="relative block h-14 w-14">
            <Crosshair size={14} style={{ left: "50%", top: "50%" }} />
          </span>
          <span className="lg:min-h-[5.75rem]">
            <span className="type-mono block text-ink">{cta.label}</span>
            <span className="mt-2 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink transition-colors group-hover:text-signal">
              {cta.link}
              <span aria-hidden="true" className="text-signal transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </span>
          </span>
        </Link>
      </li>
    </ul>
  );
}
