import type { CSSProperties } from "react";
import { getImageProps } from "next/image";
import LiveSvg from "@/components/motion/LiveSvg";
import { brand } from "@/content/brand";
import { channelHub } from "@/content/graphics";

/**
 * Channel hub (brief §9.4, /services): every channel wired into one KeshavCo
 * hub, with packets travelling in along the spokes. Channel names are mono
 * labels only; no third-party logos. Desktop is radial; below 768px the hub
 * sits on top with the channels in two columns underneath.
 */
function Hub({ cx, cy, size, id, mark }: { cx: number; cy: number; size: number; id: string; mark: string }) {
  const img = size * 0.46;
  return (
    <g>
      <defs>
        <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" className="stroke-signal" strokeWidth="1.25" />
        </pattern>
      </defs>
      <rect x={cx - size / 2} y={cy - size / 2} width={size} height={size} fill={`url(#${id})`} />
      <rect x={cx - size / 2 + 10} y={cy - size / 2 + 10} width={size - 20} height={size - 20} className="art-fill stroke-signal" strokeWidth={1} />
      <image href={mark} x={cx - img / 2} y={cy - img * 0.54} width={img} height={img * 1.08} />
    </g>
  );
}

function Chip({ x, y, label, font }: { x: number; y: number; label: string; font: number }) {
  const w = label.length * font * 0.64 + 20;
  const h = font * 2.6;
  return (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={4} className="art-fill stroke-current" strokeWidth={1.25} />
      <text x={x} y={y + font * 0.36} textAnchor="middle" className="fill-current font-mono tracking-[0.04em]" style={{ fontSize: font }}>
        {label}
      </text>
    </g>
  );
}

function Packet({ d, begin }: { d: string; begin: number }) {
  return (
    <circle r={3} className="packet fill-signal" opacity={0}>
      <animateMotion path={d} dur="2.4s" begin={`${begin}s`} repeatCount="indefinite" />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.85;1" dur="2.4s" begin={`${begin}s`} repeatCount="indefinite" />
    </circle>
  );
}

export default function ChannelHub({ className = "" }: { className?: string }) {
  const mark = getImageProps({ src: brand.mark, alt: "", width: 64, height: 69, quality: 80 }).props.src;
  const n = channelHub.channels.length;

  const radial = channelHub.channels.map((label, i) => {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    return { label, x: 300 + Math.cos(a) * 230, y: 230 + Math.sin(a) * 165, a };
  });
  const stacked = channelHub.channels.map((label, i) => ({
    label,
    x: i % 2 === 0 ? 92 : 268,
    y: 250 + Math.floor(i / 2) * 50,
  }));

  return (
    <div className={`art ${className}`}>
      <p className="sr-only">{channelHub.description}</p>
      <LiveSvg viewBox="0 0 600 460" className="hidden h-auto w-full md:block" fill="none">
        {radial.map((c, i) => {
          const d = `M${c.x.toFixed(1)} ${c.y.toFixed(1)} L${(300 + Math.cos(c.a) * 60).toFixed(1)} ${(230 + Math.sin(c.a) * 60).toFixed(1)}`;
          return (
            <g key={c.label}>
              <g className="flow-line" style={{ "--i": i } as CSSProperties}>
                <path d={d} className="flow-dash stroke-current" strokeWidth={1.25} strokeOpacity={0.5} />
              </g>
              <Packet d={d} begin={1 + i * 0.37} />
            </g>
          );
        })}
        <Hub cx={300} cy={230} size={112} id="hub-hatch-d" mark={mark} />
        {radial.map((c, i) => (
          <g key={c.label} className="art-rise" style={{ "--delay": `${i * 50}ms`, "--rise": "6px" } as CSSProperties}>
            <Chip x={c.x} y={c.y} label={c.label} font={11} />
          </g>
        ))}
      </LiveSvg>
      <LiveSvg viewBox="0 0 360 520" className="h-auto w-full md:hidden" fill="none">
        {stacked.map((c, i) => {
          const d = `M${c.x} ${c.y - 14} C ${c.x} 190, 180 200, 180 150`;
          return (
            <g key={c.label}>
              <g className="flow-line" style={{ "--i": i } as CSSProperties}>
                <path d={d} className="flow-dash stroke-current" strokeWidth={1.25} strokeOpacity={0.45} />
              </g>
              <Packet d={d} begin={1 + i * 0.37} />
            </g>
          );
        })}
        <Hub cx={180} cy={100} size={100} id="hub-hatch-m" mark={mark} />
        {stacked.map((c) => (
          <Chip key={c.label} x={c.x} y={c.y} label={c.label} font={11} />
        ))}
      </LiveSvg>
    </div>
  );
}
