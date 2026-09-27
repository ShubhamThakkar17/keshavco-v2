import type { CSSProperties } from "react";
import DrawPath from "@/components/motion/DrawPath";
import { box, grid, iso, line, ring } from "@/components/graphics/iso";

/**
 * Digital marketing: five isometric bars grow in sequence on a grid; a target
 * ring floats above the tallest; an arrow climbs across the tops to the
 * green eye at its tip.
 */
export default function DigitalMarketingArt() {
  const heights = [26, 46, 68, 96, 128];
  const bars = heights.map((h, i) => ({ x: -110 + i * 44, y: -12, h }));
  const top = (i: number) => iso(bars[i].x + 12, bars[i].y + 12, bars[i].h + 18);
  const arrow = line(iso(-150, 30, 12), top(0), top(1), top(2), top(3), top(4));
  const tip = top(4);
  const last = bars[4];
  return (
    <g transform="translate(200 200)" strokeLinecap="round" strokeLinejoin="round">
      <path d={grid(-140, -40, 0, 240, 80, 20)} className="stroke-current" strokeWidth={1} strokeOpacity={0.25} fill="none" />
      {bars.map((bar, i) => {
        const f = box(bar.x, bar.y, 0, 24, 24, bar.h);
        return (
          <g key={i} className="art-grow" style={{ "--delay": `${i * 90}ms` } as CSSProperties}>
            <path d={f.left} className="art-fill stroke-current" strokeWidth={1.25} />
            <path d={f.right} className="art-soft stroke-current" strokeWidth={1.25} />
            <path d={f.top} className={i === 4 ? "fill-signal stroke-signal" : "art-fill stroke-current"} strokeWidth={1.25} />
          </g>
        );
      })}
      <DrawPath d={arrow} delay={600} fill="none" className="stroke-current" strokeWidth={1.5} />
      <g className="art-pop" style={{ "--delay": "1300ms" } as CSSProperties}>
        <circle cx={tip[0]} cy={tip[1]} r={5} className="fill-growth" />
      </g>
      <g className="art-float loop-anim">
        <path d={ring(last.x + 12, last.y + 12, last.h + 58, 22)} fill="none" className="stroke-signal" strokeWidth={1.25} />
        <path d={ring(last.x + 12, last.y + 12, last.h + 58, 12)} fill="none" className="stroke-signal" strokeWidth={1.25} />
        <path d={ring(last.x + 12, last.y + 12, last.h + 58, 3)} className="fill-signal" />
      </g>
    </g>
  );
}
