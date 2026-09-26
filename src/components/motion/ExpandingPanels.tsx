"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

export type PanelItem = {
  id: string;
  /** Accessible name and the collapsed, rotated label. */
  name: string;
  /** Expanded content. Rendered for every panel (crawlable); inert when closed. */
  content: ReactNode;
};

/**
 * Horizontal expanding panels (Spartan capabilities), a vertical accordion
 * below the desktop breakpoint.
 *
 * - One panel is always open. The open panel grows (flex 1) while the others
 *   hold a 96px column showing a rotated mono label; the change is a CSS
 *   flex transition (inOutQuart, 0.7s), cheaper than a layout animation.
 * - Opens on hover (desktop mouse, 120ms intent), click, and keyboard: each
 *   panel header is a button with `aria-expanded`; arrow keys, Home and End
 *   move between headers.
 * - Auto-advances every 6s until the visitor interacts, and only while on
 *   screen with motion allowed.
 */
export default function ExpandingPanels({
  items,
  interval = 6000,
  className = "",
  tone = "night",
}: {
  items: PanelItem[];
  interval?: number;
  className?: string;
  tone?: "night" | "paper";
}) {
  const baseId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const hoverTimer = useRef<number | undefined>(undefined);
  const reduceMotion = useReducedMotionSafe();
  const [active, setActive] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (interacted || reduceMotion || !inView || items.length < 2) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setActive((current) => (current + 1) % items.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [interacted, reduceMotion, inView, interval, items.length]);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const open = useCallback((index: number) => {
    setInteracted(true);
    setActive(index);
  }, []);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    const next: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowDown: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      ArrowUp: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    setInteracted(true);
    buttons.current[next[event.key]]?.focus();
  };

  const night = tone === "night";
  const panelSurface = night
    ? "border-line-night bg-night-2 text-white"
    : "border-line bg-card text-ink";

  return (
    <div
      ref={rootRef}
      className={`flex flex-col gap-2 lg:h-[560px] lg:flex-row ${className}`}
      onFocusCapture={() => setInteracted(true)}
    >
      {items.map((item, index) => {
        const isActive = index === active;
        const headerId = `${baseId}-h-${index}`;
        const regionId = `${baseId}-r-${index}`;
        const number = String(index + 1).padStart(2, "0");

        return (
          <div
            key={item.id}
            data-active={isActive ? "true" : "false"}
            className={`group/panel relative overflow-hidden rounded-[var(--radius-md)] border lg:min-w-24 lg:transition-[flex-grow,flex-basis] lg:duration-700 lg:ease-[var(--ease-in-out-quart)] ${panelSurface} ${
              isActive ? "lg:flex-[1_1_0%]" : "lg:flex-[0_0_96px]"
            }`}
            onPointerEnter={(event) => {
              if (event.pointerType !== "mouse" || isActive) return;
              window.clearTimeout(hoverTimer.current);
              hoverTimer.current = window.setTimeout(() => open(index), 120);
            }}
            onPointerLeave={() => window.clearTimeout(hoverTimer.current)}
          >
            <h3>
              <button
                ref={(node) => {
                  buttons.current[index] = node;
                }}
                id={headerId}
                type="button"
                aria-expanded={isActive}
                aria-controls={regionId}
                onClick={() => open(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`type-mono relative z-10 flex h-[72px] w-full items-center gap-4 px-5 text-left lg:absolute lg:h-auto lg:w-auto ${
                  isActive
                    ? "lg:inset-x-0 lg:top-0 lg:px-8 lg:pt-8"
                    : "lg:inset-0 lg:flex-col lg:justify-between lg:px-0 lg:py-6"
                }`}
              >
                <span className={night ? "text-white/60" : "text-ink-2"}>
                  {number}
                  {isActive && (
                    <span className="hidden lg:inline">
                      {" / "}
                      {String(items.length).padStart(2, "0")}
                    </span>
                  )}
                </span>
                <span
                  className={`flex-1 lg:flex-none ${
                    isActive ? "lg:sr-only" : "lg:rotate-180 lg:[writing-mode:vertical-rl]"
                  }`}
                >
                  {item.name}
                </span>
                <span
                  aria-hidden="true"
                  className={`grid h-6 w-6 place-items-center text-base leading-none transition-transform duration-300 ${
                    isActive ? "rotate-45 lg:hidden" : ""
                  } ${night ? "text-white/60" : "text-ink-2"}`}
                >
                  +
                </span>
              </button>
            </h3>

            <div
              id={regionId}
              role="region"
              aria-labelledby={headerId}
              inert={!isActive}
              className="grid transition-[grid-template-rows] duration-500 ease-[var(--ease-in-out-quart)] lg:absolute lg:inset-0 lg:block"
              style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
            >
              <div
                className={`min-h-0 overflow-hidden transition-opacity lg:h-full lg:pt-16 ${
                  isActive
                    ? "opacity-100 duration-500 lg:delay-300"
                    : "opacity-0 duration-150"
                }`}
              >
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
