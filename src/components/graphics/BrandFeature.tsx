"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";
import { brand } from "@/content/brand";

/**
 * The Keshav Consultancy mark at display size — the hero graphic, and the
 * fallback visual on inner pages that have no photograph of their own.
 *
 * The artwork itself comes from `public/brand/`, so it is always the real
 * logo; only the motion around it lives here. It rises in on load, breathes on
 * a long loop, and drifts against the scroll, over a soft brand-coloured halo.
 */
export default function BrandFeature({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.5 });
  const y = useTransform(smooth, [0, 1], ["0%", reduceMotion ? "0%" : "-12%"]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Halo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-45 blur-[90px]"
        style={{
          background: "radial-gradient(closest-side, #7C3AED 0%, #4F46E5 55%, transparent 100%)",
        }}
      />

      <motion.div
        className="relative h-full w-full"
        style={{ y }}
        initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="h-full w-full"
          animate={reduceMotion ? { rotate: 0 } : { rotate: [-1.4, 1.4, -1.4], y: [0, -10, 0] }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 12, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <Image
            src={brand.mark}
            alt=""
            aria-hidden="true"
            width={brand.markSize.width}
            height={brand.markSize.height}
            priority={priority}
            className="h-full w-full object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
