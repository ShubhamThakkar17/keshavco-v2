"use client";

import { useState } from "react";
import Accordion, { type AccordionItem } from "@/components/ui/Accordion";
import { faqV3 } from "@/content/faq";

/**
 * /faq: topic chips (toggle buttons) over the light accordion rows. "All"
 * shows every question; the page's FAQPage JSON-LD always carries all of
 * them, whatever is filtered on screen.
 */
export default function FaqFilter({ items }: { items: AccordionItem[] }) {
  const [topic, setTopic] = useState<string | null>(null);
  const active = faqV3.topics.find((entry) => entry.label === topic);
  const shown = active ? items.filter((item) => (active.ids as readonly string[]).includes(item.id)) : items;
  const chips = [{ label: faqV3.all, value: null as string | null }, ...faqV3.topics.map((entry) => ({ label: entry.label, value: entry.label }))];

  return (
    <div>
      <div role="group" aria-label={faqV3.filterLabel} className="flex flex-wrap gap-1.5">
        {chips.map((chip) => {
          const pressed = topic === chip.value;
          return (
            <button
              key={chip.label}
              type="button"
              aria-pressed={pressed}
              onClick={() => setTopic(chip.value)}
              className={`type-mono-s inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-sm)] px-3.5 transition-colors lg:min-h-9 ${
                pressed ? "bg-ink text-white" : "bg-paper-2 text-ink-2 hover:text-ink"
              }`}
            >
              {chip.label}
              <span className={pressed ? "text-white/60" : "text-ink-2"}>
                {chip.value ? faqV3.topics.find((entry) => entry.label === chip.value)?.ids.length : items.length}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-8" aria-live="polite">
        <Accordion key={topic ?? "all"} items={shown} variant="rows" />
      </div>
    </div>
  );
}
