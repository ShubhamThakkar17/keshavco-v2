import type { CSSProperties } from "react";
import { capabilityArt } from "@/content/graphics";
import { rightPlane } from "@/components/graphics/iso";

/**
 * Branding: three isometric cards fan out of one stack: a logo card carrying
 * the chevron-stack motif, a colour card (four swatches, one solid Indigo)
 * and a type card. The cards are drawn flat and mapped onto an upright
 * isometric plane.
 */
const W = 96;
const H = 128;

function Card({ children }: { children: React.ReactNode }) {
  return (
    <g transform={rightPlane([-42, -36])}>
      <rect x={0} y={0} width={W} height={H} rx={6} className="art-fill stroke-current" strokeWidth={1.25} />
      {children}
    </g>
  );
}

export default function BrandingArt() {
  const fans = [
    { fan: "translate(-96px, 18px) rotate(-7deg)", delay: 0 },
    { fan: "translate(0px, -10px)", delay: 80 },
    { fan: "translate(96px, 22px) rotate(7deg)", delay: 160 },
  ];
  return (
    <g transform="translate(200 150)" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx={20} cy={120} rx={150} ry={20} className="fill-current" fillOpacity={0.05} />
      {/* Type card (back) */}
      <g className="art-fan" style={{ "--fan": fans[2].fan, "--delay": `${fans[2].delay}ms` } as CSSProperties}>
        <Card>
          <text x={16} y={70} className="fill-current font-display text-[44px] font-semibold tracking-[-0.03em]">
            {capabilityArt.branding.type}
          </text>
          <path d="M16 92 H80 M16 104 H62" className="stroke-current" strokeWidth={1.25} strokeOpacity={0.5} />
        </Card>
      </g>
      {/* Colour card (middle) */}
      <g className="art-fan" style={{ "--fan": fans[1].fan, "--delay": `${fans[1].delay}ms` } as CSSProperties}>
        <Card>
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={16 + (i % 2) * 34}
              y={22 + Math.floor(i / 2) * 34}
              width={28}
              height={28}
              rx={3}
              className={i === 1 ? "fill-signal stroke-signal" : "art-fill stroke-current"}
              strokeWidth={1.25}
            />
          ))}
          <path d="M16 104 H80" className="stroke-current" strokeWidth={1.25} strokeOpacity={0.5} />
        </Card>
      </g>
      {/* Logo card (front) */}
      <g className="art-fan" style={{ "--fan": fans[0].fan, "--delay": `${fans[0].delay}ms` } as CSSProperties}>
        <Card>
          <g transform="translate(24 30)" fill="none" className="stroke-current" strokeWidth={1.5}>
            <path d="M0 40 L24 10 L48 40" />
            <path d="M9 40 L24 21 L39 40" />
            <path d="M18 40 L24 32 L30 40" />
            <circle cx={24} cy={46} r={3} className="fill-growth" stroke="none" />
          </g>
          <path d="M16 96 H80 M16 108 H50" className="stroke-current" strokeWidth={1.25} strokeOpacity={0.5} />
        </Card>
      </g>
    </g>
  );
}
