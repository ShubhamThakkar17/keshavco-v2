"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import { cta, ctaSupportLines } from "@/content/site";
import { ctaBands } from "@/content/misc";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

type BandKey = keyof typeof ctaBands;

/**
 * The recurring CTA band. Its gradient field pans as the band crosses the
 * viewport, so the section reads as lit rather than printed.
 */
export default function CtaBand({
  variant = "general",
  supportLine = 0,
}: {
  variant?: BandKey;
  /** Index into the supporting one-liners from §1.2 of the copy document. */
  supportLine?: number;
}) {
  const band = ctaBands[variant];
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["0%", "0%"] : ["-18%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduceMotion ? [1.2, 1.2, 1.2] : [1.1, 1.35, 1.1]);

  const button = cta[band.button];

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-navy-950 py-24 sm:py-32">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-[120px]"
        style={{ x, scale }}
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, #4F46E5 0%, #7C3AED 42%, #22C55E 78%, transparent 100%)",
          }}
        />
      </motion.div>

      <div className="container-page relative z-10 text-center">
        <h2 className="font-display mx-auto max-w-4xl text-balance text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
          <SplitText text={band.heading} as="span" />
        </h2>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/65">
            {band.body}
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-col items-center gap-4">
            <Button href={button.href} variant="light" size="lg" withArrow>
              {button.label}
            </Button>
            <p className="text-xs text-white/40">{ctaSupportLines[supportLine]}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
