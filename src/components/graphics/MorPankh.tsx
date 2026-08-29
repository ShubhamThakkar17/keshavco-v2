"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import useReducedMotionSafe from "@/lib/useReducedMotionSafe";

/**
 * The Mor Pankh — the peacock feather Krishna wears, and the reason the
 * business is called Keshav. It is the site's signature graphic: an original
 * drawing, not a stock asset, so nothing else on the internet looks like it.
 *
 * Construction, from the outside in:
 *   - 26 barbs fanning from the quill, drawn on with a stroke dash sweep
 *   - three nested plume arcs in the brand gradient
 *   - the eye: concentric rings closing on a green heart
 *   - a quill that runs the full height
 *
 * The whole feather sways on a long, slow loop and drifts against the scroll.
 */
export default function MorPankh({
  className = "",
  /** Barb-draw and plume-draw run once on mount. */
  animate = true,
  /** Which background it sits on — decides how bright the palette runs. */
  tone = "onDark",
  /** Unique per instance: SVG gradient ids are global. */
  idSuffix = "a",
}: {
  className?: string;
  animate?: boolean;
  tone?: "onDark" | "onLight";
  idSuffix?: string;
}) {
  const onDark = tone === "onDark";
  const id = (name: string) => `mp-${name}-${idSuffix}`;
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.5 });
  const y = useTransform(smooth, [0, 1], ["0%", reduceMotion ? "0%" : "-14%"]);
  const rotate = useTransform(smooth, [0, 1], [0, reduceMotion ? 0 : 8]);

  const shouldDraw = animate && !reduceMotion;

  // Barbs radiate from the quill: swept up-and-out beside the eye, drooping
  // as they run down the shaft, longest through the middle of the fan.
  const BARB_COUNT = 20;
  const barbs = Array.from({ length: BARB_COUNT }, (_, i) => {
    const t = i / (BARB_COUNT - 1);
    const yStart = 316 + t * 344;
    const angleDeg = -46 + t * 92;
    const angle = (angleDeg * Math.PI) / 180;
    const length = 238 - Math.abs(t - 0.34) * 168;
    const dx = Math.cos(angle) * length;
    const dy = Math.sin(angle) * length;
    // Bow each barb away from the shaft so the fan reads as soft, not spiky.
    const bow = 26 * (1 - Math.abs(t - 0.4) * 1.1);
    return { yStart, dx, dy, bow, t, index: i };
  });

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <motion.svg
        viewBox="0 0 520 760"
        fill="none"
        className="h-full w-full overflow-visible"
        style={reduceMotion ? undefined : { y, rotate }}
      >
        <defs>
          <linearGradient id={id("plume")} x1="120" y1="620" x2="420" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={onDark ? "#4F46E5" : "#1E3A8A"} />
            <stop offset="38%" stopColor={onDark ? "#818CF8" : "#4F46E5"} />
            <stop offset="72%" stopColor={onDark ? "#A78BFA" : "#7C3AED"} />
            <stop offset="100%" stopColor={onDark ? "#5EEAD4" : "#22C55E"} />
          </linearGradient>
          <linearGradient id={id("barb")} x1="60" y1="600" x2="460" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={onDark ? "#4F46E5" : "#1E3A8A"} stopOpacity={onDark ? 0.9 : 0.7} />
            <stop offset="50%" stopColor={onDark ? "#818CF8" : "#4F46E5"} stopOpacity="0.95" />
            <stop offset="100%" stopColor={onDark ? "#34D399" : "#22C55E"} stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id={id("eye")} x1="215" y1="300" x2="305" y2="205" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={onDark ? "#6366F1" : "#4F46E5"} />
            <stop offset="55%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#A7F3D0" />
          </linearGradient>
          <linearGradient id={id("fill")} x1="150" y1="480" x2="380" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity={onDark ? 0.22 : 0.14} />
            <stop offset="60%" stopColor="#7C3AED" stopOpacity={onDark ? 0.16 : 0.09} />
            <stop offset="100%" stopColor="#22C55E" stopOpacity={onDark ? 0.1 : 0.05} />
          </linearGradient>
          <radialGradient id={id("glow")} cx="0.5" cy="0.34" r="0.5">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity={onDark ? 0.55 : 0.28} />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Halo behind the eye */}
        <motion.ellipse
          cx="260"
          cy="255"
          rx="215"
          ry="235"
          fill={`url(#${id("glow")})`}
          initial={shouldDraw ? { opacity: 0, scale: 0.85 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "260px 255px" }}
        />

        {/* The feather sways as one body. */}
        <motion.g
          animate={
            reduceMotion
              ? { rotate: 0 }
              : { rotate: [-1.6, 1.6, -1.6], y: [0, -8, 0] }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 11, repeat: Infinity, ease: "easeInOut" }
          }
          style={{ transformOrigin: "260px 700px" }}
        >
          {/* Barbs */}
          <g stroke={`url(#${id("barb")})`} strokeLinecap="round" fill="none">
            {barbs.map(({ yStart, dx, dy, bow, t, index }) => {
              const width = 2.5 - t * 0.9;
              const delay = 0.42 + index * 0.035;
              const paths = [-1, 1].map((side) => {
                const ex = 260 + side * dx;
                const ey = yStart + dy;
                const cx = 260 + side * dx * 0.5;
                const cy = yStart + dy * 0.5 + bow;
                return `M260 ${yStart} Q ${cx} ${cy}, ${ex} ${ey}`;
              });
              return (
                <g key={index}>
                  {paths.map((d, side) => (
                    <motion.path
                      key={side}
                      d={d}
                      strokeWidth={width}
                      initial={shouldDraw ? { pathLength: 0, opacity: 0 } : false}
                      animate={{ pathLength: 1, opacity: 0.9 }}
                      transition={{
                        duration: 1.05,
                        delay: delay + side * 0.03,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  ))}
                </g>
              );
            })}
          </g>

          {/* Plume arcs, outermost first */}
          {[
            { d: "M260 40 C 415 130, 470 265, 400 400 C 345 505, 175 505, 120 400 C 50 265, 105 130, 260 40 Z", w: 7, fill: true },
            { d: "M260 105 C 370 175, 410 275, 358 365 C 316 437, 204 437, 162 365 C 110 275, 150 175, 260 105 Z", w: 6, fill: true },
            { d: "M260 165 C 330 215, 356 285, 322 342 C 294 388, 226 388, 198 342 C 164 285, 190 215, 260 165 Z", w: 5, fill: false },
          ].map((plume, index) => (
            <motion.path
              key={index}
              d={plume.d}
              stroke={`url(#${id("plume")})`}
              strokeWidth={plume.w}
              strokeLinejoin="round"
              fill={plume.fill ? `url(#${id("fill")})` : "none"}
              initial={shouldDraw ? { pathLength: 0, opacity: 0 } : false}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.8,
                delay: 0.1 + index * 0.22,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          ))}

          {/* The eye — concentric rings closing on a green heart */}
          <motion.g
            initial={shouldDraw ? { opacity: 0, scale: 0.55 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "260px 278px" }}
          >
            <path
              d="M260 196 C 320 244, 336 298, 306 334 C 282 363, 238 363, 214 334 C 184 298, 200 244, 260 196 Z"
              fill="#0F172A"
              fillOpacity="0.55"
              stroke={`url(#${id("plume")})`}
              strokeWidth="3"
            />
            <path
              d="M260 218 C 306 256, 318 298, 296 326 C 277 349, 243 349, 224 326 C 202 298, 214 256, 260 218 Z"
              fill="none"
              stroke={`url(#${id("eye")})`}
              strokeWidth="2.5"
              strokeOpacity="0.8"
            />
            <path
              d="M260 240 C 292 268, 300 297, 285 316 C 272 332, 248 332, 235 316 C 220 297, 228 268, 260 240 Z"
              fill={`url(#${id("eye")})`}
            />
          </motion.g>

          {/* Quill */}
          <motion.path
            d="M260 300 L260 745"
            stroke={`url(#${id("plume")})`}
            strokeWidth="7"
            strokeLinecap="round"
            initial={shouldDraw ? { pathLength: 0 } : false}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.3, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.g>
      </motion.svg>
    </div>
  );
}
