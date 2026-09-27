"use client";

import { useEffect, useRef, useState } from "react";
import Brackets from "@/components/ui/Brackets";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

/**
 * Configurable motion graphics for articles and case studies (the "Steps
 * flow", "Funnel" and "Bar chart" blocks in the editor). The author supplies
 * the labels and numbers; the drawing, motion and accessibility are fixed
 * here. The bars and funnel grow once when they come into view; the steps
 * flow walks a packet along the chain only while on screen, and stops on
 * hover, for reduced motion and with the Motion switch off.
 */

function useInView<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView, seen };
}

function Caption({ text }: { text?: string }) {
  return text ? <figcaption className="type-mono-s mt-3 text-ink-2">{text}</figcaption> : null;
}

const STEP_MS = 1400;

export function FlowSteps({ steps = [], caption }: { steps?: string[]; caption?: string }) {
  const { ref, inView } = useInView<HTMLOListElement>();
  const reduceMotion = useReducedMotionSafe();
  const [held, setHeld] = useState(false);
  const [active, setActive] = useState(0);
  const running = inView && !reduceMotion && !held && steps.length > 1;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setActive((current) => (current + 1) % steps.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [running, steps.length]);

  return (
    <figure className="not-prose my-10">
      <ol
        ref={ref}
        className="grid gap-3 rounded-[var(--radius-md)] border border-line bg-card p-4 sm:p-6 md:gap-0"
        style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${steps.length > 4 ? 120 : 150}px, 1fr))` }}
        onPointerEnter={() => setHeld(true)}
        onPointerLeave={() => setHeld(false)}
      >
        {steps.map((step, index) => {
          const isActive = running && index === active;
          const last = index === steps.length - 1;
          return (
            <li key={`${step}-${index}`} className="relative flex flex-col gap-3 md:px-3">
              <span className="type-mono relative inline-flex h-8 w-fit items-center gap-1.5 bg-paper px-2 text-ink outline outline-1 outline-line">
                {isActive && <Brackets inset={-5} size={7} />}
                <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-growth" : "bg-signal"}`} />
                {`.${String(index + 1).padStart(2, "0")}`}
              </span>
              <span className="type-body text-pretty text-ink">{step}</span>
              {!last && (
                <span aria-hidden="true" className="pointer-events-none absolute left-[calc(3rem+16px)] right-2 top-4 hidden md:block">
                  <span className="block h-px w-full border-t border-dashed border-ink/30" />
                  {isActive && (
                    <span
                      className="process-packet absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-signal"
                      style={{ animationDuration: `${STEP_MS}ms` }}
                    />
                  )}
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <Caption text={caption} />
    </figure>
  );
}

type Datum = { label: string; value: number | null };

const format = (value: number) => new Intl.NumberFormat("en-IN").format(value);

export function Funnel({ stages = [], caption }: { stages?: Datum[]; caption?: string }) {
  const { ref, seen } = useInView<HTMLDivElement>();
  const reduceMotion = useReducedMotionSafe();
  const max = Math.max(1, ...stages.map((stage) => stage.value ?? 0));
  const grown = seen || reduceMotion;

  return (
    <figure className="not-prose my-10">
      <div ref={ref} className="rounded-[var(--radius-md)] border border-line bg-card p-4 sm:p-6">
        <ol className="space-y-2">
          {stages.map((stage, index) => {
            const value = stage.value ?? 0;
            const share = Math.max(6, (value / max) * 100);
            const previous = index > 0 ? stages[index - 1].value ?? 0 : null;
            const rate = previous ? Math.round((value / previous) * 100) : null;
            return (
              <li key={`${stage.label}-${index}`} className="grid grid-cols-[minmax(0,9rem)_1fr] items-center gap-3 sm:grid-cols-[minmax(0,12rem)_1fr]">
                <span className="text-pretty">
                  <span className="type-body-s block text-ink">{stage.label}</span>
                  <span className="type-mono-s text-ink-2">
                    {format(value)}
                    {rate !== null && ` · ${rate}%`}
                  </span>
                </span>
                <span aria-hidden="true" className="relative flex h-10 items-center justify-center">
                  <span
                    className={`absolute inset-y-0 rounded-[6px] transition-[width] duration-1000 ease-[var(--ease-out-expo)] ${
                      index === stages.length - 1 ? "bg-signal" : "bg-ink/80"
                    }`}
                    style={{ width: grown ? `${share}%` : "0%", transitionDelay: `${index * 120}ms` }}
                  />
                </span>
              </li>
            );
          })}
        </ol>
      </div>
      <Caption text={caption} />
    </figure>
  );
}

export function BarChart({ bars = [], unit, caption }: { bars?: Datum[]; unit?: string; caption?: string }) {
  const { ref, seen } = useInView<HTMLDivElement>();
  const reduceMotion = useReducedMotionSafe();
  const max = Math.max(1, ...bars.map((bar) => bar.value ?? 0));
  const grown = seen || reduceMotion;
  const peak = bars.findIndex((bar) => (bar.value ?? 0) === max);

  return (
    <figure className="not-prose my-10">
      <div ref={ref} className="rounded-[var(--radius-md)] border border-line bg-card p-4 sm:p-6">
        <ol className="flex h-64 items-end gap-2 border-b border-line sm:gap-3">
          {bars.map((bar, index) => {
            const value = bar.value ?? 0;
            return (
              <li key={`${bar.label}-${index}`} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="type-mono-s text-ink">
                  <span className="sr-only">{`${bar.label}: `}</span>
                  {`${format(value)}${unit ?? ""}`}
                </span>
                <span
                  aria-hidden="true"
                  className={`w-full max-w-14 origin-bottom rounded-t-[4px] transition-transform duration-1000 ease-[var(--ease-out-expo)] ${
                    index === peak ? "bg-signal" : "bg-ink/75"
                  }`}
                  style={{
                    height: `${Math.max(2, (value / max) * 85)}%`,
                    transform: grown ? "scaleY(1)" : "scaleY(0)",
                    transitionDelay: `${index * 80}ms`,
                  }}
                />
              </li>
            );
          })}
        </ol>
        <ol aria-hidden="true" className="mt-2 flex gap-2 sm:gap-3">
          {bars.map((bar, index) => (
            <li key={`${bar.label}-label-${index}`} className="type-mono-s flex-1 text-center text-ink-2">
              {bar.label}
            </li>
          ))}
        </ol>
      </div>
      <Caption text={caption} />
    </figure>
  );
}
