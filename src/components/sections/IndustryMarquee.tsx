"use client";

import Marquee from "@/components/motion/Marquee";
import Reveal from "@/components/motion/Reveal";
import { industryStrip } from "@/content/home";

/**
 * Stands in for the client-logo strip until logo permissions exist — the copy
 * document's own fallback. Swap the items for logos when they are cleared.
 */
export default function IndustryMarquee() {
  return (
    <div className="border-y border-navy-900/8 bg-white py-10">
      <Reveal>
        <p className="container-page mb-8 max-w-2xl text-center text-sm text-navy-400 sm:mx-auto">
          {industryStrip.heading}
        </p>
      </Reveal>

      <Marquee baseVelocity={2.4}>
        {industryStrip.items.map((item) => (
          <span key={item} className="flex items-center">
            <span className="font-display whitespace-nowrap px-8 text-xl font-semibold tracking-tight text-navy-900/25 transition-colors duration-500 hover:text-navy-900/60 sm:text-2xl">
              {item}
            </span>
            <span aria-hidden="true" className="bg-gradient-brand h-1.5 w-1.5 rounded-full" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
