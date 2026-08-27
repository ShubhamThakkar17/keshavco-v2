"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { pillars } from "@/content/services";
import PillarIcon from "@/components/ui/PillarIcon";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

/**
 * Glass panel beside the hero headline. The four capabilities take turns being
 * lit, which is the whole argument of the page in one object: separate
 * disciplines, one plan.
 */
export default function HeroPanel() {
  const reduceMotion = useReducedMotionSafe();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % pillars.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <motion.aside
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-sm rounded-3xl border border-white/12 bg-white/[0.04] p-7 backdrop-blur-md"
    >
      <div className="flex items-baseline justify-between">
        <p className="font-display text-sm font-semibold tracking-tight text-white">
          One growth plan
        </p>
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-white/35">
          Four capabilities
        </span>
      </div>

      <ul className="mt-6 space-y-1">
        {pillars.map((pillar, index) => {
          const isActive = index === active;
          return (
            <li key={pillar.slug}>
              <Link
                href={`/services/${pillar.slug}`}
                onMouseEnter={() => setActive(index)}
                className="relative flex items-center gap-3 rounded-xl px-3 py-3 transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="hero-panel-active"
                    className="absolute inset-0 rounded-xl bg-white/[0.07]"
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-500 ${
                    isActive ? "text-indigo-300" : "text-white/35"
                  }`}
                >
                  <PillarIcon slug={pillar.slug} className="h-5 w-5" />
                </span>
                <span
                  className={`relative z-10 flex-1 text-sm transition-colors duration-500 ${
                    isActive ? "text-white" : "text-white/50"
                  }`}
                >
                  {pillar.name}
                </span>
                <span className="relative z-10 text-[0.68rem] tabular-nums text-white/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="text-[0.78rem] leading-relaxed text-white/45">
          Planned together, sequenced by what your business needs first — and answered for by
          one team.
        </p>
      </div>
    </motion.aside>
  );
}
