"use client";

import { motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { useState } from "react";
import StickyStory from "@/components/motion/StickyStory";
import ExpandingPanels from "@/components/motion/ExpandingPanels";
import SectionTag from "@/components/ui/SectionTag";
import Chip from "@/components/ui/Chip";
import Button from "@/components/ui/Button";
import { lab } from "@/content/lab";
import { ease } from "@/lib/motion";
import type { Pillar } from "@/content/services";

/* ------------------------------------------------------------------ Story */

const scattered = [
  [18, 22],
  [72, 14],
  [86, 52],
  [64, 84],
  [22, 78],
  [8, 50],
];

function StoryNode({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const [sx, sy] = scattered[index];
  const tx = 16;
  const ty = 14 + index * 14;
  const x = useTransform(progress, [0.35, 0.75], [`${sx}%`, `${tx}%`]);
  const y = useTransform(progress, [0.35, 0.75], [`${sy}%`, `${ty}%`]);
  return (
    <motion.span
      className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 border border-ink bg-card"
      style={{ left: x, top: y }}
    />
  );
}

function StoryFrame({ progress }: { progress: MotionValue<number> }) {
  const [after, setAfter] = useState(false);
  useMotionValueEvent(progress, "change", (v) => setAfter(v >= 0.55));
  const dot = useTransform(progress, [0, 1], ["0%", "100%"]);
  const hub = useTransform(progress, [0.55, 0.75], [0, 1]);

  return (
    <div className="container-page grid h-full items-center gap-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <SectionTag index={6} label={lab.sections.story.tag} />
        {/* Both lines share one grid cell, so the heading reserves the height
            of the longer one and the swap never shifts the layout. */}
        <h2 className="type-display-l mt-6 grid overflow-hidden">
          <span aria-hidden="true" className="invisible col-start-1 row-start-1">
            {lab.labels.storyB}
          </span>
          <motion.span
            key={after ? "b" : "a"}
            className="col-start-1 row-start-1 block"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.6, ease: ease.outExpo }}
          >
            {after ? lab.labels.storyB : lab.labels.storyA}
          </motion.span>
        </h2>
        <div className="type-mono-s mt-8 flex items-center gap-3 text-ink-2">
          <span>{lab.labels.before}</span>
          <span className="relative h-px flex-1 bg-line">
            <motion.span
              className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-growth"
              style={{ left: dot }}
            />
          </span>
          <span>{lab.labels.after}</span>
        </div>
      </div>
      <div className="relative aspect-[4/3] border border-line bg-card lg:col-span-8">
        {scattered.map((_, index) => (
          <StoryNode key={index} progress={progress} index={index} />
        ))}
        <motion.span
          className="absolute left-[62%] top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 border-2 border-signal"
          style={{ opacity: hub, scale: hub }}
        />
      </div>
    </div>
  );
}

export function StoryDemo() {
  return (
    <StickyStory
      fallback={
        <div className="container-page grid gap-6 py-16 lg:grid-cols-2">
          <p className="type-display-m">{lab.labels.storyA}</p>
          <p className="type-display-m">{lab.labels.storyB}</p>
        </div>
      }
    >
      {(progress) => <StoryFrame progress={progress} />}
    </StickyStory>
  );
}

/* ----------------------------------------------------------------- Panels */

export function PanelsDemo({ pillars }: { pillars: Pillar[] }) {
  return (
    <ExpandingPanels
      items={pillars.map((pillar) => ({
        id: pillar.slug,
        name: pillar.name,
        content: (
          <div className="grid gap-6 px-5 pb-6 lg:h-full lg:grid-cols-[45%_55%] lg:px-8 lg:pb-8">
            <div className="flex flex-col">
              <p className="type-display-m text-white">{pillar.name}</p>
              <p className="type-body mt-3 max-w-sm text-white/70">{pillar.tagline}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {pillar.subServices.slice(0, 6).map((service) => (
                  <Chip key={service.slug}>{service.name}</Chip>
                ))}
              </div>
              <div className="mt-6 lg:mt-auto">
                <Button href={`/services/${pillar.slug}`} variant="ghost" tone="night">
                  {`${lab.labels.explore} ${pillar.name}`}
                </Button>
              </div>
            </div>
            <div className="type-mono-s grid min-h-40 place-items-center rounded-[var(--radius-sm)] border border-dashed border-white/15 text-white/55">
              {lab.labels.art}
            </div>
          </div>
        ),
      }))}
    />
  );
}
