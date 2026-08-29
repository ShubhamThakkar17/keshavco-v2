"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { hero } from "@/content/home";
import { cta } from "@/content/site";
import Button from "@/components/ui/Button";
import RotatingWords from "@/components/motion/RotatingWords";
import { Eyebrow } from "@/components/ui/Section";
import MorPankh from "@/components/graphics/MorPankh";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

const line = {
  hidden: { y: "115%", opacity: 0 },
  show: { y: "0%", opacity: 1 },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.35 });

  // Reduced motion flattens each range rather than dropping the `style` prop:
  // unbinding a motion value mid-life leaves its last inline style behind.
  const contentY = useTransform(smooth, [0, 1], ["0%", reduceMotion ? "0%" : "26%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduceMotion ? 1 : 0]);
  const auroraA = useTransform(smooth, [0, 1], ["0%", reduceMotion ? "0%" : "38%"]);
  const auroraB = useTransform(smooth, [0, 1], ["0%", reduceMotion ? "0%" : "-28%"]);
  const gridY = useTransform(smooth, [0, 1], ["0%", reduceMotion ? "0%" : "16%"]);

  return (
    <section
      ref={ref}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-navy-950 pb-20 pt-36 text-white sm:pt-40"
    >
      {/* Layered aurora — each layer drifts at a different rate. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          style={{ y: auroraA }}
          className="absolute -left-[15%] top-[-18%] h-[46rem] w-[46rem] rounded-full opacity-45 blur-[130px]"
        >
          <div
            className="h-full w-full rounded-full"
            style={{ background: "radial-gradient(closest-side, #4F46E5, transparent)" }}
          />
        </motion.div>
        <motion.div
          style={{ y: auroraB }}
          className="absolute -right-[10%] top-[8%] h-[38rem] w-[38rem] rounded-full opacity-40 blur-[120px]"
        >
          <div
            className="h-full w-full rounded-full"
            style={{ background: "radial-gradient(closest-side, #7C3AED, transparent)" }}
          />
        </motion.div>
        <motion.div
          style={{ y: auroraA }}
          className="absolute bottom-[-20%] left-[35%] h-[30rem] w-[30rem] rounded-full opacity-25 blur-[130px]"
        >
          <div
            className="h-full w-full rounded-full"
            style={{ background: "radial-gradient(closest-side, #22C55E, transparent)" }}
          />
        </motion.div>

        {/* On narrow screens the feather washes in behind the headline. */}
        <div className="absolute -right-24 top-24 w-[26rem] opacity-[0.16] lg:hidden">
          <MorPankh className="h-[32rem] w-full" animate={false} idSuffix="hero-bg" />
        </div>

        {/* Faint measurement grid, parallaxed behind everything. */}
        <motion.div
          style={{ y: gridY }}
          className="absolute inset-0 opacity-[0.16]"
        >
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
              backgroundSize: "clamp(56px, 7vw, 96px) clamp(56px, 7vw, 96px)",
              maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
            }}
          />
        </motion.div>
      </div>

      <motion.div
        className="container-page relative z-10 flex items-center gap-14 xl:gap-20"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="min-w-0 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow tone="light">{hero.eyebrow}</Eyebrow>
        </motion.div>

        <h1 className="font-display mt-7 max-w-[19ch] text-balance text-[clamp(2rem,7.8vw,2.6rem)] font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.6rem] xl:text-[5.2rem]">
          <motion.span
            className="block"
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.07, delayChildren: 0.12 }}
          >
            {hero.headingPrefix.split(" ").map((word, index) => (
              <span key={index} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block"
                  variants={line}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}&nbsp;
                </motion.span>
              </span>
            ))}
          </motion.span>
          <motion.span
            className="mt-1 block"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <RotatingWords words={hero.rotatingWords} />
          </motion.span>
        </h1>

        <motion.p
          className="mt-8 max-w-2xl text-pretty text-[0.98rem] leading-relaxed text-white/60 sm:text-[1.08rem]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {hero.subheading}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.68, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button href={cta.primary.href} variant="light" size="lg" withArrow>
            {cta.primary.label}
          </Button>
          <Button href={cta.secondary.href} variant="ghost" size="lg" className="text-white/70 hover:text-white">
            {cta.secondary.label}
          </Button>
        </motion.div>

        <motion.div
          className="mt-12 flex items-center gap-5 border-t border-white/10 pt-7 sm:mt-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.9 }}
        >
          <span aria-hidden="true" className="bg-gradient-brand h-10 w-0.5 shrink-0 rounded-full" />
          <p className="font-display max-w-xl text-base italic text-white/70 sm:text-lg">
            &ldquo;{hero.quote}&rdquo;
          </p>
        </motion.div>
        </div>

        {/* The Mor Pankh — Krishna's feather, and the reason for the name. */}
        <div className="pointer-events-none hidden shrink-0 lg:block">
          <MorPankh className="h-[34rem] w-[24rem] xl:h-[40rem] xl:w-[28rem]" idSuffix="hero" />
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-7 z-10 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{ opacity: contentOpacity }}
      >
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <motion.span
            className="block h-1.5 w-1 rounded-full bg-white/60"
            animate={reduceMotion ? { y: 0, opacity: 1 } : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </span>
      </motion.div>
    </section>
  );
}
