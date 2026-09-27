import type { CSSProperties, ReactElement } from "react";
import LiveSvg from "@/components/motion/LiveSvg";
import FlowLine from "@/components/motion/FlowLine";
import { box, grid, iso, line, poly, rightPlane } from "@/components/graphics/iso";

/**
 * Animated isometric vignettes, one per industry. They replace the stock
 * photographs (decision log #4): the industry grid reveals them on hover and
 * the industries page leads each card with one. Decorative; the words beside
 * them carry the meaning.
 */

const S = { strokeWidth: 1.25, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Cube({ x, y, z, w, d, h, accentTop = false }: { x: number; y: number; z: number; w: number; d: number; h: number; accentTop?: boolean }) {
  const f = box(x, y, z, w, d, h);
  return (
    <>
      <path d={f.left} className="art-fill stroke-current" {...S} />
      <path d={f.right} className="art-soft stroke-current" {...S} />
      <path d={f.top} className={accentTop ? "fill-signal stroke-signal" : "art-fill stroke-current"} {...S} />
    </>
  );
}

const shadow = <ellipse cx={0} cy={70} rx={140} ry={20} className="fill-current" fillOpacity={0.05} />;

function Manufacturing() {
  const teeth: string[] = [];
  for (let k = 0; k < 4; k += 1) {
    const x = -70 + k * 26;
    teeth.push(poly(iso(x, 30, 44), iso(x + 26, 30, 44), iso(x + 26, 30, 60)));
  }
  return (
    <g>
      {shadow}
      <g className="art-rise" style={{ "--rise": "8px" } as CSSProperties}>
        <Cube x={-70} y={-20} z={0} w={104} d={50} h={44} />
        {teeth.map((d) => (
          <path key={d} d={d} className="art-soft stroke-current" {...S} />
        ))}
        <Cube x={10} y={-12} z={44} w={12} d={12} h={30} />
        <g transform={rightPlane(iso(-60, 30, 30))}>
          <rect x={0} y={0} width={14} height={10} className="fill-signal" />
          <rect x={22} y={0} width={14} height={10} className="art-soft stroke-current" {...S} />
          <rect x={44} y={0} width={14} height={10} className="art-soft stroke-current" {...S} />
        </g>
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i} className="art-float loop-anim" style={{ "--delay": `${i * -1300}ms` } as CSSProperties}>
          <circle cx={iso(16, -6, 84 + i * 12)[0] + i * 4} cy={iso(16, -6, 84 + i * 12)[1]} r={3 + i} className="fill-current" fillOpacity={0.15} />
        </g>
      ))}
      <Cube x={-96} y={52} z={0} w={176} d={16} h={6} />
      {[0, 1, 2].map((i) => (
        <g key={i} className="art-conveyor loop-anim" style={{ "--dx": "118px", "--dy": "68px", "--dur": "4.2s", "--delay": `${i * -1400}ms` } as CSSProperties}>
          <Cube x={-94} y={54} z={6} w={12} d={12} h={12} />
        </g>
      ))}
    </g>
  );
}

