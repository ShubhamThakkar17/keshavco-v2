"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Brackets from "@/components/ui/Brackets";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";
import { processV3 } from "@/content/process";

type Stage = {
  number: string;
  title: string;
  lead: string;
  points: readonly string[];
  outcome: string;
};

/**
 * /process stage track (brief §9.4). Desktop: a 300vh track with a pinned
 * frame; the five stage panels slide sideways with the scroll and a mono
 * counter follows. Phones and reduced motion: the same panels stacked, no
 * pinning. The panels are the same DOM either way, so nothing is duplicated.
 */
function Panel({ stage, total }: { stage: Stage; total: number }) {
  return (
    <article className="flex h-full w-full shrink-0 flex-col rounded-[var(--radius-lg)] border border-line bg-card p-6 sm:p-8 lg:w-[min(34rem,42vw)] lg:p-10">
      <p className="type-mono text-ink-2">
        <span className="text-signal">.</span>
        {`${stage.number} ${processV3.of} ${String(total).padStart(2, "0")}`}
      </p>
      <h3 className="type-display-l mt-6 text-ink">{stage.title}</h3>
      <p className="type-body-l mt-4 text-pretty text-ink">{stage.lead}</p>
      <ul className="mt-6 space-y-2.5">
        {stage.points.map((point) => (
          <li key={point} className="type-body flex gap-3 text-pretty text-ink-2">
            <span aria-hidden="true" className="font-mono text-signal">
              &gt;
            </span>
            {point}
          </li>
        ))}
      </ul>
      <div className="relative mt-8 px-5 py-4 lg:mt-auto">
        <Brackets />
        <p className="type-mono-s flex items-center gap-2 text-ink">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-growth" />
          {processV3.outcome}
        </p>
        <p className="type-body-s mt-2 text-pretty text-ink-2">{stage.outcome}</p>
      </div>
    </article>
  );
}

export default function ProcessTrack({ stages }: { stages: readonly Stage[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const [distance, setDistance] = useState(0);
  const [desktop, setDesktop] = useState(false);
  const pinned = desktop && !reduceMotion;

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const row = rowRef.current;
    if (!row || !pinned) return;
    // Measured from the untransformed flex row, so a resize mid-scroll still
    // yields the full travel: the last panel ends on the container's edge.
    const measure = () => {
      const inner = row.firstElementChild as HTMLElement | null;
      if (!inner) return;
      const style = getComputedStyle(row);
      const available = row.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      setDistance(Math.max(0, inner.scrollWidth - available));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    return () => observer.disconnect();
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.04, 0.96], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0.04, 0.96], ["0%", "100%"]);

  // The ref stays on the same element in both layouts, so `useScroll` always
  // has a hydrated target.
  if (!pinned) {
    return (
      <div ref={trackRef} className="container-page relative flex flex-col gap-4">
        {stages.map((stage) => (
          <Panel key={stage.number} stage={stage} total={stages.length} />
        ))}
      </div>
    );
  }

  return (
    <div ref={trackRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden py-24">
        <div ref={rowRef} className="container-page">
          <motion.div className="flex items-stretch gap-6" style={{ x }}>
            {stages.map((stage) => (
              <Panel key={stage.number} stage={stage} total={stages.length} />
            ))}
          </motion.div>
        </div>
        <div className="container-page mt-10">
          <div aria-hidden="true" className="h-px w-full bg-line">
            <motion.span className="block h-px bg-signal" style={{ width: bar }} />
          </div>
        </div>
      </div>
    </div>
  );
}
