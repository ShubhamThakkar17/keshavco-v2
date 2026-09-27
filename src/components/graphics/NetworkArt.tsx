import type { CSSProperties } from "react";
import LiveSvg from "@/components/motion/LiveSvg";
import FlowLine from "@/components/motion/FlowLine";
import { networkArt } from "@/content/graphics";

/**
 * /careers hero art: a hatched core-team square with the specialist network
 * around it, wired in by dotted lines that carry packets. Decorative.
 */
export default function NetworkArt() {
  const nodes = networkArt.nodes.map((label, i) => {
    const a = (i / networkArt.nodes.length) * Math.PI * 2 - Math.PI / 2;
    return { label, x: 200 + Math.cos(a) * 150, y: 160 + Math.sin(a) * 112 };
  });
  return (
    <span className="art block">
      <LiveSvg viewBox="0 0 400 320" className="h-auto w-full" fill="none">
        <defs>
          <pattern id="careers-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" className="stroke-signal" strokeWidth="1.25" />
          </pattern>
        </defs>
        {nodes.map((node, i) => (
          <FlowLine
            key={node.label}
            d={`M${node.x.toFixed(1)} ${node.y.toFixed(1)} L200 160`}
            index={i}
            packets={1}
            duration={2.6}
            className="stroke-current"
            packetClassName="fill-signal"
          />
        ))}
        <rect x={160} y={120} width={80} height={80} fill="url(#careers-hatch)" />
        <rect x={168} y={128} width={64} height={64} className="art-fill stroke-signal" strokeWidth={1} />
        <text x={200} y={164} textAnchor="middle" className="fill-current font-mono text-[9px] tracking-[0.06em]">
          {networkArt.core}
        </text>
        {nodes.map((node, i) => {
          const w = node.label.length * 6.6 + 18;
          return (
            <g key={node.label} className="art-rise" style={{ "--delay": `${200 + i * 70}ms`, "--rise": "6px" } as CSSProperties}>
              <rect x={node.x - w / 2} y={node.y - 12} width={w} height={24} rx={4} className="art-fill stroke-current" strokeWidth={1.25} />
              <text x={node.x} y={node.y + 3.5} textAnchor="middle" className="fill-current font-mono text-[10px] tracking-[0.04em]">
                {node.label}
              </text>
            </g>
          );
        })}
      </LiveSvg>
    </span>
  );
}