function Healthcare() {
  const ecg = "M-130 60 H-70 L-62 44 L-52 76 L-44 34 L-36 60 H20";
  return (
    <g>
      {shadow}
      <g className="art-rise" style={{ "--rise": "8px" } as CSSProperties}>
        <Cube x={-50} y={-50} z={0} w={96} d={70} h={74} />
        <Cube x={-20} y={-30} z={74} w={36} d={30} h={14} />
        <g transform={rightPlane(iso(-50, 20, 74))}>
          <rect x={30} y={10} width={30} height={30} rx={3} className="art-fill stroke-current" {...S} />
          <path d="M45 16 V34 M36 25 H54" className="stroke-signal" strokeWidth={2.5} strokeLinecap="round" />
          <path d="M12 52 H30 M60 52 H78 M12 62 H30 M60 62 H78" className="stroke-current" {...S} strokeOpacity={0.5} />
        </g>
      </g>
      <path d={ecg} pathLength={1} className="art-trace loop-anim stroke-signal" fill="none" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function Education() {
  const books = [
    { z: 0, x: -60, h: 14 },
    { z: 14, x: -54, h: 12 },
    { z: 26, x: -62, h: 14 },
  ];
  const cap = [iso(-40, -40, 88), iso(10, -40, 88), iso(10, 10, 88), iso(-40, 10, 88)];
  return (
    <g>
      {shadow}
      {books.map((b, i) => (
        <g key={i} className="art-rise" style={{ "--delay": `${i * 120}ms` } as CSSProperties}>
          <Cube x={b.x} y={-30} z={b.z} w={80} d={56} h={b.h} accentTop={i === 2} />
        </g>
      ))}
      <g className="art-float loop-anim">
        <path d={poly(...cap)} className="art-fill stroke-current" {...S} />
        <path d={line(iso(-15, -15, 88), iso(-15, -15, 74))} className="stroke-current" {...S} />
        <path d={line(iso(10, 10, 88), iso(20, 16, 70))} className="stroke-current" {...S} />
      </g>
      <g className="art-rise" style={{ "--delay": "400ms" } as CSSProperties}>
        <g transform={rightPlane(iso(60, -10, 70))}>
          <rect x={0} y={0} width={60} height={62} rx={4} className="art-fill stroke-current" {...S} />
          <path d="M0 14 H60" className="stroke-current" {...S} />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <rect key={i} x={8 + (i % 3) * 16} y={20 + Math.floor(i / 3) * 13} width={10} height={8} className={i === 4 ? "fill-signal" : "art-soft"} />
          ))}
        </g>
      </g>
    </g>
  );
}

function RealEstate() {
  const towers = [
    { x: -90, y: -10, h: 52 },
    { x: -30, y: -40, h: 100 },
    { x: 30, y: -10, h: 76 },
  ];
  const tallest = towers[1];
  const pin = iso(tallest.x + 20, tallest.y + 20, tallest.h + 30);
  return (
    <g>
      <path d={grid(-120, -70, 0, 200, 110, 20)} className="stroke-current" strokeWidth={1} strokeOpacity={0.2} fill="none" />
      {towers.map((t, i) => (
        <g key={i} className="art-grow" style={{ "--delay": `${i * 140}ms` } as CSSProperties}>
          <Cube x={t.x} y={t.y} z={0} w={40} d={40} h={t.h} />
          <g transform={rightPlane(iso(t.x, t.y + 40, t.h))}>
            {Array.from({ length: Math.floor(t.h / 18) }, (_, k) => (
              <path key={k} d={`M8 ${10 + k * 18} H32`} className="stroke-current" {...S} strokeOpacity={0.5} />
            ))}
          </g>
        </g>
      ))}
      <g className="art-float loop-anim">
        <g className="art-pop" style={{ "--delay": "700ms" } as CSSProperties}>
          <path
            d={`M${pin[0]} ${pin[1] + 16} c0 0 -11 -11 -11 -19 a11 11 0 0 1 22 0 c0 8 -11 19 -11 19 Z`}
            className="art-fill stroke-current"
            {...S}
          />
          <rect x={pin[0] - 3.5} y={pin[1] - 6.5} width={7} height={7} className="fill-signal" />
        </g>
      </g>
    </g>
  );
}

function D2C() {
  const roof = [iso(60, -10, 44), iso(100, -10, 44), iso(100, 30, 44), iso(60, 30, 44)];
  const ridgeA = iso(80, -10, 64);
  const ridgeB = iso(80, 30, 64);
  return (
    <g>
      {shadow}
      <g className="art-rise" style={{ "--rise": "8px" } as CSSProperties}>
        <Cube x={-120} y={-20} z={0} w={70} d={60} h={50} />
        <g transform={rightPlane(iso(-120, 40, 50))}>
          <rect x={20} y={20} width={30} height={30} className="art-soft stroke-current" {...S} />
          <path d="M20 30 H50 M20 40 H50" className="stroke-current" {...S} strokeOpacity={0.5} />
        </g>
      </g>
      <g className="art-rise" style={{ "--delay": "200ms", "--rise": "8px" } as CSSProperties}>
        <Cube x={60} y={-10} z={0} w={40} d={40} h={44} />
        <path d={poly(roof[3], roof[2], ridgeB, ridgeA, roof[0])} className="art-soft stroke-current" {...S} />
        <path d={poly(roof[2], roof[1], ridgeA, ridgeB)} className="art-fill stroke-current" {...S} />
        <g transform={rightPlane(iso(60, 30, 30))}>
          <rect x={14} y={6} width={12} height={24} className="fill-signal" />
        </g>
      </g>
      <FlowLine d="M-40 52 C 0 90, 40 90, 78 64" packets={2} duration={2.4} index={0} className="stroke-current" packetClassName="fill-growth" />
      <g className="art-rise" style={{ "--delay": "300ms" } as CSSProperties}>
        <Cube x={-70} y={50} z={0} w={16} d={16} h={14} />
      </g>
    </g>
  );
}

