"use client";

import { motion, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";
import { useState } from "react";
import Sheet from "@/components/ui/Sheet";
import SectionTag from "@/components/ui/SectionTag";
import StickyStory from "@/components/motion/StickyStory";
import CoordinationStory from "@/components/graphics/CoordinationStory";
import { homeV3 } from "@/content/home";
import { coordinationStory } from "@/content/graphics";
import { ease } from "@/lib/motion";

/**
 * S3 Problem story (brief §9.2): the one pinned, scroll-scrubbed section.
 * The illustration morphs from six tangled vendors into one hub, and the
 * headline rolls from the problem to the answer at 55%. Reduced motion shows
 * the two frames stacked, unpinned.
 *
 * The H2 carries both statements for screen readers and search; the visible
 * swap is decorative.
 */
function Headline({ after }: { after: boolean }) {
  const { problem } = homeV3;
  return (
    <h2 className="type-display-l mt-6 text-ink">
      <span className="sr-only">
        {problem.before} {problem.after}
      </span>
      <span aria-hidden="true" className="grid overflow-hidden">
        <span className="invisible col-start-1 row-start-1">{problem.after}</span>
        <motion.span
          key={after ? "after" : "before"}
          className="col-start-1 row-start-1"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.6, ease: ease.outExpo }}
        >
          {after ? problem.after : problem.before}
        </motion.span>
      </span>
    </h2>
  );
}

function Frame({ progress }: { progress: MotionValue<number> }) {
  const { problem } = homeV3;
  const [after, setAfter] = useState(false);
  useMotionValueEvent(progress, "change", (value) => setAfter(value >= 0.55));
  const dot = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div className="container-page flex h-full flex-col justify-center gap-6 pb-8 pt-24 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-0">
      <div className="order-2 lg:order-1 lg:col-span-4">
        <SectionTag index={2} label={problem.tag} />
        <Headline after={after} />
        <div className="type-mono-s mt-8 flex items-center gap-3 text-ink-2" aria-hidden="true">
          <span>{problem.scale[0]}</span>
          <span className="relative h-px flex-1 bg-line">
            <motion.span
              className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-growth"
              style={{ left: dot }}
            />
          </span>
          <span>{problem.scale[1]}</span>
        </div>
      </div>
      <div className="order-1 h-[46svh] min-h-0 text-ink/70 lg:order-2 lg:col-span-8 lg:h-[72svh]">
        <CoordinationStory progress={progress} idPrefix="problem" className="h-full" />
      </div>
    </div>
  );
}

export default function ProblemStory() {
  const { problem } = homeV3;
  return (
    <Sheet tone="paper" overlap={false} pad={false} id="problem" guides={{ accent: 0 }}>
      <p className="sr-only">
        {coordinationStory.before} {coordinationStory.after}
      </p>
      <StickyStory
        fallback={
          <div className="container-page grid gap-12 py-24 lg:grid-cols-2">
            <div>
              <SectionTag index={2} label={problem.tag} />
              <h2 className="type-display-l mt-6 text-ink">{problem.before}</h2>
              <div className="mt-8 aspect-[3/4] text-ink/70 md:aspect-[3/2]">
                <CoordinationStory state="before" idPrefix="problem-a" className="h-full" />
              </div>
            </div>
            <div>
              <p className="type-mono-s text-ink-2">{problem.scale[1]}</p>
              <p className="type-display-l mt-6 text-ink">{problem.after}</p>
              <div className="mt-8 aspect-[3/4] text-ink/70 md:aspect-[3/2]">
                <CoordinationStory state="after" idPrefix="problem-b" className="h-full" />
              </div>
            </div>
          </div>
        }
      >
        {(progress) => <Frame progress={progress} />}
      </StickyStory>
    </Sheet>
  );
}
