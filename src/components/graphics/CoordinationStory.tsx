"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { getImageProps } from "next/image";
import { useState, type CSSProperties } from "react";
import { brand } from "@/content/brand";
import { coordinationStory } from "@/content/graphics";

/**
 * The problem story (brief §7.1), scrubbed by scroll progress 0–1:
 *
 * - 0–0.35  State A: you in the middle, six vendors scattered around, tied to
 *           you and to each other by tangled dashed curves; warning glyphs;
 *           the nodes jitter slightly.
 * - 0.35–0.75  The vendors glide into a tidy column, the tangles fade.
 * - 0.55–0.85  Straight lines draw into the KeshavCo hub, one solid line runs
 *           on to you, and the green eye appears on you.
 * - 0.75–1  State B holds.
 *
 * Pass `progress` from a StickyStory, or `state` for a static frame (reduced
 * motion shows both frames stacked). Below 768px a vertical layout is used.
 */

type Layout = {
  viewBox: [number, number];
  font: number;
  charWidth: number;
  vendorsA: [number, number][];
  vendorsB: [number, number][];
  youA: [number, number];
  youB: [number, number];
  hub: [number, number, number];
  vertical: boolean;
};

const DESKTOP: Layout = {
  viewBox: [720, 480],
  font: 10,
  charWidth: 6.4,
  vendorsA: [
    [150, 80],
    [560, 64],
    [630, 250],
    [540, 420],
    [180, 410],
    [90, 240],
  ],
  vendorsB: [0, 1, 2, 3, 4, 5].map((i) => [104, 60 + i * 72]) as [number, number][],
  youA: [360, 240],
  youB: [640, 240],
  hub: [440, 240, 96],
  vertical: false,
};

const MOBILE: Layout = {
  viewBox: [360, 460],
  font: 9,
  charWidth: 5.6,
  vendorsA: [
    [70, 50],
    [285, 72],
    [300, 235],
    [278, 395],
    [78, 405],
    [52, 230],
  ],
  vendorsB: [0, 1, 2, 3, 4, 5].map((i) => [62 + (i % 3) * 118, 40 + Math.floor(i / 3) * 44]) as [number, number][],
  youA: [180, 230],
  youB: [180, 410],
  hub: [180, 250, 80],
  vertical: true,
};

const TANGLE_PAIRS: [number, number][] = [
  [0, 2],
  [1, 4],
  [3, 5],
  [0, 3],
  [2, 5],
];

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function useMorph(progress: MotionValue<number>) {
  const raw = useTransform(progress, [0.35, 0.75], [0, 1], { clamp: true });
  return useTransform(raw, easeInOut);
}

function Node({
  label,
  x,
  y,
  font,
  charWidth,
  jitter,
  index,
}: {
  label: string;
  x: MotionValue<number>;
  y: MotionValue<number>;
  font: number;
  charWidth: number;
  jitter: boolean;
  index: number;
}) {
  const w = label.length * charWidth + 18;
  const h = font * 2.8;
  return (
    <motion.g style={{ x, y }}>
      <g
        className={jitter ? "story-jitter loop-anim" : undefined}
        style={{ "--delay": `${index * -270}ms` } as CSSProperties}
      >
        <rect x={-w / 2} y={-h / 2} width={w} height={h} className="art-fill stroke-current" strokeWidth={1.25} />
        <text
          x={0}
          y={font * 0.36}
          textAnchor="middle"
          className="fill-current font-mono tracking-[0.04em]"
          style={{ fontSize: font }}
        >
          {label}
        </text>
      </g>
    </motion.g>
  );
}

