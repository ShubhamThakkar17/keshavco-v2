"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";
import type { SiteImage } from "@/content/images";

/**
 * A photograph that arrives properly: the frame wipes open from the bottom
 * while the image itself drifts against the scroll behind it, so the picture
 * never feels pasted on.
 */
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
  /** Content laid over the image — captions, labels, a play button. */
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
    <motion.div
      ref={ref}
      className={`relative overflow-hidden bg-navy-100 ${rounded} ${className}`}
      initial={reduceMotion ? false : { clipPath: "inset(100% 0% 0% 0% round 1.5rem)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
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

      {tint && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navy-950/75 via-navy-950/15 to-transparent"
        />
      )}

      {overlay && <div className="relative z-10 flex h-full flex-col justify-end">{overlay}</div>}
    </motion.div>
  );
}
