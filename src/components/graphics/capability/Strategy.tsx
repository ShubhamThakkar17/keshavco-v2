import type { CSSProperties } from "react";
import DrawPath from "@/components/motion/DrawPath";
import { capabilityArt } from "@/content/graphics";
import { grid, iso, line, plane } from "@/components/graphics/iso";

/**
 * Strategy: three translucent planes (now, plan, target) stacked over an
 * isometric grid; a dotted route climbs through them to a flag with the
 * Indigo square. The planes rise in sequence and the route draws on.
 */
export default function StrategyArt() {
  const levels = [14, 60, 106];
  const route = line(
    iso(-46, 38, levels[0]),
    iso(-14, 14, levels[0]),
    iso(-14, 14, levels[1]),
    iso(14, -8, levels[1]),
    iso(14, -8, levels[2]),
    iso(34, -30, levels[2]),
  );
  const pole = iso(34, -30, levels[2]);
  return (
    <g transform="translate(200 196)" strokeLinecap="round" strokeLinejoin="round">
      <path d={grid(-100, -100, 0, 200, 200, 25)} className="stroke-current" strokeWidth={1} strokeOpacity={0.25} fill="none" />
      {levels.map((z, i) => (
        <g key={z} className="art-rise" style={{ "--delay": `${i * 150}ms`, "--rise": "8px" } as CSSProperties}>
          <path d={plane(-64, -64, z, 128, 128)} className="art-soft stroke-current" fillOpacity={0.75} strokeWidth={1.25} />
          <text
            x={iso(64, -64, z)[0] + 10}
            y={iso(64, -64, z)[1] + 4}
            className="fill-current font-mono text-[10px] tracking-[0.04em]"
          >
            {capabilityArt.strategy.planes[i]}
          </text>
        </g>
      ))}
      <DrawPath d={route} index={0} delay={450} fill="none" className="stroke-current" strokeWidth={1.5} />
      {[
        iso(-14, 14, levels[0]),
        iso(14, -8, levels[1]),
      ].map((p, i) => (
        <g key={i} className="art-pop" style={{ "--delay": `${900 + i * 150}ms` } as CSSProperties}>
          <circle cx={p[0]} cy={p[1]} r={3} className="fill-current" />
        </g>
      ))}
      <g className="art-pop" style={{ "--delay": "1250ms", "--from-scale": 0.4 } as CSSProperties}>
        <path d={`M${pole[0]} ${pole[1]} V${pole[1] - 34}`} className="stroke-current" strokeWidth={1.25} />
        <rect x={pole[0]} y={pole[1] - 34} width={14} height={10} className="fill-signal" />
      </g>
    </g>
  );
}
