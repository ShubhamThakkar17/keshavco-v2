"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export type AccordionItem = { id: string; question: string; answer: string };

export default function Accordion({
  items,
  tone = "dark",
  defaultOpen = 0,
}: {
  items: AccordionItem[];
  tone?: "dark" | "light";
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const isLight = tone === "light";

  return (
    <div className={`divide-y ${isLight ? "divide-white/12" : "divide-navy-900/10"}`}>
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`faq-panel-${item.id}`}
                onClick={() => setOpen(expanded ? null : index)}
                className={`flex w-full items-start justify-between gap-6 py-6 text-left transition-colors ${
                  isLight ? "text-white hover:text-white/80" : "text-navy-900 hover:text-indigo-brand"
                }`}
              >
                <span className="flex gap-4">
                  <span
                    className={`font-display pt-0.5 text-xs font-semibold tabular-nums ${
                      isLight ? "text-white/35" : "text-navy-300"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                    {item.question}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`relative mt-1.5 h-4 w-4 shrink-0 ${isLight ? "text-white/50" : "text-navy-400"}`}
                >
                  <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
                  <motion.span
                    className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current"
                    animate={{ scaleY: expanded ? 0 : 1 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={`faq-panel-${item.id}`}
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p
                    className={`max-w-3xl pb-7 pl-9 pr-8 text-[0.98rem] leading-relaxed ${
                      isLight ? "text-white/65" : "text-navy-500"
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
