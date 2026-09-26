import type { CSSProperties } from "react";

/**
 * A dotted connector whose dashes travel, with 0–3 "packets" (small circles)
 * riding along it (brief §6.3). Lives inside a `LiveSvg`, which pauses it
 * offscreen and fades it in when drawn. Packets use SMIL `animateMotion`, the
 * one path-following animation every browser supports on SVG; reduced motion
 * hides them via CSS and the dashes stand still.
 */
export default function FlowLine({
  d,
  packets = 1,
  duration = 2.4,
  begin = 0,
  packetClassName = "fill-signal",
  className = "stroke-current",
  index = 0,
  strokeWidth = 1.25,
}: {
  d: string;
  packets?: 0 | 1 | 2 | 3;
  /** Seconds for one packet to travel the whole line. */
  duration?: number;
  /** Seconds before the first packet leaves. */
  begin?: number;
  packetClassName?: string;
  className?: string;
  /** Fade-in order when the host draws. */
  index?: number;
  strokeWidth?: number;
}) {
  return (
    <g className="flow-line" style={{ "--i": index } as CSSProperties}>
      <path
        d={d}
        fill="none"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className={`flow-dash ${className}`}
      />
      {Array.from({ length: packets }, (_, n) => (
        <circle key={n} r={2} className={`packet ${packetClassName}`} opacity={0}>
          <animateMotion
            dur={`${duration}s`}
            begin={`${begin + (n * duration) / packets}s`}
            repeatCount="indefinite"
            path={d}
            rotate="auto"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.1;0.9;1"
            dur={`${duration}s`}
            begin={`${begin + (n * duration) / packets}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
    </g>
  );
}
