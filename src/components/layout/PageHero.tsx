"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import Breadcrumb, { type Crumb } from "@/components/ui/Breadcrumb";
import { Eyebrow } from "@/components/ui/Section";
import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";
import BrandFeature from "@/components/graphics/BrandFeature";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";
import type { SiteImage } from "@/content/images";

/**
 * Inner-page hero. The whole block drifts up and fades as you scroll past it,
 * so the page beneath appears to slide over the top of it.
 *
 * Every page gets a graphic beside the headline: the photograph passed in, or
 * the brand mark when a page has no image of its own.
 */
export default function PageHero({
  eyebrow,
  title,
  accent,
  intro,
  crumbs,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string | string[];
  crumbs: Crumb[];
  image?: SiteImage;
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
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduceMotion ? "0%" : "12%"]);
  const paragraphs = Array.isArray(intro) ? intro : intro ? [intro] : [];

  return (
    <section
      ref={ref}
      className="grain relative overflow-hidden bg-navy-950 pb-24 pt-36 text-white sm:pb-28 sm:pt-40"
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

      <div className="container-page relative z-10 grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <motion.div style={{ y, opacity }}>
          <Reveal duration={0.5}>
            <Breadcrumb items={crumbs} tone="light" />
          </Reveal>
          <div className="mt-8">
            <Reveal duration={0.5} delay={0.05}>
              <Eyebrow tone="light">{eyebrow}</Eyebrow>
            </Reveal>
            <h1 className="font-display mt-6 text-balance text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-[3.6rem]">
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
                <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-white/65">
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

        {/* The page's own visual, or the house feather. The photograph shows on
            every screen — on mobile it stacks under the copy and breaks up
            what would otherwise be a wall of text. The feather is decorative,
            so it stays desktop-only. */}
        <div className={image ? "" : "hidden lg:block"}>
          {image ? (
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-white/10 lg:aspect-[4/5]">
              {/* Two counter-moving transforms, not a clip-path animation —
                  see the note in MediaFrame for why clip-path silently fails. */}
              <motion.div
                className="h-full w-full"
                initial={reduceMotion ? false : { y: "101%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="relative h-full w-full overflow-hidden"
                  initial={reduceMotion ? false : { y: "-101%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div className="absolute inset-0" style={{ y: imageY }}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      priority
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent"
              />
            </div>
          ) : (
            <div className="pointer-events-none flex justify-center">
              <BrandFeature className="h-[24rem] w-[18rem]" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
