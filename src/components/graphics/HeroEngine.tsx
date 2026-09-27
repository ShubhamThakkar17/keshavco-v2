import type { CSSProperties } from "react";
import { getImageProps } from "next/image";
import LiveSvg from "@/components/motion/LiveSvg";
import { brand } from "@/content/brand";
import { heroEngine } from "@/content/graphics";

/**
 * Hero engine (brief §7.1): seven marketing inputs flow along dotted lines
 * into one hatched KeshavCo hub and come out as three results. Packets leave
 * a different input every 900ms; each arrival pulses the hub and, 300ms
 * later, sends a green packet to an output. The middle output carries the
 * green "eye" (the result).
 *
 * All motion is CSS + SMIL inside a LiveSvg, so it costs no React renders,
 * waits for the diagram to scroll in, and pauses offscreen and for reduced
 * motion. Below 768px the diagram switches to a vertical layout.
 */

type Tile = { x: number; y: number; label: string };

const tilePath = (x: number, y: number, w: number, h: number, f = 9) =>
  `M${x} ${y} H${x + w - f} L${x + w} ${y + f} V${y + h} H${x} Z`;
const foldPath = (x: number, y: number, w: number, f = 9) => `M${x + w - f} ${y} V${y + f} H${x + w}`;

/** Order in which inputs fire, so packets never march top to bottom. */
const FIRE_ORDER = [3, 0, 5, 1, 6, 2, 4];
const BEAT = 0.9;
const LEAD = 1.6; // seconds before the first packet, after the lines have drawn
const TRAVEL = 1.9;

function markSrc() {
  return getImageProps({ src: brand.mark, alt: "", width: 64, height: 69, quality: 80 }).props.src;
}

