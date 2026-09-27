import type { CSSProperties, ReactElement } from "react";
import LiveSvg from "@/components/motion/LiveSvg";
import DrawPath from "@/components/motion/DrawPath";

/**
 * Line icons for the five process stages (brief §7.1): Discover, Create
 * Strategy, Execute, Measure, Scale. They draw on when first seen. The
 * `active` stage gets the green eye, and its icon comes alive: the gears
 * turn, the gauge needle sweeps, the blocks grow.
 */
const P = { className: "stroke-current", strokeWidth: 1.25, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" } as const;

function gear(cx: number, cy: number, r: number, teeth: number) {
  const outer = r;
  const inner = r * 0.78;
  const pts: string[] = [];
  const step = (Math.PI * 2) / (teeth * 2);
  for (let i = 0; i < teeth * 2; i += 1) {
    const rr = i % 2 === 0 ? outer : inner;
    const a0 = i * step - step * 0.35;
    const a1 = i * step + step * 0.35;
    pts.push(`${(cx + Math.cos(a0) * rr).toFixed(2)} ${(cy + Math.sin(a0) * rr).toFixed(2)}`);
    pts.push(`${(cx + Math.cos(a1) * rr).toFixed(2)} ${(cy + Math.sin(a1) * rr).toFixed(2)}`);
  }
  return `M${pts.join(" L")} Z M${cx + r * 0.3} ${cy} a${r * 0.3} ${r * 0.3} 0 1 0 0.01 0`;
}

const icons: Record<string, (active: boolean) => ReactElement> = {
  discover: () => (
    <>
      {Array.from({ length: 16 }, (_, i) => (
        <circle key={i} cx={8 + (i % 4) * 10} cy={8 + Math.floor(i / 4) * 10} r={1} className="fill-current" fillOpacity={0.35} />
      ))}
      <DrawPath d="M21 12 a9 9 0 1 0 0.01 0" {...P} />
      <DrawPath d="M27.5 27.5 L38 38" index={1} {...P} strokeWidth={2} />
      <rect x={19} y={19} width={4} height={4} className="fill-signal" />
    </>
  ),
  strategy: () => (
    <>
      <DrawPath d="M7 38 C 16 38, 14 24, 24 24 S 32 11, 40 11" {...P} />
      <circle cx={7} cy={38} r={2.5} className="fill-current" />
      <circle cx={24} cy={24} r={2.5} className="art-fill stroke-current" strokeWidth={1.25} />
      <path d="M40 11 V3" {...P} />
      <rect x={40} y={3} width={6} height={5} className="fill-signal" />
    </>
  ),
  execute: (active) => (
    <>
      <g className={active ? "art-spin loop-anim" : undefined} style={{ "--dur": "7s" } as CSSProperties}>
        <DrawPath d={gear(19, 20, 10, 8)} {...P} />
      </g>
      <g className={active ? "art-spin-rev loop-anim" : undefined} style={{ "--dur": "5s" } as CSSProperties}>
        <DrawPath d={gear(33, 33, 7.5, 6)} index={1} {...P} />
      </g>
      <rect x={17} y={18} width={4} height={4} className="fill-signal" />
    </>
  ),
  measure: (active) => (
    <>
      <DrawPath d="M7 34 A17 17 0 0 1 41 34" {...P} />
      <path d="M10 26 l3 1.5 M16.5 19.5 l1.8 2.6 M24 17 v3 M31.5 19.5 l-1.8 2.6 M38 26 l-3 1.5" {...P} strokeOpacity={0.6} />
      <g
        className={active ? "art-sweep loop-anim" : undefined}
        style={{ "--ox": "24px", "--oy": "34px", "--from": "-55deg", "--to": "35deg" } as CSSProperties}
      >
        <path d="M24 34 L24 21" {...P} strokeWidth={1.75} transform="rotate(20 24 34)" />
      </g>
      <rect x={22} y={32} width={4} height={4} className="fill-signal" />
    </>
  ),
  scale: (active) => (
    <>
      <path d="M6 41 H42" {...P} />
      {[
        { x: 8, h: 10 },
        { x: 20, h: 18 },
        { x: 32, h: 28 },
      ].map((b, i) => (
        <g key={i} className={active ? "art-grow" : undefined} style={{ "--delay": `${i * 120}ms` } as CSSProperties}>
          <rect x={b.x} y={41 - b.h} width={8} height={b.h} className={i === 2 ? "fill-signal stroke-signal" : "art-fill stroke-current"} strokeWidth={1.25} />
        </g>
      ))}
    </>
  ),
};

export default function ProcessIcon({
  stage,
  active = false,
  className = "h-12 w-12",
}: {
  /** discover | strategy | execute | measure | scale */
  stage: string;
  active?: boolean;
  className?: string;
}) {
  const draw = icons[stage] ?? icons.discover;
  return (
    <span className="art relative inline-block">
      <LiveSvg viewBox="0 0 48 48" className={className}>
        {draw(active)}
      </LiveSvg>
      <span
        aria-hidden="true"
        className={`absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-growth transition-transform duration-300 ease-[var(--ease-out-back)] ${
          active ? "scale-100" : "scale-0"
        }`}
      />
    </span>
  );
}
