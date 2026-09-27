"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { testimonials } from "@/content/home";
import SectionHead from "@/components/ui/SectionHead";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

/**
 * Horizontal scroll rail — the cards travel sideways while the section is
 * pinned. Rendered only when `showTestimonials` is on; see src/content/home.ts.
 */
export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], reduceMotion ? ["2%", "2%"] : ["2%", "-58%"]);

  return (
    <section ref={ref} className="relative h-[260vh] bg-navy-50">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-page">
          {/* Hidden while showTestimonials is false; rebuild in v3 style when
              real, permissioned quotes exist (brief §15, item 10). */}
          <SectionHead index={7} tag={testimonials.eyebrow.toUpperCase()} title={testimonials.heading} line={testimonials.body} />
        </div>

        <motion.div
          className="mt-14 flex gap-6 pl-[max(1.25rem,calc((100vw-84rem)/2+3rem))]"
          style={{ x }}
        >
          {testimonials.items.map((item, index) => (
            <figure
              key={index}
              className="w-[min(85vw,30rem)] shrink-0 rounded-3xl border border-navy-900/10 bg-white p-9"
            >
              <span aria-hidden="true" className="text-gradient-brand font-display text-5xl leading-none">
                &ldquo;
              </span>
              <blockquote className="font-display mt-4 text-lg leading-snug text-navy-900">
                {item.quote}
              </blockquote>
              <figcaption className="mt-7 border-t border-navy-900/10 pt-5 text-sm">
                <span className="font-semibold text-navy-900">{item.name}</span>
                <span className="mt-1 block text-navy-500">{item.role}</span>
                <span className="mt-1 block text-xs text-navy-400">{item.industry}</span>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
