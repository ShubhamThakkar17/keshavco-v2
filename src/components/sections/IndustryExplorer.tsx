"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { industries } from "@/content/industries";
import Reveal from "@/components/motion/Reveal";

/**
 * Sticky index on the left, panels on the right. The active industry is driven
 * by whichever panel is crossing the middle of the viewport, and clicking an
 * index entry scrolls to it.
 */
export default function IndustryExplorer() {
  const [active, setActive] = useState(industries[0].slug);
  const panelRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target instanceof HTMLElement && visible.target.dataset.slug) {
          setActive(visible.target.dataset.slug);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    const nodes = Object.values(panelRefs.current).filter(Boolean) as HTMLElement[];
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-16">
      <nav aria-label="Industries" className="hidden lg:block">
        <div className="sticky top-32">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-navy-400">
            Seven industries
          </p>
          <ul className="mt-6 space-y-1">
            {industries.map((industry) => {
              const isActive = industry.slug === active;
              return (
                <li key={industry.slug}>
                  <a
                    href={`#${industry.slug}`}
                    className={`relative flex items-center gap-3 rounded-lg py-2 pl-4 text-sm transition-colors ${
                      isActive ? "text-navy-900" : "text-navy-400 hover:text-navy-700"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="industry-marker"
                        className="bg-gradient-brand absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full"
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                    <span className={isActive ? "font-semibold" : ""}>{industry.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="space-y-6">
        {industries.map((industry, index) => (
          <article
            key={industry.slug}
            id={industry.slug}
            data-slug={industry.slug}
            ref={(node) => {
              panelRefs.current[industry.slug] = node;
            }}
            className="scroll-mt-28"
          >
            <Reveal>
              <div className="rounded-3xl border border-navy-900/10 bg-white p-8 transition-colors sm:p-10">
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-xs font-semibold tabular-nums text-navy-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-display text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
                    {industry.name}
                  </h2>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-navy-400">
                      The growth problem
                    </p>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-navy-600">
                      {industry.problem}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-navy-400">
                      How we help
                    </p>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-navy-600">
                      {industry.help}
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-navy-900/10 pt-6">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-navy-400">
                    Typical work
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {industry.typicalWork.map((work) => (
                      <li
                        key={work}
                        className="rounded-full bg-navy-50 px-3 py-1.5 text-[0.78rem] text-navy-600"
                      >
                        {work}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </article>
        ))}
      </div>
    </div>
  );
}
