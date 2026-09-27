"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, useState } from "react";
import StickyStory from "@/components/motion/StickyStory";
import ExpandingPanels from "@/components/motion/ExpandingPanels";
import SectionTag from "@/components/ui/SectionTag";
import Chip from "@/components/ui/Chip";
import Button from "@/components/ui/Button";
import { lab } from "@/content/lab";
import { ease } from "@/lib/motion";
import type { Pillar } from "@/content/services";
import DotField from "@/components/graphics/DotField";
import DotWordmark from "@/components/graphics/DotWordmark";
import ChevronParticles from "@/components/graphics/ChevronParticles";
import CoordinationStory from "@/components/graphics/CoordinationStory";
import CapabilityArt from "@/components/graphics/capability";

/* ------------------------------------------------------------------ Story */

function StoryFrame({ progress }: { progress: MotionValue<number> }) {
  const [after, setAfter] = useState(false);
  useMotionValueEvent(progress, "change", (v) => setAfter(v >= 0.55));
  const dot = useTransform(progress, [0, 1], ["0%", "100%"]);

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
      <div className="relative aspect-[3/4] max-h-[62svh] w-full text-ink/70 md:aspect-[3/2] lg:col-span-8">
        <CoordinationStory progress={progress} idPrefix="lab-story" />
      </div>
    </div>
  );
}

export function StoryDemo() {
  return (
    <StickyStory
      fallback={
        <div className="container-page grid gap-10 py-16 lg:grid-cols-2">
          <div className="text-ink/70">
            <p className="type-display-m text-ink">{lab.labels.storyA}</p>
            <CoordinationStory state="before" idPrefix="lab-story-a" className="mt-6 aspect-[3/4] md:aspect-[3/2]" />
          </div>
          <div className="text-ink/70">
            <p className="type-display-m text-ink">{lab.labels.storyB}</p>
            <CoordinationStory state="after" idPrefix="lab-story-b" className="mt-6 aspect-[3/4] md:aspect-[3/2]" />
          </div>
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
        content: (active: boolean) => (
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
            <div className="grid place-items-center text-white/70">
              <CapabilityArt slug={pillar.slug} active={active} />
            </div>
          </div>
        ),
      }))}
    />
  );
}

/* -------------------------------------------------------------- 3D / WebGL */

export function GlDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "center 0.5"] });
  return (
    <div className="grid gap-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-[var(--radius-md)] border border-line bg-paper-2" data-tone="paper">
          <p className="type-mono-s absolute left-4 top-4 z-10 text-ink-2">{lab.labels.terrainPaper}</p>
          <DotField tone="paper" className="h-72 w-full" />
        </div>
        <div className="relative overflow-hidden rounded-[var(--radius-md)] border border-line-night bg-night" data-tone="night">
          <p className="type-mono-s absolute left-4 top-4 z-10 text-white/60">{lab.labels.terrainNight}</p>
          <DotField tone="night" className="h-72 w-full" amplitude={1.2} />
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-[var(--radius-md)] border border-line-night bg-night">
          <p className="type-mono-s absolute left-4 top-4 z-10 text-white/60">{lab.labels.chevronsAuto}</p>
          <ChevronParticles tone="night" className="aspect-square w-full" />
        </div>
        <div ref={ref} className="relative overflow-hidden rounded-[var(--radius-md)] border border-line-night bg-night">
          <p className="type-mono-s absolute left-4 top-4 z-10 text-white/60">{lab.labels.chevronsScroll}</p>
          <ChevronParticles tone="night" progress={scrollYProgress} className="aspect-square w-full" />
        </div>
      </div>
      <div className="relative overflow-hidden rounded-[var(--radius-md)] border border-line-night bg-night px-4 py-10">
        <p className="type-mono-s absolute left-4 top-4 z-10 text-white/60">{lab.labels.wordmark}</p>
        <DotWordmark text={lab.labels.wordmarkText} />
      </div>
    </div>
  );
}
