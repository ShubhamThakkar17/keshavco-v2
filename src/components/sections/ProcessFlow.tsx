"use client";

import { useEffect, useRef, useState } from "react";
import ProcessIcon from "@/components/graphics/process/ProcessIcon";
import Brackets from "@/components/ui/Brackets";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";
import { homeV3 } from "@/content/home";

type Stage = { number: string; title: string; line: string };

/**
 * S7 Process (brief §9.2): five stages in columns joined by dotted
 * connectors labelled with what each stage hands to the next (DIAGNOSIS >,
 * ROADMAP > …). While on screen a packet works along the chain; the stage it
 * reaches gets corner brackets and the green eye, and its icon comes alive.
 * On phones the stages stack on a vertical rail.
 */
const STEP_MS = 1400;

function Connector({ label, live, last }: { label: string; live: boolean; last: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute left-[calc(50%+38px)] top-[98px] hidden lg:block ${
        last ? "right-0" : "right-[calc(-50%+38px)]"
      }`}
    >
      <span className="type-mono-s absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-ink-2">
        {label}
      </span>
      <svg className="h-2 w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 8">
        <line x1="0" y1="4" x2="100" y2="4" className="flow-dash stroke-ink/40" strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
      </svg>
      {live && (
        <span
          className="process-packet absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-signal"
          style={{ animationDuration: `${STEP_MS}ms` }}
        />
      )}
    </span>
  );
}

export default function ProcessFlow({ stages }: { stages: Stage[] }) {
  const { process } = homeV3;
  const ref = useRef<HTMLOListElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setActive((current) => (current + 1) % stages.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [inView, reduceMotion, stages.length]);

  return (
    <ol ref={ref} className="relative grid gap-10 lg:grid-cols-5 lg:gap-0">
      {/* Mobile rail */}
      <span aria-hidden="true" className="absolute bottom-6 left-[27px] top-6 w-px border-l border-dashed border-ink/25 lg:hidden" />
      {stages.map((stage, index) => {
        const isActive = !reduceMotion && index === active;
        return (
          <li key={stage.number} className="relative grid grid-cols-[56px_1fr] gap-x-5 lg:block lg:px-4 lg:text-center">
            <div className="lg:flex lg:flex-col lg:items-center">
              <span className="type-mono relative z-10 inline-flex h-8 items-center gap-1.5 bg-card px-2 text-ink outline outline-1 outline-line lg:mb-5">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-signal" />
                {`.${stage.number}`}
              </span>
              <span className="relative mt-4 hidden h-[60px] w-[60px] place-items-center text-ink lg:grid">
                {isActive && <Brackets inset={-6} />}
                <ProcessIcon stage={process.icons[index]} active={isActive} />
              </span>
            </div>
            <div className="lg:mt-5">
              <h3 className="type-mono text-ink">{stage.title}</h3>
              <p className="type-body-s mt-2 text-ink-2 lg:mx-auto lg:max-w-[16ch]">{stage.line}</p>
              <p className="type-mono-s mt-3 text-ink-2 lg:hidden">{process.outputs[index]}</p>
            </div>
            <Connector label={process.outputs[index]} live={isActive} last={index === stages.length - 1} />
          </li>
        );
      })}
    </ol>
  );
}
