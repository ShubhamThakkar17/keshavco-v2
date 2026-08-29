"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";
import type { SiteImage } from "@/content/images";

/**
 * A photograph that arrives properly: the frame wipes open from the bottom
 * while the image itself drifts against the scroll behind it.
 *
 * The wipe is two counter-moving transforms, not a `clip-path` animation.
 * Browsers normalise `inset(100% 0% 0% 0% round 1.5rem)` to a three-value
 * form, which Framer then cannot interpolate against the four-value target —
 * the frame silently stays shut and the picture never appears. Transforms
 * always animate, and they run on the compositor.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

const mask: Variants = {
  hidden: { y: "101%" },
  show: { y: "0%", transition: { duration: 1.05, ease: EASE } },
};

// Equal and opposite, so the picture holds still while the frame opens.
const counter: Variants = {
  hidden: { y: "-101%" },
  show: { y: "0%", transition: { duration: 1.05, ease: EASE } },
};

export default function MediaFrame({
  image,
  className = "",
  rounded = "rounded-3xl",
  /** Vertical drift, in percent of the frame height. */
  drift = 8,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  overlay,
  tint = true,
}: {
  image: SiteImage;
  className?: string;
  rounded?: string;
  drift?: number;
  priority?: boolean;
  sizes?: string;
  /** Content laid over the image — captions, labels. */
  overlay?: ReactNode;
  /** Navy wash so white text stays legible over any photograph. */
  tint?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.4 });
  const y = useTransform(
    smooth,
    [0, 1],
    reduceMotion ? ["0%", "0%"] : [`${drift}%`, `${-drift}%`],
  );

  return (
    <div ref={ref} className={`relative overflow-hidden bg-navy-100 ${rounded} ${className}`}>
      <motion.div
        className="absolute inset-0"
        initial={reduceMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <motion.div className="h-full w-full" variants={reduceMotion ? undefined : mask}>
          <motion.div
            className="relative h-full w-full overflow-hidden"
            variants={reduceMotion ? undefined : counter}
          >
            {/* Oversized so the drift never exposes an edge. */}
            <motion.div className="absolute inset-x-0 -inset-y-[12%]" style={{ y }}>
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={sizes}
                priority={priority}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {tint && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/15 to-transparent"
        />
      )}

      {overlay && <div className="relative z-10 flex h-full flex-col justify-end">{overlay}</div>}
    </div>
  );
}