function Packet({ path, begin, cycle, travel, className }: { path: string; begin: number; cycle: number; travel: number; className: string }) {
  const share = travel / cycle;
  return (
    <circle r={3} className={`packet ${className}`} opacity={0}>
      <animateMotion
        path={path}
        dur={`${cycle}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
        keyPoints="0;1;1"
        keyTimes={`0;${share.toFixed(3)};1`}
        calcMode="linear"
      />
      <animate
        attributeName="opacity"
        values="0;1;1;0;0"
        keyTimes={`0;0.02;${(share - 0.02).toFixed(3)};${share.toFixed(3)};1`}
        dur={`${cycle}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
      />
    </circle>
  );
}

function OutputIcon({ index, x, y }: { index: number; x: number; y: number }) {
  const icons = [
    // Enquiries: an envelope
    `M${x} ${y + 2} h14 v10 h-14 Z M${x} ${y + 2} l7 5 l7 -5`,
    // Pipeline: stepped bars narrowing to the right
    `M${x} ${y} h14 M${x + 2} ${y + 5} h10 M${x + 4} ${y + 10} h6`,
    // Monthly report: a page with a rising line
    `M${x + 1} ${y} h9 l3 3 v11 h-12 Z M${x + 3} ${y + 10} l3 -3 l2 2 l3 -4`,
  ];
  return <path d={icons[index]} fill="none" strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />;
}

function Hub({ x, y, size, mark, hatch }: { x: number; y: number; size: number; mark: string; hatch: string }) {
  const inset = 12;
  const img = size * 0.5;
  const b = 10;
  const o = -8;
  const corners = [
    `M${x + o} ${y + o + b} V${y + o} H${x + o + b}`,
    `M${x + size - o - b} ${y + o} H${x + size - o} V${y + o + b}`,
    `M${x + o} ${y + size - o - b} V${y + size - o} H${x + o + b}`,
    `M${x + size - o - b} ${y + size - o} H${x + size - o} V${y + size - o - b}`,
  ];
  return (
    <g className="art-pop" style={{ "--delay": "1000ms", "--from-scale": 0.85 } as CSSProperties}>
      <rect x={x} y={y} width={size} height={size} fill={`url(#${hatch})`} />
      <rect x={x} y={y} width={size} height={size} fill="none" className="stroke-signal" strokeWidth={1.25} />
      <rect x={x + inset} y={y + inset} width={size - inset * 2} height={size - inset * 2} className="art-fill stroke-signal" strokeWidth={1} />
      <image href={mark} x={x + (size - img) / 2} y={y + (size - img * 1.08) / 2} width={img} height={img * 1.08} />
      <g className="art-pulse loop-anim" style={{ "--delay": `${(LEAD + TRAVEL) % BEAT}s` } as CSSProperties}>
        <path d={corners.join(" ")} fill="none" className="stroke-signal" strokeWidth={1.5} />
      </g>
    </g>
  );
}

function Layout({
  inputs,
  outputs,
  hub,
  width,
  height,
  vertical,
  idPrefix,
}: {
  idPrefix: string;
  inputs: Tile[];
  outputs: Tile[];
  hub: { x: number; y: number; size: number };
  width: number;
  height: number;
  vertical: boolean;
}) {
  const mark = markSrc();
  const hatch = `${idPrefix}-hatch`;
  const tileW = vertical ? 84 : 100;
  const tileH = vertical ? 34 : 40;
  const outW = vertical ? 116 : 136;
  const outFont = vertical ? 9 : 10;
  const outH = vertical ? 38 : 44;
  const hubCx = hub.x + hub.size / 2;
  const hubCy = hub.y + hub.size / 2;

  const inPaths = inputs.map((tile, i) => {
    if (vertical) {
      const sx = tile.x + tileW / 2;
      const sy = tile.y + tileH;
      const ex = hub.x + 14 + (i * (hub.size - 28)) / (inputs.length - 1);
      const ey = hub.y;
      return `M${sx} ${sy} C${sx} ${sy + 40} ${ex} ${ey - 40} ${ex} ${ey}`;
    }
    const sx = tile.x + tileW;
    const sy = tile.y + tileH / 2;
    const ex = hub.x;
    const ey = hub.y + 20 + (i * (hub.size - 40)) / (inputs.length - 1);
    return `M${sx} ${sy} C${sx + 60} ${sy} ${ex - 60} ${ey} ${ex} ${ey}`;
  });
  const outPaths = outputs.map((tile, k) => {
    if (vertical) {
      const sx = hubCx + (k - 1) * 30;
      const sy = hub.y + hub.size;
      const ex = tile.x + outW / 2;
      const ey = tile.y;
      return `M${sx} ${sy} C${sx} ${sy + 40} ${ex} ${ey - 40} ${ex} ${ey}`;
    }
    const sx = hub.x + hub.size;
    const sy = hubCy + (k - 1) * 22;
    const ex = tile.x;
    const ey = tile.y + outH / 2;
    return `M${sx} ${sy} C${sx + 30} ${sy} ${ex - 30} ${ey} ${ex} ${ey}`;
  });
  const scatter = [
    [-40, -24],
    [30, -40],
    [-50, 20],
    [40, 30],
    [-30, 40],
    [50, -10],
    [-20, 50],
  ];

  return (
    <>
      <defs>
        <pattern id={hatch} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" className="stroke-signal" strokeWidth="1.25" />
        </pattern>
      </defs>

      {/* Inputs and their connectors */}
      {inputs.map((tile, i) => (
        <g key={tile.label} className="art-hover">
          <g className="stroke-current" strokeOpacity={0.5}>
            <g className="flow-line" style={{ "--i": i + 8 } as CSSProperties}>
              <path d={inPaths[i]} fill="none" strokeWidth={1.25} strokeLinecap="round" className="flow-dash" strokeOpacity={0.55} />
            </g>
          </g>
          <g
            className="art-settle"
            style={
              {
                "--sx": `${scatter[i][0]}px`,
                "--sy": `${scatter[i][1]}px`,
                "--delay": `${600 + i * 60}ms`,
              } as CSSProperties
            }
          >
            <g className="art-lift">
              <path d={tilePath(tile.x, tile.y, tileW, tileH)} className="art-fill stroke-current" strokeWidth={1.25} />
              <path d={foldPath(tile.x, tile.y, tileW)} fill="none" className="stroke-current" strokeWidth={1.25} />
              <text x={tile.x + 10} y={tile.y + tileH / 2 + 4} className="fill-current font-mono text-[10px] tracking-[0.04em]">
                {tile.label}
              </text>
            </g>
          </g>
          <Packet
            path={inPaths[i]}
            begin={LEAD + FIRE_ORDER[i] * BEAT}
            cycle={BEAT * inputs.length}
            travel={TRAVEL}
            className="fill-signal"
          />
        </g>
      ))}

      {/* Outputs */}
      {outputs.map((tile, k) => (
        <g key={tile.label}>
          <g className="flow-line" style={{ "--i": 16 + k } as CSSProperties}>
            <path d={outPaths[k]} fill="none" strokeWidth={1.25} strokeLinecap="round" className="flow-dash stroke-current" strokeOpacity={0.55} />
          </g>
          <g className="art-rise" style={{ "--delay": `${1400 + k * 100}ms`, "--rise": "6px" } as CSSProperties}>
            <rect x={tile.x} y={tile.y} width={outW} height={outH} className="art-fill stroke-current" strokeWidth={1.25} />
            <g className="stroke-current">
              <OutputIcon index={k} x={tile.x + (vertical ? 7 : 10)} y={tile.y + outH / 2 - 7} />
            </g>
            <text
              x={tile.x + (vertical ? 27 : 32)}
              y={tile.y + outH / 2 + 4}
              className="fill-current font-mono tracking-[0.04em]"
              style={{ fontSize: outFont }}
            >
              {tile.label}
            </text>
          </g>
          {k === 1 && (
            <g className="art-pop" style={{ "--delay": "1800ms" } as CSSProperties}>
              <circle cx={tile.x + outW - 12} cy={tile.y + 12} r={4.5} className="fill-growth" />
            </g>
          )}
          <Packet
            path={outPaths[k]}
            begin={LEAD + TRAVEL + 0.3 + k * BEAT}
            cycle={BEAT * outputs.length}
            travel={1.05}
            className="fill-growth"
          />
        </g>
      ))}

      <Hub x={hub.x} y={hub.y} size={hub.size} mark={mark} hatch={hatch} />

      {/* Annotations */}
      <g className="art-fade" style={{ "--delay": "1600ms" } as CSSProperties}>
        <text
          x={vertical ? hub.x + hub.size + 10 : hub.x - 4}
          y={vertical ? hub.y - 6 : hub.y + hub.size + 30}
          className="fill-current font-mono text-[10px] tracking-[0.04em]"
          opacity={0.7}
        >
          {heroEngine.notes[0]}
        </text>
        <text
          x={vertical ? hub.x + hub.size + 10 : outputs[0].x}
          y={vertical ? hub.y + hub.size + 20 : outputs[0].y - 14}
          className="fill-current font-mono text-[10px] tracking-[0.04em]"
          opacity={0.7}
        >
          {heroEngine.notes[1]}
        </text>
      </g>
      <rect width={width} height={height} fill="none" />
    </>
  );
}

const desktopInputs: [number, number][] = [
  [10, 30],
  [150, 10],
  [60, 110],
  [180, 130],
  [10, 210],
  [130, 250],
  [40, 330],
];
const mobileInputs: [number, number][] = [
  [4, 8],
  [96, 8],
  [188, 8],
  [280, 8],
  [50, 54],
  [142, 54],
  [234, 54],
];

export default function HeroEngine({
  className = "",
  idPrefix = "engine",
}: {
  className?: string;
  /** Keeps SVG ids unique if the engine appears twice on one page. */
  idPrefix?: string;
}) {
  const inputs = (points: [number, number][]) =>
    heroEngine.inputs.map((label, i) => ({ x: points[i][0], y: points[i][1], label }));

  return (
    <div className={`art ${className}`}>
      <p className="sr-only">{heroEngine.description}</p>
      <LiveSvg viewBox="0 0 660 400" className="hidden h-auto w-full md:block">
        <Layout
          idPrefix={`${idPrefix}-d`}
          width={660}
          height={400}
          vertical={false}
          inputs={inputs(desktopInputs)}
          hub={{ x: 344, y: 136, size: 128 }}
          outputs={heroEngine.outputs.map((label, k) => ({ x: 520, y: 98 + k * 78, label }))}
        />
      </LiveSvg>
      <LiveSvg viewBox="0 0 368 420" className="h-auto w-full md:hidden">
        <Layout
          idPrefix={`${idPrefix}-m`}
          width={368}
          height={420}
          vertical
          inputs={inputs(mobileInputs)}
          hub={{ x: 134, y: 170, size: 100 }}
          outputs={heroEngine.outputs.map((label, k) => ({ x: 4 + k * 122, y: 360, label }))}
        />
      </LiveSvg>
    </div>
  );
}
