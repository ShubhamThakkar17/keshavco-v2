"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Brand-gradient reading indicator pinned under the header. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 34,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="bg-gradient-brand absolute inset-x-0 bottom-0 h-px origin-left"
    />
  );
}
