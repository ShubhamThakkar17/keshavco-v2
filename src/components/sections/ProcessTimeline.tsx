"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/motion/Reveal";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

export type TimelineStage = {
  number: string;
  title: string;
  lead?: string;
  body: string;
  outcome?: string;
};

/**
 * Vertical timeline whose spine fills in as the section scrolls, with each
 * stage's marker lighting up as it passes the halfway line.
 */
export default function ProcessTimeline({
  stages,
  tone = "dark",
}: {
  stages: TimelineStage[];
  tone?: "dark" | "light";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 65%"],
  });
  const spring = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  // Reduced motion shows the spine and every marker already filled in.
  const scaleY = useTransform(spring, [0, 1], reduceMotion ? [1, 1] : [0, 1]);

  const isLight = tone === "light";

  return (
    <div ref={ref} className="relative">
      {/* Spine */}
      <div
        aria-hidden="true"
        className={`absolute bottom-0 left-[15px] top-2 w-px sm:left-[23px] ${
          isLight ? "bg-white/12" : "bg-navy-900/10"
        }`}
      >
        <motion.div
          className="bg-gradient-brand h-full w-full origin-top"
          style={{ scaleY }}
        />
      </div>

      <ol className="space-y-14 sm:space-y-20">
        {stages.map((stage, index) => (
          <Stage
            key={stage.number}
            stage={stage}
            index={index}
            isLight={isLight}
            progress={scaleY}
            total={stages.length}
            reduceMotion={Boolean(reduceMotion)}
          />
        ))}
      </ol>
    </div>
  );
}

function Stage({
  stage,
  index,
  total,
  isLight,
  progress,
  reduceMotion,
}: {
  stage: TimelineStage;
  index: number;
  total: number;
  isLight: boolean;
  progress: ReturnType<typeof useSpring>;
  reduceMotion: boolean;
}) {
  const threshold = index / total;
  const markerScale = useTransform(
    progress,
    [threshold, threshold + 0.06],
    reduceMotion ? [1, 1] : [0, 1],
  );

  return (
    <li className="relative pl-12 sm:pl-20">
      <span
        aria-hidden="true"
        className={`absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border sm:h-12 sm:w-12 ${
          isLight ? "border-white/15 bg-navy-950" : "border-navy-900/10 bg-white"
        }`}
      >
        <motion.span
          className="bg-gradient-brand block h-2.5 w-2.5 rounded-full sm:h-3.5 sm:w-3.5"
          style={{ scale: markerScale }}
        />
      </span>

      <Reveal>
        <p
          className={`font-display text-xs font-semibold tabular-nums tracking-[0.2em] ${
            isLight ? "text-white/35" : "text-navy-300"
          }`}
        >
          {stage.number}
        </p>
        <h3
          className={`font-display mt-3 text-2xl font-bold tracking-tight sm:text-3xl ${
            isLight ? "text-white" : "text-navy-900"
          }`}
        >
          {stage.title}
        </h3>
        {stage.lead && (
          <p
            className={`mt-3 text-base font-medium sm:text-lg ${
              isLight ? "text-white/75" : "text-navy-700"
            }`}
          >
            {stage.lead}
          </p>
        )}
        <p
          className={`mt-4 max-w-2xl text-[0.95rem] leading-relaxed ${
            isLight ? "text-white/55" : "text-navy-500"
          }`}
        >
          {stage.body}
        </p>
        {stage.outcome && (
          <div
            className={`mt-6 max-w-2xl rounded-2xl border p-5 ${
              isLight ? "border-white/12 bg-white/5" : "border-navy-900/10 bg-navy-50"
            }`}
          >
            <p
              className={`text-[0.7rem] font-semibold uppercase tracking-[0.16em] ${
                isLight ? "text-white/40" : "text-navy-400"
              }`}
            >
              What you get
            </p>
            <p
              className={`mt-2 text-[0.92rem] leading-relaxed ${
                isLight ? "text-white/70" : "text-navy-600"
              }`}
            >
              {stage.outcome}
            </p>
          </div>
        )}
      </Reveal>
    </li>
  );
}
