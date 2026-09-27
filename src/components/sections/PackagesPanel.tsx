"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Button from "@/components/ui/Button";
import WaveLines from "@/components/graphics/WaveLines";
import { homeV3 } from "@/content/home";
import { cta } from "@/content/site";
import { ease } from "@/lib/motion";
import type { GrowthPackage } from "@/content/packages";

/**
 * S8 Packages (brief §9.2): one joined panel, four columns. The featured
 * column is a night column with a drifting wave texture; it follows hover and
 * keyboard focus (the dark background slides between columns on a shared
 * layout id) and returns to Grow on leave. No "most popular" badge: there is
 * no data behind one. On phones the columns stack and each list folds away
 * behind a toggle.
 */
export default function PackagesPanel({ packages }: { packages: GrowthPackage[] }) {
  const copy = homeV3.packages;
  const [featured, setFeatured] = useState<string>(copy.featured);
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div
      className="grid overflow-hidden rounded-[var(--radius-md)] border border-line bg-card lg:grid-cols-4"
      onPointerLeave={() => setFeatured(copy.featured)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFeatured(copy.featured);
      }}
    >
      {packages.map((pkg, index) => {
        const on = pkg.slug === featured;
        const listOpen = open === pkg.slug;
        const listId = `package-includes-${pkg.slug}`;
        return (
          <div
            key={pkg.slug}
            data-tone={on ? "night" : "paper"}
            className="relative flex flex-col border-t border-line p-6 first:border-t-0 lg:border-l lg:border-t-0 lg:p-7 lg:first:border-l-0"
            onPointerEnter={() => setFeatured(pkg.slug)}
            onFocus={() => setFeatured(pkg.slug)}
          >
            {on && (
              <motion.span
                layoutId="package-featured"
                aria-hidden="true"
                className="absolute inset-0 overflow-hidden bg-night text-white"
                transition={{ duration: 0.45, ease: ease.inOutQuart }}
              >
                <WaveLines />
              </motion.span>
            )}
            <div className="relative z-10 flex h-full flex-col">
              <p className="type-mono text-ink-2 transition-colors night:text-white/60">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="type-display-m mt-4 text-ink transition-colors night:text-white">{pkg.name}</h3>
              <p className="type-body-s mt-2 text-ink-2 transition-colors night:text-white/70">{pkg.line}</p>
              <span aria-hidden="true" className="my-6 block h-px bg-line night:bg-line-night" />
              <button
                type="button"
                className="type-mono-s flex items-center gap-2 text-ink-2 night:text-white/70 lg:hidden"
                aria-expanded={listOpen}
                aria-controls={listId}
                onClick={() => setOpen(listOpen ? null : pkg.slug)}
              >
                <span aria-hidden="true" className={`transition-transform ${listOpen ? "rotate-45" : ""}`}>
                  +
                </span>
                {copy.more}
              </button>
              {/* Desktop shows the list in the featured column only; the others
                  reveal theirs when hovered or focused. */}
              <ul
                id={listId}
                className={`mt-4 space-y-2.5 transition-opacity duration-300 lg:mt-0 lg:block ${listOpen ? "block" : "hidden"} ${
                  on ? "lg:opacity-100" : "lg:opacity-0"
                }`}
              >
                {pkg.includes.slice(0, copy.includesShown).map((item) => (
                  <li key={item} className="type-body-s flex gap-2.5 text-ink transition-colors night:text-white/85">
                    <span aria-hidden="true" className="font-mono text-signal night:text-white/60">
                      &gt;
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 lg:mt-auto lg:pt-10">
                <Button
                  href={`${cta.tertiary.href}&package=${pkg.slug}`}
                  variant={on ? "solid" : "ghost"}
                >
                  {cta.tertiary.short}
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
