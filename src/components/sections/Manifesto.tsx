"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";
import ChevronParticles from "@/components/graphics/ChevronParticles";
import ScrollHighlightText from "@/components/motion/ScrollHighlightText";
import { homeV3 } from "@/content/home";

/**
 * S4 Manifesto, the merged "Who we are" + "What you get" (decision log #2).
 * The words fill in as they cross the viewport while, beside them, a 3D cloud
 * of scattered points assembles into the chevron stack: fragmented vendors
 * becoming one system. Sits at the top of the night sheet it shares with the
 * capabilities.
 */
export default function Manifesto() {
  const { manifesto } = homeV3;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "center 0.5"] });

  return (
    <div ref={ref} className="container-page grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-5">
        <ChevronParticles
          tone="night"
          progress={scrollYProgress}
          className="mx-auto aspect-square w-full max-w-[22rem] lg:max-w-[30rem]"
        />
        <p className="type-mono-s mt-2 text-center text-white/60 lg:text-left">{manifesto.note}</p>
      </div>
      <div className="lg:col-span-7">
        <ScrollHighlightText text={manifesto.text} className="type-display-l text-white" from={0.16} />
        <p className="type-body-l mt-8 max-w-xl text-white/70">{manifesto.line}</p>
        <p className="type-mono mt-8 text-white/60">{manifesto.pillars}</p>
      </div>
    </div>
  );
}
