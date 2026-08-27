"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { pillars, supportingCapabilities } from "@/content/services";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import PillarIcon from "@/components/ui/PillarIcon";

export default function ServicesGrid({ showSupporting = true }: { showSupporting?: boolean }) {
  return (
    <div>
      <RevealGroup className="grid gap-5 md:grid-cols-2" stagger={0.1}>
        {pillars.map((pillar, index) => (
          <RevealItem key={pillar.slug}>
            <SpotlightCard className="h-full rounded-3xl border border-navy-900/10 bg-white">
              <Link
                href={`/services/${pillar.slug}`}
                className="flex h-full flex-col p-8 sm:p-10"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-50 text-indigo-brand transition-colors duration-500 group-hover:bg-navy-900 group-hover:text-white">
                    <PillarIcon slug={pillar.slug} />
                  </span>
                  <span className="font-display text-xs font-semibold tabular-nums text-navy-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-display mt-8 text-2xl font-bold tracking-tight text-navy-900">
                  {pillar.name}
                </h3>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-navy-500">
                  {pillar.cardBody}
                </p>

                <div className="mt-7 flex flex-wrap gap-x-2 gap-y-1.5">
                  {pillar.subServices.slice(0, 4).map((service) => (
                    <span
                      key={service.slug}
                      className="rounded-full border border-navy-900/10 px-2.5 py-1 text-[0.7rem] text-navy-400"
                    >
                      {service.name}
                    </span>
                  ))}
                  {pillar.subServices.length > 4 && (
                    <span className="rounded-full border border-navy-900/10 px-2.5 py-1 text-[0.7rem] text-navy-400">
                      +{pillar.subServices.length - 4} more
                    </span>
                  )}
                </div>

                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy-900">
                  Explore {pillar.name}
                  <motion.span
                    aria-hidden="true"
                    className="text-indigo-brand"
                    initial={false}
                    whileHover={{ x: 4 }}
                  >
                    →
                  </motion.span>
                </span>

                <span
                  aria-hidden="true"
                  className="bg-gradient-brand mt-6 block h-0.5 w-0 rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                />
              </Link>
            </SpotlightCard>
          </RevealItem>
        ))}
      </RevealGroup>

      {showSupporting && (
        <RevealGroup className="mt-5 grid gap-5 sm:grid-cols-3" stagger={0.07} delay={0.1}>
          {supportingCapabilities.map((capability) => (
            <RevealItem key={capability.name}>
              <Link
                href={capability.href}
                className="group flex h-full flex-col rounded-2xl border border-navy-900/10 bg-navy-50/60 p-6 transition-colors hover:border-navy-900/25 hover:bg-white"
              >
                <h3 className="font-display text-base font-semibold tracking-tight text-navy-900">
                  {capability.name}
                </h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-navy-500">
                  {capability.body}
                </p>
                <span className="mt-4 text-xs font-semibold text-indigo-brand opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more →
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </div>
  );
}