function Retail() {
  const stripes = Array.from({ length: 7 }, (_, i) => i);
  return (
    <g>
      {shadow}
      <g className="art-rise" style={{ "--rise": "8px" } as CSSProperties}>
        <Cube x={-70} y={-40} z={0} w={130} d={60} h={70} />
        <g transform={rightPlane(iso(-70, 20, 70))}>
          {stripes.map((i) => (
            <rect key={i} x={i * 18.5} y={0} width={18.5} height={18} className={i === 3 ? "fill-signal" : i % 2 ? "art-soft stroke-current" : "art-fill stroke-current"} {...S} />
          ))}
          <rect x={16} y={30} width={40} height={28} className="art-soft stroke-current" {...S} />
          <rect x={72} y={30} width={24} height={40} className="art-fill stroke-current" {...S} />
        </g>
      </g>
      <FlowLine d="M-120 90 C -90 70, -40 80, -4 66" packets={3} duration={3} index={0} className="stroke-current" packetClassName="fill-signal" />
      <g className="art-float loop-anim" style={{ "--delay": "-1500ms" } as CSSProperties}>
        <path d="M86 40 H112 L108 70 H90 Z M93 40 V34 a6 6 0 0 1 12 0 V40" className="art-fill stroke-current" {...S} />
      </g>
    </g>
  );
}

function ProfessionalServices() {
  const bars = [14, 22, 30, 40];
  return (
    <g>
      {shadow}
      <g className="art-rise" style={{ "--rise": "8px" } as CSSProperties}>
        <Cube x={-90} y={-40} z={30} w={150} d={80} h={6} />
        <path d={line(iso(-86, 36, 30), iso(-86, 36, 0))} className="stroke-current" {...S} />
        <path d={line(iso(56, 36, 30), iso(56, 36, 0))} className="stroke-current" {...S} />
        <path d={line(iso(56, -36, 30), iso(56, -36, 0))} className="stroke-current" {...S} />
      </g>
      <g className="art-rise" style={{ "--delay": "200ms" } as CSSProperties}>
        <path d={poly(iso(-60, -10, 36), iso(0, -10, 36), iso(0, 20, 36), iso(-60, 20, 36))} className="art-soft stroke-current" {...S} />
        <g transform={rightPlane(iso(-60, -10, 36))}>
          <g transform="translate(0 -52)">
            <rect x={0} y={0} width={60} height={52} rx={3} className="art-fill stroke-current" {...S} />
            {bars.map((h, i) => (
              <g key={i} className="art-grow" style={{ "--delay": `${500 + i * 100}ms` } as CSSProperties}>
                <rect x={10 + i * 11} y={44 - h} width={7} height={h} className={i === 3 ? "fill-signal" : "art-soft stroke-current"} strokeWidth={1} />
              </g>
            ))}
          </g>
        </g>
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i} className="art-rise" style={{ "--delay": `${300 + i * 90}ms` } as CSSProperties}>
          <Cube x={16} y={-26 + i * 2} z={36 + i * 5} w={30} d={40} h={5} />
        </g>
      ))}
    </g>
  );
}

const scenes: Record<string, () => ReactElement> = {
  manufacturing: Manufacturing,
  healthcare: Healthcare,
  education: Education,
  "real-estate": RealEstate,
  d2c: D2C,
  retail: Retail,
  "professional-services": ProfessionalServices,
};

export default function IndustryScene({
  slug,
  active,
  className = "h-auto w-full",
}: {
  slug: string;
  active?: boolean;
  className?: string;
}) {
  const Scene = scenes[slug] ?? Manufacturing;
  return (
    <span className="art block h-full">
      <LiveSvg viewBox="-160 -158 320 250" className={className} drawn={active} fill="none">
        <Scene />
      </LiveSvg>
    </span>
  );
}