function Diagram({ layout, progress, idPrefix }: { layout: Layout; progress: MotionValue<number>; idPrefix: string }) {
  const morph = useMorph(progress);
  const [settled, setSettled] = useState(progress.get() >= 0.5);
  useMotionValueEvent(progress, "change", (value) => setSettled(value >= 0.5));

  const tangleOpacity = useTransform(progress, [0.35, 0.55], [1, 0]);
  const straightDraw = useTransform(progress, [0.55, 0.78], [0, 1]);
  const hubShow = useTransform(progress, [0.5, 0.7], [0, 1]);
  const youLineDraw = useTransform(progress, [0.7, 0.85], [0, 1]);
  const eye = useTransform(progress, [0.78, 0.88], [0, 1]);

  // Node positions, as motion values (hooks are called a fixed six times).
  const vx = [0, 1, 2, 3, 4, 5].map((i) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(morph, [0, 1], [layout.vendorsA[i][0], layout.vendorsB[i][0]]),
  );
  const vy = [0, 1, 2, 3, 4, 5].map((i) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(morph, [0, 1], [layout.vendorsA[i][1], layout.vendorsB[i][1]]),
  );
  const youX = useTransform(morph, [0, 1], [layout.youA[0], layout.youB[0]]);
  const youY = useTransform(morph, [0, 1], [layout.youA[1], layout.youB[1]]);

  // Tangled curves follow the moving nodes while they fade.
  const toYou = [0, 1, 2, 3, 4, 5].map((i) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform([vx[i], vy[i], youX, youY], ([ax, ay, bx, by]: number[]) => {
      const c1x = ax + Math.sin(i * 2.1) * 150;
      const c1y = ay + Math.cos(i * 1.7) * 130;
      const c2x = bx + Math.cos(i * 2.9) * 160;
      const c2y = by + Math.sin(i * 1.3) * 140;
      return `M${ax} ${ay} C${c1x} ${c1y} ${c2x} ${c2y} ${bx} ${by}`;
    }),
  );
  const between = TANGLE_PAIRS.map(([a, b], k) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform([vx[a], vy[a], vx[b], vy[b]], ([ax, ay, bx, by]: number[]) => {
      const mx = (ax + bx) / 2 + Math.sin(k * 3.3) * 120;
      const my = (ay + by) / 2 + Math.cos(k * 2.2) * 110;
      return `M${ax} ${ay} Q${mx} ${my} ${bx} ${by}`;
    }),
  );

  const [hx, hy, hs] = layout.hub;
  const vendorW = (label: string) => label.length * layout.charWidth + 18;
  const straightPaths = coordinationStory.vendors.map((label, i) => {
    const [bx, by] = layout.vendorsB[i];
    if (layout.vertical) {
      const sy = by + layout.font * 1.4;
      const ex = hx - hs / 2 + 12 + (i * (hs - 24)) / 5;
      const ey = hy - hs / 2;
      return `M${bx} ${sy} C${bx} ${sy + 50} ${ex} ${ey - 50} ${ex} ${ey}`;
    }
    const sx = bx + vendorW(label) / 2;
    const ex = hx - hs / 2;
    const ey = hy - hs / 2 + 14 + (i * (hs - 28)) / 5;
    return `M${sx} ${by} C${sx + 70} ${by} ${ex - 70} ${ey} ${ex} ${ey}`;
  });
  const youLine = layout.vertical
    ? `M${hx} ${hy + hs / 2} V${layout.youB[1] - layout.font * 1.4}`
    : `M${hx + hs / 2} ${hy} H${layout.youB[0] - 24}`;
  const mark = getImageProps({ src: brand.mark, alt: "", width: 48, height: 52, quality: 80 }).props.src;
  const img = hs * 0.46;
  const youW = coordinationStory.you.length * layout.charWidth + 18;

  return (
    <svg
      viewBox={`0 0 ${layout.viewBox[0]} ${layout.viewBox[1]}`}
      aria-hidden="true"
      className={`h-full w-full ${layout.vertical ? "md:hidden" : "hidden md:block"}`}
    >
      {/* State A: the tangle */}
      <motion.g style={{ opacity: tangleOpacity }} className="stroke-current" fill="none">
        {toYou.map((d, i) => (
          <motion.path key={`y${i}`} d={d} strokeWidth={1.1} strokeDasharray="3 5" strokeOpacity={0.35} />
        ))}
        {between.map((d, k) => (
          <motion.path key={`b${k}`} d={d} strokeWidth={1.1} strokeDasharray="3 5" strokeOpacity={0.3} />
        ))}
        <motion.g style={{ x: youX, y: youY }}>
          <g className="stroke-current" strokeWidth={1.25}>
            <circle cx={34} cy={-34} r={9} className="art-fill" />
            <path d="M34 -39 V-33 M34 -30 V-29" strokeLinecap="round" />
            <circle cx={-38} cy={32} r={9} className="art-fill" />
            <path d="M-38 27 V32 H-34" strokeLinecap="round" />
          </g>
        </motion.g>
      </motion.g>

      {/* State B: straight lines into the hub, one line on to you */}
      <g className="stroke-current" fill="none">
        {straightPaths.map((d, i) => (
          <motion.path key={`s${i}`} d={d} strokeWidth={1.25} strokeOpacity={0.55} style={{ pathLength: straightDraw }} />
        ))}
        <motion.path d={youLine} strokeWidth={2} className="stroke-signal" style={{ pathLength: youLineDraw }} />
      </g>

      <motion.g style={{ opacity: hubShow, scale: hubShow, x: hx, y: hy }}>
        <defs>
          <pattern id={`${idPrefix}-hatch`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" className="stroke-signal" strokeWidth="1.25" />
          </pattern>
        </defs>
        <rect x={-hs / 2} y={-hs / 2} width={hs} height={hs} fill={`url(#${idPrefix}-hatch)`} />
        <rect x={-hs / 2 + 9} y={-hs / 2 + 9} width={hs - 18} height={hs - 18} className="art-fill stroke-signal" strokeWidth={1} />
        <image href={mark} x={-img / 2} y={-img * 0.54} width={img} height={img * 1.08} />
        <text
          x={0}
          y={hs / 2 + layout.font * 1.8}
          textAnchor="middle"
          className="fill-current font-mono tracking-[0.04em]"
          style={{ fontSize: layout.font }}
        >
          {coordinationStory.hub}
        </text>
      </motion.g>

      {coordinationStory.vendors.map((label, i) => (
        <Node
          key={label}
          label={label}
          x={vx[i]}
          y={vy[i]}
          font={layout.font}
          charWidth={layout.charWidth}
          jitter={!settled}
          index={i}
        />
      ))}

      {/* You */}
      <motion.g style={{ x: youX, y: youY }}>
        <rect
          x={-youW / 2}
          y={-layout.font * 1.4}
          width={youW}
          height={layout.font * 2.8}
          className="stroke-current"
          fill="currentColor"
        />
        <text
          x={0}
          y={layout.font * 0.36}
          textAnchor="middle"
          className="font-mono tracking-[0.04em]"
          style={{ fontSize: layout.font, fill: "var(--art-fill)" }}
        >
          {coordinationStory.you}
        </text>
        <motion.circle cx={youW / 2} cy={-layout.font * 1.4} r={5} className="fill-growth" style={{ scale: eye }} />
      </motion.g>
    </svg>
  );
}

export default function CoordinationStory({
  progress,
  state = "before",
  className = "",
  idPrefix = "story",
}: {
  progress?: MotionValue<number>;
  state?: "before" | "after";
  className?: string;
  idPrefix?: string;
}) {
  const fixed = useMotionValue(state === "after" ? 1 : 0);
  const value = progress ?? fixed;
  return (
    <div className={`art relative ${className}`}>
      <Diagram layout={DESKTOP} progress={value} idPrefix={`${idPrefix}-d`} />
      <Diagram layout={MOBILE} progress={value} idPrefix={`${idPrefix}-m`} />
    </div>
  );
}
