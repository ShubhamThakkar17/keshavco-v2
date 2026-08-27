"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import Breadcrumb, { type Crumb } from "@/components/ui/Breadcrumb";
import { Eyebrow } from "@/components/ui/Section";
import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

/**
 * Inner-page hero. The whole block drifts up and fades as you scroll past it,
 * so the page beneath appears to slide over the top of it.
 */
export default function PageHero({
  eyebrow,
  title,
  accent,
  intro,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string | string[];
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "22%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, reduceMotion ? 1 : 0]);
  const paragraphs = Array.isArray(intro) ? intro : intro ? [intro] : [];

  return (
    <section
      ref={ref}
      className="grain relative overflow-hidden bg-navy-950 pb-24 pt-36 text-white sm:pb-32 sm:pt-44"
    >
      {/* Aurora field */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
        <div
          className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full opacity-40 blur-[110px]"
          style={{ background: "radial-gradient(closest-side, #4F46E5, transparent)" }}
        />
        <div
          className="absolute -right-24 top-10 h-[28rem] w-[28rem] rounded-full opacity-30 blur-[110px]"
          style={{ background: "radial-gradient(closest-side, #7C3AED, transparent)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: "linear-gradient(to top, #080d18, transparent)" }}
        />
      </div>

      <motion.div
        className="container-page relative z-10"
        style={{ y, opacity }}
      >
        <Reveal duration={0.5}>
          <Breadcrumb items={crumbs} tone="light" />
        </Reveal>
        <div className="mt-8">
          <Reveal duration={0.5} delay={0.05}>
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
          </Reveal>
          <h1 className="font-display mt-6 max-w-5xl text-balance text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.9rem]">
            <SplitText text={title} as="span" className="block" amount={0.1} />
            {accent && (
              <SplitText
                text={accent}
                as="span"
                className="text-gradient-brand block"
                delay={0.12}
                amount={0.1}
              />
            )}
          </h1>
          {paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={0.18 + index * 0.07}>
              <p className="mt-6 max-w-3xl text-pretty text-base leading-relaxed text-white/65 sm:text-[1.08rem]">
                {paragraph}
              </p>
            </Reveal>
          ))}
          {children && (
            <Reveal delay={0.3}>
              <div className="mt-10">{children}</div>
            </Reveal>
          )}
        </div>
      </motion.div>
    </section>
  );
}
