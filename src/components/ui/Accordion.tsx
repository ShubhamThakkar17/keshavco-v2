"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { dur, ease } from "@/lib/motion";

export type AccordionItem = { id: string; question: string; answer: string };

/**
 * FAQ accordion (brief §5.4), two looks:
 * - **rows**: white rows on paper with a 1px line, for light sheets;
 * - **pills**: dark rounded pills (Spartan), for night sheets or as the
 *   contrast block on a paper sheet.
 *
 * One answer open at a time; closed answers are not in the DOM (the FAQ
 * content is also in the page's FAQPage JSON-LD). The `+` turns into `×`.
 */
export default function Accordion({
  items,
  variant = "rows",
  defaultOpen = null,
}: {
  items: AccordionItem[];
  variant?: "rows" | "pills";
  defaultOpen?: number | null;
}) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const pills = variant === "pills";

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => {
        const expanded = open === index;
        const panelId = `${baseId}-${item.id}`;
        return (
          <div
            key={item.id}
            className={
              pills
                ? "rounded-[var(--radius-md)] bg-night-2 text-white"
                : "rounded-xl border border-line bg-card text-ink"
            }
          >
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : index)}
                className="flex min-h-16 w-full items-center justify-between gap-6 px-5 py-4 text-left sm:px-6"
              >
                <span className="text-[1.0625rem] font-medium leading-snug tracking-[-0.01em]">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`relative grid h-7 w-7 shrink-0 place-items-center rounded-[var(--radius-sm)] transition-transform duration-300 ease-[var(--ease-out-expo)] ${
                    expanded ? "rotate-45" : ""
                  } ${pills ? "bg-white/[0.08] text-white" : "bg-paper-2 text-ink"}`}
                >
                  <span className="absolute h-px w-3 bg-current" />
                  <span className="absolute h-3 w-px bg-current" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={panelId}
                  key="panel"
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: dur.ui, ease: ease.outExpo }}
                  className="overflow-hidden"
                >
                  <p
                    className={`type-body max-w-3xl px-5 pb-6 pr-12 sm:px-6 ${
                      pills ? "text-white/65" : "text-ink-2"
                    }`}
                  >
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
