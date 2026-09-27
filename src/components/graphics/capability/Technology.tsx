import type { CSSProperties } from "react";
import FlowLine from "@/components/motion/FlowLine";
import { box, rightPlane } from "@/components/graphics/iso";

/**
 * Technology: an isometric browser window and a phone, both wired by dotted
 * lines to a three-layer server stack with one Indigo node. Packets travel
 * browser → server → phone while the panel is open.
 */
export default function TechnologyArt() {
  const layers = [0, 18, 36];
  return (
    <g transform="translate(200 170)" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx={0} cy={96} rx={170} ry={18} className="fill-current" fillOpacity={0.05} />

      <FlowLine d="M-48 30 C -10 30, 0 -40, 38 -44" packets={1} duration={1.8} index={0} className="stroke-current" packetClassName="fill-signal" />
      <FlowLine d="M96 -40 C 130 -30, 130 10, 116 36" packets={1} duration={1.8} begin={0.9} index={1} className="stroke-current" packetClassName="fill-growth" />

      {/* Server stack */}
      <g transform="translate(66 -20)">
        {layers.map((z, i) => {
          const f = box(-24, -24, z, 48, 48, 14);
          return (
            <g key={z} className="art-rise" style={{ "--delay": `${i * 120}ms`, "--rise": "8px" } as CSSProperties}>
              <path d={f.left} className="art-fill stroke-current" strokeWidth={1.25} />
              <path d={f.right} className="art-soft stroke-current" strokeWidth={1.25} />
              <path d={f.top} className="art-fill stroke-current" strokeWidth={1.25} />
            </g>
          );
        })}
        <g className="art-pop" style={{ "--delay": "500ms" } as CSSProperties}>
          <rect x={-4} y={-58} width={8} height={8} className="fill-signal" />
        </g>
      </g>

      {/* Browser */}
      <g className="art-rise" style={{ "--delay": "150ms" } as CSSProperties}>
        <g transform={rightPlane([-176, -44])}>
          <rect x={0} y={0} width={148} height={96} rx={4} className="art-fill stroke-current" strokeWidth={1.25} />
          <path d="M0 16 H148" className="stroke-current" strokeWidth={1.25} />
          {[8, 16, 24].map((x) => (
            <circle key={x} cx={x} cy={8} r={2} className="fill-current" fillOpacity={0.5} />
          ))}
          <path d="M14 34 H90 M14 46 H70" className="stroke-current" strokeWidth={1.25} strokeOpacity={0.55} />
          <rect x={14} y={60} width={52} height={22} rx={2} className="art-soft stroke-current" strokeWidth={1.25} />
          <rect x={76} y={60} width={56} height={22} rx={2} className="art-soft stroke-current" strokeWidth={1.25} />
        </g>
      </g>

      {/* Phone */}
      <g className="art-rise" style={{ "--delay": "300ms" } as CSSProperties}>
        <g transform={rightPlane([104, 22])}>
          <rect x={0} y={0} width={40} height={74} rx={6} className="art-fill stroke-current" strokeWidth={1.25} />
          <path d="M14 7 H26" className="stroke-current" strokeWidth={1.25} />
          <path d="M8 22 H32 M8 30 H26" className="stroke-current" strokeWidth={1.25} strokeOpacity={0.55} />
          <rect x={8} y={40} width={24} height={16} rx={2} className="art-soft stroke-current" strokeWidth={1.25} />
        </g>
      </g>
    </g>
  );
}
