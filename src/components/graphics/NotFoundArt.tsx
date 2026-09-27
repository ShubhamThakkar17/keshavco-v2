import type { CSSProperties } from "react";
import LiveSvg from "@/components/motion/LiveSvg";
import { notFoundArt } from "@/content/graphics";

/**
 * 404 illustration: a file tile has slipped out of its slot in the grid and
 * floats off, trailing a dotted line that ends in "404".
 */
export default function NotFoundArt({ className = "h-auto w-full max-w-md" }: { className?: string }) {
  const cells = [0, 1, 2, 3, 4, 5];
  return (
    <span className="art block">
      <LiveSvg viewBox="0 0 360 240" className={className} fill="none">
        {cells.map((i) => {
          const x = 30 + (i % 3) * 70;
          const y = 40 + Math.floor(i / 3) * 60;
          const empty = i === 4;
          return (
            <g key={i} className="art-rise" style={{ "--delay": `${i * 60}ms` } as CSSProperties}>
              <path
                d={`M${x} ${y} H${x + 52} L${x + 60} ${y + 8} V${y + 40} H${x} Z`}
                className={empty ? "stroke-current" : "art-fill stroke-current"}
                strokeWidth={1.25}
                strokeDasharray={empty ? "3 4" : undefined}
                strokeOpacity={empty ? 0.6 : 1}
              />
            </g>
          );
        })}
        <path d="M130 120 C 180 150, 220 150, 262 132" className="flow-dash stroke-current" strokeWidth={1.25} strokeOpacity={0.6} />
        <g className="art-float loop-anim">
          <g transform="translate(262 96) rotate(16)">
            <path d="M0 0 H52 L60 8 V40 H0 Z" className="art-fill stroke-current" strokeWidth={1.25} />
            <path d="M52 0 V8 H60" className="stroke-current" strokeWidth={1.25} />
            <rect x={8} y={10} width={6} height={6} className="fill-signal" />
          </g>
        </g>
        <text x={250} y={200} className="fill-current font-mono text-[28px] tracking-[0.04em]">
          {notFoundArt.code}
        </text>
      </LiveSvg>
    </span>
  );
}
