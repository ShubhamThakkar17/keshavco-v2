"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { pillars, supportingCapabilities } from "@/content/services";
import { pillarImages } from "@/content/images";
import PillarIcon from "@/components/ui/PillarIcon";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

/**
 * Capability cards led by photography rather than paragraphs: the image is the
 * card, the copy sits on it, and the sub-service list is what expands on hover.
 */
export default function CapabilityShowcase({
  showSupporting = true,
}: {
  showSupporting?: boolean;
}) {
  return (
    <div>
      <RevealGroup className="grid gap-5 md:grid-cols-2" stagger={0.1}>
        {pillars.map((pillar, index) => {
          const image = pillarImages[pillar.slug];
          return (
            <RevealItem key={pillar.slug}>
              <Link
                href={`/services/${pillar.slug}`}
                className="group relative block h-full overflow-hidden rounded-3xl bg-navy-950"
              >
                {/* Photograph */}
                <div className="absolute inset-0">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="h-full w-full object-cover opacity-55 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:opacity-70"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/35"
                  />
                </div>

                <div className="relative z-10 flex h-full min-h-[24rem] flex-col p-8 sm:min-h-[26rem] sm:p-10">
                  <div className="flex items-start justify-between gap-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-white backdrop-blur-sm transition-colors duration-500 group-hover:bg-white group-hover:text-navy-900">
                      <PillarIcon slug={pillar.slug} />
                    </span>
                    <span className="font-display text-xs font-semibold tabular-nums text-white/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="font-display mt-auto pt-10 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {pillar.name}
                  </h3>

                  {/* One line, not a paragraph. */}
                  <p className="mt-3 max-w-md text-[0.92rem] leading-relaxed text-white/65">
                    {pillar.tagline}
                  </p>

                  {/* The detail slides open on hover instead of always showing. */}
                  <div className="grid grid-rows-[0fr] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <div className="flex flex-wrap gap-1.5 pt-5">
                        {pillar.subServices.slice(0, 5).map((service) => (
                          <span
                            key={service.slug}
                            className="rounded-full border border-white/15 px-2.5 py-1 text-[0.7rem] text-white/60"
                          >
                            {service.name}
                          </span>
                        ))}
                        {pillar.subServices.length > 5 && (
                          <span className="rounded-full border border-white/15 px-2.5 py-1 text-[0.7rem] text-white/60">
                            +{pillar.subServices.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    Explore {pillar.name}
                    <motion.span aria-hidden="true" className="text-green-brand" whileHover={{ x: 4 }}>
                      →
                    </motion.span>
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className="bg-gradient-brand absolute inset-x-0 bottom-0 z-10 h-0.5 w-0 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
                />
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>

      {showSupporting && (
        <RevealGroup className="mt-5 grid gap-5 sm:grid-cols-3" stagger={0.07} delay={0.1}>
          {supportingCapabilities.map((capability) => (
            <RevealItem key={capability.name}>
              <Link
                href={capability.href}
                className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-navy-900/10 bg-navy-50/70 p-6 transition-colors hover:border-navy-900/25 hover:bg-white"
              >
                <span>
                  <span className="font-display block text-base font-semibold tracking-tight text-navy-900">
                    {capability.name}
                  </span>
                  <span className="mt-1 block text-[0.82rem] leading-snug text-navy-500">
                    {capability.body}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-indigo-brand transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      )}
    </div>
  );
}
